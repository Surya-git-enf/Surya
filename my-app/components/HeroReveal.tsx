
"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

const ORANGE = "#ea580c";
const LETTERS = ["S", "U", "R", "Y"];

export default function HeroReveal() {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const charWrapRef   = useRef<HTMLDivElement>(null);
  const backLegRef    = useRef<SVGLineElement>(null);
  const frontLegRef   = useRef<SVGLineElement>(null);
  const crossbarRef   = useRef<SVGLineElement>(null);
  const letterRefs    = useRef<(HTMLSpanElement | null)[]>([]);
  const aLetterRef    = useRef<HTMLSpanElement>(null);
  const topLetterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // ── Initial states ──
      gsap.set(backLegRef.current,  { opacity: 0, attr: { x2: 30, y2: 115 } });
      gsap.set(frontLegRef.current, { opacity: 0, attr: { x2: 30, y2: 115 } });
      gsap.set(crossbarRef.current, { opacity: 0 });
      gsap.set(letterRefs.current,  { opacity: 0, y: 20 });
      gsap.set(aLetterRef.current,  { opacity: 0 });
      gsap.set(topLetterRefs.current, { opacity: 0, y: 30 }); // Start lower for a smoother rise
      gsap.set(charWrapRef.current, { left: "0%", xPercent: 0 });

      const tl = gsap.timeline();

      // 1 — Sprout legs (start from vertical line)
      tl.to([backLegRef.current, frontLegRef.current], { 
        opacity: 1, 
        duration: 0.4, 
        ease: "power2.out" 
      });

      // Add a label to synchronize the walking components
      tl.addLabel("walkStart", "+=0.1");

      // 2 — WALK: translate completely to the right edge smoothly
      const walkDuration = 3.2; 
      tl.to(charWrapRef.current, { 
        left: "100%", 
        xPercent: -100, 
        duration: walkDuration, 
        ease: "none" // Linear ease ensures no "ice skating" slip
      }, "walkStart");

      // 3 — Perfect Leg Oscillation (Scissor motion synced to walk duration)
      // Duration of 0.26 * 12 swings = 3.12s (perfectly matches the walk phase)
      tl.to(backLegRef.current, {
        attr: { x2: "12", y2: "110" },
        duration: 0.26,
        repeat: 11,
        yoyo: true,
        ease: "sine.inOut",
      }, "walkStart");
      
      tl.to(frontLegRef.current, {
        attr: { x2: "48", y2: "110" },
        duration: 0.26,
        repeat: 11,
        yoyo: true,
        ease: "sine.inOut",
      }, "walkStart");

      // 4 — Letters S U R Y fade in sequentially as the walker passes
      LETTERS.forEach((_, i) => {
        tl.to(
          letterRefs.current[i],
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          `walkStart+=${(i * 0.7) + 0.3}` // Spaced out perfectly across the walk
        );
      });

      // 5 — "PEDDISHETTI" rises slowly in a staggered wave *while* the walk finishes
      tl.to(topLetterRefs.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.05, // Creates the beautiful wave effect
        ease: "power3.out",
      }, "walkStart+=2.0"); // Starts rising as the walker hits the 'Y'

      // 6 — Form the 'A' stance smoothly at the very end of the walk
      tl.to(backLegRef.current, {
        attr: { x2: "15", y2: "115" },
        duration: 0.3,
        ease: "power2.out",
      }, "walkStart+=3.15");
      
      tl.to(frontLegRef.current, {
        attr: { x2: "45", y2: "115" },
        duration: 0.3,
        ease: "power2.out",
      }, "walkStart+=3.15");

      // 7 — Crossbar fades in to lock the 'A'
      tl.to(crossbarRef.current, { 
        opacity: 1, 
        duration: 0.3 
      }, "walkStart+=3.3");

      // 8 — Seamless switch to static A text
      tl.to(aLetterRef.current, { 
        opacity: 1, 
        duration: 0.4 
      }, "walkStart+=3.5");
      tl.to(charWrapRef.current, { 
        opacity: 0, 
        duration: 0.3 
      }, "walkStart+=3.5");

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col items-center justify-center bg-white overflow-hidden select-none"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(ellipse 80% 50% at 50% 65%, ${ORANGE}14 0%, transparent 70%)` }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px",
        }}
      />

      <div className="relative z-10 flex flex-col items-stretch w-full px-[5vw]">
        
        {/* TOP ROW — PEDDISHETTI (Now animating letter by letter) */}
        <div className="flex justify-between items-baseline w-full" aria-label="PEDDISHETTI">
          {"PEDDISHETTI".split("").map((ch, i) => (
            <span
              key={i}
              ref={(el) => { topLetterRefs.current[i] = el; }}
              className="font-black leading-none inline-block"
              style={{ fontSize: "clamp(2.4rem, 5.8vw, 7rem)", color: ORANGE, textShadow: `0 0 80px ${ORANGE}55` }}
            >
              {ch}
            </span>
          ))}
        </div>

        {/* BOTTOM ROW — S U R Y [A] + Walking Legs Container */}
        <div 
          className="relative flex justify-between items-baseline w-full mt-2"
          style={{ fontSize: "clamp(1.5rem, 3.6vw, 4.4rem)" }}
        >
          {LETTERS.map((ch, i) => (
            <span
              key={ch}
              ref={(el) => { letterRefs.current[i] = el; }}
              className="font-black leading-none inline-block"
              style={{ color: ORANGE, textShadow: `0 0 40px ${ORANGE}55` }}
            >
              {ch}
            </span>
          ))}

          {/* Static "A" */}
          <span
            ref={aLetterRef}
            className="font-black leading-none inline-block"
            style={{ color: ORANGE, textShadow: `0 0 60px ${ORANGE}99, 0 0 20px ${ORANGE}77` }}
          >
            A
          </span>

          {/* ── Walking Legs ── */}
          <div
            ref={charWrapRef}
            className="absolute flex justify-center pointer-events-none"
            style={{
              bottom: "-0.05em",
              height: "1.1em",
              zIndex: 20,
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
                    <feColorMatrix in="b" type="matrix" values="1.3 0.4 0 0 0  0.4 0.1 0 0 0  0 0 0 0 0  0 0 0 1.5 0" result="o" />
                    <feMerge>
                      <feMergeNode in="o" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <g filter="url(#oglow)" stroke={ORANGE} strokeLinecap="round" fill="none">
                  <line ref={backLegRef} x1="30" y1="20" x2="30" y2="115" strokeWidth="6" />
                  <line ref={frontLegRef} x1="30" y1="20" x2="30" y2="115" strokeWidth="6" />
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
