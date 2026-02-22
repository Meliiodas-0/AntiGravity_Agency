import { useState } from "react";
import { z } from "zod";
import { content } from "@/content/content";
import { toast } from "sonner";
import { motion } from "framer-motion";
import ScrollReveal from "./motion/ScrollReveal";

const COUNTRY_CODES = [
  { code: "+91", label: "🇮🇳 +91" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+61", label: "🇦🇺 +61" },
  { code: "+971", label: "🇦🇪 +971" },
  { code: "+65", label: "🇸🇬 +65" },
  { code: "+49", label: "🇩🇪 +49" },
  { code: "+33", label: "🇫🇷 +33" },
  { code: "+81", label: "🇯🇵 +81" },
  { code: "+86", label: "🇨🇳 +86" },
];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  brand: z.string().trim().min(1, "Brand/Role is required").max(100),
  message: z.string().trim().min(1, "Message is required").max(1000),
  contact: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
});

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", brand: "", message: "", contact: "" });
  const [countryCode, setCountryCode] = useState("+91");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        "https://anbhgvgkxwofdmbhevbl.supabase.co/functions/v1/submit-contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...result.data,
            contact: `${countryCode}${result.data.contact}`,
          }),
        }
      );

      if (res.status === 429) {
        toast.error("Too many submissions. Please try again later.");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed");
      }

      toast.success("Message sent! We'll be in touch.");
      setForm({ name: "", brand: "", message: "", contact: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: "name", label: "Name", type: "input", placeholder: "Your name", inputType: "text" },
    { key: "brand", label: "Brand / Role", type: "input", placeholder: "Your brand or role", inputType: "text" },
    { key: "message", label: "What needs to be handled digitally", type: "textarea", placeholder: "Tell us what you need", inputType: "text" },
  ];

  return (
    <section id="contact" className="relative scroll-mt-24 py-20 sm:py-24 md:py-32 px-5 sm:px-6">
      <div className="max-w-xl mx-auto">
        <ScrollReveal className="mb-10 sm:mb-14">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-primary/70 mb-3 sm:mb-4 font-medium">Get in touch</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-3 sm:mb-4">
            {content.contact.title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            {content.contact.sub}
          </p>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {fields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm sm:text-base text-muted-foreground mb-2">
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full rounded-lg border border-border/60 bg-card/50 px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 min-h-[130px] transition-colors"
                  />
                ) : (
                  <input
                    type={field.inputType}
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full rounded-lg border border-border/60 bg-card/50 px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-colors"
                  />
                )}
              </div>
            ))}

            <div>
              <label className="block text-sm sm:text-base text-muted-foreground mb-2">Phone number</label>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="rounded-lg border border-border/60 bg-card/50 px-3 py-3.5 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shrink-0 min-w-[100px] transition-colors"
                >
                  {COUNTRY_CODES.map((cc) => (
                    <option key={cc.code} value={cc.code}>{cc.label}</option>
                  ))}
                </select>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={form.contact}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setForm({ ...form, contact: val });
                  }}
                  placeholder="10-digit number"
                  className="w-full rounded-lg border border-border/60 bg-card/50 px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
                />
              </div>
              {form.contact.length > 0 && form.contact.length < 10 && (
                <p className="text-xs text-destructive mt-1.5">
                  Enter a 10-digit phone number ({form.contact.length}/10)
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-lg hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 text-base shadow-lg shadow-primary/20 cta-glow"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
