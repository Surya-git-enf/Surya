
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
    lines: [
      { label: "Name", value: "Surya Peddishetti" },
      { label: "Role", value: "AI / Full-Stack Dev" },
      { label: "Location", value: "India 🇮🇳" },
      { label: "Status", value: "Open to Opportunities" },
    ],
  },
  {
    label: "Education",
    accentFrom: "#22d3ee",
    accentTo: "#a855f7",
    badgeBg: "linear-gradient(135deg,#22d3ee,#a855f7)",
    lines: [
      { label: "Degree", value: "B.Tech — CS" },
      { label: "University", value: "JNTUH" },
      { label: "Year", value: "2025" },
      { label: "Focus", value: "AI · Systems · Web" },
    ],
  },
  {
    label: "Hobbies",
    accentFrom: "#ec4899",
    accentTo: "#22d3ee",
    badgeBg: "linear-gradient(135deg,#ec4899,#22d3ee)",
    lines: [
      { label: "Creative", value: "3D Design · Motion" },
      { label: "Build", value: "AI Micro-SaaS" },
      { label: "Music", value: "Synthwave · Lo-fi" },
      { label: "Sport", value: "Cricket · Chess" },
    ],
  },
] as const;

export default function CanvasScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(textRef.current, { opacity: 1, y: 0 });
      cardRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 100, scale: 0.9 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1100%", // 🔥 important (long scroll)
          pin: true,
          scrub: 1.2,
        },
      });

      // Intro out
      tl.to(textRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: "power2.inOut",
      }, 0.2);

      // Cards appear one by one
      tl.to(cardRefs.current[0], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
      }, 1.2);

      tl.to(cardRefs.current[1], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
      }, 2.6);

      tl.to(cardRefs.current[2], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
      }, 4.0); // ✅ hobbies now clearly visible

      // Hold hobbies (IMPORTANT)
      tl.to({}, { duration: 1.5 }, 5.5);

      // Float effect
      tl.to(cardRefs.current, {
        y: -20,
        duration: 2,
        ease: "none",
      }, 6.5);

      // Exit animation
      tl.to(cardRefs.current, {
        opacity: 0,
        y: -100,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.in",
      }, 8.5);

      // Final hold before next section
      tl.to({}, { duration: 1.5 }, 9.5);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", background: "#000" }}
    >
      {/* 🎥 Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
        
        {/* Intro */}
        <div ref={textRef} className="text-center">
          <h2 className="text-white font-black text-5xl">
            Hey 👋, I'm Surya
          </h2>
          <p className="text-white/60 mt-2 uppercase tracking-widest">
            Scroll to discover
          </p>
        </div>

        {/* Cards */}
        <div className="absolute flex flex-col md:flex-row gap-6 mt-20">
          {PANELS.map((panel, i) => (
            <div
              key={panel.label}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="w-[260px] p-5 rounded-2xl backdrop-blur-xl border border-white/20 bg-white/10"
            >
              <h3 className="text-white font-bold text-lg mb-4">
                {panel.label}
              </h3>

              {panel.lines.map((row) => (
                <div key={row.label} className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">{row.label}</span>
                  <span className="text-white">{row.value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
