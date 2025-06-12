"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import db from "@/lib/db"
import {
  CreateFurnitureSchema,
  validateCreateFurniture,
  type CreateFurniture,
} from "./utils/validations/furnitures"

// Type for the processed furniture data
type ProcessedFurnitureData = Omit<CreateFurniture, "images"> & {
  images: Array<{ url: string; key: string }>
}

/**
 * Server action to create a new furniture item
 * @param data - The furniture data including uploaded images
 * @returns Success response or throws error
 */
export async function createFurniture(data: ProcessedFurnitureData) {
  try {
    // 1. Authentication check
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error("You must be logged in to create furniture")
    }

    // 2. Validate the input data
    const validation = validateCreateFurniture({
      ...data,
      images: data.images.map(() => new File([], "temp")), // Mock files for validation
    })

    if (!validation.success) {
      console.error("Validation errors:", validation.error.errors)
      throw new Error(
        `Validation failed: ${validation.error.errors
          .map((err) => `${err.path.join(".")}: ${err.message}`)
          .join(", ")}`
      )
    }

    // 3. Prepare furniture data for database
    const furnitureData = {
      name: data.name,
      description: data.description || null,
      category: data.category,
      brand: data.brand,
      model: data.model || null,
      color: data.color || null,
      material: data.material || null,
      dimensions: data.dimensions || null,
      condition: data.condition,
      isAvailable: data.isAvailable,
      stockCount: data.stockCount,
      price: data.price,
      sellerId: session.user.id,
    }

    // 4. Create furniture with images in a transaction
    const result = await db.$transaction(async (tx) => {
      // Create the furniture record
      const furniture = await tx.furniture.create({
        data: furnitureData,
      })

      // Create associated images if any
      if (data.images && data.images.length > 0) {
        const imageRecords = data.images.map((image) => ({
          url: image.url,
          key: image.key,
          furnitureId: furniture.id,
        }))

        await tx.furnitureImage.createMany({
          data: imageRecords,
        })
      }

      // Return the furniture with images
      return await tx.furniture.findUnique({
        where: { id: furniture.id },
        include: {
          images: true,
          seller: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      })
    })

    // 5. Revalidate relevant pages
    revalidatePath("/dashboard/products")
    revalidatePath("/products")
    revalidatePath("/")

    console.log("Furniture created successfully:", result?.id)

    return {
      success: true,
      message: "Furniture created successfully!",
      data: result,
    }
  } catch (error) {
    console.error("Error creating furniture:", error)

    // Handle specific error types
    if (error instanceof Error) {
      throw new Error(error.message)
    }

    throw new Error("An unexpected error occurred while creating furniture")
  }
}

/**
 * Server action to update an existing furniture item
 * @param id - Furniture ID
 * @param data - Updated furniture data
 * @returns Success response or throws error
 */
