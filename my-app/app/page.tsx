
"use client";

import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroReveal from "@/components/HeroReveal";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Lazy load the heavy GSAP components to keep the initial load lightning fast
const CanvasScroll = dynamic(() => import("@/components/CanvasScroll"), { ssr: false });
const SkillsOrbit  = dynamic(() => import("@/components/SkillsOrbit"),  { ssr: false });
const AppsSineWave = dynamic(() => import("@/components/AppsSineWave"), { ssr: false });

// ── HEADER DATA ──
const NAV_SECTIONS = [
  { id: "personal",   label: "Personal" },
  { id: "techstack",  label: "Techstack" },
  { id: "builtapps",  label: "Built Apps" },
  { id: "3dwebsite",  label: "3D Website" },
] as const;

// ── CUSTOM LINKS ADDED ──
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

// ── EMBEDDED GLOBAL HEADER ──
function GlobalHeader() {
  const [activeSection, setActiveSection] = useState<string>("personal");
  const [isVisible, setIsVisible] = useState(true);
  const [photoOpen, setPhotoOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // 1. Smart Scroll (Hide while moving, Show when stopped) & Custom Scroll Spy
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      // Hide header immediately on scroll
      setIsVisible(false);
      clearTimeout(scrollTimeout);
      
      // Wait 300ms after scrolling stops to show header again
      scrollTimeout = setTimeout(() => {
        setIsVisible(true);
      }, 300);

      // --- CUSTOM SCROLL SPY FOR GSAP PINNED SECTIONS ---
      const ids = ["personal", "techstack", "builtapps", "3dwebsite"];
      let currentActive = "personal";

      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          // If the section is pinned by GSAP, look at its spacer instead to get its real position
          const trackingEl = el.closest(".pin-spacer") || el;
          const rect = trackingEl.getBoundingClientRect();
          
          // If the top of the element (or its spacer) is above the middle of the screen
          if (rect.top <= window.innerHeight / 2.5) {
            currentActive = id;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Trigger once on mount to set initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // 2. Smooth Scroll To Link (Accounting for GSAP Pinning)
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      // Scroll to the GSAP pin-spacer if it exists, otherwise scroll to the element directly
      const scrollTarget = el.closest(".pin-spacer") || el;
      scrollTarget.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
    setContactOpen(false);
  }, []);

  return (
    <>
      <style>{`
        @keyframes panelFadeIn {
          from { opacity: 0; transform: scale(0.95) translateY(-10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .panel-enter { animation: panelFadeIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }

        @keyframes photoReveal {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
        .photo-enter { animation: photoReveal 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }

        @keyframes overlayFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .overlay-enter { animation: overlayFade 0.2s ease forwards; }
      `}</style>

      {/* HEADER BAR */}
      <header
        className="fixed left-1/2 flex items-center gap-2 px-3 py-2 select-none"
        style={{
          top: "1.5rem",
          zIndex: 9999,
          transform: `translateX(-50%) translateY(${isVisible ? "0" : "-200%"})`, 
          opacity: isVisible ? 1 : 0,
          transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
          borderRadius: "9999px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,1)",
          width: "max-content",
          maxWidth: "94vw", // Keeps it safe on tiny screens
        }}
      >
        {/* Avatar */}
        <button
          onClick={() => setPhotoOpen(true)}
          className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-[2px] ring-[#3b82f6] ring-offset-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/surya.png" alt="Surya" className="w-full h-full object-cover" />
        </button>

        <div className="w-px h-6 bg-gray-200 flex-shrink-0 ml-1" />

        {/* Desktop Links */}
        <nav className="hidden sm:flex items-center gap-1 relative px-1">
          {NAV_SECTIONS.map((s) => {
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="relative px-4 py-2 rounded-full text-[13px] font-bold transition-all duration-300"
                style={{
                  color: isActive ? "#3b82f6" : "#64748b", 
                  textShadow: isActive ? "0 0 16px rgba(59, 130, 246, 0.4)" : "none",
                }}
              >
                {s.label}
                {/* Neon Blue Light Tracker */}
                {isActive && (
                  <span 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] rounded-t-md transition-all duration-300"
                    style={{
                      width: "50%",
                      background: "#3b82f6",
                      boxShadow: "0 -2px 12px rgba(59, 130, 246, 0.9)",
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="sm:hidden flex flex-col gap-1 w-9 h-9 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <span className="w-4 h-[2px] bg-gray-600 rounded-full transition-all duration-300" style={{ transform: menuOpen ? "rotate(45deg) translateY(5px)" : "none" }} />
          <span className="w-4 h-[2px] bg-gray-600 rounded-full transition-all duration-300" style={{ opacity: menuOpen ? 0 : 1 }} />
          <span className="w-4 h-[2px] bg-gray-600 rounded-full transition-all duration-300" style={{ transform: menuOpen ? "rotate(-45deg) translateY(-5px)" : "none" }} />
        </button>

        <div className="w-px h-6 bg-gray-200 flex-shrink-0 mr-1 hidden sm:block" />

        {/* 3-Lines Contact */}
        <button
          onClick={() => setContactOpen((v) => !v)}
          className="flex flex-col gap-[3px] w-10 h-10 items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
        >
          <span className="w-4 h-[2px] bg-gray-700 rounded-full" />
          <span className="w-3 h-[2px] bg-gray-700 rounded-full self-start ml-3" />
          <span className="w-4 h-[2px] bg-gray-700 rounded-full" />
        </button>
      </header>

      {/* MOBILE NAV DROPDOWN */}
      {isVisible && menuOpen && (
        <>
          <div className="fixed inset-0 z-[9997] sm:hidden" onClick={() => setMenuOpen(false)} />
          <div
            className="fixed top-[88px] left-1/2 z-[9998] flex flex-col rounded-3xl overflow-hidden sm:hidden panel-enter"
            style={{
              transform: "translateX(-50%)",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(32px) saturate(150%)",
              WebkitBackdropFilter: "blur(32px) saturate(150%)",
              border: "1px solid rgba(255, 255, 255, 1)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,1)",
              width: "min(240px, 90vw)", // Perfect mobile scaling
            }}
          >
            {NAV_SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="px-6 py-4 text-[14px] font-bold text-left transition-all duration-300 hover:bg-blue-50/50"
                style={{ 
                  color: activeSection === s.id ? "#3b82f6" : "#475569", 
                  borderLeft: activeSection === s.id ? "3px solid #3b82f6" : "3px solid transparent",
                  background: activeSection === s.id ? "rgba(59, 130, 246, 0.05)" : "transparent"
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </>
      )}

      {/* ── PROFESSIONAL CONTACT PANEL ── */}
      {contactOpen && (
        <>
          <div className="fixed inset-0 z-[9998] overlay-enter bg-black/5 backdrop-blur-[2px]" onClick={() => setContactOpen(false)} />
          <div
            className="fixed top-[88px] right-4 sm:right-6 z-[9999] rounded-3xl overflow-hidden panel-enter"
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(32px) saturate(150%)",
              WebkitBackdropFilter: "blur(32px) saturate(150%)",
              border: "1px solid rgba(255, 255, 255, 1)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.02) inset",
              width: "min(320px, 92vw)", // Perfectly responsive for mobile & desktop
            }}
          >
            <div className="px-6 pt-5 pb-3 border-b border-gray-100 bg-white/40">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Get in touch</p>
              <p className="text-gray-900 font-black text-lg leading-tight mt-1 tracking-tight">Surya Peddishetti</p>
            </div>
            <div className="flex flex-col p-3 gap-1">
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-3 py-3 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-sm hover:scale-[1.02] group border border-transparent hover:border-gray-100"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-sm transition-transform group-hover:rotate-6"
                    style={{ background: link.color }}
                  >
                    {link.svg}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900">{link.name}</span>
                    <span className="text-[11px] text-gray-500 font-medium">{link.handle}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── PROFESSIONAL PHOTO LIGHTBOX ── */}
      {photoOpen && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overlay-enter"
          style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(16px)" }}
          onClick={() => setPhotoOpen(false)}
        >
          <div
            className="relative rounded-[2rem] overflow-hidden photo-enter"
            style={{
              width: "min(400px, 90vw)", // Perfect mobile scaling
              aspectRatio: "3/4",
              boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/surya.png" alt="Surya" className="w-full h-full object-cover" />
            
            {/* Elegant Gradient overlay */}
            <div
              className="absolute inset-0 flex flex-col justify-end px-6 py-6 sm:px-8 sm:py-8"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)" }}
            >
              <p className="text-white font-black text-xl sm:text-2xl tracking-tight">Surya Peddishetti</p>
              <div className="w-10 h-1 bg-blue-500 rounded-full mt-2 mb-3" />
              <p className="text-gray-300 text-xs sm:text-sm font-medium leading-relaxed">AI Engineer & Full-Stack Developer creating cinematic web experiences.</p>
            </div>

            {/* Premium Close button */}
            <button
              onClick={() => setPhotoOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-white/20"
              style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-5 h-5">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ── MAIN PAGE ──
export default function Home() {
  return (
    <>
      <GlobalHeader />

      <main className="relative flex flex-col w-full bg-white overflow-x-hidden">
        <HeroReveal />

        <ErrorBoundary>
          <CanvasScroll />
        </ErrorBoundary>

        <ErrorBoundary>
          <SkillsOrbit />
        </ErrorBoundary>

        <ErrorBoundary>
          <AppsSineWave />
        </ErrorBoundary>

        <Footer />
      </main>
    </>
  );
      }
