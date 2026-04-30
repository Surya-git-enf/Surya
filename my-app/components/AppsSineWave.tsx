
"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

/* ── App data ────────────────────────────────────────────── */
const APPS = [
  {
    num: "1",
    title: "Mailmate",
    tagline: "AI Email Composer",
    desc: "Zero-effort cold outreach. Mailmate studies your tone, learns your audience, and writes hyper-personalised emails that feel human — at scale.",
    accent: "#3b82f6",
    imgBg: "#dbeafe",
  },
  {
    num: "2",
    title: "Slide",
    tagline: "Deck Generator",
    desc: "Drop a brief. Slide builds a polished presentation in seconds — slides, charts, and speaker notes, all brand-consistent and export-ready.",
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

/* ── Wave math ───────────────────────────────────────────── */
// SVG viewBox: 0 0 1200 300
// One full sine wave with 3 key points: trough → peak → trough → peak (rough)
const WAVE_D =
  "M 0 150 C 100 150 150 50 300 50 C 450 50 500 250 600 250 C 700 250 750 50 900 50 C 1050 50 1100 250 1200 250";

// Key positions on the path (0–1 progress)
const MARKER_STOPS = [0.13, 0.46, 0.79]; // ~peaks of each arch

/* ── Card component ──────────────────────────────────────── */
interface CardProps {
  app: (typeof APPS)[number];
  active: boolean;
  index: number;
}

function AppCard({ app, active, index }: CardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative"
      style={{
        width: "clamp(240px,22vw,300px)",
        height: "clamp(320px,32vh,380px)",
        perspective: "900px",
        flexShrink: 0,
      }}
    >
      {/* Glow backlight */}
      <div
        className="absolute inset-0 rounded-3xl transition-all duration-700"
        style={{
          background: app.accent,
          filter: "blur(32px)",
          opacity: active ? 0.2 : 0,
          transform: "scale(0.85) translateY(10px)",
        }}
      />

      {/* Card flipper */}
      <div
        onClick={() => setFlipped((f) => !f)}
        className="relative w-full h-full cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* ── Front ── */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden flex flex-col"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* 80% image area */}
          <div
            className="flex-1 flex items-center justify-center"
            style={{ background: app.imgBg, minHeight: "80%" }}
          >
            <svg viewBox="0 0 80 80" className="w-20 h-20 opacity-40" fill="none">
              <rect x="10" y="10" width="60" height="60" rx="12" stroke={app.accent} strokeWidth="3" />
              <circle cx="40" cy="40" r="16" fill={app.accent} opacity="0.5" />
              <path d="M32 40l6 6 12-12" stroke={app.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {/* 20% base */}
          <div className="bg-white px-5 py-4 flex flex-col gap-0.5" style={{ minHeight: "20%" }}>
            <span className="font-black text-gray-900 text-lg leading-tight">{app.title}</span>
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: app.accent }}>
              {app.tagline}
            </span>
          </div>
        </div>

        {/* ── Back ── */}
        <div
          className="absolute inset-0 rounded-3xl flex flex-col justify-center gap-4 p-7"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.8)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg"
            style={{ background: app.accent }}
          >
            {app.num}
          </div>
          <p className="text-gray-700 text-sm leading-relaxed font-medium">{app.desc}</p>
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: app.accent }}>
            Tap to flip back →
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────── */
export default function AppsSineWave() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<SVGGElement>(null);
  const markerNumRef = useRef<SVGTextElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Initial card states: only first visible
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 40 });
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 1.4,
        },
      });

      /* ── Marker motion along wave path ── */
      tl.to(
        markerRef.current,
        {
          motionPath: {
            path: WAVE_D,
            align: WAVE_D,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
            start: MARKER_STOPS[0],
            end: MARKER_STOPS[1],
          },
          ease: "power2.inOut",
          duration: 2,
          onUpdate: function () {
            const p = this.progress();
            if (p > 0.45 && markerNumRef.current) {
              markerNumRef.current.textContent = "2";
            }
          },
        },
        0
      );

      // Card 1 → out, Card 2 → in (parallel with marker move)
      tl.to(cardRefs.current[0], { opacity: 0, y: -40, duration: 1, ease: "power2.in" }, 0.8);
      tl.to(
        cardRefs.current[1],
        {
          opacity: 1, y: 0, duration: 1, ease: "power2.out",
          onStart: () => setActiveIndex(1),
        },
        0.8
      );

      /* ── Marker: stop 2 → stop 3 ── */
      tl.to(
        markerRef.current,
        {
          motionPath: {
            path: WAVE_D,
            align: WAVE_D,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
            start: MARKER_STOPS[1],
            end: MARKER_STOPS[2],
          },
          ease: "power2.inOut",
          duration: 2,
          onUpdate: function () {
            const p = this.progress();
            if (p > 0.45 && markerNumRef.current) {
              markerNumRef.current.textContent = "3";
            }
          },
        },
        2
      );

      // Card 2 → out, Card 3 → in
      tl.to(cardRefs.current[1], { opacity: 0, y: -40, duration: 1, ease: "power2.in" }, 2.8);
      tl.to(
        cardRefs.current[2],
        {
          opacity: 1, y: 0, duration: 1, ease: "power2.out",
          onStart: () => setActiveIndex(2),
        },
        2.8
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* Heading */}
      <div className="absolute top-[8vh] left-0 right-0 flex flex-col items-center z-10 select-none">
        <h2
          className="font-black text-gray-950 text-center leading-none"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 6rem)",
            letterSpacing: "-0.02em",
            background: "linear-gradient(135deg, #111827 30%, #3b82f6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          AI APPS BUILT
        </h2>
        <div className="mt-2 h-0.5 w-24 rounded-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>

      {/* ── Wave SVG ── */}
      <div className="absolute bottom-[30vh] left-0 right-0 px-0" style={{ zIndex: 2 }}>
        <svg
          viewBox="0 0 1200 300"
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: "200px", overflow: "visible" }}
        >
          <defs>
            <filter id="neonBlue" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
              <feColorMatrix in="blur1" type="matrix" values="0 0 0 0 0.23  0 0 0 0 0.51  0 0 0 0 0.96  0 0 0 1 0" result="blue1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur2" />
              <feMerge>
                <feMergeNode in="blue1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Glow layer */}
          <path
            d={WAVE_D}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="12"
            opacity="0.2"
            strokeLinecap="round"
          />
          {/* Main wave */}
          <path
            d={WAVE_D}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#neonBlue)"
          />

          {/* Marker group — positioned at first stop initially */}
          <g ref={markerRef} style={{ transform: `translate(156px, 50px)` }}>
            <circle r="20" fill="#3b82f6" opacity="0.15" />
            <circle r="14" fill="#3b82f6" />
            <circle r="14" fill="#3b82f6" opacity="0.4" style={{ filter: "blur(6px)" }} />
            <text
              ref={markerNumRef}
              textAnchor="middle"
              dominantBaseline="central"
              fill="white"
              fontSize="14"
              fontWeight="900"
              fontFamily="system-ui"
            >
              1
            </text>
          </g>
        </svg>
      </div>

      {/* ── Cards row ── */}
      <div
        className="absolute flex items-center justify-center gap-8"
        style={{
          bottom: "6vh",
          left: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        {APPS.map((app, i) => (
          <div
            key={app.title}
            ref={(el) => { cardRefs.current[i] = el; }}
          >
            <AppCard app={app} active={activeIndex === i} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
          }
      
