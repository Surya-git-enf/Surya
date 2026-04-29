
'use client'

import { useRef, useEffect } from 'react'

const SKILLS = [
  {
    name: 'Python',
    glow: '#3B82F6',
    svg: (
      <svg viewBox="0 0 128 128" width="52" height="52">
        <path fill="white" d="M49.33 62h29.34C86.53 62 93 55.55 93 47.66V27.86C93 20.14 86.2 14.3 78.44 13.06a103.6 103.6 0 0 0-14.92-1c-5.27 0-10.22.37-14.2 1.06C41.78 14.29 35 20.14 35 27.86V38h29.33v4H23.5c-7.78 0-14.59 4.68-16.72 13.56C4.06 65.83 4 69.75 4 73.33c0 3.65.11 7.48 2.78 10.15C9.47 86.16 12.57 87 15.5 87H25v-12c0-8.79 7.61-16.5 16.5-16.5zM50 31.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
        <path fill="white" d="M78.67 66H49.33C41.47 66 35 72.45 35 80.34v19.8c0 7.72 6.8 13.56 14.56 14.8a103.6 103.6 0 0 0 14.92 1c5.27 0 10.22-.37 14.2-1.06 7.54-1.23 14.32-7.08 14.32-14.8V90H64v-4h41.5c7.78 0 14.59-4.68 16.72-13.56C124 63.17 124 59.25 124 55.67c0-3.65-.11-7.48-2.78-10.15C118.53 42.84 115.43 42 112.5 42H103v12c0 8.79-7.61 16.5-16.5 16.5zM78 96.5c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5z"/>
      </svg>
    ),
  },
  {
    name: 'FastAPI',
    glow: '#10B981',
    svg: (
      <svg viewBox="0 0 128 128" width="52" height="52">
        <path fill="white" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm-4 98.8L62 67H40.5L68 29.2 66 61h20.5L58 98.8z"/>
      </svg>
    ),
  },
  {
    name: 'n8n',
    glow: '#F97316',
    svg: (
      <svg viewBox="0 0 128 128" width="52" height="52">
        <circle cx="24" cy="64" r="16" fill="white" />
        <circle cx="64" cy="32" r="16" fill="white" />
        <circle cx="104" cy="64" r="16" fill="white" />
        <circle cx="64" cy="96" r="16" fill="white" />
        <line x1="24" y1="64" x2="64" y2="32" stroke="white" strokeWidth="5" />
        <line x1="64" y1="32" x2="104" y2="64" stroke="white" strokeWidth="5" />
        <line x1="104" y1="64" x2="64" y2="96" stroke="white" strokeWidth="5" />
        <line x1="64" y1="96" x2="24" y2="64" stroke="white" strokeWidth="5" />
      </svg>
    ),
  },
  {
    name: 'C Language',
    glow: '#6366F1',
    svg: (
      <svg viewBox="0 0 128 128" width="52" height="52">
        <path fill="white" d="M64 4C32.3 4 6.6 29.7 6.6 61.4c0 31.7 25.7 57.4 57.4 57.4s57.4-25.7 57.4-57.4C121.4 29.7 95.7 4 64 4zm-5.4 84.6c-15.6 0-26.2-10.6-26.2-27.2 0-16.6 10.6-27.2 26.2-27.2 7.8 0 14.2 2.8 19 7.8l-7.2 8.8c-3-3-6.4-4.8-10.8-4.8-8.4 0-14 6.4-14 15.4s5.6 15.4 14 15.4c4.4 0 7.8-1.8 10.8-4.8l7.2 8.8c-4.8 5-11.2 7.8-19 7.8zm44.2-2h-8v-8h8v8zm0-14h-8v-8h8v8z"/>
      </svg>
    ),
  },
  {
    name: '3D WebGL',
    glow: '#8B5CF6',
    svg: (
      <svg viewBox="0 0 128 128" width="52" height="52">
        <polygon points="64,8 120,40 120,88 64,120 8,88 8,40" fill="none" stroke="white" strokeWidth="6"/>
        <polygon points="64,28 100,48 100,80 64,100 28,80 28,48" fill="none" stroke="white" strokeWidth="3" strokeOpacity="0.5"/>
        <line x1="64" y1="8"   x2="64"  y2="28"  stroke="white" strokeWidth="3"/>
        <line x1="120" y1="40" x2="100" y2="48"  stroke="white" strokeWidth="3"/>
        <line x1="120" y1="88" x2="100" y2="80"  stroke="white" strokeWidth="3"/>
        <line x1="64"  y1="120" x2="64" y2="100" stroke="white" strokeWidth="3"/>
        <line x1="8"   y1="88"  x2="28" y2="80"  stroke="white" strokeWidth="3"/>
        <line x1="8"   y1="40"  x2="28" y2="48"  stroke="white" strokeWidth="3"/>
        <circle cx="64" cy="64" r="10" fill="white"/>
      </svg>
    ),
  },
  {
    name: 'Supabase',
    glow: '#22D3EE',
    svg: (
      <svg viewBox="0 0 128 128" width="52" height="52">
        <path fill="white" d="M73.27 116.84c-3.3 4.15-10.05 2-10.12-3.27L61.7 64H103c7.53 0 11.72 8.73 7 14.4z"/>
        <path fill="white" fillOpacity=".6" d="M54.73 11.16c3.3-4.15 10.05-2 10.12 3.27L66.3 64H25c-7.53 0-11.72-8.73-7-14.4z"/>
      </svg>
    ),
  },
  {
    name: 'Prompt Engineering',
    glow: '#F59E0B',
    svg: (
      <svg viewBox="0 0 128 128" width="52" height="52">
        <path fill="white" d="M64 8l8.8 26.4L98 28.8l-18.4 21.4 18.4 21.4-25.2-5.6L64 92l-8.8-26.4L30 71.2l18.4-21.4L30 28.4l25.2 5.6z"/>
        <circle cx="24" cy="104" r="8" fill="white" fillOpacity="0.4"/>
        <circle cx="104" cy="16" r="6" fill="white" fillOpacity="0.3"/>
        <circle cx="112" cy="96" r="10" fill="white" fillOpacity="0.25"/>
      </svg>
    ),
  },
  {
    name: 'Full Stack',
    glow: '#EC4899',
    svg: (
      <svg viewBox="0 0 128 128" width="52" height="52">
        <rect x="16" y="16" width="96" height="20" rx="4" fill="white"/>
        <rect x="16" y="46" width="96" height="20" rx="4" fill="white" fillOpacity="0.65"/>
        <rect x="16" y="76" width="96" height="20" rx="4" fill="white" fillOpacity="0.35"/>
        <circle cx="108" cy="108" r="12" fill="white" fillOpacity="0.5"/>
        <circle cx="20"  cy="108" r="8"  fill="white" fillOpacity="0.3"/>
      </svg>
    ),
  },
]

