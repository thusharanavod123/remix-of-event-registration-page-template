import { NavLink, Link, Outlet } from "react-router-dom";
import { ArrowUpRight, Globe, HeartHandshake, MapPin, Menu, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { BookingSection } from "./BookingSection";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/vacancies", label: "Vacancies" },
  { to: "/about", label: "About Us" },
];

export function RecruitLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Globe className="h-4 w-4" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              EuroBridge<span className="text-primary"> Careers</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <a
              href="#book"
              className="ml-2 rounded-full bg-ro-yellow px-4 py-2 text-sm font-semibold text-ro-blue transition-opacity hover:opacity-90"
            >
              Book an appointment
            </a>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <nav className="border-t border-border px-4 py-3 md:hidden">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-2.5 text-sm font-medium ${
                    isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-lg bg-ro-yellow px-4 py-2.5 text-center text-sm font-semibold text-ro-blue"
            >
              Book an appointment
            </a>
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <BookingSection />

      <footer className="relative overflow-hidden bg-[hsl(222_55%_14%)] text-white">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-ro-blue-soft/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-16 sm:px-6 lg:pt-20">
          <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-[1.35fr_0.65fr_0.8fr_0.8fr]">
            <div>
              <Link to="/" className="inline-flex items-center gap-3" aria-label="EuroBridge Careers home">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ro-blue shadow-lg shadow-black/15"><Globe className="h-5 w-5" /></span>
                <span className="font-display text-xl font-bold tracking-tight">EuroBridge<span className="text-ro-yellow"> Careers</span></span>
              </Link>
              <p className="mt-5 max-w-md text-sm leading-6 text-white/65">Helping Sri Lankan job seekers access trusted European employment with clear guidance from application to arrival.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs text-white/80"><ShieldCheck className="h-4 w-4 text-ro-yellow" /> Vetted employers</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs text-white/80"><HeartHandshake className="h-4 w-4 text-ro-yellow" /> End-to-end support</span>
              </div>
            </div>
            <div>
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-white/45">Explore</h2>
              <nav className="mt-5 space-y-3" aria-label="Footer navigation">
                {navItems.map((item) => <Link key={item.to} to={item.to} className="group flex w-fit items-center gap-1.5 text-sm text-white/75 transition-colors hover:text-white">{item.label}<ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" /></Link>)}
                <a href="#book" className="group flex w-fit items-center gap-1.5 text-sm text-white/75 transition-colors hover:text-white">Book an appointment<ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" /></a>
              </nav>
            </div>
            <div>
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-white/45">Opportunities</h2>
              <ul className="mt-5 space-y-3 text-sm text-white/75"><li>Truck driving</li><li>Factory operations</li><li>Warehouse & logistics</li></ul>
              <Link to="/vacancies" className="mt-6 inline-flex items-center gap-2 rounded-full bg-ro-yellow px-5 py-2.5 text-sm font-semibold text-ro-blue transition-transform hover:-translate-y-0.5">View available jobs <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
            <div>
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-white/45">Careers</h2>
              <p className="mt-5 text-sm leading-6 text-white/65">Want to help people build careers across borders? Explore opportunities within our team.</p>
              <Link to="/careers" className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-ro-yellow">Join EuroBridge <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
            </div>
          </div>
          <div className="flex flex-col gap-5 pt-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} EuroBridge Careers. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3"><span className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-ro-yellow" />Sri Lanka → Europe</span><Link to="/admin" className="transition-colors hover:text-white/75">Admin access</Link></div>
          </div>
        </div>
        <div className="flex h-1.5" aria-hidden="true"><span className="flex-1 bg-ro-blue-soft" /><span className="flex-1 bg-ro-yellow" /><span className="flex-1 bg-ro-red" /></div>
      </footer>
    </div>
  );
}
