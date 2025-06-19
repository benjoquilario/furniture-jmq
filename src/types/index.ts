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

export interface VideoData {
  id: string
  title: string
  description: string
  videoUrl: string
  thumbnailUrl: string
  author: {
    name: string
    avatar: string
    username: string
  }
  stats: {
    likes: number
    comments: number
    shares: number
  }
  tags: string[]
}
