'use client'

import { motion } from 'framer-motion'
import { useCustomiserStore, TAX_RATE } from '@/store/useCustomiserStore'
import { format } from 'date-fns'

const ADDON_PRICES: Record<string, number> = {
  'Fresh Flowers': 15,
  'Custom Cake Topper': 12,
  'Gold Leaf': 15,
  'Macarons on Top': 14,
  'Message Plaque': 8,
}

const SIZE_BASE_PRICES: Record<string, number> = {
  '6"': 180,
  '8"': 240,
  '10"': 270,
  '6"+8"': 449,
}

export default function OrderSummary() {
  const { flavour, filling, size, addOns, notes, date, subtotalPrice, isRushOrder, rushFee, taxAmount, totalPrice, depositAmount, balanceDue } =
    useCustomiserStore()

  const sizeLabel = size === '6"+8"' ? '6" + 8" combo' : size
  const lineItems = [
    { label: `Base cake (${sizeLabel})`, price: SIZE_BASE_PRICES[size] ?? 0 },
    ...addOns.map((a) => ({ label: a, price: ADDON_PRICES[a] ?? 0 })),
  ]

  return (
    <div className="bg-white rounded-2xl border border-ink/8 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-ink/8 bg-cream/40">
        <h3 className="font-serif text-lg text-ink">Order Summary</h3>
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Selections overview */}
        <div className="space-y-2">
          {flavour && (
            <div className="flex justify-between text-sm font-sans">
              <span className="text-muted">Flavour</span>
              <span className="text-ink font-medium">{flavour}</span>
            </div>
          )}
          {filling && (
            <div className="flex justify-between text-sm font-sans">
              <span className="text-muted">Filling</span>
              <span className="text-ink font-medium">{filling}</span>
            </div>
          )}
          {date && (
            <div className="flex justify-between text-sm font-sans">
              <span className="text-muted">Date</span>
              <span className="text-ink font-medium">
                {format(date, 'MMM d, yyyy')}
                {isRushOrder && <span className="ml-1 text-amber-600">(Rush)</span>}
              </span>
            </div>
          )}
        </div>

        <div className="border-t border-ink/8 pt-3 space-y-2">
          {lineItems.map((item, i) => (
            <div key={i} className="flex justify-between text-sm font-sans">
              <span className="text-muted">{item.label}</span>
              <span className="text-ink">${item.price}</span>
            </div>
          ))}
          {isRushOrder && (
            <div className="flex justify-between text-sm font-sans text-amber-700">
              <span>Rush fee (25%)</span>
              <span>${rushFee.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Subtotal, Tax, Total */}
        <div className="border-t border-ink/8 pt-3 space-y-2">
          <div className="flex justify-between text-sm font-sans">
            <span className="text-muted">Subtotal</span>
            <span className="text-ink">${(subtotalPrice + rushFee).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm font-sans">
            <span className="text-muted">Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
            <span className="text-ink">${taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-baseline pt-1 border-t border-ink/8">
            <span className="font-medium text-ink font-sans">Total</span>
            <motion.span
              key={totalPrice}
              initial={{ scale: 1.1, color: '#D4A5A5' }}
              animate={{ scale: 1, color: '#1C1C1C' }}
              className="font-serif text-2xl text-ink"
            >
              ${totalPrice.toFixed(2)}
            </motion.span>
          </div>
        </div>

        {/* Deposit breakdown */}
        {depositAmount > 0 && (
          <div className="border-t border-ink/8 pt-3 space-y-1.5">
            <div className="flex justify-between text-sm font-sans">
              <span className="text-rose font-medium">Deposit due now (30%)</span>
              <span className="text-rose font-medium">${depositAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-sans">
              <span className="text-muted">Balance due 7–14 days before event</span>
              <span className="text-ink">${balanceDue.toFixed(2)}</span>
            </div>
            <p className="text-xs text-muted font-sans">
              The 30% deposit is non-refundable.
            </p>
          </div>
        )}

        {notes && (
          <div className="pt-2 border-t border-ink/8">
            <p className="text-xs text-muted font-sans italic">&ldquo;{notes}&rdquo;</p>
          </div>
        )}
      </div>
    </div>
  )
}
