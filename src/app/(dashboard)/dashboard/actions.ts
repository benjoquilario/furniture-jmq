"use server"

import db from "@/lib/db"
import { revalidatePath } from "next/cache"

export const deleteFurniture = async (id: string, _formData: FormData) => {
  await db.furniture.delete({
    where: {
      id,
    },
  })

  revalidatePath("/dashboard")
}
