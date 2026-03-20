'use client'

import { motion } from 'framer-motion'
import { useCustomiserStore, FROSTING_COLORS } from '@/store/useCustomiserStore'
import { cn } from '@/lib/utils'

const frostings = [
  {
    name: 'Swiss Meringue Buttercream',
    desc: 'Silky, light, and perfectly sweet',
    emoji: '🍦',
  },
  {
    name: 'Whipped Cream',
    desc: 'Light and airy, delicate finish',
    emoji: '☁️',
  },
  {
    name: 'Cream Cheese',
    desc: 'Tangy and rich, classic pairing',
    emoji: '🧀',
  },
  {
    name: 'Fondant',
    desc: 'Smooth canvas for elaborate designs',
    emoji: '🎨',
  },
  {
    name: 'Naked Style',
    desc: 'Rustic, minimal — let the cake shine',
    emoji: '🌿',
  },
]

export default function StepFrosting() {
  const frosting = useCustomiserStore((s) => s.frosting)
  const setFrosting = useCustomiserStore((s) => s.setFrosting)

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-serif text-2xl text-ink">Pick your frosting</h2>
        <p className="text-muted text-sm mt-1 font-sans">
          The finishing touch that makes your cake uniquely yours.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {frostings.map((option) => {
          const selected = frosting === option.name
          const color = FROSTING_COLORS[option.name]

          return (
            <motion.button
              key={option.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFrosting(option.name)}
              className={cn(
                'flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer',
                selected
                  ? 'border-rose bg-rose/10 shadow-sm'
                  : 'border-ink/10 bg-white hover:border-rose/30 hover:bg-cream/30'
              )}
            >
              {/* Color swatch */}
              <div
                className="w-10 h-10 rounded-full border border-ink/10 flex-shrink-0 flex items-center justify-center text-lg"
                style={{
                  backgroundColor:
                    color === 'transparent' ? 'transparent' : color,
                  backgroundImage:
                    color === 'transparent'
                      ? 'repeating-linear-gradient(45deg, #e0d8d0 0, #e0d8d0 1px, transparent 0, transparent 50%)'
                      : undefined,
                  backgroundSize: color === 'transparent' ? '6px 6px' : undefined,
                }}
              >
                {color === 'transparent' && (
                  <span className="text-xs text-muted">∅</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-ink font-sans">{option.name}</p>
                <p className="text-xs text-muted mt-0.5 font-sans">{option.desc}</p>
              </div>

              {selected && (
                <div className="w-5 h-5 rounded-full bg-rose flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
