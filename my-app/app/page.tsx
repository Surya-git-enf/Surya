
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroReveal from "@/components/HeroReveal";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";

gsap.registerPlugin(ScrollTrigger);

const CanvasScroll = dynamic(() => import("@/components/CanvasScroll"), { ssr: false });
const SkillsOrbit  = dynamic(() => import("@/components/SkillsOrbit"),  { ssr: false });
const AppsSineWave = dynamic(() => import("@/components/AppsSineWave"), { ssr: false });

const NAV_SECTIONS = [
  { id: "personal",   label: "Personal" },
  { id: "techstack",  label: "Techstack" },
  { id: "builtapps",  label: "Built Apps" },
  { id: "3dwebsite",  label: "Footer" }, // Updated label for clarity
] as const;

const CONTACT_LINKS = [
  {
    name: "Instagram",
    handle: "@surya3ddev",
    url: "https://www.instagram.com/surya3ddev?igsh=bDIzODRjY2E0dG95",
    color: "#e1306c",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: "Discord",
    handle: "Join Server",
    url: "https://discord.gg/3HYdEPq3",
    color: "#5865f2",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.13.14 18.2.204 18.244a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    ),
  },
];

function GlobalHeader() {
  const [activeSection, setActiveSection] = useState<string>("personal");
  const [isVisible, setIsVisible] = useState(true);
  const [photoOpen, setPhotoOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      [span_3](start_span)setIsVisible(false); // Hide during scroll[span_3](end_span)
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsVisible(true), 300); // Show after stop

      // Sync active light with scroll position
      NAV_SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(id);
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    [span_4](start_span)if (el) el.scrollIntoView({ behavior: "smooth" }); // Smooth navigation[span_4](end_span)
    setMenuOpen(false);
  }, []);

  return (
    <>
      <header
        className="fixed left-1/2 flex items-center gap-2 px-3 py-2 select-none"
        style={{
          top: "1.5rem",
          [span_5](start_span)zIndex: 9999, // Ensure header is always on top[span_5](end_span)
          transform: `translateX(-50%) translateY(${isVisible ? "0" : "-200%"})`,
          opacity: isVisible ? 1 : 0,
          transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(20px)",
          borderRadius: "9999px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          width: "max-content",
          maxWidth: "94vw",
        }}
      >
        <button onClick={() => setPhotoOpen(true)} className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#3b82f6] ring-offset-2">
          <img src="/surya.png" alt="Surya" className="w-full h-full object-cover" />
        </button>
        <nav className="hidden sm:flex items-center gap-1 relative px-2">
          {NAV_SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="relative px-4 py-2 text-[13px] font-bold transition-all"
              style={{ color: activeSection === s.id ? "#3b82f6" : "#64748b" }}
            >
              {s.label}
              {activeSection === s.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-1/2 bg-[#3b82f6] rounded-t-md shadow-[0_-2px_10px_rgba(59,130,246,0.8)]" />
              )}
            </button>
          ))}
        </nav>
        <button onClick={() => setContactOpen(!contactOpen)} className="w-10 h-10 flex flex-col items-center justify-center gap-1 rounded-full hover:bg-gray-100">
           <span className="w-4 h-[2px] bg-gray-700 rounded-full" />
           <span className="w-3 h-[2px] bg-gray-700 rounded-full self-start ml-3" />
           <span className="w-4 h-[2px] bg-gray-700 rounded-full" />
        </button>
      </header>

      [span_6](start_span){/* Floating Contact Panel[span_6](end_span) */}
      {contactOpen && (
        <div className="fixed top-24 right-6 z-[9999] p-4 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 w-64">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Contact me</p>
           {CONTACT_LINKS.map(link => (
             <a key={link.name} href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-2xl hover:bg-blue-50 transition-all">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: link.color }}>{link.svg}</div>
                <div>
                   <p className="text-sm font-bold text-gray-900">{link.name}</p>
                   <p className="text-xs text-gray-500">{link.handle}</p>
                </div>
             </a>
           ))}
        </div>
      )}

      [span_7](start_span){/* Lightbox for Surya's Photo[span_7](end_span) */}
      {photoOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md p-6" onClick={() => setPhotoOpen(false)}>
           <div className="relative max-w-sm w-full aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
              <img src="/surya.png" alt="Surya" className="w-full h-full object-cover" />
              <button onClick={() => setPhotoOpen(false)} className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">✕</button>
           </div>
        </div>
      )}
    </>
  );
}

export default function Home() {
  return (
    <>
      <GlobalHeader />
      <main className="relative flex flex-col w-full bg-white overflow-x-hidden">
        <HeroReveal />
        <section id="personal" className="relative z-10 bg-black min-h-screen"><CanvasScroll /></section>
        <section id="techstack" className="relative z-20 bg-white min-h-screen"><SkillsOrbit /></section>
        <section id="builtapps" className="relative z-30 bg-white min-h-screen"><AppsSineWave /></section>
        <section id="3dwebsite" className="relative z-40 bg-[#f5f7f2]"><Footer /></section>
      </main>
    </>
  );
}
