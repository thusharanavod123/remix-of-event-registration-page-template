import { motion } from "framer-motion";
import { useState } from "react";
import { useFaqs } from "@/hooks/useFaqs";

export const FAQS = [
  {
    q: "What documents do I need to apply?",
    a: "A valid passport (at least 6 months validity), an updated CV, and a clean police clearance certificate. Our team will guide you through the full list once you book an appointment.",
  },
  {
    q: "How long does the whole process take?",
    a: "Typically 4–8 weeks from your first appointment to arrival in Romania — depending on document processing and employer requirements. We keep you updated at every stage.",
  },
  {
    q: "Are there any fees for your service?",
    a: "We are fully transparent: you will be told about any legitimate government or visa fees upfront. There are no hidden charges — everything is confirmed in writing before you commit.",
  },
  {
    q: "What salaries can I expect?",
    a: "Truck drivers earn €1,800–€2,800 per month, factory workers €1,100–€1,400, and warehouse workers €1,000–€1,500 — depending on experience and location.",
  },
  {
    q: "Is accommodation provided?",
    a: "Yes. Most employers provide subsidized or free accommodation, and our team helps you arrange housing in every case before you travel.",
  },
  {
    q: "Do I need to speak Romanian or English?",
    a: "No Romanian is required for most roles. Basic English helps and is preferred for some positions — we assess your profile and match you to the right role.",
  },
  {
    q: "Do you help with visa and travel arrangements?",
    a: "Yes — from work permit and visa applications to flights and airport pickup, we coordinate the entire journey so you can travel with confidence.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { data } = useFaqs();
  const faqs = data?.length ? data.map((faq) => ({ q: faq.question, a: faq.answer })) : FAQS;

  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-primary mb-4">
            Frequently asked questions
          </span>
          <h2 className="text-4xl sm:text-5xl font-display text-foreground tracking-[-0.03em] leading-[1.05]">
            Answers before you ask
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mt-4">
            Everything candidates usually want to know about working in Romania. Hover or tap a
            question to reveal the answer.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className={`group cursor-pointer rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                      : "border-border bg-card hover:border-primary/50 hover:shadow-md"
                  }`}
                  onMouseEnter={() => setOpenIndex(i)}
                  onMouseLeave={() => setOpenIndex((cur) => (cur === i ? null : cur))}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <div className="flex items-center justify-between gap-4 px-6 py-5">
                    <h3 className="font-display font-semibold text-base sm:text-lg text-foreground">
                      {faq.q}
                    </h3>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                        isOpen ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/15 group-hover:text-primary"
                      }`}
                    >
                      +
                    </motion.span>
                  </div>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                      {faq.a}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
