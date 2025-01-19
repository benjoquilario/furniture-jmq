import { Editor } from "@tiptap/react"

const MenuEditor = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => editor?.chain().focus().toggleBold().run()}
        disabled={!editor?.can().chain().focus().toggleBold().run()}
        className={editor?.isActive("bold") ? "is-active" : ""}
      >
        Bold
      </button>
    </div>
  )
}
export default MenuEditor
