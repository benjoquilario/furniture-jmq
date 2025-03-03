import { createFileRoute } from "@tanstack/react-router"
import { useSession } from "@/hooks/use-session"
import Header from "@/components/layout/site-header"
import FurnitureItem from "@/components/furniture-item"
import Footer from "@/components/layout/site-footer"
import StoreFront from "@/components/layout/store-front"

export const Route = createFileRoute("/home")({
  component: Home,
})

function Home() {
  const { accessToken } = useSession()

  console.log(accessToken)

  return (
    <div className="p-2">
      <Header />

      <main>
        <StoreFront />

        <div className="mt-28">
          <h4 className="px-6 pt-6 pb-3 text-2xl font-semibold">
            Latest Deliveries
          </h4>
          <div className="grid min-h-[calc(100vh-11.5rem)] grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 p-4 sm:gap-6 sm:p-6 md:min-h-[calc(100vh-8.7rem)] md:grid-cols-[repeat(auto-fill,minmax(340px,1fr))]">
            <FurnitureItem />
            <FurnitureItem />
            <FurnitureItem />
            <FurnitureItem />
            <FurnitureItem />
            <FurnitureItem />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
