"use client"

import * as React from "react"
import { Upload, MousePointer2, Files, Plus } from "lucide-react"
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
        "relative group flex flex-col items-center justify-center w-full transition-all duration-700 cursor-pointer overflow-hidden border-2 border-dashed",
        hasAssets 
          ? "min-h-[160px] border-primary/20 bg-primary/[0.02] rounded-[2rem] hover:bg-primary/[0.04]" 
          : "min-h-[440px] border-foreground/10 hover:border-primary/40 hover:bg-foreground/[0.01] rounded-[3rem]",
        isDragging && "border-primary bg-primary/5 scale-[1.01] shadow-[0_0_80px_-20px_rgba(var(--primary),0.2)]"
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
      
      <div className={cn(
        "flex flex-col items-center justify-center text-center relative z-10 select-none",
        hasAssets ? "py-6 space-y-4" : "py-12 space-y-12"
      )}>
        <div className={cn(
          "rounded-3xl transition-all duration-700 shadow-2xl relative flex items-center justify-center",
          hasAssets ? "p-4 bg-primary text-white" : "p-10 bg-gradient-to-br from-primary via-secondary to-accent text-white group-hover:scale-110 group-hover:rotate-6",
          isDragging && "bg-primary text-white scale-110"
        )}>
          {hasAssets ? <Plus className="w-6 h-6" /> : <Upload className="w-14 h-14" />}
          <div className="absolute -inset-4 bg-white/20 blur-2xl rounded-full -z-10 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h3 className={cn(
            "font-black tracking-tighter leading-tight flex flex-col items-center",
            hasAssets ? "text-xl uppercase" : "text-5xl md:text-7xl"
          )}>
            {hasAssets ? (
              <span className="flex items-center gap-2">
                <Files className="w-4 h-4 opacity-50" />
                ADD MORE ASSETS
              </span>
            ) : (
              <>
                <span className="opacity-40 group-hover:opacity-100 transition-opacity duration-500">DROP</span>
                <span className="text-gradient italic px-2 -mt-2">ASSETS</span>
              </>
            )}
          </h3>
          
          {!hasAssets && (
            <div className="flex flex-col items-center gap-6 pt-6">
              <p className="text-muted-foreground font-bold flex items-center gap-3 tracking-[0.4em] uppercase text-[10px] opacity-60 group-hover:opacity-100 transition-opacity">
                <MousePointer2 className="w-4 h-4 text-accent" />
                OR CLICK TO BROWSE
              </p>
            </div>
          )}
        </div>
      </div>
      
      {isDragging && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary/10 backdrop-blur-md pointer-events-none animate-in fade-in duration-300">
          <div className="px-12 py-6 rounded-full bg-primary text-white font-black text-2xl uppercase tracking-tighter shadow-2xl animate-pulse">
            Drop to Expand
          </div>
        </div>
      )}
    </div>
  )
}
