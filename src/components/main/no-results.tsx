"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Search, RefreshCw } from "lucide-react"
import { ANIMATION_VARIANTS } from "@/lib/animation-variants"

const NoResults = ({ onClearFilters }: { onClearFilters: () => void }) => (
  <motion.div
    key="no-results"
    {...ANIMATION_VARIANTS.noResults}
    className="flex flex-col items-center justify-center py-16"
  >
    <div className="space-y-4 text-center">
      <div className="bg-muted mx-auto flex h-16 w-16 items-center justify-center rounded-full">
        <Search className="text-muted-foreground h-8 w-8" />
      </div>
      <h3 className="text-lg font-semibold">No furniture found</h3>
      <p className="text-muted-foreground max-w-md">
        We couldn't find any furniture matching your criteria. Try adjusting
        your filters or search terms.
      </p>
      <Button variant="outline" onClick={onClearFilters}>
        <RefreshCw className="mr-2 h-4 w-4" />
        Clear All Filters
      </Button>
    </div>
  </motion.div>
)

export { NoResults }
