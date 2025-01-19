"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import * as React from "react"
import { ActionState } from "@/lib/auth/middleware"
import { createFurniture } from "./actions"
import { useUploadThing } from "@/lib/uploadthing"
import { useDropzone } from "react-dropzone"
import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
  useCurrentEditor,
  EditorProvider,
} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import MenuEditor from "./editor"

const CreateForm = () => {
  const checkeboxRef = React.useRef<HTMLInputElement>(null)
  const [files, setFiles] = React.useState<File[]>([])
  const [state, formAction, pending] = React.useActionState<
    ActionState,
    FormData
  >(createFurniture, {
    error: "",
  })

  console.log(state?.error)

  const { startUpload, isUploading } = useUploadThing("imageUploader")

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  })

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),
      Placeholder.configure({
        placeholder: "Write a description...",
      }),
    ],
    immediatelyRender: false,
  })

  const descriptions = editor?.getHTML() || ""

  const submit = async (formData: FormData) => {
    if (files.length === 0) return

    const uploadResult = await startUpload(files)

    React.startTransition(() => {
      if (uploadResult) {
        uploadResult.forEach((result) => {
          formData.append("fileUrls", result.url)
        })

        formData.append("description", descriptions)

        formAction(formData)

        setFiles([])
      }
    })
  }

  return (
    <main className="mx-auto max-w-screen-lg px-4 py-10 sm:px-6">
      <form action={submit}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create Furnitures</h1>
        </div>
        <div className="mt-4 grid gap-6">
          <div className="flex w-full items-center gap-3">
            <div className="grid w-full gap-2">
              <Label htmlFor="status">Furniture Status</Label>
              <Select id="status" name="status" required>
                <option value="for-sale">For Sale</option>
              </Select>
            </div>
            <div className="grid w-full gap-2">
              <Label htmlFor="price">Selling Price</Label>
              <Input
                id="price"
                type="number"
                pattern="[0-9]*"
                name="price"
                placeholder="₱12, 500"
                aria-required
                maxLength={255}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Furnitures Name</Label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder=""
              aria-required
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="grid gap-2">
              <Label htmlFor="color">Furnitures Color</Label>
              <Input
                id="color"
                type="text"
                name="color"
                placeholder="Ex: Pale Grey"
                required
                aria-required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="shape">Furnitures Shape</Label>
              <Input
                id="shape"
                type="text"
                name="shape"
                placeholder="L Shape"
                aria-required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="size">Furnitures Size</Label>
              <Input
                id="size"
                type="text"
                name="size"
                placeholder="85x85"
                aria-required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pullOut">How many furnitures pullout have</Label>
            <Select id="pullOut" name="pullOut">
              <option value="1">1 Pullout</option>
              <option value="2">2 Pullout</option>
              <option value="3">3 Pullout</option>
              <option value="4">4 Pullout</option>
              <option value="5">5 Pullout</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="withStorage">With Storage</Label>
            <Select id="withStorage" name="withStorage">
              <option value="true">True</option>
              <option value="false">False</option>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="seater">Seater</Label>
            <Select id="seater" name="seater">
              <option value="1">1 Seater</option>
              <option value="2">2 Seater</option>
              <option value="3">3 Seater</option>
              <option value="4">4 Seater</option>
              <option value="5">5 Seater</option>
            </Select>
          </div>
          <div>
            <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Description
            </p>
            <div>
              <MenuEditor editor={editor as any} />
              <EditorContent editor={editor} />
            </div>
          </div>

          <div
            {...getRootProps()}
            className={`cursor-pointer rounded-md border-2 border-dashed p-6 text-center ${
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            <input disabled={isUploading} {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
          {files.length > 0 && (
            <div>
              <h4 className="mb-2 font-semibold">Selected Files:</h4>
              <ul className="list-disc pl-5">
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <Button type="submit" disabled={pending}>
          Create Furniture
        </Button>
      </form>
    </main>
  )
}
export default CreateForm
