
"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Pure, massive SVGs - No text
const skillsData = [
  {
    name: "Python",
    color: "rgba(59, 130, 246, 0.8)", // Blue glow
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
  },
  {
    name: "FastAPI",
    color: "rgba(16, 185, 129, 0.8)", // Emerald glow
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  },
  {
    name: "n8n",
    color: "rgba(239, 68, 68, 0.8)", // Red glow
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
  },
  {
    name: "C Coding",
    color: "rgba(139, 92, 246, 0.8)", // Purple glow
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
  },
  {
    name: "3D Web Design",
    color: "rgba(236, 72, 153, 0.8)", // Pink glow
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
  },
  {
    name: "Supabase",
    color: "rgba(34, 197, 94, 0.8)", // Green glow
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
  },
  {
    name: "Prompt Engineering",
    color: "rgba(234, 179, 8, 0.8)", // Yellow glow
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
  },
  {
    name: "Full Stack",
    color: "rgba(6, 182, 212, 0.8)", // Cyan glow
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
  }
];

export default function SkillsOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const carousel = carouselRef.current;

    if (container && carousel) {
      // Connect rotation strictly to the user's scroll
      gsap.to(carousel, {
        rotateY: -360, // Negative for a smoother right-to-left feel
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5, // The 1.5 gives it that fluid "magnetic" delay
        }
      });
    }
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100vh] flex items-center justify-center bg-black overflow-hidden perspective-1200">
      
      {/* Central Core Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      {/* The 3D Rotating Cylinder Container */}
      <div ref={carouselRef} className="relative w-[200px] h-[200px] preserve-3d">
        {skillsData.map((skill, index) => {
          // Calculate exact angle to fan them out perfectly in 3D space
          const angle = (360 / skillsData.length) * index;
          
          return (
            <div
              key={index}
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center group"
              style={{
                transform: `rotateY(${angle}deg) translateZ(350px)`,
              }}
            >
              {/* The Glass Box - Perfectly square, thick glass, insane hover dynamics */}
              <div 
                className="relative w-32 h-32 rounded-3xl bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-125 group-hover:-translate-y-4 group-hover:bg-white/10 group-hover:border-white/30"
                style={{
                  boxShadow: `0 0 0 rgba(0,0,0,0)`, // Default no shadow
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 20px 50px ${skill.color}, inset 0 0 20px ${skill.color}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 rgba(0,0,0,0)`;
                }}
              >
                {/* SVG Icon Container */}
                <div className="text-white/70 group-hover:text-white transition-colors duration-500">
                  {skill.svg}
                </div>
                
                {/* Under-card Reflection (Optional but incredibly premium) */}
                <div className="absolute -bottom-8 left-0 w-full h-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-sm flex items-center justify-center" style={{ transform: 'scaleY(-1)' }}>
                  <div className="text-white">{skill.svg}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
