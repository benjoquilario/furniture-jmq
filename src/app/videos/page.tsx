import { VideoFeed } from "@/components/videos/feed"
import { VideosSidebar } from "@/components/videos/sidebar"
import { sampleVideos } from "@/lib/config/sample"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Armchair, Menu } from "lucide-react"

export default function Videos() {
  return (
    <SidebarProvider
      defaultOpen={true}
      style={
        {
          "--sidebar-width": "18rem",
          "--sidebar-width-mobile": "18rem",
        } as React.CSSProperties
      }
    >
      <div className="flex h-screen w-full">
        <VideosSidebar />
        <SidebarInset className="flex-1">
          {/* Mobile header with trigger - Always visible on mobile */}
          <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex h-14 shrink-0 items-center gap-2 border-b px-4 backdrop-blur lg:hidden">
            <SidebarTrigger className="-ml-1 h-8 w-8">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </SidebarTrigger>
            <div className="flex flex-1 items-center gap-2">
              <Armchair className="h-5 w-5" />
              <h1 className="text-lg font-semibold">JMQ Furniture Videos</h1>
            </div>
          </header>

          <main className="mr-0 flex-1 overflow-auto md:mr-60 lg:p-0">
            <VideoFeed videos={sampleVideos} />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
