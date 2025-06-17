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
  User as UserIcon,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Furniture, FurnitureImage, User } from "@/generated/prisma"

// Demo furniture data matching your Prisma schema structure
// const furnitureData: Furniture = {
//   id: "clk123abc456def789",
//   name: "Modern L-Shaped Sectional Sofa",
//   description:
//     "Luxurious and comfortable L-shaped sectional sofa perfect for modern living rooms. Features premium fabric upholstery, high-density foam cushions, and a sturdy hardwood frame. This piece combines style and functionality, offering ample seating space for family gatherings and entertaining guests.",
//   images: [
//     {
//       id: "img1",
//       url: "https://ourhome.ph/cdn/shop/files/OURHOME_COPENHAGENWHITE.jpg?v=1707891865&width=1200",
//       key: "main-view",
//       createdAt: new Date("2024-06-01"),
//     },
//     {
//       id: "img2",
//       url: "https://ourhome.ph/cdn/shop/files/OURHOME_COPENHAGENWHITE.jpg?v=1707891865&width=1200",
//       key: "side-view",
//       createdAt: new Date("2024-06-01"),
//     },
//     {
//       id: "img3",
//       url: "https://ourhome.ph/cdn/shop/files/OURHOME_COPENHAGENWHITE.jpg?v=1707891865&width=1200",
//       key: "detail-view",
//       createdAt: new Date("2024-06-01"),
//     },
//     {
//       id: "img4",
//       url: "https://ourhome.ph/cdn/shop/files/OURHOME_COPENHAGENWHITE.jpg?v=1707891865&width=1200",
//       key: "room-view",
//       createdAt: new Date("2024-06-01"),
//     },
//   ],
//   deliveredLocations: [
//     {
//       id: "delivery1",
//       location: "Quezon City",
//       deliveryDate: new Date("2024-05-15"),
//       isDelivered: true,
//       createdAt: new Date("2024-05-10"),
//       updatedAt: new Date("2024-05-15"),
//     },
//     {
//       id: "delivery2",
//       location: "Makati City",
//       deliveryDate: new Date("2024-05-20"),
//       isDelivered: true,
//       createdAt: new Date("2024-05-15"),
//       updatedAt: new Date("2024-05-20"),
//     },
//   ],
//   category: "Sofa",
//   brand: "JMQ Furniture",
//   model: "KIVIK L-Shaped",
//   color: "Charcoal Gray",
//   material: "Fabric & Hardwood",
//   dimensions: "240x160x85 cm",
//   condition: "New",
//   isAvailable: true,
//   stockCount: 3,
//   price: 45000,
//   sellerId: "seller123",
//   seller: {
//     id: "seller123",
//     name: "Maria Santos",
//     email: "maria@example.com",
//     image: null,
//     role: "SELLER",
//     createdAt: new Date("2024-01-01"),
//     updatedAt: new Date("2024-06-01"),
//   },
//   createdAt: new Date("2024-06-01"),
//   updatedAt: new Date("2024-06-09"),
// }

interface FurnitureDataProps {
  furniture: Furniture & {
    images: FurnitureImage[]
    seller: User
  }
}

