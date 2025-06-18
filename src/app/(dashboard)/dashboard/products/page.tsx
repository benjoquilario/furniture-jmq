import FurnitureTable from "../components/table-furniture"
import { columns } from "../components/columns"
import { Suspense } from "react"

const Products = async () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <FurnitureTable columns={columns} />
      </Suspense>
    </div>
  )
}

export default Products
