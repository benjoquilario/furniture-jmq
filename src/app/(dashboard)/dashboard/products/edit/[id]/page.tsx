import { getFurnitureById } from "@/lib/queries"
import EditForm from "../../../components/edit-form"
import { Suspense } from "react"

const EditProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  const furnitureData = await getFurnitureById(id)

  if (!furnitureData) {
    return <div>Furniture not found</div>
  }

  return (
    <div>
      EditProductPage
      <Suspense>
        <EditForm furniture={furnitureData} />
      </Suspense>
    </div>
  )
}
export default EditProductPage
