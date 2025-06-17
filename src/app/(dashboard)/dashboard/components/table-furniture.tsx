"use client"

import { useState, useCallback, useEffect, useMemo, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type ColumnDef,
} from "@tanstack/react-table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Search,
  Filter,
  Plus,
  Package,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react"
import { toast } from "sonner"
import type { Furniture, FurnitureImage, User } from "@/generated/prisma"
import {
  getFurnitureList,
  deleteFurniture,
  getFurnitureFilterOptions,
} from "../products/actions"

// Types
interface FurnitureWithRelation extends Furniture {
  images: FurnitureImage[]
  seller: User
}

interface FilterOptions {
  categories: string[]
  brands: string[]
  conditions: string[]
  priceRange: { min: number; max: number }
}

interface FurnitureTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  className?: string
}

interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalCount: number
  limit: number
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: number | null
  prevPage: number | null
}

// Constants
const DEFAULT_PAGE_SIZE = 10
const SORT_OPTIONS = [
  { value: "createdAt", label: "Date Created" },
  { value: "name", label: "Name" },
  { value: "price", label: "Price" },
] as const

const CONDITION_OPTIONS = [
  { value: "NEW", label: "New" },
  { value: "EXCELLENT", label: "Excellent" },
  { value: "GOOD", label: "Good" },
  { value: "FAIR", label: "Fair" },
  { value: "POOR", label: "Poor" },
] as const

