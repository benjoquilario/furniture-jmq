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
