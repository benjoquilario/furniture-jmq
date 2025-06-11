import { ISelectedFile } from "@/types"
import * as z from "zod"

export const furnitureSchema = z.object({
  // Basic Information
  name: z
    .string({
      message: "Name is required",
    })
    .min(3, "Name must be at least 3 characters")
    .max(255, "Name must not exceed 255 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters")
    .optional(),

  // Physical Properties
  measurements: z
    .string()
    .min(3, "Measurements must be at least 3 characters")
    .max(255)
    .optional(),

  dimensions: z
    .string()
    .min(3, "Dimensions must be at least 3 characters")
    .max(255)
    .optional(),

  weight: z
    .number()
    .positive("Weight must be positive")
    .max(1000, "Weight must not exceed 1000kg")
    .optional()
    .or(z.string().transform((val) => (val ? parseFloat(val) : undefined))),

  // Design Properties
  color: z
    .string()
    .min(2, "Color must be at least 2 characters")
    .max(255)
    .optional(),

  shape: z
    .string()
    .min(2, "Shape must be at least 2 characters")
    .max(255)
    .optional(),

  size: z
    .string()
    .min(2, "Size must be at least 2 characters")
    .max(255)
    .optional(),

  cover: z
    .string()
    .min(2, "Cover must be at least 2 characters")
    .max(255)
    .optional(),

  style: z
    .string()
    .min(2, "Style must be at least 2 characters")
    .max(255)
    .optional(),

  // Functional Properties
  pullOut: z
    .number()
    .int()
    .min(0, "Pull out count cannot be negative")
    .max(10, "Pull out count cannot exceed 10")
    .default(0)
    .or(z.string().transform((val) => (val ? parseInt(val) : 0))),

  withStorage: z.boolean().default(false),

  seater: z
    .number()
    .int()
    .min(1, "Seater count must be at least 1")
    .max(20, "Seater count cannot exceed 20")
    .or(z.string().transform((val) => parseInt(val))),

  // Essential Fields (Required)
  make: z
    .string({
      message: "Brand/Manufacturer is required",
    })
    .min(2, "Brand must be at least 2 characters")
    .max(255, "Brand must not exceed 255 characters"),

  model: z
    .string()
    .min(2, "Model must be at least 2 characters")
    .max(255, "Model must not exceed 255 characters")
    .optional(),

  category: z
    .string({
      message: "Category is required",
    })
    .min(2, "Category must be at least 2 characters")
    .max(255, "Category must not exceed 255 characters"),

  condition: z
    .enum(
      ["New", "Used", "Refurbished", "Like New", "Excellent", "Good", "Fair"],
      {
        message: "Please select a valid condition",
      }
    )
    .default("New"),

  material: z
    .string()
    .min(2, "Material must be at least 2 characters")
    .max(255, "Material must not exceed 255 characters")
    .optional(),

  // Business Properties
  price: z
    .number()
    .positive("Price must be positive")
    .max(10000000, "Price cannot exceed 10,000,000")
    .or(z.string().transform((val) => parseFloat(val))),

  isAvailable: z.boolean().default(true),

  stockCount: z
    .number()
    .int()
    .min(0, "Stock count cannot be negative")
    .max(1000, "Stock count cannot exceed 1000")
    .default(1)
    .or(z.string().transform((val) => (val ? parseInt(val) : 1))),

  status: z
    .enum(["Draft", "Published", "Archived", "Sold"], {
      message: "Please select a valid status",
    })
    .default("Published")
    .optional(),

  // File Upload
  selectedFile: z
    .array(z.custom<File>())
    .min(1, "Please select at least one file")
    .max(2, "Please select up to 2 files")
    .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
      message: "File size must be less than 5MB",
      path: ["files"],
    }),

  // Seller (handled separately in forms)
  sellerId: z.string().cuid("Invalid seller ID format").optional(),
})

// Create separate schemas for different use cases
export const createFurnitureSchema = furnitureSchema.omit({
  sellerId: true,
})

export const updateFurnitureSchema = furnitureSchema.partial().extend({
  id: z.string().cuid("Invalid furniture ID format"),
})

// For form validation with string inputs
export const furnitureFormSchema = furnitureSchema.extend({
  price: z
    .string({
      message: "Price is required",
    })
    .min(1, "Price is required"),

  seater: z.string().min(1, "Seater count is required"),

  pullOut: z.string().optional(),

  weight: z.string().optional(),

  stockCount: z.string().optional(),
})

// Type definitions
export type Furniture = z.infer<typeof furnitureSchema>
export type CreateFurniture = z.infer<typeof createFurnitureSchema>
export type UpdateFurniture = z.infer<typeof updateFurnitureSchema>
export type FurnitureForm = z.infer<typeof furnitureFormSchema>

// Helper function to transform form data to API data
export const transformFormToApi = (
  formData: FurnitureForm
): CreateFurniture => {
  return {
    ...formData,
    price: parseFloat(formData.price),
    seater: parseInt(formData.seater),
    pullOut: formData.pullOut ? parseInt(formData.pullOut) : 0,
    weight: formData.weight ? parseFloat(formData.weight) : undefined,
    stockCount: formData.stockCount ? parseInt(formData.stockCount) : 1,
  }
}

// Validation constants
export const FURNITURE_CATEGORIES = [
  "Sofa",
  "Chair",
  "Table",
  "Bed",
  "Cabinet",
  "Bookshelf",
  "Dresser",
  "Wardrobe",
  "Desk",
  "Storage",
  "Outdoor",
  "Other",
] as const

export const FURNITURE_CONDITIONS = [
  "New",
  "Like New",
  "Excellent",
  "Good",
  "Fair",
  "Used",
  "Refurbished",
] as const

export const FURNITURE_MATERIALS = [
  "Wood",
  "Metal",
  "Fabric",
  "Leather",
  "Plastic",
  "Glass",
  "Rattan",
  "Bamboo",
  "Mixed Materials",
] as const

export const FURNITURE_STYLES = [
  "Modern",
  "Contemporary",
  "Traditional",
  "Rustic",
  "Industrial",
  "Scandinavian",
  "Minimalist",
  "Vintage",
  "Mid-Century",
  "Bohemian",
] as const
