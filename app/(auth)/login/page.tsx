'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Supabase auth integration goes here
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    window.location.href = '/feed'
  }

  return (
    <div>
      <h1 className="text-3xl font-black text-[#F5F5F5] mb-2">Bem-vindo de volta</h1>
      <p className="text-[#888888] mb-8">
        Não tem conta?{' '}
        <Link href="/register" className="text-[#2350E8] hover:text-[#4169FF] font-medium transition-colors">
          Criar grátis
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="E-mail"
          type="email"
          placeholder="seu@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          leftIcon={<Mail size={16} />}
          required
          fullWidth
        />

        <Input
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          leftIcon={<Lock size={16} />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
          required
          fullWidth
        />

        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-sm text-[#888888] hover:text-[#F5F5F5] transition-colors">
            Esqueceu a senha?
          </Link>
        </div>

        <Button type="submit" fullWidth size="lg" loading={loading}>
          Entrar
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-[#2A2A2A]" />
        <span className="text-xs text-[#555555]">ou</span>
        <div className="flex-1 h-px bg-[#2A2A2A]" />
      </div>

      {/* OAuth buttons */}
      <div className="space-y-3">
        <button className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#3A3A3A] text-[#F5F5F5] text-sm font-medium transition-all">
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
            <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
            <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"/>
            <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"/>
          </svg>
          Entrar com Google
        </button>
        <button className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#3A3A3A] text-[#F5F5F5] text-sm font-medium transition-all">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          Entrar com LinkedIn
        </button>
      </div>
    </div>
  )
}
