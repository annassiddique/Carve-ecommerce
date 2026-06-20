'use client'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'gold'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-body font-medium tracking-wider uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary:
        'bg-carve-forest text-carve-ivory hover:bg-carve-sage border border-carve-forest hover:border-carve-sage',
      outline:
        'bg-transparent text-carve-gold border border-carve-gold hover:bg-carve-gold hover:text-carve-forest',
      ghost:
        'bg-transparent text-carve-charcoal hover:text-carve-gold border border-transparent hover:border-carve-gold',
      gold:
        'bg-carve-gold text-carve-forest border border-carve-gold hover:bg-carve-champagne hover:border-carve-champagne',
    }

    const sizes = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-6 py-3 text-xs',
      lg: 'px-8 py-4 text-sm',
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
