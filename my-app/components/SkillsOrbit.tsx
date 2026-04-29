
"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// All SVG skill icons — pure white, no text labels
const skills = [
  {
    id: "python",
    label: "Python",
    color: "#3b82f6",
    svg: (
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M63.5 4C44.3 4 45.6 12.3 45.6 12.3V21h18.3v2.8H38.5S27 22.3 27 41.7c0 19.4 10.7 18.7 10.7 18.7h6.4v-9c0-10.8 9.4-10.2 9.4-10.2h16.2s9-.1 9-8.7V21c0 0 1.4-17-15.2-17zm-9 10.3c1.6 0 2.9 1.3 2.9 2.9s-1.3 2.9-2.9 2.9-2.9-1.3-2.9-2.9 1.3-2.9 2.9-2.9z" fill="white" fillOpacity="0.9"/>
        <path d="M64.5 124C83.7 124 82.4 115.7 82.4 115.7V107H64.1v-2.8H89.5S101 105.7 101 86.3c0-19.4-10.7-18.7-10.7-18.7H84v9c0 10.8-9.4 10.2-9.4 10.2H58.4s-9 .1-9 8.7v10.2c0 0-1.4 17 15.1 17zm9-10.3c-1.6 0-2.9-1.3-2.9-2.9s1.3-2.9 2.9-2.9 2.9 1.3 2.9 2.9-1.3 2.9-2.9 2.9z" fill="white" fillOpacity="0.7"/>
      </svg>
    ),
  },
  {
    id: "fastapi",
    label: "FastAPI",
    color: "#10b981",
    svg: (
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="64" cy="64" r="56" stroke="white" strokeOpacity="0.85" strokeWidth="5"/>
        <path d="M72 28L40 68h28l-12 32 40-44H72z" fill="white" fillOpacity="0.9"/>
      </svg>
    ),
  },
  {
    id: "n8n",
    label: "n8n",
    color: "#f97316",
    svg: (
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="50" width="28" height="28" rx="14" fill="white" fillOpacity="0.85"/>
        <rect x="50" y="50" width="28" height="28" rx="14" stroke="white" strokeOpacity="0.85" strokeWidth="4"/>
        <rect x="90" y="50" width="28" height="28" rx="14" fill="white" fillOpacity="0.85"/>
        <line x1="38" y1="64" x2="50" y2="64" stroke="white" strokeOpacity="0.6" strokeWidth="3"/>
        <line x1="78" y1="64" x2="90" y2="64" stroke="white" strokeOpacity="0.6" strokeWidth="3"/>
        <line x1="64" y1="36" x2="64" y2="50" stroke="white" strokeOpacity="0.5" strokeWidth="2.5" strokeDasharray="4 3"/>
        <line x1="64" y1="78" x2="64" y2="92" stroke="white" strokeOpacity="0.5" strokeWidth="2.5" strokeDasharray="4 3"/>
      </svg>
    ),
  },
  {
    id: "c-lang",
    label: "C",
    color: "#6366f1",
    svg: (
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 28C88 16 70 10 52 14 34 18 20 32 14 50 8 68 12 88 24 102c12 14 30 20 48 16 14-3 26-12 34-24l-14-8c-6 9-14 16-24 18-12 3-25-1-33-10-9-10-12-24-8-37 4-12 14-22 26-25 10-3 21-1 29 5z" fill="white" fillOpacity="0.88"/>
      </svg>
    ),
  },
  {
    id: "webgl",
    label: "3D/WebGL",
    color: "#8b5cf6",
    svg: (
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="64,10 118,42 118,86 64,118 10,86 10,42" stroke="white" strokeOpacity="0.85" strokeWidth="4" fill="none"/>
        <polygon points="64,28 100,48 100,80 64,100 28,80 28,48" stroke="white" strokeOpacity="0.5" strokeWidth="2.5" fill="none"/>
        <line x1="64" y1="10" x2="64" y2="28" stroke="white" strokeOpacity="0.5" strokeWidth="2"/>
        <line x1="118" y1="42" x2="100" y2="48" stroke="white" strokeOpacity="0.5" strokeWidth="2"/>
        <line x1="118" y1="86" x2="100" y2="80" stroke="white" strokeOpacity="0.5" strokeWidth="2"/>
        <line x1="64" y1="118" x2="64" y2="100" stroke="white" strokeOpacity="0.5" strokeWidth="2"/>
        <line x1="10" y1="86" x2="28" y2="80" stroke="white" strokeOpacity="0.5" strokeWidth="2"/>
        <line x1="10" y1="42" x2="28" y2="48" stroke="white" strokeOpacity="0.5" strokeWidth="2"/>
        <circle cx="64" cy="64" r="8" fill="white" fillOpacity="0.9"/>
      </svg>
    ),
  },
  {
    id: "supabase",
    label: "Supabase",
    color: "#22c55e",
    svg: (
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M74 10L12 74h42v44l62-62H74z" fill="white" fillOpacity="0.88"/>
      </svg>
    ),
  },
  {
    id: "prompt",
    label: "Prompt Eng.",
    color: "#a855f7",
    svg: (
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M64 8l7 21h22l-18 13 7 21-18-13-18 13 7-21-18-13h22z" fill="white" fillOpacity="0.9"/>
        <path d="M24 72l4 11h11l-9 7 4 11-10-7-10 7 4-11-9-7h11z" fill="white" fillOpacity="0.65"/>
        <path d="M100 72l4 11h11l-9 7 4 11-10-7-10 7 4-11-9-7h11z" fill="white" fillOpacity="0.65"/>
      </svg>
    ),
  },
  {
    id: "fullstack",
    label: "Full Stack",
    color: "#ec4899",
    svg: (
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="16" y="16" width="96" height="20" rx="5" fill="white" fillOpacity="0.88"/>
        <rect x="16" y="44" width="96" height="20" rx="5" fill="white" fillOpacity="0.65"/>
        <rect x="16" y="72" width="96" height="20" rx="5" fill="white" fillOpacity="0.42"/>
        <rect x="16" y="100" width="96" height="12" rx="5" fill="white" fillOpacity="0.22"/>
        <circle cx="32" cy="26" r="5" fill="black" fillOpacity="0.5"/>
        <circle cx="44" cy="26" r="5" fill="black" fillOpacity="0.4"/>
        <circle cx="56" cy="26" r="5" fill="black" fillOpacity="0.3"/>
      </svg>
    ),
  },
];

