import { create } from "zustand"

interface SofaState {
  color: string
  material: string
  hasArms: boolean
  isReclined: boolean
  isBed: boolean
  setColor: (color: string) => void
  setMaterial: (material: string) => void
  toggleArms: () => void
  toggleRecline: () => void
  toggleBedMode: () => void
}

export const useSofaStore = create<SofaState>((set) => ({
  color: "#374151", // Default dark gray color like in the image
  material: "fabric",
  hasArms: true,
  isReclined: false,
  isBed: false,
  setColor: (color) => set({ color }),
  setMaterial: (material) => set({ material }),
  toggleArms: () => set((state) => ({ hasArms: !state.hasArms })),
  toggleRecline: () => set((state) => ({ isReclined: !state.isReclined })),
  toggleBedMode: () => set((state) => ({ isBed: !state.isBed })),
}))
