# ខ្មែរ Telegram Mini App Project

## Overview

This project has two parts:
1. **Telegram Bot** — Python bot (polling in dev, webhook in production)
2. **Khmer Mini App** — React/Vite static web app as a Telegram Mini App in Khmer

## Stack

### Telegram Bot
- **Language**: Python 3.11
- **Library**: python-telegram-bot >= 22.7
- **Dev entry**: `bot.py` (polling mode)
- **Prod entry**: `api/webhook.py` (Vercel serverless function, webhook mode)
- **Env vars**: `TELEGRAM_BOT_TOKEN` (required), `MINI_APP_URL` (required in prod)

### Khmer Mini App
- **Framework**: React 18 + Vite 6
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Hanuman, Noto Sans Khmer (Google Fonts)
- **Telegram SDK**: telegram-web-app.js (Telegram CDN)
- **Location**: `artifacts/khmer-mini-app/`
- **Dev port**: 23894

## Project Structure

```
/
├── api/
│   └── webhook.py          # Vercel Python serverless function (Telegram webhook)
├── artifacts/
│   └── khmer-mini-app/     # React/Vite Mini App
│       ├── src/
│       │   ├── pages/      # Home, Info, Settings, About
│       │   └── components/ # UI components
│       ├── index.html      # Loads Telegram WebApp SDK
│       └── vite.config.ts
├── bot.py                  # Polling bot for local dev
├── vercel.json             # Vercel deployment config
├── requirements.txt        # Python deps for Vercel
├── setup_webhook.sh        # Helper to register webhook after deploy
└── .vercelignore
```

## Mini App Pages
- **ទំព័រដើម (Home)** — Greeting with Telegram user avatar, daily Khmer proverb, quick action buttons
- **ព័ត៌មាន (Info)** — Info cards in Khmer
- **ការកំណត់ (Settings)** — Toggles for notifications, theme (saved per-user in PostgreSQL by Telegram ID)
- **យើង (About)** — App info and contact section

## User Settings System
- Each user's settings are stored in PostgreSQL keyed by their **Telegram ID**
- Table: `user_settings` (telegram_id, first_name, last_name, username, notifications, dark_mode, created_at, updated_at)
- Express API server handles GET/POST `/api/users/:telegramId/settings`
- Vite dev server proxies `/api` requests to the Express server on port 4001

## Development (Replit)

| Workflow | Command |
|---|---|
| Telegram Bot | `python bot.py` (polling) |
| Mini App (Vite) | `vite dev` on port 23894 |
| Khmer Mini App API | `tsx server.ts` on port 4001 |

## Vercel Deployment

### Step 1 — Import project to Vercel
- Connect your GitHub repo to Vercel
- Vercel auto-reads `vercel.json` — no extra config needed

### Step 2 — Set environment variables in Vercel dashboard
| Variable | Value |
|---|---|
| `TELEGRAM_BOT_TOKEN` | Your bot token from @BotFather |
| `MINI_APP_URL` | `https://your-app.vercel.app` |

### Step 3 — Register the webhook after deploy
```bash
TELEGRAM_BOT_TOKEN=<token> VERCEL_URL=https://your-app.vercel.app bash setup_webhook.sh
```
Or manually call:
```
https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://your-app.vercel.app/api/webhook
```

### Routes on Vercel
| Path | Handler |
|---|---|
| `/api/webhook` | Python serverless function (Telegram updates) |
| `/*` | Static Mini App (React/Vite build) |
