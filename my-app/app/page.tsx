
"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";

const CanvasScroll = dynamic(() => import("@/components/CanvasScroll"), { ssr: false });
const SkillsOrbit  = dynamic(() => import("@/components/SkillsOrbit"),  { ssr: false });
const AppsSineWave = dynamic(() => import("@/components/AppsSineWave"), { ssr: false });

export default function Home() {
  useEffect(() => {
    window.onerror = (msg, src, line, col, err) => {
      document.body.innerHTML = `<pre style="color:red;padding:20px;font-size:14px">
ERROR: ${msg}
File: ${src}
Line: ${line}
${err?.stack}
      </pre>`;
    };
  }, []);

  return (
    <main className="relative flex flex-col w-full bg-white overflow-hidden">
      <CanvasScroll />
      <SkillsOrbit />
      <AppsSineWave />
      <Footer />
    </main>
  );
}
