import { getFurnitureById } from "@/lib/queries"
import FurnitureData from "./_components/furniture-data"

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
