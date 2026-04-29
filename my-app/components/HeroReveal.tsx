
"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const suryRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const peddishettiRef = useRef<HTMLDivElement>(null);
  
  // SVG 'A' Refs for the walking and turning cycle
  const letterAContainer = useRef<HTMLDivElement>(null);
  const leftLeg = useRef<SVGPathElement>(null);
  const rightLeg = useRef<SVGPathElement>(null);

  useEffect(() => {
    // 1. Walking Character Cycle (Character is faced right, no crossbar)
    const walkCycle = gsap.timeline({ repeat: -1, yoyo: true });
    
    // Character looks like '/ \' in profile, walking right.
    walkCycle.to(leftLeg.current, { 
      rotationZ: 25, transformOrigin: "50px 10px", duration: 0.3, ease: "sine.inOut" 
    }, 0);
    walkCycle.to(rightLeg.current, { 
      rotationZ: -25, transformOrigin: "50px 10px", duration: 0.3, ease: "sine.inOut" 
    }, 0);

    // 2. Main Revelation Timeline
    const mainTl = gsap.timeline();

    // The character '/ \' walks right across the screen
    mainTl.fromTo(letterAContainer.current, 
      { x: "-60vw" }, 
      { 
        x: "0vw", 
        duration: 3, 
        ease: "power2.inOut",
        onComplete: () => {
          // When it reaches the end, stop the walk and trigger the spin
          walkCycle.kill();
          gsap.to([leftLeg.current, rightLeg.current], { 
            rotationZ: 0, duration: 0.4, ease: "back.out(2)" 
          });
          
          // 3D flip towards user to reveal full 'A' (crossbar is now present)
          gsap.to(letterAContainer.current, { 
            rotateY: 180, duration: 1, ease: "cubic-bezier(0.16,1,0.3,1)" 
          });
        }
      }
    );

    // Fade in S-U-R-Y sequentially behind the walking '/ \'
    mainTl.fromTo(suryRefs.current, 
      { opacity: 0, x: -30 }, 
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.6, ease: "power2.out" }, 
      "-=2.5" // Start while walking
    );

    // Finally, the names Peddishetti (smaller) and Surya rise above
    mainTl.fromTo([peddishettiRef.current],
      { y: 40, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" },
      "+=1" // Start after A finishes its turn
    );

  }, []);

  const suryLetters = ["S", "U", "R", "Y"];

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden perspective-1200"
    >
      {/* Background Cosmic Orange Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        
        {/* NAMES: Peddishetti is small, wide track, sitting purely above */}
        <div ref={peddishettiRef} className="mb-[-1vw] text-orange-200 text-sm md:text-[2.2vw] tracking-[0.6em] uppercase font-light opacity-0">
          Peddishetti
        </div>
        
        {/* LAST NAME CONTAINER: Massive, Cosmic Orange */}
        <div className="flex items-center text-[18vw] font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-orange-600 drop-shadow-[0_0_25px_rgba(234,88,12,0.6)]">
          
          {/* HTML Letters: S U R Y */}
          {suryLetters.map((letter, index) => (
            <span key={index} ref={(el) => { suryRefs.current[index] = el; }} className="inline-block opacity-0">
              {letter}
            </span>
          ))}

          {/* SVG Letter: The Walking 'A' (Faced right, turn cycle) */}
          <div ref={letterAContainer} className="relative inline-flex items-center justify-center h-[1em] w-[0.8em] preserve-3d">
            <svg viewBox="0 0 100 100" className="absolute w-full h-full overflow-visible drop-shadow-[0_0_20px_rgba(234,88,12,0.8)]" style={{ stroke: "url(#orangeGradient)", strokeWidth: "14", strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
              <defs>
                <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fb923c" /> {/* Tailwind orange-400 */}
                  <stop offset="100%" stopColor="#ea580c" /> {/* Tailwind orange-600 */}
                </linearGradient>
              </defs>
              
              {/* Handcrafted Legs for walking cycle */}
              <path ref={leftLeg} d="M 50 10 L 20 90" />
              <path ref={rightLeg} d="M 50 10 L 80 90" />
              {/* The crossbar is present in the SVG but hidden/back-facing, will reveal on turn */}
              <path d="M 32 60 L 68 60" style={{ [flippedCards[app.id] ? '[backface-visibility:visible]' : '[backface-visibility:hidden]'] }} />
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}
