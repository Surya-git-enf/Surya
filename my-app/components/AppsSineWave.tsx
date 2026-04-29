
"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const apps = [
  {
    id: "mailmate",
    name: "Mailmate",
    tagline: "Email Intelligence",
    description:
      "Email agent that filters priority business correspondence and dispatches Telegram alerts — so you only see what matters.",
    accentColor: "#facc15",
    glowColor: "rgba(250,204,21,0.5)",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="8" y="20" width="64" height="44" rx="8" stroke="white" strokeOpacity="0.9" strokeWidth="3.5" fill="none"/>
        <path d="M8 28l32 22 32-22" stroke="white" strokeOpacity="0.9" strokeWidth="3.5" strokeLinejoin="round"/>
        <circle cx="62" cy="22" r="10" fill="#facc15"/>
        <path d="M58 22l2.5 2.5L66 17" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "slide",
    name: "Slide",
    tagline: "AI News Engine",
    description:
      "AI news aggregator distilling complex articles into high-impact briefings — cutting signal from noise at scale.",
    accentColor: "#60a5fa",
    glowColor: "rgba(96,165,250,0.5)",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="10" y="10" width="60" height="60" rx="10" fill="none" stroke="white" strokeOpacity="0.9" strokeWidth="3.5"/>
        <path d="M20 28h40M20 40h28M20 52h20" stroke="white" strokeOpacity="0.85" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="58" cy="48" r="10" fill="#60a5fa"/>
        <path d="M54 48l8 0M58 44l4 4-4 4" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "playful",
    name: "Playful",
    tagline: "AI Game Engine",
    description:
      "Advanced AI game engine transforming text prompts into fully playable environments — turns words into worlds.",
    accentColor: "#a78bfa",
    glowColor: "rgba(167,139,250,0.5)",
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="8" y="28" width="64" height="36" rx="16" fill="none" stroke="white" strokeOpacity="0.9" strokeWidth="3.5"/>
        <circle cx="28" cy="46" r="6" fill="none" stroke="white" strokeOpacity="0.85" strokeWidth="3"/>
        <path d="M25 46h6M28 43v6" stroke="white" strokeOpacity="0.85" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="52" cy="46" r="6" fill="none" stroke="white" strokeOpacity="0.85" strokeWidth="3"/>
        <circle cx="50" cy="44" r="2" fill="white" fillOpacity="0.85"/>
        <circle cx="54" cy="48" r="2" fill="white" fillOpacity="0.85"/>
        <path d="M30 16L40 8l10 8" stroke="white" strokeOpacity="0.5" strokeWidth="2.5" strokeLinejoin="round"/>
        <line x1="40" y1="8" x2="40" y2="28" stroke="white" strokeOpacity="0.4" strokeWidth="2"/>
        <circle cx="40" cy="16" r="3" fill="#a78bfa"/>
      </svg>
    ),
  },
];

// Sine wave geometry
const WAVE_WIDTH = 900;
const WAVE_HEIGHT = 220;
const AMPLITUDE = 72;
const FREQUENCY = 1; // 1 full cycle
const VIEWBOX_W = WAVE_WIDTH;
const VIEWBOX_H = WAVE_HEIGHT;

function getSineY(x: number, width: number, amplitude: number, cy: number, freq: number) {
  return cy + amplitude * Math.sin((x / width) * freq * 2 * Math.PI);
}

// Card positions: peaks/troughs of the sine wave at x = W/6, W/2, 5W/6
const cardXRatios = [0.15, 0.5, 0.85];
const cardPositions = cardXRatios.map((r) => {
  const x = r * WAVE_WIDTH;
  const y = getSineY(x, WAVE_WIDTH, AMPLITUDE, WAVE_HEIGHT / 2, FREQUENCY);
  return { x, y };
});

// Build the SVG path
function buildWavePath() {
  const pts: string[] = [];
  for (let x = 0; x <= WAVE_WIDTH; x += 4) {
    const y = getSineY(x, WAVE_WIDTH, AMPLITUDE, WAVE_HEIGHT / 2, FREQUENCY);
    pts.push(x === 0 ? `M ${x},${y}` : `L ${x},${y}`);
  }
  return pts.join(" ");
}

