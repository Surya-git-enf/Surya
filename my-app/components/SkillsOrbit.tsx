
"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARD_COUNT = 9;
const ANGLE_PER_CARD = 360 / CARD_COUNT; // 40deg
const RADIUS = 420; // px — cylinder radius

/* ─────────────────────────────────────────────
   SVG ICONS  (inline, no text names)
───────────────────────────────────────────── */
const skills = [
  /* 0 — Python */
  {
    glow: "#3b82f6",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
        <defs>
          <linearGradient id="py1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4B8BBE" />
            <stop offset="100%" stopColor="#306998" />
          </linearGradient>
          <linearGradient id="py2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFE873" />
            <stop offset="100%" stopColor="#FFD43B" />
          </linearGradient>
        </defs>
        {/* Blue snake body top */}
        <path
          d="M32 4C20.4 4 21.2 9.2 21.2 9.2L21.22 14.6H32.2V16H15.6C15.6 16 8 15.12 8 27.04C8 38.96 14.76 38.6 14.76 38.6H18.8V33C18.8 33 18.52 26.24 25.36 26.24H35.68C35.68 26.24 42.16 26.34 42.16 20.08V10.48C42.16 10.48 43.12 4 32 4Z"
          fill="url(#py1)"
        />
        <circle cx="28.4" cy="10" r="2" fill="#fff" opacity="0.85" />
        {/* Yellow snake body bottom */}
        <path
          d="M32 60C43.6 60 42.8 54.8 42.8 54.8L42.78 49.4H31.8V48H48.4C48.4 48 56 48.88 56 36.96C56 25.04 49.24 25.4 49.24 25.4H45.2V31C45.2 31 45.48 37.76 38.64 37.76H28.32C28.32 37.76 21.84 37.66 21.84 43.92V53.52C21.84 53.52 20.88 60 32 60Z"
          fill="url(#py2)"
        />
        <circle cx="35.6" cy="54" r="2" fill="#fff" opacity="0.7" />
      </svg>
    ),
  },

  /* 1 — FastAPI */
  {
    glow: "#10b981",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
        <defs>
          <linearGradient id="fapi" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="28" fill="url(#fapi)" opacity="0.15" />
        <circle cx="32" cy="32" r="28" stroke="url(#fapi)" strokeWidth="2" />
        {/* Lightning bolt */}
        <path d="M36 10L22 34H32L28 54L46 28H34L36 10Z" fill="url(#fapi)" />
        <path d="M36 10L22 34H32L28 54L46 28H34L36 10Z" fill="url(#fapi)" opacity="0.5" style={{ filter: "blur(4px)" }} />
      </svg>
    ),
  },

  /* 2 — n8n */
  {
    glow: "#f97316",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
        <defs>
          <linearGradient id="n8n1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EA4B00" />
            <stop offset="100%" stopColor="#FF6D3A" />
          </linearGradient>
        </defs>
        {/* node circles */}
        <circle cx="12" cy="32" r="7" fill="url(#n8n1)" />
        <circle cx="32" cy="16" r="7" fill="url(#n8n1)" />
        <circle cx="52" cy="32" r="7" fill="url(#n8n1)" />
        <circle cx="32" cy="48" r="7" fill="url(#n8n1)" />
        {/* connectors */}
        <line x1="12" y1="32" x2="32" y2="16" stroke="#EA4B00" strokeWidth="2.5" strokeOpacity="0.6" />
        <line x1="32" y1="16" x2="52" y2="32" stroke="#EA4B00" strokeWidth="2.5" strokeOpacity="0.6" />
        <line x1="52" y1="32" x2="32" y2="48" stroke="#EA4B00" strokeWidth="2.5" strokeOpacity="0.6" />
        <line x1="32" y1="48" x2="12" y2="32" stroke="#EA4B00" strokeWidth="2.5" strokeOpacity="0.6" />
        <line x1="12" y1="32" x2="52" y2="32" stroke="#EA4B00" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="4 3" />
        <line x1="32" y1="16" x2="32" y2="48" stroke="#EA4B00" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="4 3" />
        {/* inner dots */}
        <circle cx="12" cy="32" r="3" fill="#fff" />
        <circle cx="32" cy="16" r="3" fill="#fff" />
        <circle cx="52" cy="32" r="3" fill="#fff" />
        <circle cx="32" cy="48" r="3" fill="#fff" />
      </svg>
    ),
  },

  /* 3 — C Coding */
  {
    glow: "#6366f1",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
        <defs>
          <linearGradient id="clang" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5c6bc0" />
            <stop offset="100%" stopColor="#a5b4fc" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="28" stroke="url(#clang)" strokeWidth="2" fill="none" />
        {/* Hexagonal badge */}
        <path
          d="M32 10 L50.1 21 L50.1 43 L32 54 L13.9 43 L13.9 21 Z"
          fill="url(#clang)"
          opacity="0.12"
          stroke="url(#clang)"
          strokeWidth="1.5"
        />
        {/* Letter C */}
        <path
          d="M40 22.5C37.2 20.5 34 20 31 20.5C24.5 21.8 20 27.2 20 32C20 37.6 24.8 43.2 31.5 43.8C34.5 44.1 37.5 43.4 40 41.5"
          stroke="url(#clang)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
  },

  /* 4 — 3D Web Design */
  {
    glow: "#8b5cf6",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
        <defs>
          <linearGradient id="threed" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#c4b5fd" />
          </linearGradient>
          <linearGradient id="threed2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
        </defs>
        {/* 3D cube */}
        {/* Front face */}
        <path d="M32 36L14 26V44L32 54L32 36Z" fill="url(#threed)" opacity="0.7" />
        {/* Top face */}
        <path d="M14 26L32 16L50 26L32 36L14 26Z" fill="url(#threed)" />
        {/* Right face */}
        <path d="M32 36L50 26V44L32 54V36Z" fill="url(#threed2)" opacity="0.85" />
        {/* Grid lines on top */}
        <line x1="23" y1="31" x2="41" y2="21" stroke="#fff" strokeWidth="0.8" opacity="0.4" />
        <line x1="32" y1="16" x2="32" y2="36" stroke="#fff" strokeWidth="0.8" opacity="0.3" />
        {/* Orbit ring */}
        <ellipse cx="32" cy="32" rx="26" ry="10" stroke="url(#threed)" strokeWidth="1.5" fill="none" strokeDasharray="4 3" opacity="0.5" />
      </svg>
    ),
  },

  /* 5 — Supabase */
  {
    glow: "#22c55e",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
        <defs>
          <linearGradient id="supa" x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor="#3ECF8E" />
            <stop offset="100%" stopColor="#1a9e63" />
          </linearGradient>
        </defs>
        {/* Supabase lightning bolt */}
        <path
          d="M34.8 6L10 36.4H30.4L29.2 58L54 27.6H33.6L34.8 6Z"
          fill="url(#supa)"
        />
        <path
          d="M34.8 6L10 36.4H30.4L29.2 58L54 27.6H33.6L34.8 6Z"
          fill="url(#supa)"
          opacity="0.35"
          style={{ filter: "blur(6px)" }}
        />
      </svg>
    ),
  },

  /* 6 — Prompt Engineering */
  {
    glow: "#f59e0b",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
        <defs>
          <linearGradient id="prompt" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#fcd34d" />
          </linearGradient>
        </defs>
        {/* Chat bubble */}
        <path
          d="M10 12H54C55.1 12 56 12.9 56 14V42C56 43.1 55.1 44 54 44H24L14 54V44H10C8.9 44 8 43.1 8 42V14C8 12.9 8.9 12 10 12Z"
          stroke="url(#prompt)"
          strokeWidth="2"
          fill="url(#prompt)"
          fillOpacity="0.08"
        />
        {/* Cursor / blinking line */}
        <rect x="17" y="22" width="14" height="3" rx="1.5" fill="url(#prompt)" />
        <rect x="17" y="29" width="22" height="3" rx="1.5" fill="url(#prompt)" opacity="0.7" />
        <rect x="17" y="36" width="10" height="3" rx="1.5" fill="url(#prompt)" opacity="0.5" />
        {/* Sparkle */}
        <path d="M46 20L47.5 23L51 24.5L47.5 26L46 29L44.5 26L41 24.5L44.5 23Z" fill="url(#prompt)" />
      </svg>
    ),
  },

  /* 7 — Full Stack */
  {
    glow: "#06b6d4",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
        <defs>
          <linearGradient id="fs1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="fs2" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        {/* Server stack layers */}
        <rect x="10" y="10" width="44" height="12" rx="4" fill="url(#fs1)" opacity="0.9" />
        <rect x="10" y="26" width="44" height="12" rx="4" fill="url(#fs1)" opacity="0.65" />
        <rect x="10" y="42" width="44" height="12" rx="4" fill="url(#fs2)" opacity="0.8" />
        {/* Status dots */}
        <circle cx="47" cy="16" r="2.5" fill="#fff" opacity="0.8" />
        <circle cx="41" cy="16" r="2.5" fill="#fff" opacity="0.5" />
        <circle cx="47" cy="32" r="2.5" fill="#fff" opacity="0.8" />
        <circle cx="41" cy="32" r="2.5" fill="#fff" opacity="0.5" />
        {/* Code angle brackets */}
        <path d="M18 48L14 50L18 52" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26 48L30 50L26 52" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="23" y1="47" x2="21" y2="53" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      </svg>
    ),
  },

  /* 8 — Runway ML */
  {
    glow: "#ec4899",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
        <defs>
          <linearGradient id="rwy" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <linearGradient id="rwy2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>
        {/* Film frame / AI viewfinder */}
        <rect x="8" y="14" width="48" height="36" rx="4" stroke="url(#rwy)" strokeWidth="2" fill="url(#rwy)" fillOpacity="0.07" />
        {/* Film perforations left */}
        <rect x="8" y="18" width="6" height="6" rx="1" fill="url(#rwy)" opacity="0.6" />
        <rect x="8" y="29" width="6" height="6" rx="1" fill="url(#rwy)" opacity="0.6" />
        <rect x="8" y="40" width="6" height="6" rx="1" fill="url(#rwy)" opacity="0.6" />
        {/* Film perforations right */}
        <rect x="50" y="18" width="6" height="6" rx="1" fill="url(#rwy)" opacity="0.6" />
        <rect x="50" y="29" width="6" height="6" rx="1" fill="url(#rwy)" opacity="0.6" />
        <rect x="50" y="40" width="6" height="6" rx="1" fill="url(#rwy)" opacity="0.6" />
        {/* Central AI play button with neural ring */}
        <circle cx="32" cy="32" r="12" stroke="url(#rwy2)" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
        <circle cx="32" cy="32" r="7" fill="url(#rwy)" opacity="0.2" />
        <path d="M29 28L38 32L29 36V28Z" fill="url(#rwy)" />
        {/* Scan lines */}
        <line x1="18" y1="24" x2="46" y2="24" stroke="url(#rwy)" strokeWidth="0.7" opacity="0.3" />
        <line x1="18" y1="40" x2="46" y2="40" stroke="url(#rwy)" strokeWidth="0.7" opacity="0.3" />
      </svg>
    ),
  },
];

