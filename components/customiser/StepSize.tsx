'use client'

import { motion } from 'framer-motion'
import { useCustomiserStore, CakeSize } from '@/store/useCustomiserStore'
import { cn } from '@/lib/utils'

const SIZE_OPTIONS: { value: CakeSize; label: string; servings: string; basePrice: number; desc: string }[] = [
  { value: '6"', label: '6-inch round', servings: '12 servings', basePrice: 180, desc: 'Perfect for intimate celebrations' },
  { value: '8"', label: '8-inch round', servings: '20–24 servings', basePrice: 240, desc: 'The sweet spot for most parties' },
  { value: '10"', label: '10-inch round', servings: '28–38 servings', basePrice: 270, desc: 'A grand centrepiece for large events' },
  { value: '6"+8"', label: '6-inch + 8-inch combo', servings: '40–50 servings', basePrice: 449, desc: 'Two-layer celebration cake' },
]

export default function StepSize() {
  const size = useCustomiserStore((s) => s.size)
  const setSize = useCustomiserStore((s) => s.setSize)

  return (
    <div className="space-y-3 sm:space-y-4">
      <div>
        <h2 className="font-serif text-xl sm:text-2xl text-ink">Select your size</h2>
        <p className="text-muted text-xs sm:text-sm mt-0.5 sm:mt-1 font-sans">
          Sizes are the diameter of the cake. Combo includes two stacked layers.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {SIZE_OPTIONS.map((option) => {
          const selected = size === option.value
          const isCombo = option.value === '6"+8"'
          const diameter = !isCombo ? parseInt(option.value) : 8

          return (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSize(option.value)}
              className={cn(
                'relative flex flex-col items-center gap-1 sm:gap-2 p-3 sm:p-5 rounded-xl sm:rounded-2xl border-2 text-left transition-all cursor-pointer',
                selected
                  ? 'border-rose bg-rose/10 shadow-sm'
                  : 'border-ink/10 bg-white hover:border-rose/30 hover:bg-cream/30'
              )}
            >
              {/* Visual — hidden on mobile to save space */}
              {!isCombo && (
                <div className="hidden sm:flex items-end justify-center h-14 mb-1">
                  <div
                    className={cn(
                      'rounded-full border-2 transition-colors',
                      selected ? 'border-rose bg-rose/20' : 'border-ink/20 bg-cream'
                    )}
                    style={{
                      width: `${(diameter / 10) * 48}px`,
                      height: `${(diameter / 10) * 48 * 0.3}px`,
                    }}
                  />
                </div>
              )}
              {isCombo && (
                <div className="hidden sm:flex flex-col items-center gap-0.5 h-14 mb-1 justify-end">
                  <div
                    className={cn('rounded-sm transition-colors', selected ? 'bg-rose/60' : 'bg-ink/20')}
                    style={{ width: '38px', height: '10px' }}
                  />
                  <div
                    className={cn('rounded-sm transition-colors', selected ? 'bg-rose/60' : 'bg-ink/20')}
                    style={{ width: '48px', height: '12px' }}
                  />
                </div>
              )}

              <div className="text-center">
                <p className="font-semibold text-xs sm:text-sm text-ink font-sans">{option.label}</p>
                <p className="text-[10px] sm:text-xs text-muted mt-0.5 font-sans">{option.servings}</p>
                <p className="text-xs text-muted mt-1 font-sans hidden sm:block">{option.desc}</p>
              </div>

              <span
                className={cn(
                  'text-xs sm:text-sm font-semibold font-sans mt-0.5 sm:mt-1',
                  selected ? 'text-rose' : 'text-ink'
                )}
              >
                ${option.basePrice}
              </span>

              {selected && (
                <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-rose flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
