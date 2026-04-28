"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterARef = useRef<HTMLSpanElement>(null);
  const suryRef = useRef<HTMLSpanElement>(null);
  const peddishettiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // "A" walks in from the left
    tl.fromTo(letterARef.current, 
      { x: -200, opacity: 0, rotateY: 90 }, 
      { x: 0, opacity: 1, rotateY: 0, duration: 1.5, ease: "power3.out" }
    )
    // "SURY" fades in behind it
    .fromTo(suryRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
      "-=0.5"
    )
    // "Peddishetti" rises up elegantly
    .fromTo(peddishettiRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "back.out(1.7)" },
      "-=0.2"
    );
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center bg-black">
      <div className="relative flex flex-col items-center">
        {/* Peddishetti (Rising text) */}
        <div ref={peddishettiRef} className="absolute -top-10 text-white/80 text-2xl tracking-[0.3em] uppercase font-light">
          Peddishetti
        </div>
        
        {/* SURYA (Main Text) */}
        <div className="flex items-center text-7xl md:text-9xl font-bold tracking-widest text-white">
          <span ref={suryRef}>SURY</span>
          <span ref={letterARef} className="inline-block origin-bottom">A</span>
        </div>
      </div>
    </section>
  );
}

