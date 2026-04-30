
"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 384;

function frameSrc(index: number) {
  const padded = String(index).padStart(4, "0");
  return `/sequence/frame_${padded}.jpg`;
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number
) {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = canvasW / canvasH;

  let drawW = canvasW;
  let drawH = canvasH;
  let dx = 0;
  let dy = 0;

  if (imgRatio > canvasRatio) {
    drawH = canvasH;
    drawW = canvasH * imgRatio;
    dx = (canvasW - drawW) / 2;
  } else {
    drawW = canvasW;
    drawH = canvasW / imgRatio;
    dy = (canvasH - drawH) / 2;
  }

  ctx.clearRect(0, 0, canvasW, canvasH);
  ctx.drawImage(img, dx, dy, drawW, drawH);
}

export default function CanvasScroll() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const panel1Ref = useRef<HTMLDivElement | null>(null);
  const panel2Ref = useRef<HTMLDivElement | null>(null);
  const panel3Ref = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const stateRef = useRef({ frame: 1 });

  const frames = useMemo(
    () => Array.from({ length: FRAME_COUNT }, (_, i) => frameSrc(i + 1)),
    []
  );

  useEffect(() => {
    let mounted = true;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const img = imagesRef.current[stateRef.current.frame - 1];
      if (img?.complete) {
        drawCover(ctx, img, rect.width, rect.height);
      }
    };

    const loadSequence = async () => {
      const loaders = frames.map((src) => {
        return new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(img);
          img.onerror = () => resolve(img);
        });
      });

      const loaded = await Promise.all(loaders);
      if (!mounted) return;
      imagesRef.current = loaded;

      const first = loaded[0];
      if (first?.complete) {
        const rect = canvas.getBoundingClientRect();
        drawCover(ctx, first, rect.width, rect.height);
      }
      resizeCanvas();
      ScrollTrigger.refresh();
    };

    loadSequence();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      mounted = false;
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [frames]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const canvas = canvasRef.current;
      const p1 = panel1Ref.current;
      const p2 = panel2Ref.current;
      const p3 = panel3Ref.current;
      if (!section || !canvas || !p1 || !p2 || !p3) return;

      const renderFrame = (frame: number) => {
        const img = imagesRef.current[frame - 1];
        if (!img || !img.complete) return;
        const rect = canvas.getBoundingClientRect();
        const c = canvas.getContext("2d");
        if (!c) return;
        drawCover(c, img, rect.width, rect.height);
      };

      const state = stateRef.current;

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=4200",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate(self) {
            const frame = Math.max(
              1,
              Math.min(FRAME_COUNT, Math.floor(self.progress * (FRAME_COUNT - 1)) + 1)
            );
            if (frame !== state.frame) {
              state.frame = frame;
              renderFrame(frame);
            }
          },
        },
      });

      master
        .fromTo(
          p1,
          { opacity: 0, y: 80, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.18 },
          0.08
        )
        .to(p1, { opacity: 0, y: -90, scale: 0.96, duration: 0.18 }, 0.42)
        .fromTo(
          p2,
          { opacity: 0, y: 80, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.18 },
          0.55
        )
        .to(p2, { opacity: 0, y: -90, scale: 0.96, duration: 0.18 }, 0.90)
        .fromTo(
          p3,
          { opacity: 0, y: 80, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.18 },
          1.00
        )
        .to(p3, { opacity: 0, y: -100, scale: 0.96, duration: 0.2 }, 1.36);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#050505_0%,#111111_50%,#050505_100%)]"
      style={{ perspective: "1200px" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.07),transparent_36%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.04),transparent_40%)]" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ objectFit: "cover" }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.48))]" />

      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="relative w-full max-w-6xl">
          <div
            ref={panel1Ref}
            className="absolute left-0 top-[12%] w-[min(28rem,92vw)] rounded-[2rem] border border-white/15 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_40px_120px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.08), 0 24px 70px rgba(0,0,0,0.55), 0 0 80px rgba(250,204,21,0.22)",
            }}
          >
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.18),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_40%)]" />
            <div className="relative">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/40 shadow-[0_0_24px_rgba(250,204,21,0.25)]">
                <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill="none">
                  <path
                    d="M4 18L9 13L13 15L20 7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 11V7H16"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 6V18H20"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="text-2xl font-bold tracking-[-0.03em] text-white">
                Peddishetti Surya
              </div>
              <div className="mt-2 text-sm text-white/70">Age: 20 years</div>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/78">
                I build full stack AI apps and design immersive 3D websites that convert visitors into customers.
              </p>
            </div>
          </div>

          <div
            ref={panel2Ref}
            className="absolute left-1/2 top-[35%] w-[min(30rem,92vw)] -translate-x-1/2 rounded-[2rem] border border-white/15 bg-white/5 p-6 backdrop-blur-2xl"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.08), 0 24px 70px rgba(0,0,0,0.55), 0 0 80px rgba(34,211,238,0.22)",
            }}
          >
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_42%)]" />
            <div className="relative">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/40 shadow-[0_0_24px_rgba(34,211,238,0.3)]">
                <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill="none">
                  <path
                    d="M10.5 18a6.5 6.5 0 1 1 4.9-2.2L20 20"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-2xl font-bold tracking-[-0.03em] text-white">Education</div>
              <div className="mt-2 text-sm text-white/72">Diploma in ECE</div>
              <div className="mt-1 text-sm text-white/72">ESC Govt Polytechnic College</div>
              <div className="mt-1 text-sm text-white/72">2023 - 2026</div>
            </div>
          </div>

          <div
            ref={panel3Ref}
            className="absolute right-0 top-[58%] w-[min(32rem,92vw)] rounded-[2rem] border border-white/15 bg-white/5 p-6 backdrop-blur-2xl"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.08), 0 24px 70px rgba(0,0,0,0.55), 0 0 80px rgba(244,114,182,0.22)",
            }}
          >
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,rgba(244,114,182,0.16),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_42%)]" />
            <div className="relative">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/40 shadow-[0_0_24px_rgba(244,114,182,0.3)]">
                <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill="none">
                  <path
                    d="M5 12l4 4 10-10"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-2xl font-bold tracking-[-0.03em] text-white">Hobbies</div>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/78">
                Listening to music, Learning coding, Watching movies
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
                             }
