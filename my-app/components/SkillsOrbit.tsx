
"use client";

import React, { useState, useEffect, useRef } from "react";

const SKILLS = [
  {
    name: "Python",
    color: "#3776ab",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14">
        <path d="M12.001 2c-2.733 0-3.218.118-4.225.297C6.012 2.613 5.378 3.513 5.378 5.485v2.85h6.697v.961H4.636c-2.612 0-3.376.843-3.376 3.036 0 2.213.626 2.89 2.502 3.197 1.05.172 1.547.245 4.153.245v-2.822c0-2.316.483-3.526 2.695-3.526h4.55c1.604 0 2.824-1.127 2.824-2.793V3.666c0-1.173-.551-1.666-1.558-1.666H12.001zm-.702 1.636c.451 0 .817.366.817.817 0 .451-.366.817-.817.817-.451 0-.817-.366-.817-.817 0-.451.366-.817.817-.817zM16.55 9.48v2.822c0 2.316-.483 3.526-2.695 3.526h-4.55c-1.604 0-2.824 1.127-2.824 2.793v2.967c0 1.173.551 1.666 1.558 1.666h4.554c2.733 0 3.218-.118 4.225-.297 1.764-.316 2.398-1.216 2.398-3.188v-2.85h-6.697v-.961h7.439c2.612 0 3.376-.843 3.376-3.036 0-2.213-.626-2.89-2.502-3.197-1.05-.172-1.547-.245-4.153-.245zm-3.847 9.884c.451 0 .817.366.817.817 0 .451-.366.817-.817.817-.451 0-.817-.366-.817-.817 0-.451.366-.817.817-.817z" />
      </svg>
    ),
  },
  {
    name: "C",
    color: "#283593",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.7 13.91c-1.05 1.05-2.45 1.57-3.86 1.57-1.4 0-2.8-.52-3.86-1.57-2.13-2.13-2.13-5.59 0-7.72 1.05-1.05 2.45-1.57 3.86-1.57 1.34 0 2.68.48 3.73 1.45l-1.92 1.92c-.49-.44-1.12-.66-1.81-.66-.69 0-1.38.26-1.91.79-1.05 1.05-1.05 2.76 0 3.81.53.53 1.22.79 1.91.79.68 0 1.31-.22 1.81-.66l1.91 1.85z" />
      </svg>
    ),
  },
  {
    name: "FastAPI",
    color: "#009688",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" fillOpacity="0.1" />
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    color: "#3ecf8e",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14">
        <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424A.396.396 0 0 0 2.522 13h9.478v8.604a.396.396 0 0 0 .716.233l9.081-12.261a.396.396 0 0 0-.435-.622z" />
      </svg>
    ),
  },
  {
    name: "Runway ML",
    color: "#111111",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14">
        <path d="M4 4h4v16H4V4zm6 0h4v16h-4V4zm6 0h4v16h-4V4z" />
      </svg>
    ),
  },
  {
    name: "Prompt Eng",
    color: "#8b5cf6",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" />
      </svg>
    ),
  },
  {
    name: "n8n",
    color: "#ff6d5a",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14">
        <path d="M12 2a4 4 0 0 0-4 4 4 4 0 0 0 .04.53L4.53 9.04A4 4 0 0 0 2 12a4 4 0 0 0 4 4 4 4 0 0 0 2.53-1.04l3.51 2.51A4 4 0 0 0 12 22a4 4 0 0 0 4-4 4 4 0 0 0-.04-.53l3.51-2.51A4 4 0 0 0 22 12a4 4 0 0 0-4-4 4 4 0 0 0-2.53 1.04l-3.51-2.51A4 4 0 0 0 12 2zm0 2a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2zm-6 6a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2zm12 0a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2zm-6 6a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2z" />
      </svg>
    ),
  },
  {
    name: "Full Stack",
    color: "#3b82f6",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14">
        <polygon points="12 2 2 7 12 12 22 7 12 2" fill="currentColor" fillOpacity="0.2" />
        <polyline points="2 12 12 17 22 12" />
        <polyline points="2 17 12 22 22 17" />
      </svg>
    ),
  },
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
        // Slow, elegant auto-rotation
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
    // Rotation sensitivity
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
      {/* ── Background Pattern ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)",
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
      </div>

      {/* ── 3D Interactive Carousel ── */}
      <div
        ref={containerRef}
        className="relative flex items-center justify-center w-full z-20"
        style={{
          height: "50vh",
          marginTop: "10vh",
          perspective: "1100px", // Crucial for 3D depth
          touchAction: "pan-y",   // Prevents screen scrolling while swiping the orbit
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
            // Tilt the cylinder down slightly (rotateX) so the depth is highly visible
            transform: `translateZ(-320px) rotateX(-5deg) rotateY(${rotation}deg)`,
            transition: autoSpinRef.current ? "transform 0.1s linear" : "none",
          }}
        >
          {SKILLS.map((skill, i) => {
            // 8 items = 45 degrees per item (360 / 8 = 45)
            const angle = i * 45;
            return (
              <div
                key={skill.name}
                className="absolute inset-0 flex flex-col items-center justify-center gap-5 rounded-3xl group"
                style={{
                  background: "rgba(255, 255, 255, 0.85)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1)",
                  // Pushes cards out to form the perfect 8-sided 3D cylinder
                  transform: `rotateY(${angle}deg) translateZ(320px)`,
                  // Allowing backface visibility so background cards pass behind beautifully
                  backfaceVisibility: "visible", 
                  userSelect: "none",
                  WebkitUserSelect: "none",
                }}
              >
                <div
                  className="transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                  style={{ color: skill.color }}
                >
                  {skill.svg}
                </div>
                <span className="text-gray-900 text-[11px] font-bold tracking-[0.15em] uppercase">
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
