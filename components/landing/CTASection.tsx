import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function CTASection() {
  return (
    <section className="py-40 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-3xl opacity-15"
        style={{ background: 'radial-gradient(ellipse, #2350E8, #10BE72)' }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <p className="text-[#2350E8] font-semibold text-sm tracking-wider uppercase mb-6">
            Pronto para começar?
          </p>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#F5F5F5] mb-8 leading-tight">
            Seu próximo sócio está
            <br />
            <span className="gradient-text">a um swipe de distância</span>
          </h2>
          <p className="text-[#A0A0A0] text-xl mb-12 max-w-xl mx-auto leading-relaxed">
            Junte-se a +5.000 empreendedores que já estão construindo o futuro no SociUS.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <Button size="xl" className="shadow-2xl shadow-[#2350E8]/30">
                Criar perfil grátis
                <ArrowRight size={20} />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="xl" variant="secondary">
                Já tenho conta
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
