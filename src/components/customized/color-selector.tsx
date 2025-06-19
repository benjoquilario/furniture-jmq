"use client"

import { useSofaStore } from "@/store/sofa"
import { cn } from "@/lib/utils"

const colorOptions = [
  { name: "Charcoal", value: "#374151" }, // Dark gray like in image 1
  { name: "Light Gray", value: "#D1D5DB" }, // Light gray like in image 3
  { name: "Navy", value: "#1E3A8A" },
  { name: "Forest", value: "#064E3B" },
  { name: "Burgundy", value: "#7F1D1D" },
  { name: "Sand", value: "#D4A76A" }, // Similar to orange pillows in image 3
]

export function ColorSelector() {
  const { color, setColor } = useSofaStore()

  return (
    <div className="mt-2 grid grid-cols-3 gap-2">
      {colorOptions.map((option) => (
        <button
          key={option.value}
          className={cn(
            "flex flex-col items-center justify-center rounded-md border p-2 transition-all",
            color === option.value
              ? "border-primary ring-primary ring-opacity-50 ring-2"
              : "border-border hover:border-primary"
          )}
          onClick={() => setColor(option.value)}
        >
          <div
            className="mb-1 h-8 w-8 rounded-full"
            style={{ backgroundColor: option.value }}
          ></div>
          <span className="text-xs">{option.name}</span>
        </button>
      ))}
    </div>
  )
}