const wavePath = buildWavePath();

export default function AppsSineWave() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCard, setActiveCard] = useState(0);
  const [flipped, setFlipped] = useState<boolean[]>([false, false, false]);

  const handleFlip = (i: number) => {
    setFlipped((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  useEffect(() => {
    // Animate cards in on scroll
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { y: 50, opacity: 0, scale: 0.92, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "cubic-bezier(0.16,1,0.3,1)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `${15 + i * 20}% center`,
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Active card progression via scroll
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      end: "bottom center",
      onUpdate: (self) => {
        const p = self.progress;
        let nextActive = 0;
        if (p > 0.66) nextActive = 2;
        else if (p > 0.33) nextActive = 1;
        setActiveCard(nextActive);

        // Animate the dot along the wave
        if (dotRef.current) {
          const xRatio = 0.15 + p * 0.7;
          const xAbs = xRatio * WAVE_WIDTH;
          const yAbs = getSineY(xAbs, WAVE_WIDTH, AMPLITUDE, WAVE_HEIGHT / 2, FREQUENCY);
          dotRef.current.setAttribute("cx", String(xAbs));
          dotRef.current.setAttribute("cy", String(yAbs));
        }
      },
    });

    // Heading reveal
    gsap.fromTo(
      ".apps-heading",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: "cubic-bezier(0.16,1,0.3,1)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden bg-black"
      style={{ minHeight: "100vh" }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(167,139,250,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="apps-heading text-center mb-4 opacity-0">
          <p
            className="text-white/25 tracking-[0.4em] uppercase mb-3"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: 11 }}
          >
            Products
          </p>
          <h2
            className="text-white"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(48px, 8vw, 90px)",
              letterSpacing: "0.05em",
              lineHeight: 1,
            }}
          >
            What I&apos;ve Built
          </h2>
          <div
            className="mx-auto mt-4"
            style={{
              width: 80,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(167,139,250,0.8), transparent)",
            }}
          />
        </div>

        {/* Instruction */}
        <p
          className="text-center text-white/25 mb-12"
          style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.2em" }}
        >
          Tap cards to flip · Scroll to activate
        </p>

        {/* Sine wave + cards container */}
        <div className="relative" style={{ minHeight: VIEWBOX_H + 300 }}>
          {/* SVG Sine Wave */}
          <div className="absolute inset-x-0 top-0 w-full overflow-visible pointer-events-none">
            <svg
              viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
              preserveAspectRatio="xMidYMid meet"
              className="w-full"
              style={{ overflow: "visible" }}
            >
              <defs>
                {/* Glow filter */}
                <filter id="wave-glow" x="-20%" y="-100%" width="140%" height="300%">
                  <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#facc15" stopOpacity="0.3" />
                  <stop offset="33%" stopColor="#a78bfa" stopOpacity="0.8" />
                  <stop offset="66%" stopColor="#60a5fa" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
                </linearGradient>
                <filter id="dot-glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Shadow wave */}
              <path
                d={wavePath}
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
              />

              {/* Main wave */}
              <path
                ref={waveRef}
                d={wavePath}
                stroke="url(#waveGrad)"
                strokeWidth="2.5"
                fill="none"
                filter="url(#wave-glow)"
                strokeLinecap="round"
              />

              {/* Card anchor dots */}
              {cardPositions.map((pos, i) => (
                <g key={i}>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={activeCard === i ? 9 : 5}
                    fill={activeCard === i ? apps[i].accentColor : "rgba(255,255,255,0.3)"}
                    filter={activeCard === i ? "url(#dot-glow)" : undefined}
                    style={{ transition: "r 0.4s ease, fill 0.4s ease" }}
                  />
                  {/* Vertical connector */}
                  <line
                    x1={pos.x}
                    y1={pos.y}
                    x2={pos.x}
                    y2={i % 2 === 0 ? pos.y - 20 : pos.y + 20}
                    stroke={activeCard === i ? apps[i].accentColor : "rgba(255,255,255,0.15)"}
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                </g>
              ))}

              {/* Traveling dot */}
              <circle
                ref={dotRef}
                cx={cardPositions[0].x}
                cy={cardPositions[0].y}
                r="5"
                fill="white"
                fillOpacity="0.9"
                filter="url(#dot-glow)"
              />
            </svg>
          </div>

          {/* Flip Cards */}
          <div className="relative" style={{ paddingTop: VIEWBOX_H - 60 }}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {apps.map((app, i) => {
                const isActive = activeCard === i;
                const isFlipped = flipped[i];

                return (
                  <div
                    key={app.id}
                    ref={(el) => { cardRefs.current[i] = el; }}
                    className="opacity-0"
                    style={{ perspective: "1000px" }}
                    onClick={() => handleFlip(i)}
                  >
                    <div
                      className="relative cursor-pointer"
                      style={{
                        width: "100%",
                        height: 280,
                        transformStyle: "preserve-3d",
                        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                        transition: "transform 0.75s cubic-bezier(0.16,1,0.3,1)",
                      }}
                    >
                      {/* FRONT */}
                      <div
                        className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center p-6"
                        style={{
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          background: isActive
                            ? `linear-gradient(135deg, rgba(10,10,10,0.9) 0%, rgba(20,20,20,0.7) 100%)`
                            : "rgba(10,10,10,0.6)",
                          backdropFilter: "blur(24px)",
                          WebkitBackdropFilter: "blur(24px)",
                          border: `1px solid ${isActive ? app.accentColor + "88" : "rgba(255,255,255,0.07)"}`,
                          boxShadow: isActive
                            ? `0 0 40px 6px ${app.glowColor}, 0 24px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)`
                            : "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
                          transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
                          transform: isActive ? "translateY(-6px)" : "none",
                        }}
                      >
                        {/* Icon */}
                        <div
                          className="mb-4"
                          style={{
                            width: 72,
                            height: 72,
                            filter: isActive
                              ? `drop-shadow(0 0 16px ${app.accentColor})`
                              : "none",
                            transition: "filter 0.4s ease",
                          }}
                        >
                          {app.icon}
                        </div>

                        {/* App name */}
                        <h3
                          className="text-white text-center mb-1"
                          style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: 28,
                            letterSpacing: "0.08em",
                          }}
                        >
                          {app.name}
                        </h3>

                        {/* Tagline */}
                        <p
                          className="tracking-widest uppercase text-center"
                          style={{
                            color: app.accentColor,
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 10,
                            letterSpacing: "0.25em",
                            opacity: 0.8,
                          }}
                        >
                          {app.tagline}
                        </p>

                        {/* Flip hint */}
                        <div
                          className="absolute bottom-4 right-5 flex items-center gap-1"
                          style={{ opacity: 0.3 }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <path d="M1 4v6h6M23 20v-6h-6" /><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                          </svg>
                        </div>

                        {/* Active indicator */}
                        {isActive && (
                          <div
                            className="absolute top-4 left-5 w-2 h-2 rounded-full"
                            style={{
                              background: app.accentColor,
                              boxShadow: `0 0 8px ${app.accentColor}`,
                              animation: "activePulse 1.5s ease infinite",
                            }}
                          />
                        )}
                      </div>

                      {/* BACK */}
                      <div
                        className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center p-7"
                        style={{
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                          background:
                            "linear-gradient(135deg, rgba(8,8,12,0.95) 0%, rgba(15,10,25,0.92) 100%)",
                          backdropFilter: "blur(28px)",
                          WebkitBackdropFilter: "blur(28px)",
                          border: `1px solid ${app.accentColor}55`,
                          boxShadow: `0 0 30px 3px ${app.glowColor}, inset 0 1px 0 rgba(255,255,255,0.08)`,
                        }}
                      >
                        {/* Accent line */}
                        <div
                          className="absolute top-0 left-8 right-8 h-px"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${app.accentColor}, transparent)`,
                          }}
                        />

                        <h3
                          className="mb-4 text-center"
                          style={{
                            color: app.accentColor,
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: 22,
                            letterSpacing: "0.12em",
                          }}
                        >
                          {app.name}
                        </h3>

                        <p
                          className="text-white/70 text-center leading-relaxed"
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 12,
                            lineHeight: 1.8,
                          }}
                        >
                          {app.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes activePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.4); }
        }
      `}</style>
    </section>
  );
            }
                  
