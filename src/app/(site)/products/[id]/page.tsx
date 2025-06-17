import { getFurnitureById } from "@/lib/queries"
import FurnitureData from "./_components/furniture-data"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const furniture = await getFurnitureById(id)

  if (!furniture) {
    return {
      title: "Furniture Not Found",
      description: "The requested furniture item could not be found.",
    }
  }

  return {
    title: furniture.name,
    description:
      furniture.description || `${furniture.name} - High quality furniture`,
    openGraph: {
      title: furniture.name,
      description:
        furniture.description || `${furniture.name} - High quality furniture`,
      images: furniture.images[0],
    },
  }
}

const FurniturePage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const id = (await params).id
  const furniture = await getFurnitureById(id)

  if (!furniture) {
    return <div>Furniture not found</div>
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <FurnitureData furniture={furniture} />
    </div>
  )
}
export default FurniturePage
