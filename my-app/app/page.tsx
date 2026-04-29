
"use client";

import HeroReveal from '@/components/HeroReveal';
import CanvasScroll from '@/components/CanvasScroll';
import SkillsOrbit from '@/components/SkillsOrbit';
import AppsSineWave from '@/components/AppsSineWave';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative flex flex-col w-full bg-black">
      <HeroReveal />
      <CanvasScroll />
      <SkillsOrbit />
      <AppsSineWave />
      <Footer />
    </main>
  );
}
