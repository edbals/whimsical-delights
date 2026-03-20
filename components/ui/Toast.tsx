'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2 } from 'lucide-react'

interface ToastProps {
  message: string
  isVisible: boolean
  onClose: () => void
  variant?: 'success' | 'info' | 'error'
  duration?: number
}

export default function Toast({
  message,
  isVisible,
  onClose,
  variant = 'success',
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose, duration])

  const colors = {
    success: 'bg-surface border-sage/40 text-ink',
    info: 'bg-surface border-rose/40 text-ink',
    error: 'bg-surface border-red-300 text-ink',
  }

  const iconColors = {
    success: 'text-sage',
    info: 'text-rose',
    error: 'text-red-400',
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className={`fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-lg ${colors[variant]} sm:min-w-[260px] sm:max-w-sm`}
        >
          <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${iconColors[variant]}`} />
          <p className="text-sm font-medium flex-1">{message}</p>
          <button
            onClick={onClose}
            className="text-muted hover:text-ink transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
