
"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Skill = {
  name: string;
  icon: JSX.Element;
  glow: string;
};

function PythonIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" fill="none">
      <path d="M20 18c0-4 3-7 7-7h10c6 0 11 5 11 11v7H28c-4 0-8 3-8 8v9h-5c-4 0-7-3-7-7V25c0-4 3-7 7-7h5Z" fill="white" opacity="0.95"/>
      <circle cx="39" cy="16" r="2.6" fill="#000"/>
      <path d="M44 46c0 4-3 7-7 7H27c-6 0-11-5-11-11v-7h20c4 0 8-3 8-8v-9h5c4 0 7 3 7 7v18c0 4-3 7-7 7h-5Z" fill="white" opacity="0.95"/>
      <circle cx="25" cy="48" r="2.6" fill="#000"/>
      <path d="M26 20h12M26 24h8M38 41h-12M38 45h-8" stroke="#000" strokeWidth="2.4" strokeLinecap="round"/>
    </svg>
  );
}

function FastAPIIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" fill="none">
      <rect x="14" y="14" width="36" height="36" rx="10" fill="white" opacity="0.95" />
      <path d="M26 20L20 34h8l-3 10 12-15h-8l3-9Z" fill="#000"/>
      <path d="M49 18v28M45 22h8" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function N8nIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" fill="none">
      <circle cx="20" cy="22" r="7" fill="white" opacity="0.96" />
      <circle cx="44" cy="42" r="7" fill="white" opacity="0.96" />
      <path d="M27 24c7 0 8 16 15 16" stroke="white" strokeWidth="4" strokeLinecap="round" />
      <path d="M16 28c0 0 4 8 12 8" stroke="#000" strokeWidth="2.2" strokeLinecap="round" opacity="0.75" />
      <path d="M40 38c0 0-4-8-12-8" stroke="#000" strokeWidth="2.2" strokeLinecap="round" opacity="0.75" />
    </svg>
  );
}

function CIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" fill="none">
      <circle cx="32" cy="32" r="18" stroke="white" strokeWidth="6" />
      <path d="M28 24a10 10 0 1 0 0 16" stroke="#000" strokeWidth="4" strokeLinecap="round" opacity="0.88"/>
      <path d="M39 24v16M35 28h8" stroke="white" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  );
}

function WebDesignIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" fill="none">
      <rect x="10" y="14" width="44" height="34" rx="8" stroke="white" strokeWidth="4" />
      <path d="M10 24h44" stroke="white" strokeWidth="4" />
      <path d="M18 20h2M24 20h2M30 20h2" stroke="#000" strokeWidth="4" strokeLinecap="round" />
      <path d="M17 38l8-8 8 5 14-12" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="39" cy="23" r="2" fill="#000" />
    </svg>
  );
}

function SupabaseIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" fill="none">
      <path d="M18 14h28L35 33h11L24 50l5-17H18l0-19Z" fill="white" opacity="0.96" />
    </svg>
  );
}

function PromptIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" fill="none">
      <path d="M14 18h36a6 6 0 0 1 6 6v10a6 6 0 0 1-6 6H34l-10 10v-10H14a6 6 0 0 1-6-6V24a6 6 0 0 1 6-6Z" fill="white" opacity="0.96" />
      <path d="M23 27h18M23 33h11" stroke="#000" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function FullStackIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" fill="none">
      <path d="M12 18h40v10H12z" fill="white" opacity="0.96" />
      <path d="M18 31h28v10H18z" fill="white" opacity="0.88" />
      <path d="M24 44h16v8H24z" fill="white" opacity="0.8" />
      <path d="M18 23h10M28 36h8M27 48h10" stroke="#000" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function SkillsOrbit() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const orbitRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const skills = useMemo<Skill[]>(
    () => [
      { name: "Python", icon: <PythonIcon />, glow: "rgba(250,204,21,0.55)" },
      { name: "FastAPI", icon: <FastAPIIcon />, glow: "rgba(34,211,238,0.55)" },
      { name: "n8n", icon: <N8nIcon />, glow: "rgba(168,85,247,0.55)" },
      { name: "C Coding", icon: <CIcon />, glow: "rgba(248,113,113,0.55)" },
      { name: "3D Web Design", icon: <WebDesignIcon />, glow: "rgba(234,88,12,0.55)" },
      { name: "Supabase", icon: <SupabaseIcon />, glow: "rgba(16,185,129,0.55)" },
      { name: "Prompt Engineering", icon: <PromptIcon />, glow: "rgba(244,114,182,0.55)" },
      { name: "Full Stack", icon: <FullStackIcon />, glow: "rgba(96,165,250,0.55)" },
    ],
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !orbitRef.current || !ringRef.current) return;

      const items = gsap.utils.toArray<HTMLElement>("[data-skill-item]");

      gsap.set(ringRef.current, { transformStyle: "preserve-3d" });
      items.forEach((item) => {
        gsap.set(item, { transformStyle: "preserve-3d", transformOrigin: "50% 50%" });
      });

      gsap.to(orbitRef.current, {
        rotateY: 360,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "+=1800",
          scrub: 1,
        },
      });

      items.forEach((item) => {
        item.addEventListener("mouseenter", () => {
          gsap.to(item, {
            scale: 1.25,
            y: -16,
            z: 80,
            duration: 0.35,
            ease: "power3.out",
          });
        });
        item.addEventListener("mouseleave", () => {
          gsap.to(item, {
            scale: 1,
            y: 0,
            z: 0,
            duration: 0.35,
            ease: "power3.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black px-6 py-24 md:px-10"
      style={{ perspective: "1200px" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-sm uppercase tracking-[0.45em] text-white/45">
          Skills Orbit
        </div>
        <h2 className="max-w-3xl text-4xl font-bold tracking-[-0.05em] text-white md:text-6xl">
          Rotating capability core built from massive glowing symbols.
        </h2>
      </div>

      <div className="relative mx-auto mt-20 flex h-[780px] w-full max-w-7xl items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_34%),radial-gradient(circle_at_center,rgba(234,88,12,0.16),transparent_50%)] blur-2xl" />

        <div
          ref={orbitRef}
          className="relative flex h-[520px] w-[520px] items-center justify-center [transform-style:preserve-3d]"
        >
          <div
            ref={ringRef}
            className="relative h-[420px] w-[420px] [transform-style:preserve-3d]"
          >
            {skills.map((skill, index) => {
              const angle = (360 / skills.length) * index;
              return (
                <div
                  key={skill.name}
                  data-skill-item
                  className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2rem] border border-white/12 bg-white/5 p-4 backdrop-blur-2xl transition-transform duration-300"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(210px)`,
                    boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 0 34px ${skill.glow}`,
                  }}
                >
                  <div className="relative flex h-full w-full items-center justify-center rounded-[1.5rem] bg-black/35 p-2">
                    <div className="h-full w-full drop-shadow-[0_0_30px_rgba(255,255,255,0.32)]">
                      {skill.icon}
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_48%)] opacity-0 transition-opacity duration-300 hover:opacity-100" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
                              }
