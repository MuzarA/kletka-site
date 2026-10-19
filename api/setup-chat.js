// ВРЕМЕННЫЙ файл: показывает, кто написал боту, чтобы узнать chat id. Будет удалён.
module.exports = async function handler(req, res) {
  if (req.query.k !== "3ff71ce4f913008116a74f99") return res.status(404).end();
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return res.status(500).json({ ok: false, error: "no token" });
  const r = await fetch("https://api.telegram.org/bot" + token + "/getUpdates").then((x) => x.json()).catch((e) => ({ ok: false, description: String(e) }));
  if (!r.ok) return res.status(502).json({ ok: false, error: r.description || "telegram error" });
  const chats = {};
  (r.result || []).forEach((u) => {
    const m = u.message || u.edited_message || u.my_chat_member || {};
    const c = m.chat; if (!c) return;
    chats[c.id] = { id: c.id, type: c.type, name: c.title || [c.first_name, c.last_name].filter(Boolean).join(" "), username: c.username || null };
  });
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({ ok: true, chats: Object.values(chats) });
};
