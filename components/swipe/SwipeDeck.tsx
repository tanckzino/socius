'use client'

import { useState, useRef, useCallback } from 'react'
import { X, Heart, Star, MapPin, Link2, Clock, DollarSign } from 'lucide-react'
import { type Profile, ROLE_LABELS, ROLE_COLORS, ROLE_ICONS, AVAILABILITY_LABELS } from '@/lib/types'
import { getInitials, getAvatarColor, formatCurrency } from '@/lib/utils'
import Badge from '@/components/ui/Badge'

interface SwipeDeckProps {
  profiles: Profile[]
  onLike: (profile: Profile) => void
  onPass: (profile: Profile) => void
  onSuperLike?: (profile: Profile) => void
}

interface CardState {
  x: number
  y: number
  rotate: number
  dragging: boolean
}

function ProfileCard({
  profile,
  index,
  total,
  onLike,
  onPass,
  onSuperLike,
}: {
  profile: Profile
  index: number
  total: number
  onLike: () => void
  onPass: () => void
  onSuperLike?: () => void
}) {
  const [state, setState] = useState<CardState>({ x: 0, y: 0, rotate: 0, dragging: false })
  const [decision, setDecision] = useState<'like' | 'pass' | null>(null)
  const startPos = useRef({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const isTop = index === total - 1
  const offset = (total - 1 - index) * 6
  const scale = 1 - (total - 1 - index) * 0.04

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isTop) return
    setState((s) => ({ ...s, dragging: true }))
    startPos.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!state.dragging) return
      const dx = e.clientX - startPos.current.x
      const dy = e.clientY - startPos.current.y
      const rotate = dx * 0.1
      setState((s) => ({ ...s, x: dx, y: dy, rotate }))
      if (dx > 60) setDecision('like')
      else if (dx < -60) setDecision('pass')
      else setDecision(null)
    },
    [state.dragging]
  )

  const handleMouseUp = () => {
    if (!state.dragging) return
    setState((s) => ({ ...s, dragging: false }))
    if (state.x > 100) {
      onLike()
    } else if (state.x < -100) {
      onPass()
    } else {
      setState({ x: 0, y: 0, rotate: 0, dragging: false })
      setDecision(null)
    }
  }

  const color = ROLE_COLORS[profile.role]
  const initials = getInitials(profile.full_name)

  return (
    <div
      ref={cardRef}
      className="absolute inset-0 swipe-card"
      style={{
        transform: `translateX(${isTop ? state.x : 0}px) translateY(${isTop ? state.y : -offset}px) rotate(${isTop ? state.rotate : 0}deg) scale(${scale})`,
        transition: state.dragging ? 'none' : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        zIndex: index,
        transformOrigin: 'bottom center',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="w-full h-full bg-[#111111] rounded-3xl border border-[#2A2A2A] overflow-hidden shadow-2xl flex flex-col relative">
        {/* Like/Pass overlay */}
        {decision === 'like' && (
          <div className="absolute inset-0 bg-[#10BE72]/8 z-10 rounded-3xl flex items-start justify-end p-6">
            <div className="border-4 border-[#10BE72] text-[#10BE72] font-black text-2xl px-4 py-2 rounded-xl rotate-[-15deg]">
              CURTIR
            </div>
          </div>
        )}
        {decision === 'pass' && (
          <div className="absolute inset-0 bg-[#EF4444]/8 z-10 rounded-3xl flex items-start justify-start p-6">
            <div className="border-4 border-[#EF4444] text-[#EF4444] font-black text-2xl px-4 py-2 rounded-xl rotate-[15deg]">
              PASSAR
            </div>
          </div>
        )}

        {/* Header section */}
        <div className="relative p-6 pb-4">
          {/* Background gradient */}
          <div
            className="absolute inset-0 opacity-10"
            style={{ background: `linear-gradient(135deg, ${color}, transparent)` }}
          />

          <div className="relative flex items-start gap-4">
            {/* Avatar */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black flex-shrink-0 ring-2"
              style={{ background: `${color}20`, color }}
            >
              {initials}
            </div>

            {/* Basic info */}
            <div className="flex-1 min-w-0 pt-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-xl font-black text-[#F5F5F5] leading-tight">{profile.full_name}</h2>
                  <Badge role={profile.role} size="md" className="mt-1.5" />
                </div>
                {profile.match_score && (
                  <div
                    className="flex-shrink-0 text-center px-3 py-1.5 rounded-xl"
                    style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                  >
                    <p className="text-lg font-black" style={{ color }}>{profile.match_score}%</p>
                    <p className="text-[10px] text-[#888888] -mt-0.5">match</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Info grid */}
        <div className="px-6 pb-4 space-y-3">
          {/* Location */}
          {(profile.city || profile.state) && (
            <div className="flex items-center gap-2 text-sm text-[#888888]">
              <MapPin size={14} className="flex-shrink-0" />
              <span>{[profile.city, profile.state].filter(Boolean).join(', ')}</span>
            </div>
          )}

          {/* Capital */}
          {profile.available_capital !== null && profile.available_capital > 0 && (
            <div className="flex items-center gap-2 text-sm text-[#888888]">
              <DollarSign size={14} className="flex-shrink-0" />
              <span>{formatCurrency(profile.available_capital)} disponível</span>
            </div>
          )}

          {/* Availability */}
          {profile.availability && (
            <div className="flex items-center gap-2 text-sm text-[#888888]">
              <Clock size={14} className="flex-shrink-0" />
              <span>{AVAILABILITY_LABELS[profile.availability]}</span>
            </div>
          )}

          {/* Bio */}
          {profile.bio && (
            <p className="text-sm text-[#888888] leading-relaxed line-clamp-3 pt-1">{profile.bio}</p>
          )}

          {/* Skills */}
          {profile.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {profile.skills.slice(0, 5).map((skill) => (
                <span
                  key={skill}
                  className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/5 text-[#888888] border border-white/8"
                >
                  {skill}
                </span>
              ))}
              {profile.skills.length > 5 && (
                <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/5 text-[#555555] border border-white/8">
                  +{profile.skills.length - 5}
                </span>
              )}
            </div>
          )}

          {/* Interests */}
          {profile.interests.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {profile.interests.slice(0, 3).map((interest) => (
                <Badge key={interest} label={interest} variant="blue" />
              ))}
              {profile.interests.length > 3 && (
                <Badge label={`+${profile.interests.length - 3}`} variant="outline" />
              )}
            </div>
          )}
        </div>

        {/* Project description */}
        {profile.project_description && (
          <div className="mx-6 mb-4 p-4 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A]">
            <p className="text-xs text-[#888888] font-semibold mb-1.5 uppercase tracking-wide">Projeto</p>
            <p className="text-sm text-[#F5F5F5] leading-relaxed line-clamp-2">{profile.project_description}</p>
          </div>
        )}

        {/* Action buttons */}
        {isTop && (
          <div className="mt-auto px-6 pb-6 flex items-center justify-center gap-4">
            <button
              onClick={onPass}
              className="w-14 h-14 rounded-full bg-[#EF4444]/10 border border-[#EF4444]/20 flex items-center justify-center text-[#EF4444] hover:bg-[#EF4444]/20 hover:scale-110 transition-all active:scale-95"
            >
              <X size={22} />
            </button>

            {onSuperLike && (
              <button
                onClick={onSuperLike}
                className="w-10 h-10 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B] hover:bg-[#F59E0B]/20 hover:scale-110 transition-all active:scale-95"
              >
                <Star size={16} />
              </button>
            )}

            <button
              onClick={onLike}
              className="w-14 h-14 rounded-full bg-[#10BE72]/10 border border-[#10BE72]/20 flex items-center justify-center text-[#10BE72] hover:bg-[#10BE72]/20 hover:scale-110 transition-all active:scale-95"
            >
              <Heart size={22} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SwipeDeck({ profiles, onLike, onPass, onSuperLike }: SwipeDeckProps) {
  const [remaining, setRemaining] = useState(profiles)
  const [lastAction, setLastAction] = useState<{ type: 'like' | 'pass'; profile: Profile } | null>(null)

  const handleLike = (profile: Profile) => {
    onLike(profile)
    setLastAction({ type: 'like', profile })
    setRemaining((r) => r.filter((p) => p.id !== profile.id))
  }

  const handlePass = (profile: Profile) => {
    onPass(profile)
    setLastAction({ type: 'pass', profile })
    setRemaining((r) => r.filter((p) => p.id !== profile.id))
  }

  if (remaining.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center px-8">
        <div className="text-6xl mb-6">🎉</div>
        <h3 className="text-2xl font-black text-[#F5F5F5] mb-3">Você viu todos os perfis!</h3>
        <p className="text-[#888888] mb-8">
          Volte mais tarde para novos matches ou explore perfis na busca avançada.
        </p>
        <button
          onClick={() => setRemaining(profiles)}
          className="px-6 py-3 bg-[#2350E8] text-white font-semibold rounded-xl hover:bg-[#1A3DB5] transition-colors"
        >
          Recomeçar
        </button>
      </div>
    )
  }

  const displayedCards = remaining.slice(-3)

  return (
    <div className="relative w-full h-full">
      {displayedCards.map((profile, index) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          index={index}
          total={displayedCards.length}
          onLike={() => handleLike(profile)}
          onPass={() => handlePass(profile)}
          onSuperLike={onSuperLike ? () => onSuperLike(profile) : undefined}
        />
      ))}
    </div>
  )
}
