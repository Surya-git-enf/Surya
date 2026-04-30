import HeroReveal from "@/components/HeroReveal";
import CanvasScroll from "@/components/CanvasScroll";
import SkillsOrbit from "@/components/SkillsOrbit";
import AppsSineWave from "@/components/AppsSineWave";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <HeroReveal />
      <CanvasScroll />
      <SkillsOrbit />
      <AppsSineWave />
      <Footer />
    </main>
  );
}
