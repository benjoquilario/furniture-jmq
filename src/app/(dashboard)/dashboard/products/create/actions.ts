"use server"

import db from "@/lib/db"
import { revalidatePath } from "next/cache"
import { type Furniture } from "@/lib/validations/furnitures"
import { getUser } from "@/lib/queries"
import { ISelectedFile } from "@/types"

export const createFurniture = async (data: Furniture) => {
  const {
    name,
    color,
    shape,
    measurements,
    pullOut,
    size,
    seater,
    price,
    withStorage,
    selectedFile,
    description,
  } = data

  const user = await getUser()

  if (!user) throw new Error("User not found")

  const transformedSelectedFile = (selectedFile as ISelectedFile[])?.map(
    (file: ISelectedFile) => ({
      url: file.url,
      key: file.key,
    })
  )

  // const isWithStorage = withStorage === "true" ? true : false

  await db.furniture.create({
    data: {
      pullOut: Number(pullOut),
      name: name,
      color: color,
      shape: shape,
      size: size,
      seater: Number(seater),
      price: Number(price),
      description: description,
      measurements: "85x85",
      withStorage: withStorage,
      sellerId: user?.id!,
      selectedFile: {
        create: transformedSelectedFile,
      },
    },
  })

  revalidatePath("/dashboard/create")
}
