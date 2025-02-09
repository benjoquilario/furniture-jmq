import { ISelectedFile } from "@/types"
import * as z from "zod"

export const furnitureSchema = z.object({
  name: z
    .string({
      message: "Name is required",
    })
    .min(3)
    .max(255),
  color: z.string().min(3).max(255).optional(),
  shape: z.string().min(3).max(255).optional(),
  description: z.string().min(3).max(255).optional(),
  measurements: z.string().min(3).max(255).optional(),
  size: z.string().min(3).max(255).optional(),
  pullOut: z.string().optional(),
  selectedFile: z
    .custom<File[] | undefined | null | ISelectedFile[]>()
    .optional()
    .nullable()
    .default(null),
  price: z.string({
    message: "Price is required",
  }),
  cover: z.string().optional(),
  withStorage: z.boolean().optional(),
  seater: z.string().optional(),
})

export type Furniture = z.infer<typeof furnitureSchema>
