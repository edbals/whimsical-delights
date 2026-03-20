'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useCustomiserStore, FLAVOUR_COLORS } from '@/store/useCustomiserStore'

// Tier layout spec
const TIER_DEFS = [
  { id: 't1', width: 200, height: 70, x: 50, y: 270 },
  { id: 't2', width: 155, height: 65, x: 73, y: 210 },
  { id: 't3', width: 110, height: 60, x: 95, y: 155 },
]

const SIZE_SCALE: Record<string, number> = {
  '6"': 0.85,
  '8"': 1.0,
  '10"': 1.12,
  '6"+8"': 1.0,
}

// Funfetti dots positions
const FUNFETTI_DOTS = [
  { cx: 80, cy: 290, fill: '#F4A7B0' }, { cx: 110, cy: 310, fill: '#A8C5A0' },
  { cx: 140, cy: 285, fill: '#C9A84C' }, { cx: 170, cy: 305, fill: '#D4A5A5' },
  { cx: 200, cy: 290, fill: '#A8C5A0' }, { cx: 230, cy: 308, fill: '#F4A7B0' },
  { cx: 95, cy: 325, fill: '#C9A84C' }, { cx: 155, cy: 318, fill: '#D4A5A5' },
  { cx: 210, cy: 320, fill: '#A8C5A0' }, { cx: 130, cy: 295, fill: '#F4A7B0' },
  { cx: 90, cy: 225, fill: '#C9A84C' }, { cx: 120, cy: 240, fill: '#F4A7B0' },
  { cx: 150, cy: 218, fill: '#A8C5A0' }, { cx: 180, cy: 235, fill: '#D4A5A5' },
  { cx: 210, cy: 222, fill: '#C9A84C' }, { cx: 105, cy: 173, fill: '#F4A7B0' },
  { cx: 135, cy: 188, fill: '#A8C5A0' }, { cx: 165, cy: 168, fill: '#D4A5A5' },
  { cx: 185, cy: 182, fill: '#C9A84C' },
]

// Black Forest cherry clusters
const CHERRY_DOTS = [
  { cx: 100, cy: 295, r: 5, fill: '#6B0F1A' }, { cx: 120, cy: 288, r: 4, fill: '#8B1A1A' },
  { cx: 145, cy: 300, r: 5, fill: '#6B0F1A' }, { cx: 175, cy: 292, r: 4, fill: '#8B1A1A' },
  { cx: 200, cy: 299, r: 5, fill: '#6B0F1A' }, { cx: 90, cy: 228, r: 4, fill: '#8B1A1A' },
  { cx: 115, cy: 222, r: 5, fill: '#6B0F1A' }, { cx: 155, cy: 232, r: 4, fill: '#8B1A1A' },
]

function FreshFlowers({ topTierY }: { topTierY: number }) {
  const flowers = [
    { cx: 108, cy: topTierY + 6 },
    { cx: 148, cy: topTierY + 2 },
    { cx: 188, cy: topTierY + 6 },
  ]
  return (
    <>
      {flowers.map((pos, fi) => (
        <g key={fi} transform={`translate(${pos.cx}, ${pos.cy})`}>
          <circle r="4" fill="#D4A5A5" />
          {[0, 60, 120, 180, 240, 300].map((angle, pi) => (
            <ellipse
              key={pi}
              cx={Math.cos((angle * Math.PI) / 180) * 7}
              cy={Math.sin((angle * Math.PI) / 180) * 7}
              rx="3.5"
              ry="2"
              transform={`rotate(${angle}, ${Math.cos((angle * Math.PI) / 180) * 7}, ${Math.sin((angle * Math.PI) / 180) * 7})`}
              fill={fi % 2 === 0 ? '#E8B4B8' : '#F4A7B0'}
              opacity="0.9"
            />
          ))}
        </g>
      ))}
    </>
  )
}

function CakeTopper({ topTierY }: { topTierY: number }) {
  return (
    <g>
      <line x1="150" y1={topTierY} x2="150" y2={topTierY - 32} stroke="#C9A84C" strokeWidth="2" />
      <polygon
        points="150,0 153,9 163,9 155,15 158,24 150,18 142,24 145,15 137,9 147,9"
        transform={`translate(0, ${topTierY - 56})`}
        fill="#C9A84C"
      />
    </g>
  )
}

function GoldLeaf({ tiers }: { tiers: number }) {
  const leaves = [
    { points: '68,280 76,274 80,282 72,288', opacity: 0.8 },
    { points: '220,292 230,286 234,294 224,300', opacity: 0.7 },
    { points: '85,225 93,219 96,228 87,234', opacity: 0.9 },
    { points: '205,218 213,214 216,222 208,226', opacity: 0.75 },
  ]
  const visibleLeaves = tiers === 1 ? leaves.slice(0, 2) : tiers === 2 ? leaves.slice(0, 4) : leaves
  return (
    <>
      {visibleLeaves.map((leaf, i) => (
        <polygon key={i} points={leaf.points} fill="#C9A84C" opacity={leaf.opacity} />
      ))}
    </>
  )
}