// Orbit configuration: 2 rings
const innerOrbit = [0, 1, 2, 3]; // indices
const outerOrbit = [4, 5, 6, 7];

export default function SkillsOrbit() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const innerRotRef = useRef(0);
  const outerRotRef = useRef(0);
  const rafRef = useRef<number>(0);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate orbit rotation
    const animate = () => {
      innerRotRef.current += 0.18;
      outerRotRef.current -= 0.11;

      const inner = document.getElementById("inner-orbit");
      const outer = document.getElementById("outer-orbit");
      if (inner) inner.style.transform = `rotate(${innerRotRef.current}deg)`;
      if (outer) outer.style.transform = `rotate(${outerRotRef.current}deg)`;

      // Counter-rotate icons so they stay upright
      document.querySelectorAll(".orbit-icon-inner").forEach((el) => {
        (el as HTMLElement).style.transform = `rotate(${-innerRotRef.current}deg)`;
      });
      document.querySelectorAll(".orbit-icon-outer").forEach((el) => {
        (el as HTMLElement).style.transform = `rotate(${-outerRotRef.current}deg)`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // Section reveal
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "cubic-bezier(0.16,1,0.3,1)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const renderOrbitIcons = (indices: number[], orbitClass: string, radius: number, size: number) => {
    return indices.map((skillIdx, i) => {
      const skill = skills[skillIdx];
      const angle = (i / indices.length) * 360;
      const rad = (angle * Math.PI) / 180;
      const x = Math.cos(rad) * radius;
      const y = Math.sin(rad) * radius;
      const isHovered = hoveredId === skill.id;

      return (
        <div
          key={skill.id}
          className={`${orbitClass} absolute`}
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            width: size,
            height: size,
          }}
        >
          <div
            className={orbitClass === "orbit-icon-inner" ? "orbit-icon-inner" : "orbit-icon-outer"}
            style={{ width: "100%", height: "100%" }}
          >
            <div
              ref={(el) => { iconRefs.current[skillIdx] = el; }}
              onMouseEnter={() => setHoveredId(skill.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative cursor-pointer rounded-2xl flex items-center justify-center"
              style={{
                width: "100%",
                height: "100%",
                background: isHovered
                  ? `rgba(${hexToRgb(skill.color)},0.18)`
                  : "rgba(255,255,255,0.04)",
                border: `1px solid ${isHovered ? skill.color : "rgba(255,255,255,0.1)"}`,
                backdropFilter: "blur(16px)",
                transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                transform: isHovered ? "scale(1.25)" : "scale(1)",
                filter: isHovered
                  ? `drop-shadow(0 0 18px ${skill.color}) drop-shadow(0 0 40px ${skill.color}88)`
                  : "none",
                boxShadow: isHovered
                  ? `0 0 40px 4px ${skill.color}55, inset 0 1px 0 rgba(255,255,255,0.15)`
                  : "inset 0 1px 0 rgba(255,255,255,0.05)",
                padding: size * 0.18,
              }}
            >
              {skill.svg}
            </div>
          </div>
        </div>
      );
    });
  };

  const orbitSize = 520;
  const innerRadius = 120;
  const outerRadius = 220;
  const innerIconSize = 72;
  const outerIconSize = 80;

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-black"
      style={{ opacity: 0 }}
    >
      {/* Background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 800,
          height: 800,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section heading */}
        <div className="text-center mb-16">
          <p
            className="text-white/25 tracking-[0.4em] uppercase mb-3"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: 11 }}
          >
            Tech Stack
          </p>
          <h2
            className="text-white"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(48px, 8vw, 90px)",
              letterSpacing: "0.05em",
              lineHeight: 1,
            }}
          >
            Skills &amp; Tools
          </h2>
          <div
            className="mx-auto mt-4"
            style={{
              width: 80,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(139,92,246,0.8), transparent)",
            }}
          />
        </div>

        {/* Orbit */}
        <div className="flex items-center justify-center">
          <div
            ref={orbitRef}
            className="relative"
            style={{ width: orbitSize, height: orbitSize }}
          >
            {/* Orbit ring 1 */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: innerRadius * 2 + innerIconSize,
                height: innerRadius * 2 + innerIconSize,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                border: "1px dashed rgba(255,255,255,0.07)",
              }}
            />
            {/* Orbit ring 2 */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: outerRadius * 2 + outerIconSize,
                height: outerRadius * 2 + outerIconSize,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                border: "1px dashed rgba(255,255,255,0.05)",
              }}
            />

            {/* Center pulsing orb */}
            <div
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 64,
                height: 64,
              }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(139,92,246,0.6) 0%, rgba(236,72,153,0.3) 60%, transparent 100%)",
                  animation: "pulse 2.8s ease-in-out infinite",
                }}
              />
            </div>

            {/* Inner orbit ring container */}
            <div
              id="inner-orbit"
              className="absolute"
              style={{
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
              }}
            >
              {renderOrbitIcons(innerOrbit, "orbit-icon-inner", innerRadius, innerIconSize)}
            </div>

            {/* Outer orbit ring container */}
            <div
              id="outer-orbit"
              className="absolute"
              style={{
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
              }}
            >
              {renderOrbitIcons(outerOrbit, "orbit-icon-outer", outerRadius, outerIconSize)}
            </div>
          </div>
        </div>

        {/* Skill name tooltip */}
        <div
          className="text-center mt-10 h-8"
          style={{ transition: "opacity 0.3s ease" }}
        >
          {hoveredId && (
            <span
              className="text-white/80 tracking-[0.3em] uppercase"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: 12 }}
            >
              {skills.find((s) => s.id === hoveredId)?.label}
            </span>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
      `}</style>
    </section>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
                                     }
              
