"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PhotoDropzoneProps {
  photos: string[]
  onPhotosChange: (photos: string[]) => void
}

export function PhotoDropzone({ photos, onPhotosChange }: PhotoDropzoneProps) {
  const [isDragActive, setIsDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(e.type === "dragenter" || e.type === "dragover")
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).slice(0, 5 - photos.length)
      const newPhotos = newFiles.map((file) => URL.createObjectURL(file))
      onPhotosChange([...photos, ...newPhotos])
    }
  }

  const removePhoto = (index: number) => {
    onPhotosChange(photos.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors cursor-pointer ${
          isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Upload className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">Add photos</p>
            <p className="text-sm text-muted-foreground">Drag and drop or click</p>
          </div>
        </div>
      </div>

      {/* Photo Grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {photos.map((photo, index) => (
            <div key={index} className="relative group">
              <div
                className="w-full aspect-square rounded-lg bg-muted bg-cover bg-center"
                style={{ backgroundImage: `url('${photo}')` }}
              />
              <button
                onClick={() => removePhoto(index)}
                className="absolute top-2 right-2 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Camera Button */}
      {photos.length < 5 && (
        <Button variant="outline" className="w-full h-12 rounded-full gap-2 bg-transparent" type="button">
          <Camera className="w-5 h-5" />
          Take a photo
        </Button>
      )}
    </div>
  )
}
