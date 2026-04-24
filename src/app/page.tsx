"use client"

import * as React from "react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { FileUploader } from "@/components/FileUploader"
import { CodeOutput } from "@/components/CodeOutput"
import { SEOIntro, FAQSection } from "@/components/SEOSections"
import { optimizeImage } from "@/lib/image-utils"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { Code2, Sparkles, ShieldCheck, Zap, ArrowRight, Loader2, MonitorSmartphone } from "lucide-react"
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
    
    if (selectedFile.size > 2 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "Large Asset Detected",
        description: "Large files impact performance. We're optimizing this for the best web experience.",
      })
    }

    try {
      const b64 = await optimizeImage(selectedFile, 800, 0.7)
      setBase64(b64)
      setPreviewUrl(b64)
      
      toast({
        title: "Synthesis Complete",
        description: "Asset forged and optimized for high-performance delivery.",
      })
    } catch (err) {
      console.error("Conversion failed:", err)
      toast({
        variant: "destructive",
        title: "Forge Interrupted",
        description: "Failed to process asset. Please try a different image.",
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
    <div className="min-h-screen relative overflow-x-hidden selection:bg-primary/20 transition-colors duration-700">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/5 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/5 blur-[120px] animate-pulse delay-1000" />
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-foreground/5 bg-background/60 backdrop-blur-2xl px-6 md:px-12 h-20 flex items-center justify-between transition-all">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-500">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-foreground">
            FORGE<span className="text-primary">.</span>
          </span>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <nav className="hidden lg:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            <a href="#tool" className="hover:text-primary transition-colors">Workbench</a>
            <a href="#features" className="hover:text-foreground transition-colors">Security</a>
            <a href="#faq" className="hover:text-foreground transition-colors">Support</a>
          </nav>
          <div className="h-6 w-px bg-foreground/10 hidden md:block" />
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-6 pt-16 md:pt-32 pb-32 flex flex-col items-center relative z-10">
        {/* Hero Section */}
        <section className="text-center max-w-5xl mb-32 space-y-12 animate-in fade-in slide-in-from-top-12 duration-1000 fill-mode-forwards">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Production v4.0</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-foreground tracking-tighter leading-[0.9] select-none">
            LIGHTNING <br />
            <span className="text-gradient">FAST ASSETS</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
            Professional-grade image-to-code pipeline. Optimized for speed, security, and developer happiness.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#tool" className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-foreground text-background rounded-full font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
              Start Forging <ArrowRight className="w-5 h-5" />
            </a>
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold px-6 py-4 rounded-full border border-foreground/5 bg-background/50">
              <MonitorSmartphone className="w-4 h-4" />
              Responsive on every device
            </div>
          </div>
        </section>

        {/* Dynamic Tool Workbench */}
        <section id="tool" className="w-full flex flex-col items-center gap-16 relative scroll-mt-32">
          <div className="w-full max-w-4xl">
            <div className="relative glass-card rounded-[3rem] p-4 shadow-2xl overflow-hidden">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-30 pointer-events-none" />
              <FileUploader 
                onFileSelect={handleFileSelect} 
                onClear={handleClear}
                currentFile={file}
              />
            </div>

            {isProcessing && (
              <div className="mt-16 flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Forging Asset...</p>
              </div>
            )}

            {previewUrl && !isProcessing && (
              <div className="mt-24 mb-24 flex flex-col items-center animate-in fade-in zoom-in duration-1000">
                <div className="relative p-2 rounded-[2.5rem] bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 shadow-2xl animate-float">
                  <div className="bg-background rounded-[2.3rem] p-8">
                    <img 
                      src={previewUrl} 
                      alt="Forge Preview" 
                      className="max-h-[350px] rounded-2xl object-contain"
                    />
                  </div>
                </div>
                <div className="mt-12 flex items-center gap-3 px-6 py-2.5 bg-primary/10 rounded-full border border-primary/20">
                  <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Asset Synced & Optimized</span>
                </div>
              </div>
            )}

            {base64 && file && !isProcessing && (
              <div className="mt-16">
                <CodeOutput base64={base64} fileName={file.name} />
              </div>
            )}
          </div>
        </section>

        {/* Feature Highlights */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mt-48 mb-32">
          {[
            { icon: Zap, title: "Zero Latency", desc: "Local processing means no data ever leaves your device.", color: "text-primary" },
            { icon: ShieldCheck, title: "Privacy First", desc: "Forged assets are processed entirely in-browser.", color: "text-accent" },
            { icon: Code2, title: "Developer Ready", desc: "Instant CSS, HTML, and React-ready snippets.", color: "text-secondary" },
          ].map((feature, i) => (
            <div key={i} className="glass-card p-10 rounded-[2.5rem] hover:translate-y-[-8px] transition-all duration-500 group">
              <div className={cn("w-16 h-16 rounded-2xl bg-foreground/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform", feature.color)}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div id="faq" className="w-full mt-32">
          <SEOIntro />
          <FAQSection />
        </div>
      </main>

      <footer className="w-full py-24 px-8 border-t border-foreground/5 bg-background/80 backdrop-blur-3xl">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-xl">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter">FORGE.</span>
            </div>
            <p className="text-muted-foreground max-w-md leading-relaxed text-lg font-medium">
              Architecting high-performance asset pipelines for modern developers. Optimized for speed, engineered for quality.
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] text-primary">System</h4>
            <nav className="flex flex-col gap-4 text-sm font-semibold text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Documentation</a>
              <a href="#" className="hover:text-foreground transition-colors">Security Audit</a>
              <a href="#" className="hover:text-foreground transition-colors">Status</a>
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] text-secondary">Company</h4>
            <nav className="flex flex-col gap-4 text-sm font-semibold text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </nav>
          </div>
        </div>
        <div className="container mx-auto mt-24 pt-12 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-muted-foreground font-bold tracking-[0.2em] uppercase">
          <p>© {currentYear ?? '...'} FORGE STUDIOS. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              PRODUCTION READY
            </span>
            <span className="opacity-50">V4.0.21</span>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}