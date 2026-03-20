'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DayPicker } from 'react-day-picker'
import { useCustomiserStore } from '@/store/useCustomiserStore'
import { format, addDays } from 'date-fns'
import { cn } from '@/lib/utils'

export default function StepNotes() {
  const notes = useCustomiserStore((s) => s.notes)
  const date = useCustomiserStore((s) => s.date)
  const setNotes = useCustomiserStore((s) => s.setNotes)
  const setDate = useCustomiserStore((s) => s.setDate)
  const [showCalendar, setShowCalendar] = useState(false)

  const minDate = addDays(new Date(), 5)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl text-ink">Final touches</h2>
        <p className="text-muted text-sm mt-1 font-sans">
          Tell us anything special, and pick your delivery date.
        </p>
      </div>

      {/* Notes textarea */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-ink font-sans">
          Special notes or requests
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="E.g. 'Happy 30th Birthday, Sarah!' on the front plaque. Allergen-free for nuts. Pick up at 3pm."
          rows={4}
          maxLength={300}
          className="w-full px-4 py-3 rounded-2xl border-2 border-ink/10 bg-white text-sm text-ink font-sans resize-none focus:outline-none focus:border-rose/50 transition-colors placeholder:text-muted/50"
        />
        <p className="text-xs text-muted font-sans">{notes.length} / 300 characters</p>
      </div>

      {/* Date picker */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-ink font-sans block">
          Preferred delivery / pickup date
        </label>
        <p className="text-xs text-muted font-sans">
          We need at least 5 days&apos; notice for custom orders.
        </p>

        <button
          onClick={() => setShowCalendar((v) => !v)}
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-2xl border-2 bg-white transition-colors w-full text-left',
            showCalendar
              ? 'border-rose/50'
              : 'border-ink/10 hover:border-rose/40'
          )}
        >
          <span className="text-lg">📅</span>
          <span className="text-sm font-sans text-ink">
            {date ? format(date, 'EEEE, MMMM d, yyyy') : 'Select a date'}
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

        <AnimatePresence>
          {showCalendar && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="rounded-2xl border-2 border-rose/20 bg-white p-4 shadow-sm mt-1">
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
            className="p-4 rounded-2xl bg-cream border border-rose/20 space-y-2"
          >
            <p className="text-sm font-medium text-ink font-sans">Your request summary:</p>
            {date && (
              <p className="text-sm text-muted font-sans">
                📅 {format(date, 'EEEE, MMMM d, yyyy')}
              </p>
            )}
            {notes && (
              <p className="text-sm text-muted font-sans italic">&ldquo;{notes}&rdquo;</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
