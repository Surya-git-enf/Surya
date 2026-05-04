
"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const ORANGE = "#ea580c";
const LETTERS = ["S", "U", "R", "Y"];

export default function HeroReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const charWrapRef = useRef<HTMLDivElement>(null);
  const backLegRef = useRef<SVGLineElement>(null);
  const frontLegRef = useRef<SVGLineElement>(null);
  const crossbarRef = useRef<SVGLineElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const aLetterRef = useRef<HTMLSpanElement>(null);
  const topLetterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Hide everything immediately before any paint
      gsap.set(backLegRef.current, { opacity: 0, attr: { x2: 30, y2: 115 } });
      gsap.set(frontLegRef.current, { opacity: 0, attr: { x2: 30, y2: 115 } });
      gsap.set(crossbarRef.current, { opacity: 0 });
      gsap.set(letterRefs.current, { opacity: 0, y: 20 });
      gsap.set(aLetterRef.current, { opacity: 0 });
      gsap.set(topLetterRefs.current, { opacity: 0, y: 30 });

      // Start the character off the LEFT edge of the screen
      gsap.set(charWrapRef.current, { left: "0%", xPercent: 0 });

      const tl = gsap.timeline({ delay: 0.1 });

      // Legs appear
      tl.to([backLegRef.current, frontLegRef.current], {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      tl.addLabel("walkStart", "+=0.1");

      const walkDuration = 3.2;

      // Walk from left (0%) to right (100%)
      tl.to(
        charWrapRef.current,
        {
          left: "100%",
          xPercent: -100,
          duration: walkDuration,
          ease: "none",
        },
        "walkStart"
      );

      // Leg swing animation
      tl.to(
        backLegRef.current,
        {
          attr: { x2: "12", y2: "110" },
          duration: 0.26,
          repeat: 11,
          yoyo: true,
          ease: "sine.inOut",
        },
        "walkStart"
      );

      tl.to(
        frontLegRef.current,
        {
          attr: { x2: "48", y2: "110" },
          duration: 0.26,
          repeat: 11,
          yoyo: true,
          ease: "sine.inOut",
        },
        "walkStart"
      );

      // S, U, R, Y reveal as figure walks past
      LETTERS.forEach((_, i) => {
        tl.to(
          letterRefs.current[i],
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          `walkStart+=${i * 0.7 + 0.3}`
        );
      });

      // PEDDISHETTI reveal
      tl.to(
        topLetterRefs.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.05,
          ease: "power3.out",
        },
        "walkStart+=2.0"
      );

      // Figure slows/stops — legs settle
      tl.to(
        backLegRef.current,
        {
          attr: { x2: "15", y2: "115" },
          duration: 0.3,
          ease: "power2.out",
        },
        "walkStart+=3.15"
      );

      tl.to(
        frontLegRef.current,
        {
          attr: { x2: "45", y2: "115" },
          duration: 0.3,
          ease: "power2.out",
        },
        "walkStart+=3.15"
      );

      // Crossbar appears — turns into the letter A
      tl.to(
        crossbarRef.current,
        {
          opacity: 1,
          duration: 0.3,
        },
        "walkStart+=3.3"
      );

      // The standalone "A" letter fades in where the figure was
      tl.to(
        aLetterRef.current,
        {
          opacity: 1,
          duration: 0.4,
        },
        "walkStart+=3.5"
      );

      // Figure fades out, leaving only the A
      tl.to(
        charWrapRef.current,
        {
          opacity: 0,
          duration: 0.3,
        },
        "walkStart+=3.5"
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
      {/* Radial glow background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 65%, ${ORANGE}14 0%, transparent 70%)`,
        }}
      />
      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: "180px",
        }}
      />

      <div className="relative z-10 flex flex-col items-stretch w-full px-[5vw]">
        {/* Top row: PEDDISHETTI — hidden until animation reveals */}
        <div
          className="flex justify-between items-baseline w-full"
          aria-label="PEDDISHETTI"
          style={{ visibility: "visible" }}
        >
          {"PEDDISHETTI".split("").map((ch, i) => (
            <span
              key={i}
              ref={(el) => {
                topLetterRefs.current[i] = el;
              }}
              className="font-black leading-none inline-block"
              style={{
                fontSize: "clamp(2.4rem, 5.8vw, 7rem)",
                color: ORANGE,
                textShadow: `0 0 80px ${ORANGE}55`,
                // Pre-hidden via GSAP set; this prevents SSR flash
                opacity: 0,
              }}
            >
              {ch}
            </span>
          ))}
        </div>

        {/* Bottom row: S U R Y  [walking figure]  A */}
        <div
          className="relative flex justify-between items-baseline w-full mt-2"
          style={{ fontSize: "clamp(1.5rem, 3.6vw, 4.4rem)" }}
        >
          {LETTERS.map((ch, i) => (
            <span
              key={ch}
              ref={(el) => {
                letterRefs.current[i] = el;
              }}
              className="font-black leading-none inline-block"
              style={{
                color: ORANGE,
                textShadow: `0 0 40px ${ORANGE}55`,
                // Pre-hidden to prevent flash
                opacity: 0,
              }}
            >
              {ch}
            </span>
          ))}

          {/* The final "A" that the figure morphs into */}
          <span
            ref={aLetterRef}
            className="font-black leading-none inline-block"
            style={{
              color: ORANGE,
              textShadow: `0 0 60px ${ORANGE}99, 0 0 20px ${ORANGE}77`,
              opacity: 0,
            }}
          >
            A
          </span>

          {/* Walking stick figure — absolutely positioned, travels left→right */}
          <div
            ref={charWrapRef}
            className="absolute flex justify-center pointer-events-none"
            style={{
              bottom: "-0.05em",
              height: "1.1em",
              zIndex: 20,
              // Start at the very left edge
              left: "0%",
              xPercent: 0,
            }}
          >
            <div style={{ transformStyle: "preserve-3d", height: "100%" }}>
              <svg
                viewBox="0 0 60 130"
                overflow="visible"
                style={{ height: "100%", width: "auto", display: "block" }}
              >
                <defs>
                  <filter id="oglow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="b" />
                    <feColorMatrix
                      in="b"
                      type="matrix"
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
                  {/* Back leg */}
                  <line ref={backLegRef} x1="30" y1="20" x2="30" y2="115" strokeWidth="6" />
                  {/* Front leg */}
                  <line ref={frontLegRef} x1="30" y1="20" x2="30" y2="115" strokeWidth="6" />
                  {/* Crossbar — appears at end to form the letter A */}
                  <line ref={crossbarRef} x1="20" y1="75" x2="40" y2="75" strokeWidth="6" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
          }
          
