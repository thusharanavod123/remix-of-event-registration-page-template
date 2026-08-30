import { Compass, Handshake, ShieldCheck } from "lucide-react";
import TeamSection from "@/components/recruit/TeamSection";

const values = [
  {
    icon: Handshake,
    title: "Trusted partnerships",
    desc: "We work only with vetted European employers, so every offer we present is real, legal, and fairly paid.",
    accent: "text-ro-blue",
  },
  {
    icon: ShieldCheck,
    title: "Full transparency",
    desc: "No hidden fees, no false promises. You know the salary, conditions, and process before you commit.",
    accent: "text-ro-red",
  },
  {
    icon: Compass,
    title: "End-to-end guidance",
    desc: "From documents and visas to travel and settling in, our team supports you at every step of the journey.",
    accent: "text-ro-yellow",
  },
];

export default function RecruitAbout() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <span className="text-xs font-semibold uppercase tracking-wide text-ro-red">About us</span>
      <h1 className="mt-3 max-w-2xl font-display text-3xl font-bold sm:text-4xl">
        Bridging Sri Lankan talent with European opportunity
      </h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="space-y-5 text-muted-foreground">
          <p>
            EuroBridge Careers is a travel and recruitment agency dedicated to one mission: helping
            Sri Lankan job seekers build better futures through legitimate, well-paid work in Europe.
          </p>
          <p>
            We currently place candidates across Romania in three high-demand sectors — truck
            driving, factory work, and warehouse operations — partnering directly with employers who
            value reliability and hard work.
          </p>
          <p>
            Starting next month, we're expanding into neighboring European countries, opening even
            more doors for the people we serve. Our team handles the complexity so you can focus on
            the opportunity.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="font-display text-xl font-semibold">Our mission</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            To make overseas employment safe, transparent, and accessible for every Sri Lankan
            worker — connecting ambition with opportunity, one placement at a time.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6 text-center">
            <div>
              <p className="font-display text-2xl font-bold text-ro-blue">3</p>
              <p className="mt-1 text-xs text-muted-foreground">Job sectors</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-ro-red">100%</p>
              <p className="mt-1 text-xs text-muted-foreground">Vetted employers</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-ro-yellow">4+</p>
              <p className="mt-1 text-xs text-muted-foreground">Countries soon</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-center font-display text-2xl font-bold sm:text-3xl">What we stand for</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-6">
              <v.icon className={`h-8 w-8 ${v.accent}`} />
              <h3 className="mt-4 font-display text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

<TeamSection />

      <div className="mt-16 rounded-2xl bg-secondary/60 p-8 text-center">
        <h2 className="font-display text-2xl font-bold">Ready to take the next step?</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Book an office appointment and let's discuss which opportunity fits you best.
        </p>
        <a
          href="#book"
          className="mt-6 inline-block rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Book an appointment
        </a>
      </div>
    </div>
  );
}
