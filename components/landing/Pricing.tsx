import Link from 'next/link'
import { Check } from 'lucide-react'
import Button from '@/components/ui/Button'

const plans = [
  {
    name: 'Gratuito',
    price: 'R$0',
    period: 'para sempre',
    description: 'Para começar a explorar o ecossistema.',
    color: '#888888',
    features: [
      '10 swipes por dia',
      '2 matches ativos',
      'Chat básico',
      'Perfil público',
      'Busca por área',
    ],
    cta: 'Começar grátis',
    href: '/register',
    highlight: false,
  },
  {
    name: 'Pro',
    price: 'R$49',
    period: 'por mês',
    description: 'Para quem quer se mover rápido e conectar mais.',
    color: '#2350E8',
    badge: 'Mais popular',
    features: [
      'Swipes ilimitados',
      'Matches ilimitados',
      'Chat prioritário',
      'Analytics de perfil',
      'Filtros avançados',
      'Verificação de perfil',
      'Suporte prioritário',
    ],
    cta: 'Assinar Pro',
    href: '/register?plan=pro',
    highlight: true,
  },
  {
    name: 'Empresa',
    price: 'R$199',
    period: 'por mês',
    description: 'Para startups, fundos e aceleradoras.',
    color: '#10BE72',
    features: [
      'Tudo do Pro',
      'Multi-perfil (até 5)',
      'Acesso a investidores verificados',
      'Dashboard de equipe',
      'Relatórios avançados',
      'API de integração',
      'Gerente de conta dedicado',
    ],
    cta: 'Falar com vendas',
    href: '/contact',
    highlight: false,
  },
]

export default function Pricing() {
  return (
    <section id="precos" className="py-24 relative">
      <div className="absolute inset-0 bg-[#0A0A0A]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#F59E0B] font-semibold text-sm tracking-wider uppercase mb-3">Preços</p>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-[#F5F5F5] mb-4">
            Simples e transparente
          </h2>
          <p className="text-[#888888] text-lg max-w-xl mx-auto">
            Comece grátis. Faça upgrade quando o SociUS começar a mudar sua trajetória.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.highlight
                  ? 'ring-2 ring-[#2350E8] shadow-2xl shadow-[#2350E8]/20'
                  : 'glass'
              }`}
              style={plan.highlight ? { background: '#111827' } : undefined}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-[#2350E8] text-white text-xs font-bold px-4 py-1 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <h3 className="font-bold text-[#F5F5F5] text-lg mb-1">{plan.name}</h3>
                <p className="text-[#888888] text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#F5F5F5]">{plan.price}</span>
                  <span className="text-[#888888] text-sm">/{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-[#888888]">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: `${plan.color}20` }}
                    >
                      <Check size={10} style={{ color: plan.color }} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href={plan.href}>
                <Button
                  fullWidth
                  variant={plan.highlight ? 'primary' : 'secondary'}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-[#555555] text-xs mt-8">
          Todos os planos incluem 14 dias de teste grátis. Sem cartão de crédito necessário.
        </p>
      </div>
    </section>
  )
}
