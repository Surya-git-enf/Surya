
"use client";
import dynamic from "next/dynamic";
import HeroReveal from "@/components/HeroReveal";

const CanvasScroll = dynamic(() => import("@/components/CanvasScroll"), { ssr: false });

export default function Home() {
  return (
    <main>
      <HeroReveal />
      <CanvasScroll />
    </main>
  );
}
