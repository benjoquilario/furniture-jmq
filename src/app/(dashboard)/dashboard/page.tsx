import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { getAllFurniture } from "@/lib/queries"
import { deleteFurniture } from "./actions"

const DashBoard = async () => {
  const furniture = await getAllFurniture()

  console.log(furniture)

  return (
    <div className="space-y-2">
      <div className="flex-between">
        <h1 className="h2-bold">Products</h1>
        <Button asChild variant="default">
          <Link href="/dashboard/create">Create Furnitures</Link>
        </Button>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead className="text-right">PRICE</TableHead>
              <TableHead>CATEGORY</TableHead>
              <TableHead className="w-[100px]">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {furniture?.map((furniture) => {
              const deleteHandler = deleteFurniture.bind(null, furniture.id)

              return (
                <TableRow key={furniture.id}>
                  <TableCell>{furniture.id}</TableCell>
                  <TableCell>{furniture.name}</TableCell>
                  <TableCell>
                    {/* <div className="h-10 w-10">
                      <img src={furniture.image[0]} />
                    </div> */}
                  </TableCell>
                  <TableCell className="text-right">
                    {furniture.price}
                  </TableCell>
                  <TableCell className="flex gap-1">
                    <form action={deleteHandler}>
                      <button type="submit">Delete</button>
                    </form>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/furnitures/${furniture.id}`}>
                        Edit
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/furnitures/${furniture.id}`}>
                        Edit
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/furnitures/${furniture.id}/colors`}>
                        Add Colors
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/furnitures/${furniture.id}/sizes`}>
                        Add Sizes
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
export default DashBoard