const FurnitureData = ({ furniture }: FurnitureDataProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === furniture?.images?.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? furniture?.images.length - 1 : prev - 1
    )
  }

  // Get successful deliveries
  // const successfulDeliveries = furniture?.deliveredLocations.filter(
  //   (location) => location.isDelivered
  // )

  const features = [
    {
      icon: Grid2x2,
      label: furniture?.dimensions || "Dimensions not specified",
      value: !!furniture?.dimensions,
    },
    {
      icon: Palette,
      label: furniture?.color || "Color not specified",
      value: !!furniture?.color,
    },
    {
      icon: Sofa,
      label: furniture?.material || "Material not specified",
      value: !!furniture?.material,
    },
    {
      icon: Package,
      label: furniture?.category,
      value: true,
    },
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
          <span className="text-foreground">{furniture?.name}</span>
        </nav>

        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="group relative">
              <div className="bg-muted relative aspect-square overflow-hidden rounded-lg">
                <img
                  src={furniture?.images[currentImageIndex]?.url || ""}
                  alt={furniture?.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Navigation Arrows */}
                {furniture?.images.length > 1 && (
                  <>
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
                  </>
                )}

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
                {furniture?.images.length > 1 && (
                  <div className="absolute right-4 bottom-4 rounded bg-black/50 px-2 py-1 text-sm text-white">
                    {currentImageIndex + 1} / {furniture?.images.length}
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {furniture?.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {furniture?.images.map((image, index) => (
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
                      alt={`${furniture?.name} view ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Badge variant="outline" className="w-fit">
                    {furniture?.condition}
                  </Badge>
                  <h1 className="text-3xl leading-tight font-bold">
                    {furniture?.name}
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    by {furniture?.brand}
                    {furniture?.model && ` • ${furniture?.model}`}
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

              {/* Stock Status */}
              {/* <div className="flex items-center gap-4">
                <Badge
                  variant={furniture?.isAvailable ? "default" : "destructive"}
                  className="text-xs"
                >
                  {furniture?.isAvailable
                    ? `${furniture?.stockCount} in stock`
                    : "Out of stock"}
                </Badge>
              </div> */}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="text-primary text-3xl font-bold">
                ₱{furniture?.price.toLocaleString()}
              </div>
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
                <div className="grid grid-cols-1 gap-4 text-sm">
                  {furniture?.dimensions && (
                    <div className="flex items-center gap-2">
                      <Ruler className="text-muted-foreground h-4 w-4" />
                      <span className="text-muted-foreground">Dimensions:</span>
                      <span className="font-medium">
                        {furniture?.dimensions}
                      </span>
                    </div>
                  )}
                  {furniture?.color && (
                    <div className="flex items-center gap-2">
                      <Palette className="text-muted-foreground h-4 w-4" />
                      <span className="text-muted-foreground">Color:</span>
                      <span className="font-medium">{furniture?.color}</span>
                    </div>
                  )}
                  {furniture?.material && (
                    <div className="flex items-center gap-2">
                      <Sofa className="text-muted-foreground h-4 w-4" />
                      <span className="text-muted-foreground">Material:</span>
                      <span className="font-medium">{furniture?.material}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Package className="text-muted-foreground h-4 w-4" />
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium">{furniture?.category}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <div className="bg-muted/30 space-y-3 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="text-primary h-4 w-4" />
                <span>Free delivery within Metro Manila</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="text-primary h-4 w-4" />
                <span>Ships within 4-5 business days</span>
              </div>

              {/* Show successful deliveries */}
              {/* {successfulDeliveries.length > 0 && ( */}
              <div className="mt-1 space-y-1">
                <div className="w-fit rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  ✓ Successfully Delivered
                </div>
                {/* <div className="text-muted-foreground text-xs">
                    <p>
                      Delivered to:{" "}
                      {successfulDeliveries
                        .map((loc) => loc.location)
                        .join(", ")}
                    </p>
                  </div> */}
              </div>
              {/* )} */}

              <div className="text-muted-foreground mt-2 text-xs">
                <p>
                  This item is customizable by client. If you want this same
                  product, contact us for details.
                </p>
              </div>

              <div className="mt-4 space-y-3">
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                  <p className="text-sm font-medium text-blue-800">
                    Want to customize this furniture?
                  </p>
                  <p className="mt-1 text-xs text-blue-600">
                    We offer customization services for size, color, materials,
                    and design modifications.
                  </p>
                </div>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact Us for Custom Details
                </Button>
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
                  {furniture?.seller.image ? (
                    <AvatarImage
                      src={furniture?.seller.image}
                      alt={furniture?.seller.name || ""}
                    />
                  ) : (
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {furniture?.seller.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h3 className="font-semibold">
                    {furniture?.seller.name || "Unknown Seller"}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {furniture?.seller.role === "SELLER"
                      ? "Verified Seller"
                      : furniture?.seller.role}
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
              {furniture?.description || "No description available."}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default FurnitureData
