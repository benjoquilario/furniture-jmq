"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  BedSingle,
  Users,
  User,
  Search,
  ShoppingCart,
  Home,
  Heart,
  MessageCircle,
  Plus,
  Video,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function VideosSidebar() {
  const navigationItems = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Furniture",
      url: "/furniture",
      icon: BedSingle,
    },
    {
      title: "Customize",
      url: "/customize",
      icon: Users,
    },
    {
      title: "About Us",
      url: "/about",
      icon: User,
    },
    {
      title: "Videos",
      url: "/videos",
      icon: Video,
      isActive: true,
    },
    {
      title: "Favorites",
      url: "/favorites",
      icon: Heart,
    },
  ]

  const quickActions = [
    {
      title: "Search",
      url: "/search",
      icon: Search,
    },
    {
      title: "Cart",
      url: "/cart",
      icon: ShoppingCart,
      badge: "3",
    },
    {
      title: "Favorites",
      url: "/favorites",
      icon: Heart,
    },
    {
      title: "Support",
      url: "/support",
      icon: MessageCircle,
    },
  ]

  const suggestedUsers = [
    {
      id: "1",
      name: "Interior Pro",
      username: "interiorpro",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      followers: "12.3K",
      isFollowing: false,
    },
    {
      id: "2",
      name: "DIY Master",
      username: "diymaster",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      followers: "8.7K",
      isFollowing: true,
    },
    {
      id: "3",
      name: "Home Stylist",
      username: "homestylist",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      followers: "15.2K",
      isFollowing: false,
    },
  ]

  return (
    <Sidebar
      variant="sidebar"
      className="border-r lg:flex"
      collapsible="offcanvas"
      side="left"
    >
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/videos">
                <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <BedSingle className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">JMQ Furniture</span>
                  <span className="truncate text-xs">Videos & Design</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {/* Navigation */}
        <SidebarGroup>
          <div className="p-2">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search videos..."
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border px-8 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              />
            </div>
          </div>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <Link href={item.url}>
                      <item.icon
                        className={`h-4 w-4 ${item.isActive ? "text-primary" : ""}`}
                      />
                      <span
                        className={`${item.isActive ? "text-primary font-semibold" : ""}`}
                      >
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        {/* <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickActions.map((action) => (
                <SidebarMenuItem key={action.title}>
                  <SidebarMenuButton asChild>
                    <Link href={action.url}>
                      <action.icon className="h-4 w-4" />
                      <span>{action.title}</span>
                      {action.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {action.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}

        {/* Suggested Creators */}
        {/* <SidebarGroup>
          <SidebarGroupLabel>Suggested Creators</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {suggestedUsers.map((user) => (
                <SidebarMenuItem key={user.id}>
                  <SidebarMenuButton asChild>
                    <div className="flex cursor-pointer items-center gap-2 p-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="text-xs">
                          {user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">
                          {user.name}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {user.followers} followers
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant={user.isFollowing ? "secondary" : "default"}
                        className="h-6 px-2 text-xs"
                        onClick={(e) => e.preventDefault()}
                      >
                        {user.isFollowing ? "Following" : "Follow"}
                      </Button>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}

        {/* Create Button */}
        {/* <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button className="w-full justify-start gap-2">
                    <Plus className="h-4 w-4" />
                    Create Post
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
