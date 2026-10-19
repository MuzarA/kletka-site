// Текущий рейтинг всех разработчиков: { ok, ratings: { devId: { sum, count } } }
const S = require("./_shared");

module.exports = async function handler(req, res) {
  S.cors(req, res, "GET");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ ok: false, error: "Метод не поддерживается" });

  if (!S.redisConfig()) return res.status(200).json({ ok: true, ratings: {}, storage: false });

  try {
    const [ids] = await S.redis([["SMEMBERS", "devs"]]);
    const ratings = {};
    if (ids && ids.length) {
      const rows = await S.redis(ids.map((id) => ["HMGET", "rating:" + id, "sum", "count"]));
      ids.forEach((id, i) => {
        const [sum, count] = rows[i] || [];
        if (Number(count) > 0) ratings[id] = { sum: Number(sum), count: Number(count) };
      });
    }
    res.setHeader("Cache-Control", "public, s-maxage=30, stale-while-revalidate=300");
    return res.status(200).json({ ok: true, ratings, storage: true });
  } catch (err) {
    console.error(err);
    return res.status(502).json({ ok: false, error: "Хранилище оценок недоступно" });
  }
};
