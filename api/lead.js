// Заявка на консультацию → сообщение в Telegram.
// Переменные окружения: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID (можно несколько через запятую), ALLOWED_ORIGIN (необязательно)
const S = require("./_shared");

const LIMITS = { name: 80, channel: 20, contact: 120, type: 60, budget: 40, message: 2000, page: 300, lang: 5 };
const LANG_NAMES = { ru: "Русский", ky: "Кыргызча", en: "English" };

module.exports = async function handler(req, res) {
  S.cors(req, res, "POST");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Метод не поддерживается" });
  if (!S.telegramConfigured()) return res.status(500).json({ ok: false, error: "Сервер не настроен: не заданы токен бота или chat id" });

  const b = S.parseBody(req);
  if (b.website) return res.status(200).json({ ok: true }); // honeypot

  const d = {};
  for (const k of Object.keys(LIMITS)) d[k] = S.clean(b[k], LIMITS[k]);
  if (d.name.length < 2 || d.contact.length < 3 || d.message.length < 10) {
    return res.status(400).json({ ok: false, error: "Заполните имя, контакт и описание игры" });
  }
  if (!b.agree) return res.status(400).json({ ok: false, error: "Нужно согласие на обработку данных" });
  if (S.tooMany("lead:" + S.clientIp(req), 5, 10 * 60 * 1000)) {
    return res.status(429).json({ ok: false, error: "Слишком много заявок подряд, попробуйте через несколько минут" });
  }

  const tgUser = d.channel === "Telegram" && /^@?[A-Za-z0-9_]{4,32}$/.test(d.contact) ? d.contact.replace(/^@/, "") : null;
  const contactLine = tgUser ? `<a href="https://t.me/${tgUser}">@${tgUser}</a>` : S.escHtml(d.contact);
  const text = [
    "🟥 <b>Новая заявка на консультацию</b>",
    "",
    `<b>Имя:</b> ${S.escHtml(d.name)}`,
    `<b>${S.escHtml(d.channel || "Контакт")}:</b> ${contactLine}`,
    `<b>Что нужно:</b> ${S.escHtml(d.type || "—")}`,
    `<b>Бюджет:</b> ${S.escHtml(d.budget || "—")}`,
    `<b>Язык сайта:</b> ${S.escHtml(LANG_NAMES[d.lang] || "Русский")}`,
    "",
    "<b>Об игре:</b>",
    S.escHtml(d.message),
    "",
    `<i>${S.escHtml(new Date().toLocaleString("ru-RU", { timeZone: process.env.TZ_DISPLAY || "Asia/Bishkek" }))}${d.page ? " · " + S.escHtml(d.page) : ""}</i>`
  ].join("\n");

  const ok = await S.sendTelegram(text).catch(() => false);
  if (!ok) return res.status(502).json({ ok: false, error: "Не удалось отправить заявку в Telegram" });
  return res.status(200).json({ ok: true });
};
