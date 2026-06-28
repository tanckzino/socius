import { Rocket, DollarSign, Code2, Handshake, Zap } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const profiles = [
  {
    icon: Rocket,
    role: 'Fundador',
    color: '#2350E8',
    description: 'Tem uma ideia e visão. Busca co-fundadores, capital e times para executar.',
    tags: ['Startup', 'Liderança', 'Visão'],
  },
  {
    icon: DollarSign,
    role: 'Investidor',
    color: '#10BE72',
    description: 'Capital disponível para apoiar startups promissoras em troca de equity.',
    tags: ['Angel', 'Venture Capital', 'Equity'],
  },
  {
    icon: Code2,
    role: 'Desenvolvedor',
    color: '#8B5CF6',
    description: 'Habilidade técnica para construir o produto. Busca co-fundador e ideia.',
    tags: ['CTO', 'Full Stack', 'Mobile'],
  },
  {
    icon: Handshake,
    role: 'Parceiro Estratégico',
    color: '#F59E0B',
    description: 'Expertise em go-to-market, operações e crescimento de negócios.',
    tags: ['Growth', 'GTM', 'Operações'],
  },
  {
    icon: Zap,
    role: 'Prestador de Serviço',
    color: '#EC4899',
    description: 'Agências, freelancers e especialistas que atuam em equity ou projetos.',
    tags: ['Design', 'Marketing', 'Jurídico'],
  },
]

export default function ProfileTypes() {
  return (
    <section id="perfis" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-20">
          <p className="text-[#2350E8] font-semibold text-sm tracking-wider uppercase mb-4">Para quem é</p>
          <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-[#F5F5F5] mb-6 leading-tight">
            Cada perfil tem seu lugar no SociUS
          </h2>
          <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto leading-relaxed">
            Seja qual for sua contribuição para o ecossistema, encontramos as conexões certas para você.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {profiles.map((profile, i) => {
            const Icon = profile.icon
            return (
              <ScrollReveal key={profile.role} delay={i * 80}>
                <div className="glass rounded-2xl p-8 card-hover group cursor-default h-full">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                    style={{ background: `${profile.color}15`, border: `1px solid ${profile.color}25` }}
                  >
                    <Icon size={22} style={{ color: profile.color }} />
                  </div>

                  <h3 className="font-bold text-[#F5F5F5] mb-3">{profile.role}</h3>
                  <p className="text-sm text-[#888888] leading-relaxed mb-5">{profile.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {profile.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{ background: `${profile.color}12`, color: profile.color }}
                      >
                        {tag}
                      </span>
                    ))}
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
