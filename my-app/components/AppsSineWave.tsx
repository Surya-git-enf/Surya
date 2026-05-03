
"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const APPS = [
  {
    num: "1",
    title: "Mailmate",
    tagline: "AI Email Composer",
    desc: "Zero-effort cold outreach. Mailmate learns your tone and audience to write hyper-personalised emails that feel human — at scale.",
    accent: "#3b82f6",
    imgBg: "#dbeafe",
  },
  {
    num: "2",
    title: "Slide",
    tagline: "Deck Generator",
    desc: "Drop a brief. Slide builds a polished presentation in seconds — slides, charts, and speaker notes, brand-consistent and export-ready.",
    accent: "#8b5cf6",
    imgBg: "#ede9fe",
  },
  {
    num: "3",
    title: "Playful",
    tagline: "AI Storyboard",
    desc: "Story-driven content planning. Playful maps your narrative arc, generates scene scripts, and suggests visual hooks for every platform.",
    accent: "#06b6d4",
    imgBg: "#cffafe",
  },
] as const;

// Wave Positions explicitly mapped to the SVG peaks and troughs
const WAVE_POSITIONS = [
  { leftPct: 15, topPct: 18 }, // Card 1: First Peak
  { leftPct: 50, topPct: 82 }, // Card 2: Trough
  { leftPct: 85, topPct: 18 }, // Card 3: Second Peak
];

function AppCard({ app, active }: { app: (typeof APPS)[number]; active: boolean }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      style={{
        width: "clamp(240px, 22vw, 300px)",
        height: "clamp(320px, 35vh, 400px)",
        perspective: "1000px",
      }}
    >
      {/* Neon backlight */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none transition-all duration-700 ease-out"
        style={{
          background: app.accent,
          filter: "blur(40px)",
          opacity: active ? 0.35 : 0,
          transform: active ? "scale(0.9) translateY(20px)" : "scale(0.7) translateY(0px)",
        }}
      />

      {/* 3D Flipper */}
      <div
        onClick={() => setFlipped((f) => !f)}
        className="relative w-full h-full cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden flex flex-col bg-white"
          style={{
            backfaceVisibility: "hidden",
            boxShadow: "0 20px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
          }}
        >
          <div className="flex-1 flex items-center justify-center" style={{ background: app.imgBg }}>
            <svg viewBox="0 0 80 80" className="w-20 h-20" fill="none">
              <rect x="10" y="10" width="60" height="60" rx="14" stroke={app.accent} strokeWidth="3" />
              <circle cx="40" cy="40" r="15" fill={app.accent} opacity="0.2" />
              <path d="M32 40l6 6 12-12" stroke={app.accent} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="bg-white p-5 flex flex-col gap-1">
            <span className="font-black text-gray-900 text-xl tracking-tight">{app.title}</span>
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: app.accent }}>
              {app.tagline}
            </span>
          </div>
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 rounded-3xl flex flex-col justify-center gap-4 p-6"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,1)",
            boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
          }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-xl"
            style={{ background: app.accent, boxShadow: `0 8px 24px ${app.accent}66` }}
          >
            {app.num}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed font-medium">{app.desc}</p>
          <span className="text-[10px] font-bold tracking-widest uppercase mt-2" style={{ color: app.accent }}>
            Tap to return ↺
          </span>
        </div>
      </div>
    </div>
  );
}

