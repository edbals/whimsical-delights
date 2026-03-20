'use client'

import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'rose' | 'sage' | 'gold' | 'ink' | 'cream'
  className?: string
}

export default function Badge({ children, variant = 'rose', className }: BadgeProps) {
  const variants = {
    rose: 'bg-rose/20 text-rose border-rose/30',
    sage: 'bg-sage/20 text-sage border-sage/30',
    gold: 'bg-gold/20 text-gold border-gold/30',
    ink: 'bg-ink text-surface border-ink',
    cream: 'bg-cream text-muted border-cream',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border font-sans',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
