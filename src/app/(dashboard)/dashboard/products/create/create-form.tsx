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
import { FileUploader } from "@/components/file-uploader"
import { Editor } from "./editor"
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

// Utils and Actions
import { createFurniture } from "./actions"
import { useUploadThing } from "@/lib/uploadthing"
import { type Furniture, furnitureSchema } from "@/lib/validations/furnitures"
import { furnitureFormDefaults } from "../../default"

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
  const form = useForm<Furniture>({
    resolver: zodResolver(furnitureSchema),
    defaultValues: {
      ...furnitureFormDefaults,
      pullOut: Number(furnitureFormDefaults.pullOut) || 1,
      seater: Number(furnitureFormDefaults.seater) || 1,
      price: Number(furnitureFormDefaults.price) || 0,
      stockCount: Number(furnitureFormDefaults.stockCount) || 1,
      weight: Number(furnitureFormDefaults.weight) || 0,
      selectedFile: [],
    },
  })

  // Watch form state for conditional rendering
  const watchedFiles = form.watch("selectedFile")
  const isSubmitting = form.formState.isSubmitting

  // Enhanced submit handler with better error handling
  const submit = React.useCallback(async (data: Furniture) => {
    try {
      // Show loading toast while processing

      form.reset()
    } catch (error) {
      console.error("Form submission error:", error)
    }
  }, [])

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
                    <FormLabel>Price (USD) *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
                        <Input
                          type="number"
                          placeholder="1,599"
                          className="focus:ring-primary/20 pl-10 transition-all duration-200 focus:ring-2"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Category and Condition */}
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
                        <SelectItem value="sofa">Sofa</SelectItem>
                        <SelectItem value="chair">Chair</SelectItem>
                        <SelectItem value="table">Table</SelectItem>
                        <SelectItem value="bed">Bed</SelectItem>
                        <SelectItem value="storage">Storage</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
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
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="used">Used</SelectItem>
                        <SelectItem value="refurbished">Refurbished</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="make"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand/Make *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., JMQ"
                        className="focus:ring-primary/20 transition-all duration-200 focus:ring-2"
                        {...field}
                      />
                    </FormControl>
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                name="shape"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shape</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., L-Shape, Round"
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
                name="material"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Material</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Leather, Wood"
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
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 85x85 cm"
                        className="focus:ring-primary/20 transition-all duration-200 focus:ring-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Seater and Storage Options */}
            <div className="grid gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="seater"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Seats</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field?.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select seats" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i} {i === 1 ? "Seat" : "Seats"}
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
                name="pullOut"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pull-out Sections</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field?.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pull-out sections" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[0, 1, 2, 3, 4].map((i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i} {i === 1 ? "Section" : "Sections"}
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
                name="withStorage"
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
                        Has Storage Space
                      </FormLabel>
                      <FormDescription className="text-xs">
                        Check if furniture includes storage compartments
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
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
                    <Editor {...field} />
                  </FormControl>
                  <FormDescription>
                    Describe the furniture's features, condition, and any
                    special characteristics
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
              name="selectedFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attachments</FormLabel>
                  <FormControl>
                    <FileUpload
                      value={field.value}
                      onValueChange={field.onChange}
                      accept="image/*"
                      maxFiles={4}
                      maxSize={5 * 1024 * 1024}
                      onFileReject={(_, message) => {
                        form.setError("selectedFile", {
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
                        {field.value.map((file, index) => (
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
                  </FormControl>
                  <FormDescription>
                    Upload up to 2 images up to 5MB each.
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
