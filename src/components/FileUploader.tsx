"use client"

import * as React from "react"
import { Upload, ImageIcon, X, MousePointer2, Sparkles, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploaderProps {
  onFileSelect: (file: File) => void
  onClear: () => void
  currentFile: File | null
}

export function FileUploader({ onFileSelect, onClear, currentFile }: FileUploaderProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Prevent default behavior for all drag events to ensure the browser doesn't open the file
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
    // Reset input value so the same file can be selected again if cleared
    if (inputRef.current) inputRef.current.value = ""
  }

  const triggerInput = () => {
    inputRef.current?.click()
  }

  return (
    <div className="w-full">
      {currentFile ? (
        <div className="relative group overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-6 sm:p-10 flex flex-col sm:flex-row items-center gap-8 animate-in fade-in zoom-in duration-500 backdrop-blur-3xl shadow-2xl">
          {/* Animated Glow Backdrop */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50 pointer-events-none" />
          
          <div className="relative h-32 w-32 sm:h-40 sm:w-40 rounded-[2rem] overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shrink-0 shadow-2xl transition-all duration-700 group-hover:scale-105 group-hover:rotate-2">
             <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
             <CheckCircle2 className="text-white w-16 h-16 relative z-10" />
          </div>

          <div className="relative flex-1 min-w-0 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
              <Sparkles className="w-5 h-5 text-accent animate-pulse" />
              <p className="text-2xl font-black tracking-tight truncate text-foreground leading-none">
                {currentFile.name}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <span className="px-4 py-1.5 rounded-xl bg-primary/10 text-[10px] font-black uppercase tracking-[0.2em] text-primary border border-primary/20">
                {currentFile.type.split("/")[1]}
              </span>
              <span className="px-4 py-1.5 rounded-xl bg-accent/10 text-[10px] font-black uppercase tracking-[0.2em] text-accent border border-accent/20">
                {(currentFile.size / 1024).toFixed(2)} KB
              </span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onClear()
            }}
            aria-label="Remove file"
            className="group/btn relative p-5 bg-white/5 hover:bg-destructive text-muted-foreground hover:text-destructive-foreground rounded-[1.5rem] transition-all duration-500 hover:scale-110 active:scale-95 border border-white/10 hover:border-destructive shadow-xl"
          >
            <X className="w-8 h-8 transition-transform group-hover/btn:rotate-90" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerInput}
          className={cn(
            "relative group flex flex-col items-center justify-center w-full min-h-[500px] border-2 border-dashed rounded-[3.5rem] transition-all duration-700 cursor-pointer overflow-hidden outline-none ring-offset-background focus-within:ring-2 focus-within:ring-primary",
            isDragging
              ? "border-primary bg-primary/10 scale-[1.01] shadow-[0_0_80px_-20px_rgba(var(--primary),0.4)]"
              : "border-white/20 hover:border-primary/40 hover:bg-white/[0.02] bg-white/[0.01]"
          )}
        >
          {/* Dynamic Background Ambiance */}
          <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-primary/15 rounded-full blur-[120px] group-hover:bg-primary/25 transition-all duration-1000 pointer-events-none animate-pulse" />
          <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-secondary/15 rounded-full blur-[120px] group-hover:bg-secondary/25 transition-all duration-1000 pointer-events-none animate-pulse delay-1000" />

          <input
            type="file"
            ref={inputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="sr-only"
            aria-label="Upload image"
          />
          
          <div className="flex flex-col items-center justify-center py-12 text-center px-10 relative z-10 select-none">
            <div className={cn(
              "mb-12 p-12 rounded-[3rem] transition-all duration-700 shadow-2xl group-hover:scale-110",
              isDragging 
                ? "bg-primary text-white scale-125 rotate-0 shadow-primary/40" 
                : "bg-gradient-to-br from-primary via-secondary to-accent text-white group-hover:rotate-12"
            )}>
              <Upload className={cn("w-20 h-20 transition-transform duration-500", isDragging && "animate-bounce")} />
            </div>

            <div className="space-y-4 max-w-lg">
              <h3 className="text-5xl sm:text-6xl font-black tracking-tighter leading-[0.9] uppercase transition-all duration-500">
                <span className="text-foreground/40 group-hover:text-foreground transition-colors">DRAG</span> <br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic">ASSET</span>
              </h3>
              
              <div className="flex flex-col items-center gap-4 pt-4">
                <p className="text-muted-foreground font-black flex items-center gap-3 tracking-[0.3em] uppercase text-[10px] opacity-60 group-hover:opacity-100 transition-opacity">
                  <MousePointer2 className="w-4 h-4 text-accent" />
                  OR CLICK TO FORGE
                </p>
                
                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  {['SVG', 'PNG', 'JPG', 'WEBP'].map(ext => (
                    <span key={ext} className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-muted-foreground tracking-widest hover:text-white hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                      {ext}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Visual Feedback on Drag */}
          {isDragging && (
            <div className="absolute inset-0 flex items-center justify-center bg-primary/20 backdrop-blur-sm pointer-events-none animate-in fade-in duration-300">
              <div className="px-10 py-5 rounded-3xl bg-primary text-white font-black text-2xl uppercase tracking-tighter shadow-2xl animate-bounce">
                Drop to Upload
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
