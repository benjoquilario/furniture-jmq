import { create } from "zustand"

import { type FurnitureImage } from "@/generated/prisma"

interface ProductState {
  deletedKeys: string[]
  setDeletedKeys: (key: string) => void
  clearDeletedKeys: () => void
  deletedFiles: string[]
  setDeletedFiles: (id: string) => void
  clearDeletedFiles: () => void
}

const useProductStore = create<ProductState>((set) => ({
  deletedKeys: [],
  setDeletedKeys: (key) =>
    set((state) => ({ deletedKeys: [key, ...state.deletedKeys] })),
  clearDeletedKeys: () => set({ deletedKeys: [] }),
  deletedFiles: [],
  setDeletedFiles: (id) =>
    set((state) => ({ deletedFiles: [id, ...state.deletedFiles] })),
  clearDeletedFiles: () => set({ deletedFiles: [] }),
}))

export { useProductStore }
