"use client"

import { Badge } from "@/components/ui/badge"

const FilterBadge = ({
  label,
  value,
  onRemove,
}: {
  label: string
  value: string
  onRemove: () => void
}) => (
  <Badge variant="secondary" className="gap-1">
    {label}: {value}
    <button
      onClick={onRemove}
      className="hover:bg-muted-foreground/20 ml-1 rounded-full p-0.5"
      aria-label={`Remove ${label} filter`}
    >
      ×
    </button>
  </Badge>
)

export { FilterBadge }
