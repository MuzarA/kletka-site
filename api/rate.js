// Приём оценки разработчика: сохраняет её в рейтинг и отправляет в Telegram.
// Нужны переменные окружения:
//   TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID — тот же бот, что и для заявок
//   UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN (или KV_REST_API_URL / KV_REST_API_TOKEN) — чтобы рейтинг сохранялся
const S = require("./_shared");

const ONE_PER_DEV_SECONDS = 60 * 60 * 24 * 180; // одна оценка разработчику с одного IP раз в 180 дней

module.exports = async function handler(req, res) {
  S.cors(req, res, "POST");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Метод не поддерживается" });

  const hasRedis = !!S.redisConfig();
  if (!hasRedis && !S.telegramConfigured()) {
    return res.status(500).json({ ok: false, error: "Сервер не настроен: не задан ни Telegram-бот, ни хранилище оценок" });
  }

  const b = S.parseBody(req);
  if (b.website) return res.status(200).json({ ok: true, stats: null }); // honeypot

  const devId = S.clean(b.devId, 40);
  const devName = S.clean(b.devName, 80) || devId;
  const stars = Number(b.stars);
  const name = S.clean(b.name, 60);
  const project = S.clean(b.project, 80);
  const comment = S.clean(b.comment, 1000);
  const page = S.clean(b.page, 300);
  const langName = { ru: "Русский", ky: "Кыргызча", en: "English" }[S.clean(b.lang, 5)] || "Русский";

  if (!/^[a-z0-9_-]{1,40}$/.test(devId)) return res.status(400).json({ ok: false, error: "Неизвестный разработчик" });
  if (!Number.isInteger(stars) || stars < 1 || stars > 5) return res.status(400).json({ ok: false, error: "Оценка должна быть от 1 до 5" });

  const ip = S.clientIp(req);
  if (S.tooMany("rate:" + ip, 10, 10 * 60 * 1000)) {
    return res.status(429).json({ ok: false, error: "Слишком много оценок подряд, попробуйте позже" });
  }

  let stats = null;
  if (hasRedis) {
    try {
      const key = "rating:" + devId;
      const [fresh] = await S.redis([["SET", `rated:${devId}:${S.hashIp(ip)}`, "1", "NX", "EX", String(ONE_PER_DEV_SECONDS)]]);
      if (fresh !== "OK") {
        return res.status(409).json({ ok: false, error: "Вы уже оценивали этого разработчика" });
      }
      const review = JSON.stringify({ stars, name, project, comment, at: new Date().toISOString() });
      const out = await S.redis([
        ["SADD", "devs", devId],
        ["HINCRBY", key, "sum", String(stars)],
        ["HINCRBY", key, "count", "1"],
        ["LPUSH", "reviews:" + devId, review],
        ["LTRIM", "reviews:" + devId, "0", "499"]
      ]);
      stats = { sum: Number(out[1]), count: Number(out[2]) };
    } catch (err) {
      console.error(err);
      return res.status(502).json({ ok: false, error: "Не удалось сохранить оценку" });
    }
  }

  const starLine = "★".repeat(stars) + "☆".repeat(5 - stars);
  const lines = [
    "⭐ <b>Новая оценка разработчику</b>",
    "",
    `<b>Разработчик:</b> ${S.escHtml(devName)}`,
    `<b>Оценка:</b> ${starLine} ${stars}/5`
  ];
  if (stats && stats.count) {
    lines.push(`<b>Рейтинг теперь:</b> ${(stats.sum / stats.count).toFixed(2)} · ${stats.count} оц. с сайта`);
  }
  if (name) lines.push(`<b>От:</b> ${S.escHtml(name)}`);
  lines.push(`<b>Язык сайта:</b> ${langName}`);
  if (project) lines.push(`<b>Проект:</b> ${S.escHtml(project)}`);
  if (comment) lines.push("", "<b>Отзыв:</b>", S.escHtml(comment));
  lines.push("", `<i>${S.escHtml(new Date().toLocaleString("ru-RU", { timeZone: process.env.TZ_DISPLAY || "Asia/Bishkek" }))}${page ? " · " + S.escHtml(page) : ""}</i>`);

  const delivered = await S.sendTelegram(lines.join("\n")).catch(() => false);

  // Если хранилища нет, оценка существует только как сообщение в Telegram
  if (!hasRedis && !delivered) {
    return res.status(502).json({ ok: false, error: "Не удалось отправить оценку" });
  }
  return res.status(200).json({ ok: true, stats });
};
