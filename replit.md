# ខ្មែរ Telegram Mini App Project

## Overview

This project has two parts:
1. **Telegram Bot** (`bot.py`) — Python bot that registers the Mini App as a menu button and handles commands
2. **Khmer Mini App** (`artifacts/khmer-mini-app/`) — React/Vite web app designed as a Telegram Mini App in Khmer language

## Stack

### Telegram Bot
- **Language**: Python 3.11
- **Library**: python-telegram-bot
- **Entry**: `bot.py`
- **Env var**: `TELEGRAM_BOT_TOKEN` (required), `MINI_APP_URL` (optional, defaults to Replit dev URL)

### Khmer Mini App
- **Framework**: React 18 + Vite 6
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Hanuman, Noto Sans Khmer (Google Fonts)
- **Telegram SDK**: telegram-web-app.js (loaded from Telegram CDN)
- **Location**: `artifacts/khmer-mini-app/`
- **Dev port**: 23894

## Features

### Bot Commands
- `/start` — Welcome message with inline button to open Mini App
- `/app` — Opens the Mini App directly
- Menu button — Set to open Mini App on every chat

### Mini App Pages
- **ទំព័រដើម (Home)** — Greeting with user avatar, daily Khmer proverb, quick action buttons
- **ព័ត៌មាន (Info)** — Information cards in Khmer
- **ការកំណត់ (Settings)** — Toggle switches for notifications, theme, language
- **យើង (About)** — App info and contact section

## Workflows
- `Telegram Bot` — runs `python bot.py`
- `artifacts/khmer-mini-app: web` — runs Vite dev server on port 23894

## Telegram Integration
The bot sets a WebApp menu button on startup so users can launch the mini app directly. The mini app integrates with Telegram.WebApp SDK for:
- User data (name, avatar, language)
- Theme detection (light/dark)
- Expand to fullscreen
- Main button API

## Development
To run the Mini App locally:
```bash
cd artifacts/khmer-mini-app
PORT=23894 BASE_PATH="/" node_modules/.bin/vite --config vite.config.ts --host 0.0.0.0
```
