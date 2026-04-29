
"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const suryRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const peddishettiRef = useRef<HTMLDivElement>(null);
  
  // SVG 'A' Refs for the walking cycle
  const letterAContainer = useRef<HTMLDivElement>(null);
  const leftLeg = useRef<SVGPathElement>(null);
  const rightLeg = useRef<SVGPathElement>(null);
  const crossBar = useRef<SVGPathElement>(null);

  useEffect(() => {
    // 1. The Walking Cycle (The legs swing back and forth)
    const walkCycle = gsap.timeline({ repeat: -1, yoyo: true });
    
    // We pivot the legs from the top point of the 'A' (x: 50, y: 10)
    walkCycle.to(leftLeg.current, { 
      rotationZ: 25, transformOrigin: "50px 10px", duration: 0.35, ease: "sine.inOut" 
    }, 0);
    walkCycle.to(rightLeg.current, { 
      rotationZ: -25, transformOrigin: "50px 10px", duration: 0.35, ease: "sine.inOut" 
    }, 0);
    // Move the whole 'A' up and down slightly to simulate taking steps
    walkCycle.to(letterAContainer.current, {
      y: -15, duration: 0.35, ease: "sine.inOut"
    }, 0);

    // 2. The Main Reveal Timeline
    const mainTl = gsap.timeline();

    // The 'A' translates from the far left of the screen into its final position
    mainTl.fromTo(letterAContainer.current, 
      { x: "-60vw" }, 
      { 
        x: "0vw", 
        duration: 2.5, 
        ease: "power2.inOut",
        onComplete: () => {
          // When it reaches the end, stop the walk cycle and snap the legs back to a perfect 'A'
          walkCycle.kill();
          gsap.to([leftLeg.current, rightLeg.current], { 
            rotationZ: 0, duration: 0.3, ease: "back.out(2)" 
          });
          gsap.to(letterAContainer.current, { 
            y: 0, duration: 0.3, ease: "back.out(2)" 
          });
          // Fade in the crossbar of the 'A' once it stops
          gsap.to(crossBar.current, { opacity: 1, duration: 0.3 });
        }
      }
    );

    // Stagger fade-in the S-U-R-Y behind the 'A' as it walks past them
    mainTl.fromTo(suryRefs.current, 
      { opacity: 0, x: -30 }, 
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.45, ease: "power2.out" }, 
      "-=2.2" // Start this while the 'A' is still walking
    );

    // Finally, Peddishetti rises cleanly above SURYA
    mainTl.fromTo(peddishettiRef.current,
      { y: 40, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" },
      "-=0.2"
    );

  }, []);

  const suryLetters = ["S", "U", "R", "Y"];

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      {/* Background Cosmic Orange Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        
        {/* FIRST NAME: Small, elegant, widely tracked, sitting purely above */}
        <div 
          ref={peddishettiRef} 
          className="mb-4 text-orange-200 text-xl md:text-[2vw] tracking-[0.6em] uppercase font-medium opacity-0 drop-shadow-[0_0_10px_rgba(251,146,60,0.8)]"
        >
          Peddishetti
        </div>
        
        {/* LAST NAME CONTAINER: Massive, Cosmic Orange */}
        <div className="flex items-center text-[18vw] font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-orange-600 drop-shadow-[0_0_25px_rgba(234,88,12,0.6)]">
          
          {/* HTML Letters: S U R Y */}
          {suryLetters.map((letter, index) => (
            <span 
              key={index}
              ref={(el) => { suryRefs.current[index] = el; }}
              className="inline-block opacity-0"
            >
              {letter}
            </span>
          ))}

          {/* SVG Letter: The Walking 'A' */}
          <div ref={letterAContainer} className="relative inline-flex items-center justify-center h-[1em] w-[0.8em]">
            <svg 
              viewBox="0 0 100 100" 
              className="absolute w-full h-full overflow-visible drop-shadow-[0_0_20px_rgba(234,88,12,0.8)]"
              style={{ stroke: "url(#orangeGradient)", strokeWidth: "14", strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}
            >
              <defs>
                <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fb923c" /> {/* Tailwind orange-400 */}
                  <stop offset="100%" stopColor="#ea580c" /> {/* Tailwind orange-600 */}
                </linearGradient>
              </defs>
              
              {/* Left Leg */}
              <path ref={leftLeg} d="M 50 10 L 20 90" />
              {/* Right Leg */}
              <path ref={rightLeg} d="M 50 10 L 80 90" />
              {/* Crossbar (Hidden while walking, fades in at the end) */}
              <path ref={crossBar} d="M 32 60 L 68 60" style={{ opacity: 0 }} />
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}
