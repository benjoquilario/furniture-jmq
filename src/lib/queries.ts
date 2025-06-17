"server-only"
import db from "./db"

export const getFurnitureById = async (id: string) => {
  return await db.furniture.findUnique({
    where: {
      id,
    },
    include: {
      images: true,
      seller: true,
    },
  })
}

export const getFurnitures = async () => {
  return await db.furniture.findMany({
    include: {
      images: true,
      seller: true,
    },
    take: 10, // Limit to 10 items
    orderBy: {
      createdAt: "desc",
    },
  })
}

export const deleteFurnitureById = async (id: string) => {
  return await db.furniture.delete({
    where: {
      id,
    },
  })
}
