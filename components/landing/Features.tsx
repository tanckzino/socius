import { Heart, MessageSquare, Search, Shield, BarChart3, Users } from 'lucide-react'

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
    <section className="py-24 relative">
      {/* Background divider line */}
      <div className="absolute inset-0 bg-[#0A0A0A]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#10BE72] font-semibold text-sm tracking-wider uppercase mb-3">Funcionalidades</p>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-[#F5F5F5] mb-4">
            Tudo que você precisa para fazer
            <br />
            <span className="gradient-text">o match certo</span>
          </h2>
          <p className="text-[#888888] text-lg max-w-2xl mx-auto">
            Uma plataforma completa para conectar talentos, capital e ideias no ecossistema empreendedor.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="relative glass rounded-2xl p-6 card-hover group overflow-hidden"
              >
                {/* Background glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: `radial-gradient(ellipse at 0% 0%, ${feature.color}08 0%, transparent 60%)`,
                  }}
                />

                <div className="relative">
                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${feature.color}15`, border: `1px solid ${feature.color}20` }}
                  >
                    <Icon size={20} style={{ color: feature.color }} />
                  </div>

                  {/* Content */}
                  <h3 className="font-bold text-[#F5F5F5] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#888888] leading-relaxed">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
