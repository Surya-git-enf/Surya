
"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

const ORANGE = "#ea580c";
const LETTERS = ["S", "U", "R", "Y"]; 

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
      // 1. Initial Hidden States
      gsap.set(legRef.current, { rotation: 0, transformOrigin: "top center", opacity: 0 });
      gsap.set(crossbarRef.current, { opacity: 0 });
      gsap.set(letterRefs.current, { opacity: 0, y: 30 });
      gsap.set(aLetterRef.current, { opacity: 0 });
      gsap.set(topWordRef.current, { opacity: 0, y: 40 });
      gsap.set(charGroupRef.current, { x: "2vw" });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // 2. Sprout the back leg
      tl.to(legRef.current, { opacity: 1, duration: 0.3 });

      // 3. Clean Walking Animation
      const walkDuration = 2.4;
      
      // Move the character across the screen
      tl.to(charGroupRef.current, { x: "82vw", duration: walkDuration, ease: "none" }, "walk");
      
      // Swing the leg back and forth like a real stride
      tl.to(legRef.current, { 
        rotation: 30, 
        duration: walkDuration / 7, 
        yoyo: true, 
        repeat: 7, 
        ease: "sine.inOut" 
      }, "walk");

      // 4. Letters S-U-R-Y pop in sequentially as it walks past
      LETTERS.forEach((_, i) => {
        tl.to(
          letterRefs.current[i],
          { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" },
          `walk+=${(walkDuration / 5) * (i + 1)}`
        );
      });

      // 5. Stop walking, rotate 3D, and morph into "A"
      tl.to(legRef.current, { rotation: 0, duration: 0.2 }, "walk+=2.4");
      tl.to(charInnerRef.current, { rotateY: 180, duration: 0.5, ease: "back.out(1.2)" });
      tl.to(crossbarRef.current, { opacity: 1, duration: 0.2 }, "-=0.2");
      
      // Swap SVG for the glowing text "A"
      tl.to(aLetterRef.current, { opacity: 1, duration: 0.2 }, "-=0.1");
      tl.to(charGroupRef.current, { opacity: 0, duration: 0.2 }, "-=0.1"); 

      // 6. "PEDDISHETTI" rises cleanly above it
      tl.to(topWordRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "+=0.1");

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full flex flex-col items-center justify-center bg-white overflow-hidden select-none" style={{ minHeight: "100vh" }}>
      <div className="relative z-10 flex flex-col items-stretch w-full px-[6vw] max-w-[1200px]">
        
        {/* TOP ROW: PEDDISHETTI */}
        <div ref={topWordRef} className="flex justify-between items-baseline w-full" style={{ letterSpacing: "-0.01em" }}>
          {"PEDDISHETTI".split("").map((ch, i) => (
            <span key={i} className="font-black leading-none" style={{ fontSize: "clamp(2.5rem, 6.5vw, 7.5rem)", color: ORANGE, textShadow: `0 0 25px ${ORANGE}44` }}>
              {ch}
            </span>
          ))}
        </div>

        {/* BOTTOM ROW: S U R Y A */}
        <div className="relative flex justify-between items-baseline w-full mt-2" style={{ letterSpacing: "-0.01em" }}>
          {LETTERS.map((ch, i) => (
            <span key={ch} ref={(el) => { letterRefs.current[i] = el; }} className="font-black leading-none" style={{ fontSize: "clamp(1.8rem, 4vw, 4.8rem)", color: ORANGE }}>
              {ch}
            </span>
          ))}
          {/* Static A (Hidden until the flip completes) */}
          <span ref={aLetterRef} className="font-black leading-none" style={{ fontSize: "clamp(1.8rem, 4vw, 4.8rem)", color: ORANGE, textShadow: `0 0 40px ${ORANGE}88` }}>
            A
          </span>
        </div>
      </div>

      {/* SVG WALKING CHARACTER */}
      <div ref={charGroupRef} className="absolute" style={{ bottom: "calc(50% - clamp(1.8rem, 4vw, 4.8rem) * 0.85)", left: 0, zIndex: 20, perspective: "600px" }}>
        <div ref={charInnerRef} style={{ transformStyle: "preserve-3d" }}>
          <svg width="clamp(28px, 3.5vw, 52px)" height="clamp(40px, 5vw, 72px)" viewBox="0 0 60 120" overflow="visible" style={{ backfaceVisibility: "visible" }}>
            <g style={{ filter: `drop-shadow(0px 0px 10px ${ORANGE})` }}>
              <line x1="30" y1="0" x2="30" y2="120" stroke={ORANGE} strokeWidth="8" strokeLinecap="round" />
              <line ref={legRef} x1="30" y1="60" x2="50" y2="120" stroke={ORANGE} strokeWidth="8" strokeLinecap="round" />
              <line ref={crossbarRef} x1="10" y1="70" x2="50" y2="70" stroke={ORANGE} strokeWidth="8" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
