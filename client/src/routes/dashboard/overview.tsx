import { createFileRoute } from "@tanstack/react-router"
import SidebarContainer from "@/components/sidebar-container"
import SidebarHeader from "@/components/sidebar-header"

export const Route = createFileRoute("/dashboard/overview")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarContainer>
      <SidebarHeader headerTitle="Overview" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
      </div>
    </SidebarContainer>
  )
}
