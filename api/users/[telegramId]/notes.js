import pg from "pg";

const { Pool } = pg;

let pool;
function getPool() {
  if (!pool) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  return pool;
}

export default async function handler(req, res) {
  const telegramId = parseInt(req.query.telegramId);
  if (isNaN(telegramId)) {
    return res.status(400).json({ error: "Invalid telegram_id" });
  }

  const db = getPool();

  if (req.method === "GET") {
    try {
      const result = await db.query(
        "SELECT * FROM notes WHERE telegram_id = $1 ORDER BY updated_at DESC",
        [telegramId]
      );
      return res.json(result.rows);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  if (req.method === "POST") {
    const { title, content } = req.body;
    if (!title && !content) {
      return res.status(400).json({ error: "title or content required" });
    }
    try {
      const result = await db.query(
        "INSERT INTO notes (telegram_id, title, content) VALUES ($1, $2, $3) RETURNING *",
        [telegramId, title ?? "", content ?? ""]
      );
      return res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
