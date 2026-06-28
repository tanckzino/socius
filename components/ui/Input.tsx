'use client'

import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftIcon, rightIcon, fullWidth, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[#F5F5F5]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888888]">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl text-[#F5F5F5] placeholder:text-[#555555]',
              'py-3 text-sm',
              'transition-all duration-200',
              'focus:outline-none focus:border-[#2350E8] focus:ring-1 focus:ring-[#2350E8]',
              'hover:border-[#3A3A3A]',
              error && 'border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]',
              leftIcon ? 'pl-11 pr-4' : 'px-4',
              rightIcon ? 'pr-11' : '',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#888888]">
              {rightIcon}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-[#EF4444]">{error}</p>}
        {hint && !error && <p className="text-xs text-[#888888]">{hint}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
