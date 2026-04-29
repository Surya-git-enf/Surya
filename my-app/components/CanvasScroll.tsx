
"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CanvasScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // 1. CANVAS SETUP (Synchronized Scrolling)
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const frameCount = 384; 
    const currentFrame = (index: number) => `/sequence/frame_${(index + 1).toString().padStart(4, '0')}.jpg`;

    const images: HTMLImageElement[] = [];
    const sequenceObj = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    images[0].onload = () => context.drawImage(images[0], 0, 0, canvas.width, canvas.height);

    // Scrub through frames tied to scroll
    gsap.to(sequenceObj, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: "top top",
        end: "+=4000",
        scrub: 0.5,
      },
      onUpdate: () => {
        if (images[sequenceObj.frame]) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          // stretching logic omitted for brevity, identical to previous version
        }
      }
    });

    // 2. PANEL TIMELINE (Sequential, Rise Animation)
    const panelTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=4000",
        scrub: 1,
      }
    });

    // We cycle through each panel, creating an enter/float/exit rise sequence.
    panelsRef.current.forEach((panel, i) => {
      if (!panel) return;

      panelTl.fromTo(panel, 
        { y: 150, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
      )
      .to(panel, { y: -50, duration: 2, ease: "none" }) // slow parallax drift while next one comes
      
      // The crucial exit rise animation as the card disappears
      .to(panel, { 
        y: -300, 
        opacity: 0, 
        duration: 1, 
        ease: "power2.in",
        stagger: 0.2 // stagger for overlap feel
      }, "-=0.5"); // Start exit slightly before next enter finishes
    });

  }, []);

  // Panel data omitted for brevity, identical content to previous version
  const panelsData = [/* ... same as personal, education, hobbies panels ... */];

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden perspective-1200">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-center max-w-7xl mx-auto px-8">
        {panelsData.map((panel, i) => (
          <div key={i} ref={(el) => { panelsRef.current[i] = el; }} className={`absolute ${panel.position} w-[400px] p-8 rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/10 opacity-0`}>
            {/* panel content ... */}
          </div>
        ))}
      </div>
    </section>
  );
}
