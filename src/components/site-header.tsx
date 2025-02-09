"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"
import { BedSingle, Users, Menu, User } from "lucide-react"
import { Button, buttonVariants } from "./ui/button"
import { useUser } from "@/lib/auth"

const SiteHeader = () => {
  const { session: user } = useUser()

  console.log(user)

  return (
    <header className="w-full border-b bg-background">
      <nav className="mx-auto flex h-[calc(3.75rem-1px)] max-w-screen-2xl items-center justify-between p-4 sm:px-6">
        <div className="flex items-center justify-center">
          <Link href="/" className="text-3xl font-bold">
            JMQ
          </Link>
        </div>
        <div className="flex items-center">
          <ul className="hidden items-center gap-3 lg:flex">
            <li>
              <Link className="flex items-center gap-1" href="/">
                <BedSingle />
                <span className="text-sm text-muted-foreground">Furniture</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-1" href="/">
                <Users />
                <span className="text-sm text-muted-foreground">Seller</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-1" href="/">
                <User />
                <span className="text-sm text-muted-foreground">About Us</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="outline">Login</Button>
          <Button>Sign Up</Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="flex lg:hidden" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[250px] px-0">
            <SheetHeader>
              <SheetTitle className="sr-only">Navigate</SheetTitle>
            </SheetHeader>
            <div className="relative min-h-full py-12">
              <div className="flex flex-col gap-1 p-4">
                <Link className="flex items-center gap-2 px-2 text-lg" href="/">
                  <BedSingle />
                  <span className="text-foreground">Furniture</span>
                </Link>

                <Link className="flex items-center gap-2 px-2 text-lg" href="/">
                  <Users />
                  <span className="text-foreground"> Seller</span>
                </Link>

                <Link className="flex items-center gap-2 px-2 text-lg" href="/">
                  <User />
                  <span className="text-foreground">About Us</span>
                </Link>
                <div className="mt-3 flex w-full items-center gap-2">
                  <Link
                    href="/login"
                    className={buttonVariants({ variant: "outline" })}
                  >
                    Login
                  </Link>
                  <Button className="w-full">Sign Up</Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}

export default SiteHeader
