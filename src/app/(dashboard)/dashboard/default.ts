import {
  FURNITURE_CATEGORIES,
  FURNITURE_CONDITIONS,
  FURNITURE_MATERIALS,
  FURNITURE_STYLES,
  type FurnitureForm,
  type Furniture,
} from "@/lib/validations/furnitures"

// Default values for furniture form
export const furnitureFormDefaults: FurnitureForm = {
  // Basic Information
  name: "",
  description: "",

  // Physical Properties
  measurements: "",
  dimensions: "",
  weight: "",

  // Design Properties
  color: "",
  shape: "",
  size: "",
  cover: "",
  style: FURNITURE_STYLES[0], // "Modern"

  // Functional Properties
  pullOut: "0",
  withStorage: false,
  seater: "1",

  // Essential Fields
  make: "",
  model: "",
  category: FURNITURE_CATEGORIES[0], // "Sofa"
  condition: FURNITURE_CONDITIONS[0], // "New"
  material: FURNITURE_MATERIALS[0], // "Wood"

  // Business Properties
  price: "",
  isAvailable: true,
  stockCount: "1",
  status: "Published",

  // File Upload
  selectedFile: null,
}

// Default values for API/Database operations
export const furnitureDefaults: Partial<Furniture> = {
  // Basic Information
  name: "",
  description: undefined,

  // Physical Properties
  measurements: undefined,
  dimensions: undefined,
  weight: undefined,

  // Design Properties
  color: undefined,
  shape: undefined,
  size: undefined,
  cover: undefined,
  style: undefined,

  // Functional Properties
  pullOut: 0,
  withStorage: false,
  seater: 1,

  // Essential Fields
  make: "",
  model: undefined,
  category: "",
  condition: "New",
  material: undefined,

  // Business Properties
  price: 0,
  isAvailable: true,
  stockCount: 1,
  status: "Published",

  // File Upload
  selectedFile: null,
}

// Pre-filled demo data for testing
export const furnitureDemoData: FurnitureForm = {
  // Basic Information
  name: "Modern L-Shaped Sectional Sofa",
  description:
    "Luxurious and comfortable L-shaped sectional sofa perfect for modern living rooms. Features premium fabric upholstery, high-density foam cushions, and a sturdy hardwood frame.",

  // Physical Properties
  measurements: "240x160x85 cm",
  dimensions: "240x160x85 cm",
  weight: "85.5",

  // Design Properties
  color: "Charcoal Gray",
  shape: "L Shape",
  size: "Large",
  cover: "Premium Fabric",
  style: "Modern",

  // Functional Properties
  pullOut: "0",
  withStorage: true,
  seater: "6",

  // Essential Fields
  make: "IKEA",
  model: "KIVIK L-Shaped",
  category: "Sofa",
  condition: "New",
  material: "Fabric",

  // Business Properties
  price: "45000",
  isAvailable: true,
  stockCount: "3",
  status: "Published",

  // File Upload
  selectedFile: null,
}

// Category-specific defaults
export const categoryDefaults: Record<string, Partial<FurnitureForm>> = {
  Sofa: {
    seater: "3",
    withStorage: false,
    pullOut: "0",
    material: "Fabric",
    style: "Modern",
  },
  Chair: {
    seater: "1",
    withStorage: false,
    pullOut: "0",
    material: "Wood",
    style: "Contemporary",
  },
  Table: {
    seater: "4",
    withStorage: false,
    pullOut: "0",
    material: "Wood",
    style: "Modern",
  },
  Bed: {
    seater: "2",
    withStorage: true,
    pullOut: "0",
    material: "Wood",
    style: "Contemporary",
    size: "Queen",
  },
  Cabinet: {
    seater: "0",
    withStorage: true,
    pullOut: "2",
    material: "Wood",
    style: "Modern",
  },
  Bookshelf: {
    seater: "0",
    withStorage: true,
    pullOut: "0",
    material: "Wood",
    style: "Minimalist",
  },
  Dresser: {
    seater: "0",
    withStorage: true,
    pullOut: "3",
    material: "Wood",
    style: "Traditional",
  },
  Wardrobe: {
    seater: "0",
    withStorage: true,
    pullOut: "0",
    material: "Wood",
    style: "Contemporary",
  },
  Desk: {
    seater: "1",
    withStorage: true,
    pullOut: "1",
    material: "Wood",
    style: "Modern",
  },
  Storage: {
    seater: "0",
    withStorage: true,
    pullOut: "0",
    material: "Wood",
    style: "Minimalist",
  },
  Outdoor: {
    seater: "4",
    withStorage: false,
    pullOut: "0",
    material: "Rattan",
    style: "Contemporary",
  },
  Other: {
    seater: "1",
    withStorage: false,
    pullOut: "0",
    material: "Wood",
    style: "Modern",
  },
}

