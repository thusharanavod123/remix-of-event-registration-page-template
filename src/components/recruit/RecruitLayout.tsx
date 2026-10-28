import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BookingSection } from "./BookingSection";
import companyLogo from "@/assets/elladria-lanka-logo-cropped.png";
import "./recruit-design.css";

const navigation = [{ to: "/", label: "Home" }, { to: "/vacancies", label: "Opportunities" }, { to: "/about", label: "Our company" }, { to: "/careers", label: "Join our team" }];

export function RecruitLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return <div className="recruit-site">
    <a className="recruit-skip" href="#main-content">Skip to content</a>
    <header className="recruit-header">
      <Link className="recruit-brand" to="/" aria-label="Elladria Lanka home"><img src={companyLogo} alt="Elladria Lanka" /><span>Manpower & recruitment</span></Link>
      <nav className="recruit-desktop-nav" aria-label="Main navigation">{navigation.map(item => <NavLink key={item.to} to={item.to} end={item.to === "/"}>{item.label}</NavLink>)}</nav>
      <a className="recruit-header-cta" href="#book">Let’s talk <ArrowUpRight size={16} /></a>
      <button className="recruit-menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      {open && <nav id="mobile-navigation" className="recruit-mobile-nav" aria-label="Mobile navigation">{navigation.map((item, i) => <NavLink key={item.to} to={item.to} end={item.to === "/"}><span>0{i + 1}</span>{item.label}<ArrowUpRight size={20} /></NavLink>)}<a href="#book" onClick={() => setOpen(false)}>Book an appointment <ArrowUpRight size={20} /></a></nav>}
    </header>
    <main id="main-content" tabIndex={-1}><Outlet /></main>
    <BookingSection />
    <footer className="recruit-footer">
      <div className="recruit-footer-top"><p className="recruit-kicker">Your next chapter starts here</p><a href="#book">A world of<br />possibility.<ArrowUpRight aria-hidden="true" /></a></div>
      <div className="recruit-footer-grid">
        <div><Link className="recruit-brand" to="/"><img src={companyLogo} alt="Elladria Lanka" /></Link><p>Connecting Sri Lankan talent with trusted employers across Europe. From application to arrival.</p></div>
        <div><h2>Explore</h2>{navigation.map(item => <Link key={item.to} to={item.to}>{item.label}</Link>)}<Link to="/privacy-policy">Privacy policy</Link></div>
        <div><h2>Visit us</h2><a href="https://www.google.com/maps/search/?api=1&query=No.+208+Udadigan+Junction+Thiththwella+Kurunegala+Sri+Lanka" target="_blank" rel="noreferrer">No. 208, Udadigan Junction,<br />Thiththwella, Kurunegala,<br />Sri Lanka ↗</a><a href="tel:+94372201125">+94 37 220 1125</a></div>
        <div><h2>Follow our journey</h2><a href="https://web.facebook.com/Elladrialanka/" target="_blank" rel="noreferrer">Facebook ↗</a><a href="https://www.tiktok.com/@elladria.lanka.of" target="_blank" rel="noreferrer">TikTok ↗</a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn ↗</a><span className="recruit-profile-note">Company profile · Coming soon</span></div>
      </div>
      <div className="recruit-footer-bottom"><span>© {new Date().getFullYear()} Elladria Lanka. All rights reserved.</span><span>Sri Lanka → Europe</span><Link to="/admin">Admin access ↗</Link></div>
    </footer>
  </div>;
}
