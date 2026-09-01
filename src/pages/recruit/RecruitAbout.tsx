import { Award, BadgeCheck, Compass, Handshake, Medal, ShieldCheck, Trophy } from "lucide-react";
import TeamSection from "@/components/recruit/TeamSection";
import companyLogo from "@/assets/elladria-lanka-logo-cropped.png";
import malindSriyaratna from "@/assets/team/malind-sriyaratna.jpeg";
import rasikaPrasad from "@/assets/team/rasika-prasad.jpeg";

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
    <div>
      <header className="relative overflow-hidden border-b border-slate-300 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/50 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="flex justify-center">
            <img src={companyLogo} alt="Elladria Lanka" className="h-16 w-52 object-contain opacity-70 sm:h-20 sm:w-64" />
          </div>
          <span className="mt-8 block text-xs font-bold uppercase tracking-[0.2em] text-ro-red">About us</span>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight text-ro-blue sm:text-4xl lg:text-5xl">
            Bridging Sri Lankan talent with European opportunity
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Safe, transparent, and professional guidance for every stage of your international career journey.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">

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

      <section className="mt-20 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-sm" aria-labelledby="founder-title">
        <div className="grid items-stretch lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative min-h-[420px] overflow-hidden bg-slate-200 sm:min-h-[520px] lg:min-h-0">
            <img
              src={malindSriyaratna}
              alt="Mr. Malind Sriyaratna, Founder and CEO of Elladria Lanka"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ro-blue/45 via-transparent to-transparent" aria-hidden="true" />
          </div>
          <div className="relative flex flex-col justify-center overflow-hidden px-7 py-12 sm:px-12 lg:px-16 lg:py-16">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-ro-yellow/15 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-ro-red">Leadership</span>
              <h2 id="founder-title" className="mt-4 font-display text-3xl font-bold tracking-tight text-ro-blue sm:text-4xl">
                Mr. Malind Sriyaratna
              </h2>
              <p className="mt-2 font-display text-base font-semibold text-slate-600">Founder &amp; CEO</p>
              <div className="mt-7 h-1 w-16 rounded-full bg-gradient-to-r from-ro-blue via-ro-yellow to-ro-red" aria-hidden="true" />
              <p className="mt-7 max-w-xl text-base leading-8 text-slate-600">
                With over 14 years of professional experience in the Travel &amp; Tourism industry, including more than 3 years of professional experience in Romania and over 11 years of senior-level management experience in Sri Lanka, he brings a strong combination of international exposure, industry knowledge, leadership, and strategic management expertise to Elladria Lanka.
              </p>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                He is a Qualified Visa Consultant with extensive practical experience in international travel, visa consultancy, migration-related services, client relationship management, business development, and professional service management. His experience working in Europe has provided him with valuable international insight into travel, tourism, employment, and cross-cultural business environments.
              </p>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                At Elladria Lanka, he provides strategic direction and oversees the company&apos;s overall operations, with a strong focus on maintaining professional standards, ethical service, client satisfaction, and reliable international business partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm" aria-labelledby="general-manager-title">
        <div className="grid items-stretch lg:grid-cols-[1.18fr_0.82fr]">
          <div className="relative flex flex-col justify-center overflow-hidden px-7 py-12 sm:px-12 lg:px-16 lg:py-16">
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-ro-blue/10 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-ro-red">Management</span>
              <h2 id="general-manager-title" className="mt-4 font-display text-3xl font-bold tracking-tight text-ro-blue sm:text-4xl">
                Mr. Rasika Prasad
              </h2>
              <p className="mt-2 font-display text-base font-semibold text-slate-600">General Manager | Qualified Visa Consultant</p>
              <div className="mt-7 h-1 w-16 rounded-full bg-gradient-to-r from-ro-blue via-ro-yellow to-ro-red" aria-hidden="true" />
              <p className="mt-7 max-w-xl text-base leading-8 text-slate-600">
                With 17+ years of experience in Travel &amp; Tourism, including 8+ years of professional experience in Europe and 7+ years of senior management experience in Sri Lanka, he brings extensive international and management expertise to Elladria Lanka. Holding a Higher Diploma in Tourism, Hospitality &amp; Events Management and professional qualifications as a Visa Consultant, he specializes in international travel, visa consultancy, client relations, business development, and professional service management.
              </p>
              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500">
                He leads Elladria Lanka with a strong commitment to professionalism, transparency, client satisfaction, and responsible international opportunities.
              </p>
            </div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden bg-slate-200 sm:min-h-[520px] lg:order-last lg:min-h-0">
            <img
              src={rasikaPrasad}
              alt="Mr. Rasika Prasad, General Manager of Elladria Lanka"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ro-blue/35 via-transparent to-transparent" aria-hidden="true" />
          </div>
        </div>
      </section>

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
    </div>
  );
}
