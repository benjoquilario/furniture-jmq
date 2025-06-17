"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import type { Furniture, FurnitureImage } from "@/generated/prisma"
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Package,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useRouter } from "next/navigation"

interface ColumnActions {
  onDelete?: (id: string, name: string) => void
}

export const createColumns = (
  actions?: ColumnActions
): ColumnDef<Furniture>[] => [
  {
    accessorKey: "images",
    header: "",
    cell: ({ row }) => {
      const images = row.getValue("images") as FurnitureImage[]
      const primaryImage = images?.[0]

      return (
        <div className="flex items-center justify-center">
          <Avatar className="h-12 w-12 rounded-lg">
            <AvatarImage
              src={primaryImage?.url}
              alt={row.getValue("name")}
              className="object-cover"
            />
            <AvatarFallback className="bg-muted rounded-lg">
              <Package className="text-muted-foreground h-6 w-6" />
            </AvatarFallback>
          </Avatar>
        </div>
      )
    },
    enableSorting: false,
    size: 80,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 font-semibold hover:bg-transparent"
        >
          Product Name
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      )
    },
    cell: ({ row }) => {
      const furniture = row.original
      return (
        <div className="space-y-1">
          <div className="text-foreground font-medium">{furniture.name}</div>
          <div className="text-muted-foreground text-sm">
            {furniture.brand}
            {furniture.model && ` • ${furniture.model}`}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 font-semibold hover:bg-transparent"
        >
          Category
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <Badge variant="secondary" className="font-medium">
          {row.getValue("category")}
        </Badge>
      )
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 font-semibold hover:bg-transparent"
        >
          <DollarSign className="mr-2 h-4 w-4" />
          Price
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      )
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      }).format(price)

      return <div className="text-foreground font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "condition",
    header: "Condition",
    cell: ({ row }) => {
      const condition = row.getValue("condition") as string
      const variant =
        condition === "NEW"
          ? "default"
          : condition === "EXCELLENT"
            ? "secondary"
            : condition === "GOOD"
              ? "secondary"
              : condition === "FAIR"
                ? "destructive"
                : "outline"

      return (
        <Badge variant={variant} className="font-medium">
          {condition}
        </Badge>
      )
    },
  },
  {
    accessorKey: "isAvailable",
    header: "Status",
    cell: ({ row }) => {
      const isAvailable = row.getValue("isAvailable") as boolean
      const stockCount = row.original.stockCount

      return (
        <div className="flex items-center gap-2">
          {isAvailable ? (
            <>
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">
                Available ({stockCount})
              </span>
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium text-red-700">
                Out of Stock
              </span>
            </>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 font-semibold hover:bg-transparent"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Created
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      )
    },
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as Date
      return (
        <div className="text-muted-foreground text-sm">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </div>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const furniture = row.original
      const router = useRouter()

      const handleViewDetails = () => {
        router.push(`/products/${furniture.id}`)
      }

      const handleEditProduct = () => {
        router.push(`/dashboard/products/edit/${furniture.id}`)
      }

      const handleDeleteProduct = () => {
        if (actions?.onDelete) {
          actions.onDelete(furniture.id, furniture.name)
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="hover:bg-muted h-8 w-8 p-0 transition-colors"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleViewDetails}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleEditProduct}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Product
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-600 focus:text-red-600"
              onClick={handleDeleteProduct}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    enableSorting: false,
    enableHiding: false,
    size: 50,
  },
]

// Export default columns without actions for backward compatibility
export const columns = createColumns()
