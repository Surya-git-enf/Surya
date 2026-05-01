
"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Panel data ──────────────────────────────────────────── */
const PANELS = [
  {
    label: "Personal",
    accentFrom: "#f97316",
    accentTo: "#3b82f6",
    badgeBg: "linear-gradient(135deg,#f97316,#fb923c)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="7" r="4" />
        <path d="M3 21c0-4 4-7 9-7s9 3 9 7" />
      </svg>
    ),
    lines: [
      { label: "Name",     value: "Surya Peddishetti" },
      { label: "Role",     value: "AI / Full-Stack Dev" },
      { label: "Location", value: "India 🇮🇳" },
      { label: "Status",   value: "Open to Opportunities" },
    ],
  },
  {
    label: "Education",
    accentFrom: "#22d3ee",
    accentTo: "#a855f7",
    badgeBg: "linear-gradient(135deg,#22d3ee,#a855f7)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 3L2 9l10 6 10-6-10-6z" />
        <path d="M2 9v6" />
        <path d="M6 12v5c2 1.5 8 1.5 12 0v-5" />
      </svg>
    ),
    lines: [
      { label: "Degree",     value: "B.Tech — CS" },
      { label: "University", value: "JNTUH" },
      { label: "Year",       value: "2025" },
      { label: "Focus",      value: "AI · Systems · Web" },
    ],
  },
  {
    label: "Hobbies",
    accentFrom: "#ec4899",
    accentTo: "#22d3ee",
    badgeBg: "linear-gradient(135deg,#ec4899,#22d3ee)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    lines: [
      { label: "Creative", value: "3D Design · Motion" },
      { label: "Build",    value: "AI Micro-SaaS" },
      { label: "Music",    value: "Synthwave · Lo-fi" },
      { label: "Sport",    value: "Cricket · Chess" },
    ],
  },
] as const;

const TOTAL_FRAMES = 384;
const FRAME_PATH = (n: number) => `/frames/${String(n).padStart(4, "0")}.jpg`;

/* horizontal positions for the three panels */
const PANEL_POSITIONS = [
  { left: "4%",  right: "auto", transform: "translateY(-50%)" },
  { left: "50%", right: "auto", transform: "translate(-50%,-50%)" },
  { left: "auto",right: "4%",  transform: "translateY(-50%)" },
];

