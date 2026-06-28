import { Heart, MessageSquare, Search, Shield, BarChart3, Users } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const features = [
  {
    icon: Heart,
    title: 'Match inteligente',
    description: 'Algoritmo de compatibilidade baseado em objetivos, skills e interesses. Cada swipe é direcionado.',
    color: '#2350E8',
  },
  {
    icon: MessageSquare,
    title: 'Chat em tempo real',
    description: 'Converse diretamente com seus matches. Mensagens instantâneas, sem intermediários.',
    color: '#10BE72',
  },
  {
    icon: Search,
    title: 'Busca avançada',
    description: 'Filtre por cidade, área, capital disponível, disponibilidade e muito mais.',
    color: '#8B5CF6',
  },
  {
    icon: Shield,
    title: 'Verificação de perfil',
    description: 'Sistema de verificação de identidade para garantir conexões reais e confiáveis.',
    color: '#F59E0B',
  },
  {
    icon: BarChart3,
    title: 'Analytics de perfil',
    description: 'Visualize quem viu seu perfil, taxa de match e insights para otimizar sua presença.',
    color: '#EC4899',
  },
  {
    icon: Users,
    title: 'Feed de oportunidades',
    description: 'Explore projetos ativos, vagas de co-fundação e oportunidades de investimento.',
    color: '#06B6D4',
  },
]

export default function Features() {
  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-[#0A0A0A]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-20">
          <p className="text-[#10BE72] font-semibold text-sm tracking-wider uppercase mb-4">Funcionalidades</p>
          <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-[#F5F5F5] mb-6 leading-tight">
            Tudo que você precisa para
            <br />
            <span className="gradient-text">o match certo</span>
          </h2>
          <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto leading-relaxed">
            Uma plataforma completa para conectar talentos, capital e ideias no ecossistema empreendedor.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <ScrollReveal key={feature.title} delay={i * 80}>
                <div className="relative glass rounded-2xl p-8 card-hover group overflow-hidden h-full">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{
                      background: `radial-gradient(ellipse at 0% 0%, ${feature.color}08 0%, transparent 60%)`,
                    }}
                  />

                  <div className="relative">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: `${feature.color}15`, border: `1px solid ${feature.color}20` }}
                    >
                      <Icon size={22} style={{ color: feature.color }} />
                    </div>

                    <h3 className="font-bold text-[#F5F5F5] text-lg mb-3">{feature.title}</h3>
                    <p className="text-sm text-[#888888] leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
