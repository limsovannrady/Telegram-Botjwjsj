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
  const noteId = parseInt(req.query.noteId);
  if (isNaN(telegramId) || isNaN(noteId)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const db = getPool();

  if (req.method === "PUT") {
    const { title, content } = req.body;
    try {
      const result = await db.query(
        `UPDATE notes SET title = $1, content = $2, updated_at = NOW()
         WHERE id = $3 AND telegram_id = $4 RETURNING *`,
        [title ?? "", content ?? "", noteId, telegramId]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Note not found" });
      }
      return res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await db.query(
        "DELETE FROM notes WHERE id = $1 AND telegram_id = $2",
        [noteId, telegramId]
      );
      return res.json({ ok: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
