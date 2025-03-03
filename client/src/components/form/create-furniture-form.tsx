import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Editor } from "@/components/editor"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type Furniture, furnitureSchema } from "@/lib/validations/furnitures"
import { toast } from "sonner"
import { useUploadThing } from "@/lib/uploadthing"
import { defaultValues } from "@/config/default"
import { createFurniture } from "@/lib/services/furniture-service"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FileUploader } from "@/components/file-uploader"

const CreateFurnitureForm = ({ accessToken }: { accessToken: string }) => {
  const { startUpload, isUploading } = useUploadThing("imageUploader")

  const form = useForm<Furniture>({
    resolver: zodResolver(furnitureSchema),
    defaultValues,
  })

  const submit = async (formData: Furniture) => {
    toast.promise(
      startUpload((formData.selectedFile as File[]) ?? []).then((data) => {
        return createFurniture(
          {
            ...formData,
            selectedFile: data
              ? data?.map((file) => {
                  return {
                    url: file.ufsUrl,
                    name: file.name,
                    type: file.type,
                    key: file.key,
                  }
                })
              : [],
          },
          accessToken
        )
      }),
      {
        loading: "Creating furniture...",
        success: () => {
          form.reset()
          return "Furniture created successfully"
        },
        error: (err) => {
          return err.toString()
        },
      }
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create Furnitures</h1>
        </div>
        <div className="flex w-full flex-col items-start gap-3">
          <div className="mt-4 grid grid-cols-3 gap-6">
            <div className="grid w-full gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Furnitures Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid w-full gap-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Selling Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="16000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Furnitures Color</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Pale Grey" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="shape"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Furnitures Shape</FormLabel>
                    <FormControl>
                      <Input placeholder="L Shape" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="cover"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Furnitures Cover</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Furnitures Size</FormLabel>
                    <FormControl>
                      <Input placeholder="85x85" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="pullOut"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How many furnitures pullout have</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field?.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a how many furnitures have" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4].map((i) => (
                          <SelectItem key={i * 10} value={i.toString()}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="withStorage"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>With Storage</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="seater"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seater</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field?.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a how many seater" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="mt-3">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Editor {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="selectedFile"
          render={({ field }) => (
            <div className="space-y-6">
              <FormItem className="w-full">
                <FormLabel>Selected Images</FormLabel>
                <FormControl>
                  <FileUploader
                    value={(field.value as File[]) ?? []}
                    onValueChange={field.onChange}
                    maxFileCount={4}
                    maxSize={4 * 1024 * 1024}
                    // progresses={progresses}
                    // pass the onUpload function here for direct upload
                    // onUpload={uploadFiles}
                    disabled={isUploading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
        <Button type="submit">Create Furniture</Button>
      </form>
    </Form>
  )
}
export default CreateFurnitureForm
