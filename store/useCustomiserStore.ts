'use client'

import { create } from 'zustand'
import { differenceInHours } from 'date-fns'

export type TierCount = 1 | 2
export type CakeSize = '6"' | '8"' | '10"' | '6"+8"'

export const FLAVOUR_COLORS: Record<string, string> = {
  'Angel Food Cake': '#FFFDF7',
  'Baked Flourless Cake': '#5C3317',
  'Biscuit Cake': '#F5E6C8',
  'Butter Cake': '#F5E6C8',
  'Carrot Cake': '#C97A3A',
  'Chiffon Cake': '#F9F0A0',
  'Genoise Cake': '#F5E6C8',
  'Pound Cake': '#F5E6C8',
  'Red Velvet Cake': '#8B1A1A',
  'Sponge Cake': '#F5E6C8',
}

export const FROSTING_COLORS: Record<string, string> = {
  'Swiss Meringue Buttercream': '#F8EFE0',
  'Whipped Cream': '#FFFDF7',
  'Cream Cheese': '#FDE8D0',
  'Fondant': '#EAD7F0',
  'Naked Style': 'transparent',
}

const ADDON_PRICES: Record<string, number> = {
  'Fresh Flowers': 15,
  'Custom Cake Topper': 12,
  'Gold Leaf': 15,
  'Macarons on Top': 14,
  'Message Plaque': 8,
}

const SIZE_BASE_PRICES: Record<CakeSize, number> = {
  '6"': 180,
  '8"': 240,
  '10"': 270,
  '6"+8"': 449,
}

export const TAX_RATE = 0.12
export const RUSH_SURCHARGE_RATE = 0.25
export const RUSH_HOURS_THRESHOLD = 72
export const DEPOSIT_RATE = 0.30
export const DEPOSIT_THRESHOLD = 150

export function computeSubtotal(
  size: CakeSize,
  _tiers: TierCount,
  addOns: string[]
): number {
  const base = SIZE_BASE_PRICES[size]
  const addonTotal = addOns.reduce((sum, a) => sum + (ADDON_PRICES[a] ?? 0), 0)
  return base + addonTotal
}

function isRush(date: Date | null): boolean {
  if (!date) return false
  return differenceInHours(date, new Date()) <= RUSH_HOURS_THRESHOLD
}

function computePrices(
  size: CakeSize,
  tiers: TierCount,
  addOns: string[],
  date: Date | null
) {
  const subtotalPrice = computeSubtotal(size, tiers, addOns)
  const rushOrder = isRush(date)
  const rushFee = rushOrder ? Math.round(subtotalPrice * RUSH_SURCHARGE_RATE * 100) / 100 : 0
  const priceBeforeTax = subtotalPrice + rushFee
  const taxAmount = Math.round(priceBeforeTax * TAX_RATE * 100) / 100
  const totalPrice = Math.round(priceBeforeTax * (1 + TAX_RATE) * 100) / 100
  const depositAmount = totalPrice > DEPOSIT_THRESHOLD
    ? Math.round(totalPrice * DEPOSIT_RATE * 100) / 100
    : 0
  const balanceDue = depositAmount > 0
    ? Math.round((totalPrice - depositAmount) * 100) / 100
    : 0

  return { subtotalPrice, rushFee, isRushOrder: rushOrder, taxAmount, totalPrice, depositAmount, balanceDue }
}

interface CustomiserState {
  tiers: TierCount
  flavour: string
  filling: string
  frosting: string
  frostingColor: string
  sugarLevel: number
  size: CakeSize
  addOns: string[]
  notes: string
  date: Date | null
  subtotalPrice: number
  isRushOrder: boolean
  rushFee: number
  taxAmount: number
  totalPrice: number
  depositAmount: number
  balanceDue: number

  setFlavour: (flavour: string) => void
  setFilling: (filling: string) => void
  setFrosting: (frosting: string) => void
  setSugarLevel: (level: number) => void
  setSize: (size: CakeSize) => void
  toggleAddOn: (addOn: string) => void
  setNotes: (notes: string) => void
  setDate: (date: Date | null) => void
  reset: () => void
}

const DEFAULT_SIZE: CakeSize = '8"'

const defaultPrices = computePrices(DEFAULT_SIZE, 1, [], null)

const defaultState = {
  tiers: 1 as TierCount,
  flavour: '',
  filling: '',
  frosting: 'Swiss Meringue Buttercream',
  frostingColor: FROSTING_COLORS['Swiss Meringue Buttercream'],
  sugarLevel: 2,
  size: DEFAULT_SIZE,
  addOns: [] as string[],
  notes: '',
  date: null as Date | null,
  ...defaultPrices,
}

export const useCustomiserStore = create<CustomiserState>((set, get) => ({
  ...defaultState,

  setFlavour: (flavour) => set({ flavour }),

  setFilling: (filling) => set({ filling }),

  setFrosting: (frosting) =>
    set({
      frosting,
      frostingColor: FROSTING_COLORS[frosting] ?? '#F8EFE0',
    }),

  setSugarLevel: (sugarLevel) => set({ sugarLevel }),

  setSize: (size) => {
    const { addOns, date } = get()
    const tiers = size === '6"+8"' ? 2 : 1
    const prices = computePrices(size, tiers, addOns, date)
    set({ size, tiers, ...prices })
  },

  toggleAddOn: (addOn) => {
    const { addOns, size, tiers, date } = get()
    const next = addOns.includes(addOn)
      ? addOns.filter((a) => a !== addOn)
      : [...addOns, addOn]
    const prices = computePrices(size, tiers, next, date)
    set({ addOns: next, ...prices })
  },

  setNotes: (notes) => set({ notes }),

  setDate: (date) => {
    const { size, tiers, addOns } = get()
    const prices = computePrices(size, tiers, addOns, date)
    set({ date, ...prices })
  },

  reset: () => set({ ...defaultState }),
}))
