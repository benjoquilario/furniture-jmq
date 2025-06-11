"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Heart,
  Share2,
  Star,
  MapPin,
  Package,
  Truck,
  Shield,
  Clock,
  Ruler,
  Weight,
  Palette,
  Sofa,
  User,
  Phone,
  Mail,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Grid2x2,
  BedDouble,
  LayoutPanelLeft,
  Ungroup,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Demo furniture data based on Prisma schema
const furnitureData = {
  id: "clk123abc456def789",
  name: "Modern L-Shaped Sectional Sofa",
  description:
    "Luxurious and comfortable L-shaped sectional sofa perfect for modern living rooms. Features premium fabric upholstery, high-density foam cushions, and a sturdy hardwood frame. This piece combines style and functionality, offering ample seating space for family gatherings and entertaining guests.",
  selectedFile: [
    {
      id: "img1",
      url: "https://ourhome.ph/cdn/shop/files/OURHOME_COPENHAGENWHITE.jpg?v=1707891865&width=1200",
      key: "main-view",
    },
    {
      id: "img2",
      url: "https://ourhome.ph/cdn/shop/files/OURHOME_COPENHAGENWHITE.jpg?v=1707891865&width=1200",
      key: "side-view",
    },
    {
      id: "img3",
      url: "https://ourhome.ph/cdn/shop/files/OURHOME_COPENHAGENWHITE.jpg?v=1707891865&width=1200",
      key: "detail-view",
    },
    {
      id: "img4",
      url: "https://ourhome.ph/cdn/shop/files/OURHOME_COPENHAGENWHITE.jpg?v=1707891865&width=1200",
      key: "room-view",
    },
  ],
  measurements: "240x160x85 cm",
  pullOut: 0,
  withStorage: true,
  shape: "L Shape",
  size: "Large",
  color: "Charcoal Gray",
  cover: "Premium Fabric",
  seater: 6,
  price: 45000,
  make: "IKEA",
  model: "KIVIK L-Shaped",
  category: "Sofa",
  condition: "New",
  material: "Fabric & Hardwood",
  style: "Modern",
  weight: 85.5,
  dimensions: "240x160x85 cm",
  isAvailable: true,
  stockCount: 3,
  createdAt: new Date("2024-06-01"),
  updatedAt: new Date("2024-06-09"),
  seller: {
    id: "seller123",
    name: "Maria Santos",
    email: "maria@example.com",
    image: null,
    role: "SELLER",
  },
}

const FurnitureData = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === furnitureData.selectedFile.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? furnitureData.selectedFile.length - 1 : prev - 1
    )
  }

  const features = [
    {
      icon: BedDouble,
      label: `${furnitureData.seater} Seater`,
      value: furnitureData.seater > 1,
    },
    {
      icon: Grid2x2,
      label: furnitureData.dimensions,
      value: !!furnitureData.dimensions,
    },
    { icon: Package, label: "Storage", value: furnitureData.withStorage },
    {
      icon: LayoutPanelLeft,
      label: `${furnitureData.pullOut} Pull out`,
      value: furnitureData.pullOut > 0,
    },
    { icon: Ungroup, label: furnitureData.shape, value: !!furnitureData.shape },
  ].filter((feature) => feature.value)

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-muted-foreground mb-6 text-sm">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/furniture"
            className="hover:text-primary transition-colors"
          >
            Furniture
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{furnitureData.name}</span>
        </nav>

        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="group relative">
              <div className="bg-muted relative aspect-square overflow-hidden rounded-lg">
                <img
                  src={furnitureData.selectedFile[currentImageIndex]?.url || ""}
                  alt={furnitureData.name}
                  // fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Navigation Arrows */}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-1/2 left-4 -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:scale-110"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:scale-110"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Zoom Button */}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-4 right-4 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:scale-110"
                  onClick={() => setIsImageModalOpen(true)}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>

                {/* Image Counter */}
                <div className="absolute right-4 bottom-4 rounded bg-black/50 px-2 py-1 text-sm text-white">
                  {currentImageIndex + 1} / {furnitureData.selectedFile.length}
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {furnitureData.selectedFile.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 ${
                    index === currentImageIndex
                      ? "ring-primary ring-2 ring-offset-2"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`${furnitureData.name} view ${index + 1}`}
                    // fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Badge variant="outline" className="w-fit">
                    {furnitureData.condition}
                  </Badge>
                  <h1 className="text-3xl leading-tight font-bold">
                    {furnitureData.name}
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    by {furnitureData.make} • {furnitureData.model}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsLiked(!isLiked)}
                    className="transition-all duration-200 hover:scale-110"
                  >
                    <Heart
                      className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
                    />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="transition-all duration-200 hover:scale-110"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="text-muted-foreground ml-2 text-sm">
                    4.8 (24 reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="text-primary text-3xl font-bold">
                ₱{furnitureData.price.toLocaleString()}
              </div>
              <p className="text-muted-foreground text-sm">
                Stock: {furnitureData.stockCount} available
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="font-semibold">Key Features</h3>
              <div className="flex flex-wrap gap-2">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-secondary hover:bg-secondary/80 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors"
                  >
                    <feature.icon className="h-4 w-4" />
                    <span>{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <Card>
              <CardContent className="space-y-3 p-4">
                <h3 className="mb-3 font-semibold">Specifications</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Ruler className="text-muted-foreground h-4 w-4" />
                    <span className="text-muted-foreground">Dimensions:</span>
                    <span className="font-medium">
                      {furnitureData.dimensions}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Weight className="text-muted-foreground h-4 w-4" />
                    <span className="text-muted-foreground">Weight:</span>
                    <span className="font-medium">
                      {furnitureData.weight} kg
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Palette className="text-muted-foreground h-4 w-4" />
                    <span className="text-muted-foreground">Color:</span>
                    <span className="font-medium">{furnitureData.color}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sofa className="text-muted-foreground h-4 w-4" />
                    <span className="text-muted-foreground">Material:</span>
                    <span className="font-medium">
                      {furnitureData.material}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-medium">Quantity:</label>
                <div className="flex items-center rounded-md border">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setSelectedQuantity(Math.max(1, selectedQuantity - 1))
                    }
                    disabled={selectedQuantity <= 1}
                  >
                    -
                  </Button>
                  <span className="min-w-12 px-4 py-2 text-center">
                    {selectedQuantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setSelectedQuantity(
                        Math.min(furnitureData.stockCount, selectedQuantity + 1)
                      )
                    }
                    disabled={selectedQuantity >= furnitureData.stockCount}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 transition-all duration-200 hover:scale-105">
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 transition-all duration-200 hover:scale-105"
                >
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-muted/30 space-y-3 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="text-primary h-4 w-4" />
                <span>Free delivery within Metro Manila</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="text-primary h-4 w-4" />
                <span>Ships within 3-5 business days</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="text-primary h-4 w-4" />
                <span>30-day return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Seller Information */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {furnitureData.seller.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{furnitureData.seller.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    Verified Seller
                  </p>
                  <div className="mt-1 flex items-center gap-1">
                    <MapPin className="text-muted-foreground h-3 w-3" />
                    <span className="text-muted-foreground text-xs">
                      Metro Manila
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-4 text-xl font-semibold">Description</h2>
            <p className="text-muted-foreground leading-relaxed">
              {furnitureData.description}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default FurnitureData
