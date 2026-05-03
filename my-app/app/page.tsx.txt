"use client";

import dynamic from "next/dynamic";
import HeroReveal from "@/components/HeroReveal";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";

const CanvasScroll = dynamic(() => import("@/components/CanvasScroll"), { ssr: false });
const SkillsOrbit  = dynamic(() => import("@/components/SkillsOrbit"),  { ssr: false });
const AppsSineWave = dynamic(() => import("@/components/AppsSineWave"), { ssr: false });

export default function Home() {
  return (
    <main className="relative flex flex-col w-full bg-white overflow-x-hidden">
      {/* HeroReveal includes the Header component internally */}
      <HeroReveal />

      {/* Personal section — dark aurora cards */}
      <ErrorBoundary>
        <CanvasScroll />
      </ErrorBoundary>

      {/* Techstack — 3D orbit carousel */}
      <ErrorBoundary>
        <SkillsOrbit />
      </ErrorBoundary>

      {/* Built Apps — sine wave + flip cards */}
      <ErrorBoundary>
        <AppsSineWave />
      </ErrorBoundary>

      {/* Footer — recent creations + centered socials */}
      <Footer />
    </main>
  );
}
