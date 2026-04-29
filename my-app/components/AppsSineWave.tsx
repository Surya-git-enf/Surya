
"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const appsData = [
  {
    id: 1,
    name: "Mailmate",
    desc: "An intelligent email agent that orchestrates your inbox. Mailmate seamlessly filters high-priority business correspondence from the noise, automating routine replies and instantly dispatching critical alerts directly to your Telegram.",
    position: "bottom-[15%] left-[10%]",
    // Massive envelope/AI hybrid icon
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-32 h-32 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/><circle cx="12" cy="13" r="2" fill="white"/></svg>
  },
  {
    id: 2,
    name: "Slide",
    desc: "Slide redefines content consumption. This AI-powered news aggregator distills complex articles from global publishers into precise, high-impact briefings. Stay informed and ahead of the curve across your tailored categories.",
    position: "top-[15%] left-[50%] -translate-x-1/2",
    // Massive layout/news icon
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-32 h-32 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
  },
  {
    id: 3,
    name: "Playful",
    desc: "Welcome to the future of game creation. Playful is an advanced AI game engine that transforms pure text prompts into fully playable, immersive gaming environments. Dream it, type it, play it.",
    position: "bottom-[15%] right-[10%]",
    // Massive controller/engine icon
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-32 h-32 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4"/><path d="M8 10v4"/><circle cx="15" cy="13" r="1.5" fill="white"/><circle cx="18" cy="11" r="1.5" fill="white"/></svg>
  }
];

export default function AppsSineWave() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});

  const toggleFlip = (id: number) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const section = sectionRef.current;
    const path = svgPathRef.current;

    if (section && path) {
      // 1. Draw the actual Sine Wave line as you scroll
      gsap.fromTo(path, 
        { strokeDashoffset: 2000, strokeDasharray: 2000 },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            scrub: 1.5,
          }
        }
      );

      // 2. Parallax stagger the cards floating upwards
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card, 
          { y: 200, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: `top+=${i * 25}% center`, 
              end: `top+=${(i + 1) * 25}% center`,
              scrub: 1,
            }
          }
        );
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[150vh] bg-black">
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        
        {/* The Giant Background Wave */}
        <svg className="absolute w-full h-full pointer-events-none" viewBox="0 0 1000 500" preserveAspectRatio="none">
          <path 
            ref={svgPathRef} 
            d="M -100 400 Q 250 50 500 250 T 1100 100" 
            fill="none" 
            stroke="rgba(255,255,255,0.15)" 
            strokeWidth="4" 
            strokeLinecap="round" 
            style={{ filter: "drop-shadow(0px 0px 10px rgba(255,255,255,0.3))" }}
          />
        </svg>

        {/* The 3D Flip Cards */}
        {appsData.map((app, index) => (
          <div 
            key={app.id} 
            ref={(el) => { cardsRef.current[index] = el; }} 
            className={`absolute ${app.position} w-[320px] h-[420px] perspective-[1500px] group cursor-pointer`}
            onClick={() => toggleFlip(app.id)}
          >
            {/* The 3D Inner Wrapper */}
            <div 
              className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ease-[cubic-bezier(0.16,1,0.3,1)] ${flippedCards[app.id] ? '[transform:rotateY(180deg)]' : ''}`}
            >
              
              {/* FRONT: Pure SVG, No Text, Transparent Glass */}
              <div className="absolute inset-0 [backface-visibility:hidden] bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl flex flex-col items-center justify-center p-6 shadow-[0_0_30px_rgba(255,255,255,0.02)] transition-colors duration-500 group-hover:border-white/30 group-hover:bg-white/5">
                <div className="text-white/80 group-hover:text-white transition-colors duration-500 scale-90 group-hover:scale-100 transition-transform">
                  {app.svg}
                </div>
                
                {/* Subtle hint to flip */}
                <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-white/10 transition-all">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21v-5h5"/></svg>
                </div>
              </div>

              {/* BACK: Deep Glassmorphism, App Details */}
              <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white/10 backdrop-blur-2xl border border-white/30 rounded-3xl flex flex-col items-start justify-center p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <h3 className="text-3xl font-bold text-white mb-6 tracking-wide">{app.name}</h3>
                <p className="text-base text-gray-200/90 leading-relaxed font-light">
                  {app.desc}
                </p>
                
                {/* Close Flip Button */}
                <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
                }
