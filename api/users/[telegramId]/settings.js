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
        "SELECT * FROM user_settings WHERE telegram_id = $1",
        [telegramId]
      );
      if (result.rows.length === 0) {
        return res.json({
          notifications: true,
          dark_mode: false,
          feature_payment: true,
          feature_explore: true,
          feature_schedule: true,
          feature_favorites: true,
          feature_notes: true,
          feature_qr: true,
        });
      }
      return res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  if (req.method === "POST") {
    const {
      notifications, dark_mode, first_name, last_name, username,
      feature_payment, feature_explore, feature_schedule,
      feature_favorites, feature_notes, feature_qr,
    } = req.body;
    try {
      await db.query(
        `INSERT INTO user_settings
           (telegram_id, first_name, last_name, username, notifications, dark_mode,
            feature_payment, feature_explore, feature_schedule, feature_favorites, feature_notes, feature_qr, updated_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,NOW())
         ON CONFLICT (telegram_id) DO UPDATE SET
           first_name        = COALESCE($2,  user_settings.first_name),
           last_name         = COALESCE($3,  user_settings.last_name),
           username          = COALESCE($4,  user_settings.username),
           notifications     = COALESCE($5,  user_settings.notifications),
           dark_mode         = COALESCE($6,  user_settings.dark_mode),
           feature_payment   = COALESCE($7,  user_settings.feature_payment),
           feature_explore   = COALESCE($8,  user_settings.feature_explore),
           feature_schedule  = COALESCE($9,  user_settings.feature_schedule),
           feature_favorites = COALESCE($10, user_settings.feature_favorites),
           feature_notes     = COALESCE($11, user_settings.feature_notes),
           feature_qr        = COALESCE($12, user_settings.feature_qr),
           updated_at        = NOW()`,
        [
          telegramId,
          first_name ?? null, last_name ?? null, username ?? null,
          notifications ?? null, dark_mode ?? null,
          feature_payment ?? null, feature_explore ?? null,
          feature_schedule ?? null, feature_favorites ?? null,
          feature_notes ?? null, feature_qr ?? null,
        ]
      );
      const result = await db.query(
        "SELECT * FROM user_settings WHERE telegram_id = $1",
        [telegramId]
      );
      return res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
