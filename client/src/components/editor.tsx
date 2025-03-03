import * as React from "react"

import "react-quill-new/dist/quill.snow.css"

interface EditorProps {
  onChange?: (value: string) => void
  value?: string
}

export function Editor({ onChange, value }: EditorProps) {
  const [hasMounted, setHasMounted] = React.useState(false)

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  const ReactQuill = React.useMemo(
    () => React.lazy(() => import("react-quill-new")),
    []
  )

  return (
    <div className="bg-transparent">
      {hasMounted ? (
        <ReactQuill value={value} onChange={onChange} theme="snow" />
      ) : null}
    </div>
  )
}
