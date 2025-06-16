import type {
  Furniture as IFurnitureItem,
  FurnitureImage,
  User,
} from "@/generated/prisma"

// Extract types

interface Seller {
  id: string
  name: string
  email: string
}

export interface FurnitureItem extends IFurnitureItem {
  images: FurnitureImage[]
  seller: User
}
