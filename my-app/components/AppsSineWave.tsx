
"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const APPS = [
  {
    num: "1",
    title: "Mailmate",
    tagline: "AI Email Assistant",
    desc: "Mailmate is an intelligent email assistant that automatically reads, sorts, and organizes your inbox into clear categories like advertisements, friends and family, and important messages. It detects emails that need urgent attention and sends instant alerts through a Telegram bot, so you never miss something critical. Mailmate also includes Telegram automation features, allowing automatic message forwarding and channel-to-channel communication to keep your workflow fast, organized, and always connected.",
    imgSrc: "/mailmate.png",
  },
  {
    num: "2",
    title: "Slide",
    tagline: "AI News Summariser",
    desc: "Slide is an AI-powered news summariser that collects the latest stories from trusted sources like BBC, Times of India, and more, then transforms them into short, easy-to-read summaries. Instead of reading long articles, users get the key points in just two or three paragraphs. News is neatly organized into categories such as sports, entertainment, business, science, and technology, making it simple to stay informed without the overload.",
    imgSrc: "/slide.png",
  },
  {
    num: "3",
    title: "Playful",
    tagline: "AI Powered Game Engine",
    desc: "Playful is an AI-powered game engine that turns simple prompts into playable games. Inspired by the speed and simplicity of modern AI builders, Playful helps creators bring game ideas to life without needing to start from scratch. Just describe the game you want, and Playful generates the experience for you, making game creation faster, easier, and more accessible for everyone.",
    imgSrc: "/playful.png",
  },
] as const;

// Mathematically calculated precise coordinates for exactly 3 waves (25%, 50%, 75%)
const WAVE_POSITIONS = [
  { leftPct: 25, topPct: 13.63 }, // Card 1: First Peak
  { leftPct: 50, topPct: 86.36 }, // Card 2: Trough
  { leftPct: 75, topPct: 13.63 }, // Card 3: Second Peak
];

