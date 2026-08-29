import { NavLink, Link, Outlet } from "react-router-dom";
import { Globe, Menu, X } from "lucide-react";
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

      <footer className="border-t border-border bg-ro-blue text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm sm:flex-row sm:px-6">
          <span className="font-display font-bold">EuroBridge Careers</span>
          <div className="flex items-center gap-2">
            <span className="h-3 w-2 rounded-sm bg-ro-blue-soft" />
            <span className="h-3 w-2 rounded-sm bg-ro-yellow" />
            <span className="h-3 w-2 rounded-sm bg-ro-red" />
            <span className="ml-2 opacity-80">Sri Lanka → Europe</span>
          </div>
          <span className="opacity-70">© {new Date().getFullYear()} EuroBridge Careers. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
