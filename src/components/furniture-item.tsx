"use client"

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  MapPin,
  Package,
  Heart,
  Eye,
  Star,
  Calendar,
  User as UserIcon,
  ShoppingCart,
  ArrowRight,
  Badge,
  Palette,
  Ruler,
  Tag,
} from "lucide-react"
import { Badge as BadgeComponent } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { FurnitureItem as IFurnitureItem } from "@/types"

// Animation variants
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
}

const imageVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
}

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.1, duration: 0.3 },
  },
}

const priceVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.2, duration: 0.3 },
  },
}

const FurnitureItem = ({
  brand,
  category,
  color,
  condition,
  createdAt,
  description,
  dimensions,
  id,
  images,
  isAvailable,
  material,
  model,
  name,
  price,
  stockCount,
  seller,
}: IFurnitureItem) => {
  const [isLiked, setIsLiked] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(true)

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Add quick view logic here
  }

  const formatDate = (date: Date) => {
    return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
      Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      "day"
    )
  }

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "new":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "used":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "refurbished":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="group relative"
    >
      <Link href={`/products/${id}`} className="block">
        <div className="border-border/50 bg-card hover:shadow-primary/5 relative overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:shadow-xl">
          {/* Image Container */}
          <div className="relative overflow-hidden">
            <div className="bg-muted relative aspect-[4/3]">
              {!imageError && images?.[0] ? (
                <>
                  {isImageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="border-primary h-6 w-6 rounded-full border-2 border-t-transparent"
                      />
                    </div>
                  )}
                  <motion.img
                    variants={imageVariants}
                    className="h-full w-full object-cover"
                    src={images[0].url}
                    alt={name}
                    onLoad={() => setIsImageLoading(false)}
                    onError={() => {
                      setImageError(true)
                      setIsImageLoading(false)
                    }}
                  />
                </>
              ) : (
                <div className="bg-muted flex h-full w-full items-center justify-center">
                  <Package className="text-muted-foreground h-12 w-12" />
                </div>
              )}

              {/* Gradient Overlay */}
              <motion.div
                variants={overlayVariants}
                initial="hidden"
                whileHover="visible"
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
              />

              {/* Top Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <motion.div variants={badgeVariants}>
                  <BadgeComponent
                    variant="secondary"
                    className={`${getConditionColor(condition)} border-0 font-medium shadow-sm backdrop-blur-sm`}
                  >
                    {condition}
                  </BadgeComponent>
                </motion.div>

                {!isAvailable && (
                  <motion.div variants={badgeVariants}>
                    <BadgeComponent
                      variant="destructive"
                      className="border-0 shadow-sm backdrop-blur-sm"
                    >
                      Sold Out
                    </BadgeComponent>
                  </motion.div>
                )}

                {stockCount <= 5 && isAvailable && (
                  <motion.div variants={badgeVariants}>
                    <BadgeComponent
                      variant="outline"
                      className="border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300"
                    >
                      Only {stockCount} left
                    </BadgeComponent>
                  </motion.div>
                )}
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-3 right-3 flex flex-col gap-2"
              >
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={handleLikeToggle}
                  className="h-9 w-9 shadow-sm backdrop-blur-sm transition-all hover:scale-110"
                >
                  <Heart
                    className={`h-4 w-4 transition-colors ${
                      isLiked ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={handleQuickView}
                  className="h-9 w-9 shadow-sm backdrop-blur-sm transition-all hover:scale-110"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </motion.div>

              {/* Price Badge */}
              <motion.div
                variants={priceVariants}
                initial="hidden"
                whileHover="visible"
                className="absolute right-3 bottom-3"
              >
                <div className="bg-primary rounded-lg px-3 py-2 shadow-lg backdrop-blur-sm">
                  <span className="text-primary-foreground text-sm font-bold">
                    ₱{price.toLocaleString()}
                  </span>
                </div>
              </motion.div>

              {/* Image Count Indicator */}
              {images.length > 1 && (
                <div className="absolute bottom-3 left-3">
                  <BadgeComponent
                    variant="secondary"
                    className="border-0 bg-black/50 text-white backdrop-blur-sm"
                  >
                    +{images.length - 1} more
                  </BadgeComponent>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4 p-5">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-foreground group-hover:text-primary line-clamp-2 text-lg leading-tight font-semibold transition-colors">
                  {name}
                </h3>
                <BadgeComponent variant="outline" className="shrink-0 text-xs">
                  {category}
                </BadgeComponent>
              </div>

              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <UserIcon className="h-4 w-4" />
                <span className="font-medium">{brand}</span>
                {model && (
                  <>
                    <span>•</span>
                    <span>{model}</span>
                  </>
                )}
              </div>

              {description && (
                <p className="text-muted-foreground line-clamp-2 text-sm">
                  {description}
                </p>
              )}
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2">
              {color && (
                <div className="bg-secondary text-secondary-foreground flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium">
                  <Palette className="h-3.5 w-3.5" />
                  <span>{color}</span>
                </div>
              )}

              {material && (
                <div className="bg-secondary text-secondary-foreground flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium">
                  <Tag className="h-3.5 w-3.5" />
                  <span>{material}</span>
                </div>
              )}

              {dimensions && (
                <div className="bg-secondary text-secondary-foreground flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium">
                  <Ruler className="h-3.5 w-3.5" />
                  <span>{dimensions}</span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t pt-4">
              <div className="space-y-1">
                <div className="text-muted-foreground flex items-center gap-1 text-xs">
                  <Calendar className="h-3 w-3" />
                  <span>Listed {formatDate(createdAt)}</span>
                </div>
                <p className="text-foreground text-sm font-medium">
                  By {seller.name || seller.email}
                </p>
              </div>
            </div>

            {/* CTA Button */}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default FurnitureItem
