"use client"

import * as React from "react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { FileUploader } from "@/components/FileUploader"
import { CodeOutput } from "@/components/CodeOutput"
import { SEOIntro, FAQSection } from "@/components/SEOSections"
import { fileToBase64 } from "@/lib/image-utils"
import { Toaster } from "@/components/ui/toaster"
import { Image as ImageIcon, Code2, Zap } from "lucide-react"

export default function Home() {
  const [file, setFile] = React.useState<File | null>(null)
  const [base64, setBase64] = React.useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile)
    try {
      const b64 = await fileToBase64(selectedFile)
      setBase64(b64)
      setPreviewUrl(b64)
    } catch (err) {
      console.error("Conversion failed:", err)
    }
  }

  const handleClear = () => {
    setFile(null)
    setBase64(null)
    setPreviewUrl(null)
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md px-4 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <Code2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-headline font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Base64 Forge
          </h1>
        </div>
        <ThemeToggle />
      </header>

      <main className="container mx-auto px-4 pt-16 pb-24 flex flex-col items-center">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mb-16 space-y-4 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            <span>Fast, Secure & Client-Side</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-headline font-bold text-foreground tracking-tight leading-[1.1]">
            Turn Images into <br />
            <span className="text-primary italic">Powerful Code</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Embed icons, logos, and images directly into your HTML and CSS. 
            Instant conversion, no server interaction, absolute privacy.
          </p>
        </div>

        {/* Tool Section */}
        <section className="w-full flex flex-col items-center gap-12">
          <div className="w-full max-w-4xl">
            <FileUploader 
              onFileSelect={handleFileSelect} 
              onClear={handleClear}
              currentFile={file}
            />

            {previewUrl && (
              <div className="mb-12 flex flex-col items-center animate-in fade-in zoom-in duration-500">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Live Preview</p>
                <div className="p-4 rounded-2xl bg-card border-2 border-border/50 shadow-2xl inline-block max-w-full">
                  <img 
                    src={previewUrl} 
                    alt="Uploaded preview" 
                    className="max-h-48 rounded-lg object-contain"
                  />
                </div>
              </div>
            )}

            {base64 && file && (
              <CodeOutput base64={base64} fileName={file.name} />
            )}
          </div>
        </section>

        {/* SEO Sections */}
        <SEOIntro />
        <FAQSection />
      </main>

      <footer className="w-full py-12 px-4 border-t border-border/50 bg-muted/30">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              <span className="font-bold">Base64 Forge</span>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              The ultimate developer utility for image encoding. <br />
              Built for speed, privacy, and efficiency.
            </p>
          </div>
          
          <div className="flex gap-8 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
          
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Base64 Forge. All rights reserved.
          </p>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}