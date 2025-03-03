import { createFileRoute } from "@tanstack/react-router"
import PageContainer from "@/components/page-container"
import { Heading } from "@/components/ui/heading"
import { Link } from "@tanstack/react-router"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import SidebarContainer from "@/components/sidebar-container"
import SidebarHeader from "@/components/sidebar-header"

export const Route = createFileRoute("/dashboard/products")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarContainer>
      <PageContainer scrollable={false}>
        <div className="flex flex-1 flex-col space-y-4">
          <SidebarHeader headerTitle="Products" />
          <div className="flex items-start justify-between">
            <Heading title="Products" description="Manage products" />
            <Link
              to="/dashboard/new/products"
              className={cn(buttonVariants(), "text-xs md:text-sm")}
            >
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Link>
          </div>
          <Separator />
        </div>
      </PageContainer>
    </SidebarContainer>
  )
}
