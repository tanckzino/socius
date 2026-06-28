'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'

const navLinks = [
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Perfis', href: '#perfis' },
  { label: 'Preços', href: '#precos' },
  { label: 'Para empresas', href: '#empresas' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0D0D0D]/95 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-[#2350E8] rounded-lg flex items-center justify-center font-black text-white text-lg shadow-lg shadow-[#2350E8]/30 group-hover:shadow-[#2350E8]/50 transition-shadow">
              S
            </div>
            <span className="font-bold text-lg tracking-tight">
              <span className="text-[#F5F5F5]">soci</span>
              <span className="text-[#2350E8]">US</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-[#888888] hover:text-[#F5F5F5] transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Entrar
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">
                Começar grátis
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-[#888888] hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#111111] border-t border-white/5 px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1 mb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2.5 text-sm text-[#888888] hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-2">
            <Link href="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="secondary" fullWidth>Entrar</Button>
            </Link>
            <Link href="/register" onClick={() => setMobileOpen(false)}>
              <Button fullWidth>Começar grátis</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
