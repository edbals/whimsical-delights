'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import { useCustomiserStore } from '@/store/useCustomiserStore'
import { format, addDays } from 'date-fns'
import { cn } from '@/lib/utils'

export default function StepNotes() {
  const notes = useCustomiserStore((s) => s.notes)
  const date = useCustomiserStore((s) => s.date)
  const isRushOrder = useCustomiserStore((s) => s.isRushOrder)
  const setNotes = useCustomiserStore((s) => s.setNotes)
  const setDate = useCustomiserStore((s) => s.setDate)
  const [showCalendar, setShowCalendar] = useState(false)

  const minDate = addDays(new Date(), 1)

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="font-serif text-xl sm:text-2xl text-ink">Final touches</h2>
        <p className="text-muted text-xs sm:text-sm mt-0.5 sm:mt-1 font-sans">
          Tell us anything special, and pick your delivery date.
        </p>
      </div>

      {/* Notes textarea */}
      <div className="space-y-1.5 sm:space-y-2">
        <label className="text-xs sm:text-sm font-medium text-ink font-sans">
          Special notes or requests
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="E.g. 'Happy 30th Birthday, Sarah!' on the plaque. Allergen-free for nuts."
          rows={3}
          maxLength={300}
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border-2 border-ink/10 bg-white text-sm text-ink font-sans resize-none focus:outline-none focus:border-rose/50 transition-colors placeholder:text-muted/50"
        />
        <p className="text-[10px] sm:text-xs text-muted font-sans">{notes.length} / 300</p>
      </div>

      {/* Date picker */}
      <div className="space-y-1.5 sm:space-y-2">
        <label className="text-xs sm:text-sm font-medium text-ink font-sans block">
          Preferred delivery / pickup date
        </label>
        <p className="text-[10px] sm:text-xs text-muted font-sans">
          Orders within 72 hours incur a 25% rush surcharge.
        </p>

        <button
          onClick={() => setShowCalendar((v) => !v)}
          className={cn(
            'flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border-2 bg-white transition-colors w-full text-left',
            isRushOrder
              ? 'border-amber-400/60'
              : showCalendar
              ? 'border-rose/50'
              : 'border-ink/10 hover:border-rose/40'
          )}
        >
          <span className="text-base sm:text-lg">📅</span>
          <span className="text-xs sm:text-sm font-sans text-ink">
            {date ? format(date, 'EEE, MMM d, yyyy') : 'Select a date'}
          </span>
          {date && (
            <button
              onClick={(e) => { e.stopPropagation(); setDate(null) }}
              className="ml-auto text-muted hover:text-ink text-xs font-sans underline"
            >
              Clear
            </button>
          )}
        </button>

        {/* Rush order warning */}
        <AnimatePresence>
          {isRushOrder && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-start gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-amber-50 border border-amber-200 mt-1">
                <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-amber-800 font-sans">Rush order</p>
                  <p className="text-[10px] sm:text-xs text-amber-700 font-sans mt-0.5">
                    25% surcharge for orders within 72 hours.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showCalendar && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="rounded-xl sm:rounded-2xl border-2 border-rose/20 bg-white p-3 sm:p-4 shadow-sm mt-1">
                <DayPicker
                  mode="single"
                  selected={date ?? undefined}
                  onSelect={(d) => {
                    setDate(d ?? null)
                    setShowCalendar(false)
                  }}
                  disabled={{ before: minDate }}
                  fromMonth={minDate}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Summary */}
      <AnimatePresence>
        {(notes || date) && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-cream border border-rose/20 space-y-1.5 sm:space-y-2"
          >
            <p className="text-xs sm:text-sm font-medium text-ink font-sans">Your request summary:</p>
            {date && (
              <p className="text-xs sm:text-sm text-muted font-sans">
                📅 {format(date, 'EEE, MMM d, yyyy')}
                {isRushOrder && <span className="ml-2 text-amber-600 font-medium">(Rush)</span>}
              </p>
            )}
            {notes && (
              <p className="text-xs sm:text-sm text-muted font-sans italic">&ldquo;{notes}&rdquo;</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