export default function SkillsOrbit() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && headRef.current) {
          headRef.current.style.opacity   = '1'
          headRef.current.style.transform = 'translateY(0)'
        }
      },
      { threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#000',
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 6vw, 96px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div
        ref={headRef}
        style={{
          textAlign: 'center', marginBottom: '80px',
          opacity: 0, transform: 'translateY(28px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
          position: 'relative', zIndex: 1,
        }}
      >
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '11px',
          fontWeight: 500, letterSpacing: '0.4em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
          marginBottom: '16px',
        }}>
          The Stack
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 5vw, 64px)',
          fontWeight: 900, color: '#fff', lineHeight: 1.05,
        }}>
          Tools of the craft.
        </h2>
      </div>

      {/* Skill icons grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: 'clamp(20px, 3vw, 40px)',
        maxWidth: '900px',
        margin: '0 auto',
        position: 'relative', zIndex: 1,
      }}>
        {SKILLS.map((skill) => (
          <div
            key={skill.name}
            title={skill.name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px 20px',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              cursor: 'pointer',
              transition: 'transform 0.3s var(--ease), box-shadow 0.3s ease, background 0.3s ease',
            }}
            onMouseEnter={e => {
              const d = e.currentTarget as HTMLDivElement
              d.style.transform  = 'scale(1.1) translateY(-4px)'
              d.style.background = 'rgba(255,255,255,0.06)'
              d.style.boxShadow  = `0 0 40px ${skill.glow}55, 0 0 80px ${skill.glow}22`
              const svg = d.querySelector('svg') as SVGElement
              if (svg) svg.style.filter = `drop-shadow(0 0 12px ${skill.glow})`
            }}
            onMouseLeave={e => {
              const d = e.currentTarget as HTMLDivElement
              d.style.transform  = 'scale(1) translateY(0)'
              d.style.background = 'rgba(255,255,255,0.03)'
              d.style.boxShadow  = 'none'
              const svg = d.querySelector('svg') as SVGElement
              if (svg) svg.style.filter = 'none'
            }}
          >
            <div style={{ transition: 'filter 0.3s ease' }}>
              {skill.svg}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