export default function CanvasScroll() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const panelRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const frameIndex   = useRef({ value: 0 });
  const images       = useRef<HTMLImageElement[]>([]);
  const hasFrames    = useRef(false);

  /* ── Pre-load frames ── */
  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.onload = () => {
        loaded++;
        if (loaded === 1) {
          hasFrames.current = true;
          drawFrame(0);
        }
      };
      img.src = FRAME_PATH(i);
      imgs.push(img);
    }
    images.current = imgs;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function drawFrame(index: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = images.current[Math.max(0, Math.min(index, TOTAL_FRAMES - 1))];
    if (!ctx || !img || !img.complete || !img.naturalWidth) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const w = img.naturalWidth  * scale;
    const h = img.naturalHeight * scale;
    ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
  }

  /* ── GSAP + ScrollTrigger ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(Math.round(frameIndex.current.value));
    };
    resize();
    window.addEventListener("resize", resize);

    // Ensure panels start invisible
    panelRefs.current.forEach((el) => {
      if (el) { el.style.opacity = "0"; el.style.transform = `${el.dataset.baseTransform} translateY(100px)`; }
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=450%", // Extended scroll distance to hold the last panel longer
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      /* canvas scrub */
      tl.to(frameIndex.current, {
        value: TOTAL_FRAMES - 1,
        ease: "none",
        duration: 6,
        onUpdate: () => drawFrame(Math.round(frameIndex.current.value)),
      }, 0);

      /* Panel 1: in at t=0 → out at t=2 */
      tl.fromTo(panelRefs.current[0],
        { y: 100, opacity: 0 },
        { y: 0,   opacity: 1, duration: 0.8, ease: "power3.out" },
        0.2
      );
      tl.to(panelRefs.current[0],
        { y: -120, opacity: 0, duration: 0.7, ease: "power3.in" },
        2
      );

      /* Panel 2: in at t=2 → out at t=4 */
      tl.fromTo(panelRefs.current[1],
        { y: 100, opacity: 0 },
        { y: 0,   opacity: 1, duration: 0.8, ease: "power3.out" },
        2
      );
      tl.to(panelRefs.current[1],
        { y: -120, opacity: 0, duration: 0.7, ease: "power3.in" },
        4
      );

      /* Panel 3: in at t=4 → stays */
      tl.fromTo(panelRefs.current[2],
        { y: 100, opacity: 0 },
        { y: 0,   opacity: 1, duration: 0.8, ease: "power3.out" },
        4
      );
      
      /* ADDED BUFFER: Gives the user time to read panel 3 before it unpins */
      tl.set({}, {}, 7.5); 

    }, section);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", resize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* Solid dark bg — always visible even if frames fail to load */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: "linear-gradient(160deg,#050505 0%,#0d1117 50%,#000 100%)" }}
      />

      {/* Canvas — frame sequence on top of dark bg */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1] w-full h-full"
        style={{ objectFit: "cover" }}
      />

      {/* Vignette: dark edges, clear centre */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.6) 100%)",
            "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.4) 100%)",
          ].join(", "),
        }}
      />

      {/* ── Floating Panels ── */}
      {PANELS.map((panel, i) => (
        <div
          key={panel.label}
          ref={(el) => { panelRefs.current[i] = el; }}
          className="absolute z-10"
          style={{
            top: "50%",
            left: PANEL_POSITIONS[i].left,
            right: PANEL_POSITIONS[i].right,
            transform: PANEL_POSITIONS[i].transform,
            width: "clamp(240px, 24vw, 320px)",
            opacity: 0,
            background: `linear-gradient(145deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.06) 100%)`,
            backdropFilter: "blur(32px) saturate(180%)",
            WebkitBackdropFilter: "blur(32px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "24px",
            boxShadow: [
              `0 0 0 1px rgba(255,255,255,0.06)`,
              `0 8px 32px rgba(0,0,0,0.55)`,
              `0 32px 80px rgba(0,0,0,0.4)`,
              `inset 0 1px 0 rgba(255,255,255,0.2)`,
              `inset 0 -1px 0 rgba(0,0,0,0.3)`,
            ].join(", "),
          }}
        >
          {/* Coloured top stripe */}
          <div
            style={{
              height: "3px",
              borderRadius: "24px 24px 0 0",
              background: `linear-gradient(90deg, ${panel.accentFrom}, ${panel.accentTo})`,
            }}
          />

          <div className="flex flex-col gap-4 p-5">
            {/* Header row */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
                style={{
                  background: panel.badgeBg,
                  boxShadow: `0 4px 20px ${panel.accentFrom}55`,
                }}
              >
                {panel.icon}
              </div>
              <div>
                <p className="text-white/40 text-[9px] font-bold uppercase tracking-[0.25em]">
                  About me
                </p>
                <p className="text-white font-black text-base leading-tight tracking-wide">
                  {panel.label}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div
              className="h-px w-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${panel.accentFrom}60, ${panel.accentTo}60)`,
              }}
            />

            {/* Data rows */}
            <div className="flex flex-col gap-3">
              {panel.lines.map((row) => (
                <div key={row.label} className="flex justify-between items-start gap-4">
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.2em] flex-shrink-0 mt-px"
                    style={{ color: `${panel.accentFrom}bb` }}
                  >
                    {row.label}
                  </span>
                  <span className="text-white font-bold text-xs text-right leading-snug">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Accent pill at bottom */}
            <div
              className="self-start rounded-full px-3 py-0.5 text-[9px] font-black uppercase tracking-widest"
              style={{
                background: `linear-gradient(90deg, ${panel.accentFrom}22, ${panel.accentTo}22)`,
                border: `1px solid ${panel.accentFrom}44`,
                color: panel.accentFrom,
              }}
            >
              Surya · 2025
            </div>
          </div>

          {/* Glass glint overlay */}
          <div
            className="absolute inset-0 rounded-[24px] pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 45%)",
            }}
          />
        </div>
      ))}

      {/* Scroll indicator */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-white/40 text-[9px] font-bold tracking-[0.4em] uppercase">
          Scroll
        </span>
        <div
          className="w-px h-8 rounded-full"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)" }}
        />
      </div>
    </section>
  );
            }
