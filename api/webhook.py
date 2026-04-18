from http.server import BaseHTTPRequestHandler
import json
import os
import asyncio
from telegram import (
    Update,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    WebAppInfo,
    MenuButtonWebApp,
    constants,
)
from telegram.ext import Application, CommandHandler, ContextTypes

TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
MINI_APP_URL = os.environ.get("MINI_APP_URL", "")


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await context.bot.send_chat_action(
        update.effective_chat.id, constants.ChatAction.TYPING
    )
    keyboard = [[
        InlineKeyboardButton(
            text="បើក ខ្មែរ Mini App",
            web_app=WebAppInfo(url=MINI_APP_URL),
        )
    ]]
    await update.message.reply_text(
        f"សួស្តី {update.effective_user.first_name}!\n\n"
        "ចុចប៊ូតុងខាងក្រោម ដើម្បីបើក Mini App ខ្មែររបស់អ្នក។",
        reply_markup=InlineKeyboardMarkup(keyboard),
    )


async def app_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [[
        InlineKeyboardButton(
            text="បើក ខ្មែរ Mini App",
            web_app=WebAppInfo(url=MINI_APP_URL),
        )
    ]]
    await update.message.reply_text(
        "ចុចខាងក្រោម ដើម្បីបើក Mini App:",
        reply_markup=InlineKeyboardMarkup(keyboard),
    )


async def process_update(update_data: dict):
    application = Application.builder().token(TOKEN).build()
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("app", app_command))
    async with application:
        update = Update.de_json(update_data, application.bot)
        await application.process_update(update)


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            update_data = json.loads(body)
            asyncio.run(process_update(update_data))
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"OK")
        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(str(e).encode())

    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"Telegram webhook is active.")

    def log_message(self, format, *args):
        pass
