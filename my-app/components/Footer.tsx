"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AppItem = {
  title: string;
  description: string;
  icon: JSX.Element;
};

function MailmateIcon() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" fill="none">
      <defs>
        <linearGradient id="mailGrad" x1="40" y1="30" x2="160" y2="170">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>
      <rect x="34" y="54" width="132" height="92" rx="22" fill="url(#mailGrad)" opacity="0.98" />
      <path d="M50 70l50 40 50-40" stroke="#000" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M50 136l34-28" stroke="#000" strokeWidth="10" strokeLinecap="round" />
      <path d="M150 136l-34-28" stroke="#000" strokeWidth="10" strokeLinecap="round" />
      <circle cx="155" cy="52" r="16" fill="#ea580c" opacity="0.95" />
      <path d="M155 43v18M146 52h18" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function SlideIcon() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" fill="none">
      <rect x="38" y="36" width="124" height="128" rx="28" fill="white" opacity="0.97" />
      <path d="M60 70h80M60 92h56M60 114h72" stroke="#000" strokeWidth="10" strokeLinecap="round" />
      <circle cx="144" cy="74" r="16" fill="#22d3ee" />
      <path d="M136 74h16M144 66v16" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function PlayfulIcon() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" fill="none">
      <path d="M56 54h88l-10 24H66L56 54Z" fill="white" opacity="0.96" />
      <path d="M64 84h72l-10 24H74L64 84Z" fill="white" opacity="0.9" />
      <path d="M72 114h56l-10 24H82L72 114Z" fill="white" opacity="0.84" />
      <path d="M95 40l14 0-1 20H96L95 40Z" fill="#ea580c" />
      <circle cx="150" cy="132" r="18" fill="#f472b6" />
      <path d="M142 132h16M150 124v16" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function FlipCard({
  app,
  active,
  onOpen,
  index,
}: {
  app: AppItem;
  active: boolean;
  onOpen: () => void;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<HTMLDivElement | null>(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { y: 30, opacity: 0, rotateX: 12, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        duration: 0.6,
        ease: "power4.out",
      }
    );
  }, [active]);

  useEffect(() => {
    if (!markerRef.current) return;
    gsap.to(markerRef.current, {
      scale: active ? 1.18 : 0.92,
      opacity: active ? 1 : 0.55,
      duration: 0.45,
      ease: "power3.out",
    });
  }, [active]);

  return (
    <div
      ref={cardRef}
      className={`absolute inset-0 mx-auto h-[520px] w-[min(36rem,92vw)] transition-opacity duration-500 ${
        active ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
      onClick={() => {
        setFlipped((v) => !v);
        onOpen();
      }}
    >
      <div
        ref={markerRef}
        className="absolute -top-16 left-1/2 h-14 w-14 -translate-x-1/2 rounded-full border border-white/14 bg-white/10 backdrop-blur-2xl shadow-[0_0_30px_rgba(255,255,255,0.28)]"
      />
      <div
        className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? "rotate-y-180" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          className="absolute inset-0 rounded-[2.25rem] border border-white/14 bg-white/5 backdrop-blur-2xl"
          style={{
            backfaceVisibility: "hidden",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.08), 0 40px 120px rgba(0,0,0,0.72), 0 0 60px rgba(255,255,255,0.1)",
          }}
        >
          <div className="absolute inset-0 rounded-[2.25rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_42%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.05),transparent_40%)]" />
          <div className="relative flex h-full items-center justify-center p-8">
            <div className="h-[280px] w-[280px] drop-shadow-[0_0_30px_rgba(255,255,255,0.22)]">
              {app.icon}
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-[2.25rem] border border-white/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.05))] p-7 backdrop-blur-2xl"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.08), 0 40px 120px rgba(0,0,0,0.72)",
          }}
        >
          <div className="absolute inset-0 rounded-[2.25rem] bg-[radial-gradient(circle_at_top_left,rgba(234,88,12,0.18),transparent_44%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_40%)]" />
          <div className="relative flex h-full flex-col justify-between">
            <div className="text-[0.72rem] uppercase tracking-[0.45em] text-white/42">
              App {index + 1}
            </div>
            <div>
              <div className="text-4xl font-bold tracking-[-0.05em] text-white">
                {app.title}
              </div>
              <p className="mt-5 max-w-[30rem] text-sm leading-7 text-white/78">
                {app.description}
              </p>
            </div>
            <div className="text-xs uppercase tracking-[0.35em] text-white/45">
              Tap to flip back
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AppsSineWave() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const waveRef = useRef<SVGSVGElement | null>(null);
  const markerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const apps = useMemo<AppItem[]>(
    () => [
      {
        title: "Mailmate",
        description:
          "An intelligent email agent that orchestrates your inbox. Mailmate seamlessly filters high-priority business correspondence from the noise, automating routine replies and instantly dispatching critical alerts directly to your Telegram.",
        icon: <MailmateIcon />,
      },
      {
        title: "Slide",
        description:
          "Slide redefines content consumption. This AI-powered news aggregator distills complex articles from global publishers into precise, high-impact briefings. Stay informed and ahead of the curve across your tailored categories.",
        icon: <SlideIcon />,
      },
      {
        title: "Playful",
        description:
          "Welcome to the future of game creation. Playful is an advanced AI game engine that transforms pure text prompts into fully playable, immersive gaming environments. Dream it, type it, play it.",
        icon: <PlayfulIcon />,
      },
    ],
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !markerRef.current || !waveRef.current) return;

      const marker = markerRef.current;
      const wave = waveRef.current;
      const cards = gsap.utils.toArray<HTMLElement>("[data-app-card]");

      gsap.set(marker, { x: 0, y: 0 });

      const updateMarker = (progress: number) => {
        const width = window.innerWidth;
        const x = gsap.utils.interpolate(width * 0.18, width * 0.82, progress);
        const y = Math.sin(progress * Math.PI * 2) * 20;
        const stage = progress < 0.34 ? 0 : progress < 0.67 ? 1 : 2;
        setActiveIndex(stage);
        gsap.to(marker, {
          x,
          y,
          duration: 0.12,
          ease: "power2.out",
        });
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3200",
          scrub: 1,
          pin: true,
          onUpdate(self) {
            updateMarker(self.progress);
          },
        },
      });

      tl.fromTo(
        wave,
        { opacity: 0.2, scaleX: 0.92 },
        { opacity: 1, scaleX: 1, duration: 0.3 },
        0
      );

      cards.forEach((card, i) => {
        gsap.set(card, { opacity: i === 0 ? 1 : 0, x: i === 0 ? 0 : 120, scale: 0.98 });
      });

      tl.to(cards[0], { opacity: 0, x: -120, scale: 0.96, duration: 0.32 }, 0.28)
        .to(cards[1], { opacity: 1, x: 0, scale: 1, duration: 0.32 }, 0.30)
        .to(cards[1], { opacity: 0, x: -120, scale: 0.96, duration: 0.32 }, 0.64)
        .to(cards[2], { opacity: 1, x: 0, scale: 1, duration: 0.32 }, 0.66);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black px-6 py-20 md:px-10"
      style={{ perspective: "1200px" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-sm uppercase tracking-[0.45em] text-white/45">
          Apps Sine Wave
        </div>

        <div className="relative h-[920px] w-full">
          <svg
            ref={waveRef}
            viewBox="0 0 1600 500"
            className="absolute left-0 top-0 h-[280px] w-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="waveGlow">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M0 250C120 60 280 60 400 250C520 440 680 440 800 250C920 60 1080 60 1200 250C1320 440 1480 440 1600 250"
              stroke="white"
              strokeWidth="10"
              fill="none"
              filter="url(#waveGlow)"
              strokeLinecap="round"
            />
          </svg>

          <div
            ref={markerRef}
            className="absolute left-0 top-[170px] flex h-16 w-16 items-center justify-center rounded-full border border-white/18 bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.8)] backdrop-blur-2xl"
            style={{ transform: "translate3d(0px,0px,0)" }}
          >
            <span className="text-xl font-bold">{activeIndex + 1}</span>
          </div>

          <div className="absolute left-0 right-0 top-[220px] flex justify-center">
            <div className="relative h-[560px] w-full">
              {apps.map((app, index) => (
                <div key={app.title} data-app-card className="absolute inset-0">
                  <FlipCard
                    app={app}
                    index={index}
                    active={activeIndex === index}
                    onOpen={() => undefined}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-3">
            {apps.map((_, i) => (
              <span
                key={i}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "bg-white shadow-[0_0_18px_rgba(255,255,255,0.7)]" : "bg-white/28"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
        }