const FurnitureTable = <TData, TValue>({
  columns,
  className,
}: FurnitureTableProps<TData, TValue>) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // Data state
  const [data, setData] = useState<FurnitureWithRelation[]>([])
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Filter state - initialize from URL params
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    brand: searchParams.get("brand") || "",
    condition: searchParams.get("condition") || "",
    isAvailable: searchParams.get("available")
      ? searchParams.get("available") === "true"
      : undefined,
    minPrice: searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined,
    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,
  })

  const [sorting, setSorting] = useState<SortingState>([
    { id: searchParams.get("sortBy") || "createdAt", desc: true },
  ])

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  )

  // Delete state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedFurnitureId, setSelectedFurnitureId] = useState<string | null>(
    null
  )
  const [selectedFurnitureName, setSelectedFurnitureName] = useState<string>("")

  // Memoized sort configuration
  const sortBy = useMemo(() => sorting[0]?.id || "createdAt", [sorting])
  const sortOrder = useMemo(
    () => (sorting[0]?.desc ? "desc" : "asc"),
    [sorting]
  )

  // Load filter options on mount
  const loadFilterOptions = useCallback(async () => {
    try {
      const result = await getFurnitureFilterOptions()
      if (result.success) {
        setFilterOptions(result.data)
      }
    } catch (error) {
      console.error("Failed to load filter options:", error)
      toast.error("Failed to load filter options")
    }
  }, [])

  console.log(data)

  // Load furniture data
  const loadData = useCallback(
    async (showLoader = true) => {
      if (showLoader) setIsLoading(true)
      else setIsRefreshing(true)

      try {
        const params = {
          page: currentPage,
          limit: DEFAULT_PAGE_SIZE,
          search: filters.search || undefined,
          category: filters.category || undefined,
          brand: filters.brand || undefined,
          condition: filters.condition || undefined,
          isAvailable: filters.isAvailable,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          sortBy: sortBy as "name" | "price" | "createdAt",
          sortOrder: sortOrder as "asc" | "desc",
        }

        const result = await getFurnitureList(params)

        if (result.success) {
          setData(result.data)
          setPagination(result.pagination)
        } else {
          toast.error("Failed to load furniture data")
        }
      } catch (error) {
        console.error("Failed to load furniture data:", error)
        toast.error("Failed to load furniture data")
      } finally {
        setIsLoading(false)
        setIsRefreshing(false)
      }
    },
    [currentPage, filters, sortBy, sortOrder]
  )

  // Update URL params when filters change
  const updateUrlParams = useCallback(() => {
    const params = new URLSearchParams()

    if (filters.search) params.set("search", filters.search)
    if (filters.category) params.set("category", filters.category)
    if (filters.brand) params.set("brand", filters.brand)
    if (filters.condition) params.set("condition", filters.condition)
    if (filters.isAvailable !== undefined)
      params.set("available", String(filters.isAvailable))
    if (filters.minPrice) params.set("minPrice", String(filters.minPrice))
    if (filters.maxPrice) params.set("maxPrice", String(filters.maxPrice))
    if (currentPage > 1) params.set("page", String(currentPage))
    if (sortBy !== "createdAt") params.set("sortBy", sortBy)
    if (sortOrder !== "desc") params.set("sortOrder", sortOrder)

    const paramString = params.toString()
    const newUrl = paramString ? `?${paramString}` : window.location.pathname

    router.replace(newUrl, { scroll: false })
  }, [filters, currentPage, sortBy, sortOrder, router])

  // Initialize data and filter options
  useEffect(() => {
    loadFilterOptions()
    loadData()
  }, [loadFilterOptions, loadData])

  // Update URL when filters change
  useEffect(() => {
    updateUrlParams()
  }, [updateUrlParams])

  // Table configuration
  const table = useReactTable({
    data: data as TData[],
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    manualPagination: true,
    pageCount: pagination?.totalPages || 0,
  })

  // Event handlers
  const handleFilterChange = useCallback(
    (key: keyof typeof filters, value: any) => {
      setFilters((prev) => ({ ...prev, [key]: value }))
      setCurrentPage(1) // Reset to first page when filters change
    },
    []
  )

  const handleSearch = useCallback(
    (value: string) => {
      handleFilterChange("search", value)
    },
    [handleFilterChange]
  )

  const handleCategoryChange = useCallback(
    (value: string) => {
      handleFilterChange("category", value === "all" ? "" : value)
    },
    [handleFilterChange]
  )

  const handleConditionChange = useCallback(
    (value: string) => {
      handleFilterChange("condition", value === "all" ? "" : value)
    },
    [handleFilterChange]
  )

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const handleRefresh = useCallback(() => {
    loadData(false)
  }, [loadData])

  const handleAddProduct = useCallback(() => {
    router.push("/dashboard/products/new")
  }, [router])

  const handleRowClick = useCallback(
    (e: React.MouseEvent, furnitureId: string) => {
      if ((e.target as HTMLElement).closest('[role="button"]')) return
      router.push(`/products/${furnitureId}`)
    },
    [router]
  )

  const openDeleteDialog = useCallback((id: string, name: string) => {
    setSelectedFurnitureId(id)
    setSelectedFurnitureName(name)
    setDeleteDialogOpen(true)
  }, [])

  const closeDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(false)
    setSelectedFurnitureId(null)
    setSelectedFurnitureName("")
  }, [])

  const handleDelete = useCallback(async () => {
    if (!selectedFurnitureId) return

    startTransition(async () => {
      try {
        const result = await deleteFurniture(selectedFurnitureId)

        if (result.success) {
          toast.success(result.message)
          closeDeleteDialog()
          loadData(false) // Reload data after successful deletion
        } else {
          toast.error(result.message)
        }
      } catch (error) {
        console.error("Failed to delete furniture:", error)
        toast.error("An unexpected error occurred")
      }
    })
  }, [selectedFurnitureId, closeDeleteDialog, loadData])

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({
      search: "",
      category: "",
      brand: "",
      condition: "",
      isAvailable: undefined,
      minPrice: undefined,
      maxPrice: undefined,
    })
    setCurrentPage(1)
    setSorting([{ id: "createdAt", desc: true }])
  }, [])

  return (
    <div className="space-y-4 px-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Furniture Inventory
          </h2>
          <p className="text-muted-foreground">
            Manage your furniture products and track deliveries
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button onClick={handleAddProduct}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="relative">
              <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-[300px] pl-8"
              />
            </div>

            {/* Category Filter */}
            <Select
              value={filters.category || "all"}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-[150px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {filterOptions?.categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Condition Filter */}
            <Select
              value={filters.condition || "all"}
              onValueChange={handleConditionChange}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                {CONDITION_OPTIONS.map((condition) => (
                  <SelectItem key={condition.value} value={condition.value}>
                    {condition.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear
            </Button>
          </div>

          {/* Results Count */}
          <div className="text-muted-foreground text-sm">
            {pagination ? (
              <>
                Showing {(pagination.currentPage - 1) * pagination.limit + 1} to{" "}
                {Math.min(
                  pagination.currentPage * pagination.limit,
                  pagination.totalCount
                )}{" "}
                of {pagination.totalCount} products
              </>
            ) : (
              "Loading..."
            )}
          </div>
        </div>

        {/* Active Filters */}
        {(filters.search || filters.category || filters.condition) && (
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground text-sm">
              Active filters:
            </span>
            {filters.search && (
              <Badge variant="secondary">Search: {filters.search}</Badge>
            )}
            {filters.category && (
              <Badge variant="secondary">Category: {filters.category}</Badge>
            )}
            {filters.condition && (
              <Badge variant="secondary">Condition: {filters.condition}</Badge>
            )}
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="bg-card rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-semibold">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((_, cellIndex) => (
                    <TableCell key={cellIndex}>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-muted/50 cursor-pointer transition-colors"
                  // onClick={(e) => handleRowClick(e, (row.original as any).id)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Package className="text-muted-foreground h-8 w-8" />
                    <div className="text-muted-foreground text-sm">
                      No furniture products found.
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Section */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-muted-foreground text-sm">
            Page {pagination.currentPage} of {pagination.totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrevPage || isLoading}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {/* Page numbers */}
            <div className="flex items-center space-x-1">
              {Array.from(
                { length: Math.min(5, pagination.totalPages) },
                (_, i) => {
                  const pageNum = i + 1
                  return (
                    <Button
                      key={pageNum}
                      variant={
                        pageNum === pagination.currentPage
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                      disabled={isLoading}
                    >
                      {pageNum}
                    </Button>
                  )
                }
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage || isLoading}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <span className="font-semibold">"{selectedFurnitureName}"</span>{" "}
              and remove all associated data including images and delivery
              records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending} onClick={closeDeleteDialog}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default FurnitureTable
