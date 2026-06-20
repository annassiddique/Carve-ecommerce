'use client'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { X, Upload, Loader } from 'lucide-react'
import toast from 'react-hot-toast'

interface ImageUploaderProps {
  images: string[]
  onChange: (images: string[]) => void
  maxImages?: number
}

export default function ImageUploader({ images, onChange, maxImages = 8 }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (images.length >= maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`)
      return
    }

    setUploading(true)
    try {
      const newUrls: string[] = []
      for (const file of acceptedFiles.slice(0, maxImages - images.length)) {
        const fd = new FormData()
        fd.append('file', file)
        const res = await fetch('/api/upload', { method: 'POST', body: fd })
        const data = await res.json()
        if (data.success) {
          newUrls.push(data.data.url)
        } else {
          toast.error('Upload failed for ' + file.name)
        }
      }
      onChange([...images, ...newUrls])
    } finally {
      setUploading(false)
    }
  }, [images, onChange, maxImages])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: maxImages - images.length,
    disabled: uploading || images.length >= maxImages,
  })

  const removeImage = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx))
  }

  const moveUp = (idx: number) => {
    if (idx === 0) return
    const newImages = [...images]
    ;[newImages[idx - 1], newImages[idx]] = [newImages[idx], newImages[idx - 1]]
    onChange(newImages)
  }

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-sm p-8 text-center cursor-pointer transition-all ${
          isDragActive
            ? 'border-carve-gold bg-carve-champagne/20'
            : images.length >= maxImages
            ? 'border-carve-champagne/30 opacity-50 cursor-not-allowed'
            : 'border-carve-champagne hover:border-carve-gold hover:bg-carve-smoke'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          {uploading ? (
            <Loader size={24} className="text-carve-gold animate-spin" />
          ) : (
            <Upload size={24} className="text-carve-mink" />
          )}
          <p className="font-body text-sm text-carve-mink">
            {uploading
              ? 'Uploading...'
              : isDragActive
              ? 'Drop images here'
              : `Drag & drop images or click to upload (${images.length}/${maxImages})`}
          </p>
          <p className="font-body text-xs text-carve-mink/60">First image = primary / cover</p>
        </div>
      </div>

      {/* Preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <div key={i} className="relative group">
              <div className="relative aspect-square rounded-sm overflow-hidden bg-carve-smoke border border-carve-champagne">
                <Image src={img} alt={`Image ${i + 1}`} fill className="object-cover" sizes="100px" />
                {i === 0 && (
                  <div className="absolute top-1 left-1 bg-carve-gold text-carve-forest text-[9px] font-body font-bold px-1.5 py-0.5 rounded-sm">
                    Cover
                  </div>
                )}
              </div>
              <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {i > 0 && (
                  <button
                    onClick={() => moveUp(i)}
                    className="bg-carve-ivory text-carve-mink text-xs w-5 h-5 rounded-sm flex items-center justify-center shadow-sm hover:bg-carve-champagne"
                    title="Move to cover"
                  >
                    ↑
                  </button>
                )}
                <button
                  onClick={() => removeImage(i)}
                  className="bg-red-100 text-red-600 w-5 h-5 rounded-sm flex items-center justify-center shadow-sm hover:bg-red-200"
                >
                  <X size={10} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
