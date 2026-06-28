import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

const links = {
  produto: [
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Preços', href: '#precos' },
    { label: 'Para empresas', href: '#empresas' },
    { label: 'Changelog', href: '/changelog' },
  ],
  empresa: [
    { label: 'Sobre nós', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Carreiras', href: '/careers' },
    { label: 'Contato', href: '/contact' },
  ],
  legal: [
    { label: 'Privacidade', href: '/privacy' },
    { label: 'Termos de uso', href: '/terms' },
    { label: 'Cookies', href: '/cookies' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-[#2350E8] rounded-lg flex items-center justify-center font-black text-white text-lg shadow-lg shadow-[#2350E8]/30">
                S
              </div>
              <span className="font-bold text-lg">
                <span className="text-[#F5F5F5]">soci</span>
                <span className="text-[#2350E8]">US</span>
              </span>
            </Link>
            <p className="text-[#888888] text-sm leading-relaxed mb-6 max-w-xs">
              O Tinder dos negócios. Conectamos founders, investidores e desenvolvedores para construir o futuro.
            </p>
            <div className="flex gap-3">
              {['Twitter', 'LinkedIn', 'Instagram'].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#888888] hover:text-white transition-colors text-[10px] font-bold"
                  title={social}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="font-semibold text-[#F5F5F5] text-sm mb-4 capitalize">{section === 'legal' ? 'Legal' : section === 'empresa' ? 'Empresa' : 'Produto'}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-[#888888] hover:text-[#F5F5F5] transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#555555] text-sm">
            © {new Date().getFullYear()} SociUS. Todos os direitos reservados.
          </p>
          <p className="text-[#555555] text-sm">
            Feito com ♥ no Brasil 🇧🇷
          </p>
        </div>
      </div>
    </footer>
  )
}
