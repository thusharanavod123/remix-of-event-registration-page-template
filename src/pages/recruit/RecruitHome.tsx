import { Link } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  CalendarCheck2,
  ClipboardCheck,
  FileSearch,
  MessagesSquare,
  Plane,
  Route,
} from "lucide-react";
import { FaqSection } from "@/components/recruit/FaqSection";
import { PartnerMarquee } from "@/components/recruit/PartnerMarquee";
import { motion } from "framer-motion";
import airportHero from "@/assets/hero/career-airport.jpg";
import airportHeroMobile from "@/assets/hero/career-airport-mobile.jpg";
import logisticsHero from "@/assets/hero/career-logistics.jpg";
import logisticsHeroMobile from "@/assets/hero/career-logistics-mobile.jpg";
import warehouseHero from "@/assets/hero/career-warehouse.jpg";
import warehouseHeroMobile from "@/assets/hero/career-warehouse-mobile.jpg";
import workersPlaneHero from "@/assets/hero/workers-plane-recruitment-hero.png";
import teamGroup from "@/assets/team/team-group.jpg";

const roles = [
  {
    image: logisticsHero,
    mobileImage: logisticsHeroMobile,
    imageAlt: "Truck driver working with a European logistics company",
    title: "Truck Drivers",
    desc: "International routes across the EU with competitive monthly salaries and accommodation support.",
  },
  {
    image: airportHero,
    mobileImage: airportHeroMobile,
    imageAlt: "Sri Lankan professional beginning an international career journey",
    title: "Factory Workers",
    desc: "Production and assembly line positions with full training provided — no experience needed.",
  },
  {
    image: warehouseHero,
    mobileImage: warehouseHeroMobile,
    imageAlt: "International team working in a modern warehouse",
    title: "Warehouse Workers",
    desc: "Sorting, packing, and logistics roles in modern distribution centers across Romania.",
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
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-ro-blue text-white">
        <motion.img
          src={workersPlaneHero}
          sizes="100vw"
          alt="Sri Lankan workers from different industries standing in front of a passenger aircraft"
          width={1916}
          height={821}
          decoding="async"
          fetchPriority="high"
          initial={{ opacity: 0, scale: 1.025 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover object-[62%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222_55%_10%/0.96)] via-[hsl(222_55%_10%/0.72)] to-[hsl(222_55%_10%/0.08)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222_55%_10%/0.52)] via-transparent to-black/10" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-ro-yellow" />
            International recruitment &amp; foreign employment
          </span>
          <h1 className="mt-7 max-w-3xl font-display text-5xl font-bold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
            Your Trusted International <span className="text-ro-yellow">Recruitment Agency.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
            Connecting Sri Lankan talent with trusted employers and career opportunities across Europe,
            with professional support from application to arrival.
          </p>
          <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row">
            <Link
              to="/vacancies"
              className="inline-flex items-center gap-2 rounded-full bg-ro-yellow px-7 py-3.5 text-sm font-semibold text-ro-blue shadow-lg shadow-black/15 transition-transform hover:-translate-y-0.5"
            >
              Explore job vacancies <ArrowRight className="h-4 w-4" />
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

        <div className="absolute inset-x-0 bottom-0 z-20 h-1 bg-ro-yellow" aria-hidden="true" />
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
          <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
            {roles.map((r) => (
              <div
                key={r.title}
                className="group overflow-hidden rounded-xl border border-border bg-background transition-shadow hover:shadow-md sm:rounded-2xl"
              >
                <div className="h-20 overflow-hidden bg-slate-100 sm:h-28 lg:h-32">
                  <img
                    src={r.image}
                    srcSet={`${r.mobileImage} 960w, ${r.image} 1672w`}
                    sizes="(max-width: 639px) 33vw, (max-width: 1023px) 30vw, 352px"
                    alt={r.imageAlt}
                    width={1672}
                    height={941}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 sm:p-5">
                  <h3 className="font-display text-sm font-semibold text-ro-blue sm:text-lg lg:text-xl">{r.title}</h3>
                  <p className="mt-2 hidden text-sm leading-6 text-muted-foreground sm:block">{r.desc}</p>
                  <Link
                    to="/vacancies"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary sm:mt-4 sm:text-sm"
                  >
                    See details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
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
                <img src={teamGroup} alt="The complete Elladria Lanka Careers team" width={1599} height={1332} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 hover:scale-[1.015]" />
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
