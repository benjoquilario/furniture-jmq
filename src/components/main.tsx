"use client"

import { useState, useEffect } from "react"
import FurnitureItem from "./furniture-item"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Search, Filter, Grid, List, SlidersHorizontal } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

// Sample furniture data
const furnitureData = [
  {
    id: "1",
    name: "Modern L-Shaped Sofa",
    price: 35000,
    location: "Quezon City, Philippines",
    images: [
      "https://ourhome.ph/cdn/shop/files/OURHOME_COPENHAGENWHITE.jpg?v=1707891865&width=1200",
    ],
    seater: 6,
    dimensions: "240x160x85 cm",
    withStorage: true,
    pullOut: 0,
    shape: "L Shape",
    category: "Sofa",
    condition: "New",
    rating: 4.8,
    make: "IKEA",
  },
  {
    id: "2",
    name: "Wooden Dining Table",
    price: 18000,
    location: "Makati City, Philippines",
    images: [
      "https://ourhome.ph/cdn/shop/files/OURHOME_COPENHAGENWHITE.jpg?v=1707891865&width=1200",
    ],
    seater: 6,
    dimensions: "180x90x75 cm",
    withStorage: false,
    pullOut: 0,
    shape: "Rectangle",
    category: "Table",
    condition: "New",
    rating: 4.5,
    make: "Ashley Furniture",
  },
  {
    id: "3",
    name: "Executive Office Chair",
    price: 8500,
    location: "Manila, Philippines",
    images: [
      "https://ourhome.ph/cdn/shop/files/OURHOME_COPENHAGENWHITE.jpg?v=1707891865&width=1200",
    ],
    seater: 1,
    dimensions: "65x70x120 cm",
    withStorage: false,
    pullOut: 0,
    shape: "Ergonomic",
    category: "Chair",
    condition: "Like New",
    rating: 4.7,
    make: "Herman Miller",
  },
  {
    id: "4",
    name: "Queen Size Bed Frame",
    price: 25000,
    location: "Pasig City, Philippines",
    images: [
      "https://ourhome.ph/cdn/shop/files/OURHOME_COPENHAGENWHITE.jpg?v=1707891865&width=1200",
    ],
    seater: 2,
    dimensions: "160x200x40 cm",
    withStorage: true,
    pullOut: 0,
    shape: "Rectangle",
    category: "Bed",
    condition: "New",
    rating: 4.9,
    make: "West Elm",
  },
  {
    id: "5",
    name: "TV Console Cabinet",
    price: 12000,
    location: "Taguig City, Philippines",
    images: [
      "https://ourhome.ph/cdn/shop/files/OURHOME_COPENHAGENWHITE.jpg?v=1707891865&width=1200",
    ],
    seater: 0,
    dimensions: "150x45x60 cm",
    withStorage: true,
    pullOut: 2,
    shape: "Rectangle",
    category: "Cabinet",
    condition: "Excellent",
    rating: 4.3,
    make: "JMQ Furniture",
  },
  {
    id: "6",
    name: "Recliner Armchair",
    price: 22000,
    location: "Mandaluyong, Philippines",
    images: [
      "https://ourhome.ph/cdn/shop/files/OURHOME_COPENHAGENWHITE.jpg?v=1707891865&width=1200",
    ],
    seater: 1,
    dimensions: "85x90x105 cm",
    withStorage: false,
    pullOut: 1,
    shape: "Curved",
    category: "Chair",
    condition: "New",
    rating: 4.6,
    make: "JMQ Furniture",
  },
  {
    id: "6",
    name: "Recliner Armchair",
    price: 22000,
    location: "Mandaluyong, Philippines",
    images: [
      "https://ourhome.ph/cdn/shop/files/OURHOME_COPENHAGENWHITE.jpg?v=1707891865&width=1200",
    ],
    seater: 1,
    dimensions: "85x90x105 cm",
    withStorage: false,
    pullOut: 1,
    shape: "Curved",
    category: "Chair",
    condition: "New",
    rating: 4.6,
    make: "JMQ Furniture",
  },
  {
    id: "6",
    name: "Recliner Armchair",
    price: 22000,
    location: "Mandaluyong, Philippines",
    images: [
      "https://ourhome.ph/cdn/shop/files/OURHOME_COPENHAGENWHITE.jpg?v=1707891865&width=1200",
    ],
    seater: 1,
    dimensions: "85x90x105 cm",
    withStorage: false,
    pullOut: 1,
    shape: "Curved",
    category: "Chair",
    condition: "New",
    rating: 4.6,
    make: "JMQ Furniture",
  },
]

const Main = () => {
  const [furniture, setFurniture] = useState(furnitureData)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [filterCategory, setFilterCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filter and sort furniture
  const filteredFurniture = furniture
    .filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.make.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        filterCategory === "all" ||
        item.category.toLowerCase() === filterCategory.toLowerCase()
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return (b.rating || 0) - (a.rating || 0)
        default:
          return 0
      }
    })

  const categories = [
    "all",
    ...Array.from(new Set(furnitureData.map((item) => item.category))),
  ]

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-4rem)]">
        <div className="container mx-auto px-4 py-8">
          {/* Loading Skeleton */}
          <div className="mb-8 space-y-4">
            <div className="bg-muted h-8 w-64 animate-pulse rounded"></div>
            <div className="flex gap-4">
              <div className="bg-muted h-10 w-80 animate-pulse rounded"></div>
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
        <div className="mb-8 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Available Furniture
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover quality furniture from trusted sellers
            </p>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 gap-4">
              {/* Search */}
              <div className="relative max-w-md flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Search furniture..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SlidersHorizontal className="h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Mode */}
            <div className="flex gap-2">
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

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              Showing {filteredFurniture.length} of {furniture.length} items
            </p>
          </div>
        </div>

        {/* Furniture Grid */}
        {filteredFurniture.length > 0 ? (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            {filteredFurniture.map((item, index) => (
              <div
                key={item.id}
                className="animate-in fade-in slide-in-from-bottom-4"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "both",
                }}
              >
                <FurnitureItem furniture={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="space-y-4 text-center">
              <div className="bg-muted mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                <Search className="text-muted-foreground h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold">No furniture found</h3>
              <p className="text-muted-foreground max-w-md">
                Try adjusting your search or filter criteria to find what you're
                looking for.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setFilterCategory("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default Main
