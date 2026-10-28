// Бот-посредник: клиент пишет боту → сообщение приходит владельцу (TELEGRAM_CHAT_ID).
// Владелец отвечает через «Ответить» на сообщение бота → ответ уходит клиенту.
// Подключение (один раз после деплоя): открыть https://<сайт>/api/tg-webhook?setup=1
const crypto = require("crypto");
const S = require("./_shared");

const TOKEN = () => process.env.TELEGRAM_BOT_TOKEN || "";
const OWNER = () => String(process.env.TELEGRAM_CHAT_ID || "").split(",")[0].trim();
const SECRET = () => crypto.createHash("sha256").update("kletka-webhook:" + TOKEN()).digest("hex").slice(0, 40);

async function tg(method, body) {
  const r = await fetch(`https://api.telegram.org/bot${TOKEN()}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  }).then((x) => x.json()).catch((e) => ({ ok: false, description: String(e) }));
  if (!r.ok) console.error("Telegram " + method + ":", r.description);
  return r;
}

const WELCOME = {
  ru: "Здравствуйте! Это студия «Клетка» 👋\nНапишите, какую игру хотите или какой у вас вопрос. Мы ответим здесь же в течение рабочего дня.",
  ky: "Саламатсызбы! Бул «Клетка» студиясы 👋\nКандай оюн керек экенин же сурооңузду жазыңыз. Бир иш күнүнүн ичинде ушул жерден жооп беребиз.",
  en: "Hi! This is Kletka Studio 👋\nTell us what game you want or ask your question. We'll reply right here within one business day."
};
const THANKS = {
  ru: "Спасибо, сообщение получено! Ответим здесь в ближайшее время.",
  ky: "Рахмат, билдирүү алынды! Жакында ушул жерден жооп беребиз.",
  en: "Thanks, we got your message! We'll reply here soon."
};
function pickLang(code) {
  code = String(code || "").slice(0, 2);
  return code === "ky" ? "ky" : code === "en" ? "en" : "ru";
}

module.exports = async function handler(req, res) {
  if (!TOKEN() || !OWNER()) return res.status(500).json({ ok: false, error: "Не заданы TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID" });

  // Подключение вебхука: GET /api/tg-webhook?setup=1
  if (req.method === "GET") {
    if (!req.query.setup) return res.status(200).json({ ok: true });
    const url = "https://" + req.headers.host + "/api/tg-webhook";
    const r = await tg("setWebhook", { url, secret_token: SECRET(), allowed_updates: ["message"], drop_pending_updates: false });
    return res.status(r.ok ? 200 : 502).json({ ok: !!r.ok, url, description: r.description || null });
  }
  if (req.method !== "POST") return res.status(405).end();
  if (req.headers["x-telegram-bot-api-secret-token"] !== SECRET()) return res.status(401).end();

  const msg = (S.parseBody(req) || {}).message;
  if (!msg || !msg.chat || msg.chat.type !== "private") return res.status(200).json({ ok: true });

  const chatId = String(msg.chat.id);
  const text = msg.text || "";

  // --- сообщения владельца ---
  if (chatId === OWNER()) {
    const replied = msg.reply_to_message;
    const m = replied && /#id(\d+)/.exec(replied.text || replied.caption || "");
    if (!m) {
      if (text.startsWith("/start")) {
        await tg("sendMessage", { chat_id: chatId, text: "Сюда приходят сообщения клиентов с сайта. Чтобы ответить клиенту, нажмите «Ответить» на его сообщении и напишите текст." });
      } else {
        await tg("sendMessage", { chat_id: chatId, text: "Чтобы ответить клиенту, нажмите «Ответить» (reply) на сообщении с его именем." });
      }
      return res.status(200).json({ ok: true });
    }
    const r = await tg("copyMessage", { chat_id: m[1], from_chat_id: chatId, message_id: msg.message_id });
    await tg("sendMessage", {
      chat_id: chatId,
      reply_to_message_id: msg.message_id,
      text: r.ok ? "✅ Отправлено клиенту" : "⚠️ Не удалось отправить: " + (r.description || "ошибка Telegram")
    });
    return res.status(200).json({ ok: true });
  }

  // --- сообщения клиентов ---
  const lang = pickLang(msg.from && msg.from.language_code);
  const isStart = text.startsWith("/start");
  if (isStart) await tg("sendMessage", { chat_id: chatId, text: WELCOME[lang] });

  const f = msg.from || {};
  const name = [f.first_name, f.last_name].filter(Boolean).join(" ") || "Без имени";
  const who = f.username ? `<a href="https://t.me/${f.username}">@${S.escHtml(f.username)}</a>` : `<a href="tg://user?id=${chatId}">${S.escHtml(name)}</a>`;
  const head = [
    isStart ? "🟢 <b>Новый клиент открыл бота с сайта</b>" : "💬 <b>Сообщение от клиента</b>",
    `<b>Имя:</b> ${S.escHtml(name)}`,
    `<b>Telegram:</b> ${who}`,
    `<b>Язык:</b> ${S.escHtml(f.language_code || "—")}`
  ];
  if (text && !isStart) head.push("", S.escHtml(text));
  head.push("", `<i>Чтобы ответить, нажмите «Ответить» на этом сообщении.</i> #id${chatId}`);
  await tg("sendMessage", { chat_id: OWNER(), text: head.join("\n"), parse_mode: "HTML", disable_web_page_preview: true });

  // фото, файлы, голосовые и т.п. — копируем следом
  if (!text) await tg("copyMessage", { chat_id: OWNER(), from_chat_id: chatId, message_id: msg.message_id });
  if (!isStart) await tg("sendMessage", { chat_id: chatId, text: THANKS[lang] });

  return res.status(200).json({ ok: true });
};
