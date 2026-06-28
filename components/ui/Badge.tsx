import { cn } from '@/lib/utils'
import { UserRole, ROLE_LABELS, ROLE_COLORS } from '@/lib/types'

interface BadgeProps {
  label?: string
  role?: UserRole
  variant?: 'default' | 'blue' | 'green' | 'purple' | 'yellow' | 'pink' | 'outline'
  size?: 'sm' | 'md'
  className?: string
}

export default function Badge({ label, role, variant = 'default', size = 'sm', className }: BadgeProps) {
  const base = 'inline-flex items-center font-semibold rounded-full whitespace-nowrap'

  const sizes = {
    sm: 'text-[10px] px-2.5 py-1 gap-1',
    md: 'text-xs px-3 py-1.5 gap-1.5',
  }

  if (role) {
    const color = ROLE_COLORS[role]
    return (
      <span
        className={cn(base, sizes[size], className)}
        style={{
          background: `${color}18`,
          color: color,
          border: `1px solid ${color}30`,
        }}
      >
        {ROLE_LABELS[role]}
      </span>
    )
  }

  const variants = {
    default: 'bg-white/8 text-[#888888] border border-white/8',
    blue: 'bg-[#2350E8]/15 text-[#4169FF] border border-[#2350E8]/25',
    green: 'bg-[#10BE72]/15 text-[#10BE72] border border-[#10BE72]/25',
    purple: 'bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/25',
    yellow: 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/25',
    pink: 'bg-[#EC4899]/15 text-[#EC4899] border border-[#EC4899]/25',
    outline: 'bg-transparent text-[#888888] border border-[#2A2A2A]',
  }

  return (
    <span className={cn(base, sizes[size], variants[variant], className)}>
      {label}
    </span>
  )
}
