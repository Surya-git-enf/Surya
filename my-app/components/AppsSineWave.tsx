"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// APP DATA
const apps = [
  {
    id: 1,
    name: "Mailmate",
    heading: "Mailmate",
    imgSrc: "/mailmate.png",
    description: "Intelligent email sorting assistant, automatically categorizing mail trends to identify priorities.",
  },
  {
    id: 2,
    name: "Slide",
    heading: "Slide",
    imgSrc: "/slide.png",
    description: "Content dip analyzer, using AI to uncover hidden opportunities in trend engagement data.",
  },
  {
    id: 3,
    name: "Playful",
    heading: "Playful",
    imgSrc: "/logo.png",
    description: "Next-gen game asset generator, using text-to-3D models to achieve creation goals faster.",
  },
];

export default function AppSineWave() {
  const containerRef = useRef<HTMLElement>(null);
  const sinePathRef = useRef<SVGPathElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const numberRefs = useRef<HTMLSpanElement[]>([]);
  const movingNumberRef = useRef<HTMLDivElement>(null);

  // States for flip
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const handleFlip = (id: number) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section
      ScrollTrigger.create({
        trigger: containerRef.current,
        pin: true,
        start: "top top",
        end: "+=300%", // Scroll distance
        scrub: 1,
      });

      // --- SINE WAVE DRAW ---
      const sineTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%", // Wave draws fully first
          scrub: 1,
        },
      });

      const pathLength = sinePathRef.current?.getTotalLength() || 0;
      sineTl.fromTo(
        sinePathRef.current,
        { strokeDasharray: pathLength, strokeDashoffset: pathLength },
        { strokeDashoffset: 0, ease: "none" }
      );

      // --- NUMBER 1 TRAJECTORY ---
      const numTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "10% top",
          end: "+=150%",
          scrub: 1,
        },
      });

      const movingNumberElement = movingNumberRef.current;
      const textElement = movingNumberElement?.querySelector("p");

      // Number moves from peak 1 to peak 2.
      // Coordinates are based on the SVG viewBox "0 0 1000 500"
      numTl.set(movingNumberElement, { x: 345, y: 55, opacity: 1 }); // Start pos (1)
      numTl.to(movingNumberElement, {
        duration: 1,
        x: 655, // Midpoint between 2 and 3
        y: 55, // Straight vertical path visual (or keep slightly arched)
        ease: "power2.inOut",
        onComplete: () => {
          if (textElement) textElement.innerText = "2";
        },
      });
      // Trajectory end
      numTl.to(movingNumberElement, {
        duration: 1,
        x: 775,
        y: 275,
        onStart: () => {
          // If we want a linear vertical jump appearance before this trajectory...
          // Prompt states "1st number moves top to bottom turns 2", while images show path.
          // This trajectory implements the path between visual locations shown in image_2.
        },
      });

      // --- APP CARD SWITCH & LIGHT SEQUENCE ---
      const switchTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "10% top",
          end: "+=300%", // Match pinning
          scrub: 1,
        },
      });

      cardsRef.current.forEach((card, index) => {
        // Light reference (direct focus light in card markup)
        const light = card.querySelector(".focus-light");

        if (index === 0) {
          // Card 1 active at start
          switchTl.set(card, { opacity: 1 });
          switchTl.set(light, { opacity: 1 });
          
          // Card 1 Decents Out
          switchTl.to(card, { opacity: 0, duration: 1, ease: "power2.in" });
          switchTl.to(light, { opacity: 0, duration: 1, ease: "power2.in" }, "<");
          
        } else if (index === 1) {
          // Card 2 Appears (as 1 goes, matches parallel request)
          switchTl.fromTo(card, { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" }, "-=0.5");
          switchTl.to(light, { opacity: 1, duration: 1, ease: "power2.out" }, "<"); // Light focuses
          
          // Card 2 Decents Out
          switchTl.to(card, { opacity: 0, duration: 1, ease: "power2.in" });
          switchTl.to(light, { opacity: 0, duration: 1, ease: "power2.in" }, "<");
          
        } else if (index === 2) {
          // Card 3 Appears
          switchTl.fromTo(card, { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" }, "-=0.5");
          switchTl.to(light, { opacity: 1, duration: 1, ease: "power2.out" }, "<"); // Light focuses
        }
      });

    }, containerRef);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", () => {}); // Canvas resize not applicable to fixed height section setup
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100vh] w-full bg-white text-gray-900 overflow-hidden flex flex-col justify-center items-center">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white z-0" />

      {/* Heading */}
      <div className="relative z-10 mb-[-50px] w-full max-w-7xl px-8 flex justify-end">
        <h1 className="text-[6vw] font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-gray-950 to-gray-800 drop-shadow-[0_0_15px_rgba(0,0,0,0.1)]">
          AI APPS BUILT
        </h1>
      </div>

      {/* Sine Wave Background SVG */}
      <div className="absolute inset-0 z-5 flex items-center justify-center opacity-70">
        <svg viewBox="0 0 1000 500" className="w-full h-auto px-16" preserveAspectRatio="none">
          <path
            ref={sinePathRef}
            d="M 50 150 Q 200 450 350 150 Q 500 450 650 150 T 950 150"
            fill="none"
            stroke="#00f"
            strokeWidth="10"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0px 0px 20px #00f)" }}
          />

          {/* Numbers with white glows (background static numbers) */}
          <circle cx="345" cy="55" r="25" fill="#fff" style={{ filter: "drop-shadow(0px 0px 15px #fff)" }} />
          <circle cx="655" cy="55" r="25" fill="#fff" style={{ filter: "drop-shadow(0px 0px 15px #fff)" }} />
          <circle cx="775" cy="275" r="25" fill="#fff" style={{ filter: "drop-shadow(0px 0px 15px #fff)" }} />
        </svg>
      </div>

      {/* Trajectory Number */}
      <div ref={movingNumberRef} className="absolute z-15 p-2 rounded-full flex justify-center items-center opacity-0 preserve-3d" style={{ top: "0%", left: "0%" }}>
        <circle cx="25" cy="25" r="25" fill="black" stroke="white" strokeWidth="3" />
        <p className="absolute text-xl font-bold text-white">1</p>
      </div>

      {/* Cards Container */}
      <div className="relative z-20 flex justify-center items-center w-full max-w-[1200px] gap-12 mt-16 px-16 h-[500px]">
        {apps.map((app, index) => (
          <div
            key={app.id}
            ref={(el) => (cardsRef.current[index] = el!)}
            className="w-[450px] h-[550px] group preserve-3d cursor-pointer opacity-0 absolute"
            onClick={() => handleFlip(app.id)}
          >
            {/* Direct Focus Light (Neon Blue) */}
            <div className="focus-light absolute -inset-6 opacity-0 transition-opacity duration-300 pointer-events-none rounded-[40px] bg-blue-500/10" style={{ filter: "blur(20px)" }}/>
            <div className="focus-light absolute -inset-1 opacity-0 transition-opacity duration-300 pointer-events-none rounded-[40px] border-[5px] border-blue-400/30" style={{ filter: "drop-shadow(0px 0px 15px #00f)" }}/>
            
            {/* Card Inner (for Flip) */}
            <div className={`relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] preserve-3d ${flippedCards[app.id] ? "rotate-y-180" : ""}`}>
              
              {/* PRIMARY SIDE */}
              <div className="absolute inset-0 w-full h-full backface-hidden p-8 flex flex-col justify-between items-center rounded-3xl backdrop-blur-xl border border-white/20 shadow-[0_30px_80px_rgba(0,0,0,0.1)] transition-colors duration-500 hover:border-gray-200" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.1))" }}>
                {/* 80% Image */}
                <div className="w-full h-[80%] flex justify-center items-center overflow-hidden rounded-xl bg-gray-100 p-8 border border-gray-200">
                  <img src={app.imgSrc} alt={app.name} className="max-w-[70%] max-h-full object-contain" />
                </div>
                {/* 20% White Bold Heading */}
                <div className="w-full h-[20%] flex justify-end items-end">
                  <h2 className="text-[3.2rem] font-bold text-gray-950 pr-4 leading-none">{app.heading}</h2>
                </div>
              </div>

              {/* SECOND SIDE (Flipped Description) */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 p-10 flex flex-col justify-center items-start rounded-3xl backdrop-blur-3xl border border-gray-300 shadow-[0_30px_80px_rgba(0,0,0,0.15)] bg-gradient-to-br from-gray-100/70 to-white/30">
                <p className="text-xl font-bold text-gray-900 leading-relaxed pr-8">{app.description}</p>
                <div className="absolute bottom-6 right-6 text-sm text-blue-600 font-medium">Click to flip back</div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
        }
              
