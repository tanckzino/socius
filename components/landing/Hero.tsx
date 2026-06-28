'use client'

import Link from 'next/link'
import { ArrowRight, Zap, Shield, TrendingUp } from 'lucide-react'
import Button from '@/components/ui/Button'
import { ROLE_COLORS } from '@/lib/types'

const mockCards = [
  {
    name: 'Rafael Mendes',
    role: 'Fundador',
    city: 'São Paulo, SP',
    bio: 'Buscando CTO para fintech de crédito. R$150K disponível para investimento.',
    skills: ['Product', 'Finanças', 'Vendas'],
    score: 94,
    color: ROLE_COLORS.founder,
    initials: 'RM',
  },
  {
    name: 'Ana Ferreira',
    role: 'Desenvolvedora',
    city: 'Florianópolis, SC',
    bio: 'Engenheira de IA com 8 anos de exp. Quero co-fundar healthtech.',
    skills: ['Python', 'ML', 'AWS'],
    score: 89,
    color: ROLE_COLORS.developer,
    initials: 'AF',
  },
  {
    name: 'Carlos Inv.',
    role: 'Investidor',
    city: 'Rio de Janeiro, RJ',
    bio: 'Angel investor. 12 startups no portfolio. Ticket médio R$200K.',
    skills: ['Finanças', 'B2B', 'Fintech'],
    score: 87,
    color: ROLE_COLORS.investor,
    initials: 'CI',
  },
]

function MiniSwipeCard({ card, index }: { card: typeof mockCards[0]; index: number }) {
  const offsets = [
    { rotate: '0deg', y: 0, scale: 1, z: 3 },
    { rotate: '-4deg', y: 12, scale: 0.95, z: 2 },
    { rotate: '-8deg', y: 22, scale: 0.90, z: 1 },
  ]
  const o = offsets[index]

  return (
    <div
      className="absolute w-full"
      style={{
        transform: `rotate(${o.rotate}) translateY(${o.y}px) scale(${o.scale})`,
        zIndex: o.z,
        transformOrigin: 'bottom center',
      }}
    >
      <div className="glass-strong rounded-2xl p-5 shadow-2xl">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base flex-shrink-0"
            style={{ background: `${card.color}25`, color: card.color, border: `1px solid ${card.color}30` }}
          >
            {card.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold text-[#F5F5F5] text-sm truncate">{card.name}</p>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                style={{ background: `${card.color}20`, color: card.color }}
              >
                {card.score}%
              </span>
            </div>
            <p className="text-xs text-[#888888] mt-0.5">{card.role} · {card.city}</p>
          </div>
        </div>

        {/* Bio */}
        {index === 0 && (
          <p className="text-xs text-[#888888] mb-3 leading-relaxed line-clamp-2">{card.bio}</p>
        )}

        {/* Skills */}
        {index === 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {card.skills.map((s) => (
              <span key={s} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/6 text-[#888888] border border-white/8">
                {s}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        {index === 0 && (
          <div className="flex gap-2">
            <button className="flex-1 py-2 rounded-xl text-xs font-semibold bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20 hover:bg-[#EF4444]/20 transition-colors">
              ✕ Passar
            </button>
            <button className="flex-1 py-2 rounded-xl text-xs font-semibold bg-[#10BE72]/10 text-[#10BE72] border border-[#10BE72]/20 hover:bg-[#10BE72]/20 transition-colors">
              ♥ Curtir
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute inset-0 mesh-gradient" />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.07] blur-3xl"
        style={{ background: 'radial-gradient(circle, #2350E8, transparent)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2350E8]/10 border border-[#2350E8]/20 text-[#4169FF] text-xs font-semibold mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10BE72] animate-pulse" />
              A plataforma de match do ecossistema empreendedor
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.0] mb-8">
              <span className="text-[#F5F5F5]">Encontre seu</span>
              <br />
              <span className="gradient-text">próximo sócio.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-[#A0A0A0] leading-relaxed mb-10 max-w-lg">
              A plataforma que conecta <strong className="text-[#F5F5F5]">founders, investidores e desenvolvedores</strong> para construir
              o futuro juntos. Dê um swipe e mude sua trajetória.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-14">
              <Link href="/register">
                <Button size="lg" className="shadow-xl shadow-[#2350E8]/25">
                  Criar perfil grátis
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <a href="#como-funciona">
                <Button variant="secondary" size="lg">
                  Ver como funciona
                </Button>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-[#888888]">
                <Zap size={14} className="text-[#10BE72]" />
                <span>+5.000 perfis ativos</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#888888]">
                <Shield size={14} className="text-[#2350E8]" />
                <span>Verificação de identidade</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#888888]">
                <TrendingUp size={14} className="text-[#F59E0B]" />
                <span>R$50M+ em capital disponível</span>
              </div>
            </div>
          </div>

          {/* Right: Swipe card mockup */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-xs mx-auto lg:mx-0" style={{ height: '340px' }}>
              {[...mockCards].reverse().map((card, reverseIndex) => {
                const index = mockCards.length - 1 - reverseIndex
                return <MiniSwipeCard key={card.name} card={card} index={index} />
              })}
            </div>

            {/* Floating stats */}
            <div className="absolute -left-4 top-8 glass rounded-xl px-3 py-2.5 shadow-xl hidden lg:block">
              <p className="text-[10px] text-[#888888] mb-0.5">Match realizado!</p>
              <p className="text-xs font-semibold text-[#10BE72]">♥ Rafael + Ana</p>
            </div>
            <div className="absolute -right-2 bottom-12 glass rounded-xl px-3 py-2.5 shadow-xl hidden lg:block">
              <p className="text-[10px] text-[#888888] mb-0.5">Compatibilidade</p>
              <p className="text-sm font-black text-[#F5F5F5]">94%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
