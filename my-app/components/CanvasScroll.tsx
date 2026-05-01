
"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// IMPORTANT: Ensure you have saved the React Bits components in these files!
// import Hyperspeed from "./Hyperspeed";
// import SplashCursor from "./SplashCursor";

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
  const scrollWrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const scrollWrap = scrollWrapRef.current;
    if (!container || !scrollWrap) return;

    const ctx = gsap.context(() => {
      // Calculate how far to scroll horizontally
      const getScrollAmount = () => -(scrollWrap.scrollWidth - window.innerWidth + 80); // 80px buffer

      gsap.to(scrollWrap, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${scrollWrap.scrollWidth}`, // Scroll duration based on total width
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true, // Recalculates on window resize
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-black" style={{ height: "100vh" }}>
      
      {/* ── BACKGROUND: Hyperspeed ── */}
      {/* Uncomment this once you add Hyperspeed.tsx */}
      {/* <div className="absolute inset-0 z-0 opacity-60">
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
      */}

      {/* ── FOREGROUND: Splash Cursor ── */}
      {/* Uncomment this once you add SplashCursor.tsx */}
      {/* <div className="absolute inset-0 z-10 pointer-events-none">
        <SplashCursor 
          COLOR_UPDATE_SPEED={10} 
          SPLAT_RADIUS={0.3} 
          SPLAT_FORCE={6000} 
          TRANSPARENT={true}
        />
      </div> 
      */}

      {/* Gradient Overlay to ensure text readability */}
      <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/40" />

      {/* ── CARDS (Horizontal Scroll) ── */}
      <div className="absolute top-0 left-0 h-full w-full flex items-center z-20 overflow-hidden">
        <div 
          ref={scrollWrapRef} 
          className="flex items-center gap-8 md:gap-16 px-[10vw]"
          style={{ width: "max-content" }}
        >
          {PANELS.map((panel, i) => (
            <div
              key={panel.label}
              className="flex-shrink-0 flex flex-col relative"
              style={{
                width: "clamp(320px, 35vw, 480px)", // Made cards significantly larger
                background: `linear-gradient(145deg, rgba(20,20,20,0.8) 0%, rgba(10,10,10,0.9) 100%)`,
                backdropFilter: "blur(32px) saturate(180%)",
                WebkitBackdropFilter: "blur(32px) saturate(180%)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "28px",
                boxShadow: `0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)`,
                transition: "transform 0.3s ease",
              }}
            >
              {/* Top Colored Edge */}
              <div style={{ height: "4px", borderRadius: "28px 28px 0 0", background: `linear-gradient(90deg, ${panel.accentFrom}, ${panel.accentTo})` }} />
              
              <div className="flex flex-col gap-6 p-8">
                {/* Header */}
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg" style={{ background: panel.badgeBg, boxShadow: `0 8px 30px ${panel.accentFrom}44` }}>
                    {panel.icon}
                  </div>
                  <div>
                    <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.3em] mb-1">About me</p>
                    <p className="text-white font-black text-2xl leading-tight tracking-wide">{panel.label}</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full rounded-full" style={{ background: `linear-gradient(90deg, ${panel.accentFrom}40, ${panel.accentTo}40)` }} />

                {/* Data List */}
                <div className="flex flex-col gap-5">
                  {panel.lines.map((row) => (
                    <div key={row.label} className="flex justify-between items-start gap-4">
                      <span className="text-[12px] font-bold uppercase tracking-[0.2em] flex-shrink-0 mt-1" style={{ color: `${panel.accentFrom}bb` }}>
                        {row.label}
                      </span>
                      <span className="text-white font-medium text-sm text-right leading-relaxed">
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3">
        <span className="text-white/50 text-[10px] font-bold tracking-[0.4em] uppercase">Scroll Right</span>
        <div className="w-px h-10 rounded-full" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)" }} />
      </div>
    </div>
  );
              }
