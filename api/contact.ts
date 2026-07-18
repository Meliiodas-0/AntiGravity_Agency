// Vercel serverless function — receives contact-form submissions and pings
// the team on WhatsApp (via CallMeBot). No database, nothing to keep alive.
//
// Required Vercel env vars:
//   NOTIFY_WHATSAPP_PHONE     e.g. +919876543210  (your number, with country code)
//   NOTIFY_CALLMEBOT_APIKEY   the key CallMeBot DMs you
// Optional:
//   NOTIFY_TELEGRAM_BOT_TOKEN + NOTIFY_TELEGRAM_CHAT_ID  (belt-and-suspenders)

// Best-effort in-memory rate limit (per warm instance).
const HITS = new Map<string, number[]>();
const RATE_LIMIT = 4;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

type Body = {
  name?: string;
  brand?: string;
  message?: string;
  contact?: string;
  company?: string; // honeypot — real users never fill this
};

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body: Body = typeof req.body === "string" ? safeParse(req.body) : req.body ?? {};
  const { name, brand, message, contact, company } = body;

  // Honeypot: silently accept bots without notifying.
  if (company && company.trim().length > 0) {
    res.status(200).json({ success: true });
    return;
  }

  if (!isStr(name, 1, 100)) return bad(res, "Name is required (max 100 chars)");
  if (!isStr(brand, 1, 100)) return bad(res, "Brand/Role is required (max 100 chars)");
  if (!isStr(message, 1, 1000)) return bad(res, "Message is required (max 1000 chars)");
  if (!contact || !/^\+\d{1,4}\d{10}$/.test(String(contact).trim())) {
    return bad(res, "A valid phone number with country code is required");
  }

  // Rate limit by IP.
  const ip =
    (req.headers["x-forwarded-for"]?.toString().split(",")[0] || "").trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  const now = Date.now();
  const recent = (HITS.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    res.status(429).json({ error: "Too many submissions. Please try again later." });
    return;
  }
  recent.push(now);
  HITS.set(ip, recent);

  const lead = {
    name: name!.trim(),
    brand: brand!.trim(),
    message: message!.trim(),
    contact: contact!.trim(),
  };

  // Always leave a trace in the Vercel function logs as a safety net.
  console.log("New lead:", JSON.stringify(lead));

  await notify(lead);

  res.status(200).json({ success: true });
}

function isStr(v: unknown, min: number, max: number): v is string {
  return typeof v === "string" && v.trim().length >= min && v.length <= max;
}
function bad(res: any, error: string) {
  res.status(400).json({ error });
}
function safeParse(s: string): Body {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}

async function notify(lead: { name: string; brand: string; contact: string; message: string }) {
  const text =
    `🔔 New lead — Studs Agency\n\n` +
    `Name: ${lead.name}\n` +
    `Brand/Role: ${lead.brand}\n` +
    `Phone: ${lead.contact}\n\n` +
    `${lead.message}`;

  const jobs: Promise<unknown>[] = [];

  const waPhone = process.env.NOTIFY_WHATSAPP_PHONE;
  const waKey = process.env.NOTIFY_CALLMEBOT_APIKEY;
  if (waPhone && waKey) {
    const url =
      `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(waPhone)}` +
      `&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(waKey)}`;
    jobs.push(fetch(url).catch((e) => console.error("WhatsApp notify failed:", e)));
  }

  const tgToken = process.env.NOTIFY_TELEGRAM_BOT_TOKEN;
  const tgChat = process.env.NOTIFY_TELEGRAM_CHAT_ID;
  if (tgToken && tgChat) {
    jobs.push(
      fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: tgChat, text }),
      }).catch((e) => console.error("Telegram notify failed:", e))
    );
  }

  if (jobs.length === 0) {
    console.warn("No notification channel configured — set NOTIFY_WHATSAPP_PHONE + NOTIFY_CALLMEBOT_APIKEY.");
  }
  await Promise.allSettled(jobs);
}
