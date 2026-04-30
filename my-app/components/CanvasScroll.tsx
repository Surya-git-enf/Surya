
"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Panel data ─────────────────────────────────────────── */
const PANELS = [
  {
    label: "Personal",
    gradient: "linear-gradient(135deg, rgba(251,146,60,0.85) 0%, rgba(59,130,246,0.85) 100%)",
    border: "rgba(255,255,255,0.25)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
    lines: [
      { label: "Name", value: "Surya Peddishetti" },
      { label: "Role", value: "AI / Full-Stack Developer" },
      { label: "Location", value: "India 🇮🇳" },
      { label: "Status", value: "Open to Opportunities" },
    ],
  },
  {
    label: "Education",
    gradient: "linear-gradient(135deg, rgba(34,211,238,0.85) 0%, rgba(168,85,247,0.85) 100%)",
    border: "rgba(255,255,255,0.25)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 3L2 9l10 6 10-6-10-6z" />
        <path d="M2 9v6" />
        <path d="M6 11.5V17c2 1.5 8 1.5 12 0v-5.5" />
      </svg>
    ),
    lines: [
      { label: "Degree", value: "B.Tech — Computer Science" },
      { label: "University", value: "JNTUH" },
      { label: "Graduation", value: "2025" },
      { label: "Focus", value: "AI · Systems · Web" },
    ],
  },
  {
    label: "Hobbies",
    gradient: "linear-gradient(135deg, rgba(236,72,153,0.85) 0%, rgba(34,211,238,0.85) 100%)",
    border: "rgba(255,255,255,0.25)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    lines: [
      { label: "Creative", value: "3D Design · Motion" },
      { label: "Tech", value: "Building AI Micro-SaaS" },
      { label: "Music", value: "Synthwave · Lo-fi" },
      { label: "Sport", value: "Cricket · Chess" },
    ],
  },
] as const;

const TOTAL_FRAMES = 384;
const FRAME_PATH = (n: number) =>
  `/frames/${String(n).padStart(4, "0")}.jpg`;

export default function CanvasScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameIndex = useRef({ value: 0 });
  const images = useRef<HTMLImageElement[]>([]);

  /* Pre-load all frames */
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      imgs.push(img);
    }
    images.current = imgs;

    // Draw first frame once loaded
    imgs[0].onload = () => drawFrame(0);
  }, []);

  function drawFrame(index: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = images.current[index];
    if (!ctx || !img || !img.complete) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Cover-fit
    const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
  }

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Resize canvas to fill section
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(frameIndex.current.value);
    };
    resize();
    window.addEventListener("resize", resize);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=350%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      /* ── Canvas frame scrub ── */
      tl.to(
        frameIndex.current,
        {
          value: TOTAL_FRAMES - 1,
          snap: { value: 1 },
          ease: "none",
          onUpdate: () => drawFrame(Math.round(frameIndex.current.value)),
          duration: 6,
        },
        0
      );

      /* ── Panel 1: rise in → stay → rise out ── */
      tl.fromTo(
        panelRefs.current[0],
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        0
      );
      tl.to(
        panelRefs.current[0],
        { y: -200, opacity: 0, duration: 1, ease: "power3.in" },
        2
      );

      /* ── Panel 2: rise in → stay → rise out ── */
      tl.fromTo(
        panelRefs.current[1],
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        2
      );
      tl.to(
        panelRefs.current[1],
        { y: -200, opacity: 0, duration: 1, ease: "power3.in" },
        4
      );

      /* ── Panel 3: rise in → stay ── */
      tl.fromTo(
        panelRefs.current[2],
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        4
      );
    }, section);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* Dark canvas bg gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: "linear-gradient(180deg,#000 0%,#111 100%)" }}
      />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full object-cover"
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* ── Panels ── */}
      {PANELS.map((panel, i) => (
        <div
          key={panel.label}
          ref={(el) => { panelRefs.current[i] = el; }}
          className="absolute z-10 flex flex-col gap-4 rounded-2xl p-6"
          style={{
            top: "50%",
            left: i === 0 ? "6%" : i === 1 ? "50%" : "auto",
            right: i === 2 ? "6%" : "auto",
            transform: "translateY(-50%)",
            width: "clamp(260px, 28vw, 360px)",
            opacity: 0,
            background: panel.gradient,
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: `1px solid ${panel.border}`,
            boxShadow: "0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="bg-black rounded-full w-9 h-9 flex items-center justify-center flex-shrink-0 shadow-lg">
              {panel.icon}
            </div>
            <span className="text-white font-black text-xl tracking-wide">
              {panel.label}
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/20 rounded-full" />

          {/* Data rows */}
          <div className="flex flex-col gap-2.5">
            {panel.lines.map((row) => (
              <div key={row.label} className="flex justify-between items-start gap-2">
                <span className="text-white/60 font-semibold text-xs uppercase tracking-widest flex-shrink-0 mt-0.5">
                  {row.label}
                </span>
                <span className="text-white font-bold text-sm text-right leading-snug">
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Inner glint */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)",
            }}
          />
        </div>
      ))}

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60">
        <span className="text-white text-xs font-semibold tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
          }
