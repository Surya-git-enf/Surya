
"use client";

import React from "react";

type AppData = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
};

const appsData: AppData[] = [
  {
    id: "mailmate",
    title: "Mailmate",
    description:
      "Email agent that filters priority business correspondence and dispatches Telegram alerts.",
    icon: (
      <svg viewBox="0 0 64 64" className="h-16 w-16 text-white">
        <path d="M8 18h48v28H8z" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M10 20l22 18 22-18" fill="none" stroke="currentColor" strokeWidth="3" />
      </svg>
    ),
    accent: "from-blue-500/30",
  },
  {
    id: "slide",
    title: "Slide",
    description:
      "AI news aggregator distilling complex articles into high-impact briefings.",
    icon: (
      <svg viewBox="0 0 64 64" className="h-16 w-16 text-white">
        <rect x="10" y="12" width="44" height="40" rx="8" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M18 24h28M18 32h20M18 40h24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    accent: "from-cyan-500/30",
  },
  {
    id: "playful",
    title: "Playful",
    description:
      "Advanced AI game engine transforming text prompts into playable environments.",
    icon: (
      <svg viewBox="0 0 64 64" className="h-16 w-16 text-white">
        <path d="M16 20h32l-6 24H22z" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M24 28h16M24 36h10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    accent: "from-pink-500/30",
  },
];

export default function AppsSineWave() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative mb-20 h-40 w-full">
          <svg
            viewBox="0 0 1200 240"
            className="absolute inset-0 h-full w-full"
            fill="none"
          >
            <path
              d="M0 120 C 120 20, 240 20, 360 120 S 600 220, 720 120 S 960 20, 1080 120 S 1200 220, 1200 120"
              stroke="white"
              strokeWidth="3"
              strokeOpacity="0.85"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {appsData.map((app) => (
            <div
              key={app.id}
              className={`group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]`}
            >
              <div className="mb-6 flex h-28 items-center justify-center rounded-2xl bg-white/5">
                {app.icon}
              </div>
              <h3 className="mb-3 text-2xl font-semibold text-white">{app.title}</h3>
              <p className="text-sm leading-7 text-white/70">{app.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
