"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroReveal() {
  const containerRef = useRef<HTMLElement | null>(null);
  const peddishettiRef = useRef<HTMLDivElement | null>(null);
  const suryRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const letterARef = useRef<HTMLDivElement | null>(null);
  const leftLegRef = useRef<SVGPathElement | null>(null);
  const rightLegRef = useRef<SVGPathElement | null>(null);
  const crossbarRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const legs = [leftLegRef.current, rightLegRef.current].filter(
        Boolean
      ) as SVGPathElement[];

      if (!letterARef.current || !peddishettiRef.current || legs.length < 2) return;

      const walkCycle = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } });

      walkCycle.to(
        leftLegRef.current,
        {
          rotation: 22,
          duration: 0.28,
          transformOrigin: "50% 50%",
        },
        0
      );

      walkCycle.to(
        rightLegRef.current,
        {
          rotation: -22,
          duration: 0.28,
          transformOrigin: "50% 50%",
        },
        0
      );

      walkCycle.to(
        letterARef.current,
        {
          y: -2,
          duration: 0.28,
          ease: "sine.inOut",
        },
        0
      );

      const mainTl = gsap.timeline();

      gsap.set(letterARef.current, {
        x: "-58vw",
        opacity: 1,
      });

      gsap.set([leftLegRef.current, rightLegRef.current, crossbarRef.current], {
        transformOrigin: "50% 50%",
      });

      mainTl.to(letterARef.current, {
        x: 0,
        duration: 3,
        ease: "power2.inOut",
        onComplete: () => {
          walkCycle.kill();

          gsap.to([leftLegRef.current, rightLegRef.current], {
            rotation: 0,
            duration: 0.35,
            ease: "back.out(2)",
          });

          gsap.to(crossbarRef.current, {
            opacity: 1,
            scaleX: 1,
            duration: 0.45,
            ease: "power2.out",
          });
        },
      });

      mainTl.to(
        suryRefs.current.filter(Boolean),
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
        },
        "-=2.2"
      );

      mainTl.to(
        peddishettiRef.current,
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
        },
        "-=0.7"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const suryLetters = ["S", "U", "R", "Y"];

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black"
      style={{ perspective: "1200px" }}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[50vw] w-[50vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-600/10 blur-[120px]" />

      <div className="relative z-10 flex w-full flex-col items-center justify-center">
        <div
          ref={peddishettiRef}
          className="mb-[-1vw] text-sm font-light uppercase tracking-[0.6em] text-orange-200 opacity-0 md:text-[2.2vw]"
          style={{ transform: "translateY(24px)", filter: "blur(10px)" }}
        >
          Peddishetti
        </div>

        <div className="flex items-center text-[18vw] font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-orange-600 drop-shadow-[0_0_25px_rgba(234,88,12,0.6)]">
          {suryLetters.map((letter, index) => (
            <span
              key={letter}
              ref={(el) => {
                suryRefs.current[index] = el;
              }}
              className="inline-block opacity-0"
              style={{ transform: "translateX(-30px)", filter: "blur(8px)" }}
            >
              {letter}
            </span>
          ))}

          <div
            ref={letterARef}
            className="relative inline-flex h-[1em] w-[0.8em] items-center justify-center [transform-style:preserve-3d]"
            style={{ opacity: 0 }}
          >
            <svg
              viewBox="0 0 100 100"
              className="absolute h-full w-full overflow-visible drop-shadow-[0_0_20px_rgba(234,88,12,0.8)]"
              style={{
                stroke: "url(#orangeGradient)",
                strokeWidth: 14,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                fill: "none",
              }}
            >
              <defs>
                <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fb923c" />
                  <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>
              </defs>

              <path
                ref={leftLegRef}
                d="M50 10 L20 90"
                style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              />
              <path
                ref={rightLegRef}
                d="M50 10 L80 90"
                style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              />
              <path
                ref={crossbarRef}
                d="M32 60 L68 60"
                opacity={0}
                scale={1}
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "50% 50%",
                }}
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