export async function updateFurniture(
  id: string,
  data: Partial<ProcessedFurnitureData>
) {
  try {
    // 1. Authentication check
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error("You must be logged in to update furniture")
    }

    // 2. Check if furniture exists and user owns it
    const existingFurniture = await db.furniture.findUnique({
      where: { id },
      select: { sellerId: true },
    })

    if (!existingFurniture) {
      throw new Error("Furniture not found")
    }

    if (existingFurniture.sellerId !== session.user.id) {
      throw new Error("You can only update your own furniture")
    }

    // 3. Prepare update data
    const updateData: any = {}

    if (data.name !== undefined) updateData.name = data.name
    if (data.description !== undefined)
      updateData.description = data.description || null
    if (data.category !== undefined) updateData.category = data.category
    if (data.brand !== undefined) updateData.brand = data.brand
    if (data.model !== undefined) updateData.model = data.model || null
    if (data.color !== undefined) updateData.color = data.color || null
    if (data.material !== undefined) updateData.material = data.material || null
    if (data.dimensions !== undefined)
      updateData.dimensions = data.dimensions || null
    if (data.condition !== undefined) updateData.condition = data.condition
    if (data.isAvailable !== undefined)
      updateData.isAvailable = data.isAvailable
    if (data.stockCount !== undefined) updateData.stockCount = data.stockCount
    if (data.price !== undefined) updateData.price = data.price

    // 4. Update furniture in transaction
    const result = await db.$transaction(async (tx) => {
      // Update furniture data
      const furniture = await tx.furniture.update({
        where: { id },
        data: updateData,
      })

      // Handle image updates if provided
      if (data.images) {
        // Delete existing images
        await tx.furnitureImage.deleteMany({
          where: { furnitureId: id },
        })

        // Create new images
        if (data.images.length > 0) {
          const imageRecords = data.images.map((image) => ({
            url: image.url,
            key: image.key,
            furnitureId: id,
          }))

          await tx.furnitureImage.createMany({
            data: imageRecords,
          })
        }
      }

      // Return updated furniture with images
      return await tx.furniture.findUnique({
        where: { id },
        include: {
          images: true,
          seller: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      })
    })

    // 5. Revalidate relevant pages
    revalidatePath("/dashboard/products")
    revalidatePath("/products")
    revalidatePath(`/products/${id}`)

    return {
      success: true,
      message: "Furniture updated successfully!",
      data: result,
    }
  } catch (error) {
    console.error("Error updating furniture:", error)

    if (error instanceof Error) {
      throw new Error(error.message)
    }

    throw new Error("An unexpected error occurred while updating furniture")
  }
}

/**
 * Server action to delete a furniture item
 * @param id - Furniture ID to delete
 * @returns Success response or throws error
 */
export async function deleteFurniture(id: string) {
  try {
    // 1. Authentication check
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error("You must be logged in to delete furniture")
    }

    // 2. Check if furniture exists and user owns it
    const existingFurniture = await db.furniture.findUnique({
      where: { id },
      select: { sellerId: true, name: true },
    })

    if (!existingFurniture) {
      throw new Error("Furniture not found")
    }

    if (existingFurniture.sellerId !== session.user.id) {
      throw new Error("You can only delete your own furniture")
    }

    // 3. Delete furniture (images will be deleted due to cascade)
    await db.furniture.delete({
      where: { id },
    })

    // 4. Revalidate relevant pages
    revalidatePath("/dashboard/products")
    revalidatePath("/products")

    return {
      success: true,
      message: `Furniture "${existingFurniture.name}" deleted successfully!`,
    }
  } catch (error) {
    console.error("Error deleting furniture:", error)

    if (error instanceof Error) {
      throw new Error(error.message)
    }

    throw new Error("An unexpected error occurred while deleting furniture")
  }
}

/**
 * Server action to toggle furniture availability
 * @param id - Furniture ID
 * @param isAvailable - New availability status
 * @returns Success response or throws error
 */
export async function toggleFurnitureAvailability(
  id: string,
  isAvailable: boolean
) {
  try {
    // 1. Authentication check
    const session = await auth()
    if (!session?.user?.id) {
      throw new Error("You must be logged in to update furniture")
    }

    // 2. Check ownership
    const existingFurniture = await db.furniture.findUnique({
      where: { id },
      select: { sellerId: true, name: true },
    })

    if (!existingFurniture) {
      throw new Error("Furniture not found")
    }

    if (existingFurniture.sellerId !== session.user.id) {
      throw new Error("You can only update your own furniture")
    }

    // 3. Update availability
    const result = await db.furniture.update({
      where: { id },
      data: { isAvailable },
      select: {
        id: true,
        name: true,
        isAvailable: true,
      },
    })

    // 4. Revalidate pages
    revalidatePath("/dashboard/products")
    revalidatePath("/products")

    return {
      success: true,
      message: `Furniture "${result.name}" ${
        isAvailable ? "marked as available" : "marked as unavailable"
      }`,
      data: result,
    }
  } catch (error) {
    console.error("Error toggling furniture availability:", error)

    if (error instanceof Error) {
      throw new Error(error.message)
    }

    throw new Error("An unexpected error occurred while updating furniture")
  }
}
