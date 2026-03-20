'use client'

import { motion } from 'framer-motion'
import { useCustomiserStore } from '@/store/useCustomiserStore'
import Slider from '@/components/ui/Slider'

const sugarLabels = [
  { level: 0, label: 'Sugar-Free', emoji: '🌿', desc: 'Sweetened with natural alternatives' },
  { level: 1, label: 'Lightly Sweet', emoji: '🌸', desc: 'Subtle, delicate sweetness' },
  { level: 2, label: 'Classic Sweet', emoji: '🍰', desc: 'Our standard sweetness level' },
  { level: 3, label: 'Extra Sweet', emoji: '🍬', desc: 'For those who love indulgence' },
  { level: 4, label: 'Maximum Sweet', emoji: '🍭', desc: 'Pure dessert heaven' },
]

export default function StepSugar() {
  const sugarLevel = useCustomiserStore((s) => s.sugarLevel)
  const setSugarLevel = useCustomiserStore((s) => s.setSugarLevel)

  const current = sugarLabels[sugarLevel]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl text-ink">Sugar level</h2>
        <p className="text-muted text-sm mt-1 font-sans">
          We tailor the sweetness to your taste — no compromises.
        </p>
      </div>

      {/* Current selection display */}
      <motion.div
        key={sugarLevel}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 p-4 rounded-2xl bg-cream"
      >
        <span className="text-3xl">{current.emoji}</span>
        <div>
          <p className="font-semibold text-ink font-sans">{current.label}</p>
          <p className="text-sm text-muted font-sans">{current.desc}</p>
        </div>
      </motion.div>

      {/* Slider */}
      <div className="px-2 pt-4 pb-2">
        <Slider
          min={0}
          max={4}
          value={sugarLevel}
          onChange={setSugarLevel}
        />
        {/* Labels */}
        <div className="flex justify-between mt-4">
          {sugarLabels.map((item) => (
            <button
              key={item.level}
              onClick={() => setSugarLevel(item.level)}
              className="flex flex-col items-center gap-1 cursor-pointer group"
            >
              <span className="text-base">{item.emoji}</span>
              <span
                className={`text-xs font-sans hidden sm:block transition-colors ${
                  sugarLevel === item.level ? 'text-ink font-medium' : 'text-muted'
                }`}
              >
                {item.label.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
