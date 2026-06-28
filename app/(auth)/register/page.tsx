'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { ROLE_LABELS, type UserRole } from '@/lib/types'

const roles: { value: UserRole; label: string; emoji: string }[] = [
  { value: 'founder', label: 'Fundador', emoji: '🚀' },
  { value: 'investor', label: 'Investidor', emoji: '💰' },
  { value: 'developer', label: 'Desenvolvedor', emoji: '💻' },
  { value: 'strategic_partner', label: 'Parceiro Estratégico', emoji: '🤝' },
  { value: 'service_provider', label: 'Prestador', emoji: '⚡' },
]

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: '',
    role: '' as UserRole | '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) { setStep(2); return }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    window.location.href = '/onboarding'
  }

  return (
    <div>
      {/* Progress */}
      <div className="flex gap-1.5 mb-8">
        {[1, 2].map((s) => (
          <div
            key={s}
            className="h-1 flex-1 rounded-full transition-all"
            style={{ background: s <= step ? '#2350E8' : '#2A2A2A' }}
          />
        ))}
      </div>

      <h1 className="text-3xl font-black text-[#F5F5F5] mb-2">
        {step === 1 ? 'Criar sua conta' : 'Qual é o seu perfil?'}
      </h1>
      <p className="text-[#888888] mb-8">
        {step === 1 ? (
          <>
            Já tem conta?{' '}
            <Link href="/login" className="text-[#2350E8] hover:text-[#4169FF] font-medium transition-colors">
              Entrar
            </Link>
          </>
        ) : (
          'Isso nos ajuda a encontrar os melhores matches para você.'
        )}
      </p>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-4">
            <Input
              label="Nome completo"
              type="text"
              placeholder="Seu nome"
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              leftIcon={<User size={16} />}
              required
              fullWidth
            />
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
              placeholder="Mínimo 8 caracteres"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              leftIcon={<Lock size={16} />}
              rightIcon={
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="hover:text-white transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
              required
              fullWidth
            />
            <Button type="submit" fullWidth size="lg" disabled={!form.full_name || !form.email || !form.password}>
              Continuar
            </Button>
            <p className="text-xs text-[#555555] text-center">
              Ao criar uma conta você concorda com nossos{' '}
              <Link href="/terms" className="text-[#888888] hover:text-white">Termos de uso</Link>
              {' '}e{' '}
              <Link href="/privacy" className="text-[#888888] hover:text-white">Política de privacidade</Link>.
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2.5">
              {roles.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setForm({ ...form, role: role.value })}
                  className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                    form.role === role.value
                      ? 'border-[#2350E8] bg-[#2350E8]/10 text-[#F5F5F5]'
                      : 'border-[#2A2A2A] bg-[#1A1A1A] text-[#888888] hover:border-[#3A3A3A] hover:text-[#F5F5F5]'
                  }`}
                >
                  <span className="text-xl">{role.emoji}</span>
                  <span className="font-medium text-sm">{role.label}</span>
                  {form.role === role.value && (
                    <span className="ml-auto w-4 h-4 rounded-full bg-[#2350E8] flex items-center justify-center">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3 5.5L6.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="button" variant="secondary" fullWidth onClick={() => setStep(1)}>
                Voltar
              </Button>
              <Button type="submit" fullWidth loading={loading} disabled={!form.role}>
                Criar conta
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
