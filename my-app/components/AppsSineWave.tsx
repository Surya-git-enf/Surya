
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
    accent: "#3b82f6", // Blue
    imgSrc: "/mailmate.png",
  },
  {
    num: "2",
    title: "Slide",
    tagline: "AI News Summariser",
    desc: "Slide is an AI-powered news summariser that collects the latest stories from trusted sources like BBC, Times of India, and more, then transforms them into short, easy-to-read summaries. Instead of reading long articles, users get the key points in just two or three paragraphs. News is neatly organized into categories such as sports, entertainment, business, science, and technology, making it simple to stay informed without the overload.",
    accent: "#8b5cf6", // Purple
    imgSrc: "/slide.png",
  },
  {
    num: "3",
    title: "Playful",
    tagline: "AI Powered Game Engine",
    desc: "Playful is an AI-powered game engine that turns simple prompts into playable games. Inspired by the speed and simplicity of modern AI builders, Playful helps creators bring game ideas to life without needing to start from scratch. Just describe the game you want, and Playful generates the experience for you, making game creation faster, easier, and more accessible for everyone.",
    accent: "#06b6d4", // Cyan
    imgSrc: "/playful.png",
  },
] as const;

// Wave Positions explicitly mapped to the SVG peaks and troughs
const WAVE_POSITIONS = [
  { leftPct: 15, topPct: 18 }, // Card 1: First Peak
  { leftPct: 50, topPct: 82 }, // Card 2: Trough
  { leftPct: 85, topPct: 18 }, // Card 3: Second Peak
];

