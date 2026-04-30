
"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 384;
const getFrameSrc = (i: number) =>
  `/sequence/frame_${String(i).padStart(4, "0")}.jpg`;

export default function CanvasScroll() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const panel1Ref = useRef<HTMLDivElement | null>(null);
  const panel2Ref = useRef<HTMLDivElement | null>(null);
  const panel3Ref = useRef<HTMLDivElement | null>(null);

  const images = useRef<HTMLImageElement[]>([]);
  const frame = useRef({ value: 1 });

  useLayoutEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const section = sectionRef.current!;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const loadImage = (i: number) => {
      const img = new Image();
      img.src = getFrameSrc(i);
      images.current[i] = img;
    };

    for (let i = 1; i <= FRAME_COUNT; i++) loadImage(i);

    const render = () => {
      const img = images.current[frame.current.value];
      if (!img) return;

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;

      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let x = 0;
      let y = 0;

      if (imgRatio > canvasRatio) {
        drawHeight = canvas.height;
        drawWidth = drawHeight * imgRatio;
        x = (canvas.width - drawWidth) / 2;
      } else {
        drawWidth = canvas.width;
        drawHeight = drawWidth / imgRatio;
        y = (canvas.height - drawHeight) / 2;
      }

      // Deep gradient background
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, "#000000");
      grad.addColorStop(1, "#111111");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(img, x, y, drawWidth, drawHeight);
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=350%",
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          frame.current.value = Math.floor(
            self.progress * (FRAME_COUNT - 1)
          );
          render();
        },
      },
    });

    // Panel Animations
    tl.fromTo(
      panel1Ref.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .to(panel1Ref.current, {
        y: -200,
        opacity: 0,
        duration: 1,
      })
      .fromTo(
        panel2Ref.current,
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "<"
      )
      .to(panel2Ref.current, {
        y: -200,
        opacity: 0,
        duration: 1,
      })
      .fromTo(
        panel3Ref.current,
        { y: 140, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "<"
      )
      .to(panel3Ref.current, {
        y: -200,
        opacity: 0,
        duration: 1,
      });

    return () => {
      ScrollTrigger.killAll();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const panelBase =
    "absolute w-[400px] p-10 rounded-3xl border border-white/20 backdrop-blur-xl text-white font-bold shadow-[0_30px_80px_rgba(0,0,0,0.4)]";

  return (
    <section ref={sectionRef} className="relative h-[400vh] bg-white">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full"
      />

      {/* PANEL 1 */}
      <div
        ref={panel1Ref}
        className={`${panelBase} left-[10%] top-[30%]`}
        style={{
          background:
            "linear-gradient(135deg, rgba(255,115,0,0.6), rgba(0,102,255,0.6))",
        }}
      >
        <div className="absolute top-4 left-4 bg-black rounded-full p-4">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
            <circle cx="12" cy="8" r="4" fill="currentColor" />
            <path
              d="M4 20c2-4 14-4 16 0"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="mt-16 space-y-2">
          <h2 className="text-2xl">PEDDISHETTI SURYA</h2>
          <p>Age: 20 years</p>
          <p>
            I build full stack AI apps and design immersive 3D
            websites that convert visitors into customers.
          </p>
        </div>
      </div>

      {/* PANEL 2 */}
      <div
        ref={panel2Ref}
        className={`${panelBase} right-[10%] top-[35%]`}
        style={{
          background:
            "linear-gradient(135deg, rgba(0,255,255,0.5), rgba(128,0,255,0.6))",
        }}
      >
        <div className="absolute top-4 left-4 bg-black rounded-full p-4">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
            <path
              d="M2 10l10-5 10 5-10 5-10-5z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="mt-16 space-y-2">
          <h2 className="text-2xl">EDUCATION</h2>
          <p>Diploma in ECE</p>
          <p>ESC Govt Polytechnic College</p>
          <p>2023 - 2026</p>
        </div>
      </div>

      {/* PANEL 3 */}
      <div
        ref={panel3Ref}
        className={`${panelBase} left-[50%] -translate-x-1/2 top-[40%]`}
        style={{
          background:
            "linear-gradient(135deg, rgba(255,0,150,0.6), rgba(0,255,180,0.6))",
        }}
      >
        <div className="absolute top-4 left-4 bg-black rounded-full p-4">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
            <path
              d="M4 12a8 8 0 0116 0"
              stroke="white"
              strokeWidth="2"
            />
            <rect x="3" y="12" width="4" height="8" fill="white" />
            <rect x="17" y="12" width="4" height="8" fill="white" />
          </svg>
        </div>

        <div className="mt-16 space-y-2">
          <h2 className="text-2xl">HOBBIES</h2>
          <p>
            Listening to music, Learning coding, Watching movies
          </p>
        </div>
      </div>
    </section>
  );
}
