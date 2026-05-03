"use client";

import { useRef, useEffect, useState } from "react";
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

// Wave Y positions (percentage of wave container height, 0–100)
// Peak → Trough → Peak
const WAVE_POSITIONS = [
  { leftPct: 14, topPct: 20  },  // Card 1: first peak
  { leftPct: 50, topPct: 78  },  // Card 2: trough
  { leftPct: 86, topPct: 20  },  // Card 3: second peak
];

function AppCard({ app, active }: { app: (typeof APPS)[number]; active: boolean }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      style={{
        width: "clamp(220px, 20vw, 280px)",
        height: "clamp(300px, 32vh, 360px)",
        perspective: "900px",
      }}
    >
      {/* Neon backlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "1.5rem",
          background: app.accent,
          filter: "blur(40px)",
          opacity: active ? 0.2 : 0,
          transform: "scale(0.8) translateY(14px)",
          transition: "opacity 0.7s ease",
          pointerEvents: "none",
        }}
      />

      {/* Flipper */}
      <div
        onClick={() => setFlipped((f) => !f)}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          cursor: "pointer",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.65s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Front */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "1.5rem",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            backfaceVisibility: "hidden",
            boxShadow: "0 16px 50px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: app.imgBg }}>
            <svg viewBox="0 0 80 80" style={{ width: 72, height: 72 }} fill="none">
              <rect x="10" y="10" width="60" height="60" rx="14" stroke={app.accent} strokeWidth="2.5" />
              <circle cx="40" cy="40" r="15" fill={app.accent} opacity="0.18" />
              <path d="M32 40l6 6 12-12" stroke={app.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ background: "#fff", padding: "16px 20px 18px", display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontWeight: 900, color: "#111", fontSize: 17, lineHeight: 1.2 }}>{app.title}</span>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: app.accent }}>
              {app.tagline}
            </span>
          </div>
        </div>

        {/* Back */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "1.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 16,
            padding: 24,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.9)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: app.accent, color: "#fff", fontWeight: 900, fontSize: 18 }}>
            {app.num}
          </div>
          <p style={{ color: "#444", fontSize: 13, lineHeight: 1.6, fontWeight: 500 }}>{app.desc}</p>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: app.accent }}>
            Tap to flip back →
          </span>
        </div>
      </div>
    </div>
  );
}

