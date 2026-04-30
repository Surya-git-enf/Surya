
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

function WalkingA() {
  return (
    <svg
      viewBox="0 0 160 200"
      className="h-[150px] w-[120px] drop-shadow-[0_0_28px_rgba(255,255,255,0.35)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g className="walk-body">
        <path
          d="M80 24C94 24 104 35 104 49C104 59 98 67 89 71V92C89 99 84 105 77 105C70 105 65 99 65 92V71C56 67 50 59 50 49C50 35 60 24 74 24H80Z"
          fill="rgba(255,255,255,0.96)"
        />
        <path d="M60 106L48 150" stroke="rgba(255,255,255,0.96)" strokeWidth="10" strokeLinecap="round" />
        <path d="M92 106L104 150" stroke="rgba(255,255,255,0.96)" strokeWidth="10" strokeLinecap="round" />
        <path d="M48 150L35 184" stroke="rgba(255,255,255,0.96)" strokeWidth="10" strokeLinecap="round" />
        <path d="M104 150L118 184" stroke="rgba(255,255,255,0.96)" strokeWidth="10" strokeLinecap="round" />
        <path d="M54 56C61 61 67 63 80 63C93 63 99 61 106 56" stroke="#000" strokeWidth="5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default function HeroReveal() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const walkerRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const crossbarRef = useRef<HTMLSpanElement | null>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      tl.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 1.2 }
      )
        .fromTo(
          titleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          0.05
        )
        .fromTo(
          lettersRef.current,
          { y: 38, opacity: 0, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.12,
            duration: 0.75,
          },
          0.2
        )
        .fromTo(
          walkerRef.current,
          { x: -220, y: 12, scale: 0.92, opacity: 0 },
          {
            x: 0,
            y: 12,
            opacity: 1,
            scale: 1,
            duration: 2.6,
            ease: "none",
          },
          0.2
        )
        .to(
          walkerRef.current,
          {
            x: 0,
            rotateY: 0,
            duration: 0.35,
            ease: "power2.out",
          },
          ">-0.1"
        )
        .fromTo(
          crossbarRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.45, ease: "expo.out" },
          ">-0.05"
        );

      gsap.to(walkerRef.current, {
        y: 6,
        repeat: -1,
        yoyo: true,
        duration: 1.05,
        ease: "sine.inOut",
      });

      gsap.to(".walk-body", {
        rotate: -2,
        transformOrigin: "50% 50%",
        repeat: -1,
        yoyo: true,
        duration: 0.9,
        ease: "sine.inOut",
      });

      gsap.to(".leg-left", {
        rotate: 18,
        transformOrigin: "50% 0%",
        repeat: -1,
        yoyo: true,
        duration: 0.42,
        ease: "sine.inOut",
      });

      gsap.to(".leg-right", {
        rotate: -18,
        transformOrigin: "50% 0%",
        repeat: -1,
        yoyo: true,
        duration: 0.42,
        ease: "sine.inOut",
        delay: 0.21,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[120vh] overflow-hidden bg-black px-6 pt-10 text-white md:px-10"
      style={{ perspective: "1200px" }}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-16 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(234,88,12,0.55)_0%,rgba(234,88,12,0.2)_22%,rgba(0,0,0,0)_68%)] blur-3xl"
      />

      <div
        ref={titleRef}
        className="relative mx-auto max-w-7xl pt-16 text-center [transform-style:preserve-3d]"
      >
        <div className="mb-6 text-sm uppercase tracking-[0.55em] text-white/45">
          Peddishetti
        </div>

        <div className="relative mx-auto inline-flex items-end justify-center gap-1 sm:gap-2">
          <span
            ref={(el) => {
              lettersRef.current[0] = el;
            }}
            className="text-[clamp(4rem,12vw,10rem)] font-bold leading-none tracking-[0.03em] text-white"
          >
            S
          </span>
          <span
            ref={(el) => {
              lettersRef.current[1] = el;
            }}
            className="text-[clamp(4rem,12vw,10rem)] font-bold leading-none tracking-[0.03em] text-white"
          >
            U
          </span>
          <span
            ref={(el) => {
              lettersRef.current[2] = el;
            }}
            className="text-[clamp(4rem,12vw,10rem)] font-bold leading-none tracking-[0.03em] text-white"
          >
            R
          </span>
          <span
            ref={(el) => {
              lettersRef.current[3] = el;
            }}
            className="text-[clamp(4rem,12vw,10rem)] font-bold leading-none tracking-[0.03em] text-white"
          >
            Y
          </span>

          <div
            ref={walkerRef}
            className="relative -ml-2 flex items-center justify-center will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <WalkingA />
            <span
              ref={crossbarRef}
              className="absolute left-1/2 top-[92px] h-[10px] w-[76px] -translate-x-1/2 rounded-full bg-white opacity-0 shadow-[0_0_26px_rgba(255,255,255,0.75)]"
            />
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-2xl text-balance text-sm leading-7 text-white/68 md:text-base">
          A cinematic portfolio built around full stack AI products, immersive
          3D interfaces, and high-conversion digital experiences.
        </div>
      </div>
    </section>
  );
      }
