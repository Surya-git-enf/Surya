"use client";

const CARD_COUNT     = 9;
const ANGLE_PER_CARD = 360 / CARD_COUNT;
const RADIUS         = 400;

const skills = [
  {
    name: "Python",
    glow: "#3b82f6",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <defs>
          <linearGradient id="py1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4B8BBE" /><stop offset="100%" stopColor="#306998" />
          </linearGradient>
          <linearGradient id="py2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFE873" /><stop offset="100%" stopColor="#FFD43B" />
          </linearGradient>
        </defs>
        <path d="M32 4C20.4 4 21.2 9.2 21.2 9.2L21.22 14.6H32.2V16H15.6C15.6 16 8 15.12 8 27.04C8 38.96 14.76 38.6 14.76 38.6H18.8V33C18.8 33 18.52 26.24 25.36 26.24H35.68C35.68 26.24 42.16 26.34 42.16 20.08V10.48C42.16 10.48 43.12 4 32 4Z" fill="url(#py1)" />
        <circle cx="28.4" cy="10" r="2" fill="#fff" opacity="0.85" />
        <path d="M32 60C43.6 60 42.8 54.8 42.8 54.8L42.78 49.4H31.8V48H48.4C48.4 48 56 48.88 56 36.96C56 25.04 49.24 25.4 49.24 25.4H45.2V31C45.2 31 45.48 37.76 38.64 37.76H28.32C28.32 37.76 21.84 37.66 21.84 43.92V53.52C21.84 53.52 20.88 60 32 60Z" fill="url(#py2)" />
        <circle cx="35.6" cy="54" r="2" fill="#fff" opacity="0.7" />
      </svg>
    ),
  },
  {
    name: "FastAPI",
    glow: "#10b981",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <defs>
          <linearGradient id="fapi" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#059669" /><stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="28" fill="url(#fapi)" opacity="0.12" />
        <circle cx="32" cy="32" r="28" stroke="url(#fapi)" strokeWidth="2" />
        <path d="M36 10L22 34H32L28 54L46 28H34L36 10Z" fill="url(#fapi)" />
      </svg>
    ),
  },
  {
    name: "n8n",
    glow: "#f97316",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <defs>
          <linearGradient id="n8n1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EA4B00" /><stop offset="100%" stopColor="#FF6D3A" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="32" r="7" fill="url(#n8n1)" />
        <circle cx="32" cy="16" r="7" fill="url(#n8n1)" />
        <circle cx="52" cy="32" r="7" fill="url(#n8n1)" />
        <circle cx="32" cy="48" r="7" fill="url(#n8n1)" />
        <line x1="12" y1="32" x2="32" y2="16" stroke="#EA4B00" strokeWidth="2.5" strokeOpacity="0.6" />
        <line x1="32" y1="16" x2="52" y2="32" stroke="#EA4B00" strokeWidth="2.5" strokeOpacity="0.6" />
        <line x1="52" y1="32" x2="32" y2="48" stroke="#EA4B00" strokeWidth="2.5" strokeOpacity="0.6" />
        <line x1="32" y1="48" x2="12" y2="32" stroke="#EA4B00" strokeWidth="2.5" strokeOpacity="0.6" />
        <circle cx="12" cy="32" r="3" fill="#fff" />
        <circle cx="32" cy="16" r="3" fill="#fff" />
        <circle cx="52" cy="32" r="3" fill="#fff" />
        <circle cx="32" cy="48" r="3" fill="#fff" />
      </svg>
    ),
  },
  {
    name: "C Lang",
    glow: "#6366f1",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <defs>
          <linearGradient id="clang" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5c6bc0" /><stop offset="100%" stopColor="#a5b4fc" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="28" stroke="url(#clang)" strokeWidth="2" fill="none" />
        <path d="M32 10L50.1 21L50.1 43L32 54L13.9 43L13.9 21Z" fill="url(#clang)" opacity="0.1" stroke="url(#clang)" strokeWidth="1.5" />
        <path d="M40 22.5C37.2 20.5 34 20 31 20.5C24.5 21.8 20 27.2 20 32C20 37.6 24.8 43.2 31.5 43.8C34.5 44.1 37.5 43.4 40 41.5" stroke="url(#clang)" strokeWidth="4" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    name: "3D Web",
    glow: "#8b5cf6",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <defs>
          <linearGradient id="threed" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c3aed" /><stop offset="100%" stopColor="#c4b5fd" />
          </linearGradient>
          <linearGradient id="threed2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" /><stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
        </defs>
        <path d="M32 36L14 26V44L32 54L32 36Z" fill="url(#threed)" opacity="0.7" />
        <path d="M14 26L32 16L50 26L32 36L14 26Z" fill="url(#threed)" />
        <path d="M32 36L50 26V44L32 54V36Z" fill="url(#threed2)" opacity="0.85" />
        <ellipse cx="32" cy="32" rx="26" ry="10" stroke="url(#threed)" strokeWidth="1.5" fill="none" strokeDasharray="4 3" opacity="0.4" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    glow: "#22c55e",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <defs>
          <linearGradient id="supa" x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor="#3ECF8E" /><stop offset="100%" stopColor="#1a9e63" />
          </linearGradient>
        </defs>
        <path d="M34.8 6L10 36.4H30.4L29.2 58L54 27.6H33.6L34.8 6Z" fill="url(#supa)" />
      </svg>
    ),
  },
  {
    name: "Prompting",
    glow: "#f59e0b",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <defs>
          <linearGradient id="prompt" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#fcd34d" />
          </linearGradient>
        </defs>
        <path d="M10 12H54C55.1 12 56 12.9 56 14V42C56 43.1 55.1 44 54 44H24L14 54V44H10C8.9 44 8 43.1 8 42V14C8 12.9 8.9 12 10 12Z" stroke="url(#prompt)" strokeWidth="2" fill="url(#prompt)" fillOpacity="0.07" />
        <rect x="17" y="22" width="14" height="3" rx="1.5" fill="url(#prompt)" />
        <rect x="17" y="29" width="22" height="3" rx="1.5" fill="url(#prompt)" opacity="0.7" />
        <rect x="17" y="36" width="10" height="3" rx="1.5" fill="url(#prompt)" opacity="0.5" />
        <path d="M46 20L47.5 23L51 24.5L47.5 26L46 29L44.5 26L41 24.5L44.5 23Z" fill="url(#prompt)" />
      </svg>
    ),
  },
  {
    name: "Full Stack",
    glow: "#06b6d4",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <defs>
          <linearGradient id="fs1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#06b6d4" /><stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="fs2" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#7c3aed" /><stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <rect x="10" y="10" width="44" height="12" rx="4" fill="url(#fs1)" opacity="0.9" />
        <rect x="10" y="26" width="44" height="12" rx="4" fill="url(#fs1)" opacity="0.65" />
        <rect x="10" y="42" width="44" height="12" rx="4" fill="url(#fs2)" opacity="0.8" />
        <circle cx="47" cy="16" r="2.5" fill="#fff" opacity="0.8" />
        <circle cx="41" cy="16" r="2.5" fill="#fff" opacity="0.5" />
        <circle cx="47" cy="32" r="2.5" fill="#fff" opacity="0.8" />
        <path d="M18 48L14 50L18 52" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26 48L30 50L26 52" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Runway ML",
    glow: "#ec4899",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <defs>
          <linearGradient id="rwy" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ec4899" /><stop offset="50%" stopColor="#a855f7" /><stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <linearGradient id="rwy2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f472b6" /><stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>
        <rect x="8" y="14" width="48" height="36" rx="4" stroke="url(#rwy)" strokeWidth="2" fill="url(#rwy)" fillOpacity="0.07" />
        <circle cx="32" cy="32" r="12" stroke="url(#rwy2)" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
        <circle cx="32" cy="32" r="7" fill="url(#rwy)" opacity="0.2" />
        <path d="M29 28L38 32L29 36V28Z" fill="url(#rwy)" />
      </svg>
    ),
  },
];

