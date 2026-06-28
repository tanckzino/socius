import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SociUS — Encontre seu próximo sócio',
  description:
    'A plataforma que conecta founders, investidores e desenvolvedores para construir startups juntos. O Tinder dos negócios.',
  keywords: ['startup', 'sócio', 'investimento', 'co-fundador', 'empreendedorismo', 'networking'],
  authors: [{ name: 'SociUS' }],
  openGraph: {
    title: 'SociUS — Encontre seu próximo sócio',
    description: 'Conectamos founders, investidores e desenvolvedores para construir o futuro.',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SociUS — Encontre seu próximo sócio',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  )
}
