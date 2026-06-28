import ScrollReveal from '@/components/ui/ScrollReveal'

const testimonials = [
  {
    name: 'Fernanda Costa',
    role: 'Founder, MedSync',
    avatar: 'FC',
    color: '#2350E8',
    quote:
      'Encontrei meu CTO no SociUS em menos de 2 semanas. Hoje temos um MVP rodando e já captamos R$300K de seed. Sem essa plataforma, eu estaria ainda procurando no LinkedIn sem resultado.',
    metric: 'R$300K captados',
  },
  {
    name: 'Bruno Nascimento',
    role: 'Angel Investor',
    avatar: 'BN',
    color: '#10BE72',
    quote:
      'Investi em 3 startups descobertas no SociUS nos últimos 6 meses. A qualidade dos perfis e a curadoria do algoritmo economizaram meu tempo e me conectaram com founders excepcionais.',
    metric: '3 investimentos realizados',
  },
  {
    name: 'Lucas Oliveira',
    role: 'CTO, AgriData',
    avatar: 'LO',
    color: '#8B5CF6',
    quote:
      'Como desenvolvedor, sempre tive dificuldade de encontrar co-fundadores com visão de negócio. O SociUS mudou isso. Encontrei o parceiro certo em 3 semanas.',
    metric: 'Empresa co-fundada',
  },
]

export default function Testimonials() {
  return (
    <section className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-20">
          <p className="text-[#EC4899] font-semibold text-sm tracking-wider uppercase mb-4">Histórias reais</p>
          <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-[#F5F5F5] mb-6 leading-tight">
            Quem usou, construiu algo grande
          </h2>
          <p className="text-[#A0A0A0] text-lg max-w-xl mx-auto leading-relaxed">
            Mais de 300 projetos lançados por pessoas que se encontraram aqui.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 100}>
              <div className="glass rounded-2xl p-8 flex flex-col gap-6 h-full">
                <div className="text-4xl text-[#2A2A2A] font-black leading-none">"</div>
                <p className="text-[#A0A0A0] text-sm leading-relaxed flex-1">{t.quote}</p>

                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold w-fit"
                  style={{ background: `${t.color}12`, color: t.color, border: `1px solid ${t.color}20` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: t.color }} />
                  {t.metric}
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: `${t.color}20`, color: t.color }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-[#F5F5F5] text-sm">{t.name}</p>
                    <p className="text-[#888888] text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
