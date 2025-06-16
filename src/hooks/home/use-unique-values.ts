"use client"

import { useMemo } from "react"
import { type FurnitureItem } from "@/types"

const useUniqueValues = (furniture: FurnitureItem[]) => {
  const categories = useMemo(
    () => [
      "all",
      ...Array.from(new Set(furniture.map((item) => item.category))),
    ],
    [furniture]
  )

  const conditions = useMemo(
    () => [
      "all",
      ...Array.from(new Set(furniture.map((item) => item.condition))),
    ],
    [furniture]
  )

  return { categories, conditions }
}

export { useUniqueValues }
