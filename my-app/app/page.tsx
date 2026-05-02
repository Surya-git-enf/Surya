
// app/page.tsx
"use client";

import dynamic from "next/dynamic";
import HeroReveal from "@/components/HeroReveal";
import Footer from "@/components/Footer";

const CanvasScroll  = dynamic(() => import("@/components/CanvasScroll"),  { ssr: false });
const SkillsOrbit   = dynamic(() => import("@/components/SkillsOrbit"),   { ssr: false });
const AppsSineWave  = dynamic(() => import("@/components/AppsSineWave"),  { ssr: false });

export default function Home() {
  return (
    <main className="relative flex flex-col w-full bg-white overflow-hidden">
      <HeroReveal />
      <CanvasScroll />
      <SkillsOrbit />
      <AppsSineWave />
      <Footer />
    </main>
  );
}
