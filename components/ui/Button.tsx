'use client'

import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, fullWidth, children, disabled, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D0D] disabled:opacity-50 disabled:cursor-not-allowed select-none'

    const variants = {
      primary:
        'bg-[#2350E8] hover:bg-[#1A3DB5] active:scale-[0.98] text-white focus-visible:ring-[#2350E8] shadow-lg shadow-[#2350E8]/20',
      secondary:
        'bg-[#1A1A1A] hover:bg-[#252525] active:scale-[0.98] text-white border border-[#2A2A2A] hover:border-[#3A3A3A]',
      ghost:
        'bg-transparent hover:bg-white/5 active:scale-[0.98] text-[#888888] hover:text-white',
      outline:
        'bg-transparent border border-[#2350E8] text-[#2350E8] hover:bg-[#2350E8] hover:text-white active:scale-[0.98]',
      danger:
        'bg-[#EF4444] hover:bg-[#DC2626] active:scale-[0.98] text-white focus-visible:ring-[#EF4444] shadow-lg shadow-[#EF4444]/20',
      success:
        'bg-[#10BE72] hover:bg-[#0EA564] active:scale-[0.98] text-white focus-visible:ring-[#10BE72] shadow-lg shadow-[#10BE72]/20',
    }

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2.5 gap-2',
      lg: 'text-base px-6 py-3 gap-2.5',
      xl: 'text-lg px-8 py-4 gap-3',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
        {...props}
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Carregando...</span>
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
