'use client'

import { motion } from 'framer-motion'
import { useCustomiserStore, FLAVOUR_COLORS } from '@/store/useCustomiserStore'
import { cn } from '@/lib/utils'

const flavours = [
  'Angel Food Cake',
  'Baked Flourless Cake',
  'Biscuit Cake',
  'Butter Cake',
  'Carrot Cake',
  'Chiffon Cake',
  'Genoise Cake',
  'Pound Cake',
  'Red Velvet Cake',
  'Sponge Cake',
]

export default function StepFlavour() {
  const flavour = useCustomiserStore((s) => s.flavour)
  const setFlavour = useCustomiserStore((s) => s.setFlavour)

  return (
    <div className="space-y-3 sm:space-y-4">
      <div>
        <h2 className="font-serif text-xl sm:text-2xl text-ink">Choose your flavour</h2>
        <p className="text-muted text-xs sm:text-sm mt-0.5 sm:mt-1 font-sans">
          Every layer baked fresh to order, using the finest ingredients.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 sm:gap-2.5">
        {flavours.map((f) => {
          const selected = flavour === f
          const color = FLAVOUR_COLORS[f] || '#F5EDE0'

          return (
            <motion.button
              key={f}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setFlavour(f)}
              className={cn(
                'flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border-2 text-xs sm:text-sm font-medium font-sans transition-all cursor-pointer',
                selected
                  ? 'border-rose bg-rose/10 text-ink shadow-sm'
                  : 'border-ink/10 bg-white text-muted hover:border-rose/30 hover:text-ink'
              )}
            >
              <span
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-ink/10 flex-shrink-0"
                style={{
                  backgroundColor: color === 'transparent' ? '#E8DDD0' : color,
                }}
              />
              {f}
            </motion.button>
          )
        })}
      </div>

      {flavour && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs sm:text-sm text-muted font-sans"
        >
          ✓ Selected: <span className="text-ink font-medium">{flavour}</span>
        </motion.p>
      )}
    </div>
  )
}
