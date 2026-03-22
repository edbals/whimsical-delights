'use client'

import { motion } from 'framer-motion'
import { Leaf } from 'lucide-react'
import { useCustomiserStore } from '@/store/useCustomiserStore'
import { cn } from '@/lib/utils'

interface FillingOption {
  name: string
  color: string
  seasonal?: boolean
}

const CLASSIC_FILLINGS: FillingOption[] = [
  { name: 'Vanilla Buttercream', color: '#FFF8E7' },
  { name: 'Chocolate Ganache', color: '#3E2723' },
  { name: 'Strawberry Jam', color: '#E57373' },
  { name: 'Raspberry Preserves', color: '#C62828' },
  { name: 'Lemon Curd', color: '#FFF176' },
  { name: 'Cream Cheese', color: '#FDE8D0' },
  { name: 'Dulce de Leche', color: '#C68A40' },
  { name: 'Passionfruit Curd', color: '#FFB74D' },
  { name: 'Salted Caramel', color: '#A1887F' },
  { name: 'Mixed Berry Compote', color: '#7B1FA2' },
]

const SEASONAL_FILLINGS: FillingOption[] = [
  { name: 'Pear Vanilla', color: '#DCE775', seasonal: true },
  { name: 'Rose', color: '#F48FB1', seasonal: true },
  { name: 'Peach', color: '#FFAB91', seasonal: true },
  { name: 'Pistachio', color: '#A5D6A7', seasonal: true },
]

const ALL_FILLINGS = [...CLASSIC_FILLINGS, ...SEASONAL_FILLINGS]

export default function StepFilling() {
  const filling = useCustomiserStore((s) => s.filling)
  const setFilling = useCustomiserStore((s) => s.setFilling)

  return (
    <div className="space-y-3 sm:space-y-4">
      <div>
        <h2 className="font-serif text-xl sm:text-2xl text-ink">Choose your filling</h2>
        <p className="text-muted text-xs sm:text-sm mt-0.5 sm:mt-1 font-sans">
          The layer between your cake — pick one that complements your flavour.
        </p>
      </div>

      {/* Classic fillings */}
      <div>
        <p className="text-[10px] sm:text-xs font-medium text-muted font-sans tracking-widest uppercase mb-2">
          Classic
        </p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2.5">
          {CLASSIC_FILLINGS.map((f) => {
            const selected = filling === f.name
            return (
              <motion.button
                key={f.name}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setFilling(f.name)}
                className={cn(
                  'flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border-2 text-xs sm:text-sm font-medium font-sans transition-all cursor-pointer',
                  selected
                    ? 'border-rose bg-rose/10 text-ink shadow-sm'
                    : 'border-ink/10 bg-white text-muted hover:border-rose/30 hover:text-ink'
                )}
              >
                <span
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-ink/10 flex-shrink-0"
                  style={{ backgroundColor: f.color }}
                />
                {f.name}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Seasonal fillings */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <Leaf className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sage" />
          <p className="text-[10px] sm:text-xs font-medium text-sage font-sans tracking-widest uppercase">
            Seasonal — Limited Time
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2.5">
          {SEASONAL_FILLINGS.map((f) => {
            const selected = filling === f.name
            return (
              <motion.button
                key={f.name}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setFilling(f.name)}
                className={cn(
                  'flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full border-2 text-xs sm:text-sm font-medium font-sans transition-all cursor-pointer',
                  selected
                    ? 'border-sage bg-sage/10 text-ink shadow-sm'
                    : 'border-sage/30 bg-white text-muted hover:border-sage/50 hover:text-ink'
                )}
              >
                <span
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border border-ink/10 flex-shrink-0"
                  style={{ backgroundColor: f.color }}
                />
                {f.name}
                <span className="text-[9px] sm:text-[10px] text-sage font-normal">seasonal</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {filling && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs sm:text-sm text-muted font-sans"
        >
          ✓ Selected: <span className="text-ink font-medium">{filling}</span>
          {ALL_FILLINGS.find((f) => f.name === filling)?.seasonal && (
            <span className="ml-1 text-sage">(seasonal)</span>
          )}
        </motion.p>
      )}
    </div>
  )
}
