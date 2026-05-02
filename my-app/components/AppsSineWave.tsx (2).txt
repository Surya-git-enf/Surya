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

interface CardProps {
  app: (typeof APPS)[number];
  active: boolean;
}

function AppCard({ app, active }: CardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: "clamp(240px, 22vw, 300px)", height: "clamp(320px, 34vh, 380px)", perspective: "900px" }}
    >
      {/* Neon backlight */}
      <div
        className="absolute inset-0 rounded-3xl transition-all duration-700"
        style={{
          background: app.accent,
          filter: "blur(40px)",
          opacity: active ? 0.2 : 0,
          transform: "scale(0.8) translateY(14px)",
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
            background: "rgba(255,255,255,0.78)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.9)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
          }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg" style={{ background: app.accent }}>
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

export default function AppsSineWave() {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const markerRef     = useRef<HTMLDivElement>(null);
  const markerNumRef  = useRef<HTMLSpanElement>(null);
  const cardRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const marker  = markerRef.current;
    if (!section || !marker) return;

    // Start: card 1 visible, cards 2+3 hidden
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 30 });
    });

    // Place marker at the LEFT peak of the wave (SVG coords mapped to %)
    // Wave path: starts at left (x=0,y=140), peaks at (300,40), trough at (600,240), peak at (900,40), ends at (1200,140)
    // Left peak = x≈300/1200 = 25%, y≈40/280 = ~14% from top of wave strip
    gsap.set(marker, { left: "10%", top: "52%" });

    const markerProxy = { x: 10, yPct: 52 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          // 3 beats × 100vh + 1 hold beat = 400vh total
          // This ensures card 3 is held long before footer appears
          end: "+=400%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // ── Beat 0→1: marker left-peak → trough, card 1→2 ──
      tl.to(markerProxy, {
        x: 50, yPct: 72,
        duration: 1,
        ease: "power1.inOut",
        onUpdate: () => {
          if (marker) {
            marker.style.left = `${markerProxy.x}%`;
            marker.style.top  = `${markerProxy.yPct}%`;
          }
        },
      }, 0);

      // ── Beat 1→2: marker trough → right-peak, card 2→3 ──
      tl.to(markerProxy, {
        x: 88, yPct: 52,
        duration: 1,
        ease: "power1.inOut",
        onUpdate: () => {
          if (marker) {
            marker.style.left = `${markerProxy.x}%`;
            marker.style.top  = `${markerProxy.yPct}%`;
          }
        },
      }, 1);

      // Number bubble: 1→2 at beat 0.85
      tl.to({ n: 1 }, {
        n: 2, duration: 0.01,
        onUpdate() { if (markerNumRef.current) markerNumRef.current.textContent = "2"; },
      }, 0.85);

      // Number bubble: 2→3 at beat 1.85
      tl.to({ n: 2 }, {
        n: 3, duration: 0.01,
        onUpdate() { if (markerNumRef.current) markerNumRef.current.textContent = "3"; },
      }, 1.85);

      // Card 1 out / Card 2 in
      tl.to(cardRefs.current[0], { opacity: 0, y: -30, duration: 0.4, ease: "power2.in" }, 0.45);
      tl.to(cardRefs.current[1], {
        opacity: 1, y: 0, duration: 0.4, ease: "power2.out",
        onStart: () => setActiveIndex(1),
      }, 0.52);

      // Card 2 out / Card 3 in
      tl.to(cardRefs.current[1], { opacity: 0, y: -30, duration: 0.4, ease: "power2.in" }, 1.45);
      tl.to(cardRefs.current[2], {
        opacity: 1, y: 0, duration: 0.4, ease: "power2.out",
        onStart: () => setActiveIndex(2),
      }, 1.52);

      // ── Beat 2→4: Hold card 3 visible — 2 full viewport-heights before unpin ──
      // This prevents footer from appearing until user has seen card 3
      tl.set({}, {}, 4.0);

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      {/* Heading */}
      <div className="absolute top-[5vh] left-0 right-0 flex flex-col items-center z-10 select-none">
        <h2
          className="font-black text-center leading-none"
          style={{
            fontSize: "clamp(2rem, 4.5vw, 5.5rem)",
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

      {/* Sine wave SVG strip — positioned in lower-middle area */}
      <div
        className="absolute w-full pointer-events-none"
        style={{ top: "38vh", zIndex: 1 }}
      >
        <svg
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: "160px", overflow: "visible" }}
        >
          <defs>
            <filter id="nb2" x="-20%" y="-80%" width="140%" height="260%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b1" />
              <feColorMatrix in="b1" type="matrix"
                values="0 0 0 0 0.23  0 0 0 0 0.51  0 0 0 0 0.96  0 0 0 1 0"
                result="blue"
              />
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="b2" />
              <feMerge>
                <feMergeNode in="blue" />
                <feMergeNode in="b2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Glow layer */}
          <path
            d="M0 100 C150 100 200 20 300 20 C400 20 450 180 600 180 C750 180 800 20 900 20 C1000 20 1050 180 1200 100"
            fill="none" stroke="#3b82f6" strokeWidth="16" opacity="0.09" strokeLinecap="round"
          />
          {/* Neon line */}
          <path
            d="M0 100 C150 100 200 20 300 20 C400 20 450 180 600 180 C750 180 800 20 900 20 C1000 20 1050 180 1200 100"
            fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"
            filter="url(#nb2)"
          />
        </svg>
      </div>

      {/* Floating marker — sits ON the wave */}
      <div
        ref={markerRef}
        className="absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: 48, height: 48 }}
      >
        <div className="absolute inset-0 rounded-full" style={{ background: "#3b82f6", filter: "blur(14px)", opacity: 0.4 }} />
        <div className="absolute inset-0 rounded-full flex items-center justify-center" style={{ background: "#3b82f6", boxShadow: "0 0 0 3px rgba(59,130,246,0.35)" }}>
          <span ref={markerNumRef} className="text-white font-black text-sm select-none">1</span>
        </div>
      </div>

      {/* Cards — centred below the wave */}
      <div
        className="absolute"
        style={{
          top: "54vh",
          left: 0,
          right: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          height: "clamp(340px, 38vh, 400px)",
        }}
      >
        {APPS.map((app, i) => (
          <div
            key={app.title}
            ref={(el) => { cardRefs.current[i] = el; }}
            style={{ position: "absolute" }}
          >
            <AppCard app={app} active={activeIndex === i} />
          </div>
        ))}
      </div>
    </section>
  );
}
