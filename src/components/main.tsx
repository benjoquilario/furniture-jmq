"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import FurnitureItem from "./furniture-item"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
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

import { AVAILABILITY_OPTIONS, SORT_OPTIONS } from "@/lib/constants"

// hooks
import { useFilters } from "@/hooks/home/use-filters"
import { useFilteredFurniture } from "@/hooks/home/use-filtered-furniture"

import { useUniqueValues } from "@/hooks/home/use-unique-values"

import { NoResults } from "./main/no-results"
import { FilterBadge } from "./main/filter-badge"
import { ANIMATION_VARIANTS } from "@/lib/animation-variants"
import type { FurnitureItem as IFurnitureItem } from "@/types"

const Main = ({ data }: { data: IFurnitureItem[] }) => {
  const [furniture] = useState(data || [])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filters = useFilters()
  const filteredFurniture = useFilteredFurniture(furniture, filters)
  const { categories, conditions } = useUniqueValues(furniture)

  // Simulate loading with cleanup
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  // Memoized calculations
  const totalValue = useMemo(
    () => filteredFurniture.reduce((sum, item) => sum + item.price, 0),
    [filteredFurniture]
  )

  // Event handlers
  const handleViewModeChange = useCallback((mode: "grid" | "list") => {
    setViewMode(mode)
  }, [])

  if (loading) {
    return <LoadingSkeleton />
  }

  const hasActiveFilters =
    filters.searchTerm ||
    filters.filterCategory !== "all" ||
    filters.filterCondition !== "all" ||
    filters.filterAvailability !== "all"

  return (
    <main className="bg-background min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div {...ANIMATION_VARIANTS.header} className="mb-8 space-y-6">
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
                  value={filters.searchTerm}
                  onChange={(e) => filters.setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select
                value={filters.filterCategory}
                onValueChange={filters.setFilterCategory}
              >
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
                value={filters.filterCondition}
                onValueChange={filters.setFilterCondition}
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
                value={filters.filterAvailability}
                onValueChange={(value) =>
                  filters.setFilterAvailability(
                    value as "all" | "available" | "unavailable"
                  )
                }
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(AVAILABILITY_OPTIONS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select
                value={filters.sortBy}
                onValueChange={(value) =>
                  filters.setSortBy(value as typeof filters.sortBy)
                }
              >
                <SelectTrigger className="w-[160px]">
                  <SlidersHorizontal className="h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(SORT_OPTIONS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* View Mode & Clear Filters */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={filters.clearAllFilters}
                className="shrink-0"
                disabled={!hasActiveFilters}
              >
                <RefreshCw className="h-4 w-4" />
                Clear
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => handleViewModeChange("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => handleViewModeChange("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {filters.searchTerm && (
                <FilterBadge
                  label="Search"
                  value={filters.searchTerm}
                  onRemove={() => filters.setSearchTerm("")}
                />
              )}
              {filters.filterCategory !== "all" && (
                <FilterBadge
                  label="Category"
                  value={filters.filterCategory}
                  onRemove={() => filters.setFilterCategory("all")}
                />
              )}
              {filters.filterCondition !== "all" && (
                <FilterBadge
                  label="Condition"
                  value={filters.filterCondition}
                  onRemove={() => filters.setFilterCondition("all")}
                />
              )}
              {filters.filterAvailability !== "all" && (
                <FilterBadge
                  label="Availability"
                  value={AVAILABILITY_OPTIONS[filters.filterAvailability]}
                  onRemove={() => filters.setFilterAvailability("all")}
                />
              )}
            </div>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              Showing {filteredFurniture.length} of {furniture.length} items
            </p>
            {filteredFurniture.length > 0 && (
              <p className="text-muted-foreground text-sm">
                Total value: ₱{totalValue.toLocaleString()}
              </p>
            )}
          </div>
        </motion.div>

        {/* Furniture Grid */}
        <AnimatePresence mode="wait">
          {filteredFurniture.length > 0 ? (
            <motion.div
              key="furniture-grid"
              variants={ANIMATION_VARIANTS.container}
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
                  variants={ANIMATION_VARIANTS.item}
                  layout
                  layoutId={item.id}
                >
                  <FurnitureItem {...item} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <NoResults onClearFilters={filters.clearAllFilters} />
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

const LoadingSkeleton = () => (
  <main className="bg-background min-h-[calc(100vh-4rem)]">
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <div className="bg-muted h-8 w-64 animate-pulse rounded" />
        <div className="bg-muted h-6 w-96 animate-pulse rounded" />
        <div className="flex gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-muted h-10 w-32 animate-pulse rounded" />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-4 rounded-lg border p-4">
            <div className="bg-muted aspect-[4/3] animate-pulse rounded" />
            <div className="space-y-2">
              <div className="bg-muted h-4 animate-pulse rounded" />
              <div className="bg-muted h-4 w-2/3 animate-pulse rounded" />
              <div className="bg-muted h-6 w-1/3 animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </main>
)

export default Main
