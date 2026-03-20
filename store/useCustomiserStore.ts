'use client'

import { create } from 'zustand'

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

export function computeSubtotal(
  size: CakeSize,
  _tiers: TierCount,
  addOns: string[]
): number {
  const base = SIZE_BASE_PRICES[size]
  const addonTotal = addOns.reduce((sum, a) => sum + (ADDON_PRICES[a] ?? 0), 0)
  return base + addonTotal
}

function computeTotal(
  size: CakeSize,
  tiers: TierCount,
  addOns: string[]
): number {
  const subtotal = computeSubtotal(size, tiers, addOns)
  return Math.round(subtotal * (1 + TAX_RATE) * 100) / 100
}

interface CustomiserState {
  tiers: TierCount
  flavour: string
  frosting: string
  frostingColor: string
  sugarLevel: number
  size: CakeSize
  addOns: string[]
  notes: string
  date: Date | null
  subtotalPrice: number
  taxAmount: number
  totalPrice: number

  setFlavour: (flavour: string) => void
  setFrosting: (frosting: string) => void
  setSugarLevel: (level: number) => void
  setSize: (size: CakeSize) => void
  toggleAddOn: (addOn: string) => void
  setNotes: (notes: string) => void
  setDate: (date: Date | null) => void
  reset: () => void
}

const DEFAULT_SIZE: CakeSize = '8"'
const DEFAULT_SUBTOTAL = SIZE_BASE_PRICES[DEFAULT_SIZE]
const DEFAULT_TAX = Math.round(DEFAULT_SUBTOTAL * TAX_RATE * 100) / 100
const DEFAULT_TOTAL = Math.round(DEFAULT_SUBTOTAL * (1 + TAX_RATE) * 100) / 100

const defaultState = {
  tiers: 1 as TierCount,
  flavour: '',
  frosting: 'Swiss Meringue Buttercream',
  frostingColor: FROSTING_COLORS['Swiss Meringue Buttercream'],
  sugarLevel: 2,
  size: DEFAULT_SIZE,
  addOns: [] as string[],
  notes: '',
  date: null,
  subtotalPrice: DEFAULT_SUBTOTAL,
  taxAmount: DEFAULT_TAX,
  totalPrice: DEFAULT_TOTAL,
}

export const useCustomiserStore = create<CustomiserState>((set, get) => ({
  ...defaultState,

  setFlavour: (flavour) => set({ flavour }),

  setFrosting: (frosting) =>
    set({
      frosting,
      frostingColor: FROSTING_COLORS[frosting] ?? '#F8EFE0',
    }),

  setSugarLevel: (sugarLevel) => set({ sugarLevel }),

  setSize: (size) => {
    const { addOns } = get()
    const tiers = size === '6"+8"' ? 2 : 1
    const subtotalPrice = computeSubtotal(size, tiers, addOns)
    const taxAmount = Math.round(subtotalPrice * TAX_RATE * 100) / 100
    const totalPrice = computeTotal(size, tiers, addOns)
    set({ size, tiers, subtotalPrice, taxAmount, totalPrice })
  },

  toggleAddOn: (addOn) => {
    const { addOns, size, tiers } = get()
    const next = addOns.includes(addOn)
      ? addOns.filter((a) => a !== addOn)
      : [...addOns, addOn]
    const subtotalPrice = computeSubtotal(size, tiers, next)
    const taxAmount = Math.round(subtotalPrice * TAX_RATE * 100) / 100
    const totalPrice = computeTotal(size, tiers, next)
    set({ addOns: next, subtotalPrice, taxAmount, totalPrice })
  },

  setNotes: (notes) => set({ notes }),

  setDate: (date) => set({ date }),

  reset: () => set({ ...defaultState }),
}))
