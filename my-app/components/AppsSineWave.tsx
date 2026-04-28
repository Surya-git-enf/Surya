"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const apps = [
  {
    id: 1,
    name: "Mailmate",
    desc: "An intelligent email agent that orchestrates your inbox. Mailmate seamlessly filters high-priority business correspondence from the noise, automating routine replies and instantly dispatching critical alerts directly to your Telegram. Your inbox, fully optimized.",
    position: "bottom-10 left-[10%]"
  },
  {
    id: 2,
    name: "Slide",
    desc: "Slide redefines content consumption. This AI-powered news aggregator distills complex articles from global publishers into precise, high-impact briefings. Stay informed and ahead of the curve across your tailored categories, without the clutter.",
    position: "top-10 left-[45%]"
  },
  {
    id: 3,
    name: "Playful",
    desc: "Welcome to the future of game creation. Playful is an advanced AI game engine that transforms pure text prompts into fully playable, immersive gaming environments. Dream it, type it, play it.",
    position: "bottom-10 right-[10%]"
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
      // Draw the SVG wave on scroll
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        }
      });

      // Reveal cards one by one (Parallax effect)
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card, 
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: `top+=${i * 30}% center`,
              end: `top+=${(i + 1) * 30}% center`,
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
        
        {/* The Thick White Sine Wave SVG */}
        <svg className="absolute w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="none">
          <path 
            ref={svgPathRef}
            d="M 0 400 Q 250 100 500 250 T 1000 100" 
            fill="none" 
            stroke="white" 
            strokeWidth="8" 
            strokeLinecap="round"
            className="path-line opacity-50"
          />
          {/* Numbers on the peaks/troughs */}
          <circle cx="125" cy="275" r="25" fill="#000" stroke="white" strokeWidth="4" />
          <text x="125" y="283" fill="white" fontSize="20" fontWeight="bold" textAnchor="middle">1</text>

          <circle cx="500" cy="250" r="25" fill="#000" stroke="white" strokeWidth="4" />
          <text x="500" y="258" fill="white" fontSize="20" fontWeight="bold" textAnchor="middle">2</text>

          <circle cx="875" cy="175" r="25" fill="#000" stroke="white" strokeWidth="4" />
          <text x="875" y="183" fill="white" fontSize="20" fontWeight="bold" textAnchor="middle">3</text>
        </svg>

        {/* The Flip Cards */}
        {apps.map((app, index) => (
          <div 
            key={app.id}
            ref={(el) => { cardsRef.current[index] = el }}
            className={`absolute ${app.position} w-[300px] h-[400px] flip-card`}
          >
            <div className={`flip-card-inner ${flippedCards[app.id] ? 'flipped' : ''}`}>
              
              {/* FRONT OF CARD */}
              <div className="flip-card-front bg-black border border-white/20 flex flex-col items-center justify-center p-6 relative">
                <div className="w-24 h-24 bg-white/10 rounded-2xl mb-6 flex items-center justify-center">
                  <span className="text-white/50 text-sm">Logo</span>
                </div>
                <h3 className="text-3xl font-bold text-white">{app.name}</h3>
                
                {/* Flip Trigger Button */}
                <button 
                  onClick={() => toggleFlip(app.id)}
                  className="absolute bottom-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21v-5h5"/></svg>
                </button>
              </div>

              {/* BACK OF CARD (GLASSMORPHISM DESCRIPTION) */}
              <div className="flip-card-back bg-white/10 backdrop-blur-xl border border-white/30 flex flex-col items-start justify-center p-8 relative">
                <h3 className="text-2xl font-bold text-white mb-4">{app.name}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{app.desc}</p>
                
                {/* Flip Trigger Button */}
                <button 
                  onClick={() => toggleFlip(app.id)}
                  className="absolute bottom-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

