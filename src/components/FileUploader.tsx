"use client"

import * as React from "react"
import { Upload, X, MousePointer2, Sparkles, Image as ImageIcon, Files } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploaderProps {
  onFilesSelect: (files: File[]) => void
  onClear: () => void
  hasAssets: boolean
}

export function FileUploader({ onFilesSelect, onClear, hasAssets }: FileUploaderProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"))
    if (droppedFiles.length > 0) {
      onFilesSelect(droppedFiles)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []).filter(f => f.type.startsWith("image/"))
    if (selectedFiles.length > 0) {
      onFilesSelect(selectedFiles)
    }
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={cn(
        "relative group flex flex-col items-center justify-center w-full min-h-[440px] border-2 border-dashed rounded-[3rem] transition-all duration-700 cursor-pointer overflow-hidden",
        isDragging
          ? "border-primary bg-primary/5 scale-[1.01] shadow-[0_0_80px_-20px_rgba(var(--primary),0.2)]"
          : "border-foreground/10 hover:border-primary/40 hover:bg-foreground/[0.01]"
      )}
    >
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        className="sr-only"
        aria-label="Upload images"
      />
      
      <div className="flex flex-col items-center justify-center py-12 text-center px-10 relative z-10 select-none space-y-12">
        <div className={cn(
          "p-10 rounded-[3rem] transition-all duration-700 shadow-2xl relative",
          isDragging 
            ? "bg-primary text-white scale-110" 
            : "bg-gradient-to-br from-primary via-secondary to-accent text-white group-hover:scale-110 group-hover:rotate-6"
        )}>
          {hasAssets ? <Files className="w-14 h-14" /> : <Upload className="w-14 h-14" />}
          <div className="absolute -inset-4 bg-white/20 blur-2xl rounded-full -z-10 animate-pulse" />
        </div>

        <div className="space-y-2 max-w-lg">
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight flex flex-col items-center">
            <span className="opacity-40 group-hover:opacity-100 transition-opacity duration-500">DROP</span>
            <span className="text-gradient italic px-2 -mt-2">ASSETS</span>
          </h3>
          
          <div className="flex flex-col items-center gap-6 pt-6">
            <p className="text-muted-foreground font-bold flex items-center gap-3 tracking-[0.4em] uppercase text-[10px] opacity-60 group-hover:opacity-100 transition-opacity">
              <MousePointer2 className="w-4 h-4 text-accent" />
              OR CLICK TO BROWSE
            </p>
            
            <div className="flex flex-wrap justify-center gap-3">
              {['SVG', 'PNG', 'JPG', 'WEBP'].map(ext => (
                <span key={ext} className="px-5 py-2 rounded-full bg-foreground/5 border border-foreground/5 text-[9px] font-black text-muted-foreground tracking-widest hover:text-foreground hover:border-foreground/20 transition-all">
                  {ext}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {isDragging && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary/10 backdrop-blur-md pointer-events-none animate-in fade-in duration-300">
          <div className="px-12 py-6 rounded-full bg-primary text-white font-black text-2xl uppercase tracking-tighter shadow-2xl animate-pulse">
            Drop to Forge Batch
          </div>
        </div>
      )}
    </div>
  )
}
