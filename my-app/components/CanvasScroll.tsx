
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 384;
const FRAME_PATH = (i: number) =>
  `/sequence/frame_${String(i).padStart(4, "0")}.jpg`;

const panels = [
  {
    id: "personal",
    title: "Peddishetti Surya",
    lines: ["Age: 20", "I build full stack AI apps and design immersive 3D websites that convert visitors into customers."],
    glowColor: "rgba(250,204,21,0.55)",
    borderColor: "rgba(250,204,21,0.35)",
    accentColor: "#facc15",
    delay: 0,
  },
  {
    id: "education",
    title: "Diploma in ECE",
    lines: ["ESC Govt Polytechnic College", "2023 – 2026"],
    glowColor: "rgba(59,130,246,0.55)",
    borderColor: "rgba(59,130,246,0.35)",
    accentColor: "#3b82f6",
    delay: 0.18,
  },
  {
    id: "hobbies",
    title: "Interests",
    lines: ["🎵 Listening to music", "💻 Learning coding", "🎬 Watching movies"],
    glowColor: "rgba(236,72,153,0.55)",
    borderColor: "rgba(236,72,153,0.35)",
    accentColor: "#ec4899",
    delay: 0.36,
  },
];

export default function CanvasScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };

    const drawFrame = (index: number) => {
      const img = framesRef.current[Math.max(0, Math.min(index, TOTAL_FRAMES - 1))];
      if (img && img.complete) {
        ctx2d.clearRect(0, 0, canvas.width, canvas.height);
        // Cover-fit the image
        const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
        const w = img.naturalWidth * scale;
        const h = img.naturalHeight * scale;
        ctx2d.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
      }
    };

    // Preload frames with priority (first 60, then rest)
    const loadFrames = () => {
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = FRAME_PATH(i);
        img.onload = () => {
          if (i === 1) drawFrame(0);
        };
        framesRef.current[i - 1] = img;
      }
    };

    resize();
    loadFrames();
    window.addEventListener("resize", resize);

    // ScrollTrigger for canvas scrub
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        const frame = Math.round(self.progress * (TOTAL_FRAMES - 1));
        if (frame !== currentFrameRef.current) {
          currentFrameRef.current = frame;
          drawFrame(frame);
        }
      },
    });

    // Staggered panel reveals
    panelRefs.current.forEach((panel, i) => {
      if (!panel) return;
      gsap.fromTo(
        panel,
        { y: 80, opacity: 0, filter: "blur(12px)", scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 1.0,
          ease: "cubic-bezier(0.16,1,0.3,1)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `${20 + i * 22}% center`,
            end: `${40 + i * 22}% center`,
            scrub: false,
            toggleActions: "play none none reverse",
          },
          delay: panels[i].delay,
        }
      );
    });

    return () => {
      st.kill();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "400vh" }}
    >
      {/* Sticky canvas + panels wrapper */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Image sequence canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover" }}
        />

        {/* Dark overlay so panels read well */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Panels container */}
        <div className="absolute inset-0 flex items-end justify-center pb-12 px-6 pointer-events-none">
          <div className="w-full max-w-5xl flex flex-col sm:flex-row gap-4 sm:gap-6 items-end justify-center">
            {panels.map((panel, i) => (
              <div
                key={panel.id}
                ref={(el) => { panelRefs.current[i] = el; }}
                className="pointer-events-auto flex-1 min-w-0 group cursor-default"
                style={{ opacity: 0 }}
              >
                <div
                  className="relative rounded-2xl p-5 sm:p-6 overflow-hidden transition-all duration-500"
                  style={{
                    background: "rgba(10,10,10,0.55)",
                    backdropFilter: "blur(28px) saturate(160%)",
                    WebkitBackdropFilter: "blur(28px) saturate(160%)",
                    border: `1px solid ${panel.borderColor}`,
                    boxShadow: `0 0 0 0 ${panel.glowColor}, inset 0 1px 0 rgba(255,255,255,0.06)`,
                    transition: "box-shadow 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px 8px ${panel.glowColor}, 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)`;
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px) scale(1.01)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${panel.glowColor}, inset 0 1px 0 rgba(255,255,255,0.06)`;
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
                  }}
                >
                  {/* Noise texture overlay */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-[0.03]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                    }}
                  />

                  {/* Accent top bar */}
                  <div
                    className="absolute top-0 left-6 right-6 h-px rounded-full"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${panel.accentColor}, transparent)`,
                      opacity: 0.7,
                    }}
                  />

                  {/* Panel number */}
                  <span
                    className="text-xs font-mono mb-3 block"
                    style={{ color: panel.accentColor, letterSpacing: "0.2em", opacity: 0.7, fontFamily: "'DM Mono', monospace" }}
                  >
                    0{i + 1}
                  </span>

                  {/* Title */}
                  <h3
                    className="font-bold text-white mb-3 leading-tight"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "clamp(18px, 2.5vw, 26px)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {panel.title}
                  </h3>

                  {/* Lines */}
                  <div className="space-y-1.5">
                    {panel.lines.map((line, j) => (
                      <p
                        key={j}
                        className="text-white/60 leading-relaxed"
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "clamp(11px, 1.2vw, 13px)",
                        }}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
