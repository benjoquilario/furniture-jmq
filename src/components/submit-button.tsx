"use client"

import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending} type="submit">
      {children}
    </Button>
  )
}
