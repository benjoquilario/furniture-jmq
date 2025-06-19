"use client"

import { useState, Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import the Scene component to avoid SSR issues
const Configurator = dynamic(
  () =>
    import("@/components/customized/configurator").then((mod) => ({
      default: mod.Configurator,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="bg-background flex h-screen w-full items-center justify-center">
        <div className="text-foreground">Loading 3D Scene...</div>
      </div>
    ),
  }
)

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Configurator />
    </main>
  )
}
