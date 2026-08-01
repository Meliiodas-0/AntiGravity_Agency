import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { content } from "@/content/content";
import { toast } from "sonner";
import { motion } from "framer-motion";
import ScrollReveal from "./motion/ScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  brand: z.string().trim().min(1, "Brand/Role is required").max(100),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

export default function ContactForm() {
  const isMobile = useIsMobile();
  const [form, setForm] = useState({ name: "", brand: "", message: "" });

  // No backend: the form hands the lead straight to the agency's WhatsApp via a
  // wa.me deep link. Free, nothing to keep alive, and can't silently drop leads.
  // We don't ask for a phone number: when the visitor sends the WhatsApp message,
  // their number reaches us through WhatsApp automatically, so a field would be
  // redundant (and one less piece of data we ever collect).
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    // wa.me needs digits only, country code included, no "+" or spaces.
    const waNumber = content.contact.whatsapp.replace(/\D/g, "");
    if (waNumber.length < 8) {
      toast.error("Contact channel isn't set up yet. Please try again later.");
      return;
    }

    const { name, brand, message } = result.data;
    const text =
      `Hi Studs Agency! 👋\n\n` +
      `Name: ${name}\n` +
      `Brand / Role: ${brand}\n\n` +
      `${message}`;

    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

    // Runs inside the submit gesture, so browsers won't block the new tab.
    // Fall back to same-tab navigation if a popup blocker still intervenes.
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;

    toast.success("Opening WhatsApp. Just hit send to reach us.");
    setForm({ name: "", brand: "", message: "" });
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
          initial={{
            opacity: isMobile ? 0.3 : 0,
            y: isMobile ? 10 : 20
          }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: isMobile ? "200px" : "-60px" }}
          transition={{ duration: isMobile ? 0.4 : 0.7, ease: [0.22, 1, 0.36, 1] }}
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

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-semibold py-4 rounded-lg hover:brightness-110 active:scale-[0.98] transition-all text-base shadow-lg shadow-primary/20 cta-glow"
            >
              Send
            </button>

            <p className="text-xs text-muted-foreground/70 text-center leading-relaxed">
              This opens WhatsApp with your message ready to send. By continuing you agree to our{" "}
              <Link to="/privacy" className="underline underline-offset-2 hover:text-foreground transition-colors">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link to="/terms" className="underline underline-offset-2 hover:text-foreground transition-colors">
                Terms
              </Link>
              .
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