function AppCard({ app, active, isTrough }: { app: (typeof APPS)[number]; active: boolean; isTrough: boolean }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative"
      style={{
        width: "clamp(260px, 24vw, 340px)",
        height: "clamp(380px, 45vh, 480px)",
        perspective: "1200px",
      }}
    >
      {/* Visual Dotted Connector Line (simulating the image reference) */}
      <div 
        className="absolute left-1/2 w-[2px] border-l-2 border-dashed border-blue-300 opacity-60 pointer-events-none"
        style={{
          height: "60px",
          top: isTrough ? "-60px" : "100%",
          transform: "translateX(-50%)",
          display: active ? "block" : "none"
        }}
      />

      {/* Neon backlight for active state */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none transition-all duration-700 ease-out"
        style={{
          background: app.accent,
          filter: "blur(45px)",
          opacity: active ? 0.25 : 0,
          transform: active ? "scale(0.95) translateY(15px)" : "scale(0.8) translateY(0px)",
        }}
      />

      {/* 3D Flipper Container */}
      <div
        onClick={() => setFlipped((f) => !f)}
        className="relative w-full h-full cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* ── FRONT FACE (60% Image / 40% Text) ── */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden flex flex-col bg-white"
          style={{
            backfaceVisibility: "hidden",
            boxShadow: "0 25px 50px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
          }}
        >
          {/* 60% Image Section */}
          <div className="h-[60%] w-full relative bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6 border-b border-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={app.imgSrc} 
              alt={app.title} 
              className="w-full h-full object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105"
            />
          </div>
          
          {/* 40% Text Section */}
          <div className="h-[40%] w-full flex flex-col justify-center items-center p-5 text-center bg-white">
            <h3 className="font-black text-gray-900 tracking-tight" style={{ fontSize: "clamp(1.5rem, 2vw, 2rem)" }}>
              {app.title}
            </h3>
            <p className="font-bold tracking-[0.2em] uppercase mt-2" style={{ color: app.accent, fontSize: "clamp(10px, 1vw, 12px)" }}>
              {app.tagline}
            </p>
            <span className="text-[10px] font-semibold text-gray-400 mt-4 uppercase tracking-wider">
              Tap to read more ↺
            </span>
          </div>
        </div>

        {/* ── BACK FACE (Description) ── */}
        <div
          className="absolute inset-0 rounded-3xl flex flex-col gap-4 p-6 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,1)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.1)",
          }}
        >
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md flex-shrink-0"
              style={{ background: app.accent }}
            >
              {app.num}
            </div>
            <span className="font-black text-gray-900 text-lg">{app.title}</span>
          </div>
          
          {/* Scrollable text container with clamp font size */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <p 
              className="text-gray-600 leading-relaxed font-medium text-justify"
              style={{ fontSize: "clamp(12px, 1.4vh, 15px)" }}
            >
              {app.desc}
            </p>
          </div>

          <div className="pt-2 text-center border-t border-gray-100">
            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: app.accent }}>
              Tap to return ↺
            </span>
          </div>
        </div>
      </div>

      {/* Global style for thin scrollbar on back card */}
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

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const marker = markerRef.current;
    if (!section || !marker) return;

    // Reset initial card states
    cardWrappers.current.forEach((el, i) => {
      if (!el) return;
      // Cards start hidden and slightly translated for a smooth entry
      gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : (i === 1 ? -40 : 40) });
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
          end: "+=600%", // Pin holds for a long scroll duration
          pin: true,
          scrub: 1.2, // Smooth interpolation
          anticipatePin: 1,
        },
      });

      // === BEAT 1: Node 1 -> Node 2 ===
      tl.to(markerProxy, {
        left: WAVE_POSITIONS[1].leftPct,
        top: WAVE_POSITIONS[1].topPct,
        duration: 1.5,
        ease: "sine.inOut", // Mimics the physical curve of the wave
        onUpdate: () => {
          if (marker) {
            marker.style.left = `${markerProxy.left}%`;
            marker.style.top = `${markerProxy.top}%`;
          }
        },
      }, 0);

      // Card 1 fades out
      tl.to(cardWrappers.current[0], { opacity: 0, y: 40, duration: 0.5, ease: "power2.in" }, 0.2);
      
      // Number flips cleanly at the halfway point
      tl.to({ val: 1 }, {
        val: 2, duration: 0.1, onUpdate: function () {
          if (markerNumRef.current) markerNumRef.current.textContent = Math.round(this.targets()[0].val).toString();
        }
      }, 0.75); 

      // Card 2 fades in
      tl.to(cardWrappers.current[1], {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "back.out(1.2)",
        onStart: () => setActiveIndex(1),
      }, 0.8);
      

      // === BEAT 2: Node 2 -> Node 3 ===
      tl.to(markerProxy, {
        left: WAVE_POSITIONS[2].leftPct,
        top: WAVE_POSITIONS[2].topPct,
        duration: 1.5,
        ease: "sine.inOut",
        onUpdate: () => {
          if (marker) {
            marker.style.left = `${markerProxy.left}%`;
            marker.style.top = `${markerProxy.top}%`;
          }
        },
      }, 1.5);

      // Card 2 fades out
      tl.to(cardWrappers.current[1], { opacity: 0, y: -40, duration: 0.5, ease: "power2.in" }, 1.7);
      
      // Number flips at halfway point
      tl.to({ val: 2 }, {
        val: 3, duration: 0.1, onUpdate: function () {
          if (markerNumRef.current) markerNumRef.current.textContent = Math.round(this.targets()[0].val).toString();
        }
      }, 2.25); 

      // Card 3 fades in
      tl.to(cardWrappers.current[2], {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "back.out(1.2)",
        onStart: () => setActiveIndex(2),
      }, 2.3);

      // === BEAT 3: HOLD THE FINAL CARD ===
      // Forces the pin to stay active so the user can read card 3 before scrolling to footer
      tl.to({}, { duration: 2.0 });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="builtapps"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#ffffff] overflow-hidden"
    >
      {/* Header */}
      <div className="absolute top-[6vh] left-0 right-0 flex flex-col items-center z-10 select-none">
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

      {/* Wave Container */}
      <div className="absolute top-[28vh] left-0 right-0 h-[44vh] z-0 pointer-events-none">
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

          {/* Background thick path */}
          <path
            d="M0 110 C180 110 220 24 350 24 C500 24 530 196 600 196 C670 196 700 24 850 24 C980 24 1020 110 1200 110"
            fill="none" stroke="#3b82f6" strokeWidth="24" opacity="0.06" strokeLinecap="round"
          />
          {/* Neon core path */}
          <path
            d="M0 110 C180 110 220 24 350 24 C500 24 530 196 600 196 C670 196 700 24 850 24 C980 24 1020 110 1200 110"
            fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" filter="url(#waveGlow)"
          />
        </svg>

        {/* The glowing marker node that rides the wave */}
        <div
          ref={markerRef}
          className="absolute z-30 w-12 h-12 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          <div className="absolute inset-0 rounded-full bg-blue-500 blur-md opacity-60" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-[0_0_0_6px_rgba(59,130,246,0.25)]">
            <span ref={markerNumRef} className="text-white font-black text-xl select-none">
              1
            </span>
          </div>
        </div>

        {/* Static placement of the 3 App Cards */}
        {APPS.map((app, i) => {
          // Card 1 & 3 (Peaks) position below the node. Card 2 (Trough) positions above the node.
          const isTrough = i === 1; 
          const yOffset = isTrough ? "-100%" : "0%";
          const yMargin = isTrough ? "-70px" : "70px";

          return (
            <div
              key={app.title}
              ref={(el) => { cardWrappers.current[i] = el; }}
              className="absolute z-20"
              style={{
                left: `${WAVE_POSITIONS[i].leftPct}%`,
                top: `${WAVE_POSITIONS[i].topPct}%`,
                transform: `translate(-50%, calc(${yOffset} + ${yMargin}))`,
              }}
            >
              <AppCard app={app} active={activeIndex === i} isTrough={isTrough} />
            </div>
          );
        })}
      </div>
    </section>
  );
          }
