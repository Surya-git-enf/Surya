
"use client";

import { useState } from "react";

const CREATIONS = [
  {
    title: "Spider-Man",
    sub: "Cinematic Scroll · GSAP",
    tag: "Awwwards",
    accent: "#e11d48",
    img: "/Spiderman.png",
  },
  {
    title: "Transformers",
    sub: "Canvas Sequence · Motion",
    tag: "Motion",
    accent: "#f97316",
    img: "/Transformers.png", 
  },
  {
    title: "Playful",
    sub: "AI Game Builder · FastAPI",
    tag: "SaaS",
    accent: "#3b82f6",
    img: "/Playful.png",
  },
  {
    title: "Ice Cream",
    sub: "3D Product Viewer · WebGL",
    tag: "Concept",
    accent: "#6b8c5a",
    img: "/Icecream.png",
  },
];

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://instagram.com/plauful_123",
    color: "#e1306c",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: "Discord",
    href: "https://discord.com",
    color: "#5865f2",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.13.14 18.2.204 18.244a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <footer
      id="3dwebsite"
      style={{
        position: "relative",
        width: "100%",
        background: "linear-gradient(180deg, #f5f7f2 0%, #e8ede3 100%)",
        overflow: "hidden",
        paddingBottom: "3rem",
      }}
    >
      {/* Auto-scrolling CSS */}
      <style>{`
        @keyframes scroll-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 10px)); } 
        }
        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      {/* Dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />

      {/* Ambient olive glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "60vw",
          height: "40vw",
          background: "radial-gradient(ellipse, rgba(107,140,90,0.14) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, paddingTop: "5rem" }}>
        {/* ── Section heading ── */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#6b8c5a", marginBottom: 12 }}>
            Portfolio
          </p>
          <h2
            style={{
              fontWeight: 900,
              fontSize: "clamp(2rem, 4vw, 4rem)",
              letterSpacing: "-0.03em",
              color: "#1a1a1a",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Recent Creations
          </h2>
          <div style={{ margin: "16px auto 0", width: 60, height: 2, borderRadius: 9999, background: "linear-gradient(90deg, transparent, #6b8c5a, transparent)" }} />
        </div>

        {/* ── Infinite Scrolling Carousel ── */}
        <div className="marquee-container" style={{ display: "flex", overflow: "hidden", width: "100%", paddingBottom: "5rem" }}>
          {/* We render the array twice to create the seamless infinite loop */}
          <div 
            className="marquee-track" 
            style={{ 
              display: "flex", 
              gap: "20px", 
              paddingLeft: "20px",
              width: "max-content",
              animation: "scroll-marquee 25s linear infinite" 
            }}
          >
            {[...CREATIONS, ...CREATIONS].map((c, i) => (
              <div
                key={`${c.title}-${i}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative",
                  width: "280px",
                  flexShrink: 0,
                  borderRadius: 20,
                  overflow: "hidden",
                  padding: "1.25rem",
                  background: hovered === i ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: hovered === i ? `1px solid ${c.accent}66` : "1px solid rgba(107,140,90,0.18)",
                  boxShadow: hovered === i ? `0 20px 50px rgba(0,0,0,0.08), 0 0 0 1px ${c.accent}22, 0 0 40px ${c.accent}18` : "0 4px 20px rgba(0,0,0,0.05)",
                  transform: hovered === i ? "translateY(-8px)" : "translateY(0)",
                  transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                  cursor: "pointer",
                }}
              >
                {/* Top accent bar */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${c.accent}, ${c.accent}88)`, borderRadius: "20px 20px 0 0" }} />

                {/* Requested Image Layout */}
                <div style={{ width: "100%", height: "140px", borderRadius: "12px", overflow: "hidden", marginBottom: "1rem", backgroundColor: "#f9fafb" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt={c.title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered === i ? "scale(1.05)" : "scale(1)", transition: "transform 0.5s ease" }} />
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontWeight: 900, fontSize: 16, color: "#111", lineHeight: 1.2 }}>{c.title}</span>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: c.accent,
                      background: `${c.accent}15`,
                      padding: "3px 8px",
                      borderRadius: 9999,
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    {c.tag}
                  </span>
                </div>
                <p style={{ fontSize: 12, color: "#666", fontWeight: 500, margin: 0 }}>{c.sub}</p>

                {/* Hover arrow */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: `${c.accent}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: hovered === i ? 1 : 0,
                    transform: hovered === i ? "scale(1)" : "scale(0.6)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke={c.accent} strokeWidth="2.5" style={{ width: 12, height: 12 }}>
                    <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto", height: 1, background: "linear-gradient(90deg, transparent, rgba(107,140,90,0.3), transparent)", marginBottom: "3rem" }} />

        {/* ── Bottom bar: fully centered ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            textAlign: "center",
          }}
        >
          {/* Social icons */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.name}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(0,0,0,0.07)",
                  color: s.color,
                  transition: "all 0.25s ease",
                  textDecoration: "none",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = s.color;
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
                  e.currentTarget.style.boxShadow = `0 8px 24px ${s.color}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.7)";
                  e.currentTarget.style.color = s.color;
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
                }}
              >
                {s.svg}
              </a>
            ))}
          </div>

          {/* Name + tagline */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <p style={{ fontWeight: 900, fontSize: 15, color: "#1a1a1a", margin: 0, letterSpacing: "-0.01em" }}>
              Surya Peddishetti
            </p>
            <p style={{ fontSize: 11, color: "#888", margin: 0, fontWeight: 500 }}>
              AI Engineer · Full-Stack · Motion
            </p>
          </div>

          <p style={{ fontSize: 11, color: "#aaa", margin: 0, fontWeight: 500 }}>
            © {new Date().getFullYear()} Surya Peddishetti · Built with Next.js & GSAP
          </p>
        </div>
      </div>
    </footer>
  );
}
