
"use client";

import React, { useState, useEffect, useRef } from "react";

const SKILLS = [
  { name: "Next.js", icon: "▲", color: "#000000" },
  { name: "React", icon: "⚛", color: "#06b6d4" },
  { name: "TypeScript", icon: "TS", color: "#3178c6" },
  { name: "Babylon.js", icon: "📦", color: "#f59e0b" },
  { name: "Python", icon: "🐍", color: "#3776ab" },
  { name: "FastAPI", icon: "⚡", color: "#059669" },
  { name: "GSAP", icon: "G", color: "#4ade80" },
  { name: "Tailwind", icon: "🌊", color: "#38bdf8" },
  { name: "Unreal Engine", icon: "UE", color: "#111111" },
];

export default function SkillsOrbit() {
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0);
  const autoSpinRef = useRef(true);
  const lastX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Smooth Animation Loop ──
  useEffect(() => {
    let animationFrameId: number;
    const loop = () => {
      if (autoSpinRef.current) {
        // Slow auto-rotation
        rotationRef.current -= 0.15;
        setRotation(rotationRef.current);
      }
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // ── Pointer Interaction (Mouse/Touch Drag) ──
  const handlePointerDown = (e: React.PointerEvent) => {
    autoSpinRef.current = false;
    lastX.current = e.clientX;
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
      containerRef.current.style.cursor = "grabbing";
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (autoSpinRef.current) return;
    const deltaX = e.clientX - lastX.current;
    // Adjust sensitivity here (0.4 is a smooth default)
    rotationRef.current += deltaX * 0.4;
    setRotation(rotationRef.current);
    lastX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    autoSpinRef.current = true;
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
      containerRef.current.style.cursor = "grab";
    }
  };

  return (
    <section
      id="techstack"
      className="relative w-full overflow-hidden flex flex-col items-center justify-center bg-[#fafafa]"
      style={{ height: "100vh" }}
    >
      {/* ── Background Grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Header Area ── */}
      <div className="absolute top-[12vh] flex flex-col items-center z-10 select-none text-center px-4">
        <h2
          className="font-black tracking-tight leading-none m-0"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 5rem)",
            background: "linear-gradient(135deg, #111827 0%, #3b82f6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          TECHSTACK
        </h2>
        <p className="mt-4 text-[11px] font-bold tracking-[0.3em] uppercase text-gray-500">
          Move your finger or mouse
        </p>
      </div>

      {/* ── "INFINITE ORBIT" Badge ── */}
      <div className="absolute top-[28vh] z-10 pointer-events-none">
        <div className="px-5 py-2 rounded-full bg-white border border-gray-200 shadow-sm backdrop-blur-md">
          <span className="text-[10px] font-black tracking-widest uppercase text-gray-800">
            Infinite Orbit
          </span>
        </div>
      </div>

      {/* ── 3D Interactive Carousel ── */}
      <div
        ref={containerRef}
        className="relative flex items-center justify-center w-full z-20"
        style={{
          height: "50vh",
          marginTop: "10vh",
          perspective: "1100px", // The crucial property for proper 3D depth
          touchAction: "none",   // Prevents screen from scrolling while spinning
          cursor: "grab",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="relative flex items-center justify-center"
          style={{
            width: "220px",
            height: "280px",
            transformStyle: "preserve-3d",
            // RotateX slightly tilts the cylinder so you can see the depth better
            transform: `translateZ(-350px) rotateX(-4deg) rotateY(${rotation}deg)`,
            transition: autoSpinRef.current ? "transform 0.1s linear" : "none",
          }}
        >
          {SKILLS.map((skill, i) => {
            // Calculate angle for 9 items (360 / 9 = 40 degrees)
            const angle = i * 40;
            return (
              <div
                key={skill.name}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-3xl"
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1)",
                  // Pushes each card out to form the cylinder
                  transform: `rotateY(${angle}deg) translateZ(350px)`,
                  // We let backface be visible so the cards in the back show through, adding to the depth illusion
                  backfaceVisibility: "visible", 
                  userSelect: "none",
                  WebkitUserSelect: "none",
                }}
              >
                <div
                  className="text-6xl font-black transition-transform duration-300 hover:scale-110"
                  style={{ color: skill.color }}
                >
                  {skill.icon}
                </div>
                <span className="text-gray-800 text-xs font-bold tracking-[0.15em] uppercase">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
    </section>
  );
}
