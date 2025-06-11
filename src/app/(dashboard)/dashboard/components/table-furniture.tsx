"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Define the furniture type based on your schema
export type Furniture = {
  id: string
  name: string
  description?: string
  measurements?: string
  pullOut?: number
  withStorage?: boolean
  shape?: string
  size?: string
  color?: string
  cover?: string
  seater: number
  sellerId: string
  price: number
  status?: string
  make: string
  model?: string
  category: string
  condition: string
  material?: string
  style?: string
  weight?: number
  dimensions?: string
  isAvailable: boolean
  stockCount?: number
  createdAt: Date
  updatedAt: Date
  selectedFile: Array<{ id: string; url: string; key: string }>
  seller: { id: string; name?: string; email: string; image?: string }
}

// Status badge component with animations
const StatusBadge = ({
  status,
  isAvailable,
}: {
  status?: string
  isAvailable: boolean
}) => {
  const getStatusConfig = () => {
    if (!isAvailable)
      return { variant: "destructive" as const, text: "Out of Stock" }
    if (status === "sold")
      return { variant: "secondary" as const, text: "Sold" }
    if (status === "pending")
      return { variant: "outline" as const, text: "Pending" }
    return { variant: "default" as const, text: "Available" }
  }

  const config = getStatusConfig()

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Badge variant={config.variant}>{config.text}</Badge>
    </motion.div>
  )
}

// Condition badge component
const ConditionBadge = ({ condition }: { condition: string }) => {
  const getVariant = () => {
    switch (condition.toLowerCase()) {
      case "new":
        return "default" as const
      case "used":
        return "secondary" as const
      case "refurbished":
        return "outline" as const
      default:
        return "secondary" as const
    }
  }

  return (
    <Badge variant={getVariant()} className="capitalize">
      {condition}
    </Badge>
  )
}

// Image preview component
const ImagePreview = ({ images }: { images: Array<{ url: string }> }) => {
  if (!images || images.length === 0) {
    return (
      <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-md">
        <span className="text-muted-foreground text-xs">No Image</span>
      </div>
    )
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="relative h-12 w-12 overflow-hidden rounded-md"
    >
      <img
        src={images[0].url}
        alt="Furniture"
        className="h-full w-full object-cover"
      />
      {images.length > 1 && (
        <div className="bg-primary text-primary-foreground absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full text-xs">
          +{images.length - 1}
        </div>
      )}
    </motion.div>
  )
}

// Define columns
export const columns: ColumnDef<Furniture>[] = [
  {
    accessorKey: "selectedFile",
    header: "Image",
    cell: ({ row }) => <ImagePreview images={row.getValue("selectedFile")} />,
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 hover:bg-transparent"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const furniture = row.original
      return (
        <div className="space-y-1">
          <div className="font-medium">{furniture.name}</div>
          <div className="text-muted-foreground text-sm">
            {furniture.make} {furniture.model && `- ${furniture.model}`}
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
          className="h-auto p-0 hover:bg-transparent"
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.getValue("category")}
      </Badge>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 hover:bg-transparent"
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "condition",
    header: "Condition",
    cell: ({ row }) => <ConditionBadge condition={row.getValue("condition")} />,
  },
  {
    accessorKey: "isAvailable",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge
        status={row.original.status}
        isAvailable={row.getValue("isAvailable")}
      />
    ),
  },
  {
    accessorKey: "stockCount",
    header: "Stock",
    cell: ({ row }) => {
      const stock = row.getValue("stockCount") as number
      return (
        <div className="text-center">
          <span
            className={stock && stock > 0 ? "text-green-600" : "text-red-600"}
          >
            {stock || 0}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "seller",
    header: "Seller",
    cell: ({ row }) => {
      const seller = row.getValue("seller") as Furniture["seller"]
      return (
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={seller.image} />
            <AvatarFallback>
              {seller.name?.charAt(0) || seller.email.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-medium">
              {seller.name || "Unknown"}
            </div>
            <div className="text-muted-foreground text-xs">{seller.email}</div>
          </div>
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
          className="h-auto p-0 hover:bg-transparent"
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return format(new Date(row.getValue("createdAt")), "MMM dd, yyyy")
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const furniture = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(furniture.id)}
            >
              Copy furniture ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit furniture
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete furniture
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

interface FurnitureTableProps {
  data: Furniture[]
  isLoading?: boolean
}

export function FurnitureTable({
  data,
  isLoading = false,
}: FurnitureTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between">
          <div className="bg-muted h-10 w-80 animate-pulse rounded-md" />
          <div className="bg-muted h-10 w-32 animate-pulse rounded-md" />
        </div>
        <div className="rounded-md border">
          <div className="bg-muted h-12 animate-pulse" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-muted/50 h-16 animate-pulse border-t" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="w-full space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Search furniture..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm pl-10"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Filter by category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* Add category filters here */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <motion.div
        className="rounded-md border"
        layout
        transition={{ duration: 0.3 }}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors"
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </motion.tr>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      No furniture found.
                    </motion.div>
                  </TableCell>
                </TableRow>
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </motion.div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
