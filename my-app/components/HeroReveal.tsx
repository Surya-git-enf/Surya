
"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

/* ────────────────────────────────────────────────────────────
   HeroReveal
   ─ Layout:  Two rows, same visual width
       TOP:   "PEDDISHETTI"  (large, fades in last)
       BOT:   "S U R Y A"   (letters fade in one by one)
   ─ Character:
       Starts as  |  (vertical stroke)
       Sprouts |\  (back leg)
       Walks right across the screen
       As it walks: S U R Y appear (A is the character itself)
       At end: rotateY 180° flip → crossbar appears → becomes "A"
       Then "PEDDISHETTI" rises in.
──────────────────────────────────────────────────────────── */

const ORANGE = "#ea580c";
const LETTERS = ["S", "U", "R", "Y"]; // "A" is the character

export default function HeroReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const charGroupRef = useRef<HTMLDivElement>(null);
  const legRef = useRef<SVGLineElement>(null);
  const crossbarRef = useRef<SVGLineElement>(null);
  const charInnerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const aLetterRef = useRef<HTMLSpanElement>(null);
  const topWordRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // ── Set initial states ──
      gsap.set(legRef.current, { attr: { x2: "50", y2: "120" }, opacity: 0 });
      gsap.set(crossbarRef.current, { opacity: 0 });
      gsap.set(letterRefs.current, { opacity: 0, y: 20 });
      gsap.set(aLetterRef.current, { opacity: 0 });
      gsap.set(topWordRef.current, { opacity: 0, y: 30 });
      gsap.set(charGroupRef.current, { x: "2vw" });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      /* 1 — Sprout back leg */
      tl.to(legRef.current, { opacity: 1, duration: 0.4 });

      /* 2 — Walk right: character travels ~82vw (leaves room for itself) */
      tl.to(
        charGroupRef.current,
        {
          x: "82vw",
          duration: 2.6,
          ease: "power1.inOut",
        },
        "+=0.2"
      );

      /* 3 — Letters S U R Y fade in sequentially while walking */
      LETTERS.forEach((_, i) => {
        tl.to(
          letterRefs.current[i],
          { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" },
          // spread them evenly across the walk duration
          `-=${2.6 - (i + 1) * (2.6 / (LETTERS.length + 1))}`
        );
      });

      /* 4 — Character flips (rotateY 180) revealing "A" face */
      tl.to(
        charInnerRef.current,
        {
          rotateY: 180,
          duration: 0.55,
          ease: "power3.inOut",
        }
      );

      /* 5 — Crossbar appears making | → A */
      tl.to(crossbarRef.current, { opacity: 1, duration: 0.25 }, "-=0.1");

      /* 6 — Show the static A letter, hide SVG char */
      tl.to(aLetterRef.current, { opacity: 1, duration: 0.3 }, "-=0.1");
      tl.to(charGroupRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");

      /* 7 — PEDDISHETTI rises in */
      tl.to(
        topWordRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "+=0.05"
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col items-center justify-center bg-white overflow-hidden select-none"
      style={{ minHeight: "100vh" }}
    >
      {/* Subtle grain overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "180px",
          opacity: 0.5,
        }}
      />

      <div className="relative z-10 flex flex-col items-stretch w-full px-[6vw]">
        {/* ── TOP ROW: PEDDISHETTI ── */}
        <div
          ref={topWordRef}
          className="flex justify-between items-baseline w-full"
          style={{ letterSpacing: "-0.01em" }}
          aria-label="PEDDISHETTI"
        >
          {"PEDDISHETTI".split("").map((ch, i) => (
            <span
              key={i}
              className="font-black text-gray-900 leading-none"
              style={{ fontSize: "clamp(2.8rem, 6.5vw, 7.5rem)" }}
            >
              {ch}
            </span>
          ))}
        </div>

        {/* ── BOTTOM ROW: S U R Y [A] ── */}
        <div
          className="relative flex justify-between items-baseline w-full mt-2"
          style={{ letterSpacing: "-0.01em" }}
        >
          {/* S U R Y — fade in during walk */}
          {LETTERS.map((ch, i) => (
            <span
              key={ch}
              ref={(el) => { letterRefs.current[i] = el; }}
              className="font-black text-gray-900 leading-none"
              style={{ fontSize: "clamp(1.8rem, 4vw, 4.8rem)" }}
            >
              {ch}
            </span>
          ))}

          {/* Static "A" — appears after flip */}
          <span
            ref={aLetterRef}
            className="font-black text-gray-900 leading-none"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 4.8rem)",
              color: ORANGE,
              textShadow: `0 0 40px ${ORANGE}88`,
            }}
          >
            A
          </span>
        </div>
      </div>

      {/* ── Walking Character (SVG) ── */}
      <div
        ref={charGroupRef}
        className="absolute"
        style={{
          bottom: "calc(50% - clamp(1.8rem, 4vw, 4.8rem) * 0.85)",
          left: 0,
          zIndex: 20,
          transformStyle: "preserve-3d",
          perspective: "600px",
        }}
      >
        {/* Inner flip div */}
        <div
          ref={charInnerRef}
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateY(0deg)",
          }}
        >
          <svg
            width="clamp(28px, 3.5vw, 52px)"
            height="clamp(40px, 5vw, 72px)"
            viewBox="0 0 60 120"
            overflow="visible"
            style={{ backfaceVisibility: "visible" }}
          >
            <defs>
              <filter id="orangeGlow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="1 0.4 0 0 0  0.5 0.2 0 0 0  0 0 0 0 0  0 0 0 1.2 0"
                  result="orange"
                />
                <feMerge>
                  <feMergeNode in="orange" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g filter="url(#orangeGlow)">
              {/* Vertical spine */}
              <line
                x1="30" y1="0"
                x2="30" y2="120"
                stroke={ORANGE}
                strokeWidth="7"
                strokeLinecap="round"
              />
              {/* Back leg (sprouts first) */}
              <line
                ref={legRef}
                x1="30" y1="80"
                x2="50" y2="120"
                stroke={ORANGE}
                strokeWidth="7"
                strokeLinecap="round"
              />
              {/* Crossbar — appears at end to form A */}
              <line
                ref={crossbarRef}
                x1="10" y1="70"
                x2="50" y2="70"
                stroke={ORANGE}
                strokeWidth="7"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>
      </div>

      {/* Ambient glow pool at bottom */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: "60vw",
          height: "30vh",
          background: `radial-gradient(ellipse at center bottom, ${ORANGE}18 0%, transparent 70%)`,
        }}
      />
    </section>
  );
      }
          
