
"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
  {
    label: "Personal",
    accentFrom: "#f97316",
    accentTo: "#3b82f6",
    badgeBg: "linear-gradient(135deg,#f97316,#fb923c)",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <circle cx="12" cy="7" r="4" />
        <path d="M3 21c0-4 4-7 9-7s9 3 9 7" />
      </svg>
    ),
    lines: [
      { label: "Name", value: "Surya Peddishetti" },
      { label: "Role", value: "AI / Full-Stack Dev" },
      { label: "Location", value: "India 🇮🇳" },
      { label: "Status", value: "Open to Opportunities" },
    ],
  },
  {
    label: "Education",
    accentFrom: "#22d3ee",
    accentTo: "#a855f7",
    badgeBg: "linear-gradient(135deg,#22d3ee,#a855f7)",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M12 3L2 9l10 6 10-6-10-6z" />
        <path d="M2 9v6" />
        <path d="M6 12v5c2 1.5 8 1.5 12 0v-5" />
      </svg>
    ),
    lines: [
      { label: "Degree", value: "B.Tech — CS" },
      { label: "University", value: "JNTUH" },
      { label: "Year", value: "2025" },
      { label: "Focus", value: "AI · Systems · Web" },
    ],
  },
  {
    label: "Hobbies",
    accentFrom: "#ec4899",
    accentTo: "#22d3ee",
    badgeBg: "linear-gradient(135deg,#ec4899,#22d3ee)",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    lines: [
      { label: "Creative", value: "3D Design · Motion" },
      { label: "Build", value: "AI Micro-SaaS" },
      { label: "Music", value: "Synthwave · Lo-fi" },
      { label: "Sport", value: "Cricket · Chess" },
    ],
  },
] as const;

const TECH_STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "GSAP",
  "Tailwind",
  "Node.js",
  "Python",
  "OpenAI",
  "MongoDB",
  "PostgreSQL",
  "Firebase",
  "Framer Motion",
];