export default function AppsSineWave() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const markerRef    = useRef<HTMLDivElement>(null);
  const markerNumRef = useRef<HTMLSpanElement>(null);
  const cardWrappers = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const marker  = markerRef.current;
    if (!section || !marker) return;

    // Initial states: card 0 visible, others hidden
    cardWrappers.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 40 });
    });

    // Place marker at card 1 wave position
    gsap.set(marker, { left: `${WAVE_POSITIONS[0].leftPct}%`, top: `${WAVE_POSITIONS[0].topPct}%` });

    const markerProxy = {
      left: WAVE_POSITIONS[0].leftPct,
      top:  WAVE_POSITIONS[0].topPct,
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          // ← CRITICAL: 600% = plenty of scroll to hold card 3 before footer
          end: "+=600%",
          pin: true,
          scrub: 1.4,
          anticipatePin: 1,
        },
      });

      /* ── Beat 0 → 1: marker peak → trough, card 1 out, card 2 in ── */
      tl.to(markerProxy, {
        left: WAVE_POSITIONS[1].leftPct,
        top:  WAVE_POSITIONS[1].topPct,
        duration: 1,
        ease: "power1.inOut",
        onUpdate: () => {
          if (marker) {
            marker.style.left = `${markerProxy.left}%`;
            marker.style.top  = `${markerProxy.top}%`;
          }
        },
      }, 0);

      tl.to(cardWrappers.current[0], { opacity: 0, y: -40, duration: 0.35, ease: "power2.in" }, 0.45);
      tl.to(cardWrappers.current[1], {
        opacity: 1, y: 0, duration: 0.35, ease: "power2.out",
        onStart: () => setActiveIndex(1),
      }, 0.55);
      tl.to({ n: 1 }, { n: 2, duration: 0.01, onUpdate() { if (markerNumRef.current) markerNumRef.current.textContent = "2"; } }, 0.85);

      /* ── Beat 1 → 2: marker trough → peak, card 2 out, card 3 in ── */
      tl.to(markerProxy, {
        left: WAVE_POSITIONS[2].leftPct,
        top:  WAVE_POSITIONS[2].topPct,
        duration: 1,
        ease: "power1.inOut",
        onUpdate: () => {
          if (marker) {
            marker.style.left = `${markerProxy.left}%`;
            marker.style.top  = `${markerProxy.top}%`;
          }
        },
      }, 1);

      tl.to(cardWrappers.current[1], { opacity: 0, y: -40, duration: 0.35, ease: "power2.in" }, 1.45);
      tl.to(cardWrappers.current[2], {
        opacity: 1, y: 0, duration: 0.35, ease: "power2.out",
        onStart: () => setActiveIndex(2),
      }, 1.55);
      tl.to({ n: 2 }, { n: 3, duration: 0.01, onUpdate() { if (markerNumRef.current) markerNumRef.current.textContent = "3"; } }, 1.85);

      // ── Hold card 3 for 4 beats before unpin ──
      // tl total = 2 (beats) + 4 (hold) = 6 — maps to 600% scroll
      tl.set({}, {}, 6.0);

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="builtapps"
      ref={sectionRef}
      style={{ position: "relative", width: "100%", height: "100vh", background: "#fff", overflow: "hidden" }}
    >
      {/* Heading */}
      <div style={{ position: "absolute", top: "5vh", left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", zIndex: 10, userSelect: "none" }}>
        <h2
          style={{
            fontWeight: 900,
            fontSize: "clamp(2rem, 4.5vw, 5rem)",
            letterSpacing: "-0.02em",
            background: "linear-gradient(135deg, #111827 30%, #3b82f6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: 0,
            lineHeight: 1,
          }}
        >
          AI APPS BUILT
        </h2>
        <div style={{ marginTop: 8, height: 2, width: 80, borderRadius: 9999, background: "linear-gradient(90deg, transparent, #3b82f6, transparent)" }} />
      </div>

      {/*
        ── WAVE STRIP ──
        Positioned at 34vh from top, spans 36vh tall.
        Cards are positioned WITHIN this strip at their wave Y positions.
      */}
      <div
        style={{
          position: "absolute",
          top: "28vh",
          left: 0,
          right: 0,
          height: "44vh",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        {/* SVG wave — fills the strip */}
        <svg
          viewBox="0 0 1200 220"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}
        >
          <defs>
            <filter id="waveGlow" x="-20%" y="-80%" width="140%" height="260%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
              <feColorMatrix in="blur" type="matrix"
                values="0 0 0 0 0.23  0 0 0 0 0.51  0 0 0 0 0.96  0 0 0 1 0"
                result="blueGlow"
              />
              <feMerge>
                <feMergeNode in="blueGlow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Thick glow layer */}
          <path
            d="M0 110 C160 110 200 24 350 24 C480 24 520 196 600 196 C680 196 720 24 850 24 C1000 24 1040 196 1200 110"
            fill="none" stroke="#3b82f6" strokeWidth="20" opacity="0.07" strokeLinecap="round"
          />
          {/* Neon line */}
          <path
            d="M0 110 C160 110 200 24 350 24 C480 24 520 196 600 196 C680 196 720 24 850 24 C1000 24 1040 196 1200 110"
            fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"
            filter="url(#waveGlow)"
          />
          {/* Card 1 peak dot */}
          <circle cx="200" cy="24" r="5" fill="#3b82f680" />
          {/* Card 2 trough dot */}
          <circle cx="600" cy="196" r="5" fill="#3b82f680" />
          {/* Card 3 peak dot */}
          <circle cx="1000" cy="24" r="5" fill="#3b82f680" />
        </svg>
      </div>

      {/*
        ── MARKER — lives in the wave strip coordinate space ──
        position: absolute inside section, left/top set by GSAP as %
      */}
      <div
        ref={markerRef}
        style={{
          position: "absolute",
          zIndex: 20,
          width: 48,
          height: 48,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      >
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#3b82f6", filter: "blur(14px)", opacity: 0.45 }} />
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "#3b82f6", boxShadow: "0 0 0 3px rgba(59,130,246,0.3)" }}>
          <span ref={markerNumRef} style={{ color: "#fff", fontWeight: 900, fontSize: 14, userSelect: "none" }}>1</span>
        </div>
      </div>

      {/*
        ── CARDS — each absolutely positioned at its wave peak/trough ──
        Uses the same coordinate system as the wave strip:
        Card 1: top peak  → row from ~28vh top  →  absolute top ~30vh, left ~14%
        Card 2: trough    → absolute top ~62vh,  left ~50%
        Card 3: top peak  → absolute top ~30vh,  left ~86%
      */}
      {APPS.map((app, i) => (
        <div
          key={app.title}
          ref={(el) => { cardWrappers.current[i] = el; }}
          style={{
            position: "absolute",
            zIndex: 10,
            left: `${WAVE_POSITIONS[i].leftPct}%`,
            // Wave strip starts at 28vh; topPct is within the 44vh strip
            top: `calc(28vh + ${WAVE_POSITIONS[i].topPct / 100} * 44vh)`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <AppCard app={app} active={activeIndex === i} />
        </div>
      ))}
    </section>
  );
}
