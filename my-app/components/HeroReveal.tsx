"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "./Header";

gsap.registerPlugin(ScrollTrigger);

export default function HeroReveal() {
  const heroRef    = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    // Initial state
    gsap.set(titleRef.current,    { opacity: 0, y: 60, skewY: 4 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
    gsap.set(scrollHintRef.current, { opacity: 0, y: 20 });
    gsap.set(bgRef.current,       { scale: 1.08, opacity: 0 });
    gsap.set(glowRef.current,     { scale: 0.6, opacity: 0 });

    // Entry sequence
    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(bgRef.current, { scale: 1, opacity: 1, duration: 1.4, ease: "power2.out" })
      .to(glowRef.current, { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }, "-=0.9")
      .to(titleRef.current, { opacity: 1, y: 0, skewY: 0, duration: 0.9, ease: "power4.out" }, "-=0.7")
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.4")
      .to(scrollHintRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.2");

    // Scroll-out: hero fades/scales as user leaves
    const ctx = gsap.context(() => {
      gsap.to(hero, {
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        opacity: 0,
        scale: 0.97,
        ease: "none",
      });
    }, hero);

    return () => {
      tl.kill();
      ctx.revert();
    };
  }, []);

  return (
    <>
      <Header />

      <section
        ref={heroRef}
        id="hero"
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ height: "100vh", minHeight: "600px" }}
      >
        {/* BG Noise + Gradient */}
        <div
          ref={bgRef}
          className="absolute inset-0"
          style={{
            background: "linear-gradient(160deg, #f5f7f2 0%, #e8ede3 40%, #d4dfc9 100%)",
          }}
        />

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Ambient glow */}
        <div
          ref={glowRef}
          className="absolute pointer-events-none"
          style={{
            width: "70vw",
            height: "70vw",
            maxWidth: "900px",
            maxHeight: "900px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(ellipse, rgba(107,140,90,0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Top-right decorative ring */}
        <div
          className="absolute pointer-events-none opacity-20"
          style={{
            width: "clamp(200px, 35vw, 500px)",
            height: "clamp(200px, 35vw, 500px)",
            top: "-10%",
            right: "-8%",
            border: "1.5px solid #6b8c5a",
            borderRadius: "50%",
          }}
        />
        <div
          className="absolute pointer-events-none opacity-10"
          style={{
            width: "clamp(300px, 55vw, 700px)",
            height: "clamp(300px, 55vw, 700px)",
            top: "-20%",
            right: "-18%",
            border: "1px solid #6b8c5a",
            borderRadius: "50%",
          }}
        />

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 gap-6">
          {/* Eyebrow */}
          <div
            className="flex items-center gap-2 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(107,140,90,0.12)",
              border: "1px solid rgba(107,140,90,0.3)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "#4a6b38" }}>
              Available for work
            </span>
          </div>

          {/* Title */}
          <div ref={titleRef}>
            <h1
              className="font-black leading-none"
              style={{
                fontSize: "clamp(3rem, 9vw, 9rem)",
                letterSpacing: "-0.04em",
                color: "#111",
              }}
            >
              SURYA
            </h1>
            <h1
              className="font-black leading-none"
              style={{
                fontSize: "clamp(1.6rem, 4.5vw, 5rem)",
                letterSpacing: "-0.02em",
                background: "linear-gradient(135deg, #6b8c5a 0%, #a8c48a 50%, #4a6b38 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              PEDDISHETTI
            </h1>
          </div>

          {/* Subtitle */}
          <div ref={subtitleRef} className="flex flex-col items-center gap-3">
            <p
              className="font-medium tracking-widest uppercase"
              style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)", color: "#666", letterSpacing: "0.3em" }}
            >
              AI Engineer · Full-Stack Developer · Motion Designer
            </p>
            <div className="flex items-center gap-3">
              {["Next.js", "FastAPI", "GSAP", "Supabase"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(0,0,0,0.06)",
                    color: "#555",
                    border: "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] font-bold tracking-[0.3em] uppercase" style={{ color: "#999" }}>
            Scroll
          </span>
          <div className="w-px h-12 overflow-hidden rounded-full" style={{ background: "rgba(0,0,0,0.1)" }}>
            <div
              className="w-full rounded-full"
              style={{
                height: "40%",
                background: "#6b8c5a",
                animation: "scrollLine 1.6s cubic-bezier(0.4,0,0.2,1) infinite",
              }}
            />
          </div>
        </div>

        <style>{`
          @keyframes scrollLine {
            0%   { transform: translateY(-100%); opacity: 0; }
            30%  { opacity: 1; }
            100% { transform: translateY(300%); opacity: 0; }
          }
        `}</style>
      </section>
    </>
  );
}
