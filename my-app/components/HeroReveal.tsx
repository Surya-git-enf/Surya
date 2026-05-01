"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

/*
  HeroReveal — Cosmic Orange Edition
  ─────────────────────────────────────────────
  TOP ROW:  "PEDDISHETTI"  — all cosmic orange, rises in LAST
  BOT ROW:  "S  U  R  Y  A" — all cosmic orange, letters appear sequentially

  Walking stick figure (orange + glow):
    1. Appears as | at far left
    2. Sprouts legs (back + front)
    3. Legs oscillate cleanly while body translates smoothly right (ease:none = no drag)
    4. Letters S U R Y appear behind it one by one
    5. Stops → rotateY flip → crossbar → becomes "A"
    6. PEDDISHETTI rises in from below
*/

const ORANGE = "#ea580c";
const LETTERS = ["S", "U", "R", "Y"];

export default function HeroReveal() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const charWrapRef = useRef<HTMLDivElement>(null);
  const charFlipRef = useRef<HTMLDivElement>(null);
  const backLegRef  = useRef<SVGLineElement>(null);
  const frontLegRef = useRef<SVGLineElement>(null);
  const crossbarRef = useRef<SVGLineElement>(null);
  const letterRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const aLetterRef  = useRef<HTMLSpanElement>(null);
  const topWordRef  = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(backLegRef.current,  { opacity: 0 });
      gsap.set(frontLegRef.current, { opacity: 0 });
      gsap.set(crossbarRef.current, { opacity: 0 });
      gsap.set(letterRefs.current,  { opacity: 0, y: 18 });
      gsap.set(aLetterRef.current,  { opacity: 0 });
      gsap.set(topWordRef.current,  { opacity: 0, y: 30 });
      gsap.set(charWrapRef.current, { x: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // 1 — sprout back leg
      tl.to(backLegRef.current,  { opacity: 1, duration: 0.2 });
      // 2 — sprout front leg
      tl.to(frontLegRef.current, { opacity: 1, duration: 0.2 });

      // 3 — WALK: pure linear translate so there is zero ease-drag feel
      tl.to(charWrapRef.current, { x: "78vw", duration: 2.4, ease: "none" }, "+=0.1");

      // 4 — leg oscillation PARALLEL to walk (back leg)
      tl.to(backLegRef.current, {
        attr: { x2: "10", y2: "108" },
        duration: 0.22,
        repeat: 10,
        yoyo: true,
        ease: "power1.inOut",
      }, "<");

      // front leg opposite phase
      tl.to(frontLegRef.current, {
        attr: { x2: "50", y2: "108" },
        duration: 0.22,
        repeat: 10,
        yoyo: true,
        ease: "power1.inOut",
        delay: 0.11,
      }, "<");

      // 5 — letters S U R Y fade in sequentially during walk
      const WALK_START = 3; // tl position where walk starts (approx)
      LETTERS.forEach((_, i) => {
        tl.to(
          letterRefs.current[i],
          { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" },
          // spread across the ~2.4s walk window
          `<+=${(i * 0.55) + 0.15}`
        );
      });

      // 6 — close legs
      tl.to([backLegRef.current, frontLegRef.current], {
        attr: { x2: "30", y2: "108" },
        duration: 0.2,
        ease: "power2.inOut",
      }, "+=0.05");

      // 7 — flip
      tl.to(charFlipRef.current, {
        rotateY: 180,
        duration: 0.5,
        ease: "power3.inOut",
      }, "+=0.12");

      // 8 — crossbar
      tl.to(crossbarRef.current, { opacity: 1, duration: 0.2 }, "-=0.08");

      // 9 — show static A, hide svg char
      tl.to(aLetterRef.current,  { opacity: 1, duration: 0.25 }, "-=0.05");
      tl.to(charWrapRef.current, { opacity: 0, duration: 0.15 }, "-=0.05");

      // 10 — PEDDISHETTI rises
      tl.to(topWordRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "+=0.1");

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col items-center justify-center bg-white overflow-hidden select-none"
      style={{ minHeight: "100vh" }}
    >
      {/* Ambient orange glow pool */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 65%, ${ORANGE}14 0%, transparent 70%)`,
        }}
      />

      {/* Noise grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px",
        }}
      />

      <div className="relative z-10 flex flex-col items-stretch w-full px-[5vw]">

        {/* TOP ROW — PEDDISHETTI (cosmic orange, rises in last) */}
        <div
          ref={topWordRef}
          className="flex justify-between items-baseline w-full"
          aria-label="PEDDISHETTI"
        >
          {"PEDDISHETTI".split("").map((ch, i) => (
            <span
              key={i}
              className="font-black leading-none"
              style={{
                fontSize: "clamp(2.4rem, 5.8vw, 7rem)",
                color: ORANGE,
                textShadow: `0 0 80px ${ORANGE}55`,
              }}
            >
              {ch}
            </span>
          ))}
        </div>

        {/* BOTTOM ROW — S U R Y [A], all cosmic orange */}
        <div className="relative flex justify-between items-baseline w-full mt-2">

          {LETTERS.map((ch, i) => (
            <span
              key={ch}
              ref={(el) => { letterRefs.current[i] = el; }}
              className="font-black leading-none"
              style={{
                fontSize: "clamp(1.5rem, 3.6vw, 4.4rem)",
                color: ORANGE,
                textShadow: `0 0 40px ${ORANGE}55`,
              }}
            >
              {ch}
            </span>
          ))}

          {/* Static "A" — appears after flip */}
          <span
            ref={aLetterRef}
            className="font-black leading-none"
            style={{
              fontSize: "clamp(1.5rem, 3.6vw, 4.4rem)",
              color: ORANGE,
              textShadow: `0 0 60px ${ORANGE}99, 0 0 20px ${ORANGE}77`,
            }}
          >
            A
          </span>
        </div>
      </div>

      {/* ── Walking Stick Figure ── */}
      <div
        ref={charWrapRef}
        className="absolute"
        style={{
          bottom: "calc(50% - clamp(1.5rem, 3.6vw, 4.4rem) * 0.85)",
          left: "5vw",
          zIndex: 20,
          transformStyle: "preserve-3d",
          perspective: "700px",
          willChange: "transform",
        }}
      >
        <div ref={charFlipRef} style={{ transformStyle: "preserve-3d" }}>
          <svg
            viewBox="0 0 60 130"
            overflow="visible"
            style={{ width: "clamp(22px, 2.8vw, 44px)", height: "auto", display: "block" }}
          >
            <defs>
              <filter id="oglow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="b" />
                <feColorMatrix
                  in="b" type="matrix"
                  values="1.3 0.4 0 0 0  0.4 0.1 0 0 0  0 0 0 0 0  0 0 0 1.5 0"
                  result="o"
                />
                <feMerge>
                  <feMergeNode in="o" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g filter="url(#oglow)" stroke={ORANGE} strokeLinecap="round" fill="none">
              {/* Head */}
              <circle cx="30" cy="11" r="7" strokeWidth="5" fill={ORANGE} fillOpacity="0.15" />

              {/* Spine / torso */}
              <line x1="30" y1="18" x2="30" y2="75" strokeWidth="5" />

              {/* Arms */}
              <line x1="30" y1="40" x2="9"  y2="58" strokeWidth="4" />
              <line x1="30" y1="40" x2="51" y2="58" strokeWidth="4" />

              {/* Back leg */}
              <line
                ref={backLegRef}
                x1="30" y1="75"
                x2="14" y2="115"
                strokeWidth="5"
              />

              {/* Front leg */}
              <line
                ref={frontLegRef}
                x1="30" y1="75"
                x2="46" y2="115"
                strokeWidth="5"
              />

              {/* Crossbar (A crossbar, hidden until end) */}
              <line
                ref={crossbarRef}
                x1="13" y1="62"
                x2="47" y2="62"
                strokeWidth="5"
              />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
