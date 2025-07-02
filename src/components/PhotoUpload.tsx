import { useState } from 'preact/hooks'

type PhotoUploadProps = {
  onPhotoChange: (photo: string) => void
}

export function PhotoUpload({ onPhotoChange }: PhotoUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return alert('Please select an image')
    if (file.size > 5 * 1024 * 1024) return alert('Max file size is 5MB')

    const reader = new FileReader()
    reader.onload = (e) => {
      onPhotoChange(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleFile = (files: FileList | null) => {
    if (files?.[0]) processFile(files[0])
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-slate-200">Photo</label>
      <input
        id="photo-input"
        type="file"
        accept="image/*"
        className="text-slate-200"
        onChange={(e) => handleFile(e.currentTarget.files)}
      />
      <button
        className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition ${
          isDragOver
            ? 'border-fuchsia-400 bg-fuchsia-400/10'
            : 'border-slate-500 hover:border-fuchsia-400 hover:bg-fuchsia-400/10'
        }`}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragOver(true)
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragOver(false)
          if (e.dataTransfer) {
            handleFile(e.dataTransfer.files)
          }
        }}
        onClick={() => document.getElementById('photo-input')?.click()}
      >
        <div className="flex flex-col items-center gap-2 text-white">
          <div className="w-10 h-10 border-2 text-gray-400 border-gray-400 rounded-full flex items-center justify-center">
            <span className="w-10 h-10 text-center leading-9.5 text-xl align-center">
              +
            </span>
          </div>
          <p>Upload photo</p>
          <p className="text-slate-400 text-xs">
            Drag & drop or click to select
          </p>
        </div>
      </button>
    </div>
  )
}
