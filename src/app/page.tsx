import Image from "next/image"
import { getUser } from "@/lib/queries"
import FurnitureItem from "@/components/furniture-item"
import SiteHeader from "@/components/site-header"

export default async function Home() {
  const user = await getUser()

  console.log(user)

  return (
    <>
      <SiteHeader />

      <main>
        <div className="grid min-h-[calc(100vh-11.5rem)] grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 p-4 sm:gap-6 sm:p-6 md:min-h-[calc(100vh-8.7rem)] md:grid-cols-[repeat(auto-fill,minmax(340px,1fr))]">
          <FurnitureItem />
          <FurnitureItem />
          <FurnitureItem />
          <FurnitureItem />
          <FurnitureItem />
          <FurnitureItem />
        </div>
      </main>
    </>
  )
}
