'use client'

import { useState } from 'react'
import { Camera, Edit2, MapPin, Link2, Clock, DollarSign, CheckCircle, Star } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { MOCK_PROFILES } from '@/lib/mock-data'
import { ROLE_COLORS, AVAILABILITY_LABELS } from '@/lib/types'
import { formatCurrency, getInitials } from '@/lib/utils'

const ME = MOCK_PROFILES[0]

export default function ProfilePage() {
  const [editing, setEditing] = useState(false)
  const color = ROLE_COLORS[ME.role]
  const initials = getInitials(ME.full_name)

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-[#F5F5F5]">Meu Perfil</h1>
        <Button
          size="sm"
          variant={editing ? 'success' : 'secondary'}
          onClick={() => setEditing(!editing)}
        >
          {editing ? (
            <>
              <CheckCircle size={14} />
              Salvar
            </>
          ) : (
            <>
              <Edit2 size={14} />
              Editar
            </>
          )}
        </Button>
      </div>

      {/* Profile card */}
      <div className="glass rounded-3xl overflow-hidden mb-6">
        {/* Cover */}
        <div className="h-32 relative" style={{ background: `linear-gradient(135deg, ${color}30, #1A1A1A)` }}>
          <button className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/40 text-white hover:bg-black/60 transition-colors">
            <Camera size={14} />
          </button>
        </div>

        {/* Info */}
        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="relative -mt-10 mb-4">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black ring-4 ring-[#111111]"
              style={{ background: `${color}25`, color }}
            >
              {initials}
            </div>
            {ME.is_verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#2350E8] rounded-full flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>

          {/* Name & Role */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="text-xl font-black text-[#F5F5F5]">{ME.full_name}</h2>
              <div className="flex items-center gap-2 mt-1.5">
                <Badge role={ME.role} size="md" />
                {ME.is_premium && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/20">
                    <Star size={9} />
                    Pro
                  </span>
                )}
              </div>
            </div>
            {ME.match_score && (
              <div className="text-center">
                <p className="text-2xl font-black" style={{ color }}>{ME.match_score}%</p>
                <p className="text-[10px] text-[#888888]">compatibilidade</p>
              </div>
            )}
          </div>

          {/* Quick info */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {ME.city && (
              <div className="flex items-center gap-2 text-sm text-[#888888]">
                <MapPin size={14} className="text-[#555555]" />
                {ME.city}, {ME.state}
              </div>
            )}
            {ME.availability && (
              <div className="flex items-center gap-2 text-sm text-[#888888]">
                <Clock size={14} className="text-[#555555]" />
                {AVAILABILITY_LABELS[ME.availability]}
              </div>
            )}
            {ME.available_capital !== null && ME.available_capital > 0 && (
              <div className="flex items-center gap-2 text-sm text-[#888888]">
                <DollarSign size={14} className="text-[#555555]" />
                {formatCurrency(ME.available_capital)}
              </div>
            )}
            {ME.linkedin_url && (
              <a href={ME.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#2350E8] hover:text-[#4169FF] transition-colors">
                <Link2 size={14} />
                LinkedIn
              </a>
            )}
          </div>

          {/* Bio */}
          {ME.bio && (
            <div className="mb-5">
              <p className="text-xs font-semibold text-[#888888] uppercase tracking-wide mb-2">Sobre</p>
              <p className="text-sm text-[#F5F5F5] leading-relaxed">{ME.bio}</p>
            </div>
          )}

          {/* Project */}
          {ME.project_description && (
            <div className="mb-5 p-4 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A]">
              <p className="text-xs font-semibold text-[#888888] uppercase tracking-wide mb-2">Projeto</p>
              <p className="text-sm text-[#F5F5F5] leading-relaxed">{ME.project_description}</p>
            </div>
          )}

          {/* Skills */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-[#888888] uppercase tracking-wide mb-2">Habilidades</p>
            <div className="flex flex-wrap gap-1.5">
              {ME.skills.map((skill) => (
                <span key={skill} className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 text-[#888888] border border-white/8">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div>
            <p className="text-xs font-semibold text-[#888888] uppercase tracking-wide mb-2">Interesses</p>
            <div className="flex flex-wrap gap-1.5">
              {ME.interests.map((interest) => (
                <Badge key={interest} label={interest} variant="blue" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Profile completeness */}
      <div className="glass rounded-2xl p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-[#F5F5F5]">Completude do perfil</p>
          <span className="text-sm font-black text-[#10BE72]">82%</span>
        </div>
        <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden mb-3">
          <div className="h-full bg-[#10BE72] rounded-full transition-all" style={{ width: '82%' }} />
        </div>
        <p className="text-xs text-[#888888]">
          Adicione sua foto de perfil para aumentar em 18% suas chances de match.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Visualizações', value: 127, color: '#2350E8' },
          { label: 'Likes recebidos', value: 34, color: '#10BE72' },
          { label: 'Matches', value: 8, color: '#8B5CF6' },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-4 text-center">
            <p className="text-2xl font-black mb-1" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-[10px] text-[#888888]">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