function Macarons({ topTierY }: { topTierY: number }) {
  const positions = [
    { x: 98, color: '#F4A7B0' },
    { x: 140, color: '#A8C5A0' },
    { x: 182, color: '#D4A5A5' },
  ]
  return (
    <>
      {positions.map((pos, i) => (
        <g key={i} transform={`translate(${pos.x}, ${topTierY + 2})`}>
          <ellipse cx="0" cy="-12" rx="9" ry="5" fill={pos.color} />
          <rect x="-8" y="-10" width="16" height="4" fill={pos.color} opacity="0.7" />
          <ellipse cx="0" cy="-6" rx="9" ry="5" fill={pos.color} opacity="0.9" />
          <ellipse cx="0" cy="-8" rx="8" ry="1.5" fill="white" opacity="0.4" />
        </g>
      ))}
    </>
  )
}

function MessagePlaque({ tier1Y }: { tier1Y: number }) {
  return (
    <g>
      <rect x="105" y={tier1Y + 22} width="90" height="22" rx="4" fill="white" stroke="#D4A5A5" strokeWidth="1.5" />
      <text
        x="150"
        y={tier1Y + 37}
        textAnchor="middle"
        fontSize="8"
        fontFamily="Urbanist, sans-serif"
        fill="#D4A5A5"
      >
        Happy Day ✦
      </text>
    </g>
  )
}

function FrostingDrips({
  tier,
  frostingColor,
}: {
  tier: { width: number; x: number; y: number }
  frostingColor: string
}) {
  if (!frostingColor || frostingColor === 'transparent') return null
  const dripCount = Math.floor(tier.width / 22)
  return (
    <>
      {Array.from({ length: dripCount }).map((_, i) => {
        const xPos = tier.x + 12 + i * 22 + (i % 2 === 0 ? 0 : 3)
        const dripHeight = 6 + (i % 3) * 4
        return (
          <g key={i}>
            <ellipse
              cx={xPos}
              cy={tier.y - 1}
              rx="5"
              ry="3"
              fill={frostingColor}
              opacity="0.9"
            />
            <rect
              x={xPos - 3}
              y={tier.y - 1}
              width="6"
              height={dripHeight}
              rx="3"
              fill={frostingColor}
              opacity="0.7"
            />
          </g>
        )
      })}
    </>
  )
}

function CakeTier({
  tier,
  index,
  flavourColor,
  frostingColor,
  isFunfetti,
  isBlackForest,
}: {
  tier: { id: string; width: number; height: number; x: number; y: number }
  index: number
  flavourColor: string
  frostingColor: string
  isFunfetti: boolean
  isBlackForest: boolean
}) {
  const frostingHeight = 12

  return (
    <motion.g
      key={tier.id}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -40, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22, delay: index * 0.05 }}
    >
      {/* Cake body */}
      <rect
        x={tier.x}
        y={tier.y}
        width={tier.width}
        height={tier.height}
        rx="8"
        style={{
          fill: flavourColor || '#F5E6C8',
          transition: 'fill 0.4s ease',
        }}
      />

      {/* Frosting layer on top */}
      {frostingColor !== 'transparent' && (
        <rect
          x={tier.x}
          y={tier.y}
          width={tier.width}
          height={frostingHeight}
          rx="8"
          style={{
            fill: frostingColor,
            transition: 'fill 0.4s ease',
          }}
          opacity="0.95"
        />
      )}

      {/* Drips */}
      <FrostingDrips tier={tier} frostingColor={frostingColor} />

      {/* Funfetti dots */}
      {isFunfetti &&
        FUNFETTI_DOTS.filter(
          (d) => d.cy >= tier.y && d.cy <= tier.y + tier.height
        ).map((dot, i) => (
          <circle key={i} cx={dot.cx} cy={dot.cy} r="3" fill={dot.fill} opacity="0.85" />
        ))}

      {/* Black Forest cherries */}
      {isBlackForest &&
        CHERRY_DOTS.filter(
          (d) => d.cy >= tier.y && d.cy <= tier.y + tier.height
        ).map((dot, i) => (
          <circle key={i} cx={dot.cx} cy={dot.cy} r={dot.r} fill={dot.fill} opacity="0.9" />
        ))}
    </motion.g>
  )
}

