
"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

    // Initial states: Cards are hidden and pushed down
    gsap.set(textRef.current, { opacity: 1, y: 0 });
    cardRefs.current.forEach((el) => {
      if (el) gsap.set(el, { opacity: 0, y: 100, scale: 0.9 });
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=350%", // Enough scroll depth for the animation sequence
          pin: true,
          scrub: 1, // Smooth interpolation
          anticipatePin: 1,
        },
      });

      // 1. Text fades up and out as you scroll
      tl.to(textRef.current, { 
        opacity: 0, 
        y: -60, 
        duration: 1, 
        ease: "power2.inOut" 
      });

      // 2. Cards stagger in beautifully
      tl.to(cardRefs.current, { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 1.5, 
        stagger: 0.3,
        ease: "back.out(1.2)" 
      }, "-=0.5");

      // 3. Hold the cards on screen before allowing the pin to release
      tl.to({}, { duration: 1.5 });

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    /* CRITICAL FIX: The wrapper that prevents Techstack from bleeding through */
    <div className="relative w-full z-50 bg-black">
      <div
        ref={containerRef}
        id="personal"
        className="relative w-full overflow-hidden flex items-center justify-center"
        style={{ height: "100vh", background: "#000" }}
      >
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>

        {/* Dark gradient overlay to ensure text/cards remain legible over the video */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)" }}
        />

        {/* Foreground Container */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
          
          {/* Intro text */}
          <div ref={textRef} className="absolute text-center flex flex-col items-center gap-4 px-6">
            <h2 className="text-white font-black leading-none" style={{ fontSize: "clamp(2.8rem, 6vw, 6rem)" }}>
              Hey 👋, I&apos;m Surya
            </h2>
            <p className="text-white/60 font-medium tracking-widest uppercase text-base">
              Scroll to discover
            </p>
          </div>

          {/* Cards row */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-7 px-[4vw] w-full">
            {PANELS.map((panel, i) => (
              <div
                key={panel.label}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="pointer-events-auto flex-shrink-0 flex flex-col relative"
                style={{
                  width: "clamp(240px, 24vw, 320px)",
                  background: "linear-gradient(145deg, rgba(18,18,22,0.85) 0%, rgba(10,10,14,0.95) 100%)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: `1px solid ${panel.accentFrom}44`,
                  borderRadius: "22px",
                  boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px ${panel.accentFrom}22`,
                  transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
                  e.currentTarget.style.boxShadow = `0 32px 70px rgba(0,0,0,0.7), 0 0 28px ${panel.accentFrom}55`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px ${panel.accentFrom}22`;
                }}
              >
                <div style={{ height: "3px", borderRadius: "22px 22px 0 0", background: `linear-gradient(90deg, ${panel.accentFrom}, ${panel.accentTo})` }} />
                <div className="flex flex-col gap-4 p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: panel.badgeBg, boxShadow: `0 4px 16px ${panel.accentFrom}55` }}>
                      {panel.icon}
                    </div>
                    <div>
                      <p className="text-white/40 text-[9px] font-bold uppercase tracking-[0.3em]">About me</p>
                      <p className="text-white font-black text-lg leading-tight">{panel.label}</p>
                    </div>
                  </div>
                  <div className="h-px w-full" style={{ background: `linear-gradient(90deg, ${panel.accentFrom}44, ${panel.accentTo}44)` }} />
                  <div className="flex flex-col gap-3">
                    {panel.lines.map((row) => (
                      <div key={row.label} className="flex justify-between items-start gap-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest flex-shrink-0 mt-0.5" style={{ color: `${panel.accentFrom}cc` }}>
                          {row.label}
                        </span>
                        <span className="text-white/90 font-medium text-xs text-right leading-relaxed">
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
    </div>
  );
          }
