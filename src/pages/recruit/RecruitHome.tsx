import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Factory, Truck, Warehouse } from "lucide-react";
import { FaqSection } from "@/components/recruit/FaqSection";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import airportHero from "@/assets/hero/career-airport.png";
import logisticsHero from "@/assets/hero/career-logistics.png";
import warehouseHero from "@/assets/hero/career-warehouse.png";

const heroSlides = [
  { image: airportHero, alt: "Sri Lankan professional beginning her journey to a European career" },
  { image: logisticsHero, alt: "Sri Lankan logistics professional working with a modern European transport company" },
  { image: warehouseHero, alt: "International logistics team collaborating in a modern European warehouse" },
];

const roles = [
  {
    icon: Truck,
    title: "Truck Drivers",
    desc: "International routes across the EU with competitive monthly salaries and accommodation support.",
    accent: "bg-ro-blue",
  },
  {
    icon: Factory,
    title: "Factory Workers",
    desc: "Production and assembly line positions with full training provided — no experience needed.",
    accent: "bg-ro-yellow",
  },
  {
    icon: Warehouse,
    title: "Warehouse Workers",
    desc: "Sorting, packing, and logistics roles in modern distribution centers across Romania.",
    accent: "bg-ro-red",
  },
];

export default function RecruitHome() {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % heroSlides.length), 6000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-ro-blue text-white">
        <AnimatePresence initial={false} mode="sync">
          <motion.img
            key={heroSlides[slide].image}
            src={heroSlides[slide].image}
            alt={heroSlides[slide].alt}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.1, ease: "easeInOut" }, scale: { duration: 6.5, ease: "linear" } }}
            className="absolute inset-0 h-full w-full object-cover object-[68%_center]"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222_55%_10%/0.96)] via-[hsl(222_55%_10%/0.72)] to-[hsl(222_55%_10%/0.08)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222_55%_10%/0.52)] via-transparent to-black/10" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-ro-yellow" />
            Now recruiting for Romania
          </span>
          <h1 className="mt-7 max-w-3xl font-display text-5xl font-bold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
            Your European career starts <span className="text-ro-yellow">here.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
            We connect Sri Lankan job seekers with trusted employers in Romania — with full support
            from application to arrival.
          </p>
          <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
            <Link
              to="/vacancies"
              className="inline-flex items-center gap-2 rounded-full bg-ro-yellow px-7 py-3.5 text-sm font-semibold text-ro-blue shadow-lg shadow-black/15 transition-transform hover:-translate-y-0.5"
            >
              View available jobs <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#book"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              Book an office visit
            </a>
          </div>
          </motion.div>
        </div>

        <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2" role="tablist" aria-label="Hero slides">
          {heroSlides.map((item, index) => (
            <button key={item.image} type="button" onClick={() => setSlide(index)} className="group flex h-8 items-center" aria-label={`Show slide ${index + 1}`} aria-selected={slide === index} role="tab">
              <span className={`block h-1.5 rounded-full transition-all duration-500 ${slide === index ? "w-10 bg-ro-yellow" : "w-5 bg-white/45 group-hover:bg-white/75"}`} />
            </button>
          ))}
        </div>
        <motion.div key={`progress-${slide}`} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 6, ease: "linear" }} className="absolute bottom-0 left-0 z-20 h-1 w-full origin-left bg-ro-yellow" aria-hidden="true" />
      </section>

      {/* Roles */}
      <section className="border-t border-border bg-card py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wide text-ro-red">
              Open roles in Romania
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Opportunities available now
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {roles.map((r) => (
              <div
                key={r.title}
                className="group rounded-2xl border border-border bg-background p-6 transition-shadow hover:shadow-md"
              >
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${r.accent} text-primary-foreground`}
                >
                  <r.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
                <Link
                  to="/vacancies"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary"
                >
                  See details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expansion banner */}
      <section className="bg-ro-blue py-14 text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center sm:px-6">
          <Briefcase className="h-8 w-8 text-ro-yellow" />
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Expanding across Europe next month
          </h2>
          <p className="max-w-2xl text-sm opacity-85">
            Soon we'll be placing candidates in neighboring European countries too. Register your
            interest today and be first in line when new vacancies open.
          </p>
          <a
            href="#book"
            className="mt-2 rounded-full bg-ro-yellow px-7 py-3 text-sm font-semibold text-ro-blue transition-opacity hover:opacity-90"
          >
            Register your interest
          </a>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />
    </div>
  );
}
