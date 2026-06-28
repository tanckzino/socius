import { UserCircle, Repeat2, Handshake } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const steps = [
  {
    number: '01',
    icon: UserCircle,
    title: 'Crie seu perfil em minutos',
    description:
      'Defina seu papel, adicione suas habilidades, objetivos e o que você busca em um parceiro. Nosso onboarding inteligente torna o processo simples e rápido.',
    color: '#2350E8',
    details: ['Escolha seu perfil (Fundador, Investidor, Dev...)', 'Adicione skills e áreas de interesse', 'Descreva seu projeto ou objetivo'],
  },
  {
    number: '02',
    icon: Repeat2,
    title: 'Explore e dê swipe',
    description:
      'Receba perfis compatíveis baseados no nosso algoritmo. Dê swipe à direita em quem te interessa e aguarde o match acontecer.',
    color: '#10BE72',
    details: ['Swipe em perfis compatíveis', 'Filtre por cidade, setor e disponibilidade', 'Veja a taxa de compatibilidade de cada perfil'],
  },
  {
    number: '03',
    icon: Handshake,
    title: 'Conecte e construa',
    description:
      'Quando há match mútuo, o chat é desbloqueado. Converse, alinhe expectativas e comece a construir algo incrível juntos.',
    color: '#8B5CF6',
    details: ['Chat em tempo real desbloqueado', 'Compartilhe documentos e apresentações', 'Formalize a parceria e comece a construir'],
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-20">
          <p className="text-[#8B5CF6] font-semibold text-sm tracking-wider uppercase mb-4">Como funciona</p>
          <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-[#F5F5F5] mb-6 leading-tight">
            Simples como um swipe
          </h2>
          <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto leading-relaxed">
            Em menos de 10 minutos você está pronto para encontrar seu próximo sócio.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative">
          <div className="hidden lg:block absolute top-10 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-[#2350E8]/30 via-[#10BE72]/30 to-[#8B5CF6]/30" />

          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <ScrollReveal key={step.number} delay={index * 120} className="relative">
                <div className="glass rounded-2xl p-8 h-full">
                  <div className="flex items-center gap-4 mb-7">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${step.color}12`, border: `1px solid ${step.color}25` }}
                    >
                      <Icon size={26} style={{ color: step.color }} />
                    </div>
                    <span
                      className="text-4xl font-black"
                      style={{ color: `${step.color}30` }}
                    >
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-bold text-[#F5F5F5] text-xl mb-4">{step.title}</h3>
                  <p className="text-[#888888] text-sm leading-relaxed mb-6">{step.description}</p>

                  <ul className="space-y-3">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2.5 text-sm text-[#888888]">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{ background: step.color }}
                        />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-5 text-[#2A2A2A]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M6 14l6 6 6-6" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
