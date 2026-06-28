import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0D0D0D] flex">
      {/* Left: Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 mb-12">
          <div className="w-8 h-8 bg-[#2350E8] rounded-lg flex items-center justify-center font-black text-white text-lg">
            S
          </div>
          <span className="font-bold text-lg">
            <span className="text-[#F5F5F5]">soci</span>
            <span className="text-[#2350E8]">US</span>
          </span>
        </Link>

        <div className="max-w-sm w-full mx-auto lg:mx-0">{children}</div>
      </div>

      {/* Right: Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-[#111111] relative overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, #2350E8, transparent)' }}
        />

        <div className="relative text-center px-12 max-w-md">
          <div className="text-6xl mb-6">🤝</div>
          <h2 className="text-3xl font-black text-[#F5F5F5] mb-4 leading-tight">
            Seu próximo sócio está aqui
          </h2>
          <p className="text-[#888888] leading-relaxed">
            Mais de 5.000 empreendedores, investidores e desenvolvedores prontos para construir o futuro com você.
          </p>

          {/* Floating stats */}
          <div className="flex justify-center gap-6 mt-10">
            {[
              { value: '94%', label: 'Taxa de match' },
              { value: '+300', label: 'Projetos' },
              { value: 'R$50M', label: 'Capital' },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl p-4 text-center">
                <p className="text-xl font-black text-[#2350E8]">{stat.value}</p>
                <p className="text-[#888888] text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
