"use client"

import * as React from "react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { FileUploader } from "@/components/FileUploader"
import { CodeOutput } from "@/components/CodeOutput"
import { SEOIntro, FAQSection } from "@/components/SEOSections"
import { AuthUI } from "@/components/AuthModal"
import { UsageLimitIndicator } from "@/components/UsageLimitIndicator"
import { optimizeImage, type ProcessedAsset, type OutputFormat } from "@/lib/image-utils"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { useUser, useFirestore } from "@/firebase"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
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
  MessageCircle,
  History
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function Home() {
  const { toast } = useToast()
  const { user } = useUser()
  const db = useFirestore()
  const [assets, setAssets] = React.useState<ProcessedAsset[]>([])
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [targetFormat] = React.useState<OutputFormat>('original')
  const [currentYear, setCurrentYear] = React.useState<number | null>(null)
  
  // Usage Tracking
  const [usage, setUsage] = React.useState(0)
  const LIMIT = user ? 10 : 3

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear())
    
    // Sync Usage from LocalStorage for Guests
    if (!user) {
      const stored = localStorage.getItem('forge_usage_guest')
      const lastReset = localStorage.getItem('forge_usage_last_reset')
      const today = new Date().toDateString()
      
      if (lastReset !== today) {
        localStorage.setItem('forge_usage_guest', '0')
        localStorage.setItem('forge_usage_last_reset', today)
        setUsage(0)
      } else {
        setUsage(parseInt(stored || '0'))
      }
    } else {
      // Sync Usage from Firestore for Users
      const fetchUsage = async () => {
        const userRef = doc(db, 'users', user.uid)
        const snap = await getDoc(userRef)
        if (snap.exists()) {
          const data = snap.data()
          const lastReset = data.lastReset?.toDate().toDateString()
          const today = new Date().toDateString()
          
          if (lastReset !== today) {
            setDoc(userRef, { usageCount: 0, lastReset: serverTimestamp() }, { merge: true })
            setUsage(0)
          } else {
            setUsage(data.usageCount || 0)
          }
        }
      }
      fetchUsage()
    }
  }, [user, db])

  const incrementUsage = async () => {
    const newUsage = usage + 1
    setUsage(newUsage)
    
    if (!user) {
      localStorage.setItem('forge_usage_guest', newUsage.toString())
    } else {
      const userRef = doc(db, 'users', user.uid)
      setDoc(userRef, { 
        usageCount: newUsage, 
        lastReset: serverTimestamp(),
        email: user.email,
        displayName: user.displayName
      }, { merge: true })
    }
  }

  const handleFilesSelect = async (files: File[]) => {
    if (usage + files.length > LIMIT) {
      toast({
        variant: "destructive",
        title: "Limit Reached",
        description: user 
          ? "Member limit reached. Capacity resets tomorrow." 
          : "Guest limit reached. Sign in to unlock 10 daily forges!",
      })
      return
    }

    setIsProcessing(true)
    const newAssets: ProcessedAsset[] = []
    
    for (const file of files) {
      try {
        const asset = await optimizeImage(file, targetFormat)
        newAssets.push(asset)
        await incrementUsage()
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
  }

  const removeAsset = (id: string) => {
    setAssets(prev => prev.filter(a => a.id !== id))
  }

  const clearAll = () => {
    setAssets([])
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-primary/20 transition-colors duration-700">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-primary/5 blur-[150px] animate-pulse rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-secondary/5 blur-[150px] animate-pulse delay-1000 rounded-full" />
      </div>

      <header className="sticky top-0 z-[100] w-full border-b border-foreground/5 bg-background/60 backdrop-blur-3xl px-6 md:px-12 h-20 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl shadow-lg group-hover:scale-110 transition-all">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter">FORGE.</span>
        </div>
        
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <a href="#workbench" className="hover:text-primary transition-colors">Workbench</a>
            <a href="#security" className="hover:text-foreground transition-colors">Security</a>
            <a href="#guide" className="hover:text-foreground transition-colors">Guide</a>
          </nav>
          <div className="h-6 w-px bg-foreground/10 hidden md:block" />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <AuthUI />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-16 md:pt-24 pb-32 flex flex-col items-center relative z-10">
        <section className="text-center max-w-5xl mb-24 space-y-12 animate-in fade-in slide-in-from-top-12 duration-1000">
          <div className="inline-flex flex-col items-center gap-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Professional Utility v5.0</span>
            </div>
            <UsageLimitIndicator used={usage} limit={LIMIT} isGuest={!user} />
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black text-foreground tracking-tighter leading-[0.85] select-none">
            ASSET <br />
            <span className="text-gradient">PIPELINE</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
            Zero-latency, high-compression Base64 forging. Forged in the browser, stored in your history.
          </p>
        </section>

        <section id="workbench" className="w-full max-w-5xl flex flex-col items-center gap-12 scroll-mt-32">
          <div className="w-full">
            <div className="relative glass-card rounded-[3rem] p-4 shadow-2xl overflow-hidden border-white/10">
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
                  <h2 className="text-4xl font-black tracking-tighter flex items-center gap-4">
                    FORGED ASSETS
                    {user && <span className="bg-accent/10 text-accent text-[10px] px-3 py-1 rounded-full uppercase">Saved to cloud</span>}
                  </h2>
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
            { icon: ShieldCheck, title: "Member Vault", desc: "Logged-in users get cloud history sync across all devices.", color: "text-accent" },
            { icon: History, title: "Smart Limits", desc: "Fair usage system ensures performance stability for all.", color: "text-secondary" },
          ].map((feature, i) => (
            <div key={i} className="glass-card p-10 rounded-[2.5rem] hover:translate-y-[-8px] transition-all duration-500 group">
              <div className={cn("w-16 h-16 rounded-2xl bg-foreground/5 flex items-center justify-center mb-8", feature.color)}>
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

      <footer className="w-full py-24 px-8 border-t border-foreground/5 bg-background/80 backdrop-blur-3xl">
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
                { icon: Github, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: MessageCircle, href: "#" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  className="w-12 h-12 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300"
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
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] text-secondary">History</h4>
            <nav className="flex flex-col gap-4 text-sm font-semibold text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Cloud Sync</a>
              <a href="#" className="hover:text-foreground transition-colors">Usage Specs</a>
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
