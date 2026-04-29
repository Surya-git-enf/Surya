'use client'

import { useEffect, useRef } from 'react'

export default function HeroReveal() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const surnameRef  = useRef<HTMLDivElement>(null)
  const nameRef     = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const scrollRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mounted = true

    const run = async () => {
      const { gsap }    = await import('gsap')
      if (!mounted) return

      const surname  = surnameRef.current
      const name     = nameRef.current
      const subtitle = subtitleRef.current
      const scroll   = scrollRef.current
      if (!surname || !name || !subtitle) return

      // Initial states
      gsap.set(surname,  { opacity: 0, y: 40 })
      gsap.set(subtitle, { opacity: 0, y: 20 })
      gsap.set(scroll,   { opacity: 0 })

      // Letter refs inside nameRef
      const letters = Array.from(name.querySelectorAll<HTMLSpanElement>('.hero-letter'))

      // Set all hidden initially
      gsap.set(letters, { opacity: 0, x: -60 })
      // Show only "A" first
      gsap.set(letters[0], { opacity: 1, x: 0 })

      const tl = gsap.timeline({ delay: 0.3 })

      // A walks in alone
      tl.fromTo(letters[0],
        { opacity: 0, x: -80 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
      )
      // Pause — dramatic beat
      .addPause('+=0.4')

      // S, U, R, Y fly in
      tl.to(letters.slice(1), {
        opacity: 1, x: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: 'power3.out',
      })

      // Surname fades up
      tl.to(surname, {
        opacity: 1, y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.1')

      // Subtitle
      tl.to(subtitle, {
        opacity: 1, y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.4')

      // Scroll indicator
      tl.to(scroll, { opacity: 1, duration: 0.5 }, '-=0.2')

      // Auto-play after pause
      setTimeout(() => { tl.play() }, 700)
    }

    run()
    return () => { mounted = false }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      {/* Background radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(255,255,255,0.03) 0%, transparent 70%)',
      }} />

      {/* Thin horizontal line */}
      <div style={{
        position: 'absolute', top: '50%', left: '5%', right: '5%',
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>

        {/* Surname — fades in above */}
        <div
          ref={surnameRef}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(12px, 1.5vw, 16px)',
            fontWeight: 500,
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
            marginBottom: '16px',
          }}
        >
          Peddishetti
        </div>

        {/* SURYA — letter by letter */}
        <div
          ref={nameRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(80px, 15vw, 200px)',
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: '#fff',
          }}
        >
          {['S', 'U', 'R', 'Y', 'A'].map((letter, i) => (
            <span
              key={i}
              className="hero-letter"
              style={{ display: 'inline-block' }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          style={{
            marginTop: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.2)' }} />
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(13px, 1.5vw, 16px)',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.15em',
          }}>
            Full Stack Developer · 3D Web · AI
          </p>
          <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.2)' }} />
        </div>

      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="scroll-bob"
        style={{
          position: 'absolute', bottom: '40px', left: '50%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
        }}
      >
        <span style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
          Scroll
        </span>
        <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
          <rect x="1" y="1" width="18" height="26" rx="9" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" />
          <rect x="9" y="5" width="2" height="6" rx="1" fill="white" fillOpacity="0.4" />
        </svg>
      </div>
    </section>
  )
}
