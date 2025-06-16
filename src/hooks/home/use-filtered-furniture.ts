"use client"

import { useMemo } from "react"
import { useFilters } from "@/hooks/home/use-filters"
import { FurnitureItem } from "@/types"

const useFilteredFurniture = (
  furniture: FurnitureItem[],
  filters: ReturnType<typeof useFilters>
) => {
  const {
    searchTerm,
    sortBy,
    filterCategory,
    filterCondition,
    filterAvailability,
  } = filters

  return useMemo(() => {
    return furniture
      .filter((item) => {
        // Search filter
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase()
          const searchableFields = [
            item.name,
            item.brand,
            item.category,
            item.description || "",
          ]
          const matchesSearch = searchableFields.some((field) =>
            field.toLowerCase().includes(searchLower)
          )
          if (!matchesSearch) return false
        }

        // Category filter
        if (
          filterCategory !== "all" &&
          item.category.toLowerCase() !== filterCategory.toLowerCase()
        ) {
          return false
        }

        // Condition filter
        if (
          filterCondition !== "all" &&
          item.condition.toLowerCase() !== filterCondition.toLowerCase()
        ) {
          return false
        }

        // Availability filter
        if (filterAvailability === "available" && !item.isAvailable)
          return false
        if (filterAvailability === "unavailable" && item.isAvailable)
          return false

        return true
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price
          case "price-high":
            return b.price - a.price
          case "name":
            return a.name.localeCompare(b.name)
          case "oldest":
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            )
          case "newest":
          default:
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
        }
      })
  }, [
    furniture,
    searchTerm,
    sortBy,
    filterCategory,
    filterCondition,
    filterAvailability,
  ])
}

export { useFilteredFurniture }
