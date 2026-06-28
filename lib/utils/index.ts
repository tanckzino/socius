import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number, currency = 'BRL') {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumber(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`
  return value.toString()
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export function timeAgo(date: string) {
  const now = new Date()
  const then = new Date(date)
  const diff = now.getTime() - then.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'agora'
  if (minutes < 60) return `${minutes}m`
  if (hours < 24) return `${hours}h`
  if (days < 7) return `${days}d`
  return then.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

export function truncate(str: string, maxLength: number) {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + '…'
}

export function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const AVATAR_COLORS = [
  '#2350E8', '#10BE72', '#8B5CF6', '#F59E0B', '#EC4899',
  '#06B6D4', '#84CC16', '#EF4444', '#F97316', '#6366F1',
]

export function getAvatarColor(name: string) {
  const index = name.charCodeAt(0) % AVATAR_COLORS.length
  return AVATAR_COLORS[index]
}