function AppCard({ app, active }: { app: (typeof APPS)[number]; active: boolean }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative pointer-events-auto"
      style={{
        width: "clamp(240px, 22vw, 340px)",
        height: "clamp(360px, 45vh, 460px)",
        perspective: "1200px",
      }}
    >
      {/* 3D Flipper Container */}
      <div
        onClick={() => setFlipped((f) => !f)}
        className="relative w-full h-full cursor-pointer rounded-3xl transition-all duration-700 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          // Neon Olive Green Glow activates smoothly
          boxShadow: active 
            ? "0 15px 40px rgba(107, 140, 90, 0.35), 0 0 25px rgba(107, 140, 90, 0.2)" 
            : "0 15px 35px rgba(0,0,0,0.05)",
          border: active ? "2px solid rgba(107, 140, 90, 0.85)" : "1px solid rgba(0,0,0,0.08)",
        }}
      >
        {/* ── FRONT FACE (60% Image / 40% Text) ── */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden flex flex-col bg-white"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Flip Icon 🔁 (Top Right) */}
          <div className="absolute top-4 right-4 z-10 text-gray-400">
            <svg viewBox="0 0 24 24" className="w-5 h-5 drop-shadow-md" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 2l4 4-4 4" />
              <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
              <path d="M7 22l-4-4 4-4" />
              <path d="M21 13v1a4 4 0 0 1-4 4H3" />
            </svg>
          </div>

          {/* 60% Image Section - Perfectly Centered */}
          <div className="h-[60%] w-full relative bg-[#f9fafb] flex items-center justify-center p-8 border-b border-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={app.imgSrc} 
              alt={app.title} 
              className="max-w-full max-h-full object-contain drop-shadow-lg transition-transform duration-500 hover:scale-105"
            />
          </div>
          
          {/* 40% Text Section */}
          <div className="h-[40%] w-full flex flex-col justify-center items-center p-5 text-center bg-white">
            <h3 className="font-black text-gray-900 tracking-tight" style={{ fontSize: "clamp(1.5rem, 2vw, 2rem)" }}>
              {app.title}
            </h3>
            <p className="font-bold tracking-[0.2em] uppercase mt-2 text-[#6b8c5a]" style={{ fontSize: "clamp(9px, 1vw, 11px)" }}>
              {app.tagline}
            </p>
          </div>
        </div>

        {/* ── BACK FACE (Description) ── */}
        <div
          className="absolute inset-0 rounded-3xl flex flex-col gap-4 p-6 overflow-hidden bg-white"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Flip Icon 🔁 (Top Right) */}
          <div className="absolute top-4 right-4 z-10 text-gray-400">
            <svg viewBox="0 0 24 24" className="w-5 h-5 drop-shadow-md" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 2l4 4-4 4" />
              <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
              <path d="M7 22l-4-4 4-4" />
              <path d="M21 13v1a4 4 0 0 1-4 4H3" />
            </svg>
          </div>

          <div className="flex items-center gap-3 border-b border-gray-100 pb-3 mt-1">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm bg-[#6b8c5a] shadow-md flex-shrink-0">
              {app.num}
            </div>
            <span className="font-black text-gray-900 text-lg">{app.title}</span>
          </div>
          
          {/* Scrollable text container */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <p className="text-gray-600 leading-relaxed font-medium text-justify" style={{ fontSize: "clamp(12px, 1.4vh, 15px)" }}>
              {app.desc}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
      `}</style>
    </div>
  );
}

export default function AppsSineWave() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const markerNumRef = useRef<HTMLSpanElement>(null);
  const cardWrappers = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // A proxy object to let GSAP smoothly update the React State numbers forwards AND backwards
  const valProxy = useRef({ val: 1 });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const marker = markerRef.current;
    if (!section || !marker) return;

    cardWrappers.current.forEach((el, i) => {
      if (!el) return;
      const isTrough = i === 1;
      // Cards start pushed away and faded out
      gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : (isTrough ? 40 : -40) });
    });

    gsap.set(marker, {
      left: `${WAVE_POSITIONS[0].leftPct}%`,
      top: `${WAVE_POSITIONS[0].topPct}%`,
    });

    const markerProxy = {
      left: WAVE_POSITIONS[0].leftPct,
      top: WAVE_POSITIONS[0].topPct,
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=400%", 
          pin: true,
          scrub: 1.2, 
          anticipatePin: 1,
        },
      });

      // === BEAT 1: Node 1 -> Node 2 ===
      // Elite Physics: Linear X + Sine.inOut Y trace the precise SVG mathematical curve
      tl.to(markerProxy, {
        left: WAVE_POSITIONS[1].leftPct,
        duration: 1.5,
        ease: "none", 
        onUpdate: () => { if (marker) marker.style.left = `${markerProxy.left}%`; },
      }, 0);
      tl.to(markerProxy, {
        top: WAVE_POSITIONS[1].topPct,
        duration: 1.5,
        ease: "sine.inOut", 
        onUpdate: () => { if (marker) marker.style.top = `${markerProxy.top}%`; },
      }, 0);

      // Card 1 Fade out
      tl.to(cardWrappers.current[0], { opacity: 0, y: 40, duration: 0.5, ease: "power2.in" }, 0.2);
      
      // Update Number AND UI State seamlessly in both directions
      tl.to(valProxy.current, {
        val: 2, 
        duration: 0.2, 
        ease: "none",
        onUpdate: () => {
          const currentVal = Math.round(valProxy.current.val);
          if (markerNumRef.current) markerNumRef.current.textContent = currentVal.toString();
          setActiveIndex(currentVal - 1); 
        }
      }, 0.65); 

      // Card 2 Fade in
      tl.to(cardWrappers.current[1], { opacity: 1, y: 0, duration: 0.7, ease: "back.out(1.2)" }, 0.8);

      // === BEAT 2: Node 2 -> Node 3 ===
      tl.to(markerProxy, {
        left: WAVE_POSITIONS[2].leftPct,
        duration: 1.5,
        ease: "none",
        onUpdate: () => { if (marker) marker.style.left = `${markerProxy.left}%`; },
      }, 1.5);
      tl.to(markerProxy, {
        top: WAVE_POSITIONS[2].topPct,
        duration: 1.5,
        ease: "sine.inOut",
        onUpdate: () => { if (marker) marker.style.top = `${markerProxy.top}%`; },
      }, 1.5);

      // Card 2 Fade out
      tl.to(cardWrappers.current[1], { opacity: 0, y: -40, duration: 0.5, ease: "power2.in" }, 1.7);
      
      // Update Number AND UI State seamlessly in both directions
      tl.to(valProxy.current, {
        val: 3, 
        duration: 0.2, 
        ease: "none",
        onUpdate: () => {
          const currentVal = Math.round(valProxy.current.val);
          if (markerNumRef.current) markerNumRef.current.textContent = currentVal.toString();
          setActiveIndex(currentVal - 1);
        }
      }, 2.15); 

      // Card 3 Fade in
      tl.to(cardWrappers.current[2], { opacity: 1, y: 0, duration: 0.7, ease: "back.out(1.2)" }, 2.3);

      // Hold final card
      tl.to({}, { duration: 2.0 });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full z-40 bg-white">
      <section
        id="builtapps"
        ref={sectionRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Header */}
        <div className="absolute top-[6vh] left-0 right-0 flex flex-col items-center z-10 select-none pointer-events-none">
          <h2
            className="font-black tracking-tight m-0"
            style={{
              fontSize: "clamp(2rem, 5vw, 5rem)",
              background: "linear-gradient(135deg, #111827 30%, #3b82f6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1,
            }}
          >
            AI APPS BUILT
          </h2>
          <div className="mt-4 h-[3px] w-20 rounded-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        </div>

        {/* Professional SVG Wave Canvas Area.
          This uses exactly 3 distinct half-waves perfectly matching your "Up, Down, Up" layout request. 
        */}
        <div className="absolute top-[30vh] left-0 right-0 h-[40vh] z-0 pointer-events-none">
          <svg
            viewBox="0 0 1200 220"
            preserveAspectRatio="none"
            className="w-full h-full overflow-visible"
          >
            <defs>
              <filter id="waveGlow" x="-20%" y="-80%" width="140%" height="260%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.23  0 0 0 0 0.51  0 0 0 0 0.96  0 0 0 1 0" result="blueGlow" />
                <feMerge>
                  <feMergeNode in="blueGlow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Exactly 3 pure Bezier curves: Peak -> Trough -> Peak */}
            <path
              d="M -100 110 C 50 110, 150 30, 300 30 C 450 30, 450 190, 600 190 C 750 190, 750 30, 900 30 C 1050 30, 1150 110, 1300 110"
              fill="none" stroke="#e0e7ff" strokeWidth="20" opacity="0.4" strokeLinecap="round"
            />
            <path
              d="M -100 110 C 50 110, 150 30, 300 30 C 450 30, 450 190, 600 190 C 750 190, 750 30, 900 30 C 1050 30, 1150 110, 1300 110"
              fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" filter="url(#waveGlow)"
            />
          </svg>

          {/* Glowing marker node */}
          <div
            ref={markerRef}
            className="absolute z-30 w-12 h-12 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            <div className="absolute inset-0 rounded-full bg-blue-500 blur-md opacity-50" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-[0_0_0_6px_rgba(59,130,246,0.2)] border-2 border-white">
              <span ref={markerNumRef} className="text-white font-black text-xl select-none">
                1
              </span>
            </div>
          </div>

          {/* Hard-Coded Alignments: Card 1 & 3 sit perfectly straight below. Card 2 sits perfectly straight above. */}
          {APPS.map((app, i) => {
            const isTrough = i === 1; 
            return (
              <div
                key={app.title}
                ref={(el) => { cardWrappers.current[i] = el; }}
                className="absolute z-40"
                style={{
                  left: `${WAVE_POSITIONS[i].leftPct}%`,
                  top: `${WAVE_POSITIONS[i].topPct}%`,
                  transform: `translateX(-50%)`,
                }}
              >
                {isTrough ? (
                  // Node 2 is down. Card sits perfectly straight above the node.
                  <div className="absolute bottom-[calc(100%+40px)] left-1/2 -translate-x-1/2 pointer-events-auto flex flex-col items-center">
                    <AppCard app={app} active={activeIndex === i} />
                    {/* Dotted Line connecting down to the node */}
                    <div className={`absolute top-[100%] w-[2px] h-[40px] border-l-[3px] border-dotted border-blue-300 transition-opacity duration-500 delay-200 ${activeIndex === i ? 'opacity-60' : 'opacity-0'}`} />
                  </div>
                ) : (
                  // Node 1 & 3 are up. Card sits perfectly straight below the node.
                  <div className="absolute top-[calc(100%+40px)] left-1/2 -translate-x-1/2 pointer-events-auto flex flex-col items-center">
                    {/* Dotted Line connecting up to the node */}
                    <div className={`absolute bottom-[100%] w-[2px] h-[40px] border-l-[3px] border-dotted border-blue-300 transition-opacity duration-500 delay-200 ${activeIndex === i ? 'opacity-60' : 'opacity-0'}`} />
                    <AppCard app={app} active={activeIndex === i} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
        }
                  