export default function SkillsOrbit() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const orbit = orbitRef.current;
    if (!section || !orbit) return;

    // Rotate the cylinder 360° for each scroll height equivalent
    const ctx = gsap.context(() => {
      gsap.fromTo(
        orbit,
        { rotateY: 0 },
        {
          rotateY: 360,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=250%",
            pin: true,
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Subtle ambient grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Heading */}
      <div className="relative z-10 flex flex-col items-center pt-[10vh] select-none">
        <span
          className="font-black tracking-[0.25em] text-gray-900 leading-none"
          style={{ fontSize: "clamp(2.5rem, 4vw, 6rem)", letterSpacing: "0.22em" }}
        >
          TECHSTACK
        </span>
        <div
          className="mt-3 h-px w-32 rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, #d1d5db, transparent)",
          }}
        />
      </div>

      {/* 3D Stage */}
      <div
        className="relative flex items-center justify-center"
        style={{
          height: "70vh",
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {/* Rotating cylinder wrapper */}
        <div
          ref={orbitRef}
          style={{
            width: 0,
            height: 0,
            position: "relative",
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {skills.map((skill, i) => {
            const angle = ANGLE_PER_CARD * i; // 0, 40, 80 … 320
            return (
              <Card
                key={i}
                angle={angle}
                radius={RADIUS}
                glow={skill.glow}
                svg={skill.svg}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Card sub-component
───────────────────────────────────────────── */
interface CardProps {
  angle: number;
  radius: number;
  glow: string;
  svg: React.ReactNode;
}

function Card({ angle, radius, glow, svg }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) scale(1.18)`;
    el.style.boxShadow = `0 0 60px 20px ${glow}55, 0 20px 50px rgba(0,0,0,0.08)`;
    el.style.borderColor = `${glow}66`;
    el.style.background = "rgba(255,255,255,0.85)";
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) scale(1)`;
    el.style.boxShadow = "0 20px 50px rgba(0,0,0,0.05)";
    el.style.borderColor = "rgba(229,231,235,1)";
    el.style.background = "rgba(255,255,255,0.5)";
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        position: "absolute",
        top: "-80px",
        left: "-80px",
        width: "160px",
        height: "160px",
        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease, border-color 0.4s ease, background 0.3s ease",
        borderRadius: "20px",
        background: "rgba(255,255,255,0.5)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(229,231,235,1)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        willChange: "transform",
      }}
    >
      {/* Subtle inner glint */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "20px",
          background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      {svg}
    </div>
  );
          }
  
