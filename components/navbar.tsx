'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/customise', label: 'Customise' },
  { href: '/profile', label: 'Profile' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-sm border-b border-ink/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex-shrink-0" onClick={() => setMobileOpen(false)}>
              <img
                src="/logo.png"
                alt="Whimsical Delights"
                className="h-14 sm:h-16 w-auto mix-blend-multiply"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-colors font-sans',
                    pathname === link.href
                      ? 'bg-cream text-ink'
                      : 'text-muted hover:text-ink hover:bg-cream/60'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Hamburger — 44x44 minimum touch target */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center w-11 h-11 -mr-2 rounded-full hover:bg-cream active:bg-cream transition-colors text-ink"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu — full-screen overlay for better UX */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-50"
          >
            <div className="absolute inset-0 bg-ink/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative bg-surface border-b border-ink/8 shadow-lg"
            >
              {/* Repeat the header row so user can close */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                  <Link href="/" className="flex-shrink-0" onClick={() => setMobileOpen(false)}>
                    <img
                      src="/logo.png"
                      alt="Whimsical Delights"
                      className="h-14 w-auto mix-blend-multiply"
                    />
                  </Link>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center w-11 h-11 -mr-2 rounded-full hover:bg-cream active:bg-cream transition-colors text-ink"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="px-4 pb-6 pt-2 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-colors font-sans',
                      pathname === link.href
                        ? 'bg-cream text-ink'
                        : 'text-muted hover:text-ink active:bg-cream/60'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
