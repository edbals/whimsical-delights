'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Marquee from '@/components/marquee'
import Button from '@/components/ui/Button'

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" opacity="0.9" />
    </svg>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative">
            <div className="absolute -top-8 left-1/4 pointer-events-none">
              <SparkleIcon className="w-6 h-6 text-gold opacity-60" />
            </div>
            <div className="absolute top-16 -right-4 pointer-events-none hidden lg:block">
              <SparkleIcon className="w-4 h-4 text-rose opacity-70" />
            </div>

            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose/15 border border-rose/25 mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose" />
              <span className="text-xs font-medium text-rose font-sans">
                Victoria&apos;s local custom bakery · Women-owned
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-serif text-5xl sm:text-6xl lg:text-7xl text-ink leading-tight"
            >
              Your cake,
              <br />
              <span className="italic text-rose">your way.</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-6 text-lg text-muted font-sans leading-relaxed max-w-md mx-auto"
            >
              For people in Victoria, BC who need custom desserts for events — Whimsical Delights is your
              local bakery delivering premium, personalised confections rooted in family baking traditions,
              made by women, for everyone.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8"
            >
              <Link href="/customise">
                <Button size="lg" variant="primary">
                  Start Customising
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            {/* Value pillars */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              {[
                { emoji: '🌸', label: 'Women-owned' },
                { emoji: '👩‍🍳', label: 'Family recipes' },
                { emoji: '📍', label: 'Victoria, BC' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream border border-ink/10"
                >
                  <span className="text-base">{item.emoji}</span>
                  <span className="text-xs font-medium text-ink font-sans">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* Cake Sizes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-serif text-3xl sm:text-4xl text-ink">Cake Sizes</h2>
          <p className="mt-3 text-muted font-sans max-w-lg mx-auto">
            Whimsical Delights bakes premium custom cakes in Victoria, BC.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <ul className="bg-white rounded-2xl border border-ink/8 p-6 sm:p-8 space-y-3 text-sm text-muted font-sans">
            <li>6-inch round (12 servings) — $180</li>
            <li>8-inch round (20–24 servings) — $240</li>
            <li>10-inch round (28–38 servings) — $270</li>
            <li>6-inch + 8-inch round combo (40–50 servings) — $449</li>
          </ul>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="bg-cream/40 border-y border-ink/8 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-3xl sm:text-4xl text-center text-ink mb-12"
          >
            How it works
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Customise', desc: 'Choose your size, flavour, frosting, and add-ons using our live builder.', emoji: '🎨' },
              { step: '02', title: 'We Bake', desc: 'Our bakers handcraft your cake to order using the finest ingredients.', emoji: '🧁' },
              { step: '03', title: 'Delight', desc: 'Receive your cake beautifully packaged, ready to celebrate.', emoji: '🎉' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <div className="text-xs font-medium text-muted font-sans tracking-widest mb-2">
                  STEP {item.step}
                </div>
                <h3 className="font-serif text-xl text-ink mb-2">{item.title}</h3>
                <p className="text-sm text-muted font-sans leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-ink rounded-3xl p-10 sm:p-16 text-center overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-8 left-12 text-6xl">✦</div>
            <div className="absolute bottom-8 right-12 text-4xl">✦</div>
            <div className="absolute top-1/2 left-1/4 text-3xl">✦</div>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-surface italic relative z-10">
            Ready to order?
          </h2>
          <p className="mt-4 text-surface/70 font-sans max-w-sm mx-auto relative z-10">
            Build your dream cake with our live customiser — choose your size, flavour, frosting, and add-ons.
          </p>
          <div className="mt-8 relative z-10">
            <Link href="/customise">
              <Button variant="gold" size="lg">
                Start Customising
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
