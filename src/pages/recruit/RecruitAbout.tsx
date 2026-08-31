import { Award, BadgeCheck, Compass, Handshake, Medal, ShieldCheck, Trophy } from "lucide-react";
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

const credentials = [
  { icon: BadgeCheck, eyebrow: "Credentials", title: "Official registrations", description: "Company registrations, licences, and verified operating credentials.", accent: "from-primary/20 to-primary/5" },
  { icon: Award, eyebrow: "Standards", title: "Professional certifications", description: "Certificates demonstrating service quality and professional compliance.", accent: "from-ro-yellow/25 to-ro-yellow/5" },
  { icon: Trophy, eyebrow: "Recognition", title: "Awards & achievements", description: "Industry awards and milestones earned by the EuroBridge team.", accent: "from-success/20 to-success/5" },
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

      <section className="mt-20" aria-labelledby="credentials-title">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Trust & recognition</span>
          <h2 id="credentials-title" className="mt-3 font-display text-3xl font-bold">Certificates and achievements</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">A dedicated place for the documents and recognition that support our commitment to safe, professional recruitment.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {credentials.map(({ icon: Icon, eyebrow, title, description, accent }, index) => (
            <article key={title} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className={`relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${accent}`}>
                <div className="absolute inset-4 rounded-xl border border-dashed border-foreground/15" />
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/70 bg-white/80 text-ro-blue shadow-lg backdrop-blur transition-transform duration-500 group-hover:scale-105">
                  <Icon className="h-9 w-9" />
                </span>
                <span className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 font-display text-xs font-extrabold text-ro-blue shadow-sm">0{index + 1}</span>
              </div>
              <div className="p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
                <h3 className="mt-2 font-display text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                <div className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-xs font-semibold text-muted-foreground"><Medal className="h-4 w-4 text-ro-yellow" />Document slot ready</div>
              </div>
            </article>
          ))}
        </div>
      </section>

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