export default function AppsSineWave() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const markerNumRef = useRef<HTMLSpanElement>(null);
  const cardWrappers = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const marker = markerRef.current;
    if (!section || !marker) return;

    // Reset initial states
    cardWrappers.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 60 });
    });

    gsap.set(marker, {
      left: `${WAVE_POSITIONS[0].leftPct}%`,
      top: `${WAVE_POSITIONS[0].topPct}%`,
    });

    const markerProxy = {
      left: WAVE_POSITIONS[0].leftPct,
      top: WAVE_POSITIONS[0].topPct,
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=600%", // Massive scroll duration to prevent overlap
          pin: true,
          scrub: 1.2, // Smooth scrubbing
          anticipatePin: 1,
        },
      });

      // === BEAT 1: Card 1 to Card 2 ===
      tl.to(markerProxy, {
        left: WAVE_POSITIONS[1].leftPct,
        top: WAVE_POSITIONS[1].topPct,
        duration: 1.5,
        ease: "sine.inOut", // Perfect wave tracing
        onUpdate: () => {
          if (marker) {
            marker.style.left = `${markerProxy.left}%`;
            marker.style.top = `${markerProxy.top}%`;
          }
        },
      }, 0);

      tl.to(cardWrappers.current[0], { opacity: 0, y: -60, duration: 0.5, ease: "power2.in" }, 0.2);
      tl.to(cardWrappers.current[1], {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "back.out(1.2)",
        onStart: () => setActiveIndex(1),
      }, 0.8);
      
      tl.to({ val: 1 }, {
        val: 2, duration: 0.1, onUpdate: function () {
          if (markerNumRef.current) markerNumRef.current.textContent = Math.round(this.targets()[0].val).toString();
        }
      }, 0.75); // Flips number precisely at the halfway drop

      // === BEAT 2: Card 2 to Card 3 ===
      tl.to(markerProxy, {
        left: WAVE_POSITIONS[2].leftPct,
        top: WAVE_POSITIONS[2].topPct,
        duration: 1.5,
        ease: "sine.inOut", // Perfect wave tracing
        onUpdate: () => {
          if (marker) {
            marker.style.left = `${markerProxy.left}%`;
            marker.style.top = `${markerProxy.top}%`;
          }
        },
      }, 1.5);

      tl.to(cardWrappers.current[1], { opacity: 0, y: -60, duration: 0.5, ease: "power2.in" }, 1.7);
      tl.to(cardWrappers.current[2], {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "back.out(1.2)",
        onStart: () => setActiveIndex(2),
      }, 2.3);

      tl.to({ val: 2 }, {
        val: 3, duration: 0.1, onUpdate: function () {
          if (markerNumRef.current) markerNumRef.current.textContent = Math.round(this.targets()[0].val).toString();
        }
      }, 2.25); // Flips number precisely at the halfway rise

      // === BEAT 3: HOLD THE LAST CARD ===
      // Forces the pin to stay active so the footer doesn't rush in
      tl.to({}, { duration: 2.0 });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="builtapps"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#fafafa] overflow-hidden"
    >
      {/* Dynamic Header */}
      <div className="absolute top-[8vh] left-0 right-0 flex flex-col items-center z-10 select-none">
        <h2
          className="font-black tracking-tight m-0"
          style={{
            fontSize: "clamp(2rem, 5vw, 5rem)",
            background: "linear-gradient(135deg, #111827 30%, #3b82f6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1,
          }}
        >
          AI APPS BUILT
        </h2>
        <div className="mt-4 h-[3px] w-20 rounded-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>

      {/* SVG Wave Canvas Area */}
      <div className="absolute top-[28vh] left-0 right-0 h-[45vh] z-0 pointer-events-none">
        <svg
          viewBox="0 0 1200 220"
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible"
        >
          <defs>
            <filter id="waveGlow" x="-20%" y="-80%" width="140%" height="260%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.23  0 0 0 0 0.51  0 0 0 0 0.96  0 0 0 1 0" result="blueGlow" />
              <feMerge>
                <feMergeNode in="blueGlow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background thick path */}
          <path
            d="M0 110 C180 110 220 24 350 24 C500 24 530 196 600 196 C670 196 700 24 850 24 C980 24 1020 110 1200 110"
            fill="none" stroke="#3b82f6" strokeWidth="24" opacity="0.05" strokeLinecap="round"
          />
          {/* Neon core path */}
          <path
            d="M0 110 C180 110 220 24 350 24 C500 24 530 196 600 196 C670 196 700 24 850 24 C980 24 1020 110 1200 110"
            fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" filter="url(#waveGlow)"
          />
        </svg>

        {/* The glowing marker that rides the wave. 
          Its left and top are controlled by GSAP.
        */}
        <div
          ref={markerRef}
          className="absolute z-30 w-12 h-12 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          <div className="absolute inset-0 rounded-full bg-blue-500 blur-md opacity-60" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-[0_0_0_4px_rgba(59,130,246,0.3)]">
            <span ref={markerNumRef} className="text-white font-black text-lg select-none">
              1
            </span>
          </div>
        </div>

        {/* The Cards pinned exactly at the wave peaks/troughs */}
        {APPS.map((app, i) => (
          <div
            key={app.title}
            ref={(el) => { cardWrappers.current[i] = el; }}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${WAVE_POSITIONS[i].leftPct}%`,
              top: `${WAVE_POSITIONS[i].topPct}%`,
            }}
          >
            <AppCard app={app} active={activeIndex === i} />
          </div>
        ))}
      </div>
    </section>
  );
}
