
'use client'

import { useEffect, useRef, useState } from 'react'

const APPS = [
  {
    id: 'mailmate',
    name: 'Mailmate',
    description:
      'Email agent that filters priority business correspondence and dispatches real-time Telegram alerts — so nothing critical falls through the noise.',
    frontColor: '#3B82F6',
    icon: (
      <svg viewBox="0 0 80 80" width="64" height="64" fill="none">
        <rect x="8" y="20" width="64" height="44" rx="6" stroke="white" strokeWidth="3"/>
        <path d="M8 26l32 20 32-20" stroke="white" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="62" cy="22" r="8" fill="#EF4444"/>
        <path d="M59 22h6M62 19v6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'slide',
    name: 'Slide',
    description:
      'AI news aggregator that distils complex global articles into high-impact briefings — the signal, never the noise. Built for people who think in first principles.',
    frontColor: '#8B5CF6',
    icon: (
      <svg viewBox="0 0 80 80" width="64" height="64" fill="none">
        <rect x="10" y="10" width="60" height="12" rx="4" fill="white"/>
        <rect x="10" y="30" width="44" height="12" rx="4" fill="white" fillOpacity="0.6"/>
        <rect x="10" y="50" width="30" height="12" rx="4" fill="white" fillOpacity="0.35"/>
        <circle cx="64" cy="60" r="10" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2"/>
        <path d="M60 60h8M64 56v8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'playful',
    name: 'Playful',
    description:
      'Advanced AI game engine that transforms text prompts into fully playable, immersive browser environments — no code, no assets, just words becoming worlds.',
    frontColor: '#F97316',
    icon: (
      <svg viewBox="0 0 80 80" width="64" height="64" fill="none">
        <rect x="8" y="20" width="64" height="44" rx="10" stroke="white" strokeWidth="3"/>
        <circle cx="28" cy="42" r="6" fill="white"/>
        <circle cx="52" cy="42" r="6" fill="white" fillOpacity="0.4"/>
        <path d="M37 34v16M29 42h16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M46 38l6 4-6 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

function FlipCard({ app, active }: { app: typeof APPS[number]; active: boolean }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      style={{
        opacity: active ? 1 : 0.25,
        transform: active ? 'scale(1)' : 'scale(0.88)',
        transition: 'opacity 0.5s ease, transform 0.5s var(--ease)',
      }}
    >
      <div
        className="flip-scene"
        style={{ width: '260px', height: '320px', cursor: 'pointer' }}
        onClick={() => setFlipped(v => !v)}
      >
        <div className={`flip-inner${flipped ? ' flipped' : ''}`}>

          {/* Front */}
          <div className="flip-front glass" style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '20px',
            boxShadow: active
              ? `0 0 50px ${app.frontColor}44, 0 0 0 1px ${app.frontColor}33`
              : '0 0 0 1px rgba(255,255,255,0.08)',
          }}>
            <div style={{
              width: '88px', height: '88px',
              borderRadius: '22px',
              background: `linear-gradient(135deg, ${app.frontColor}33, ${app.frontColor}11)`,
              border: `1px solid ${app.frontColor}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {app.icon}
            </div>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '22px', fontWeight: 700, color: '#fff',
            }}>
              {app.name}
            </p>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <div style={{ width: '16px', height: '1px', background: 'rgba(255,255,255,0.3)' }} />
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '10px',
                letterSpacing: '0.25em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
              }}>
                Tap to read
              </span>
              <div style={{ width: '16px', height: '1px', background: 'rgba(255,255,255,0.3)' }} />
            </div>
          </div>

          {/* Back */}
          <div className="flip-back glass noise" style={{
            padding: '28px 24px',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: `0 0 50px ${app.frontColor}55, 0 0 0 1px ${app.frontColor}44`,
          }}>
            <div>
              <div style={{
                height: '3px', borderRadius: '2px', marginBottom: '20px',
                background: `linear-gradient(90deg, ${app.frontColor}, transparent)`,
              }} />
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '10px',
                fontWeight: 500, letterSpacing: '0.35em',
                textTransform: 'uppercase', color: `${app.frontColor}`,
                marginBottom: '12px',
              }}>
                {app.name}
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px', lineHeight: 1.75,
                color: 'rgba(255,255,255,0.65)',
              }}>
                {app.description}
              </p>
            </div>
            <button
              onClick={e => { e.stopPropagation(); setFlipped(false) }}
              style={{
                marginTop: '20px', padding: '10px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                fontFamily: 'var(--font-body)', fontSize: '11px',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M10 6H2M5 3L2 6L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default function AppsSineWave() {
  const wrapRef    = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const pathRef    = useRef<SVGPathElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  // Sine wave path and card positions
  const W = 1200, H = 260
  const AMPLITUDE = 80, PERIOD = W / 2

  const sineY = (x: number) =>
    H / 2 - AMPLITUDE * Math.sin((2 * Math.PI * x) / PERIOD)

  // Card x positions along wave
  const cardXs = [W * 0.18, W * 0.5, W * 0.82]

  const buildPath = () => {
    const steps = 120
    let d = `M 0 ${sineY(0)}`
    for (let i = 1; i <= steps; i++) {
      const x = (i / steps) * W
      d += ` L ${x} ${sineY(x)}`
    }
    return d
  }

  useEffect(() => {
    let mounted = true
    let st: import('gsap/ScrollTrigger').ScrollTrigger

    const run = async () => {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const wrap    = wrapRef.current
      const section = sectionRef.current
      if (!wrap || !section || !mounted) return

      st = ScrollTrigger.create({
        trigger: section,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: 1,
        onUpdate(self) {
          // 0–0.33 → card 0 active, 0.33–0.66 → card 1, 0.66–1 → card 2
          const idx = Math.min(Math.floor(self.progress * 3), 2)
          if (mounted) setActiveIdx(idx)

          // Glowing dot travels along wave
          const dot = wrap.querySelector<SVGCircleElement>('.wave-dot')
          if (dot) {
            const x = self.progress * W
            const y = sineY(x)
            dot.setAttribute('cx', `${x}`)
            dot.setAttribute('cy', `${y}`)
          }
        },
      })
    }

    run()
    return () => { mounted = false; st?.kill() }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#000',
        padding: 'clamp(80px, 10vw, 140px) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{
        textAlign: 'center', marginBottom: '60px',
        padding: '0 clamp(24px, 6vw, 96px)',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '11px',
          fontWeight: 500, letterSpacing: '0.4em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
          marginBottom: '14px',
        }}>
          Products
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 5vw, 64px)',
          fontWeight: 900, color: '#fff', lineHeight: 1.05,
        }}>
          Three apps. One vision.
        </h2>
      </div>

      {/* SVG sine wave + cards */}
      <div
        ref={wrapRef}
        style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto' }}
      >
        {/* Wave SVG */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
        >
          {/* Glow filter */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="dotglow">
              <feGaussianBlur stdDeviation="6" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Shadow wave */}
          <path
            d={buildPath()} fill="none"
            stroke="rgba(255,255,255,0.06)" strokeWidth="6"
          />

          {/* Main glowing wave */}
          <path
            ref={pathRef}
            d={buildPath()} fill="none"
            stroke="white" strokeWidth="2"
            filter="url(#glow)"
          />

          {/* Card anchor dots */}
          {cardXs.map((x, i) => (
            <g key={i}>
              <circle
                cx={x} cy={sineY(x)} r="8"
                fill={i === activeIdx ? 'white' : 'rgba(255,255,255,0.2)'}
                filter={i === activeIdx ? 'url(#dotglow)' : undefined}
                style={{ transition: 'fill 0.4s ease' }}
              />
              <circle
                cx={x} cy={sineY(x)} r="4"
                fill={i === activeIdx ? '#000' : 'transparent'}
              />
            </g>
          ))}

          {/* Travelling dot */}
          <circle
            className="wave-dot"
            cx={0} cy={sineY(0)} r="5"
            fill="white" filter="url(#dotglow)"
          />
        </svg>

        {/* Cards — positioned over wave peaks */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          pointerEvents: 'none',
        }}>
          {APPS.map((app, i) => {
            const xPct = (cardXs[i] / W) * 100
            const y    = sineY(cardXs[i])
            const yPct = (y / H) * 100
            return (
              <div
                key={app.id}
                style={{
                  position: 'absolute',
                  left: `${xPct}%`,
                  top: `${yPct}%`,
                  transform: 'translate(-50%, -110%)',
                  pointerEvents: 'all',
                }}
              >
                <FlipCard app={app} active={activeIdx === i} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
        }
