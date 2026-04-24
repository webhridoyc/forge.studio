"use client"

import * as React from "react"
import { Upload, X, MousePointer2, Sparkles, CheckCircle2, Image as ImageIcon } from "lucide-react"
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
    if (inputRef.current) inputRef.current.value = ""
  }

  const triggerInput = (e: React.MouseEvent) => {
    if (currentFile) return
    inputRef.current?.click()
  }

  return (
    <div className="w-full">
      {currentFile ? (
        <div className="relative group overflow-hidden rounded-[2.5rem] border border-foreground/5 bg-foreground/[0.02] p-6 md:p-12 flex flex-col md:flex-row items-center gap-8 animate-in fade-in zoom-in duration-500 backdrop-blur-3xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50" />
          
          <div className="relative h-32 w-32 md:h-44 md:w-44 rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shrink-0 shadow-2xl transition-all duration-700 group-hover:scale-105 group-hover:rotate-2">
             <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
             <CheckCircle2 className="text-white w-16 h-16 md:w-20 md:h-20" />
          </div>

          <div className="relative flex-1 min-w-0 text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Sparkles className="w-5 h-5 text-accent animate-pulse" />
              <p className="text-2xl md:text-3xl font-black tracking-tight truncate text-foreground leading-tight">
                {currentFile.name}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <span className="px-4 py-1.5 rounded-full bg-primary/10 text-[10px] font-black uppercase tracking-[0.2em] text-primary border border-primary/20">
                {currentFile.type.split("/")[1] || 'IMAGE'}
              </span>
              <span className="px-4 py-1.5 rounded-full bg-accent/10 text-[10px] font-black uppercase tracking-[0.2em] text-accent border border-accent/20">
                {(currentFile.size / 1024).toFixed(1)} KB
              </span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onClear()
            }}
            className="p-6 bg-foreground/5 hover:bg-destructive text-muted-foreground hover:text-white rounded-[2rem] transition-all duration-500 hover:scale-110 active:scale-95 border border-foreground/5"
          >
            <X className="w-8 h-8" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerInput}
          className={cn(
            "relative group flex flex-col items-center justify-center w-full min-h-[500px] md:min-h-[600px] border-2 border-dashed rounded-[3.5rem] transition-all duration-700 cursor-pointer overflow-hidden",
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
            className="sr-only"
            aria-label="Upload image"
          />
          
          <div className="flex flex-col items-center justify-center py-12 text-center px-10 relative z-10 select-none space-y-12">
            <div className={cn(
              "p-14 rounded-[4rem] transition-all duration-700 shadow-2xl",
              isDragging 
                ? "bg-primary text-white scale-110" 
                : "bg-gradient-to-br from-primary via-secondary to-accent text-white group-hover:scale-110 group-hover:rotate-6"
            )}>
              <Upload className={cn("w-20 h-20 transition-transform", isDragging && "animate-bounce")} />
            </div>

            <div className="space-y-6 max-w-lg">
              <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] transition-all duration-500">
                <span className="opacity-40 group-hover:opacity-100 transition-opacity">DROP</span> <br />
                <span className="text-gradient italic">ASSET</span>
              </h3>
              
              <div className="flex flex-col items-center gap-6 pt-6">
                <p className="text-muted-foreground font-bold flex items-center gap-3 tracking-[0.4em] uppercase text-[11px] opacity-60 group-hover:opacity-100 transition-opacity">
                  <MousePointer2 className="w-4 h-4 text-accent" />
                  OR CLICK TO FORGE
                </p>
                
                <div className="flex flex-wrap justify-center gap-3">
                  {['SVG', 'PNG', 'JPG', 'WEBP'].map(ext => (
                    <span key={ext} className="px-6 py-2 rounded-full bg-foreground/5 border border-foreground/5 text-[10px] font-black text-muted-foreground tracking-widest hover:text-foreground transition-all">
                      {ext}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {isDragging && (
            <div className="absolute inset-0 flex items-center justify-center bg-primary/10 backdrop-blur-md pointer-events-none animate-in fade-in duration-300">
              <div className="px-12 py-6 rounded-full bg-primary text-white font-black text-3xl uppercase tracking-tighter shadow-2xl animate-pulse">
                Drop to Synthesis
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}