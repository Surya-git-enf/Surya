"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "Python", "FastAPI", "n8n", "C Coding",
  "3D Web Design", "Supabase", "Prompt Engineering", "Full Stack Developer"
];

export default function SkillsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const carousel = carouselRef.current;

    if (container && carousel) {
      // Rotate the entire carousel based on scroll
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
      {/* Background Neon Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* 3D Carousel */}
      <div ref={carouselRef} className="relative w-[300px] h-[400px] preserve-3d">
        {skills.map((skill, index) => {
          const angle = (360 / skills.length) * index;
          return (
            <div
              key={index}
              className="absolute top-0 left-0 w-full h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
              style={{
                transform: `rotateY(${angle}deg) translateZ(400px)`,
                WebkitBoxReflect: "below 5px linear-gradient(transparent, transparent, rgba(0,0,0,0.4))"
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">{skill}</h3>
              {/* Add your SVG Icons here based on the skill name */}
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-xs text-white/50">ICON</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

