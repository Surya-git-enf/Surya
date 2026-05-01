"use client";

import React from "react";

/* ── Recent creations ───────────────────────────────────────── */
const footerDesigns = [
  {
    id: 1,
    name: "Transformers — Optimus Prime",
    imgSrc: "/transformers.png",
    link: "https://playfulport.vercel.app/",
    tag: "3D Web",
  },
  {
    id: 2,
    name: "Amazing Spider-Man",
    imgSrc: "/spiderman.png",
    link: "https://spiderman-three-iota.vercel.app/",
    tag: "Animation",
  },
  {
    id: 3,
    name: "Cream Store",
    imgSrc: "/cream.png",
    link: "https://creamstore-demo.vercel.app/",
    tag: "E-Commerce",
  },
  {
    id: 4,
    name: "Playful — AI Game Engine",
    imgSrc: "/logo.png",
    link: "https://playfulport.vercel.app/",
    tag: "AI Product",
  },
] as const;

/* ── Social links ───────────────────────────────────────────── */
const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/surya3ddev",
    color: "#e1306c",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465a4.9 4.9 0 011.772 1.153 4.9 4.9 0 011.153 1.772c.248.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122s-.013 3.056-.06 4.122c-.05 1.065-.217 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.248-1.363.415-2.428.465C15.056 21.987 14.717 22 12 22s-3.056-.013-4.122-.06c-1.065-.05-1.79-.217-2.428-.465a4.89 4.89 0 01-1.772-1.153A4.904 4.904 0 012.525 18.45c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12s.013-3.056.06-4.122c.05-1.065.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 9a3 3 0 110 6 3 3 0 010-6z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/surisurya-undefined-9113b829b",
    color: "#0077b5",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Discord",
    href: "https://discord.com/users/ayrus0101",
    color: "#5865f2",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 004.68 4.37a.071.071 0 00-.032.027C1.504 9.125.639 13.755 1.057 18.263a.073.073 0 00.03.056 19.9 19.9 0 005.993 3.03.077.077 0 00.084-.026c.462-.63.874-1.295 1.226-1.994a.073.073 0 00-.041-.101 13.107 13.107 0 01-1.872-.892.074.074 0 01-.008-.125c.126-.094.252-.192.372-.292a.073.073 0 01.078-.01c3.927 1.793 8.18 1.793 12.062 0a.073.073 0 01.079.009c.12.099.245.199.372.292a.074.074 0 01-.006.127 12.299 12.299 0 01-1.873.892.073.073 0 00-.041.1c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.074.074 0 00.03-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/",
    color: "#25d366",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.001 5.45-4.436 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.029c0 2.119.549 4.188 1.591 6.019L0 24l6.135-1.61a11.771 11.771 0 005.915 1.594h.005c6.637 0 12.032-5.393 12.035-12.029a11.762 11.762 0 00-3.417-8.567z" />
      </svg>
    ),
  },
] as const;

/* ── Design card sub-component ─────────────────────────────── */
interface DesignCardProps {
  name:   string;
  imgSrc: string;
  link:   string;
  tag:    string;
}

function DesignCard({ name, imgSrc, link, tag }: DesignCardProps) {
  const cardRef = React.useRef<HTMLAnchorElement>(null);

  return (
    <a
      ref={cardRef}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block flex-none rounded-3xl overflow-hidden"
      style={{
        width: "clamp(210px, 21vw, 272px)",
        height: "clamp(290px, 30vh, 350px)",
        background: "linear-gradient(150deg, #f8f9fa 0%, #ffffff 100%)",
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform  = "translateY(-12px)";
        el.style.boxShadow  = "0 24px 60px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform  = "translateY(0px)";
        el.style.boxShadow  = "0 4px 20px rgba(0,0,0,0.05)";
      }}
    >
      {/* Image — 80% */}
      <div
        className="w-full flex items-center justify-center overflow-hidden bg-gray-50 border-b border-gray-100"
        style={{ height: "80%" }}
      >
        {/* Using <img> directly — avoids next/image domain config issues */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={name}
          className="max-w-[76%] max-h-[76%] object-contain"
          style={{ transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.06)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
        />
      </div>

      {/* Label — 20% */}
      <div
        className="flex items-center justify-between px-5 bg-white"
        style={{ height: "20%" }}
      >
        <div>
          <p className="font-black text-gray-950 text-sm leading-snug">{name}</p>
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-0.5">{tag}</p>
        </div>
        {/* Arrow icon */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: "#f3f4f6",
            transition: "background 0.3s, color 0.3s",
          }}
        >
          <svg className="w-3.5 h-3.5 text-gray-500" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </a>
  );
}

/* ── Footer main ────────────────────────────────────────────── */
export default function Footer() {
  return (
    <footer
      className="relative w-full bg-white overflow-hidden border-t border-gray-100"
      style={{ paddingTop: "5rem", paddingBottom: "3rem" }}
    >
      {/* Subtle gradient wash at bottom */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{
          height: "50%",
          background: "linear-gradient(to top, #f9fafb, transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

        {/* Heading row */}
        <div className="flex items-end justify-between mb-10">
          <h2
            className="font-black text-gray-950 leading-none"
            style={{ fontSize: "clamp(1.8rem, 3vw, 3.2rem)" }}
          >
            RECENT
            <br />
            CREATIONS
          </h2>
          <p className="text-sm text-gray-400 font-medium pb-1 hidden md:block">
            Click any card to visit →
          </p>
        </div>

        {/* Cards — horizontal scroll on narrow screens */}
        <div
          className="flex gap-5 pb-3 mb-14"
          style={{ overflowX: "auto", scrollbarWidth: "none" }}
        >
          {footerDesigns.map((d) => (
            <DesignCard
              key={d.id}
              name={d.name}
              imgSrc={d.imgSrc}
              link={d.link}
              tag={d.tag}
            />
          ))}
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-10 rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, #e5e7eb 30%, #e5e7eb 70%, transparent)",
          }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.name}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: "#f3f4f6",
                  color: "#6b7280",
                  transition: "background 0.3s, color 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = s.color;
                  el.style.color      = "#ffffff";
                  el.style.boxShadow  = `0 8px 24px ${s.color}44`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#f3f4f6";
                  el.style.color      = "#6b7280";
                  el.style.boxShadow  = "none";
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Identity */}
          <div className="flex flex-col items-center md:items-end gap-1">
            <a
              href="https://discord.com/users/ayrus0101"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono font-black text-base text-gray-900 hover:text-gray-500 transition-colors tracking-wider"
            >
              @surya3ddev{" "}
              <span className="font-normal text-gray-400 text-sm">| ayrus0101</span>
            </a>
            <p className="text-xs text-gray-400">
              © 2026 Surya Peddishetti. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
