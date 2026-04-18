import express from "express";
import cors from "cors";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/users/:telegramId/settings", async (req, res) => {
  const telegramId = parseInt(req.params.telegramId);
  if (isNaN(telegramId)) {
    return res.status(400).json({ error: "Invalid telegram_id" });
  }
  try {
    const result = await pool.query(
      "SELECT * FROM user_settings WHERE telegram_id = $1",
      [telegramId]
    );
    if (result.rows.length === 0) {
      return res.json({ notifications: true, dark_mode: false });
    }
    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/users/:telegramId/settings", async (req, res) => {
  const telegramId = parseInt(req.params.telegramId);
  if (isNaN(telegramId)) {
    return res.status(400).json({ error: "Invalid telegram_id" });
  }
  const { notifications, dark_mode, first_name, last_name, username } = req.body;
  try {
    await pool.query(
      `INSERT INTO user_settings (telegram_id, first_name, last_name, username, notifications, dark_mode, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       ON CONFLICT (telegram_id) DO UPDATE SET
         first_name = COALESCE($2, user_settings.first_name),
         last_name = COALESCE($3, user_settings.last_name),
         username = COALESCE($4, user_settings.username),
         notifications = COALESCE($5, user_settings.notifications),
         dark_mode = COALESCE($6, user_settings.dark_mode),
         updated_at = NOW()`,
      [telegramId, first_name ?? null, last_name ?? null, username ?? null, notifications ?? null, dark_mode ?? null]
    );
    const result = await pool.query(
      "SELECT * FROM user_settings WHERE telegram_id = $1",
      [telegramId]
    );
    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

const API_PORT = 4001;
app.listen(API_PORT, () => {
  console.log(`API server running on port ${API_PORT}`);
});
