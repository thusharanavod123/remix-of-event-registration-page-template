import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck2,
  ClipboardCheck,
  FileSearch,
  MessagesSquare,
  Plane,
  Route,
} from "lucide-react";
import { FaqSection } from "@/components/recruit/FaqSection";

import { motion, useReducedMotion } from "framer-motion";
import airportHero from "@/assets/hero/career-airport.jpg";
import airportHeroMobile from "@/assets/hero/career-airport-mobile.jpg";
import logisticsHero from "@/assets/hero/career-logistics.jpg";
import logisticsHeroMobile from "@/assets/hero/career-logistics-mobile.jpg";
import warehouseHero from "@/assets/hero/career-warehouse.jpg";
import warehouseHeroMobile from "@/assets/hero/career-warehouse-mobile.jpg";
import workersPlaneHero from "@/assets/hero/workers-plane-recruitment-hero.png";

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
    desc: "Production and assembly line positions with full training provided - no experience needed.",
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
  const reduceMotion = useReducedMotion();
  return <div className="recruit-home">
    <section className="recruit-hero" aria-labelledby="home-heading">
      <motion.img src={workersPlaneHero} alt="Sri Lankan workers standing in front of an aircraft, ready for their next chapter" fetchPriority="high" className="recruit-hero-image" initial={reduceMotion ? false : { scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 2 }} />
      <div className="recruit-hero-shade" />
      <div className="recruit-hero-topline"><span>International recruitment / Sri Lanka</span><span>Built around your future</span></div>
      <motion.div className="recruit-hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
        <p className="recruit-kicker"><span className="recruit-signal" />Talent without borders</p>
        <h1 id="home-heading">Your ambition.<br />A world of<br /><em>opportunity.</em></h1>
        <div className="recruit-hero-actions"><Link className="recruit-button recruit-button-light" to="/vacancies">Explore opportunities <ArrowUpRight size={19} /></Link><a className="recruit-text-link" href="#book">Start your journey <ArrowUpRight size={17} /></a></div>
      </motion.div>
      <div className="recruit-hero-bottom"><span>Trusted international recruitment.<br />From application to arrival.</span><a href="#mission">Discover Elladria <span>↓</span></a><span>LK <span className="recruit-route-line" /> EU</span></div>
    </section>

    <section id="mission" className="recruit-mission recruit-section">
      <div className="recruit-section-label"><span>01 / Our purpose</span><span>People. Progress. Possibility.</span></div>
      <div className="recruit-mission-grid"><h2>Great talent deserves<br />a bigger <em>horizon.</em></h2><div><p>We connect Sri Lankan talent with trusted employers and career opportunities across Europe.</p><p className="recruit-secondary-copy">The next step can change everything. We make it clearer, with professional guidance through recruitment, documents, visa preparation, and departure.</p><Link className="recruit-text-link" to="/about">Meet Elladria Lanka <ArrowUpRight size={18} /></Link></div></div>
    </section>

    <section className="recruit-opportunities recruit-section">
      <div className="recruit-section-label"><span>02 / Opportunities</span><span>Romania / Europe</span></div>
      <div className="recruit-section-heading"><h2>Put your skills<br /><em>in motion.</em></h2><Link className="recruit-text-link" to="/vacancies">View all vacancies <ArrowUpRight size={18} /></Link></div>
      <div className="recruit-roles">{roles.map((role, index) => <Link className="recruit-role" to="/vacancies" key={role.title}><div className="recruit-role-image"><img src={role.image} srcSet={`${role.mobileImage} 960w, ${role.image} 1672w`} sizes="(max-width: 760px) 100vw, 33vw" loading="lazy" alt={role.imageAlt} /><span>0{index + 1} / Career pathways</span><ArrowUpRight className="recruit-role-arrow" /></div><div className="recruit-role-copy"><h3>{role.title}</h3><p>{role.desc}</p><span className="recruit-kicker">Explore role <ArrowRight size={15} /></span></div></Link>)}</div>
    </section>

    <section className="recruit-horizon"><img src={logisticsHero} alt="European transport and logistics career opportunities" loading="lazy" /><div className="recruit-horizon-shade" /><div className="recruit-horizon-copy"><p className="recruit-kicker">From Sri Lanka. Forward.</p><h2>A new country.<br />The same ambition.</h2><p>Interested in opportunities across Europe? Register your interest and talk to our team about your next step.</p><a className="recruit-button recruit-button-light" href="#book">Register your interest <ArrowUpRight size={19} /></a></div></section>

    <section className="recruit-journey recruit-section"><div className="recruit-section-label"><span>03 / The journey</span><span>With you at every step</span></div><div className="recruit-journey-grid"><div className="recruit-journey-intro"><h2>From first step<br />to <em>takeoff.</em></h2><p>Seven clear stages. One dedicated team. Expert guidance for your visa application and travel preparation.</p><a className="recruit-text-link" href="#book">Let’s plan your journey <ArrowUpRight size={18} /></a></div><ol className="recruit-step-list">{serviceSteps.map((step, i) => <li key={step.title}><span className="recruit-step-number">0{i + 1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div><step.icon size={22} strokeWidth={1.2} aria-hidden="true" /></li>)}</ol></div></section>
    <FaqSection />
  </div>;
}

