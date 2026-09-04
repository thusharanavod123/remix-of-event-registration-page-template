// Default copy for each Landing section. Used as fallback when no override row
// exists in the `landing_sections` table.

export type LandingSectionKey =
  | "hero"
  | "popular_events"
  | "features"
  | "testimonials"
  | "cta";

export interface HeroContent {
  badge: string;
  headline_prefix: string;
  rotating_words: string[];
  subhead: string;
  cta: string;
}

export interface PopularEventsContent {
  title_line_1: string;
  title_line_2: string;
  subhead: string;
  cta_label: string;
}

export interface FeaturesContent {
  eyebrow: string;
  title_line_1: string;
  title_line_2: string;
  subhead: string;
  items: { tag: string; title: string; description: string }[];
}

export interface TestimonialsContent {
  title: string;
  items: { quote: string; name: string; role: string }[];
}

export interface CtaContent {
  title_line_1: string;
  title_line_2: string;
  subhead: string;
  cta_label: string;
}

export const LANDING_DEFAULTS = {
  hero: {
    badge: "Now recruiting for Romania",
    headline_prefix: "Your European career becomes",
    rotating_words: ["reality.", "a new life.", "opportunity.", "growth."],
    subhead:
      "We connect Sri Lankan job seekers with trusted European employers — truck driving, factory, and warehouse roles in Romania, with full support from application to arrival.",
    cta: "View vacancies",
  } as HeroContent,
  popular_events: {
    title_line_1: "Open vacancies",
    title_line_2: "in Romania",
    subhead: "High-demand roles with vetted employers, fair salaries, and accommodation support.",
    cta_label: "Browse all vacancies",
  } as PopularEventsContent,
  features: {
    eyebrow: "Built for job seekers",
    title_line_1: "Everything you need to",
    title_line_2: "work in Europe.",
    subhead: "From your first consultation to your first paycheck, Elladria Lanka Careers has you covered.",
    items: [
      { tag: "Guidance", title: "End-to-end support", description: "Documents, visas, travel, and settling in — our team walks with you at every step." },
      { tag: "Trust", title: "Vetted employers only", description: "Every offer is real, legal, and fairly paid. We partner directly with European companies." },
      { tag: "Clarity", title: "Full transparency", description: "Know the salary, conditions, and process before you commit. No hidden fees, ever." },
      { tag: "Community", title: "One hub for everyone", description: "Sinhala, Tamil, and English speaking staff — book an office visit and talk face to face." },
    ],
  } as FeaturesContent,
  testimonials: {
    title: "Loved by our candidates",
    items: [
      { quote: "Elladria Lanka got me a truck driving job in Bucharest in six weeks. They handled everything — I just showed up.", name: "Nuwan Perera", role: "Truck driver, Bucharest" },
      { quote: "The team explained every step in Sinhala. I never felt lost in the process.", name: "Kasun Fernando", role: "Warehouse worker, Timișoara" },
      { quote: "Honest people. The salary and conditions they promised are exactly what I got.", name: "Dilani Silva", role: "Factory worker, Cluj-Napoca" },
      { quote: "From Colombo to Constanța, they supported me through documents, visa, and travel.", name: "Ravi Kumar", role: "Truck driver, Constanța" },
      { quote: "My whole family thanks Elladria Lanka. This opportunity changed our lives.", name: "Amara Jayasinghe", role: "Factory worker, Iași" },
    ],
  } as TestimonialsContent,
  cta: {
    title_line_1: "Ready to start",
    title_line_2: "your journey?",
    subhead: "Book an office appointment today and let's find the European opportunity that fits you.",
    cta_label: "Book an appointment",
  } as CtaContent,
};

export type LandingContentMap = {
  hero: HeroContent;
  popular_events: PopularEventsContent;
  features: FeaturesContent;
  testimonials: TestimonialsContent;
  cta: CtaContent;
};

export const LANDING_SECTION_LABELS: Record<LandingSectionKey, string> = {
  hero: "Hero",
  popular_events: "Vacancies heading",
  features: "Features grid",
  testimonials: "Testimonials",
  cta: "Final call to action",
};
