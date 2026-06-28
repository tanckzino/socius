import { Users, Heart, MessageSquare, TrendingUp, ArrowUp, Shield, Star, Activity } from 'lucide-react'
import { MOCK_ADMIN_STATS, MOCK_PROFILES } from '@/lib/mock-data'
import { ROLE_LABELS, ROLE_COLORS } from '@/lib/types'
import { getInitials, formatNumber } from '@/lib/utils'

const statCards = [
  {
    label: 'Total de usuários',
    value: MOCK_ADMIN_STATS.total_users,
    icon: Users,
    color: '#2350E8',
    change: `+${MOCK_ADMIN_STATS.new_users_today} hoje`,
    up: true,
  },
  {
    label: 'Usuários ativos',
    value: MOCK_ADMIN_STATS.active_users,
    icon: Activity,
    color: '#10BE72',
    change: '74% do total',
    up: true,
  },
  {
    label: 'Total de matches',
    value: MOCK_ADMIN_STATS.total_matches,
    icon: Heart,
    color: '#EC4899',
    change: `+${MOCK_ADMIN_STATS.new_matches_today} hoje`,
    up: true,
  },
  {
    label: 'Mensagens enviadas',
    value: MOCK_ADMIN_STATS.total_messages,
    icon: MessageSquare,
    color: '#8B5CF6',
    change: '+2.3K hoje',
    up: true,
  },
  {
    label: 'Usuários Premium',
    value: MOCK_ADMIN_STATS.premium_users,
    icon: Star,
    color: '#F59E0B',
    change: `${Math.round(MOCK_ADMIN_STATS.premium_users / MOCK_ADMIN_STATS.total_users * 100)}% do total`,
    up: true,
  },
  {
    label: 'Perfis verificados',
    value: MOCK_ADMIN_STATS.verified_users,
    icon: Shield,
    color: '#06B6D4',
    change: `${Math.round(MOCK_ADMIN_STATS.verified_users / MOCK_ADMIN_STATS.total_users * 100)}% do total`,
    up: true,
  },
]

const roleDistribution = [
  { role: 'founder' as const, count: 1820 },
  { role: 'developer' as const, count: 1450 },
  { role: 'investor' as const, count: 890 },
  { role: 'strategic_partner' as const, count: 640 },
  { role: 'service_provider' as const, count: 447 },
]

export default function AdminPage() {
  const total = roleDistribution.reduce((sum, r) => sum + r.count, 0)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#F5F5F5]">Overview</h1>
          <p className="text-[#888888] text-sm mt-1">Hoje, 28 de junho de 2026</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10BE72]/10 border border-[#10BE72]/20 text-[#10BE72] text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10BE72] animate-pulse" />
          Sistema operacional
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="glass rounded-2xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}20` }}
                >
                  <Icon size={18} style={{ color: stat.color }} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${stat.up ? 'text-[#10BE72]' : 'text-[#EF4444]'}`}>
                  <ArrowUp size={10} className={stat.up ? '' : 'rotate-180'} />
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-black text-[#F5F5F5] mb-1">{formatNumber(stat.value)}</p>
              <p className="text-xs text-[#888888]">{stat.label}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Role distribution */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-bold text-[#F5F5F5] mb-5">Distribuição por perfil</h3>
          <div className="space-y-4">
            {roleDistribution.map(({ role, count }) => {
              const color = ROLE_COLORS[role]
              const pct = Math.round((count / total) * 100)
              return (
                <div key={role}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-[#888888]">{ROLE_LABELS[role]}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#F5F5F5]">{count.toLocaleString('pt-BR')}</span>
                      <span className="text-[#555555]">{pct}%</span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, background: color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent users */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-bold text-[#F5F5F5] mb-5">Novos usuários</h3>
          <div className="space-y-3">
            {MOCK_PROFILES.map((user) => {
              const color = ROLE_COLORS[user.role]
              const initials = getInitials(user.full_name)
              return (
                <div key={user.id} className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: `${color}20`, color }}
                  >
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#F5F5F5] truncate">{user.full_name}</p>
                    <p className="text-xs text-[#888888]">{ROLE_LABELS[user.role]} · {user.city}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {user.is_verified && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-[#2350E8]/10 text-[#4169FF] border border-[#2350E8]/20">
                        Verificado
                      </span>
                    )}
                    {user.is_premium && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20">
                        Pro
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
