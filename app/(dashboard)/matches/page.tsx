import Link from 'next/link'
import { MessageSquare, ExternalLink } from 'lucide-react'
import { MOCK_PROFILES } from '@/lib/mock-data'
import { ROLE_LABELS, ROLE_COLORS } from '@/lib/types'
import { getInitials } from '@/lib/utils'
import Badge from '@/components/ui/Badge'

export default function MatchesPage() {
  const matches = MOCK_PROFILES.slice(0, 3)

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#F5F5F5] mb-1">Seus Matches</h1>
        <p className="text-[#888888]">{matches.length} conexões estabelecidas</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Matches', value: matches.length, color: '#2350E8' },
          { label: 'Conversas', value: 2, color: '#10BE72' },
          { label: 'Swipes hoje', value: 18, color: '#8B5CF6' },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-2xl p-4 text-center">
            <p className="text-3xl font-black mb-1" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-xs text-[#888888]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Matches grid */}
      {matches.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">💔</div>
          <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">Nenhum match ainda</h3>
          <p className="text-[#888888] mb-6">Continue dando swipe para encontrar seu próximo sócio!</p>
          <Link href="/feed" className="px-6 py-3 bg-[#2350E8] text-white font-semibold rounded-xl hover:bg-[#1A3DB5] transition-colors">
            Ir para o Feed
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.map((profile) => {
            const color = ROLE_COLORS[profile.role]
            const initials = getInitials(profile.full_name)
            return (
              <div key={profile.id} className="glass rounded-2xl p-5 card-hover">
                <div className="flex items-start gap-4 mb-4">
                  {/* Avatar */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black flex-shrink-0"
                    style={{ background: `${color}20`, color }}
                  >
                    {initials}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-[#F5F5F5]">{profile.full_name}</h3>
                        <div className="mt-1">
                          <Badge role={profile.role} />
                        </div>
                      </div>
                      {profile.match_score && (
                        <span className="text-sm font-black flex-shrink-0" style={{ color }}>
                          {profile.match_score}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                {profile.bio && (
                  <p className="text-sm text-[#888888] line-clamp-2 mb-4">{profile.bio}</p>
                )}

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {profile.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 text-[#888888] border border-white/8">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/messages/${profile.id}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#2350E8]/10 border border-[#2350E8]/20 text-[#4169FF] text-sm font-semibold hover:bg-[#2350E8]/20 transition-colors"
                  >
                    <MessageSquare size={14} />
                    Mensagem
                  </Link>
                  <button className="p-2.5 rounded-xl bg-white/5 border border-white/8 text-[#888888] hover:text-white hover:border-white/20 transition-all">
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
