import os
import logging
from telegram import Update, WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup, MenuButtonDefault, constants
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

TOKEN = os.environ["TELEGRAM_BOT_TOKEN"]
MINI_APP_URL = os.environ["MINI_APP_URL"]

async def post_init(application):
    try:
        await application.bot.set_chat_menu_button(menu_button=MenuButtonDefault())
        logger.info("Menu button reset to default")
    except Exception as e:
        logger.error(f"Failed to reset menu button: {e}")

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await context.bot.send_chat_action(update.effective_chat.id, constants.ChatAction.TYPING)
    keyboard = [[
        InlineKeyboardButton(
            text="បើក ខ្មែរ Mini App",
            web_app=WebAppInfo(url=MINI_APP_URL)
        )
    ]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(
        f"សួស្តី {update.effective_user.first_name}!\n\n"
        "ចុចប៊ូតុងខាងក្រោម ដើម្បីបើក Mini App ខ្មែររបស់អ្នក។",
        reply_markup=reply_markup
    )

async def app_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [[
        InlineKeyboardButton(
            text="បើក ខ្មែរ Mini App",
            web_app=WebAppInfo(url=MINI_APP_URL)
        )
    ]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(
        "ចុចខាងក្រោម ដើម្បីបើក Mini App:",
        reply_markup=reply_markup
    )

app = ApplicationBuilder().token(TOKEN).post_init(post_init).build()
app.add_handler(CommandHandler("start", start))
app.add_handler(CommandHandler("app", app_command))
app.run_polling()
