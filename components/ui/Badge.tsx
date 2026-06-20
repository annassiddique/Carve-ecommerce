import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'green' | 'red' | 'gray' | 'yellow'
  className?: string
}

export default function Badge({ children, variant = 'gold', className }: BadgeProps) {
  const variants = {
    gold: 'bg-carve-champagne text-carve-mink border border-carve-gold',
    green: 'bg-carve-forest text-carve-ivory',
    red: 'bg-red-100 text-red-700 border border-red-200',
    gray: 'bg-carve-smoke text-carve-charcoal border border-carve-champagne',
    yellow: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-xs font-medium tracking-wide font-body rounded-sm',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
