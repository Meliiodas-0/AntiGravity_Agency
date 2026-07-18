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

## Environment

Copy the public Supabase values into `.env` (these are browser-safe, RLS-protected keys):

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_SUPABASE_PROJECT_ID=...
```

The contact form posts to the `submit-contact` Supabase edge function, which validates
input, rate-limits by IP, and writes with the service role. The service-role key lives
only in Supabase function secrets — never in this repo.

## Where contact submissions go

Every submission is stored in the `contact_submissions` table (Supabase → Table Editor).
Rows are read-blocked by RLS, so view them in the Supabase dashboard.

### Lead notifications (WhatsApp / Telegram)

`submit-contact` also fires an instant alert on each new lead. Each channel only runs
if its secrets are set, so pick one (or both). Then redeploy the function:

```bash
supabase functions deploy submit-contact
```

**WhatsApp (free, via CallMeBot):**
1. Save `+34 644 51 95 23` and WhatsApp it: `I allow callmebot to send me messages`
2. It replies with your API key.
3. Set the secrets:
   ```bash
   supabase secrets set NOTIFY_WHATSAPP_PHONE=+91XXXXXXXXXX NOTIFY_CALLMEBOT_APIKEY=your_key
   ```

**Telegram (free, most reliable):**
1. Create a bot with `@BotFather`, copy the token.
2. Message your bot once, then open
   `https://api.telegram.org/bot<token>/getUpdates` to find your `chat.id`.
3. Set the secrets:
   ```bash
   supabase secrets set NOTIFY_TELEGRAM_BOT_TOKEN=your_token NOTIFY_TELEGRAM_CHAT_ID=your_chat_id
   ```

## Keeping Supabase awake

Free-tier projects pause after ~7 days idle. `.github/workflows/keepalive.yml` pings the
REST API every 3 days (public anon key) so the project never sleeps. It also runs on demand
from the Actions tab.
