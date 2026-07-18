# Studs Agency

Marketing site for Studs Agency — an end-to-end digital growth partner.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui + Framer Motion
- Supabase (contact form via an edge function)
- Deployed on Vercel

## Local development

```bash
npm install
npm run dev      # http://localhost:8080
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run the test suite |

## Contact form & lead notifications

The form posts to a Vercel serverless function at [`api/contact.ts`](api/contact.ts).
No database — each valid lead is sent straight to your phone (and logged in the Vercel
function logs as a safety net). A hidden honeypot + IP rate limiting keep spam out.

### Setup — WhatsApp alerts (free, via CallMeBot)

1. Save `+34 644 51 95 23` and WhatsApp it: `I allow callmebot to send me messages`
2. It replies with your API key.
3. In **Vercel → Project → Settings → Environment Variables**, add:
   ```
   NOTIFY_WHATSAPP_PHONE     = +91XXXXXXXXXX      (your number, with country code)
   NOTIFY_CALLMEBOT_APIKEY   = the key it gave you
   ```
4. Redeploy. Every submission now pings your WhatsApp instantly.

Optional Telegram backup: set `NOTIFY_TELEGRAM_BOT_TOKEN` + `NOTIFY_TELEGRAM_CHAT_ID`
(create a bot via `@BotFather`; get your chat id from
`https://api.telegram.org/bot<token>/getUpdates`).
