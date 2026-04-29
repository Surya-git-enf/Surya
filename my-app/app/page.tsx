
import HeroReveal    from '@/components/HeroReveal'
import CanvasScroll  from '@/components/CanvasScroll'
import SkillsOrbit   from '@/components/SkillsOrbit'
import AppsSineWave  from '@/components/AppsSineWave'
import Footer        from '@/components/Footer'

export default function Page() {
  return (
    <main style={{ background: '#000' }}>
      <HeroReveal />
      <CanvasScroll />
      <SkillsOrbit />
      <AppsSineWave />
      <Footer />
    </main>
  )
}
