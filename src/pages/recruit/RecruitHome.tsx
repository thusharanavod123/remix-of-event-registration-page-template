import { Link } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  CalendarCheck2,
  ClipboardCheck,
  FileSearch,
  Factory,
  MessagesSquare,
  Plane,
  Route,
  Truck,
  Warehouse,
} from "lucide-react";
import { FaqSection } from "@/components/recruit/FaqSection";
import { PartnerMarquee } from "@/components/recruit/PartnerMarquee";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import airportHero from "@/assets/hero/career-airport.png";
import logisticsHero from "@/assets/hero/career-logistics.png";
import warehouseHero from "@/assets/hero/career-warehouse.png";
import teamGroup from "@/assets/team/team-group.jpg";

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

const serviceSteps = [
  {
    icon: ClipboardCheck,
    title: "Choose Your Visa & Service",
    description: "Select the right support for your tourist, student, work, employment, or business visa.",
  },
  {
    icon: FileSearch,
    title: "Document Checklist & Preparation",
    description: "Receive a personalized checklist and practical guidance for gathering every required supporting document.",
  },
  {
    icon: ClipboardCheck,
    title: "Thorough Review & Form Guidance",
    description: "We carefully review your documents and guide you through the forms to help prevent errors and delays.",
  },
  {
    icon: CalendarCheck2,
    title: "Appointment & Submission",
    description: "Follow clear instructions for scheduling your embassy appointment and submitting your application smoothly.",
  },
  {
    icon: MessagesSquare,
    title: "Interview Preparation",
    description: "Build confidence with tailored embassy interview preparation and one-to-one coaching.",
  },
  {
    icon: Route,
    title: "Status Tracking & Follow-up",
    description: "Stay informed with application tracking and guidance for any necessary embassy follow-up.",
  },
  {
    icon: Plane,
    title: "Flight Booking & Departure",
    description: "Complete your journey with our air-ticket service and practical support as you prepare to take off.",
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

      <PartnerMarquee />

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

      {/* Customer journey */}
      <section className="relative overflow-hidden bg-slate-50 py-20 lg:py-28">
        <div className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-ro-blue/5 blur-3xl" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-ro-red">How we support you</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ro-blue sm:text-4xl lg:text-5xl">
              Your journey, clearly guided from start to takeoff
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Seven simple steps, with expert guidance at every stage of your visa application and travel preparation.
            </p>
          </div>

          <ol className="relative mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {serviceSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.3) }}
                  className={`group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${index === serviceSteps.length - 1 ? "md:col-span-2 lg:col-span-3 lg:mx-auto lg:w-[calc(33.333%-0.85rem)]" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ro-blue text-white shadow-md shadow-ro-blue/15">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-display text-4xl font-extrabold text-ro-blue/10 transition-colors group-hover:text-ro-yellow">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-ro-red">Step {index + 1}</p>
                  <h3 className="mt-2 font-display text-xl font-bold leading-snug text-ro-blue">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.description}</p>
                  <div className="absolute inset-x-6 bottom-0 h-1 origin-left scale-x-0 rounded-full bg-gradient-to-r from-ro-blue via-ro-yellow to-ro-red transition-transform duration-300 group-hover:scale-x-100" aria-hidden="true" />
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Team introduction */}
      <section className="overflow-hidden bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-ro-red">The people behind your journey</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ro-blue sm:text-4xl lg:text-5xl">
              Meet the team supporting you
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Dedicated specialists working together to guide you from your first application to your departure.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2rem] bg-ro-blue shadow-2xl shadow-ro-blue/15"
          >
            <div>
              <div className="relative aspect-[3/2] overflow-hidden bg-slate-200">
                <img src={teamGroup} alt="The complete EuroBridge Careers team" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 hover:scale-[1.015]" />
                <div className="absolute inset-0 bg-gradient-to-t from-ro-blue/35 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/90 px-4 py-3 text-ro-blue shadow-xl backdrop-blur sm:bottom-7 sm:left-7">
                  <span className="font-display text-2xl font-extrabold">7</span>
                  <span className="text-xs font-semibold leading-tight">Dedicated<br />specialists</span>
                </div>
              </div>
              <div className="relative px-7 py-10 text-white sm:px-10 sm:py-12 lg:px-14">
                <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-primary/25 blur-3xl" aria-hidden="true" />
                <div className="relative grid items-end gap-7 lg:grid-cols-[1fr_0.75fr]">
                  <div><span className="text-xs font-bold uppercase tracking-[0.2em] text-ro-yellow">People behind your journey</span><h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">A real team beside you at every step.</h2></div>
                  <div><p className="text-sm leading-7 text-white/70 sm:text-base">From recruitment and employer matching to visas, travel, and settling in, our specialists make a complex international journey feel clear and manageable.</p><Link to="/about" className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-ro-yellow px-6 py-3 text-sm font-semibold text-ro-blue transition-transform hover:-translate-y-0.5">Meet our team <ArrowRight className="h-4 w-4" /></Link></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />
    </div>
  );
}
