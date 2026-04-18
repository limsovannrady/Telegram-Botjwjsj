export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const telegramId = parseInt(req.query.telegramId);
  if (isNaN(telegramId)) {
    return res.status(400).json({ error: "Invalid telegram_id" });
  }

  const { imageBase64, text } = req.body;
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) {
    return res.status(500).json({ error: "Bot token not configured" });
  }
  if (!imageBase64) {
    return res.status(400).json({ error: "imageBase64 required" });
  }

  try {
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const form = new FormData();
    form.append("chat_id", telegramId.toString());
    form.append(
      "document",
      new Blob([buffer], { type: "image/png" }),
      "limsovannrady_bot.png"
    );

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendDocument`,
      { method: "POST", body: form }
    );
    const data = await response.json();
    if (!data.ok) {
      return res.status(500).json({ error: data.description });
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to send to Telegram" });
  }
}
