import { z } from "zod"

// Enums for better type safety
export const FurnitureCondition = z.enum(["New", "Used", "Refurbished"])

export const FurnitureCategory = z.enum([
  "Chair",
  "Table",
  "Sofa",
  "Bed",
  "Dresser",
  "Bookshelf",
  "Desk",
  "Cabinet",
  "Wardrobe",
  "Nightstand",
  "Other",
])

export const FurnitureMaterial = z.enum([
  "Wood",
  "Metal",
  "Fabric",
  "Leather",
  "Plastic",
  "Glass",
  "Rattan",
  "Bamboo",
  "Mixed",
  "Other",
])

// Image validation schema
export const FurnitureImageSchema = z.object({
  id: z.string().optional(),
  url: z.string().url("Please provide a valid image URL"),
  key: z.string().min(1, "Image key is required"),
  furnitureId: z.string().optional(),
})

// Base furniture schema
export const FurnitureSchema = z.object({
  // Basic information
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .trim(),

  description: z
    .string()
    .max(1000, "Description must not exceed 1000 characters")
    .optional()
    .or(z.literal("")),

  // Core furniture properties
  category: FurnitureCategory,

  brand: z
    .string()
    .min(1, "Brand is required")
    .max(50, "Brand must not exceed 50 characters")
    .trim(),

  model: z
    .string()
    .max(50, "Model must not exceed 50 characters")
    .optional()
    .or(z.literal("")),

  color: z
    .string()
    .max(30, "Color must not exceed 30 characters")
    .optional()
    .or(z.literal("")),

  material: FurnitureMaterial.optional(),

  dimensions: z
    .string()
    .regex(
      /^\d+(\.\d+)?\s*x\s*\d+(\.\d+)?\s*x\s*\d+(\.\d+)?\s*(cm|in|m)$/i,
      "Dimensions must be in format: Length x Width x Height (unit). Example: 120x80x75 cm"
    )
    .optional()
    .or(z.literal("")),

  // Condition and availability
  condition: FurnitureCondition.default("New"),

  isAvailable: z.boolean().default(true),

  stockCount: z
    .number()
    .int("Stock count must be a whole number")
    .min(0, "Stock count cannot be negative")
    .max(9999, "Stock count cannot exceed 9999")
    .default(1),

  // Pricing
  price: z
    .number()
    .min(0, "Price must be at least 0")
    .max(999999.99, "Price cannot exceed 999,999.99")
    .multipleOf(0.01, "Price can only have up to 2 decimal places"),

  // Images
  images: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required")
    .max(10, "Maximum 10 images allowed"),
})

// Schema for creating furniture (excludes server-generated fields)
export const CreateFurnitureSchema = FurnitureSchema.omit({
  // These fields are handled by the server
})

// Schema for updating furniture (all fields optional except ID)
export const UpdateFurnitureSchema = FurnitureSchema.partial().extend({
  id: z.string().cuid("Invalid furniture ID format"),
})

// Schema for furniture query/filter parameters
export const FurnitureQuerySchema = z.object({
  category: FurnitureCategory.optional(),
  condition: FurnitureCondition.optional(),
  material: FurnitureMaterial.optional(),
  brand: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  isAvailable: z.boolean().optional(),
  search: z.string().max(100).optional(),
  sortBy: z.enum(["price", "createdAt", "name", "brand"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
})

// Type exports for use in components
export type Furniture = z.infer<typeof FurnitureSchema>
export type CreateFurniture = z.infer<typeof CreateFurnitureSchema>
export type UpdateFurniture = z.infer<typeof UpdateFurnitureSchema>
export type FurnitureImage = z.infer<typeof FurnitureImageSchema>
export type FurnitureQuery = z.infer<typeof FurnitureQuerySchema>
export type FurnitureConditionType = z.infer<typeof FurnitureCondition>
export type FurnitureCategoryType = z.infer<typeof FurnitureCategory>
export type FurnitureMaterialType = z.infer<typeof FurnitureMaterial>

// Utility function to validate furniture data
export const validateFurniture = (data: unknown) => {
  return FurnitureSchema.safeParse(data)
}

// Utility function to validate create furniture data
export const validateCreateFurniture = (data: unknown) => {
  return CreateFurnitureSchema.safeParse(data)
}

// Utility function to validate update furniture data
export const validateUpdateFurniture = (data: unknown) => {
  return UpdateFurnitureSchema.safeParse(data)
}
