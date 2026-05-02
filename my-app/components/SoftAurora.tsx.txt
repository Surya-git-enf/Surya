'use client';
import { useEffect, useRef } from 'react';

function hexToVec3(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

interface SoftAuroraProps {
  speed?: number;
  color1?: string;
  color2?: string;
  brightness?: number;
}

export default function SoftAurora({
  speed = 0.6,
  color1 = '#3b82f6',
  color2 = '#a855f7',
  brightness = 1.2,
}: SoftAuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const c1 = hexToVec3(color1);
    const c2 = hexToVec3(color2);

    function resize() {
      if (!canvas) return;
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Draw 3 aurora bands
      for (let layer = 0; layer < 3; layer++) {
        const offset = layer * 0.8;
        const col = layer % 2 === 0 ? c1 : c2;

        const grad = ctx.createLinearGradient(0, 0, w, 0);
        for (let i = 0; i <= 10; i++) {
          const x = i / 10;
          const wave = Math.sin(x * Math.PI * 3 + t * speed + offset) * 0.12 +
                       Math.sin(x * Math.PI * 5 + t * speed * 0.7 + offset * 1.3) * 0.06;
          const alpha = Math.max(0, 0.18 * brightness * (1 - Math.abs(wave) * 4));
          grad.addColorStop(x, `rgba(${Math.round(col[0]*255)},${Math.round(col[1]*255)},${Math.round(col[2]*255)},${alpha})`);
        }

        const bandY = h * (0.3 + layer * 0.15 + Math.sin(t * speed * 0.4 + offset) * 0.08);
        const bandH = h * (0.35 + Math.sin(t * speed * 0.3 + offset) * 0.05);

        const vGrad = ctx.createLinearGradient(0, bandY - bandH / 2, 0, bandY + bandH / 2);
        const r = Math.round(col[0] * 255);
        const g = Math.round(col[1] * 255);
        const b = Math.round(col[2] * 255);
        const alpha = 0.22 * brightness;
        vGrad.addColorStop(0,   `rgba(${r},${g},${b},0)`);
        vGrad.addColorStop(0.5, `rgba(${r},${g},${b},${alpha})`);
        vGrad.addColorStop(1,   `rgba(${r},${g},${b},0)`);

        ctx.save();
        ctx.fillStyle = vGrad;
        ctx.fillRect(0, bandY - bandH / 2, w, bandH);
        ctx.restore();
      }

      t += 0.016;
      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [speed, color1, color2, brightness]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}
