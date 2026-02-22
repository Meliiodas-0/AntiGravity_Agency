import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const RATE_LIMIT = 3;
const RATE_WINDOW_MINUTES = 1440; // 24 hours

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  // Parse & validate body
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const { name, brand, message, contact } = body as Record<string, string>;

  if (!name || typeof name !== "string" || name.trim().length === 0 || name.length > 100) {
    return json({ error: "Name is required (max 100 chars)" }, 400);
  }
  if (!brand || typeof brand !== "string" || brand.trim().length === 0 || brand.length > 100) {
    return json({ error: "Brand/Role is required (max 100 chars)" }, 400);
  }
  if (!message || typeof message !== "string" || message.trim().length === 0 || message.length > 1000) {
    return json({ error: "Message is required (max 1000 chars)" }, 400);
  }
  if (!contact || typeof contact !== "string" || !/^\+\d{1,4}\d{10}$/.test(contact.trim())) {
    return json({ error: "A valid phone number with country code is required" }, 400);
  }

  // Extract client IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  // Create service-role client
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Rate limit check
  const since = new Date(Date.now() - RATE_WINDOW_MINUTES * 60 * 1000).toISOString();

  const { count, error: countError } = await supabase
    .from("contact_submissions")
    .select("*", { count: "exact", head: true })
    .eq("ip_address", ip)
    .gte("created_at", since);

  if (countError) {
    console.error("Rate limit check failed:", countError);
    return json({ error: "Internal error" }, 500);
  }

  if ((count ?? 0) >= RATE_LIMIT) {
    return json({ error: "Too many submissions. Please try again later." }, 429);
  }

  // Insert submission
  const { error: insertError } = await supabase.from("contact_submissions").insert({
    name: name.trim(),
    brand: brand.trim(),
    message: message.trim(),
    contact: contact.trim(),
    ip_address: ip,
  });

  if (insertError) {
    console.error("Insert failed:", insertError);
    return json({ error: "Failed to submit. Please try again." }, 500);
  }

  return json({ success: true });
});
