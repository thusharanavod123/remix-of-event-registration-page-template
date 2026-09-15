import { BadgeCheck, Eye, Globe2, Handshake, Medal, ShieldCheck, Target, UserRoundCheck } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import aboutUsHeader from "@/assets/about-us-collage-header.jpg";
import aboutUsHeaderMobile from "@/assets/about-us-collage-header-mobile.jpg";
import slbfeLogo from "@/assets/slbfe-logo.webp";
import malindSriyaratna from "@/assets/team/malind-sriyaratna.jpeg";
import rasikaPrasad from "@/assets/team/rasika-prasad.jpeg";
import employeePerformanceRecognition from "@/assets/certificates/employee-performance-recognition.jpg";
import licenceAwarenessProgramme from "@/assets/certificates/new-licence-awareness-programme.jpg";

const values = [
  {
    icon: BadgeCheck,
    title: "Professional Approach",
    desc: "We maintain a structured and professional recruitment process focused on quality and reliability.",
    accent: "text-ro-blue",
  },
  {
    icon: ShieldCheck,
    title: "Ethical & Transparent",
    desc: "We believe in honest communication, clear processes, and responsible recruitment practices.",
    accent: "text-ro-red",
  },
  {
    icon: Globe2,
    title: "International Focus",
    desc: "We connect Sri Lankan talent with employment opportunities and employers across international markets.",
    accent: "text-ro-yellow",
  },
  {
    icon: UserRoundCheck,
    title: "Candidate-Centred Service",
    desc: "We guide candidates through the recruitment journey and provide support at every appropriate stage.",
    accent: "text-success",
  },
  {
    icon: Handshake,
    title: "Trusted Partnerships",
    desc: "We aim to develop strong, long-term relationships with reputable international employers and business partners.",
    accent: "text-ro-blue",
  },
];

const credentials = [
  {
    image: employeePerformanceRecognition,
    eyebrow: "Recognition",
    title: "Employee Performance Certificate",
    description: "Certificate of Recognition presented to H. M. M. Sriyarathna for dedication and performance in the foreign employment sector.",
  },
  {
    image: licenceAwarenessProgramme,
    eyebrow: "Professional development",
    title: "New Licence Awareness Programme",
    description: "Certificate issued to Elladria Lanka (Pvt) Ltd for participation in the programme conducted by the Sri Lanka Bureau of Foreign Employment.",
  },
];

