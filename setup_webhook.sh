#!/bin/bash
# Run this script after deploying to Vercel to register the webhook.
# Usage: TELEGRAM_BOT_TOKEN=<your_token> VERCEL_URL=<your-vercel-url> bash setup_webhook.sh

TOKEN="${TELEGRAM_BOT_TOKEN}"
VERCEL_URL="${VERCEL_URL}"

if [ -z "$TOKEN" ]; then
  echo "Error: TELEGRAM_BOT_TOKEN is not set."
  exit 1
fi

if [ -z "$VERCEL_URL" ]; then
  echo "Error: VERCEL_URL is not set (e.g. https://your-app.vercel.app)"
  exit 1
fi

WEBHOOK_URL="${VERCEL_URL}/api/webhook"

echo "Setting webhook to: $WEBHOOK_URL"

curl -s "https://api.telegram.org/bot${TOKEN}/setWebhook?url=${WEBHOOK_URL}" | python3 -m json.tool

echo ""
echo "Done! Your bot will now receive updates at ${WEBHOOK_URL}"
echo "Set MINI_APP_URL=${VERCEL_URL} in your Vercel environment variables."
