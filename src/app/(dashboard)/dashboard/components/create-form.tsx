"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import {
  Loader2,
  Upload,
  Package,
  Palette,
  Shapes,
  DollarSign,
  Info,
  Image as ImageIcon,
  CloudUpload,
  X,
  Ruler,
  Scale,
  Tag,
} from "lucide-react"

// UI Components
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Custom Components
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload"

// Validation schemas and types
import {
  CreateFurnitureSchema,
  type CreateFurniture,
  // FurnitureCategory,
  FurnitureCondition,
  FurnitureMaterial,
} from "../validations/furnitures"

// Utils and Actions
import { useUploadThing } from "@/lib/uploadthing"
import { createFurniture } from "../products/actions"

// Animation variants for smooth transitions
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

// Form section component for better organization
const FormSection = ({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string
  description?: string
  icon?: React.ElementType
  children: React.ReactNode
}) => (
  <motion.div variants={itemVariants}>
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="text-primary h-5 w-5" />}
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  </motion.div>
)

const CreateForm = () => {
  // Upload handling with UploadThing
  const { startUpload, isUploading } = useUploadThing("imageUploader")

  // Form setup with validation
  const form = useForm<CreateFurniture>({
    resolver: zodResolver(CreateFurnitureSchema),
    defaultValues: {
      name: "",
      description: "",
      category: undefined,
      brand: "",
      model: "",
      color: "",
      material: undefined,
      dimensions: "",
      condition: "New",
      isAvailable: true,
      stockCount: 1,
      price: 0,
      deliveredLocation: "",
      images: [],
    },
  })

  console.log("Form errors:", form.formState.errors)

  // Watch form state for conditional rendering
  const watchedImages = form.watch("images")
  const isSubmitting = form.formState.isSubmitting

  // Enhanced submit handler with better error handling
  const submit = React.useCallback(
    async (data: CreateFurniture) => {
      try {
        console.log("Form submission data:", data)

        // Handle file upload first
        let uploadedImages: Array<{ url: string; key: string }> = []

        if (
          data.images &&
          Array.isArray(data.images) &&
          data.images.length > 0
        ) {
          const files = data.images as File[]

          const uploadResults = await startUpload(files)

          if (uploadResults && uploadResults.length > 0) {
            uploadedImages = uploadResults.map((file) => ({
              url: file.url,
              key: file.key,
            }))
          }
        }

        // Prepare data for submission
        const submitData = {
          ...data,
          images: uploadedImages,
        }

        console.log("Submit data:", submitData)

        // TODO: Call your server action here
        await createFurniture(submitData)

        toast.success("Furniture created successfully!")
        form.reset()
      } catch (error) {
        console.error("Form submission error:", error)
        toast.error("An unexpected error occurred while creating furniture")
      }
    },
    [form]
  )

  return (
    <motion.main
      className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div className="mb-8 text-center" variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Create New Furniture
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Add your furniture to the marketplace
        </p>
      </motion.div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
          {/* Basic Information Section */}
          <FormSection
            title="Basic Information"
            description="Essential details about your furniture"
            icon={Package}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Furniture Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Modern Sofa Set"
                        className="focus:ring-primary/20 transition-all duration-200 focus:ring-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (PHP) *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="1599.99"
                          className="focus:ring-primary/20 pl-10 transition-all duration-200 focus:ring-2"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Category, Condition, and Brand */}
            <div className="grid gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["Sofa Bed", "Chair", "Table"].map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Condition *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["New", "Used", "Refurbished"].map((condition) => (
                          <SelectItem key={condition} value={condition}>
                            {condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., JMQ Furniture"
                        className="focus:ring-primary/20 transition-all duration-200 focus:ring-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Model and Material */}
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Comfort Series X1"
                        className="focus:ring-primary/20 transition-all duration-200 focus:ring-2"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Specific model name or number if available
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="material"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Material</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select material" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[
                          "Wood",
                          "Metal",
                          "Fabric",
                          "Leather",
                          "Plastic",
                          "Glass",
                          "Rattan",
                          "Bamboo",
                          "Mixed",
                          "Other",
                        ].map((material) => (
                          <SelectItem key={material} value={material}>
                            {material}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </FormSection>

          {/* Physical Properties Section */}
          <FormSection
            title="Physical Properties"
            description="Describe the physical characteristics of your furniture"
            icon={Shapes}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Charcoal Gray"
                        className="focus:ring-primary/20 transition-all duration-200 focus:ring-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dimensions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dimensions</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 120x80x75 cm"
                        className="focus:ring-primary/20 transition-all duration-200 focus:ring-2"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Format: Length x Width x Height (unit)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </FormSection>

          {/* Availability & Stock Section */}
          <FormSection
            title="Availability & Stock"
            description="Manage availability and stock information"
            icon={Tag}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="stockCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Count *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1"
                        min="0"
                        max="9999"
                        className="focus:ring-primary/20 transition-all duration-200 focus:ring-2"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Number of items available for sale
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isAvailable"
                render={({ field }) => (
                  <FormItem className="flex items-center space-y-0 space-x-3 rounded-lg border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-medium">
                        Available for Sale
                      </FormLabel>
                      <FormDescription className="text-xs">
                        Mark as available for customers to purchase
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </FormSection>

          <FormSection title="Delivery Location" icon={Ruler}>
            <FormField
              control={form.control}
              name="deliveredLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter delivery location"
                      className="focus:ring-primary/20 transition-all duration-200 focus:ring-2"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Specify the location where the furniture will be delivered
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>

          {/* Description Section */}
          <FormSection
            title="Description"
            description="Provide detailed information about your furniture"
            icon={Info}
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your furniture's features, condition, and special characteristics..."
                      className="focus:ring-primary/20 min-h-[120px] transition-all duration-200 focus:ring-2"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Describe the furniture's features, condition, and any
                    special characteristics. Include details about comfort,
                    durability, weight, seater, how many pullout furniture have,
                    if extendable, shape, style(Modern), and any unique selling
                    points.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>

          {/* Images Upload Section */}
          <FormSection
            title="Images"
            description="Upload high-quality images of your furniture"
            icon={ImageIcon}
          >
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Furniture Images *
                    <span className="text-muted-foreground ml-2 text-sm font-normal">
                      (1-10 images, 5MB each)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <FileUpload
                        value={field.value}
                        onValueChange={field.onChange}
                        accept="image/*"
                        maxFiles={10}
                        maxSize={5 * 1024 * 1024}
                        onFileReject={(_, message) => {
                          form.setError("images", {
                            message,
                          })
                        }}
                        multiple
                      >
                        <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
                          <CloudUpload className="size-4" />
                          Drag and drop or
                          <FileUploadTrigger asChild>
                            <Button variant="link" size="sm" className="p-0">
                              choose files
                            </Button>
                          </FileUploadTrigger>
                          to upload
                        </FileUploadDropzone>
                        <FileUploadList>
                          {field.value &&
                            Array.isArray(field.value) &&
                            field.value.map((file, index) => (
                              <FileUploadItem key={index} value={file}>
                                <FileUploadItemPreview />
                                <FileUploadItemMetadata />
                                <FileUploadItemDelete asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-7"
                                  >
                                    <X />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </FileUploadItemDelete>
                              </FileUploadItem>
                            ))}
                        </FileUploadList>
                      </FileUpload>

                      {/* Upload Progress Indicator */}
                      <AnimatePresence>
                        {isUploading && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-background/80 absolute inset-0 flex items-center justify-center rounded-lg backdrop-blur-sm"
                          >
                            <div className="text-foreground flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span className="text-sm font-medium">
                                Uploading images...
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload clear, well-lit photos from multiple angles. Include
                    shots of: front view, side view, any special features, and
                    close-ups of materials. The first image will be the main
                    display image.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>

          {/* Submit Section */}
          <motion.div variants={itemVariants}>
            <Separator className="my-8" />
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={isSubmitting || isUploading}
              >
                Reset Form
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || isUploading}
                className="min-w-[140px] transition-all duration-200 hover:scale-105"
              >
                {isSubmitting || isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isUploading ? "Uploading..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Create Furniture
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </form>
      </Form>
    </motion.main>
  )
}

export default CreateForm
