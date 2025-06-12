"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import FurnitureItem from "./furniture-item"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"
import {
  Search,
  Filter,
  Grid,
  List,
  SlidersHorizontal,
  RefreshCw,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

// Sample furniture data compatible with your Prisma schema
const furnitureData = [
  {
    id: "clpz1a2b3c4d5e6f7g8h9i0j",
    name: "Modern L-Shaped Sectional Sofa",
    description:
      "Luxurious and comfortable L-shaped sectional sofa perfect for modern living rooms. Features premium fabric upholstery and sturdy wooden frame.",
    category: "Sofa",
    brand: "IKEA",
    model: "KIVIK Series",
    color: "Charcoal Gray",
    material: "Fabric",
    dimensions: "240x160x85 cm",
    condition: "New",
    isAvailable: true,
    stockCount: 3,
    price: 35000,
    createdAt: new Date("2024-06-01T10:00:00Z"),
    images: [
      {
        id: "img1",
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        key: "sectional-sofa-1",
      },
      {
        id: "img2",
        url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=600&fit=crop",
        key: "sectional-sofa-2",
      },
    ],
    seller: {
      id: "seller1",
      name: "John's Furniture Store",
      email: "john@furniturestore.com",
    },
  },
  {
    id: "clpz2b3c4d5e6f7g8h9i0j1k",
    name: "Solid Oak Dining Table",
    description:
      "Beautiful handcrafted solid oak dining table that seats 6 people comfortably. Perfect for family gatherings and dinner parties.",
    category: "Table",
    brand: "Ashley Furniture",
    model: "Rustic Collection",
    color: "Natural Oak",
    material: "Wood",
    dimensions: "180x90x75 cm",
    condition: "New",
    isAvailable: true,
    stockCount: 2,
    price: 18000,
    createdAt: new Date("2024-06-02T14:30:00Z"),
    images: [
      {
        id: "img3",
        url: "https://images.unsplash.com/photo-1549497538-303791108f95?w=800&h=600&fit=crop",
        key: "dining-table-1",
      },
    ],
    seller: {
      id: "seller2",
      name: "Maria Santos",
      email: "maria@email.com",
    },
  },
  {
    id: "clpz3c4d5e6f7g8h9i0j1k2l",
    name: "Executive Ergonomic Office Chair",
    description:
      "Premium ergonomic office chair with lumbar support, adjustable height, and breathable mesh back. Perfect for long working hours.",
    category: "Chair",
    brand: "Herman Miller",
    model: "Aeron Classic",
    color: "Black",
    material: "Mesh",
    dimensions: "65x70x120 cm",
    condition: "Used",
    isAvailable: true,
    stockCount: 1,
    price: 8500,
    createdAt: new Date("2024-06-03T09:15:00Z"),
    images: [
      {
        id: "img4",
        url: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=800&h=600&fit=crop",
        key: "office-chair-1",
      },
      {
        id: "img5",
        url: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop",
        key: "office-chair-2",
      },
    ],
    seller: {
      id: "seller3",
      name: "Corporate Solutions Inc.",
      email: "sales@corpsolutions.com",
    },
  },
  {
    id: "clpz4d5e6f7g8h9i0j1k2l3m",
    name: "Queen Size Platform Bed",
    description:
      "Modern platform bed with built-in storage drawers. Clean lines and minimalist design perfect for contemporary bedrooms.",
    category: "Bed",
    brand: "West Elm",
    model: "Storage Platform",
    color: "Walnut Brown",
    material: "Wood",
    dimensions: "160x200x40 cm",
    condition: "New",
    isAvailable: true,
    stockCount: 5,
    price: 25000,
    createdAt: new Date("2024-06-04T16:45:00Z"),
    images: [
      {
        id: "img6",
        url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop",
        key: "platform-bed-1",
      },
    ],
    seller: {
      id: "seller4",
      name: "Bedroom Specialists",
      email: "info@bedroomspec.com",
    },
  },
  {
    id: "clpz5e6f7g8h9i0j1k2l3m4n",
    name: "Modern TV Console with Storage",
    description:
      "Sleek TV console with multiple storage compartments and cable management. Fits TVs up to 65 inches.",
    category: "Cabinet",
    brand: "JMQ Furniture",
    model: "Media Center Pro",
    color: "White",
    material: "Wood",
    dimensions: "150x45x60 cm",
    condition: "Refurbished",
    isAvailable: true,
    stockCount: 4,
    price: 12000,
    createdAt: new Date("2024-06-05T11:20:00Z"),
    images: [
      {
        id: "img7",
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        key: "tv-console-1",
      },
      {
        id: "img8",
        url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
        key: "tv-console-2",
      },
    ],
    seller: {
      id: "seller5",
      name: "JMQ Furniture Co.",
      email: "sales@jmqfurniture.com",
    },
  },
  {
    id: "clpz6f7g8h9i0j1k2l3m4n5o",
    name: "Leather Recliner Armchair",
    description:
      "Genuine leather recliner with 360-degree swivel and smooth reclining mechanism. Perfect for relaxation and comfort.",
    category: "Chair",
    brand: "La-Z-Boy",
    model: "Comfort Supreme",
    color: "Brown",
    material: "Leather",
    dimensions: "85x90x105 cm",
    condition: "New",
    isAvailable: false,
    stockCount: 0,
    price: 22000,
    createdAt: new Date("2024-06-06T13:10:00Z"),
    images: [
      {
        id: "img9",
        url: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop",
        key: "recliner-1",
      },
    ],
    seller: {
      id: "seller6",
      name: "Comfort Living Store",
      email: "info@comfortliving.com",
    },
  },
  {
    id: "clpz7g8h9i0j1k2l3m4n5o6p",
    name: "Modern Bookshelf Unit",
    description:
      "5-tier open bookshelf with clean geometric design. Perfect for displaying books, decorative items, and storage.",
    category: "Bookshelf",
    brand: "IKEA",
    model: "HEMNES Series",
    color: "White",
    material: "Wood",
    dimensions: "90x30x190 cm",
    condition: "New",
    isAvailable: true,
    stockCount: 8,
    price: 6500,
    createdAt: new Date("2024-06-07T08:30:00Z"),
    images: [
      {
        id: "img10",
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
        key: "bookshelf-1",
      },
    ],
    seller: {
      id: "seller7",
      name: "Home Office Solutions",
      email: "contact@homeoffice.com",
    },
  },
  {
    id: "clpz8h9i0j1k2l3m4n5o6p7q",
    name: "Glass Top Coffee Table",
    description:
      "Elegant glass top coffee table with metal legs. Modern design that complements any living room decor.",
    category: "Table",
    brand: "Modern Living",
    model: "Crystal Clear",
    color: "Clear",
    material: "Glass",
    dimensions: "120x60x45 cm",
    condition: "Used",
    isAvailable: true,
    stockCount: 1,
    price: 9500,
    createdAt: new Date("2024-06-08T15:45:00Z"),
    images: [
      {
        id: "img11",
        url: "https://images.unsplash.com/photo-1549497538-303791108f95?w=800&h=600&fit=crop",
        key: "coffee-table-1",
      },
    ],
    seller: {
      id: "seller8",
      name: "Glass & Style",
      email: "orders@glassandstyle.com",
    },
  },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

const Main = () => {
  const [furniture, setFurniture] = useState(furnitureData)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterCondition, setFilterCondition] = useState("all")
  const [filterAvailability, setFilterAvailability] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  // Filter and sort furniture
  const filteredFurniture = furniture
    .filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description &&
          item.description.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory =
        filterCategory === "all" ||
        item.category.toLowerCase() === filterCategory.toLowerCase()

      const matchesCondition =
        filterCondition === "all" ||
        item.condition.toLowerCase() === filterCondition.toLowerCase()

      const matchesAvailability =
        filterAvailability === "all" ||
        (filterAvailability === "available" && item.isAvailable) ||
        (filterAvailability === "unavailable" && !item.isAvailable)

      return (
        matchesSearch &&
        matchesCategory &&
        matchesCondition &&
        matchesAvailability
      )
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
          return a.name.localeCompare(b.name)
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        default:
          return 0
      }
    })

  const categories = [
    "all",
    ...Array.from(new Set(furnitureData.map((item) => item.category))),
  ]

  const conditions = [
    "all",
    ...Array.from(new Set(furnitureData.map((item) => item.condition))),
  ]

  const clearAllFilters = () => {
    setSearchTerm("")
    setFilterCategory("all")
    setFilterCondition("all")
    setFilterAvailability("all")
    setSortBy("newest")
  }

  if (loading) {
    return (
      <main className="bg-background min-h-[calc(100vh-4rem)]">
        <div className="container mx-auto px-4 py-8">
          {/* Loading Skeleton */}
          <div className="mb-8 space-y-4">
            <div className="bg-muted h-8 w-64 animate-pulse rounded"></div>
            <div className="bg-muted h-6 w-96 animate-pulse rounded"></div>
            <div className="flex gap-4">
              <div className="bg-muted h-10 w-80 animate-pulse rounded"></div>
              <div className="bg-muted h-10 w-32 animate-pulse rounded"></div>
              <div className="bg-muted h-10 w-32 animate-pulse rounded"></div>
              <div className="bg-muted h-10 w-32 animate-pulse rounded"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4 rounded-lg border p-4">
                <div className="bg-muted aspect-[4/3] animate-pulse rounded"></div>
                <div className="space-y-2">
                  <div className="bg-muted h-4 animate-pulse rounded"></div>
                  <div className="bg-muted h-4 w-2/3 animate-pulse rounded"></div>
                  <div className="bg-muted h-6 w-1/3 animate-pulse rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-background min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 space-y-6"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Successfully Delivered
            </h1>
            <p className="text-muted-foreground text-lg">
              Browse our collection of high-quality furniture that has been
              successfully delivered to our satisfied customers.
            </p>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 flex-wrap gap-4">
              {/* Search */}
              <div className="relative min-w-[300px] flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Search furniture, brands, or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Condition Filter */}
              <Select
                value={filterCondition}
                onValueChange={setFilterCondition}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition) => (
                    <SelectItem key={condition} value={condition}>
                      {condition === "all" ? "All Conditions" : condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Availability Filter */}
              <Select
                value={filterAvailability}
                onValueChange={setFilterAvailability}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="unavailable">Sold Out</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SlidersHorizontal className="h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Mode & Clear Filters */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="shrink-0"
              >
                <RefreshCw className="h-4 w-4" />
                Clear
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <Badge variant="secondary" className="gap-1">
                Search: {searchTerm}
                <button
                  onClick={() => setSearchTerm("")}
                  className="hover:bg-muted-foreground/20 ml-1 rounded-full p-0.5"
                >
                  ×
                </button>
              </Badge>
            )}
            {filterCategory !== "all" && (
              <Badge variant="secondary" className="gap-1">
                Category: {filterCategory}
                <button
                  onClick={() => setFilterCategory("all")}
                  className="hover:bg-muted-foreground/20 ml-1 rounded-full p-0.5"
                >
                  ×
                </button>
              </Badge>
            )}
            {filterCondition !== "all" && (
              <Badge variant="secondary" className="gap-1">
                Condition: {filterCondition}
                <button
                  onClick={() => setFilterCondition("all")}
                  className="hover:bg-muted-foreground/20 ml-1 rounded-full p-0.5"
                >
                  ×
                </button>
              </Badge>
            )}
            {filterAvailability !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {filterAvailability === "available"
                  ? "Available Only"
                  : "Sold Out Only"}
                <button
                  onClick={() => setFilterAvailability("all")}
                  className="hover:bg-muted-foreground/20 ml-1 rounded-full p-0.5"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              Showing {filteredFurniture.length} of {furniture.length} items
            </p>
            {filteredFurniture.length > 0 && (
              <p className="text-muted-foreground text-sm">
                Total value: ₱
                {filteredFurniture
                  .reduce((sum, item) => sum + item.price, 0)
                  .toLocaleString()}
              </p>
            )}
          </div>
        </motion.div>

        {/* Furniture Grid */}
        <AnimatePresence mode="wait">
          {filteredFurniture.length > 0 ? (
            <motion.div
              key="furniture-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1 lg:grid-cols-2"
              }`}
            >
              {filteredFurniture.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  layout
                  layoutId={item.id}
                >
                  <FurnitureItem furniture={item} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <div className="space-y-4 text-center">
                <div className="bg-muted mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                  <Search className="text-muted-foreground h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold">No furniture found</h3>
                <p className="text-muted-foreground max-w-md">
                  We couldn't find any furniture matching your criteria. Try
                  adjusting your filters or search terms.
                </p>
                <Button variant="outline" onClick={clearAllFilters}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Clear All Filters
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

export default Main
