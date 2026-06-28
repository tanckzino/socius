'use client'

import { useState } from 'react'
import { MapPin, Link2, ChevronRight, ChevronLeft } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { SKILLS, INTERESTS, AVAILABILITY_LABELS } from '@/lib/types'

const STEPS = ['Localização', 'Habilidades', 'Interesses', 'Capital & Tempo', 'Projeto']

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    city: '',
    state: '',
    linkedin_url: '',
    skills: [] as string[],
    interests: [] as string[],
    available_capital: '',
    availability: '',
    project_description: '',
  })

  const toggleSkill = (skill: string) => {
    setData((d) => ({
      ...d,
      skills: d.skills.includes(skill) ? d.skills.filter((s) => s !== skill) : [...d.skills, skill],
    }))
  }

  const toggleInterest = (interest: string) => {
    setData((d) => ({
      ...d,
      interests: d.interests.includes(interest)
        ? d.interests.filter((i) => i !== interest)
        : [...d.interests, interest],
    }))
  }

  const finish = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    window.location.href = '/feed'
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col">
      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-[#2350E8] rounded-lg flex items-center justify-center font-black text-white text-sm">S</div>
          <span className="font-bold"><span className="text-[#F5F5F5]">soci</span><span className="text-[#2350E8]">US</span></span>
        </div>
        <span className="text-[#888888] text-sm">Passo {step + 1} de {STEPS.length}</span>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl">
          {/* Progress */}
          <div className="flex gap-1.5 mb-10">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className="h-1.5 flex-1 rounded-full transition-all duration-500"
                style={{ background: i <= step ? '#2350E8' : '#2A2A2A' }}
              />
            ))}
          </div>

          {/* Step label */}
          <div className="mb-8">
            <p className="text-[#2350E8] text-sm font-semibold mb-2">{STEPS[step]}</p>
            <h1 className="text-3xl font-black text-[#F5F5F5]">
              {step === 0 && 'Onde você está localizado?'}
              {step === 1 && 'Quais são suas principais habilidades?'}
              {step === 2 && 'Em quais setores você tem interesse?'}
              {step === 3 && 'Capital e disponibilidade'}
              {step === 4 && 'Conte sobre seu projeto ou objetivo'}
            </h1>
            <p className="text-[#888888] mt-2 text-sm">
              {step === 0 && 'Isso nos ajuda a conectar você com pessoas na sua região.'}
              {step === 1 && 'Selecione até 8 habilidades que melhor te representam.'}
              {step === 2 && 'Selecione os setores onde você quer atuar.'}
              {step === 3 && 'Informações sobre capital e disponibilidade de tempo.'}
              {step === 4 && 'Descreva sua ideia, projeto atual ou o que você busca.'}
            </p>
          </div>

          {/* Step content */}
          <div className="bg-[#111111] rounded-2xl p-6 border border-[#2A2A2A] mb-6">
            {step === 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Cidade"
                    placeholder="São Paulo"
                    value={data.city}
                    onChange={(e) => setData({ ...data, city: e.target.value })}
                    leftIcon={<MapPin size={15} />}
                    fullWidth
                  />
                  <Input
                    label="Estado"
                    placeholder="SP"
                    value={data.state}
                    onChange={(e) => setData({ ...data, state: e.target.value })}
                    fullWidth
                  />
                </div>
                <Input
                  label="LinkedIn (opcional)"
                  placeholder="linkedin.com/in/seuperfil"
                  value={data.linkedin_url}
                  onChange={(e) => setData({ ...data, linkedin_url: e.target.value })}
                  leftIcon={<Link2 size={15} />}
                  fullWidth
                />
              </div>
            )}

            {step === 1 && (
              <div>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                        data.skills.includes(skill)
                          ? 'bg-[#2350E8] border-[#2350E8] text-white'
                          : 'bg-transparent border-[#2A2A2A] text-[#888888] hover:border-[#3A3A3A] hover:text-[#F5F5F5]'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-[#555555] mt-3">
                  {data.skills.length}/8 selecionadas
                </p>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                        data.interests.includes(interest)
                          ? 'bg-[#10BE72] border-[#10BE72] text-white'
                          : 'bg-transparent border-[#2A2A2A] text-[#888888] hover:border-[#3A3A3A] hover:text-[#F5F5F5]'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-[#555555] mt-3">
                  {data.interests.length} selecionados
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#F5F5F5] mb-3">
                    Capital disponível para investimento
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Sem capital', value: '0' },
                      { label: 'Até R$10K', value: '10000' },
                      { label: 'R$10K–50K', value: '50000' },
                      { label: 'R$50K–200K', value: '200000' },
                      { label: 'R$200K–500K', value: '500000' },
                      { label: 'R$500K+', value: '1000000' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setData({ ...data, available_capital: opt.value })}
                        className={`py-2.5 px-3 rounded-xl border text-sm font-medium transition-all ${
                          data.available_capital === opt.value
                            ? 'bg-[#2350E8]/15 border-[#2350E8] text-[#4169FF]'
                            : 'bg-transparent border-[#2A2A2A] text-[#888888] hover:border-[#3A3A3A]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#F5F5F5] mb-3">
                    Disponibilidade de tempo
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(AVAILABILITY_LABELS).map(([value, label]) => (
                      <button
                        key={value}
                        onClick={() => setData({ ...data, availability: value })}
                        className={`py-2.5 px-3 rounded-xl border text-sm font-medium transition-all ${
                          data.availability === value
                            ? 'bg-[#10BE72]/15 border-[#10BE72] text-[#10BE72]'
                            : 'bg-transparent border-[#2A2A2A] text-[#888888] hover:border-[#3A3A3A]'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <label className="block text-sm font-medium text-[#F5F5F5] mb-2">
                  Descreva seu projeto ou objetivo
                </label>
                <textarea
                  value={data.project_description}
                  onChange={(e) => setData({ ...data, project_description: e.target.value })}
                  placeholder="Ex: Estou desenvolvendo uma plataforma de crédito para MEIs. Tenho validação inicial e busco um CTO técnico com experiência em fintechs..."
                  className="w-full h-36 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl text-[#F5F5F5] placeholder:text-[#555555] p-4 text-sm resize-none focus:outline-none focus:border-[#2350E8] focus:ring-1 focus:ring-[#2350E8] transition-all"
                />
                <p className="text-xs text-[#555555] mt-2">
                  {data.project_description.length}/500 caracteres
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            {step > 0 && (
              <Button variant="secondary" onClick={() => setStep(step - 1)} className="px-4">
                <ChevronLeft size={16} />
              </Button>
            )}
            {step < STEPS.length - 1 ? (
              <Button fullWidth onClick={() => setStep(step + 1)}>
                Continuar
                <ChevronRight size={16} />
              </Button>
            ) : (
              <Button fullWidth loading={loading} onClick={finish} variant="success">
                Entrar na plataforma
                <ChevronRight size={16} />
              </Button>
            )}
          </div>

          {/* Skip */}
          <button
            onClick={() => (window.location.href = '/feed')}
            className="w-full mt-3 text-center text-xs text-[#555555] hover:text-[#888888] transition-colors"
          >
            Preencher depois
          </button>
        </div>
      </div>
    </div>
  )
}
