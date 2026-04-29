
"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CanvasScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Panel Refs
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    // Responsive Canvas Sizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Image Sequence Setup (384 frames = 16 sec at 24fps)
    const frameCount = 384; 
    const currentFrame = (index: number) => 
      `/sequence/frame_${(index + 1).toString().padStart(4, '0')}.jpg`;

    const images: HTMLImageElement[] = [];
    const airpods = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    images[0].onload = () => context.drawImage(images[0], 0, 0, canvas.width, canvas.height);

    // --- GSAP TIMELINES ---
    
    // 1. The Video Scrub Timeline
    gsap.to(airpods, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: "top top",
        end: "+=4000", // The total scroll distance (controls video speed)
        scrub: 0.5,
      },
      onUpdate: () => {
        if (images[airpods.frame]) {
          // Clear and draw image stretching to cover screen (object-cover style)
          context.clearRect(0, 0, canvas.width, canvas.height);
          const hRatio = canvas.width / images[airpods.frame].width;
          const vRatio = canvas.height / images[airpods.frame].height;
          const ratio = Math.max(hRatio, vRatio);
          const centerShift_x = (canvas.width - images[airpods.frame].width * ratio) / 2;
          const centerShift_y = (canvas.height - images[airpods.frame].height * ratio) / 2;  
          context.drawImage(images[airpods.frame], 0, 0, images[airpods.frame].width, images[airpods.frame].height,
                             centerShift_x, centerShift_y, images[airpods.frame].width * ratio, images[airpods.frame].height * ratio);
        }
      }
    });

    // 2. The Staggered Panels Timeline
    // We use a separate timeline locked to the same container to control exact reveal timings
    const panelTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=4000",
        scrub: 1,
      }
    });

    // Panel 1 (Yellow) fades in, floats up, then holds
    panelTl.fromTo(panel1Ref.current, 
      { y: 150, opacity: 0, scale: 0.95 }, 
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
    )
    .to(panel1Ref.current, { y: -50, duration: 2, ease: "none" }) // slow parallax drift while next one comes
    
    // Panel 2 (Blue) comes in
    .fromTo(panel2Ref.current, 
      { y: 150, opacity: 0, scale: 0.95 }, 
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
      "-=1.5" // Overlap so it feels continuous
    )
    .to(panel2Ref.current, { y: -50, duration: 2, ease: "none" })
    
    // Panel 3 (Pink) comes in
    .fromTo(panel3Ref.current, 
      { y: 150, opacity: 0, scale: 0.95 }, 
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
      "-=1.5"
    )
    .to(panel3Ref.current, { y: -50, duration: 2, ease: "none" });

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    // The container height is managed by the ScrollTrigger pin, so h-screen is fine here
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
      
      {/* The 3D Video Canvas */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      {/* The Floating UI Layer */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-center max-w-7xl mx-auto px-8">
        
        {/* PANEL 1: Personal (Yellow Glow) */}
        <div 
          ref={panel1Ref} 
          className="absolute left-[5%] top-[25%] w-[400px] p-8 rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(234,179,8,0.15)] relative overflow-hidden group opacity-0"
        >
          {/* Subtle inner radial gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(234,179,8,0.1),transparent_50%)]" />
          <h2 className="relative z-10 text-4xl font-light text-white tracking-wide mb-2">Peddishetti <span className="font-bold">Surya</span></h2>
          <p className="relative z-10 text-yellow-500 font-mono text-xs uppercase tracking-[0.2em] mb-6">Age: 20 years</p>
          <p className="relative z-10 text-gray-300/80 leading-relaxed font-light text-lg">
            I build full stack AI apps and design immersive 3D websites that convert visitors into customers.
          </p>
        </div>

        {/* PANEL 2: Education (Blue Glow) */}
        <div 
          ref={panel2Ref} 
          className="absolute right-[5%] top-[45%] w-[400px] p-8 rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(6,182,212,0.15)] relative overflow-hidden group opacity-0"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.1),transparent_50%)]" />
          <h2 className="relative z-10 text-sm text-cyan-400 font-mono uppercase tracking-[0.2em] mb-6">Education</h2>
          <div className="relative z-10 space-y-2">
            <p className="text-2xl text-white font-medium">Diploma in ECE</p>
            <p className="text-gray-400 text-base font-light">ESC Govt Polytechnic College</p>
            <div className="inline-block mt-4 px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs tracking-wider">
              2023 - 2026
            </div>
          </div>
        </div>

        {/* PANEL 3: Hobbies (Pink Glow) */}
        <div 
          ref={panel3Ref} 
          className="absolute left-[10%] bottom-[15%] w-[400px] p-8 rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(236,72,153,0.15)] relative overflow-hidden group opacity-0"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.1),transparent_50%)]" />
          <h2 className="relative z-10 text-sm text-pink-400 font-mono uppercase tracking-[0.2em] mb-6">Hobbies</h2>
          <ul className="relative z-10 space-y-4 text-gray-300/90 font-light text-lg">
            <li className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center border border-pink-500/20 text-pink-400">🎧</span> 
              Listening to music
            </li>
            <li className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center border border-pink-500/20 text-pink-400">💻</span> 
              Learning coding
            </li>
            <li className="flex items-center gap-4">
              <span className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center border border-pink-500/20 text-pink-400">🎬</span> 
              Watching movies
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}
