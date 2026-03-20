'use client'

import { motion } from 'framer-motion'
import { useCustomiserStore } from '@/store/useCustomiserStore'
import { cn } from '@/lib/utils'

const addOnOptions = [
  {
    name: 'Fresh Flowers',
    desc: 'Seasonal blooms, food-safe and fragrant',
    emoji: '🌸',
    price: 15,
  },
  {
    name: 'Custom Cake Topper',
    desc: 'Personalised acrylic or edible topper',
    emoji: '⭐',
    price: 12,
  },
  {
    name: 'Gold Leaf',
    desc: 'Edible gold leaf accents on the tiers',
    emoji: '✨',
    price: 15,
  },
  {
    name: 'Macarons on Top',
    desc: 'Petite French macarons in assorted flavours',
    emoji: '🍪',
    price: 14,
  },
  {
    name: 'Message Plaque',
    desc: 'Personalised chocolate or fondant plaque',
    emoji: '💌',
    price: 8,
  },
]

export default function StepAddons() {
  const addOns = useCustomiserStore((s) => s.addOns)
  const toggleAddOn = useCustomiserStore((s) => s.toggleAddOn)

  return (
    <div className="space-y-3 sm:space-y-4">
      <div>
        <h2 className="font-serif text-xl sm:text-2xl text-ink">Add-ons & extras</h2>
        <p className="text-muted text-xs sm:text-sm mt-0.5 sm:mt-1 font-sans">
          Elevate your cake with handcrafted decorative touches.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {addOnOptions.map((option) => {
          const selected = addOns.includes(option.name)

          return (
            <motion.button
              key={option.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleAddOn(option.name)}
              className={cn(
                'flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 text-left transition-all cursor-pointer',
                selected
                  ? 'border-rose bg-rose/10 shadow-sm'
                  : 'border-ink/10 bg-white hover:border-rose/30 hover:bg-cream/30'
              )}
            >
              <span className="text-xl sm:text-2xl flex-shrink-0">{option.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-xs sm:text-sm text-ink font-sans">{option.name}</p>
                  <span className="text-xs sm:text-sm font-semibold text-rose font-sans flex-shrink-0">
                    +${option.price}
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-muted mt-0.5 font-sans hidden sm:block">{option.desc}</p>
              </div>

              <div
                className={cn(
                  'w-4 h-4 sm:w-5 sm:h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors',
                  selected ? 'border-rose bg-rose' : 'border-ink/20 bg-white'
                )}
              >
                {selected && (
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>

      {addOns.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs sm:text-sm text-muted font-sans"
        >
          {addOns.length} add-on{addOns.length > 1 ? 's' : ''} selected
        </motion.p>
      )}
    </div>
  )
}
