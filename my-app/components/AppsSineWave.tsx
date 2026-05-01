"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  AppsSineWave — scroll-driven neon sine wave.

  KEY FIXES vs original:
  ─────────────────────────────────────────────────────────────
  1. Section height is 100vh and the pin end is +=280% so the
     section holds the viewport for ~3 full screen-heights of
     scroll before the user can reach the footer.

  2. The cards wrapper sits at the BOTTOM of the viewport (not
     overlapping the wave strip) — they cannot be covered by the
     footer because the footer only appears after the ScrollTrigger
     unpins this section.

  3. The number bubble animates DURING scroll scrub (not
     on an instantaneous callback) — visible and smooth.

  4. The section uses overflow:hidden to prevent any bleed.
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
          <div className="flex-1 flex items-center justify-center" style={{ background: app.imgBg }}>
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

    /* Initial states */
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 30 });
    });
    gsap.set(marker, { left: "10%", top: "52%" });

    /* Proxy for marker position */
    const markerProxy = { x: 10, yPct: 52 };

    const ctx = gsap.context(() => {
      /*
        Timeline structure (2 beat units → animates through 3 cards):
          Beat 0→1:  marker travels left-peak → trough (mid), card1→card2 transition
          Beat 1→2:  marker travels trough → right-peak,   card2→card3 transition
          end +=280% gives ~3 viewports of pinned scroll distance.
          That is comfortably MORE than the 2-beat animation,
          so the user sees the final card before the section unpins.
      */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=280%",   // ← enough pin height to complete full animation
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      /* ── Marker path: left-peak → trough → right-peak ── */
      tl.to(markerProxy, {
        x: 50,
        yPct: 70,   // trough — lower on screen
        duration: 1,
        ease: "power1.inOut",
        onUpdate: () => {
          if (marker) {
            marker.style.left = `${markerProxy.x}%`;
            marker.style.top  = `${markerProxy.yPct}%`;
          }
        },
      }, 0);

      tl.to(markerProxy, {
        x: 88,
        yPct: 52,   // right peak — same height as start
        duration: 1,
        ease: "power1.inOut",
        onUpdate: () => {
          if (marker) {
            marker.style.left = `${markerProxy.x}%`;
            marker.style.top  = `${markerProxy.yPct}%`;
          }
        },
      }, 1);

      /* ── Number bubble: updates mid-transition ── */
      tl.to({ n: 1 }, {
        n: 2,
        duration: 0.01,
        onUpdate() {
          if (markerNumRef.current) markerNumRef.current.textContent = "2";
        },
      }, 0.88);

      tl.to({ n: 2 }, {
        n: 3,
        duration: 0.01,
        onUpdate() {
          if (markerNumRef.current) markerNumRef.current.textContent = "3";
        },
      }, 1.88);

      /* ── Card 1 out / Card 2 in ── */
      tl.to(cardRefs.current[0], { opacity: 0, y: -30, duration: 0.45, ease: "power2.in" }, 0.48);
      tl.to(cardRefs.current[1], {
        opacity: 1, y: 0, duration: 0.45, ease: "power2.out",
        onStart: () => setActiveIndex(1),
      }, 0.54);

      /* ── Card 2 out / Card 3 in ── */
      tl.to(cardRefs.current[1], { opacity: 0, y: -30, duration: 0.45, ease: "power2.in" }, 1.48);
      tl.to(cardRefs.current[2], {
        opacity: 1, y: 0, duration: 0.45, ease: "power2.out",
        onStart: () => setActiveIndex(2),
      }, 1.54);

      /* ── Hold buffer: keep card 3 visible before unpin ── */
      tl.set({}, {}, 2.2);

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    /*
      height: 100vh  — fills the entire viewport when pinned.
      overflow: hidden  — absolutely prevents footer bleed-through.
    */
    <section
      ref={sectionRef}
      className="relative w-full bg-white"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      {/* ── Heading ── */}
      <div className="absolute top-[6vh] left-0 right-0 flex flex-col items-center z-10 select-none">
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

      {/* ── Neon sine-wave SVG (visual only, behind everything) ── */}
      <div
        className="absolute w-full pointer-events-none"
        style={{ bottom: "26vh", zIndex: 1 }}
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
                result="blue"
              />
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b2" />
              <feMerge>
                <feMergeNode in="blue" />
                <feMergeNode in="b2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Glow */}
          <path
            d="M0 140 C150 140 200 40 300 40 C400 40 450 240 600 240 C750 240 800 40 900 40 C1000 40 1050 240 1200 140"
            fill="none" stroke="#3b82f6" strokeWidth="18" opacity="0.10" strokeLinecap="round"
          />
          {/* Neon line */}
          <path
            d="M0 140 C150 140 200 40 300 40 C400 40 450 240 600 240 C750 240 800 40 900 40 C1000 40 1050 240 1200 140"
            fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"
            filter="url(#nb)"
          />
        </svg>
      </div>

      {/* ── Floating marker (GSAP moves via inline style) ── */}
      <div
        ref={markerRef}
        className="absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: 52, height: 52 }}
      >
        {/* glow ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: "#3b82f6", filter: "blur(16px)", opacity: 0.35 }}
        />
        {/* solid circle */}
        <div
          className="absolute inset-0 rounded-full flex items-center justify-center"
          style={{ background: "#3b82f6", boxShadow: "0 0 0 3px rgba(59,130,246,0.3)" }}
        >
          <span ref={markerNumRef} className="text-white font-black text-sm select-none">
            1
          </span>
        </div>
      </div>

      {/* ── Cards — stacked in centre, only one visible at a time ── */}
      {/*
        Position: bottom 4vh keeps them clear of the viewport edge.
        Each card sits on top of the previous one (absolute/relative stack).
        GSAP fades them in/out independently.
      */}
      <div
        className="absolute"
        style={{
          bottom: "4vh",
          left: 0,
          right: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          /* Reserve the height so the section doesn't collapse */
          height: "clamp(330px,36vh,400px)",
        }}
      >
        {APPS.map((app, i) => (
          <div
            key={app.title}
            ref={(el) => { cardRefs.current[i] = el; }}
            style={{
              position: "absolute",
              /* All cards occupy the same spot — GSAP opacity controls visibility */
            }}
          >
            <AppCard app={app} active={activeIndex === i} />
          </div>
        ))}
      </div>
    </section>
  );
}
