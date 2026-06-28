'use client'

import { useState } from 'react'
import { Search, Filter, MapPin, DollarSign } from 'lucide-react'
import { MOCK_PROFILES } from '@/lib/mock-data'
import { ROLE_LABELS, ROLE_COLORS, type UserRole } from '@/lib/types'
import { getInitials, formatCurrency } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import Link from 'next/link'

const roles: UserRole[] = ['founder', 'investor', 'developer', 'strategic_partner', 'service_provider']

export default function ExplorePage() {
  const [query, setQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)

  const filtered = MOCK_PROFILES.filter((p) => {
    const matchesQuery =
      !query ||
      p.full_name.toLowerCase().includes(query.toLowerCase()) ||
      p.bio?.toLowerCase().includes(query.toLowerCase()) ||
      p.skills.some((s) => s.toLowerCase().includes(query.toLowerCase())) ||
      p.interests.some((i) => i.toLowerCase().includes(query.toLowerCase()))
    const matchesRole = !selectedRole || p.role === selectedRole
    return matchesQuery && matchesRole
  })

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#F5F5F5] mb-1">Explorar</h1>
        <p className="text-[#888888]">Encontre perfis por habilidade, setor ou localização</p>
      </div>

      {/* Search bar */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#555555]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nome, skill, setor..."
          className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl text-[#F5F5F5] placeholder:text-[#555555] pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#2350E8] focus:ring-1 focus:ring-[#2350E8] transition-all hover:border-[#3A3A3A]"
        />
      </div>

      {/* Role filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedRole(null)}
          className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
            !selectedRole
              ? 'bg-[#2350E8] border-[#2350E8] text-white'
              : 'bg-transparent border-[#2A2A2A] text-[#888888] hover:border-[#3A3A3A]'
          }`}
        >
          Todos
        </button>
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(selectedRole === role ? null : role)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
              selectedRole === role
                ? 'text-white'
                : 'bg-transparent border-[#2A2A2A] text-[#888888] hover:border-[#3A3A3A]'
            }`}
            style={
              selectedRole === role
                ? { background: ROLE_COLORS[role], borderColor: ROLE_COLORS[role] }
                : undefined
            }
          >
            {ROLE_LABELS[role]}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-[#888888] mb-4">
        {filtered.length} perfil{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Profile grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((profile) => {
          const color = ROLE_COLORS[profile.role]
          const initials = getInitials(profile.full_name)
          return (
            <div key={profile.id} className="glass rounded-2xl p-5 card-hover flex flex-col">
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold flex-shrink-0"
                  style={{ background: `${color}20`, color }}
                >
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#F5F5F5] text-sm truncate">{profile.full_name}</p>
                  <Badge role={profile.role} className="mt-1" />
                </div>
                {profile.match_score && (
                  <span className="text-sm font-black flex-shrink-0" style={{ color }}>{profile.match_score}%</span>
                )}
              </div>

              {/* Location */}
              {(profile.city || profile.state) && (
                <div className="flex items-center gap-1.5 text-xs text-[#888888] mb-2">
                  <MapPin size={11} />
                  {[profile.city, profile.state].filter(Boolean).join(', ')}
                </div>
              )}

              {/* Bio */}
              {profile.bio && (
                <p className="text-xs text-[#888888] line-clamp-2 mb-3 leading-relaxed">{profile.bio}</p>
              )}

              {/* Skills */}
              <div className="flex flex-wrap gap-1 mb-3">
                {profile.skills.slice(0, 3).map((s) => (
                  <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-[#888888] border border-white/8">
                    {s}
                  </span>
                ))}
              </div>

              {/* Capital */}
              {profile.available_capital !== null && profile.available_capital > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-[#10BE72] mb-3">
                  <DollarSign size={11} />
                  {formatCurrency(profile.available_capital)} disponível
                </div>
              )}

              {/* CTA */}
              <div className="mt-auto">
                <Link
                  href={`/messages/${profile.id}`}
                  className="block w-full text-center py-2.5 rounded-xl text-xs font-semibold transition-all"
                  style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}
                >
                  Ver perfil completo
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-[#888888]">Nenhum perfil encontrado para esta busca.</p>
        </div>
      )}
    </div>
  )
}
