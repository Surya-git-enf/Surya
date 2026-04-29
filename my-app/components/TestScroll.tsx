"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CanvasScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Panel Refs for Parallax
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    // Set Canvas Size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const frameCount = 384; // 16 seconds at 24fps
    const currentFrame = (index: number) => 
      `/sequence/frame_${(index + 1).toString().padStart(4, '0')}.jpg`;

    const images: HTMLImageElement[] = [];
    const airpods = { frame: 0 };

    // Preload Images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    // Render first frame on load
    images[0].onload = () => context.drawImage(images[0], 0, 0, canvas.width, canvas.height);

    // Master Timeline for pinning the section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: "top top",
        end: "+=4000", // Scroll length dictates video speed
        scrub: 0.5, // Slight smooth scrub for the video
      }
    });

    // Animate Video Frames
    tl.to(airpods, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: () => {
        if (images[airpods.frame]) {
          context.drawImage(images[airpods.frame], 0, 0, canvas.width, canvas.height);
        }
      }
    });

    // PARALLAX FLOATING PANELS LOGIC
    // Panel 1: Yellow (Personal)
    gsap.fromTo(panel1Ref.current, 
      { y: 200, opacity: 0 }, 
      { y: -200, opacity: 1, ease: "none", scrollTrigger: {
          trigger: containerRef.current, start: "top top", end: "+=1200", scrub: true
      }}
    );

    // Panel 2: Blue (Education)
    gsap.fromTo(panel2Ref.current, 
      { y: 200, opacity: 0 }, 
      { y: -200, opacity: 1, ease: "none", scrollTrigger: {
          trigger: containerRef.current, start: "top+1200 top", end: "+=1200", scrub: true
      }}
    );

    // Panel 3: Pink (Hobbies)
    gsap.fromTo(panel3Ref.current, 
      { y: 200, opacity: 0 }, 
      { y: -200, opacity: 1, ease: "none", scrollTrigger: {
          trigger: containerRef.current, start: "top+2400 top", end: "+=1200", scrub: true
      }}
    );

  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full object-cover" />

      {/* OVERLAY PANELS */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-center max-w-7xl mx-auto px-8 relative">
        
        {/* Panel 1: Personal */}
        <div ref={panel1Ref} className="absolute left-10 top-1/3 w-[350px] p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.1)]">
          <h2 className="text-3xl font-bold text-white mb-2">Peddishetti Surya</h2>
          <p className="text-yellow-400 font-mono text-sm mb-4">Age: 20 years</p>
          <p className="text-gray-300 leading-relaxed">I build full stack AI apps and I design immersive 3D websites that convert visitors into customers.</p>
        </div>

        {/* Panel 2: Education */}
        <div ref={panel2Ref} className="absolute right-10 top-1/2 w-[350px] p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.1)] opacity-0">
          <h2 className="text-2xl font-bold text-white mb-4">Education</h2>
          <div className="space-y-2">
            <p className="text-cyan-400 font-semibold">Diploma in ECE</p>
            <p className="text-gray-300 text-sm">ESC Govt Polytechnic College</p>
            <p className="text-gray-500 text-sm font-mono">2023 - 2026</p>
          </div>
        </div>

        {/* Panel 3: Hobbies */}
        <div ref={panel3Ref} className="absolute left-10 bottom-1/4 w-[350px] p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.1)] opacity-0">
          <h2 className="text-2xl font-bold text-white mb-4">Hobbies</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center gap-3">🎧 Listening to music</li>
            <li className="flex items-center gap-3">💻 Learning coding</li>
            <li className="flex items-center gap-3">🎬 Watching movies</li>
          </ul>
        </div>

      </div>
    </section>
  );
}

