'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useCustomiserStore } from '@/store/useCustomiserStore'
import { format } from 'date-fns'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function OrderAgreementModal({ isOpen, onClose, onConfirm }: Props) {
  const {
    size, flavour, addOns, date, notes,
    isRushOrder, rushFee, subtotalPrice,
    taxAmount, totalPrice, depositAmount, balanceDue,
  } = useCustomiserStore()

  const [agreed, setAgreed] = useState(false)
  const [paying, setPaying] = useState(false)
  const [paid, setPaid] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setAgreed(false)
      setPaying(false)
      setPaid(false)
    }
  }, [isOpen])

  const sizeLabel = size === '6"+8"' ? '6" + 8" combo' : size
  const hasDeposit = depositAmount > 0

  const handleConfirm = () => {
    if (!hasDeposit) {
      onConfirm()
      return
    }
    setPaying(true)
    setTimeout(() => {
      setPaid(true)
      setTimeout(() => {
        onConfirm()
      }, 1200)
    }, 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative bg-white rounded-3xl border border-ink/8 shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
          >
            {/* Mock payment overlay */}
            <AnimatePresence>
              {paying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 bg-white rounded-3xl flex flex-col items-center justify-center gap-4"
                >
                  {!paid ? (
                    <>
                      <Loader2 className="w-10 h-10 text-rose animate-spin" />
                      <p className="text-sm text-muted font-sans">Processing deposit payment...</p>
                    </>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center gap-3"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </div>
                      <p className="font-serif text-xl text-ink">Payment successful</p>
                      <p className="text-sm text-muted font-sans">
                        Deposit of ${depositAmount.toFixed(2)} received
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-ink/8">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-rose" />
                <h2 className="font-serif text-xl text-ink">Order Agreement</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-cream transition-colors text-muted"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* Order details */}
              <div>
                <p className="text-xs font-medium text-muted font-sans tracking-widest uppercase mb-2">
                  Agreed Design
                </p>
                <div className="rounded-xl bg-cream/60 border border-ink/8 p-4 space-y-1.5">
                  <div className="flex justify-between text-sm font-sans">
                    <span className="text-muted">Size</span>
                    <span className="text-ink font-medium">{sizeLabel}</span>
                  </div>
                  {flavour && (
                    <div className="flex justify-between text-sm font-sans">
                      <span className="text-muted">Flavour</span>
                      <span className="text-ink font-medium">{flavour}</span>
                    </div>
                  )}
                  {addOns.length > 0 && (
                    <div className="flex justify-between text-sm font-sans">
                      <span className="text-muted">Add-ons</span>
                      <span className="text-ink font-medium text-right">{addOns.join(', ')}</span>
                    </div>
                  )}
                  {date && (
                    <div className="flex justify-between text-sm font-sans">
                      <span className="text-muted">Event date</span>
                      <span className="text-ink font-medium">
                        {format(date, 'MMM d, yyyy')}
                        {isRushOrder && <span className="ml-1 text-amber-600">(Rush)</span>}
                      </span>
                    </div>
                  )}
                  {notes && (
                    <div className="pt-1.5 border-t border-ink/8">
                      <p className="text-xs text-muted font-sans italic">&ldquo;{notes}&rdquo;</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Price breakdown */}
              <div>
                <p className="text-xs font-medium text-muted font-sans tracking-widest uppercase mb-2">
                  Pricing
                </p>
                <div className="rounded-xl bg-cream/60 border border-ink/8 p-4 space-y-1.5">
                  <div className="flex justify-between text-sm font-sans">
                    <span className="text-muted">Subtotal</span>
                    <span className="text-ink">${subtotalPrice.toFixed(2)}</span>
                  </div>
                  {isRushOrder && (
                    <div className="flex justify-between text-sm font-sans text-amber-700">
                      <span>Rush surcharge (25%)</span>
                      <span>${rushFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-sans">
                    <span className="text-muted">Tax (12%)</span>
                    <span className="text-ink">${taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-sans font-medium pt-1.5 border-t border-ink/8">
                    <span className="text-ink">Total</span>
                    <span className="text-ink">${totalPrice.toFixed(2)}</span>
                  </div>
                  {hasDeposit && (
                    <>
                      <div className="flex justify-between text-sm font-sans pt-1.5 border-t border-ink/8">
                        <span className="text-rose font-medium">Deposit due now (30%)</span>
                        <span className="text-rose font-medium">${depositAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-sans">
                        <span className="text-muted">Balance due before event</span>
                        <span className="text-ink">${balanceDue.toFixed(2)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Terms */}
              <div>
                <p className="text-xs font-medium text-muted font-sans tracking-widest uppercase mb-2">
                  Terms & Conditions
                </p>
                <div className="rounded-xl bg-cream/60 border border-ink/8 p-4 space-y-2.5 text-xs text-muted font-sans leading-relaxed">
                  <p>
                    <strong className="text-ink">Event Date & Delivery:</strong>{' '}
                    {date ? `Your order is scheduled for ${format(date, 'MMMM d, yyyy')}.` : 'No date selected.'}{' '}
                    Delivery or pickup must occur within the agreed time window.
                  </p>
                  <p>
                    <strong className="text-ink">Change Policy:</strong>{' '}
                    Changes to the order must be requested at least 7 days before the event date.
                    Changes requested after this window may not be accommodated.
                  </p>
                  <p>
                    <strong className="text-ink">Cancellation:</strong>{' '}
                    {hasDeposit
                      ? 'The 30% deposit is non-refundable. Cancellations within 48 hours of the event forfeit the full order amount.'
                      : 'Cancellations must be made at least 48 hours before the event date. Late cancellations forfeit the full order amount.'}
                  </p>
                  {isRushOrder && (
                    <p>
                      <strong className="text-amber-700">Rush Order:</strong>{' '}
                      A 25% rush surcharge has been applied because this order is within 72 hours of the event date.
                      Rush fees are non-refundable.
                    </p>
                  )}
                  {hasDeposit && (
                    <p>
                      <strong className="text-ink">Payment:</strong>{' '}
                      A non-refundable deposit of 30% (${depositAmount.toFixed(2)}) is required to confirm this order.
                      The remaining balance of ${balanceDue.toFixed(2)} is due 7–14 days before the event.
                    </p>
                  )}
                </div>
              </div>

              {/* Agreement checkbox */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="mt-0.5">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                      agreed
                        ? 'bg-rose border-rose'
                        : 'border-ink/20 group-hover:border-rose/40'
                    }`}
                  >
                    {agreed && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-ink font-sans leading-snug">
                  I agree to the order terms and conditions above.
                </span>
              </label>

              {/* Action button */}
              <Button
                variant="primary"
                onClick={handleConfirm}
                disabled={!agreed || paying}
                className="w-full disabled:opacity-40"
              >
                {hasDeposit
                  ? `Agree & Pay Deposit — $${depositAmount.toFixed(2)}`
                  : 'Agree & Confirm Order'}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
