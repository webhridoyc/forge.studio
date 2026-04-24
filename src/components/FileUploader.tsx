"use client"

import * as React from "react"
import { Upload, ImageIcon, X, MousePointer2, Sparkles } from "lucide-react"
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
        <div className="relative group overflow-hidden rounded-[2rem] border border-white/20 bg-white/5 p-8 flex items-center gap-8 animate-in fade-in zoom-in duration-500 backdrop-blur-2xl">
          <div className="h-24 w-24 rounded-[1.5rem] overflow-hidden bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0 shadow-2xl shadow-primary/30 transition-transform duration-500 group-hover:scale-105">
            <ImageIcon className="text-white w-12 h-12" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <p className="text-xl font-black tracking-tight truncate text-foreground">{currentFile.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-lg bg-white/10 text-[10px] font-black uppercase tracking-widest text-accent border border-white/10">
                {currentFile.type.split("/")[1]}
              </span>
              <span className="text-xs text-muted-foreground font-bold tracking-tight">
                {(currentFile.size / 1024).toFixed(2)} KB
              </span>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClear()
            }}
            className="p-4 bg-white/5 hover:bg-destructive/20 text-muted-foreground hover:text-destructive rounded-2xl transition-all duration-300 hover:scale-110 active:scale-90 border border-white/10"
          >
            <X className="w-7 h-7" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "relative group flex flex-col items-center justify-center w-full h-[450px] border-2 border-dashed rounded-[2.5rem] transition-all duration-500 cursor-pointer overflow-hidden",
            isDragging
              ? "border-primary bg-primary/20 scale-[1.02] shadow-[0_0_50px_-12px_rgba(var(--primary),0.5)]"
              : "border-white/25 hover:border-primary/60 hover:bg-primary/5 bg-white/[0.02]"
          )}
        >
          {/* Hardware accelerated background effects - made more visible */}
          <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-primary/20 rounded-full blur-[100px] group-hover:bg-primary/30 transition-all duration-700 pointer-events-none animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-secondary/20 rounded-full blur-[100px] group-hover:bg-secondary/30 transition-all duration-700 pointer-events-none animate-pulse delay-700" />

          <input
            type="file"
            ref={inputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-12 relative z-10">
            <div className={cn(
              "mb-10 p-10 rounded-[2.5rem] transition-all duration-700 shadow-2xl group-hover:rotate-12 group-hover:scale-110",
              isDragging 
                ? "bg-primary text-white scale-125 rotate-0 shadow-primary/50" 
                : "bg-gradient-to-br from-primary via-secondary to-accent text-white"
            )}>
              <Upload className="w-16 h-16" />
            </div>
            <h3 className="mb-6 text-5xl font-black tracking-tighter leading-tight uppercase group-hover:text-primary transition-colors">
              DROP <span className="text-primary italic">ASSET</span> <br />
              <span className="text-foreground/90 text-2xl font-black tracking-normal lowercase">to begin the forge</span>
            </h3>
            <p className="text-muted-foreground font-black flex items-center gap-2 tracking-widest uppercase text-xs mb-8">
              <MousePointer2 className="w-5 h-5 text-accent" />
              Direct access file system
            </p>
            <div className="flex gap-4">
              {['SVG', 'PNG', 'JPG', 'WEBP'].map(ext => (
                <span key={ext} className="px-6 py-2.5 rounded-2xl bg-white/10 border border-white/20 text-xs font-black text-foreground tracking-widest hover:text-white hover:border-primary transition-all duration-300 shadow-lg">
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
