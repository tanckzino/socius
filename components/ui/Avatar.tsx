import { cn, getInitials, getAvatarColor } from '@/lib/utils'
import Image from 'next/image'

interface AvatarProps {
  name: string
  src?: string | null
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
  online?: boolean
  verified?: boolean
}

const sizes = {
  xs: 'w-6 h-6 text-[9px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-2xl',
  '2xl': 'w-28 h-28 text-3xl',
}

const onlineSizes = {
  xs: 'w-1.5 h-1.5 -bottom-0 -right-0',
  sm: 'w-2 h-2 -bottom-0 -right-0',
  md: 'w-2.5 h-2.5 bottom-0 right-0',
  lg: 'w-3.5 h-3.5 bottom-0.5 right-0.5',
  xl: 'w-4 h-4 bottom-1 right-1',
  '2xl': 'w-5 h-5 bottom-1 right-1',
}

export default function Avatar({ name, src, size = 'md', className, online, verified }: AvatarProps) {
  const initials = getInitials(name)
  const color = getAvatarColor(name)

  return (
    <div className={cn('relative flex-shrink-0', className)}>
      <div
        className={cn(
          'rounded-full flex items-center justify-center font-bold ring-2 ring-[#1A1A1A]',
          sizes[size]
        )}
        style={src ? undefined : { background: `${color}25`, color }}
      >
        {src ? (
          <Image
            src={src}
            alt={name}
            width={112}
            height={112}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          initials
        )}
      </div>

      {online !== undefined && (
        <span
          className={cn(
            'absolute rounded-full border-2 border-[#0D0D0D]',
            onlineSizes[size],
            online ? 'bg-[#10BE72]' : 'bg-[#555555]'
          )}
        />
      )}

      {verified && (
        <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#2350E8] rounded-full flex items-center justify-center">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1.5 4L3 5.5L6.5 2.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      )}
    </div>
  )
}
