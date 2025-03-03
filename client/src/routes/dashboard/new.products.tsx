import { createFileRoute } from "@tanstack/react-router"
import SidebarContainer from "@/components/sidebar-container"
import PageContainer from "@/components/page-container"
import SidebarHeader from "@/components/sidebar-header"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import CreateFurnitureForm from "@/components/form/create-furniture-form"
import { useSession } from "@/hooks/use-session"

export const Route = createFileRoute("/dashboard/new/products")({
  component: RouteComponent,
})

function RouteComponent() {
  const { accessToken } = useSession()

  return (
    <SidebarContainer>
      <PageContainer>
        <div className="flex flex-1 flex-col space-y-4">
          <SidebarHeader headerTitle="Create Products" headerSubtitle="New" />
          <div className="flex items-start justify-between">
            <Heading title="Create Products" description="Create new product" />
          </div>
          <Separator />

          <CreateFurnitureForm accessToken={accessToken!} />
        </div>
      </PageContainer>
    </SidebarContainer>
  )
}
