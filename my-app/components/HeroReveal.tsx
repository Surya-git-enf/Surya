
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeroReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const aRef = useRef<HTMLSpanElement>(null);
  const suryaRef = useRef<HTMLDivElement>(null);
  const peddishettiRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "cubic-bezier(0.16,1,0.3,1)" } });

      // Start: "A" walks in from left
      tl.fromTo(
        aRef.current,
        { x: -300, opacity: 0, filter: "blur(20px)" },
        { x: 0, opacity: 1, filter: "blur(0px)", duration: 1.0 }
      )
        // "SURY" reveals letter by letter from behind the A
        .fromTo(
          ".surya-letter",
          { x: -80, opacity: 0, filter: "blur(8px)" },
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.7,
            stagger: 0.08,
          },
          "-=0.4"
        )
        // Lock: whole SURYA snaps into place
        .to(".surya-full", { letterSpacing: "0.02em", duration: 0.3 }, "-=0.1")
        // Peddishetti fades in above
        .fromTo(
          peddishettiRef.current,
          { y: 24, opacity: 0, filter: "blur(10px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9 },
          "-=0.2"
        )
        // Subtitle line
        .fromTo(
          subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4"
        )
        // Scroll hint
        .fromTo(
          scrollHintRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Ambient particles
  const particles = Array.from({ length: 22 }, (_, i) => i);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Deep space ambient grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      {/* Ambient glow blob */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.08) 0%, rgba(236,72,153,0.04) 50%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(60px)",
        }}
      />

      {/* Floating particles */}
      {particles.map((i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `rgba(${Math.random() > 0.5 ? "139,92,246" : "236,72,153"},${Math.random() * 0.6 + 0.2})`,
            animation: `float ${4 + Math.random() * 6}s ease-in-out ${Math.random() * 4}s infinite alternate`,
          }}
        />
      ))}

      {/* Main hero content */}
      <div className="relative z-10 flex flex-col items-center text-center select-none">
        {/* "Peddishetti" above */}
        <div
          ref={peddishettiRef}
          className="mb-2 opacity-0"
          style={{ opacity: 0 }}
        >
          <span
            className="font-light tracking-[0.35em] uppercase text-white/50"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(14px, 2vw, 22px)",
              letterSpacing: "0.35em",
            }}
          >
            Peddishetti
          </span>
        </div>

        {/* SURYA — big cinematic name */}
        <div className="surya-full flex items-baseline" style={{ lineHeight: 1 }}>
          {/* S-U-R-Y letters */}
          {"SURY".split("").map((letter, i) => (
            <span
              key={i}
              className="surya-letter opacity-0"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(90px, 18vw, 220px)",
                color: "#ffffff",
                display: "inline-block",
                textShadow:
                  "0 0 80px rgba(139,92,246,0.3), 0 0 160px rgba(236,72,153,0.15)",
                letterSpacing: "-0.02em",
              }}
            >
              {letter}
            </span>
          ))}
          {/* A — the anchor letter */}
          <span
            ref={aRef}
            className="opacity-0"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(90px, 18vw, 220px)",
              color: "#ffffff",
              display: "inline-block",
              textShadow:
                "0 0 80px rgba(139,92,246,0.4), 0 0 160px rgba(236,72,153,0.2)",
              letterSpacing: "-0.02em",
            }}
          >
            A
          </span>
        </div>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          className="mt-6 opacity-0"
          style={{ opacity: 0 }}
        >
          <p
            className="text-white/40 tracking-widest uppercase"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "clamp(11px, 1.2vw, 14px)",
              letterSpacing: "0.28em",
            }}
          >
            Full Stack AI Developer &nbsp;·&nbsp; 3D Web Architect &nbsp;·&nbsp; Builder
          </p>
          <div
            className="mt-4 mx-auto"
            style={{
              width: "clamp(60px, 8vw, 100px)",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(139,92,246,0.8), rgba(236,72,153,0.8), transparent)",
            }}
          />
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
        style={{ opacity: 0 }}
      >
        <span
          className="text-white/25 tracking-[0.3em] uppercase"
          style={{ fontFamily: "'DM Mono', monospace", fontSize: 10 }}
        >
          Scroll
        </span>
        <div className="flex flex-col gap-[3px] items-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-full bg-white/30"
              style={{
                width: 3,
                height: 3,
                animation: `scrollDot 1.4s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:wght@300;400&family=DM+Mono:wght@300;400&display=swap");
        @keyframes float {
          from { transform: translateY(0px); }
          to { transform: translateY(-18px); }
        }
        @keyframes scrollDot {
          0%, 100% { opacity: 0.2; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(4px); }
        }
      `}</style>
    </section>
  );
}
