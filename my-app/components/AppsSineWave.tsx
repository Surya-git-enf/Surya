
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

// Mathematically perfect node coordinates matching the new SVG path
const WAVE_POSITIONS = [
  { leftPct: 20.83, topPct: 13.63 }, // Card 1: First Peak
  { leftPct: 50.00, topPct: 86.36 }, // Card 2: Trough
  { leftPct: 79.16, topPct: 13.63 }, // Card 3: Second Peak
];

function AppCard({ app, active, isTrough }: { app: (typeof APPS)[number]; active: boolean; isTrough: boolean }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative pointer-events-auto"
      style={{
        width: "clamp(260px, 24vw, 340px)",
        height: "clamp(380px, 45vh, 480px)",
        perspective: "1200px",
        // Pushes the card perfectly straight up or down from the glowing node
        marginTop: isTrough ? "0" : "50px",
        marginBottom: isTrough ? "50px" : "0",
      }}
    >
      {/* ── Visual Dotted Connector Line ── */}
      <div 
        className="absolute left-1/2 w-[2px] border-l-[3px] border-dotted border-blue-300 pointer-events-none transition-all duration-500 delay-200"
        style={{
          height: "50px",
          top: isTrough ? "100%" : "-50px", 
          transform: "translateX(-50%)",
          opacity: active ? 1 : 0
        }}
      />

      {/* 3D Flipper Container */}
      <div
        onClick={() => setFlipped((f) => !f)}
        className="relative w-full h-full cursor-pointer rounded-3xl transition-all duration-700 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          // Neon Olive Green Shadow/Border applied when active
          boxShadow: active 
            ? "0 15px 40px rgba(107, 140, 90, 0.25), 0 0 20px rgba(107, 140, 90, 0.15)" 
            : "0 15px 35px rgba(0,0,0,0.05)",
          border: active ? "2px solid rgba(107, 140, 90, 0.7)" : "1px solid rgba(0,0,0,0.05)",
        }}
      >
        {/* ── FRONT FACE (60% Image / 40% Text) ── */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden flex flex-col bg-white"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Flip Icon (Top Right) */}
          <div className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-700 transition-colors">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>

          {/* 60% Image Section - Perfectly Centered */}
          <div className="h-[60%] w-full relative bg-gray-50 flex items-center justify-center p-8 border-b border-gray-100">
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
            <p className="font-bold tracking-[0.2em] uppercase mt-2 text-[#6b8c5a]" style={{ fontSize: "clamp(10px, 1vw, 12px)" }}>
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
          {/* Flip Icon (Top Right) */}
          <div className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-700 transition-colors">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
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

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const marker = markerRef.current;
    if (!section || !marker) return;

    cardWrappers.current.forEach((el, i) => {
      if (!el) return;
      const isTrough = i === 1;
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
          end: "+=700%", 
          pin: true,
          scrub: 1.2, 
          anticipatePin: 1,
        },
      });

      // === BEAT 1: Node 1 -> Node 2 ===
      // Elite Trick: Animate X linearly and Y with Sine.inOut to flawlessly trace the SVG curve!
      tl.to(markerProxy, {
        left: WAVE_POSITIONS[1].leftPct,
        duration: 1.5,
        ease: "none", // X moves straight
        onUpdate: () => { if (marker) marker.style.left = `${markerProxy.left}%`; },
      }, 0);
      tl.to(markerProxy, {
        top: WAVE_POSITIONS[1].topPct,
        duration: 1.5,
        ease: "sine.inOut", // Y moves in a curve
        onUpdate: () => { if (marker) marker.style.top = `${markerProxy.top}%`; },
      }, 0);

      // Card 1 out
      tl.to(cardWrappers.current[0], { opacity: 0, y: -40, duration: 0.5, ease: "power2.in" }, 0.2);
      
      // Number Flip
      tl.to({ val: 1 }, {
        val: 2, duration: 0.1, onUpdate: function () {
          if (markerNumRef.current) markerNumRef.current.textContent = Math.round(this.targets()[0].val).toString();
        }
      }, 0.75); 

      // Card 2 in
      tl.to(cardWrappers.current[1], {
        opacity: 1, y: 0, duration: 0.7, ease: "back.out(1.2)",
        onStart: () => setActiveIndex(1),
      }, 0.8);

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

      // Card 2 out
      tl.to(cardWrappers.current[1], { opacity: 0, y: 40, duration: 0.5, ease: "power2.in" }, 1.7);
      
      // Number Flip
      tl.to({ val: 2 }, {
        val: 3, duration: 0.1, onUpdate: function () {
          if (markerNumRef.current) markerNumRef.current.textContent = Math.round(this.targets()[0].val).toString();
        }
      }, 2.25); 

      // Card 3 in
      tl.to(cardWrappers.current[2], {
        opacity: 1, y: 0, duration: 0.7, ease: "back.out(1.2)",
        onStart: () => setActiveIndex(2),
      }, 2.3);

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

        {/* Professional SVG Wave Canvas Area */}
        <div className="absolute top-[30vh] left-0 right-0 h-[40vh] z-0 pointer-events-none">
          <svg
            viewBox="0 0 1200 220"
            preserveAspectRatio="none"
            className="w-full h-full overflow-visible"
          >
            {/* Elegant, Mathematically smooth Cubic Bezier Sine Wave */}
            <path
              d="M 0 110 C 100 110, 150 30, 250 30 C 400 30, 450 190, 600 190 C 750 190, 800 30, 950 30 C 1050 30, 1100 110, 1200 110"
              fill="none" stroke="#e0e7ff" strokeWidth="20" opacity="0.4" strokeLinecap="round"
            />
            <path
              d="M 0 110 C 100 110, 150 30, 250 30 C 400 30, 450 190, 600 190 C 750 190, 800 30, 950 30 C 1050 30, 1100 110, 1200 110"
              fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"
            />
          </svg>

          {/* The glowing marker node */}
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

          {/* Card Layout: Perfectly aligned to the node vertically */}
          {APPS.map((app, i) => {
            const isTrough = i === 1; 
            return (
              <div
                key={app.title}
                ref={(el) => { cardWrappers.current[i] = el; }}
                className="absolute z-20"
                style={{
                  left: `${WAVE_POSITIONS[i].leftPct}%`,
                  top: `${WAVE_POSITIONS[i].topPct}%`,
                  // If it's the bottom wave (Trough), shift the entire container up by 100% so it sits above the node.
                  // If it's the top wave (Peak), shift it down by 0% so it sits below the node.
                  transform: `translate(-50%, ${isTrough ? "-100%" : "0%"})`,
                }}
              >
                <AppCard app={app} active={activeIndex === i} isTrough={isTrough} />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
