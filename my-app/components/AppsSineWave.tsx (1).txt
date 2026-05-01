"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  AppsSineWave — scroll-driven neon blue wave
  ─────────────────────────────────────────────────────────────
  Architecture (avoids MotionPathPlugin SVG coordinate issues):
  • Wave is a decorative SVG — visual only
  • Marker is an absolutely-positioned DOM circle that we move
    by interpolating between pre-computed (x, y) screen points
    tied to the scrub progress. This is 100% reliable.
  • Cards stack in the centre. Scroll fades card 1 out / card 2
    in, then card 2 out / card 3 in, exactly in sync with marker.
*/

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

/* ── sine-wave evaluation for marker x/y ── */
// We move the marker along a logical sine path mapped to the SVG viewBox.
// viewBox: 0 0 1200 300   height rendered: 180px
// Three stops: left-peak (t=0), mid-trough (t=0.5), right-peak (t=1)
function sinePoint(t: number): { px: number; py: number } {
  // x goes 0→100 (percentage of section width)
  const xPct = t * 100;
  // y: sine oscillation.  t=0 → top (peak), t=0.5 → bottom (trough), t=1 → top
  const rawY = Math.sin(t * Math.PI); // 0→1→0 for one arch; we want two arches
  // Two full arches: 0→peak→trough→peak
  const yNorm = -Math.cos(t * Math.PI * 2) * 0.5 + 0.5; // 0→1→0→1→0 but we want peaks at 0,0.5,1
  // peaks at t=0, 0.5, 1 → yNorm = 0 at those points, 1 at troughs
  // We want marker at peaks, so invert:
  const yFrac = 1 - yNorm; // 1 at peaks, 0 at troughs
  // map to wave strip (occupies bottom 55% of vh)
  // waveTop in vh: 30vh from bottom, height 180px (~22vh on 800px screen) → centre at ~41vh from top
  // We'll just return percentages and use CSS to position
  return { px: xPct, py: yFrac };
}

/* Three marker stops (left peak, mid peak, right peak) */
const STOPS = [
  sinePoint(0.0),   // start left
  sinePoint(0.5),   // mid
  sinePoint(1.0),   // end right
];

