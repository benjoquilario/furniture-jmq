import FurnitureTable from "../components/table-furniture"
import { columns } from "../components/columns"

const Products = async () => {
  return (
    <div>
      <FurnitureTable columns={columns} />
    </div>
  )
}

export default Products