// Brand-specific defaults
export const brandDefaults: Record<string, Partial<FurnitureForm>> = {
  IKEA: {
    style: "Scandinavian",
    condition: "New",
    material: "Wood",
  },
  "Ashley Furniture": {
    style: "Traditional",
    condition: "New",
    material: "Fabric",
  },
  "West Elm": {
    style: "Mid-Century",
    condition: "New",
    material: "Wood",
  },
  "Herman Miller": {
    style: "Modern",
    condition: "New",
    material: "Metal",
  },
  "JMQ Furniture": {
    style: "Contemporary",
    condition: "New",
    material: "Wood",
  },
}

// Helper function to get defaults based on category
export const getDefaultsByCategory = (
  category: string
): Partial<FurnitureForm> => {
  return {
    ...furnitureFormDefaults,
    ...categoryDefaults[category],
    category,
  }
}

// Helper function to get defaults based on brand
export const getDefaultsByBrand = (brand: string): Partial<FurnitureForm> => {
  return {
    ...furnitureFormDefaults,
    ...brandDefaults[brand],
    make: brand,
  }
}

// Helper function to get complete defaults
export const getCompleteDefaults = (
  category?: string,
  brand?: string
): Partial<FurnitureForm> => {
  let defaults = { ...furnitureFormDefaults }

  if (category && categoryDefaults[category]) {
    defaults = { ...defaults, ...categoryDefaults[category], category }
  }

  if (brand && brandDefaults[brand]) {
    defaults = { ...defaults, ...brandDefaults[brand], make: brand }
  }

  return defaults
}

// Quick preset configurations
export const quickPresets = {
  livingRoom: {
    sofa: getCompleteDefaults("Sofa", "IKEA"),
    chair: getCompleteDefaults("Chair", "Herman Miller"),
    table: getCompleteDefaults("Table", "West Elm"),
  },
  bedroom: {
    bed: getCompleteDefaults("Bed", "West Elm"),
    dresser: getCompleteDefaults("Dresser", "Ashley Furniture"),
    wardrobe: getCompleteDefaults("Wardrobe", "IKEA"),
  },
  office: {
    desk: getCompleteDefaults("Desk", "Herman Miller"),
    chair: getCompleteDefaults("Chair", "Herman Miller"),
    storage: getCompleteDefaults("Storage", "IKEA"),
  },
  dining: {
    table: getCompleteDefaults("Table", "Ashley Furniture"),
    chair: getCompleteDefaults("Chair", "Ashley Furniture"),
  },
}

// Validation helpers
export const isValidCategory = (category: string): boolean => {
  return FURNITURE_CATEGORIES.includes(category as any)
}

export const isValidCondition = (condition: string): boolean => {
  return FURNITURE_CONDITIONS.includes(condition as any)
}

export const isValidMaterial = (material: string): boolean => {
  return FURNITURE_MATERIALS.includes(material as any)
}

export const isValidStyle = (style: string): boolean => {
  return FURNITURE_STYLES.includes(style as any)
}
