'use client'

import { useEffect, useRef, useState } from 'react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const stats = [
  { value: 5247, suffix: '+', label: 'Usuários ativos', color: '#2350E8' },
  { value: 12483, suffix: '+', label: 'Matches realizados', color: '#10BE72' },
  { value: 300, suffix: '+', label: 'Projetos lançados', color: '#8B5CF6' },
  { value: 50, prefix: 'R$', suffix: 'M+', label: 'Capital disponível', color: '#F59E0B' },
]

function CountUp({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const animate = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{count.toLocaleString('pt-BR')}</span>
}

export default function Stats() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0A0A0A]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div
        className="absolute inset-0 opacity-30"
        style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(35,80,232,0.12), transparent)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 100} className="text-center">
              <div className="font-black text-5xl lg:text-6xl mb-3" style={{ color: stat.color }}>
                {stat.prefix}<CountUp target={stat.value} />{stat.suffix}
              </div>
              <p className="text-[#A0A0A0] text-sm font-medium">{stat.label}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
