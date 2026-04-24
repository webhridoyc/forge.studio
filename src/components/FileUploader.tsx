
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
          ? "min-h-[200px] border-primary/20 bg-primary/[0.02] rounded-[2.5rem] hover:bg-primary/[0.04]" 
          : "min-h-[350px] md:min-h-[600px] border-foreground/10 hover:border-primary/40 hover:bg-foreground/[0.01] rounded-[2.5rem] md:rounded-[3.5rem]",
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
        hasAssets ? "py-8 space-y-6" : "py-10 md:py-16 space-y-10 md:space-y-16"
      )}>
        <div className={cn(
          "rounded-[2.5rem] transition-all duration-700 shadow-2xl relative flex items-center justify-center",
          hasAssets 
            ? "p-5 bg-primary text-white" 
            : "p-8 md:p-14 bg-gradient-to-br from-primary via-secondary to-accent text-white group-hover:scale-110 group-hover:rotate-6",
          isDragging && "bg-primary text-white scale-110"
        )}>
          {hasAssets ? <Plus className="w-8 h-8" /> : <Upload className="w-12 h-12 md:w-20 md:h-20" />}
          <div className="absolute -inset-6 bg-white/20 blur-3xl rounded-full -z-10 animate-pulse" />
        </div>

        <div className="space-y-4">
          <h3 className={cn(
            "font-black tracking-tighter leading-tight flex flex-col items-center",
            hasAssets ? "text-xl md:text-2xl uppercase" : "text-4xl md:text-8xl"
          )}>
            {hasAssets ? (
              <span className="flex items-center gap-3">
                <Files className="w-5 h-5 opacity-50" />
                ADD MORE ASSETS
              </span>
            ) : (
              <>
                <span className="opacity-40 group-hover:opacity-100 transition-opacity duration-500">DROP</span>
                <span className="text-gradient italic px-2 -mt-4">ASSETS</span>
              </>
            )}
          </h3>
          
          {!hasAssets && (
            <div className="flex flex-col items-center gap-6 md:gap-10 pt-6 md:pt-10">
              <p className="text-muted-foreground font-bold flex items-center gap-4 tracking-[0.3em] uppercase text-[10px] md:text-[12px] opacity-60 group-hover:opacity-100 transition-opacity">
                <MousePointer2 className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                OR CLICK TO BROWSE
              </p>
              <div className="flex items-center gap-4 md:gap-6 text-[9px] md:text-[11px] font-black tracking-widest text-muted-foreground/40">
                <span>SVG</span>
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-current" />
                <span>PNG</span>
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-current" />
                <span>JPG</span>
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-current" />
                <span>WEBP</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {isDragging && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary/10 backdrop-blur-md pointer-events-none animate-in fade-in duration-300">
          <div className="px-8 md:px-16 py-6 md:py-10 rounded-[2rem] md:rounded-[2.5rem] bg-primary text-white font-black text-2xl md:text-4xl uppercase tracking-tighter shadow-2xl animate-pulse">
            Drop to Expand
          </div>
        </div>
      )}
    </div>
  )
}
