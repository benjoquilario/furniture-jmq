"use client"

import Link from "next/link"
import {
  BedSingle,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowUp,
  Heart,
} from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react"

const SiteFooter = () => {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const footerLinks = {
    shop: [
      { label: "Living Room", href: "/category/living-room" },
      { label: "Bedroom", href: "/category/bedroom" },
      { label: "Dining Room", href: "/category/dining-room" },
      { label: "Office", href: "/category/office" },
      { label: "Storage", href: "/category/storage" },
      { label: "Outdoor", href: "/category/outdoor" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Our Story", href: "/story" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Blog", href: "/blog" },
      { label: "Reviews", href: "/reviews" },
    ],
    support: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "Size Guide", href: "/size-guide" },
      { label: "Care Instructions", href: "/care" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Seller Agreement", href: "/seller-terms" },
    ],
  }

  const socialLinks = [
    { Icon: Facebook, href: "#", label: "Facebook" },
    { Icon: Twitter, href: "#", label: "Twitter" },
    { Icon: Instagram, href: "#", label: "Instagram" },
    { Icon: Linkedin, href: "#", label: "LinkedIn" },
  ]

  return (
    <footer className="bg-card relative border-t">
      {/* Scroll to Top Button */}
      <Button
        onClick={scrollToTop}
        size="icon"
        className="absolute -top-6 right-8 h-12 w-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>

      {/* Newsletter Section */}
      <div className="from-primary/5 to-primary/10 border-b bg-gradient-to-r">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="mb-2 text-2xl font-bold">Stay Updated</h3>
            <p className="text-muted-foreground mb-6">
              Subscribe to get the latest furniture deals and design inspiration
            </p>
            <form
              onSubmit={handleSubscribe}
              className="mx-auto flex max-w-md gap-2"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button
                type="submit"
                className="transition-all duration-200 hover:scale-105"
                disabled={isSubscribed}
              >
                {isSubscribed ? "Subscribed!" : "Subscribe"}
              </Button>
            </form>
            {isSubscribed && (
              <p className="animate-in fade-in slide-in-from-bottom-2 mt-2 text-sm text-green-600">
                Thank you for subscribing! 🎉
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Link
                href="/"
                className="group flex items-center gap-2 text-2xl font-bold"
              >
                <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-200 group-hover:rotate-12">
                  <BedSingle className="h-6 w-6" />
                </div>
                <span className="from-primary to-primary/80 bg-gradient-to-r bg-clip-text text-transparent">
                  JMQ Furniture
                </span>
              </Link>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Your trusted marketplace for quality furniture. We connect buyers
              with the best furniture sellers across the Philippines, bringing
              comfort and style to every home.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="text-muted-foreground flex items-center gap-3 text-sm">
                <Phone className="text-primary h-4 w-4" />
                <span>+63 912 345 6789</span>
              </div>
              <div className="text-muted-foreground flex items-center gap-3 text-sm">
                <Mail className="text-primary h-4 w-4" />
                <span>hello@jmqfurniture.com</span>
              </div>
              <div className="text-muted-foreground flex items-center gap-3 text-sm">
                <MapPin className="text-primary h-4 w-4" />
                <span>Metro Manila, Philippines</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link, index) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary inline-block transition-colors duration-200 hover:translate-x-1"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary inline-block transition-all duration-200 hover:translate-x-1"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary inline-block transition-all duration-200 hover:translate-x-1"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>

            {/* App Store Badges */}
            <div className="flex gap-4">
              <div className="bg-muted text-muted-foreground hover:bg-muted/80 flex h-12 w-36 cursor-pointer items-center justify-center rounded-lg text-xs font-medium transition-colors">
                Coming Soon - App Store
              </div>
              <div className="bg-muted text-muted-foreground hover:bg-muted/80 flex h-12 w-36 cursor-pointer items-center justify-center rounded-lg text-xs font-medium transition-colors">
                Coming Soon - Google Play
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-muted/30 border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              <span>© 2024 JMQ Furniture. Made with</span>
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              <span>in the Philippines</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
