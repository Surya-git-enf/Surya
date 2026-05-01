
"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import your React Bits components
import Hyperspeed from "./Hyperspeed";
import SplashCursor from "./SplashCursor";

gsap.registerPlugin(ScrollTrigger);

/* ── Panel data ──────────────────────────────────────────── */
const PANELS = [
  {
    label: "Personal",
    accentFrom: "#f97316",
    accentTo: "#3b82f6",
    badgeBg: "linear-gradient(135deg,#f97316,#fb923c)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="7" r="4" /><path d="M3 21c0-4 4-7 9-7s9 3 9 7" />
      </svg>
    ),
    lines: [
      { label: "Name",     value: "Surya Peddishetti" },
      { label: "Role",     value: "AI / Full-Stack Dev" },
      { label: "Location", value: "India 🇮🇳" },
      { label: "Status",   value: "Open to Opportunities" },
    ],
  },
  {
    label: "Education",
    accentFrom: "#22d3ee",
    accentTo: "#a855f7",
    badgeBg: "linear-gradient(135deg,#22d3ee,#a855f7)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 3L2 9l10 6 10-6-10-6z" /><path d="M2 9v6" /><path d="M6 12v5c2 1.5 8 1.5 12 0v-5" />
      </svg>
    ),
    lines: [
      { label: "Degree",     value: "B.Tech — CS" },
      { label: "University", value: "JNTUH" },
      { label: "Year",       value: "2025" },
      { label: "Focus",      value: "AI · Systems · Web" },
    ],
  },
  {
    label: "Hobbies",
    accentFrom: "#ec4899",
    accentTo: "#22d3ee",
    badgeBg: "linear-gradient(135deg,#ec4899,#22d3ee)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
      </svg>
    ),
    lines: [
      { label: "Creative", value: "3D Design · Motion" },
      { label: "Build",    value: "AI Micro-SaaS" },
      { label: "Music",    value: "Synthwave · Lo-fi" },
      { label: "Sport",    value: "Cricket · Chess" },
    ],
  },
] as const;

export default function CanvasScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef      = useRef<HTMLDivElement>(null);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reset initial states
    gsap.set(textRef.current, { opacity: 0, y: 80 });
    cardRefs.current.forEach((el) => {
      if (el) gsap.set(el, { opacity: 0, y: 300 });
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=350%", // How far the user scrolls to complete the sequence
          pin: true,
          scrub: 1, // Smoothly ties the animation to the scrollbar
        },
      });

      // 1. Reveal Intro Text
      tl.to(textRef.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });

      // 2. Hide Intro Text by moving it up slightly
      tl.to(textRef.current, { opacity: 0, y: -50, duration: 0.8, ease: "power2.in" }, "+=0.5");

      // 3. Reveal Cards with a staggered Parallax rise
      tl.to(cardRefs.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.4, // Delays each card slightly so they rise one by one
        ease: "power3.out",
      }, "-=0.2"); // Starts slightly before the text fully disappears

      // 4. Parallax drift: Cards float up slightly while reading to maintain momentum
      tl.to(cardRefs.current, {
        y: -40,
        duration: 2,
        ease: "none",
      });

      // 5. Buffer time to hold the last card on screen before unpinning
      tl.set({}, {}, "+=1");

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    // Outer Wrapper secures the scroll trigger pin space
    <div ref={containerRef} className="relative w-full overflow-hidden bg-black" style={{ height: "100vh" }}>
      
      {/* ── BACKGROUND 1: Hyperspeed ── */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <Hyperspeed 
          effectOptions={{
            distortion: "xyDistortion",
            length: 400,
            roadWidth: 9,
            islandWidth: 2,
            lanesPerRoad: 3,
            colors: {
              roadColor: 0x080808,
              islandColor: 0x0a0a0a,
              background: 0x000000,
              shoulderLines: 0xFFFFFF,
              brokenLines: 0xFFFFFF,
              leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
              rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
              sticks: 0x03B3C3,
            }
          }} 
        />
      </div> 

      {/* ── BACKGROUND 2: Splash Cursor ── */}
      {/* Must have pointer-events-auto so it can track mouse movements */}
      <div className="absolute inset-0 z-10 pointer-events-auto">
        <SplashCursor 
          COLOR_UPDATE_SPEED={10} 
          SPLAT_RADIUS={0.3} 
          SPLAT_FORCE={6000} 
          TRANSPARENT={true}
        />
      </div> 

      {/* Gradient Overlay to ensure foreground text/cards are readable */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-black/80 via-black/20 to-black/60" />

      {/* ── FOREGROUND CONTENT ── */}
      {/* Wrapper MUST be pointer-events-none so the mouse passes through to the cursor effect */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">
        
        {/* Intro Text */}
        <div ref={textRef} className="absolute text-center flex flex-col items-center gap-4">
          <h2 className="text-white font-black leading-none" style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}>
            Hey 👋, <br className="md:hidden" /> I'm Surya
          </h2>
          <p className="text-white/60 font-medium text-lg md:text-xl tracking-widest uppercase">
            Scroll to discover
          </p>
        </div>

        {/* Cards Wrapper */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 px-[5vw] w-full">
          {PANELS.map((panel, i) => (
            <div
              key={panel.label}
              ref={(el) => { cardRefs.current[i] = el; }}
              // Re-enable pointer events just for the cards so hover effects work
              className="pointer-events-auto flex-shrink-0 flex flex-col relative group"
              style={{
                width: "clamp(260px, 28vw, 360px)", 
                background: `linear-gradient(145deg, rgba(20,20,20,0.85) 0%, rgba(10,10,10,0.95) 100%)`,
                backdropFilter: "blur(32px) saturate(180%)",
                WebkitBackdropFilter: "blur(32px) saturate(180%)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "28px",
                boxShadow: `0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)`,
                transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-12px) scale(1.02)";
                e.currentTarget.style.boxShadow = `0 40px 100px rgba(0,0,0,0.9), 0 0 40px ${panel.accentFrom}33, inset 0 1px 0 rgba(255,255,255,0.2)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px) scale(1)";
                e.currentTarget.style.boxShadow = `0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)`;
              }}
            >
              {/* Top Colored Edge */}
              <div style={{ height: "4px", borderRadius: "28px 28px 0 0", background: `linear-gradient(90deg, ${panel.accentFrom}, ${panel.accentTo})` }} />
              
              <div className="flex flex-col gap-6 p-7">
                {/* Header */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg" style={{ background: panel.badgeBg, boxShadow: `0 8px 30px ${panel.accentFrom}44` }}>
                    {panel.icon}
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-1">About me</p>
                    <p className="text-white font-black text-xl leading-tight tracking-wide">{panel.label}</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full rounded-full" style={{ background: `linear-gradient(90deg, ${panel.accentFrom}40, ${panel.accentTo}40)` }} />

                {/* Data List */}
                <div className="flex flex-col gap-4">
                  {panel.lines.map((row) => (
                    <div key={row.label} className="flex justify-between items-start gap-4">
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] flex-shrink-0 mt-1" style={{ color: `${panel.accentFrom}bb` }}>
                        {row.label}
                      </span>
                      <span className="text-white font-medium text-xs text-right leading-relaxed">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
              }
