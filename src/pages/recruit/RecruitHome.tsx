import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Factory, Truck, Warehouse } from "lucide-react";

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
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-ro-blue/10 blur-3xl" />
          <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-ro-yellow/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-ro-red/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 sm:py-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-ro-blue" />
            <span className="h-2 w-2 rounded-full bg-ro-yellow" />
            <span className="h-2 w-2 rounded-full bg-ro-red" />
            Now recruiting for Romania
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl">
            Your European career starts{" "}
            <span className="text-primary">here.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            We connect Sri Lankan job seekers with trusted employers in Romania — with full support
            from application to arrival.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/vacancies"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              View open vacancies <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#book"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3 text-sm font-semibold transition-colors hover:bg-accent"
            >
              Book an office visit
            </a>
          </div>
        </div>
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
    </div>
  );
}
