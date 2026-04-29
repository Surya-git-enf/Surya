
import HeroReveal from '@/components/HeroReveal';
import CanvasScroll from '@/components/TestScroll';
import SkillsCarousel from '@/components/SkillsCarousel';
import AppsSineWave from '@/components/AppsSineWave';
import FooterGallery from '@/components/FooterGallery';

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white overflow-x-hidden font-sans">
      <HeroReveal />
      <CanvasScroll />
      <SkillsCarousel />
      <AppsSineWave />
      <FooterGallery />
    </main>
  );
}
