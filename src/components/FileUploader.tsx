
"use client"

import * as React from "react"
import { Upload, MousePointer2, Files, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploaderProps {
  onFilesSelect: (files: File[]) => void
  onClear: () => void
  hasAssets: boolean
  assetCount: number
  maxAssets: number
}

export function FileUploader({ 
  onFilesSelect, 
  onClear, 
  hasAssets, 
  assetCount, 
  maxAssets 
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const isLimitReached = assetCount >= maxAssets

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isLimitReached) return
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
    if (isLimitReached) return
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
      onClick={() => !isLimitReached && inputRef.current?.click()}
      className={cn(
        "relative group flex flex-col items-center justify-center w-full transition-all duration-700 overflow-hidden border-2 border-dashed",
        isLimitReached ? "cursor-not-allowed opacity-80" : "cursor-pointer",
        hasAssets 
          ? "min-h-[100px] border-primary/20 bg-primary/[0.02] rounded-[1.5rem] hover:bg-primary/[0.04]" 
          : "min-h-[350px] md:min-h-[600px] border-foreground/10 hover:border-primary/40 hover:bg-foreground/[0.01] rounded-[2.5rem] md:rounded-[3.5rem]",
        isDragging && !isLimitReached && "border-primary bg-primary/5 scale-[1.01] shadow-[0_0_80px_-20px_rgba(var(--primary),0.2)]"
      )}
    >
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        disabled={isLimitReached}
        className="sr-only"
        aria-label="Upload images"
      />
      
      <div className={cn(
        "flex flex-col items-center justify-center text-center relative z-10 select-none",
        hasAssets ? "flex-row gap-4 py-4" : "py-10 md:py-16 space-y-10 md:space-y-16"
      )}>
        <div className={cn(
          "rounded-[1.5rem] md:rounded-[2.5rem] transition-all duration-700 shadow-2xl relative flex items-center justify-center",
          hasAssets 
            ? isLimitReached 
              ? "p-3 bg-foreground/5 text-muted-foreground/30"
              : "p-3 bg-primary text-white" 
            : "p-8 md:p-14 bg-gradient-to-br from-primary via-secondary to-accent text-white group-hover:scale-110 group-hover:rotate-6",
          isDragging && !isLimitReached && "bg-primary text-white scale-110"
        )}>
          {hasAssets ? <Plus className="w-5 h-5" /> : <Upload className="w-12 h-12 md:w-20 md:h-20" />}
          {!hasAssets && (
            <div className="absolute -inset-6 bg-white/20 blur-3xl rounded-full -z-10 animate-pulse" />
          )}
        </div>

        <div className={cn("space-y-3", hasAssets && "space-y-0 text-left")}>
          <h3 className={cn(
            "font-black tracking-tighter leading-tight flex flex-col",
            hasAssets ? "text-xs md:text-sm uppercase" : "text-4xl md:text-8xl items-center"
          )}>
            {hasAssets ? (
              <span className={cn(
                "flex items-center gap-2",
                isLimitReached ? "opacity-30" : "opacity-100"
              )}>
                <Files className="w-3 h-3 opacity-50" />
                {isLimitReached ? "BATCH FULL" : "APPEND TO BATCH"}
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
          {hasAssets && (
            <p className={cn(
              "text-[9px] font-bold uppercase tracking-widest",
              isLimitReached ? "text-destructive/60" : "text-muted-foreground/60"
            )}>
              {isLimitReached ? "Session Limit Reached" : `Batch Limit: ${assetCount} / ${maxAssets}`}
            </p>
          )}
        </div>
      </div>
      
      {isDragging && !isLimitReached && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary/10 backdrop-blur-md pointer-events-none animate-in fade-in duration-300">
          <div className="px-8 md:px-16 py-6 md:py-10 rounded-[2rem] md:rounded-[2.5rem] bg-primary text-white font-black text-2xl md:text-4xl uppercase tracking-tighter shadow-2xl animate-pulse">
            Drop to Expand
          </div>
        </div>
      )}
    </div>
  )
}
