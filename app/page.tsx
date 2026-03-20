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
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative">
            <div className="absolute -top-8 left-1/4 pointer-events-none hidden sm:block">
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
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose/15 border border-rose/25 mb-4 sm:mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose" />
              <span className="text-xs font-medium text-rose font-sans">
                Victoria&apos;s local custom bakery
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-serif text-4xl sm:text- 5xl lg:text-7xl text-ink leading-tight"
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
              className="mt-4 sm:mt-6 text-base sm:text-lg text-muted font-sans leading-relaxed max-w-md mx-auto px-2"
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
              className="mt-6 sm:mt-8"
            >
              <Link href="/customise">
                <Button size="lg" variant="primary" className="w-full sm:w-auto">
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
              className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
            >
              {[
                { emoji: '🌸', label: 'Women-owned' },
                { emoji: '👩‍🍳', label: 'Family recipes' },
                { emoji: '📍', label: 'Victoria, BC' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-cream border border-ink/10"
                >
                  <span className="text-sm sm:text-base">{item.emoji}</span>
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-ink">Cake Sizes</h2>
          <p className="mt-2 sm:mt-3 text-muted font-sans text-sm sm:text-base max-w-lg mx-auto px-2">
            Whimsical Delights bakes premium custom cakes in Victoria, BC.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { size: '6-inch', servings: '12 servings', price: '$180' },
              { size: '8-inch', servings: '20–24 servings', price: '$240' },
              { size: '10-inch', servings: '28–38 servings', price: '$270' },
              { size: '6" + 8" combo', servings: '40–50 servings', price: '$449' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl bg-white border border-ink/8"
              >
                <div>
                  <p className="text-sm font-medium text-ink font-sans">{item.size}</p>
                  <p className="text-xs text-muted font-sans mt-0.5">{item.servings}</p>
                </div>
                <span className="font-serif text-lg text-ink">{item.price}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="bg-cream/40 border-y border-ink/8 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-2xl sm:text-3xl lg:text-4xl text-center text-ink mb-8 sm:mb-12"
          >
            How it works
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
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
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{item.emoji}</div>
                <div className="text-xs font-medium text-muted font-sans tracking-widest mb-1.5 sm:mb-2">
                  STEP {item.step}
                </div>
                <h3 className="font-serif text-lg sm:text-xl text-ink mb-1.5 sm:mb-2">{item.title}</h3>
                <p className="text-sm text-muted font-sans leading-relaxed px-4 sm:px-0">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-ink rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-16 text-center overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-8 left-12 text-6xl">✦</div>
            <div className="absolute bottom-8 right-12 text-4xl">✦</div>
            <div className="absolute top-1/2 left-1/4 text-3xl">✦</div>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-surface italic relative z-10">
            Ready to order?
          </h2>
          <p className="mt-3 sm:mt-4 text-surface/70 font-sans text-sm sm:text-base max-w-sm mx-auto relative z-10 px-2">
            Build your dream cake with our live customiser — choose your size, flavour, frosting, and add-ons.
          </p>
          <div className="mt-6 sm:mt-8 relative z-10">
            <Link href="/customise">
              <Button variant="gold" size="lg" className="w-full sm:w-auto">
                Start Customising
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