/* ── AppCard ── */
interface CardProps {
  app: (typeof APPS)[number];
  active: boolean;
}
function AppCard({ app, active }: CardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: "clamp(230px,21vw,290px)", height: "clamp(310px,32vh,370px)", perspective: "900px" }}
    >
      {/* Neon backlight */}
      <div
        className="absolute inset-0 rounded-3xl transition-all duration-700"
        style={{
          background: app.accent,
          filter: "blur(36px)",
          opacity: active ? 0.22 : 0,
          transform: "scale(0.82) translateY(12px)",
          zIndex: 0,
        }}
      />

      {/* Flipper */}
      <div
        onClick={() => setFlipped((f) => !f)}
        className="relative w-full h-full cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.65s cubic-bezier(0.4,0,0.2,1)",
          zIndex: 1,
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden flex flex-col"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div
            className="flex-1 flex items-center justify-center"
            style={{ background: app.imgBg }}
          >
            <svg viewBox="0 0 80 80" className="w-20 h-20" fill="none">
              <rect x="10" y="10" width="60" height="60" rx="14" stroke={app.accent} strokeWidth="2.5" />
              <circle cx="40" cy="40" r="15" fill={app.accent} opacity="0.18" />
              <path d="M32 40l6 6 12-12" stroke={app.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="bg-white px-5 py-4 flex flex-col gap-1">
            <span className="font-black text-gray-900 text-lg leading-tight">{app.title}</span>
            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: app.accent }}>
              {app.tagline}
            </span>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-3xl flex flex-col justify-center gap-4 p-6"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.85)",
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
          <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: app.accent }}>
            Tap to flip back →
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function AppsSineWave() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const markerRef    = useRef<HTMLDivElement>(null);
  const markerNumRef = useRef<HTMLSpanElement>(null);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const marker  = markerRef.current;
    if (!section || !marker) return;

    // set initial card states
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 30 });
    });

    // initial marker position — left peak area
    // We position the marker in % relative to section width/height via left/top
    gsap.set(marker, { left: "12%", top: "55%" });

    // Proxy object for progress
    const proxy = { p: 0 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=260%",
          pin: true,
          scrub: 1.2,
          onUpdate: (self) => {
            // Keep proxy in sync for marker movement
            proxy.p = self.progress;
          },
        },
      });

      /*
        Timeline has 4 "beats" (duration units):
          0→1: marker goes  left-peak → mid-peak
               card1 fades out / card2 fades in (at beat 0.5)
          1→2: marker goes  mid-peak  → right-peak
               card2 fades out / card3 fades in (at beat 1.5)
      */

      /* ── Marker: left-peak → mid → right-peak ── */
      // We animate a proxy x/y and read it on update
      const markerProxy = { x: 12, yFrac: 0.25 }; // percent values

      tl.to(markerProxy, {
        x: 50, yFrac: 0.72,   // trough position (mid screen, wave low)
        duration: 1,
        ease: "power1.inOut",
        onUpdate: () => {
          if (marker) {
            marker.style.left = `${markerProxy.x}%`;
            marker.style.top  = `${markerProxy.yFrac * 100}%`;
          }
        },
      }, 0);

      tl.to(markerProxy, {
        x: 88, yFrac: 0.25,   // right peak
        duration: 1,
        ease: "power1.inOut",
        onUpdate: () => {
          if (marker) {
            marker.style.left = `${markerProxy.x}%`;
            marker.style.top  = `${markerProxy.yFrac * 100}%`;
          }
        },
      }, 1);

      /* ── Number changes ── */
      tl.add(() => {
        if (markerNumRef.current) markerNumRef.current.textContent = "2";
      }, 0.9);
      tl.add(() => {
        if (markerNumRef.current) markerNumRef.current.textContent = "3";
      }, 1.9);

      /* ── Card 1 out / Card 2 in ── */
      tl.to(cardRefs.current[0], { opacity: 0, y: -30, duration: 0.55, ease: "power2.in" }, 0.5);
      tl.to(cardRefs.current[1], {
        opacity: 1, y: 0, duration: 0.55, ease: "power2.out",
        onStart: () => setActiveIndex(1),
      }, 0.55);

      /* ── Card 2 out / Card 3 in ── */
      tl.to(cardRefs.current[1], { opacity: 0, y: -30, duration: 0.55, ease: "power2.in" }, 1.5);
      tl.to(cardRefs.current[2], {
        opacity: 1, y: 0, duration: 0.55, ease: "power2.out",
        onStart: () => setActiveIndex(2),
      }, 1.55);

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
      <div className="absolute top-[7vh] left-0 right-0 flex flex-col items-center z-10 select-none">
        <h2
          className="font-black text-center leading-none"
          style={{
            fontSize: "clamp(2.2rem, 4.8vw, 5.8rem)",
            letterSpacing: "-0.02em",
            background: "linear-gradient(135deg, #111827 30%, #3b82f6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          AI APPS BUILT
        </h2>
        <div className="mt-2 h-0.5 w-20 rounded-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>

      {/* ── Neon sine wave SVG (visual only) ── */}
      <div
        className="absolute w-full"
        style={{ bottom: "28vh", zIndex: 1 }}
      >
        <svg
          viewBox="0 0 1200 280"
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: "180px", overflow: "visible" }}
        >
          <defs>
            <filter id="nb" x="-20%" y="-60%" width="140%" height="220%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="b1" />
              <feColorMatrix in="b1" type="matrix"
                values="0 0 0 0 0.23  0 0 0 0 0.51  0 0 0 0 0.96  0 0 0 1 0"
                result="blue" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b2" />
              <feMerge>
                <feMergeNode in="blue" />
                <feMergeNode in="b2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* fat glow */}
          <path
            d="M0 140 C150 140 200 40 300 40 C400 40 450 240 600 240 C750 240 800 40 900 40 C1000 40 1050 240 1200 140"
            fill="none" stroke="#3b82f6" strokeWidth="16" opacity="0.12" strokeLinecap="round"
          />
          {/* main neon line */}
          <path
            d="M0 140 C150 140 200 40 300 40 C400 40 450 240 600 240 C750 240 800 40 900 40 C1000 40 1050 240 1200 140"
            fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"
            filter="url(#nb)"
          />
        </svg>
      </div>

      {/* ── Floating DOM marker (absolutely positioned, GSAP moves it) ── */}
      <div
        ref={markerRef}
        className="absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: 48, height: 48 }}
      >
        {/* outer glow ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: "#3b82f6", filter: "blur(14px)", opacity: 0.35 }}
        />
        {/* solid circle */}
        <div
          className="absolute inset-0 rounded-full flex items-center justify-center"
          style={{ background: "#3b82f6", boxShadow: "0 0 0 3px rgba(59,130,246,0.3)" }}
        >
          <span
            ref={markerNumRef}
            className="text-white font-black text-sm select-none"
          >
            1
          </span>
        </div>
      </div>

      {/* ── Cards ── */}
      <div
        className="absolute flex items-center justify-center gap-6"
        style={{ bottom: "5vh", left: 0, right: 0, zIndex: 10 }}
      >
        {APPS.map((app, i) => (
          <div
            key={app.title}
            ref={(el) => { cardRefs.current[i] = el; }}
          >
            <AppCard app={app} active={activeIndex === i} />
          </div>
        ))}
      </div>
    </section>
  );
}
