"use client"

import * as React from "react"
import { Upload, ImageIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploaderProps {
  onFileSelect: (file: File) => void
  onClear: () => void
  currentFile: File | null
}

export function FileUploader({ onFileSelect, onClear, currentFile }: FileUploaderProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      onFileSelect(file)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileSelect(file)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      {currentFile ? (
        <div className="relative group overflow-hidden rounded-xl border-2 border-primary/20 bg-card p-4 flex items-center gap-4 animate-in fade-in zoom-in duration-300">
          <div className="h-16 w-16 rounded-md overflow-hidden bg-muted flex items-center justify-center shrink-0">
            <ImageIcon className="text-muted-foreground w-8 h-8" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{currentFile.name}</p>
            <p className="text-xs text-muted-foreground">
              {(currentFile.size / 1024).toFixed(2)} KB • {currentFile.type.split("/")[1].toUpperCase()}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClear()
            }}
            className="p-2 hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "relative group flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-2xl transition-all cursor-pointer",
            isDragging
              ? "border-primary bg-primary/5 scale-[1.01]"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          )}
        >
          <input
            type="file"
            ref={inputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
            <div className={cn(
              "mb-4 p-4 rounded-full transition-transform group-hover:scale-110",
              isDragging ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
            )}>
              <Upload className="w-8 h-8" />
            </div>
            <p className="mb-2 text-lg font-headline font-semibold">
              <span className="text-primary">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm text-muted-foreground">
              SVG, PNG, JPG or WEBP (Max 5MB for best performance)
            </p>
          </div>
        </div>
      )}
    </div>
  )
}