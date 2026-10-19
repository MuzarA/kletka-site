// Общие функции для обработчиков (файлы с "_" Vercel не публикует как отдельные адреса).
const crypto = require("crypto");

function clean(v, max) {
  return String(v == null ? "" : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max);
}
function escHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function clientIp(req) {
  return String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
}
function hashIp(ip) {
  return crypto.createHash("sha256").update((process.env.RATING_SALT || "kletka") + ip).digest("hex").slice(0, 24);
}
function parseBody(req) {
  let b = req.body;
  if (typeof b === "string") { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  return b && typeof b === "object" ? b : {};
}
function cors(req, res, methods) {
  const origin = process.env.ALLOWED_ORIGIN || "";
  if (origin) { res.setHeader("Access-Control-Allow-Origin", origin); res.setHeader("Vary", "Origin"); }
  res.setHeader("Access-Control-Allow-Methods", methods + ", OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

// Простой лимит запросов в памяти функции
const buckets = new Map();
function tooMany(key, max, windowMs) {
  const now = Date.now();
  const arr = (buckets.get(key) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  buckets.set(key, arr);
  return arr.length > max;
}

// ---- Telegram ----
function telegramConfigured() {
  return !!(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
}
async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = String(process.env.TELEGRAM_CHAT_ID || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!token || !chatIds.length) return false;
  const results = await Promise.all(chatIds.map((chat_id) =>
    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id, text, parse_mode: "HTML", disable_web_page_preview: true })
    }).then((r) => r.json()).catch((e) => ({ ok: false, description: String(e) }))
  ));
  const failed = results.filter((r) => !r.ok);
  if (failed.length) console.error("Telegram error:", failed);
  return failed.length === 0;
}

// ---- Хранилище оценок: Upstash Redis (в Vercel: Storage → Upstash for Redis) ----
function redisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}
async function redis(commands) {
  const cfg = redisConfig();
  if (!cfg) return null;
  const r = await fetch(cfg.url + "/pipeline", {
    method: "POST",
    headers: { Authorization: "Bearer " + cfg.token, "Content-Type": "application/json" },
    body: JSON.stringify(commands)
  });
  if (!r.ok) throw new Error("Redis HTTP " + r.status);
  const out = await r.json();
  return out.map((x) => {
    if (x && x.error) throw new Error("Redis: " + x.error);
    return x ? x.result : null;
  });
}

module.exports = { clean, escHtml, clientIp, hashIp, parseBody, cors, tooMany, telegramConfigured, sendTelegram, redisConfig, redis };