export default function RecruitAbout() {
  return (
    <div>
      <header className="relative overflow-hidden border-b border-slate-300 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/50 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1600px] overflow-hidden border-b border-slate-300 bg-white shadow-sm">
          <picture>
            <source media="(max-width: 639px)" srcSet={aboutUsHeaderMobile} />
            <img
              src={aboutUsHeader}
              alt="Romanian landscapes and architecture representing Elladria Lanka's connection with Europe"
              width={1600}
              height={900}
              decoding="async"
              fetchPriority="high"
              className="block h-[460px] w-full object-cover sm:h-[500px] lg:h-[600px] xl:h-[680px]"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-ro-blue/85 via-ro-blue/45 to-black/10" aria-hidden="true" />
          <div className="absolute inset-0 flex items-center">
            <div className="w-full px-4 sm:px-8 lg:px-14">
              <span className="block text-xs font-bold uppercase tracking-[0.2em] text-white/80">About us</span>
              <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight text-white drop-shadow-md sm:text-4xl lg:text-5xl">
                Bridging Sri Lankan talent with European opportunity
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/85 drop-shadow sm:mt-5 sm:text-base sm:leading-7">
                Safe, transparent, and professional guidance for every stage of your international career journey.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">

      <section className="mt-10" aria-labelledby="about-elladria-title">
        <div className="max-w-4xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-ro-red">Who we are</span>
          <h2 id="about-elladria-title" className="mt-3 font-display text-3xl font-bold tracking-tight text-ro-blue sm:text-4xl">
            About Elladria Lanka
          </h2>
          <p className="mt-3 font-display text-xl font-semibold text-slate-600 sm:text-2xl">
            Connecting Sri Lankan Talent with Global Opportunities
          </p>
          <div className="mt-7 space-y-5 leading-8 text-muted-foreground">
            <p>
              Elladria Lanka (Private) Limited is a Sri Lankan international recruitment and foreign employment services company dedicated to connecting talented and hardworking Sri Lankans with reputable employers and career opportunities around the world.
            </p>
            <p>
              Established on <strong className="font-semibold text-ro-blue">01 March 2024</strong>, Elladria Lanka has developed its operations with a strong focus on professionalism, reliability, transparency, and client satisfaction. Our commitment is to create meaningful connections between qualified Sri Lankan candidates and international employers while providing professional guidance throughout the recruitment journey.
            </p>
          </div>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-ro-blue/15 bg-gradient-to-br from-slate-50 via-white to-blue-50 p-8 shadow-sm sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-ro-blue/10 blur-3xl" aria-hidden="true" />
          <div className="relative grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-lg sm:h-28 sm:w-28">
              <img
                src={slbfeLogo}
                alt="Sri Lanka Bureau of Foreign Employment logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ro-red">Licensed &amp; regulated</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-ro-blue sm:text-3xl">SLBFE Registered Foreign Employment Agency</h3>
              <div className="mt-5 space-y-5 leading-8 text-muted-foreground">
                <p>
                  Elladria Lanka is registered and licensed with the Sri Lanka Bureau of Foreign Employment (SLBFE) to conduct foreign employment agency activities. Our SLBFE registration became effective on <strong className="font-semibold text-ro-blue">01 June 2025</strong>, reflecting our commitment to operating within the required regulatory framework for Sri Lankan foreign employment services.
                </p>
                <p>
                  Our approach is built around ethical recruitment, transparency, compliance, and professional service. We work to ensure that candidates receive clear information and appropriate support while international employers gain access to reliable Sri Lankan talent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-14" aria-labelledby="vision-mission-title">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-ro-red">Our direction</span>
          <h2 id="vision-mission-title" className="mt-3 font-display text-3xl font-bold tracking-tight text-ro-blue sm:text-4xl">
            Building careers. Creating futures.
          </h2>
        </div>
        <div className="mt-9 grid gap-6 lg:grid-cols-2">
          <article className="relative overflow-hidden rounded-[2rem] border border-ro-blue/15 bg-gradient-to-br from-ro-blue to-ro-blue/90 p-8 text-white shadow-lg sm:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
            <div className="relative">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 shadow-inner backdrop-blur-sm">
                <Eye className="h-7 w-7 text-ro-yellow" aria-hidden="true" />
              </span>
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-ro-yellow">Where we are going</p>
              <h3 className="mt-2 font-display text-3xl font-bold">Our Vision</h3>
              <p className="mt-5 leading-8 text-white/85">
                To become a trusted global leader in international recruitment, connecting Sri Lankan talent with world-class career opportunities and creating a better future for individuals, businesses, and communities.
              </p>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-[2rem] border border-ro-yellow/30 bg-gradient-to-br from-white via-amber-50/60 to-ro-yellow/10 p-8 shadow-lg sm:p-10">
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-ro-yellow/20 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ro-yellow/20 shadow-inner">
                <Target className="h-7 w-7 text-ro-red" aria-hidden="true" />
              </span>
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-ro-red">How we get there</p>
              <h3 className="mt-2 font-display text-3xl font-bold text-ro-blue">Our Mission</h3>
              <p className="mt-5 leading-8 text-slate-600">
                To deliver ethical, professional, and reliable international recruitment solutions by connecting skilled and dedicated Sri Lankan talent with reputable employers worldwide. We are committed to transparency, compliance, personalized service, and long-term partnerships while supporting every candidate throughout their journey toward a successful career abroad.
              </p>
            </div>
          </article>
        </div>
      </section>

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
                At Elladria Lanka (Pvt) Ltd, we view recruitment as a serious responsibility that demands honesty, careful attention and professional discipline. Our purpose is not simply to facilitate overseas employment, but to help create a safe, secure and trustworthy pathway for Sri Lankan job seekers while delivering dependable manpower solutions to international employers. We believe lasting success comes from transparent communication, responsible recruitment practices and strong partnerships between candidates, employers and our international network.
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
                Business professional with 17+ years of experience in sales, marketing, business development, and top management. Skilled in strategic planning, leadership, international business development, and building strong client and business partnerships.
              </p>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                He holds a BEng (Hons) in Electronic and Electrical Engineering from the University of Sunderland and an IATA Travel and Tourism Consultancy Diploma (DTTC). His expertise includes global legal systems, policy frameworks, basic administrative procedures, portal navigation, appointment-scheduling logistics, document scrutiny, turnaround time (TAT) tracking, biometric-process coaching, upselling value-added services (VAS), and VFS handling.
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

      <section className="mt-20" aria-labelledby="why-choose-title">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-ro-red">The Elladria difference</span>
          <h2 id="why-choose-title" className="mt-3 font-display text-3xl font-bold tracking-tight text-ro-blue sm:text-4xl">Why Choose Elladria Lanka?</h2>
          <p className="mt-4 leading-7 text-muted-foreground">Professional recruitment built around trust, responsibility, and lasting international connections.</p>
        </div>
        <Accordion type="single" collapsible className="mx-auto mt-8 max-w-3xl border-t border-slate-200">
          {values.map((v, index) => (
            <AccordionItem key={v.title} value={`reason-${index + 1}`} className="border-slate-200">
              <AccordionTrigger className="gap-4 py-5 text-left hover:no-underline">
                <span className="flex min-w-0 items-center gap-4">
                  <v.icon className={`h-5 w-5 shrink-0 ${v.accent}`} aria-hidden="true" />
                  <span className="font-display text-lg font-bold text-ro-blue">{v.title}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pl-9 pr-8 text-base leading-7 text-muted-foreground">
                {v.desc}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

{/* Meet the Team section is temporarily hidden. */}

      <section className="mt-20 border-y border-slate-200 py-14 sm:py-16" aria-labelledby="commitment-title">
        <div className="mx-auto max-w-4xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-ro-red">What drives us</span>
          <h2 id="commitment-title" className="mt-3 font-display text-3xl font-bold tracking-tight text-ro-blue sm:text-4xl">Our Commitment</h2>
          <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-ro-blue via-ro-yellow to-ro-red" aria-hidden="true" />
          <div className="mt-8 space-y-6 leading-8 text-muted-foreground">
            <p>
              At Elladria Lanka, we believe that successful recruitment is more than simply filling a vacancy. It is about connecting the right person with the right opportunity.
            </p>
            <p>
              We are committed to maintaining professional standards throughout every stage of the recruitment process and building trusted, long-term relationships with candidates, employers, and international partners.
            </p>
            <p>
              Our goal is to help Sri Lankan professionals and workers access legitimate international career opportunities while helping global employers find dependable and capable talent from Sri Lanka.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-20" aria-labelledby="credentials-title">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Our commitment in action</span>
          <h2 id="credentials-title" className="mt-3 font-display text-3xl font-bold">Certificates and achievements</h2>
          <p className="mt-3 leading-7 text-muted-foreground">The credentials, professional standards, and recognition that demonstrate the results of our commitment to safe and reliable international recruitment.</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl gap-6 sm:grid-cols-2">
          {credentials.map(({ image, eyebrow, title, description }, index) => (
            <article key={title} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                <img src={image} alt={title} loading="lazy" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]" />
                <span className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 font-display text-xs font-extrabold text-ro-blue shadow-sm">0{index + 1}</span>
              </div>
              <div className="p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
                <h3 className="mt-2 font-display text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                <div className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-xs font-semibold text-muted-foreground"><Medal className="h-4 w-4 text-ro-yellow" />Elladria Lanka certificate</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mt-20 overflow-hidden border-y border-slate-200 py-16 text-center sm:py-20" aria-labelledby="purpose-title">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ro-yellow/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-ro-red">Looking forward</span>
          <h2 id="purpose-title" className="mt-3 font-display text-3xl font-bold tracking-tight text-ro-blue sm:text-4xl">Our Purpose</h2>
          <p className="mx-auto mt-7 max-w-3xl font-display text-xl font-semibold leading-8 text-slate-700 sm:text-2xl">
            To create opportunities that change lives and partnerships that build stronger businesses.
          </p>
          <p className="mx-auto mt-6 max-w-3xl leading-8 text-muted-foreground">
            At Elladria Lanka, we continue to expand our international network while strengthening our services to become a trusted name in Sri Lankan foreign employment and international recruitment.
          </p>
          <div className="mx-auto mt-9 h-1 w-20 rounded-full bg-gradient-to-r from-ro-blue via-ro-yellow to-ro-red" aria-hidden="true" />
          <p className="mt-7 font-display text-lg font-bold text-ro-blue sm:text-xl">
            Elladria Lanka — Connecting Talent. Creating Opportunities. Building Futures.
          </p>
        </div>
      </section>

      </div>
    </div>
  );
}
