"use client"

import * as React from "react"
import { Upload, ImageIcon, X, MousePointer2 } from "lucide-react"
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
    <div className="w-full">
      {currentFile ? (
        <div className="relative group overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 p-6 flex items-center gap-6 animate-in fade-in zoom-in duration-300 backdrop-blur-md">
          <div className="h-20 w-20 rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0 shadow-xl shadow-primary/20">
            <ImageIcon className="text-white w-10 h-10" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-bold truncate mb-1">{currentFile.name}</p>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-black uppercase text-accent">
                {currentFile.type.split("/")[1]}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                {(currentFile.size / 1024).toFixed(2)} KB
              </span>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClear()
            }}
            className="p-3 bg-white/5 hover:bg-destructive/20 text-muted-foreground hover:text-destructive rounded-2xl transition-all hover:scale-110 border border-white/5"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "relative group flex flex-col items-center justify-center w-full h-80 border-2 border-dashed rounded-[1.5rem] transition-all cursor-pointer overflow-hidden",
            isDragging
              ? "border-primary bg-primary/10 scale-[1.02]"
              : "border-white/10 hover:border-primary/50 hover:bg-white/5"
          )}
        >
          {/* Animated background blobs */}
          <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[100px] group-hover:bg-primary/20 transition-all duration-500" />
          <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[100px] group-hover:bg-secondary/20 transition-all duration-500" />

          <input
            type="file"
            ref={inputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-8 relative z-10">
            <div className={cn(
              "mb-6 p-6 rounded-3xl transition-all duration-500 shadow-2xl group-hover:rotate-6",
              isDragging 
                ? "bg-primary text-white scale-110" 
                : "bg-gradient-to-br from-primary to-secondary text-white"
            )}>
              <Upload className="w-10 h-10" />
            </div>
            <h3 className="mb-2 text-3xl font-black tracking-tight leading-tight">
              DROP YOUR <span className="text-primary italic">ASSET</span> HERE
            </h3>
            <p className="text-muted-foreground font-medium flex items-center gap-2">
              <MousePointer2 className="w-4 h-4" />
              Or click to browse your file system
            </p>
            <div className="mt-8 flex gap-3">
              {['SVG', 'PNG', 'JPG', 'WEBP'].map(ext => (
                <span key={ext} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black text-muted-foreground">
                  {ext}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
