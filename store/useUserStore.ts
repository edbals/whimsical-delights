'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserStore {
  name: string
  setName: (name: string) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      name: 'Conor',
      setName: (name) => set({ name }),
    }),
    {
      name: 'whimsical-user',
      storage:
        typeof window !== 'undefined'
          ? createJSONStorage(() => localStorage)
          : undefined,
    }
  )
)
