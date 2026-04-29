
"use client";
import { useRef, useState } from "react";

const galleryItems = [
  {
    id: "transformers",
    label: "Transformers",
    color: "#f97316",
    glow: "rgba(249,115,22,0.6)",
    emoji: "🤖",
    icon: (
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <rect x="18" y="8" width="24" height="20" rx="4" stroke="white" strokeOpacity="0.85" strokeWidth="2.5"/>
        <circle cx="24" cy="16" r="3" fill="white" fillOpacity="0.9"/>
        <circle cx="36" cy="16" r="3" fill="white" fillOpacity="0.9"/>
        <rect x="12" y="30" width="36" height="16" rx="4" stroke="white" strokeOpacity="0.85" strokeWidth="2.5"/>
        <line x1="8" y1="34" x2="12" y2="38" stroke="white" strokeOpacity="0.7" strokeWidth="2.5"/>
        <line x1="8" y1="38" x2="12" y2="42" stroke="white" strokeOpacity="0.7" strokeWidth="2.5"/>
        <line x1="52" y1="34" x2="48" y2="38" stroke="white" strokeOpacity="0.7" strokeWidth="2.5"/>
        <line x1="52" y1="38" x2="48" y2="42" stroke="white" strokeOpacity="0.7" strokeWidth="2.5"/>
        <line x1="22" y1="46" x2="22" y2="56" stroke="white" strokeOpacity="0.7" strokeWidth="2.5"/>
        <line x1="38" y1="46" x2="38" y2="56" stroke="white" strokeOpacity="0.7" strokeWidth="2.5"/>
        <line x1="30" y1="28" x2="30" y2="30" stroke="white" strokeOpacity="0.6" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    id: "spiderman",
    label: "Spider-Man",
    color: "#ef4444",
    glow: "rgba(239,68,68,0.6)",
    emoji: "🕷️",
    icon: (
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <circle cx="30" cy="30" r="18" stroke="white" strokeOpacity="0.85" strokeWidth="2.5"/>
        <path d="M12 30 Q30 18 48 30 Q30 42 12 30Z" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" fill="none"/>
        <line x1="30" y1="12" x2="30" y2="48" stroke="white" strokeOpacity="0.6" strokeWidth="1.5"/>
        <line x1="4" y1="14" x2="56" y2="46" stroke="white" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 3"/>
        <line x1="56" y1="14" x2="4" y2="46" stroke="white" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 3"/>
        <circle cx="30" cy="30" r="4" fill="white" fillOpacity="0.9"/>
      </svg>
    ),
  },
  {
    id: "icecream",
    label: "Ice Cream",
    color: "#ec4899",
    glow: "rgba(236,72,153,0.6)",
    emoji: "🍦",
    icon: (
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M20 32 Q14 24 14 20 A16 16 0 0 1 46 20 Q46 24 40 32z" stroke="white" strokeOpacity="0.85" strokeWidth="2.5" fill="none"/>
        <path d="M20 32 L30 56 L40 32z" stroke="white" strokeOpacity="0.85" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
        <circle cx="23" cy="22" r="4" fill="white" fillOpacity="0.4"/>
        <circle cx="33" cy="18" r="4" fill="white" fillOpacity="0.4"/>
      </svg>
    ),
  },
  {
    id: "mouse",
    label: "Mouse",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.6)",
    emoji: "🖱️",
    icon: (
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <rect x="18" y="10" width="24" height="36" rx="12" stroke="white" strokeOpacity="0.85" strokeWidth="2.5"/>
        <line x1="30" y1="10" x2="30" y2="28" stroke="white" strokeOpacity="0.5" strokeWidth="2"/>
        <circle cx="30" cy="22" r="3.5" fill="white" fillOpacity="0.9"/>
      </svg>
    ),
  },
];

const socialLinks = [
  {
    id: "whatsapp",
    href: "https://wa.me/",
    color: "#22c55e",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.555 4.126 1.527 5.861L.057 23.563a.5.5 0 0 0 .598.656l5.87-1.537A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.935 9.935 0 0 1-5.13-1.418l-.368-.22-3.48.913.928-3.382-.24-.381A9.933 9.933 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
    ),
  },
  {
    id: "instagram",
    href: "https://instagram.com/peddisetti_surya",
    color: "#ec4899",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    id: "discord",
    href: "https://discord.com/",
    color: "#7c3aed",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const [hovered, setHovered] = useState<string | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <footer className="relative py-24 overflow-hidden bg-black border-t border-white/5">
      {/* Top gradient */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), rgba(236,72,153,0.4), transparent)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* Gallery Section label */}
        <p
          className="text-center text-white/20 tracking-[0.45em] uppercase mb-8"
          style={{ fontFamily: "'DM Mono', monospace", fontSize: 10 }}
        >
          Interests Gallery
        </p>

        {/* Gallery Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {galleryItems.map((item, i) => {
            const isHov = hovered === item.id;
            return (
              <button
                key={item.id}
                ref={(el) => { itemRefs.current[i] = el; }}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                className="group relative flex items-center gap-3 px-6 py-4 rounded-2xl cursor-pointer"
                style={{
                  background: isHov
                    ? `rgba(${hexToRgb(item.color)}, 0.12)`
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isHov ? item.color + "88" : "rgba(255,255,255,0.08)"}`,
                  boxShadow: isHov
                    ? `0 0 30px 4px ${item.glow}, 0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)`
                    : "inset 0 1px 0 rgba(255,255,255,0.03)",
                  backdropFilter: "blur(20px)",
                  transform: isHov ? "translateY(-4px) scale(1.04)" : "none",
                  transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                {/* 3D perspective glow overlay */}
                {isHov && (
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at 50% 0%, ${item.color}22 0%, transparent 70%)`,
                    }}
                  />
                )}

                <div
                  style={{
                    filter: isHov ? `drop-shadow(0 0 8px ${item.color})` : "none",
                    transition: "filter 0.35s ease",
                    color: "white",
                  }}
                >
                  {item.icon}
                </div>

                <span
                  className="font-medium"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 13,
                    color: isHov ? item.color : "rgba(255,255,255,0.6)",
                    transition: "color 0.3s ease",
                    letterSpacing: "0.05em",
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div
          className="mb-10 mx-auto"
          style={{
            width: "100%",
            maxWidth: 400,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
          }}
        />

        {/* Social icons */}
        <div className="flex justify-center gap-5 mb-8">
          {socialLinks.map((link) => {
            const isHov = hovered === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHovered(link.id)}
                onMouseLeave={() => setHovered(null)}
                className="flex items-center justify-center rounded-xl transition-all duration-300"
                style={{
                  width: 44,
                  height: 44,
                  background: isHov
                    ? `rgba(${hexToRgb(link.color)}, 0.15)`
                    : "rgba(255,255,255,0.04)",
                  border: `1px solid ${isHov ? link.color + "66" : "rgba(255,255,255,0.07)"}`,
                  color: isHov ? link.color : "rgba(255,255,255,0.4)",
                  boxShadow: isHov ? `0 0 18px 2px ${link.color}44` : "none",
                  transform: isHov ? "translateY(-3px) scale(1.1)" : "none",
                  transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                {link.svg}
              </a>
            );
          })}
        </div>

        {/* Copyright */}
        <p
          className="text-center text-white/20"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.2em",
          }}
        >
          © @peddisetti surya
        </p>
      </div>
    </footer>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
