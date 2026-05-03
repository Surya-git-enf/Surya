
"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const NAV_SECTIONS = [
  { id: "personal",   label: "Personal" },
  { id: "techstack",  label: "Techstack" },
  { id: "builtapps",  label: "Built Apps" },
  { id: "3dwebsite",  label: "3D Website" },
] as const;

// Focused exclusively on Instagram and Discord exactly as requested
const CONTACT_LINKS = [
  {
    name: "Instagram",
    handle: "@plauful_123",
    url: "https://instagram.com/plauful_123",
    color: "#e1306c",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: "Discord",
    handle: "surya#dev",
    url: "https://discord.com",
    color: "#5865f2",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.13.14 18.2.204 18.244a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    ),
  },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState<string>("personal");
  const [visible, setVisible] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_SECTIONS.map((s) => s.id);
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  return (
    <>
      <style>{`
        @keyframes headerSlideDown {
          from { opacity: 0; transform: translateY(-20px) translateX(-50%); }
          to   { opacity: 1; transform: translateY(0) translateX(-50%); }
        }
        .header-enter { animation: headerSlideDown 0.5s cubic-bezier(0.16,1,0.3,1) forwards; }

        @keyframes panelFadeIn {
          from { opacity: 0; transform: scale(0.95) translateY(-8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .panel-enter { animation: panelFadeIn 0.35s cubic-bezier(0.16,1,0.3,1) forwards; }

        @keyframes photoReveal {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
        .photo-enter { animation: photoReveal 0.4s cubic-bezier(0.16,1,0.3,1) forwards; }
      `}</style>

      {/* ── HEADER ── */}
      {visible && (
        <header
          ref={headerRef}
          className="header-enter fixed top-4 left-1/2 z-[200] flex items-center gap-2 px-3 py-2 select-none"
          style={{
            background: "rgba(255,255,255,0.82)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: "9999px",
            boxShadow: "0 4px 32px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.9) inset",
            width: "max-content",
            maxWidth: "92vw",
          }}
        >
          {/* Avatar (Left Corner) */}
          <button
            onClick={() => setPhotoOpen(true)}
            className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#6b8c5a] ring-offset-1 transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="View profile photo"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/surya.png"
              alt="Surya"
              className="w-full h-full object-cover"
              onError={(e) => {
                const t = e.currentTarget;
                t.style.display = "none";
                const fb = t.nextElementSibling as HTMLElement;
                if (fb) fb.style.display = "flex";
              }}
            />
            <div
              className="w-full h-full hidden items-center justify-center text-white font-black text-sm"
              style={{ background: "linear-gradient(135deg,#6b8c5a,#a8c48a)", display: "none" }}
            >
              S
            </div>
          </button>

          <div className="w-px h-5 bg-black/10 flex-shrink-0" />

          {/* Center Navigation Links */}
          <nav className="hidden sm:flex items-center gap-0.5">
            {NAV_SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  background: activeSection === s.id ? "rgba(107,140,90,0.15)" : "transparent",
                  color: activeSection === s.id ? "#4a6b38" : "#555",
                  borderBottom: activeSection === s.id ? "2px solid #6b8c5a" : "2px solid transparent",
                }}
              >
                {s.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="sm:hidden flex flex-col gap-1 w-8 h-8 items-center justify-center rounded-full hover:bg-black/5 transition-colors"
            aria-label="Menu"
          >
            <span className="w-4 h-0.5 bg-gray-600 rounded-full transition-all" style={{ transform: menuOpen ? "rotate(45deg) translateY(5px)" : "none" }} />
            <span className="w-4 h-0.5 bg-gray-600 rounded-full transition-all" style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="w-4 h-0.5 bg-gray-600 rounded-full transition-all" style={{ transform: menuOpen ? "rotate(-45deg) translateY(-5px)" : "none" }} />
          </button>

          <div className="w-px h-5 bg-black/10 flex-shrink-0" />

          {/* Three-lines Contact Button (Right Corner) */}
          <button
            onClick={() => setContactOpen((v) => !v)}
            className="flex flex-col gap-1 w-8 h-8 items-center justify-center rounded-full hover:bg-black/5 transition-colors flex-shrink-0"
            aria-label="Contact"
          >
            <span className="w-4 h-0.5 bg-gray-600 rounded-full" />
            <span className="w-3 h-0.5 bg-gray-600 rounded-full self-start ml-2" />
            <span className="w-4 h-0.5 bg-gray-600 rounded-full" />
          </button>
        </header>
      )}

      {/* Mobile nav dropdown */}
      {visible && menuOpen && (
        <div
          className="panel-enter fixed top-[72px] left-1/2 z-[199] flex flex-col rounded-2xl overflow-hidden sm:hidden"
          style={{
            transform: "translateX(-50%)",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
            minWidth: "200px",
          }}
        >
          {NAV_SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="px-5 py-3 text-sm font-semibold text-left transition-colors hover:bg-black/5"
              style={{ color: activeSection === s.id ? "#4a6b38" : "#333", borderLeft: activeSection === s.id ? "3px solid #6b8c5a" : "3px solid transparent" }}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      {/* Vertical Contact Panel attached to Three Lines */}
      {contactOpen && (
        <>
          <div className="fixed inset-0 z-[198]" onClick={() => setContactOpen(false)} />
          <div
            className="panel-enter fixed top-[72px] right-4 z-[199] rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.96)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 12px 50px rgba(0,0,0,0.14)",
              minWidth: "260px",
            }}
          >
            <div className="px-5 pt-4 pb-2 border-b border-black/6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Contact me</p>
              <p className="text-gray-900 font-black text-base leading-tight mt-0.5">Surya Peddishetti</p>
            </div>
            <div className="flex flex-col p-2">
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors hover:bg-black/5 group"
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                    style={{ background: link.color }}
                  >
                    {link.svg}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-900">{link.name}</span>
                    <span className="text-[10px] text-gray-400">{link.handle}</span>
                  </div>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 ml-auto text-gray-300 group-hover:text-gray-500 transition-colors">
                    <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Floating Photo Lightbox */}
      {photoOpen && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
          onClick={() => setPhotoOpen(false)}
        >
          <div
            className="photo-enter relative rounded-3xl overflow-hidden"
            style={{
              maxWidth: "min(420px, 90vw)",
              maxHeight: "min(560px, 85vh)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/surya.png"
              alt="Surya Peddishetti"
              className="w-full h-full object-cover"
              style={{ display: "block" }}
              onError={(e) => {
                const t = e.currentTarget as HTMLImageElement;
                t.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect fill='%236b8c5a' width='400' height='500'/%3E%3Ccircle cx='200' cy='180' r='80' fill='rgba(255,255,255,0.3)'/%3E%3Cpath d='M80 420c0-66 54-120 120-120s120 54 120 120' fill='rgba(255,255,255,0.2)'/%3E%3Ctext x='200' y='480' text-anchor='middle' fill='white' font-size='18' font-family='sans-serif'%3ESurya Peddishetti%3C/text%3E%3C/svg%3E";
              }}
            />
            {/* Gradient overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 px-6 py-5"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)" }}
            >
              <p className="text-white font-black text-xl leading-none">Surya Peddishetti</p>
              <p className="text-white/60 text-sm mt-1">AI · Full-Stack Dev · India 🇮🇳</p>
            </div>
            {/* Close button */}
            <button
              onClick={() => setPhotoOpen(false)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
              style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }}
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-4 h-4">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
          }
                
