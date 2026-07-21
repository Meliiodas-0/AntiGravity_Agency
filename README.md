# Studs Agency

Marketing site for Studs Agency — an end-to-end digital growth partner.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui + Framer Motion
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

## Contact form ("Let's talk")

No backend, no database, no third-party service, nothing to keep alive. The form
([`src/components/ContactForm.tsx`](src/components/ContactForm.tsx)) validates the
input and hands the lead straight to the agency's WhatsApp via a `wa.me` deep link:
the visitor's WhatsApp opens with their name, brand/role, phone, and message
prefilled, and they tap send. Leads land directly in your WhatsApp inbox and can
never be silently dropped by an unconfigured or lapsed API key.

### Setup — the only thing to configure

Set the destination number once in
[`src/content/content.ts`](src/content/content.ts) under `contact.whatsapp`.
Use digits only, with country code, **no `+` or spaces**:

```ts
contact: {
  ...
  whatsapp: "919876543210", // India +91 98765 43210
}
```

That's it. No environment variables, no Vercel settings, no redeploy caveats.
