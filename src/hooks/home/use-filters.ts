"use client"

import { useCallback, useState } from "react"
import { SORT_OPTIONS, AVAILABILITY_OPTIONS } from "@/lib/constants"

const useFilters = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<keyof typeof SORT_OPTIONS>("newest")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterCondition, setFilterCondition] = useState("all")
  const [filterAvailability, setFilterAvailability] =
    useState<keyof typeof AVAILABILITY_OPTIONS>("all")

  const clearAllFilters = useCallback(() => {
    setSearchTerm("")
    setFilterCategory("all")
    setFilterCondition("all")
    setFilterAvailability("all")
    setSortBy("newest")
  }, [])

  return {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    filterCategory,
    setFilterCategory,
    filterCondition,
    setFilterCondition,
    filterAvailability,
    setFilterAvailability,
    clearAllFilters,
  }
}

export { useFilters }
