import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import kasunImg from "@/assets/team/kasun.jpg";
import nilminiImg from "@/assets/team/nilmini.jpg";
import chamathImg from "@/assets/team/chamath.jpg";
import sanduniImg from "@/assets/team/sanduni.jpg";
import raviImg from "@/assets/team/ravi.jpg";
import isharaImg from "@/assets/team/ishara.jpg";
import dineshImg from "@/assets/team/dinesh.jpg";

const team = [
  { name: "Kasun Perera", role: "Founder & Managing Director", img: kasunImg },
  { name: "Nilmini Fernando", role: "Head of Recruitment", img: nilminiImg },
  { name: "Chamath Silva", role: "Senior Consultant — Trucking", img: chamathImg },
  { name: "Sanduni Jayasinghe", role: "Visa & Documentation Lead", img: sanduniImg },
  { name: "Ravi Kumar", role: "Employer Relations Manager", img: raviImg },
  { name: "Ishara Weerasinghe", role: "Candidate Support Officer", img: isharaImg },
  { name: "Dinesh Rajapaksha", role: "Operations & Travel Coordinator", img: dineshImg },
];

const AUTOPLAY_MS = 3200;

export default function TeamSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const pausedRef = useRef(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  const scrollByCard = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-team-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  // Autoplay: advances like a slideshow, wraps back to the start at the end.
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      const el = trackRef.current;
      if (!el) return;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 8;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollByCard(1);
      }
      updateArrows();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [playing, scrollByCard, updateArrows]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  return (
    <div className="mt-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Meet the team</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Seven dedicated professionals guiding you from first application to
            your first day in Europe.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            onClick={() => setPlaying((p) => !p)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-ro-blue/50 hover:text-ro-blue"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            type="button"
            aria-label="Previous team member"
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-ro-blue/50 hover:text-ro-blue disabled:opacity-35 disabled:hover:border-border disabled:hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next team member"
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-ro-blue/50 hover:text-ro-blue disabled:opacity-35 disabled:hover:border-border disabled:hover:text-foreground"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onTouchStart={() => (pausedRef.current = true)}
        onTouchEnd={() => (pausedRef.current = false)}
        className="scrollbar-none -mx-4 mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-2 sm:-mx-6 sm:px-6"
      >
        {team.map((member) => (
          <article
            key={member.name}
            data-team-card
            className="w-64 shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-card sm:w-72"
          >
            <div className="h-1 bg-gradient-to-r from-ro-blue via-ro-yellow to-ro-red" />
            <div className="p-4">
              <img
                src={member.img}
                alt={`${member.name}, ${member.role} at Elladria Lanka Careers`}
                width={768}
                height={768}
                loading="lazy"
                className="aspect-square w-full rounded-xl object-cover"
              />
            </div>
            <div className="px-5 pb-6">
              <h3 className="font-display text-lg font-semibold">{member.name}</h3>
              <p className="mt-1 text-sm font-medium text-ro-blue">{member.role}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
