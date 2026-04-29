
'use client'

import { useEffect, useRef } from 'react'

const PANELS = [
  {
    id: 'personal',
    label: 'About',
    heading: 'Peddishetti Surya',
    meta: 'Age 20',
    body: 'I build full stack AI apps and design immersive 3D websites that convert visitors into customers.',
    glow: 'rgba(250, 220, 80, 0.35)',
    border: 'rgba(250, 220, 80, 0.22)',
    tag: 'Full Stack · AI · 3D Web',
  },
  {
    id: 'education',
    label: 'Education',
    heading: 'Diploma in ECE',
    meta: 'ESC Govt Polytechnic College · 2023–2026',
    body: 'Electronics & Communication Engineering — building bridges between hardware instincts and software ambition.',
    glow: 'rgba(79, 195, 247, 0.35)',
    border: 'rgba(79, 195, 247, 0.22)',
    tag: 'Engineering · 2026',
  },
  {
    id: 'hobbies',
    label: 'Interests',
    heading: 'Beyond the Code',
    meta: 'What drives the work',
    body: 'Listening to music between builds. Learning new frameworks out of curiosity. Watching films for the cinematography, not just the story.',
    glow: 'rgba(244, 114, 182, 0.35)',
    border: 'rgba(244, 114, 182, 0.22)',
    tag: 'Music · Film · Code',
  },
]

export default function CanvasScroll() {
  const wrapRef    = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const panelRefs  = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    let mounted = true
    let st: import('gsap/ScrollTrigger').ScrollTrigger

    const run = async () => {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const wrap   = wrapRef.current
      const canvas = canvasRef.current
      if (!wrap || !canvas || !mounted) return

      const ctx = canvas.getContext('2d')!
      const TOTAL = 384

      // ── Frame loader ──
      const frames: HTMLImageElement[] = Array.from({ length: TOTAL }, (_, i) => {
        const img = new Image()
        img.src = `/sequence/frame_${String(i + 1).padStart(4, '0')}.jpg`
        return img
      })

      const resize = () => {
        canvas.width  = window.innerWidth
        canvas.height = window.innerHeight
        drawFrame(0)
      }
      window.addEventListener('resize', resize)
      resize()

      let currentFrame = 0
      const drawFrame = (index: number) => {
        const img = frames[Math.min(index, TOTAL - 1)]
        if (!img.complete) return
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight)
        const w = img.naturalWidth  * scale
        const h = img.naturalHeight * scale
        const x = (canvas.width  - w) / 2
        const y = (canvas.height - h) / 2
        ctx.drawImage(img, x, y, w, h)
      }

      // Draw first frame on load
      frames[0].onload = () => drawFrame(0)

      st = ScrollTrigger.create({
        trigger: wrap,
        start: 'top top',
        end: '+=500%',
        pin: true,
        scrub: 1,
        onUpdate(self) {
          const p = self.progress

          // Frame scrub
          const idx = Math.round(p * (TOTAL - 1))
          if (idx !== currentFrame) {
            currentFrame = idx
            drawFrame(idx)
          }

          // Panel reveals — each at 33%, 55%, 77% progress
          const thresholds = [0.28, 0.52, 0.74]
          panelRefs.current.forEach((panel, i) => {
            if (!panel) return
            if (p >= thresholds[i]) {
              const pp = Math.min((p - thresholds[i]) / 0.12, 1)
              panel.style.opacity   = `${pp}`
              panel.style.transform = `translateY(${(1 - pp) * 48}px)`
            } else {
              panel.style.opacity   = '0'
              panel.style.transform = 'translateY(48px)'
            }
          })
        },
      })
    }

    run()
    return () => {
      mounted = false
      st?.kill()
    }
  }, [])

  return (
    <section ref={wrapRef} style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#000' }}>
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />

      {/* Dark vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)',
      }} />

      {/* Panels container */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        display: 'flex', alignItems: 'flex-end',
        padding: 'clamp(24px, 4vw, 64px)',
        gap: 'clamp(16px, 2vw, 28px)',
      }}>
        {PANELS.map((panel, i) => (
          <div
            key={panel.id}
            ref={el => { panelRefs.current[i] = el }}
            className="glass noise"
            style={{
              flex: 1,
              padding: 'clamp(20px, 2.5vw, 36px)',
              opacity: 0,
              transform: 'translateY(48px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
              position: 'relative',
              boxShadow: `0 0 40px ${panel.glow}, 0 0 0 1px ${panel.border}`,
              border: `1px solid ${panel.border}`,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                `0 0 70px ${panel.glow}, 0 0 0 1px ${panel.border}`
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                `0 0 40px ${panel.glow}, 0 0 0 1px ${panel.border}`
            }}
          >
            {/* Tag */}
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '10px',
              fontWeight: 500, letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)', marginBottom: '16px',
              position: 'relative', zIndex: 1,
            }}>
              {panel.label}
            </p>

            {/* Heading */}
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(18px, 2vw, 26px)',
              fontWeight: 700, color: '#fff', lineHeight: 1.2,
              marginBottom: '6px', position: 'relative', zIndex: 1,
            }}>
              {panel.heading}
            </h3>

            {/* Meta */}
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '12px',
              color: 'rgba(255,255,255,0.35)', marginBottom: '16px',
              position: 'relative', zIndex: 1,
            }}>
              {panel.meta}
            </p>

            {/* Divider */}
            <div style={{
              height: '1px', marginBottom: '16px',
              background: 'linear-gradient(to right, rgba(255,255,255,0.12), transparent)',
              position: 'relative', zIndex: 1,
            }} />

            {/* Body */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(13px, 1.2vw, 15px)',
              lineHeight: 1.75, color: 'rgba(255,255,255,0.55)',
              position: 'relative', zIndex: 1,
            }}>
              {panel.body}
            </p>

            {/* Bottom tag */}
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '10px',
              fontWeight: 500, letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.18)', marginTop: '20px',
              position: 'relative', zIndex: 1,
            }}>
              {panel.tag}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
                }
