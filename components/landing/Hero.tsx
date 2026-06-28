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

// Pilha estilo Tinder: card da frente totalmente legível.
// Rotação alternada ± pequena cria o visual de "baralho empilhado" sem vazar texto.
// Fundo sólido é obrigatório — glass transparente vaza o conteúdo entre cards.
const CARD_CONFIGS = [
  { y: 0,  rotate: '0deg',  zIndex: 30, bg: '#1E1E1E' }, // frente: direto
  { y: 6,  rotate: '3deg',  zIndex: 20, bg: '#191919' }, // meio: leve para direita
  { y: 10, rotate: '-2deg', zIndex: 10, bg: '#161616' }, // fundo: leve para esquerda
]

function MiniSwipeCard({ card, index }: { card: typeof mockCards[0]; index: number }) {
  const cfg = CARD_CONFIGS[index]

  return (
    <div
      className="absolute top-0 left-0 w-full"
      style={{
        transform: `translateY(${cfg.y}px) rotate(${cfg.rotate})`,
        zIndex: cfg.zIndex,
        transformOrigin: 'center center',
      }}
    >
      {/* Fundo opaco + altura mínima uniforme para o efeito de pilha funcionar */}
      <div
        className="rounded-2xl p-5 shadow-2xl"
        style={{
          minHeight: '300px',
          background: cfg.bg,
          border: '1px solid rgba(255,255,255,0.10)',
        }}
      >
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base flex-shrink-0"
            style={{ background: `${card.color}25`, color: card.color, border: `1px solid ${card.color}30` }}
          >
            {card.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold text-[#F5F5F5] text-sm truncate">{card.name}</p>
              {index === 0 && (
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: `${card.color}20`, color: card.color }}
                >
                  {card.score}%
                </span>
              )}
            </div>
            <p className="text-xs text-[#888888] mt-0.5">{card.role} · {card.city}</p>
          </div>
        </div>

        {/* Conteúdo completo apenas no card da frente */}
        {index === 0 && (
          <>
            <p className="text-xs text-[#888888] mb-3 leading-relaxed line-clamp-2">{card.bio}</p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {card.skills.map((s) => (
                <span
                  key={s}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/6 text-[#888888] border border-white/8"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-xl text-xs font-semibold bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20 hover:bg-[#EF4444]/20 transition-colors">
                ✕ Passar
              </button>
              <button className="flex-1 py-2 rounded-xl text-xs font-semibold bg-[#10BE72]/10 text-[#10BE72] border border-[#10BE72]/20 hover:bg-[#10BE72]/20 transition-colors">
                ♥ Curtir
              </button>
            </div>
          </>
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2350E8]/10 border border-[#2350E8]/20 text-[#4169FF] text-xs font-semibold mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10BE72] animate-pulse" />
              A plataforma de match do ecossistema empreendedor
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.0] mb-8">
              <span className="text-[#F5F5F5]">Encontre seu</span>
              <br />
              <span className="gradient-text">próximo sócio.</span>
            </h1>

            <p className="text-xl text-[#A0A0A0] leading-relaxed mb-10 max-w-lg">
              A plataforma que conecta{' '}
              <strong className="text-[#F5F5F5]">founders, investidores e desenvolvedores</strong>{' '}
              para construir o futuro juntos. Dê um swipe e mude sua trajetória.
            </p>

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
          <div className="flex items-center justify-center lg:justify-end">
            {/* Container com altura fixa — acomoda o card da frente + espiada dos cards de trás */}
            <div className="relative w-full max-w-xs mx-auto lg:mx-0" style={{ height: '360px' }}>
              {[...mockCards].reverse().map((card, reverseIndex) => {
                const index = mockCards.length - 1 - reverseIndex
                return <MiniSwipeCard key={card.name} card={card} index={index} />
              })}

              {/* Badge "Match realizado!" — flutua à esquerda do card */}
              <div
                className="absolute top-6 glass rounded-xl px-3 py-2.5 shadow-xl hidden lg:block"
                style={{ left: '-7rem', zIndex: 40 }}
              >
                <p className="text-[10px] text-[#888888] mb-0.5">Match realizado!</p>
                <p className="text-xs font-semibold text-[#10BE72]">♥ Rafael + Ana</p>
              </div>

              {/* Badge "Compatibilidade 94%" — flutua à direita/baixo do card */}
              <div
                className="absolute bottom-10 glass rounded-xl px-3 py-2.5 shadow-xl hidden lg:block"
                style={{ right: '-5rem', zIndex: 40 }}
              >
                <p className="text-[10px] text-[#888888] mb-0.5">Compatibilidade</p>
                <p className="text-sm font-black text-[#F5F5F5]">94%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
