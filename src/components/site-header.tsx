"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"
import {
  BedSingle,
  Users,
  Menu,
  User,
  X,
  Search,
  ShoppingCart,
} from "lucide-react"
import { Button, buttonVariants } from "./ui/button"
// import { useUser } from "@/lib/auth"
import { useState } from "react"

const SiteHeader = () => {
  // const { session: user } = useUser()
  const [isOpen, setIsOpen] = useState(false)

  const navigationItems = [
    { href: "/", icon: BedSingle, label: "Furniture" },
    { href: "/customize", icon: Users, label: "Customize" },
    { href: "/about", icon: User, label: "About Us" },
  ]

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="group flex items-center gap-2 text-2xl font-bold transition-all duration-200 hover:scale-105"
          >
            <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-200 group-hover:rotate-12">
              <BedSingle className="h-5 w-5" />
            </div>
            <span className="from-primary to-primary/80 bg-gradient-to-r bg-clip-text text-transparent">
              JMQ
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-8 lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200"
            >
              <item.icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <Button
            variant="ghost"
            size="icon"
            className="relative transition-all duration-200 hover:scale-110"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative transition-all duration-200 hover:scale-110"
          >
            <ShoppingCart className="h-5 w-5" />
            {/* <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-xs">
              3
            </span> */}
          </Button>

          <div className="bg-border h-6 w-px" />

          {/* {user ? (
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium">
                {user.name?.charAt(0) || "U"}
              </div>
              <span className="text-sm font-medium">{user.name}</span>
            </div>
          ) : ( */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="transition-all duration-200 hover:scale-105"
            >
              Login
            </Button>
            <Button className="transition-all duration-200 hover:scale-105">
              Sign Up
            </Button>
          </div>
          {/* )} */}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="transition-all duration-200 hover:scale-110"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative transition-all duration-200 hover:scale-110"
          >
            <ShoppingCart className="h-5 w-5" />
            {/* <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-xs">
              3
            </span> */}
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="transition-all duration-200 hover:scale-110"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] px-0">
              <SheetHeader className="px-6 pb-4">
                <SheetTitle className="flex items-center gap-2 text-left">
                  <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg">
                    <BedSingle className="h-5 w-5" />
                  </div>
                  <span className="text-xl font-bold">JMQ Furniture</span>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col">
                {/* User Section */}
                {/* {user ? (
                  <div className="border-b px-6 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full font-medium">
                        {user.name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-muted-foreground text-sm">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : ( */}
                <div className="border-b px-6 pb-4">
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/login"
                      className={buttonVariants({
                        variant: "outline",
                        className: "w-full justify-start",
                      })}
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Button className="w-full" onClick={() => setIsOpen(false)}>
                      Sign Up
                    </Button>
                  </div>
                </div>
                {/* )} */}

                {/* Navigation */}
                <div className="flex flex-col py-4">
                  {navigationItems.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="hover:bg-accent hover:text-accent-foreground flex items-center gap-3 px-6 py-3 text-base font-medium transition-colors"
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>

                {/* Additional Actions */}
                <div className="border-t px-6 pt-4">
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={() => setIsOpen(false)}
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start"
                      onClick={() => setIsOpen(false)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Cart (3)
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

export default SiteHeader
