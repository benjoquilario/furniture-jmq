"use client"

import Link from "next/link"
import { useState } from "react"
import {
  MapPin,
  Package,
  BedDouble,
  Ungroup,
  Grid2x2,
  LayoutPanelLeft,
  Heart,
  Eye,
  Star,
} from "lucide-react"

interface FurnitureItemProps {
  furniture?: {
    id: string
    name: string
    price: number
    location?: string
    images?: string[]
    seater?: number
    dimensions?: string
    withStorage?: boolean
    pullOut?: number
    shape?: string
    category?: string
    condition?: string
    rating?: number
    make?: string
  }
}

const FurnitureItem = ({ furniture }: FurnitureItemProps) => {
  const [isLiked, setIsLiked] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Default data for demo
  const data = furniture || {
    id: "1",
    name: "Sofa Bed",
    price: 30000,
    location: "Quezon City, Philippines",
    images: [
      "https://ourhome.ph/cdn/shop/files/OURHOME_COPENHAGENWHITE.jpg?v=1707891865&width=1200",
    ],
    seater: 1,
    dimensions: "82x60",
    withStorage: true,
    pullOut: 2,
    shape: "L Shape",
    condition: "New",
    rating: 4.5,
    make: "JMQ Furniture",
  }

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLiked(!isLiked)
  }

  return (
    <div className="group relative">
      <Link href={`/furniture/${data.id}`} className="block">
        <div className="bg-card text-card-foreground flex flex-col overflow-hidden rounded-lg border shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
          {/* Image Container */}
          <div className="relative overflow-hidden">
            <div className="relative aspect-[4/3]">
              {!imageError ? (
                <img
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={data.images?.[0] || "/placeholder-furniture.jpg"}
                  alt={data.name}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="bg-muted flex h-full w-full items-center justify-center">
                  <Package className="text-muted-foreground size-12" />
                </div>
              )}

              {/* Overlay Elements */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Condition Badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-background/90 text-foreground inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium backdrop-blur-sm">
                  {data.condition}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-3 right-3 flex translate-x-2 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                <button
                  onClick={handleLikeToggle}
                  className="bg-background/90 hover:bg-background rounded-md border p-2 shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:shadow-md"
                >
                  <Heart
                    className={`size-4 transition-colors duration-200 ${
                      isLiked
                        ? "fill-destructive text-destructive"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  />
                </button>
                <button className="bg-background/90 hover:bg-background rounded-md border p-2 shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:shadow-md">
                  <Eye className="text-muted-foreground hover:text-foreground size-4 transition-colors duration-200" />
                </button>
              </div>

              {/* Price Badge */}
              <div className="absolute right-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="bg-primary rounded-md border px-3 py-1.5 shadow-lg">
                  <span className="text-primary-foreground text-sm font-semibold">
                    ₱{data.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3 p-4">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="text-foreground group-hover:text-primary line-clamp-1 text-lg font-semibold transition-colors duration-200">
                  {data.name}
                </h3>
                {data.rating && (
                  <div className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-500">
                    <Star className="size-3 fill-current" />
                    <span className="font-medium">{data.rating}</span>
                  </div>
                )}
              </div>

              {data.make && (
                <p className="text-muted-foreground text-sm font-medium">
                  {data.make}
                </p>
              )}

              <div className="text-muted-foreground flex items-center gap-1">
                <MapPin className="size-4 flex-shrink-0" />
                <span className="truncate text-sm">{data.location}</span>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2">
              {data.seater && (
                <div className="bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors duration-200">
                  <BedDouble className="size-3.5" />
                  <span>{data.seater} Seater</span>
                </div>
              )}

              {data.dimensions && (
                <div className="bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors duration-200">
                  <Grid2x2 className="size-3.5" />
                  <span>{data.dimensions}</span>
                </div>
              )}

              {data.withStorage && (
                <div className="bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors duration-200">
                  <Package className="size-3.5" />
                  <span>Storage</span>
                </div>
              )}

              {data.pullOut && data.pullOut > 0 && (
                <div className="bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors duration-200">
                  <LayoutPanelLeft className="size-3.5" />
                  <span>{data.pullOut} Pull out</span>
                </div>
              )}

              {data.shape && (
                <div className="bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors duration-200">
                  <Ungroup className="size-3.5" />
                  <span>{data.shape}</span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t pt-3">
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs tracking-wide uppercase">
                  For Sale
                </p>
                <p className="text-foreground text-sm font-medium">
                  {data.name}
                </p>
              </div>
              <div className="text-right">
                <p className="text-foreground text-xl font-bold">
                  ₱{data.price.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default FurnitureItem
