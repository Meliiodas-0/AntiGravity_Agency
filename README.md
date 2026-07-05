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