export default function CakePreview() {
  const { tiers, flavour, frosting, frostingColor, size, addOns, totalPrice } =
    useCustomiserStore()

  const flavourColor = FLAVOUR_COLORS[flavour] || '#F5E6C8'
  const effectiveFrostingColor = frostingColor === 'transparent' ? 'transparent' : frostingColor
  const isFunfetti = flavour === 'Funfetti'
  const isBlackForest = flavour === 'Black Forest'
  const scale = SIZE_SCALE[size] || 1.0

  const visibleTiers = TIER_DEFS.slice(0, tiers)
  const topTierDef = TIER_DEFS[tiers - 1]

  // Pill tags for bottom of preview
  const sizeLabel = size === '6"+8"' ? '6"+8" combo' : size
  const pills = [
    flavour || 'No flavour',
    sizeLabel,
  ]

  return (
    <div className="bg-surface rounded-2xl border border-ink/8 shadow-md overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-muted font-sans tracking-widest uppercase">
          Live Preview
        </span>
        <span className="text-xs text-muted font-sans">{size} cake</span>
      </div>

      {/* SVG Canvas */}
      <div className="flex justify-center px-4 py-2">
        <svg
          viewBox="0 0 300 400"
          style={{ width: '100%', maxWidth: '280px' }}
          aria-label="Live cake preview"
        >
          {/* Background subtle gradient */}
          <defs>
            <radialGradient id="bgGrad" cx="50%" cy="80%" r="60%">
              <stop offset="0%" stopColor="#F5EDE0" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FDFAF7" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width="300" height="400" fill="url(#bgGrad)" />

          {/* Empty state */}
          {!flavour && tiers === 1 && addOns.length === 0 && (
            <>
              <ellipse
                cx="150"
                cy="332"
                rx="110"
                ry="16"
                fill="none"
                stroke="#D4A5A5"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
              <text
                x="150"
                y="290"
                textAnchor="middle"
                fontSize="12"
                fontFamily="Urbanist, sans-serif"
                fill="#7A6E65"
              >
                Start building your cake ↑
              </text>
            </>
          )}

          {/* Cake group with size scale */}
          <motion.g
            animate={{ scale }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            style={{ transformOrigin: '150px 340px' }}
          >
            {/* Cake plate */}
            <ellipse cx="150" cy="340" rx="110" ry="16" fill="#E8DDD0" />

            {/* Tier layers (bottom to top) */}
            <AnimatePresence>
              {visibleTiers.map((tier, i) => (
                <CakeTier
                  key={tier.id}
                  tier={tier}
                  index={i}
                  flavourColor={flavourColor}
                  frostingColor={effectiveFrostingColor}
                  isFunfetti={isFunfetti}
                  isBlackForest={isBlackForest}
                />
              ))}
            </AnimatePresence>

            {/* Add-on overlays */}
            <AnimatePresence>
              {addOns.includes('Gold Leaf') && (
                <motion.g
                  key="goldleaf"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ transformOrigin: '150px 260px' }}
                >
                  <GoldLeaf tiers={tiers} />
                </motion.g>
              )}

              {addOns.includes('Fresh Flowers') && (
                <motion.g
                  key="flowers"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ transformOrigin: '150px 170px' }}
                >
                  <FreshFlowers topTierY={topTierDef.y} />
                </motion.g>
              )}

              {addOns.includes('Macarons on Top') && (
                <motion.g
                  key="macarons"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ transformOrigin: '150px 170px' }}
                >
                  <Macarons topTierY={topTierDef.y} />
                </motion.g>
              )}

              {addOns.includes('Custom Cake Topper') && (
                <motion.g
                  key="topper"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ transformOrigin: '150px 130px' }}
                >
                  <CakeTopper topTierY={topTierDef.y} />
                </motion.g>
              )}

              {addOns.includes('Message Plaque') && (
                <motion.g
                  key="plaque"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ transformOrigin: '150px 290px' }}
                >
                  <MessagePlaque tier1Y={TIER_DEFS[0].y} />
                </motion.g>
              )}
            </AnimatePresence>
          </motion.g>
        </svg>
      </div>

      {/* Selection pills */}
      <div className="px-5 py-3 flex flex-wrap gap-1.5 justify-center">
        {pills.map((pill, i) => (
          <span
            key={i}
            className="px-2.5 py-0.5 rounded-full bg-cream text-xs text-muted font-sans border border-ink/8"
          >
            {pill}
          </span>
        ))}
      </div>

      {/* Price */}
      <div className="px-5 pb-5 pt-2 border-t border-ink/8 text-center">
        <motion.p
          key={totalPrice}
          initial={{ scale: 1.08, color: '#D4A5A5' }}
          animate={{ scale: 1, color: '#1C1C1C' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="font-serif text-3xl text-ink"
        >
          ${totalPrice.toFixed(2)}
        </motion.p>
        <p className="text-xs text-muted font-sans">incl. 12% tax</p>
      </div>
    </div>
  )
}
