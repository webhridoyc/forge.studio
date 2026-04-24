"use client"

import * as React from "react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { FileUploader } from "@/components/FileUploader"
import { CodeOutput } from "@/components/CodeOutput"
import { SEOIntro, FAQSection } from "@/components/SEOSections"
import { optimizeImage } from "@/lib/image-utils"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { Code2, Zap, Sparkles, Layers, ShieldCheck, ArrowRight, Loader2, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Home() {
  const { toast } = useToast()
  const [file, setFile] = React.useState<File | null>(null)
  const [base64, setBase64] = React.useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [currentYear, setCurrentYear] = React.useState<number | null>(null)

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  const handleFileSelect = async (selectedFile: File) => {
    setIsProcessing(true)
    setFile(selectedFile)
    
    // Performance Warning for large files
    if (selectedFile.size > 2 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "Performance Warning",
        description: "Large files are not recommended for Base64 encoding as they impact web speed. We will auto-optimize this for you.",
      })
    }

    try {
      // Automatic Resizing & Compression
      const b64 = await optimizeImage(selectedFile, 800, 0.7)
      setBase64(b64)
      setPreviewUrl(b64)
      
      toast({
        title: "Asset Forged",
        description: "Optimized and compressed for production deployment.",
      })
    } catch (err) {
      console.error("Conversion failed:", err)
      toast({
        variant: "destructive",
        title: "Forging Failed",
        description: "Could not process image asset.",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleClear = () => {
    setFile(null)
    setBase64(null)
    setPreviewUrl(null)
    setIsProcessing(false)
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-primary/30">
      {/* High-Performance Dynamic Background Elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] pointer-events-none animate-pulse duration-[10000ms]" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[150px] pointer-events-none animate-pulse duration-[8000ms]" />

      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/50 backdrop-blur-2xl px-6 sm:px-12 h-20 flex items-center justify-between transition-all">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="bg-gradient-to-br from-primary to-secondary p-2.5 rounded-2xl shadow-2xl shadow-primary/30 group-hover:rotate-6 transition-transform duration-500">
            <Code2 className="w-7 h-7 text-white" />
          </div>
          <span className="text-3xl font-black tracking-tighter bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            FORGE.
          </span>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <a href="#tool" className="hover:text-primary transition-colors">Workbench</a>
            <a href="#features" className="hover:text-secondary transition-colors">Privacy</a>
            <a href="#faq" className="hover:text-accent transition-colors">FAQ</a>
          </nav>
          <div className="h-6 w-px bg-white/10 hidden md:block" />
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-6 pt-24 pb-32 flex flex-col items-center relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-5xl mb-32 space-y-10 animate-in fade-in slide-in-from-top-12 duration-1000 ease-out fill-mode-forwards">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-accent text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-xl hover:bg-white/10 transition-colors cursor-default">
            <Sparkles className="w-4 h-4" />
            <span>Studio Production Grade v3</span>
          </div>
          <h1 className="text-7xl sm:text-[9rem] font-black text-foreground tracking-tighter leading-[0.85] lg:text-[11rem] select-none">
            FORGE <span className="text-primary drop-shadow-[0_0_50px_rgba(var(--primary),0.3)]">ASSETS</span> <br />
            INTO <span className="text-secondary italic drop-shadow-[0_0_50px_rgba(var(--secondary),0.3)]">CODE.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
            High-performance web pipeline. Auto-resizing, JPEG compression, and anti-crash technology included.
          </p>
          <div className="flex justify-center pt-4">
            <a href="#tool" className="group flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-300">
              Launch Workbench <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>

        {/* Feature Grid */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mb-32">
          {[
            { icon: Zap, title: "Auto-Resized", desc: "Optimized to 800px width automatically", color: "text-primary" },
            { icon: ShieldCheck, title: "Secure Buffer", desc: "No data ever leaves your device browser", color: "text-accent" },
            { icon: Layers, title: "Fast Output", desc: "70% smaller Base64 strings for web speed", color: "text-secondary" },
          ].map((feature, i) => (
            <div key={i} className="glass-card p-10 rounded-[2.5rem] hover:border-white/20 transition-all duration-500 hover:translate-y-[-8px] group">
              <div className={cn("w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-white/10 transition-colors", feature.color)}>
                <feature.icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-2xl font-black mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Tool Section */}
        <section id="tool" className="w-full flex flex-col items-center gap-16 relative scroll-mt-32">
          <div className="w-full max-w-4xl relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary via-secondary to-accent rounded-[3rem] blur-2xl opacity-10 pointer-events-none animate-pulse" />
            <div className="relative glass-card rounded-[3rem] p-3 shadow-2xl">
              <FileUploader 
                onFileSelect={handleFileSelect} 
                onClear={handleClear}
                currentFile={file}
              />
            </div>

            {isProcessing && (
              <div className="mt-12 flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Synthesizing Matrix...</p>
              </div>
            )}

            {previewUrl && !isProcessing && (
              <div className="mt-20 mb-20 flex flex-col items-center animate-in fade-in zoom-in slide-in-from-bottom-12 duration-700 ease-out fill-mode-forwards">
                <div className="relative p-1.5 rounded-[2.5rem] bg-gradient-to-br from-primary/40 to-secondary/40 shadow-2xl backdrop-blur-3xl animate-float">
                  <div className="bg-background rounded-[2.4rem] p-6">
                    <img 
                      src={previewUrl} 
                      alt="Uploaded preview" 
                      className="max-h-[300px] rounded-2xl object-contain shadow-lg"
                    />
                  </div>
                </div>
                <div className="mt-8 flex items-center gap-3 px-5 py-2 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-xl">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Forge Matrix Synced</span>
                </div>
              </div>
            )}

            {base64 && file && !isProcessing && (
              <div className="mt-12">
                <CodeOutput base64={base64} fileName={file.name} />
              </div>
            )}
          </div>
        </section>

        <div id="faq">
          <SEOIntro />
          <FAQSection />
        </div>
      </main>

      <footer className="w-full py-24 px-8 border-t border-white/5 bg-card/40 backdrop-blur-3xl">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-center gap-4">
              <div className="bg-primary p-2.5 rounded-xl shadow-xl">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-black tracking-tighter">FORGE.</span>
            </div>
            <p className="text-muted-foreground max-w-md leading-relaxed text-lg font-medium">
              Architecting the fastest asset pipeline for elite teams. Professional utility focused on performance, privacy, and precision.
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-primary">Product</h4>
            <nav className="flex flex-col gap-4 text-sm font-bold text-muted-foreground/80">
              <a href="#" className="hover:text-white transition-colors">Documentation</a>
              <a href="#" className="hover:text-white transition-colors">Benchmarks</a>
              <a href="#" className="hover:text-white transition-colors">Security Audit</a>
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-secondary">Studio</h4>
            <nav className="flex flex-col gap-4 text-sm font-bold text-muted-foreground/80">
              <a href="#" className="hover:text-white transition-colors">Privacy Charter</a>
              <a href="#" className="hover:text-white transition-colors">Brand Assets</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </nav>
          </div>
        </div>
        <div className="container mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-muted-foreground font-black tracking-[0.2em] uppercase">
          <p>© {currentYear ?? '...'} FORGE STUDIOS. ENGINEERED FOR SPEED.</p>
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              V3.1.0 OPTIMIZED
            </span>
            <span className="text-accent opacity-60">ANTI-CRASH ENABLED</span>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}
