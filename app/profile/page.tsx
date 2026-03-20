'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { RotateCcw, ExternalLink } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Toast from '@/components/ui/Toast'
import { useUserStore } from '@/store/useUserStore'
import { mockOrders, savedCustomisations } from '@/data/user'

export default function ProfilePage() {
  const { name } = useUserStore()
  const [toastMsg, setToastMsg] = useState('')
  const [showToast, setShowToast] = useState(false)

  const showToastMsg = (msg: string) => {
    setToastMsg(msg)
    setShowToast(true)
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <div className="w-16 h-16 rounded-full bg-rose/20 border-2 border-rose/30 flex items-center justify-center text-2xl flex-shrink-0">
            🧁
          </div>
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-ink">
              Hi, {name} 🧁
            </h1>
          </div>
        </motion.div>

        {/* Order History */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-ink/8 shadow-sm p-6"
        >
          <h2 className="font-serif text-xl text-ink mb-4">Order History</h2>
          <div className="space-y-3">
            {mockOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border border-ink/8 hover:bg-cream/30 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="text-xs font-medium text-muted font-sans">{order.id}</p>
                    <Badge
                      variant={
                        order.status === 'Delivered'
                          ? 'sage'
                          : order.status === 'In Progress'
                          ? 'gold'
                          : 'rose'
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-ink font-sans line-clamp-1">{order.summary}</p>
                  <p className="text-xs text-muted font-sans mt-0.5">{order.date}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <p className="font-serif text-lg text-ink">${order.total}</p>
                  </div>
                  <Link href="/customise">
                    <Button variant="secondary" size="sm">
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reorder
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Saved Customisations */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl border border-ink/8 shadow-sm p-6"
        >
          <h2 className="font-serif text-xl text-ink mb-4">Saved Customisations</h2>
          <div className="space-y-3">
            {savedCustomisations.map((save) => (
              <div
                key={save.id}
                className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border border-ink/8 hover:bg-cream/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-rose/15 flex items-center justify-center text-lg flex-shrink-0">
                  🎂
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-ink font-sans">{save.name}</p>
                  <p className="text-xs text-muted font-sans mt-0.5">
                    {save.flavour} · {save.size} · {save.frosting}
                  </p>
                  <p className="text-xs text-muted font-sans">Saved {save.savedAt}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <p className="font-serif text-base text-ink">${save.totalPrice}</p>
                  <Link href="/customise">
                    <Button variant="secondary" size="sm">
                      <ExternalLink className="w-3.5 h-3.5" />
                      Load &amp; Edit
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <Toast
        message={toastMsg}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        variant="success"
      />
    </div>
  )
}
