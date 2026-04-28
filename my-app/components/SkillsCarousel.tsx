
"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Array of objects with your exact skills and premium inline SVGs
const skillsData = [
  {
    name: "Python",
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
  },
  {
    name: "FastAPI",
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  },
  {
    name: "n8n",
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
  },
  {
    name: "C Coding",
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
  },
  {
    name: "3D Web Design",
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
  },
  {
    name: "Supabase",
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
  },
  {
    name: "Prompt Engineering",
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
  },
  {
    name: "Full Stack",
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
  }
];

export default function SkillsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const carousel = carouselRef.current;

    if (container && carousel) {
      gsap.to(carousel, {
        rotateY: 360,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top center",
          end: "+=1000",
          scrub: 1,
        }
      });
    }
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100vh] flex items-center justify-center bg-black overflow-hidden perspective-1200">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div ref={carouselRef} className="relative w-[300px] h-[400px] preserve-3d">
        {skillsData.map((skill, index) => {
          const angle = (360 / skillsData.length) * index;
          return (
            <div
              key={index}
              className="absolute top-0 left-0 w-full h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              style={{
                transform: `rotateY(${angle}deg) translateZ(400px)`,
                WebkitBoxReflect: "below 5px linear-gradient(transparent, transparent, rgba(0,0,0,0.4))"
              }}
            >
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-white mb-6">
                <div className="w-10 h-10">{skill.svg}</div>
              </div>
              <h3 className="text-2xl font-bold text-white">{skill.name}</h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}
