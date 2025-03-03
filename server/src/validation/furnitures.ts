import { ISelectedFile } from './types';
import * as z from 'zod';

export const furnitureSchema = z.object({
  name: z.string(),
  color: z.string(),
  shape: z.string(),
  description: z.string(),
  measurements: z.string(),
  size: z.string().min(3),
  pullOut: z.string(),
  selectedFile: z.custom<ISelectedFile[]>(),
  price: z.string(),
  cover: z.string(),
  withStorage: z.boolean(),
  seater: z.string(),
});

export type Furniture = z.infer<typeof furnitureSchema>;
