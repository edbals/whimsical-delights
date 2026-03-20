'use client'

import { cn } from '@/lib/utils'

interface SliderProps {
  min: number
  max: number
  value: number
  onChange: (value: number) => void
  className?: string
}

export default function Slider({ min, max, value, onChange, className }: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className={cn('relative w-full', className)}>
      <div className="relative h-2 rounded-full bg-cream">
        <div
          className="absolute h-2 rounded-full bg-rose transition-all duration-200"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full opacity-0 cursor-pointer h-2"
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-rose border-2 border-white shadow-md transition-all duration-200 pointer-events-none"
        style={{ left: `calc(${percentage}% - 10px)` }}
      />
    </div>
  )
}
