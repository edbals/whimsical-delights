import type { Metadata } from 'next'
import { Cormorant_Garamond, Urbanist } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-urbanist',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Whimsical Delights — Custom Cake Ordering',
  description: 'Handcrafted custom cakes made to order. Build your dream cake with our step-by-step customiser.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${urbanist.variable}`}>
      <body className="bg-surface font-sans antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
