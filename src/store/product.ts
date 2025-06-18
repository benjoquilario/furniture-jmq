import { create } from "zustand"

import { type FurnitureImage } from "@/generated/prisma"

interface ProductState {
  deletedKeys: string[]
  setDeletedKeys: (key: string) => void
  clearDeletedKeys: () => void
}

const useProductStore = create<ProductState>((set) => ({
  deletedKeys: [],
  setDeletedKeys: (key) =>
    set((state) => ({ deletedKeys: [key, ...state.deletedKeys] })),
  clearDeletedKeys: () => set({ deletedKeys: [] }),
}))

export { useProductStore }