export default function CanvasScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const techRef = useRef<HTMLDivElement>(null);
  const techTitleRef = useRef<HTMLHeadingElement>(null);
  const techChipRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.set(textRef.current, { opacity: 1, y: 0, filter: "blur(0px)" });
      }

      cardRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 90, scale: 0.92, rotateX: 8 });
      });

      if (techRef.current) {
        gsap.set(techRef.current, { opacity: 0, y: 60, scale: 0.96 });
      }

      if (techTitleRef.current) {
        gsap.set(techTitleRef.current, { opacity: 0, y: 22 });
      }

      techChipRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 18, scale: 0.92 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=1900%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      tl.to(textRef.current, {
        opacity: 0,
        y: -40,
        filter: "blur(10px)",
        duration: 0.8,
        ease: "power2.inOut",
      }, 0.15);

      tl.to(cardRefs.current[0], {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.8,
        ease: "power3.out",
      }, 0.9);

      tl.to(cardRefs.current[1], {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.8,
        ease: "power3.out",
      }, 1.85);

      tl.to(cardRefs.current[2], {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.8,
        ease: "power3.out",
      }, 2.8);

      tl.to(cardRefs.current, {
        y: -18,
        duration: 1.8,
        ease: "none",
      }, 3.6);

      tl.to(cardRefs.current, {
        opacity: 0,
        y: -95,
        scale: 0.95,
        stagger: 0.08,
        duration: 0.9,
        ease: "power2.inOut",
      }, 5.15);

      tl.to(techRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
      }, 5.55);

      tl.to(techTitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      }, 5.72);

      tl.to(techChipRefs.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.06,
        duration: 0.55,
        ease: "power3.out",
      }, 5.9);

      tl.to(techRef.current, {
        y: -12,
        duration: 1.6,
        ease: "none",
      }, 7.2);
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="personal"
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", background: "#000" }}
    >
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover scale-[1.02]"
        src="/bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0) 30%), linear-gradient(to bottom, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.22) 50%, rgba(0,0,0,0.76) 100%)",
        }}
      />

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute right-[-8%] top-[15%] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-[-12%] left-[18%] h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        <div
          ref={textRef}
          className="absolute text-center flex flex-col items-center gap-4 px-6"
        >
          <h2
            className="font-black leading-none text-white"
            style={{ fontSize: "clamp(2.8rem, 6vw, 6.2rem)" }}
          >
            Hey 👋, I&apos;m Surya
          </h2>
          <p className="text-white/60 font-medium tracking-[0.35em] uppercase text-sm md:text-base">
            Scroll to discover
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-7 px-[4vw] w-full">
          {PANELS.map((panel, i) => (
            <div
              key={panel.label}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="pointer-events-auto flex-shrink-0 flex flex-col relative overflow-hidden"
              style={{
                width: "clamp(240px, 24vw, 330px)",
                background:
                  "linear-gradient(145deg, rgba(18,18,22,0.95) 0%, rgba(8,8,12,0.98) 100%)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                border: `1px solid ${panel.accentFrom}44`,
                borderRadius: "24px",
                boxShadow:
                  `0 24px 60px rgba(0,0,0,0.78), 0 0 0 1px ${panel.accentFrom}18, inset 0 1px 0 rgba(255,255,255,0.05)`,
                transition:
                  "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease, border-color 0.35s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
                e.currentTarget.style.boxShadow =
                  `0 35px 75px rgba(0,0,0,0.92), 0 0 32px ${panel.accentFrom}44, 0 0 0 1px ${panel.accentFrom}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow =
                  `0 24px 60px rgba(0,0,0,0.78), 0 0 0 1px ${panel.accentFrom}18, inset 0 1px 0 rgba(255,255,255,0.05)`;
              }}
            >
              <div
                style={{
                  height: "3px",
                  background: `linear-gradient(90deg, ${panel.accentFrom}, ${panel.accentTo})`,
                }}
              />
              <div className="flex flex-col gap-4 p-5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: panel.badgeBg,
                      boxShadow: `0 8px 24px ${panel.accentFrom}44`,
                    }}
                  >
                    {panel.icon}
                  </div>
                  <div>
                    <p className="text-white/35 text-[9px] font-bold uppercase tracking-[0.35em]">
                      About me
                    </p>
                    <p className="text-white font-black text-lg leading-tight">
                      {panel.label}
                    </p>
                  </div>
                </div>

                <div
                  className="h-px w-full"
                  style={{
                    background: `linear-gradient(90deg, ${panel.accentFrom}44, ${panel.accentTo}44)`,
                  }}
                />

                <div className="flex flex-col gap-3">
                  {panel.lines.map((row) => (
                    <div key={row.label} className="flex justify-between items-start gap-3">
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest flex-shrink-0 mt-0.5"
                        style={{ color: `${panel.accentFrom}cc` }}
                      >
                        {row.label}
                      </span>
                      <span className="text-white/82 font-medium text-xs text-right leading-relaxed">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={techRef}
          className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none px-6"
        >
          <div
            className="w-full max-w-5xl rounded-[34px] border border-white/10 bg-white/6 backdrop-blur-2xl shadow-2xl"
            style={{
              boxShadow: "0 30px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <div className="px-6 py-7 md:px-10 md:py-9">
              <h2
                ref={techTitleRef}
                className="text-center font-black text-white opacity-0"
                style={{ fontSize: "clamp(2.4rem, 5vw, 5rem)" }}
              >
                Tech Stack
              </h2>

              <p className="mt-3 text-center text-white/60 text-sm md:text-base tracking-[0.25em] uppercase">
                Tools I use to build fast, clean, and playful products
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3 md:gap-4">
                {TECH_STACK.map((tech, i) => (
                  <div
                    key={tech}
                    ref={(el) => {
                      techChipRefs.current[i] = el;
                    }}
                    className="pointer-events-auto rounded-2xl border border-white/12 bg-black/30 px-4 py-3 text-sm md:text-base font-semibold text-white/90 shadow-lg backdrop-blur-xl"
                    style={{
                      boxShadow:
                        "0 12px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
                    }}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
