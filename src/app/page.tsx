"use client"

import * as React from "react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { FileUploader } from "@/components/FileUploader"
import { CodeOutput } from "@/components/CodeOutput"
import { SEOIntro, FAQSection } from "@/components/SEOSections"
import { optimizeImage, type ProcessedAsset, type OutputFormat } from "@/lib/image-utils"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { 
  Code2, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Loader2, 
  Trash2,
  Github,
  Twitter,
  Linkedin,
  MessageCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function Home() {
  const { toast } = useToast()
  const [assets, setAssets] = React.useState<ProcessedAsset[]>([])
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [targetFormat] = React.useState<OutputFormat>('original')
  const [currentYear, setCurrentYear] = React.useState<number | null>(null)

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  const handleFilesSelect = async (files: File[]) => {
    setIsProcessing(true)
    
    const newAssets: ProcessedAsset[] = []
    
    for (const file of files) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "Performance Warning",
          description: `${file.name} is large. Base64 is only recommended for icons/small assets.`,
        })
      }

      try {
        const asset = await optimizeImage(file, targetFormat)
        newAssets.push(asset)
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Forge Failed",
          description: `Could not process ${file.name}`,
        })
      }
    }

    setAssets(prev => [...newAssets, ...prev])
    setIsProcessing(false)
    
    if (newAssets.length > 0) {
      toast({
        title: "Synthesis Successful",
        description: `Forged ${newAssets.length} asset(s) into code.`,
      })
    }
  }

  const removeAsset = (id: string) => {
    setAssets(prev => prev.filter(a => a.id !== id))
  }

  const clearAll = () => {
    setAssets([])
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-primary/20 transition-colors duration-700">
      {/* Animated Background Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-primary/10 blur-[150px] animate-pulse rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-secondary/10 blur-[150px] animate-pulse delay-1000 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-accent/5 blur-[120px] rounded-full" />
      </div>

      <header className="sticky top-0 z-[100] w-full border-b border-white/10 dark:border-white/5 bg-background/60 backdrop-blur-2xl px-6 md:px-12 h-20 flex items-center justify-between transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-none">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-foreground">
            FORGE<span className="text-primary">.</span>
          </span>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <nav className="hidden lg:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            <a href="#workbench" className="hover:text-primary transition-colors">Workbench</a>
            <a href="#security" className="hover:text-foreground transition-colors">Security</a>
            <a href="#guide" className="hover:text-foreground transition-colors">Guide</a>
          </nav>
          <div className="h-6 w-px bg-foreground/10 hidden md:block" />
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-6 pt-16 md:pt-24 pb-32 flex flex-col items-center relative z-10">
        <section className="text-center max-w-5xl mb-24 space-y-12 animate-in fade-in slide-in-from-top-12 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Professional Utility v5.0</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black text-foreground tracking-tighter leading-[0.85] select-none">
            ASSET <br />
            <span className="text-gradient">PIPELINE</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
            Batch-process images into performance-optimized Base64 snippets. Zero latency, 100% client-side security.
          </p>
        </section>

        <section id="workbench" className="w-full max-w-5xl flex flex-col items-center gap-12 scroll-mt-32">
          <div className="w-full">
            <div className="relative glass-card rounded-[3rem] p-4 shadow-2xl overflow-hidden border border-foreground/5">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-30 pointer-events-none" />
              <FileUploader 
                onFilesSelect={handleFilesSelect} 
                onClear={clearAll}
                hasAssets={assets.length > 0}
              />
            </div>

            {isProcessing && (
              <div className="mt-16 flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Synthesizing Batch...</p>
              </div>
            )}

            {assets.length > 0 && (
              <div className="mt-20 space-y-24 w-full">
                <div className="flex items-center justify-between border-b border-foreground/5 pb-8">
                  <h2 className="text-4xl font-black tracking-tighter">FORGED ASSETS</h2>
                  <Button 
                    variant="ghost" 
                    onClick={clearAll}
                    className="rounded-2xl text-[10px] font-bold uppercase tracking-widest text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Clear Workbench
                  </Button>
                </div>
                
                {assets.map((asset) => (
                  <div key={asset.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <CodeOutput asset={asset} onRemove={() => removeAsset(asset.id)} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <div id="security" className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mt-48 mb-32">
          {[
            { icon: Zap, title: "Zero Latency", desc: "Forging happens entirely in-browser. No server round-trips.", color: "text-primary" },
            { icon: ShieldCheck, title: "Bank-Grade Privacy", desc: "Assets never leave your memory. SEC-compliant processing.", color: "text-accent" },
            { icon: Code2, title: "Format Transcoding", desc: "Convert PNG to WebP Base64 strings for ultra-light snippets.", color: "text-secondary" },
          ].map((feature, i) => (
            <div key={i} className="glass-card p-10 rounded-[2.5rem] hover:translate-y-[-8px] transition-all duration-500 group border border-foreground/5">
              <div className={cn("w-16 h-16 rounded-2xl bg-foreground/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500", feature.color)}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div id="guide" className="w-full mt-32">
          <SEOIntro />
          <FAQSection />
        </div>
      </main>

      <footer className="w-full py-24 px-8 border-t border-foreground/5 bg-background/80 backdrop-blur-3xl relative z-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-2 space-y-10">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary to-secondary p-2.5 rounded-xl shadow-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-black tracking-tighter">FORGE.</span>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground max-w-md leading-relaxed text-lg font-medium">
                Architecting high-performance asset pipelines for modern developers. Optimized for speed, engineered for quality.
              </p>
              <p className="text-primary/60 max-w-md leading-relaxed text-sm font-semibold italic">
                Looking for a fast Base64 converter? Our tool provides Data URI, Raw Strings, and ready-to-use HTML/CSS tags instantly.
              </p>
            </div>
            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: MessageCircle, href: "#", label: "Discord" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  className="w-12 h-12 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 hover:border-primary/20 hover:scale-110 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] text-primary">System</h4>
            <nav className="flex flex-col gap-4 text-sm font-semibold text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Documentation</a>
              <a href="#" className="hover:text-foreground transition-colors">Performance Audit</a>
              <a href="#" className="hover:text-foreground transition-colors">API Reference</a>
              <a href="#" className="hover:text-foreground transition-colors">Security Specs</a>
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] text-secondary">Company</h4>
            <nav className="flex flex-col gap-4 text-sm font-semibold text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Engineering Blog</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact Forge</a>
            </nav>
          </div>
        </div>
        <div className="container mx-auto mt-24 pt-12 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-muted-foreground font-bold tracking-[0.2em] uppercase">
          <p>© {currentYear ?? '...'} FORGE STUDIOS. DISTRIBUTED SECURELY.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              LIVE DEPLOYMENT READY
            </span>
            <span className="opacity-50">V5.0.1</span>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}
