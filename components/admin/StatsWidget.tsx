import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatsWidgetProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  variant?: 'default' | 'warning' | 'success'
}

export default function StatsWidget({ title, value, subtitle, icon: Icon, variant = 'default' }: StatsWidgetProps) {
  const variants = {
    default: 'bg-carve-ivory border-carve-champagne',
    warning: 'bg-yellow-50 border-yellow-200',
    success: 'bg-carve-smoke border-carve-champagne',
  }

  const iconVariants = {
    default: 'bg-carve-champagne text-carve-forest',
    warning: 'bg-yellow-100 text-yellow-600',
    success: 'bg-carve-forest text-carve-ivory',
  }

  return (
    <div className={cn('border rounded-sm p-5', variants[variant])}>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-body text-xs tracking-widest uppercase text-carve-mink mb-2">{title}</p>
          <p className="font-display text-3xl text-carve-charcoal font-light">{value}</p>
          {subtitle && <p className="font-body text-xs text-carve-mink mt-1">{subtitle}</p>}
        </div>
        <div className={cn('w-10 h-10 rounded-sm flex items-center justify-center', iconVariants[variant])}>
          <Icon size={18} />
        </div>
      </div>
    </div>
  )
}
