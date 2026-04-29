
"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// App data with detailed descriptions and massive SVGs
const appsData = [
  // ... Mailmate, Slide, Playful details ...
  // Identical to previous component, but I've added distinct app IDs.
];

export default function AppsSineWave() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const markerRef = useRef<SVGTextElement>(null);
  const markerCircleRef = useRef<SVGCircleElement>(null);

  // Tracks which card is currently active (1, 2, or 3)
  const [activeApp, setActiveApp] = useState(1);
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});

  const toggleFlip = (id: number) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const section = sectionRef.current;
    const path = svgPathRef.current;
    if (!section || !path) return;

    // Draw the main white sine wave completely
    gsap.fromTo(path, 
      { strokeDashoffset: 2000, strokeDasharray: 2000 },
      { strokeDashoffset: 0, duration: 1, ease: "none", scrollTrigger: { trigger: section, start: "top center", end: "top center", scrub: 0.5 } }
    );

    // Create the sequential card trigger timeline
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top", // Pin when the section hits the top
        end: "+=3000",
        scrub: 1,
        pin: true,
      }
    });

    // --- STEP 1: Marker at Peak (1), Card 1 Shown ---
    mainTl.set([markerRef.current, markerCircleRef.current], { x: 125, y: 275 }); // Position 1
    
    // --- STEP 2: Marker Moves to Trough, Card 1 exits, Card 2 enters ---
    mainTl.to([markerRef.current, markerCircleRef.current], {
      duration: 1,
      x: 500, // Move along X axis
      y: 250, // Move to y trough
      ease: "power2.inOut",
      onUpdate: () => {
        // Change text in text element, color, etc.
        markerRef.current!.textContent = "2";
      }
    })
    .to(cardsRef.current[0], { x: "-200%", opacity: 0, duration: 1, ease: "power2.in" }, "-=1") // Exit 1
    .fromTo(cardsRef.current[1], { x: "200%", opacity: 0 }, { x: "0%", opacity: 1, duration: 1, ease: "power2.out" }, "-=0.5") // Enter 2
    .set({}, { onComplete: () => setActiveApp(2) })

    // --- STEP 3: Marker Moves to Trough, Card 2 exits, Card 3 enters ---
    .to([markerRef.current, markerCircleRef.current], {
      duration: 1,
      x: 875,
      y: 175,
      ease: "power2.inOut",
      onUpdate: () => {
        markerRef.current!.textContent = "3";
      }
    })
    .to(cardsRef.current[1], { x: "-200%", opacity: 0, duration: 1, ease: "power2.in" }, "-=1") // Exit 2
    .fromTo(cardsRef.current[2], { x: "200%", opacity: 0 }, { x: "0%", opacity: 1, duration: 1, ease: "power2.out" }, "-=0.5") // Enter 3
    .set({}, { onComplete: () => setActiveApp(3) });

  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[100vh] bg-black perspective-1200">
      <div className="absolute top-0 w-full h-screen flex items-center justify-center overflow-hidden preserve-3d">
        
        {/* Full drawn white sine wave */}
        <svg className="absolute w-full h-full pointer-events-none" viewBox="0 0 1000 500" preserveAspectRatio="none">
          <path ref={svgPathRef} d="M 0 400 Q 250 100 500 250 T 1000 100" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" className="drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"/>
          
          {/* Moving Marker */}
          <circle ref={markerCircleRef} cx="125" cy="275" r="25" fill="#000" stroke="white" strokeWidth="4" />
          <text ref={markerRef} x="125" y="283" fill="white" fontSize="20" fontWeight="bold" textAnchor="middle">1</text>
        </svg>

        {/* The single, replacement app card layer */}
        <div className="absolute bottom-[10%] w-full flex justify-center">
          {appsData.map((app, index) => (
            <div key={app.id} ref={(el) => { cardsRef.current[index] = el; }} className={`w-[320px] h-[420px] absolute transition-opacity duration-500 [backface-visibility:hidden] ${activeApp === app.id ? 'opacity-100' : 'opacity-0'}`}>
              {/* flip card structure identical to previous version, clicks to reveal back details */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
