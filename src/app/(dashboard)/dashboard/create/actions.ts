"use server"

import { validatedActionWithUser } from "@/lib/auth/middleware"
import * as z from "zod"
import db from "@/lib/db"
import { getUser } from "@/lib/queries"
import { revalidatePath } from "next/cache"

const createFurnitureSchema = z.object({
  name: z.string().min(3).max(255),
  color: z.string().min(3).max(255).optional(),
  shape: z.string().min(3).max(255).optional(),
  description: z.string().min(3).max(255).optional(),
  measurements: z.string().min(3).max(255).optional(),
  size: z.string().min(3).max(255).optional(),
  seater: z.string(),
  pullOut: z.string(),
})

export const createFurniture = validatedActionWithUser(
  createFurnitureSchema,
  async (data, formData, user) => {
    const {
      name,
      color,
      shape,
      description,
      measurements,
      pullOut,
      size,
      seater,
    } = data

    const fileUrls = formData.getAll("fileUrls") as string[]
    const withStorage = formData.get("withStorage") as string
    const price = formData.get("price")

    const isWithStorage = withStorage === "true" ? true : false

    await db.furniture.create({
      data: {
        pullOut: Number(pullOut),
        name: name,
        color: color,
        Shape: shape,
        size: size,
        seater: Number(seater),
        price: Number(price),
        description: description,
        measurements: "85x85",
        withStorage: isWithStorage,
        image: fileUrls,
        sellerId: user.id,
      },
    })

    revalidatePath("/dashboard/create")
  }
)