export default function SkillsOrbit() {
  return (
    <>
      <style>{`
        @keyframes orbitSpin {
          from { transform: rotateY(0deg); }
          to   { transform: rotateY(360deg); }
        }
        .orbit-ring {
          animation: orbitSpin 22s linear infinite;
          transform-style: preserve-3d;
          width: 0;
          height: 0;
          position: relative;
        }
        .orbit-stage:hover .orbit-ring,
        .orbit-stage:focus-within .orbit-ring {
          animation-play-state: paused;
        }
      `}</style>

      <section
        className="relative w-full bg-white overflow-hidden"
        style={{ minHeight: "100vh", paddingBottom: "4rem" }}
      >
        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.055) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Blue neon heading */}
        <div className="relative z-10 flex flex-col items-center pt-[8vh] pb-4 select-none">
          <span
            className="font-black text-gray-900 leading-none tracking-[0.18em]"
            style={{
              fontSize: "clamp(2.2rem, 4vw, 5.5rem)",
              textShadow: "0 0 40px #3b82f688, 0 0 80px #3b82f644",
              color: "#1e3a8a",
            }}
          >
            TECHSTACK
          </span>
          <div
            className="mt-3 h-[2px] w-32 rounded-full"
            style={{ background: "linear-gradient(90deg, transparent, #3b82f6, #60a5fa, #3b82f6, transparent)" }}
          />
          <p className="mt-3 text-gray-400 text-sm tracking-widest uppercase">
            Hover to pause
          </p>
        </div>

        {/* 3D Stage — no touch pause, only hover */}
        <div
          className="orbit-stage relative flex items-center justify-center"
          style={{
            height: "68vh",
            perspective: "1100px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          <div className="orbit-ring">
            {skills.map((skill, i) => {
              const angle = ANGLE_PER_CARD * i;
              return (
                <div
                  key={skill.name}
                  style={{
                    position: "absolute",
                    top: "-85px",
                    left: "-85px",
                    width: "170px",
                    height: "170px",
                    transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    borderRadius: "20px",
                    background: "rgba(255,255,255,0.6)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    boxShadow: [
                      "0 0 0 1.5px #1d4ed833",
                      `0 0 24px 4px ${skill.glow}22`,
                      "0 10px 30px rgba(0,0,0,0.07)",
                      "inset 0 1px 0 rgba(255,255,255,0.8)",
                    ].join(", "),
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    cursor: "pointer",
                    willChange: "transform",
                    transition: "box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${skill.glow}88, 0 0 40px 12px ${skill.glow}44, 0 16px 40px rgba(0,0,0,0.1)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = [
                      "0 0 0 1.5px #1d4ed833",
                      `0 0 24px 4px ${skill.glow}22`,
                      "0 10px 30px rgba(0,0,0,0.07)",
                    ].join(", ");
                  }}
                >
                  {/* Blue neon top accent */}
                  <div style={{
                    position: "absolute", top: 0, left: "20%", right: "20%",
                    height: "2px", borderRadius: "0 0 3px 3px",
                    background: `linear-gradient(90deg, transparent, ${skill.glow}, transparent)`,
                    opacity: 0.7,
                  }} />
                  {skill.svg}
                  {/* Skill name label */}
                  <span style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: skill.glow,
                    textShadow: `0 0 8px ${skill.glow}88`,
                  }}>
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
