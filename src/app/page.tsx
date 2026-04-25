
"use client"

import * as React from "react"
import { FileUploader } from "@/components/FileUploader"
import { CodeOutput } from "@/components/CodeOutput"
import { DecoderTool } from "@/components/DecoderTool"
import { SEOIntro, FAQSection } from "@/components/SEOSections"
import { AuthUI } from "@/components/AuthModal"
import { ForgeLogo } from "@/components/ForgeLogo"
import { optimizeImage, type ProcessedAsset, type OutputFormat } from "@/lib/image-utils"
import { useToast } from "@/hooks/use-toast"
import { useUser, useFirestore, useMemoFirebase, useCollection } from "@/firebase"
import { collection, query, orderBy, limit } from "firebase/firestore"
import { 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Loader2, 
  Trash2,
  Github,
  Twitter,
  Linkedin,
  MessageCircle,
  History,
  ArrowRightLeft,
  Settings2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function Home() {
  const { toast } = useToast()
  const { user } = useUser()
  const db = useFirestore()
  const [assets, setAssets] = React.useState<ProcessedAsset[]>([])
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [qualityMode, setQualityMode] = React.useState<'optimized' | 'original'>('optimized')
  const [currentYear, setCurrentYear] = React.useState<number | null>(null)
  const [isAuthOpen, setIsAuthOpen] = React.useState(false)
  
  const historyQuery = useMemoFirebase(() => {
    if (!db || !user) return null
    return query(
      collection(db, 'users', user.uid, 'conversionSnippets'),
      orderBy('createdAt', 'desc'),
      limit(5)
    )
  }, [db, user])

  const { data: cloudHistory } = useCollection(historyQuery)

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  const handleFilesSelect = async (files: File[]) => {
    const MAX_BATCH = 10
    const currentCount = assets.length
    const remainingSlots = MAX_BATCH - currentCount

    if (remainingSlots <= 0) {
      toast({
        variant: "destructive",
        title: "Batch Limit Reached",
        description: `Your workbench is limited to ${MAX_BATCH} forged assets per session.`,
      })
      return
    }

    let filesToProcess = files
    if (files.length > remainingSlots) {
      toast({
        title: "Slicing Batch",
        description: `Only ${remainingSlots} slots available. Processing first ${remainingSlots} assets.`,
      })
      filesToProcess = files.slice(0, remainingSlots)
    }

    setIsProcessing(true)
    const newAssets: ProcessedAsset[] = []
    
    for (const file of filesToProcess) {
      if (qualityMode === 'original' && file.size > 2 * 1024 * 1024) {
        toast({
          title: "Large Asset Detected",
          description: "Original mode for files >2MB may impact UI performance.",
        })
      }

      try {
        const targetFormat: OutputFormat = qualityMode === 'original' ? 'original' : 'image/webp'
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

    setAssets(prev => [...prev, ...newAssets])
    setIsProcessing(false)
  }

  const removeAsset = (id: string) => {
    setAssets(prev => prev.filter(a => a.id !== id))
  }

  const clearAll = () => {
    setAssets([])
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-primary/20 transition-colors duration-700">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-primary/5 blur-[150px] animate-pulse rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-secondary/5 blur-[150px] animate-pulse delay-1000 rounded-full" />
      </div>

      <header className={cn(
        "fixed top-0 left-0 right-0 z-[100] w-full border-b border-white/10 bg-background/40 backdrop-blur-2xl px-4 md:px-12 h-20 flex items-center justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] transition-all",
        isAuthOpen && "hidden"
      )}>
        <button onClick={scrollToTop} className="focus:outline-none">
          <ForgeLogo />
        </button>
        
        <div className="flex items-center gap-4 md:gap-6">
          <nav className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <a href="#workbench" className="hover:text-primary transition-colors">Workbench</a>
            <a href="#security" className="hover:text-foreground transition-colors">Security</a>
            <a href="#guide" className="hover:text-foreground transition-colors">Guide</a>
          </nav>
          <div className="h-6 w-px bg-foreground/10 hidden md:block" />
          <div className="flex items-center gap-4">
            <AuthUI onOpenChange={setIsAuthOpen} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-2 md:px-6 pt-32 md:pt-48 pb-32 flex flex-col items-center relative z-10 max-w-full overflow-x-hidden">
        <section className="text-center max-w-6xl mb-24 md:mb-40 space-y-10 md:space-y-16 animate-in fade-in slide-in-from-top-12 duration-1000">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 border border-accent/20 animate-pulse">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Studio Live Now</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl md:text-[10rem] lg:text-[12rem] font-black text-foreground tracking-tighter leading-[0.8] select-none text-center uppercase">
              Base64 <br />
              <span className="text-gradient">Converter.</span>
            </h1>
            <h2 className="text-2xl md:text-5xl font-black tracking-tighter text-muted-foreground/40 uppercase">Image Encoder &amp; Data URI Generator.</h2>
          </div>
          <p className="text-base md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium px-4">
            Free online Base64 converter and image encoder. Convert PNG, JPEG, WebP and SVG to Base64 Data URI strings — or decode Base64 back to images — instantly in your browser with zero-latency and cloud-synced history.
          </p>
        </section>

        <section id="workbench" className="w-full max-w-6xl flex flex-col items-center gap-8 md:gap-16 scroll-mt-32">
          <Tabs defaultValue="encoder" className="w-full">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-16">
              <TabsList className="bg-foreground/5 p-1.5 rounded-2xl border border-foreground/5 h-auto w-full max-w-[320px] md:max-w-md">
                <TabsTrigger 
                  value="encoder" 
                  className="flex-1 rounded-xl px-4 md:px-8 py-3 md:py-4 font-black text-[10px] md:text-[11px] uppercase tracking-[0.15em] md:tracking-[0.2em] data-[state=active]:bg-foreground data-[state=active]:text-background transition-all"
                >
                  <Zap className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" /> Encoder
                </TabsTrigger>
                <TabsTrigger 
                  value="decoder"
                  className="flex-1 rounded-xl px-4 md:px-8 py-3 md:py-4 font-black text-[10px] md:text-[11px] uppercase tracking-[0.15em] md:tracking-[0.2em] data-[state=active]:bg-foreground data-[state=active]:text-background transition-all"
                >
                  <ArrowRightLeft className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" /> Decoder
                </TabsTrigger>
              </TabsList>

              <div className="h-10 w-px bg-foreground/10 hidden md:block" />

              <div className="flex items-center gap-1.5 md:gap-2 bg-foreground/5 p-1.5 rounded-2xl border border-foreground/5">
                <Button
                  variant="ghost"
                  onClick={() => setQualityMode('optimized')}
                  className={cn(
                    "rounded-xl px-3 md:px-4 py-2 md:py-3 font-black text-[8px] md:text-[9px] uppercase tracking-widest transition-all",
                    qualityMode === 'optimized' ? "bg-background text-primary shadow-sm" : "text-muted-foreground"
                  )}
                >
                  <Zap className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1 md:mr-1.5" /> Optimized
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setQualityMode('original')}
                  className={cn(
                    "rounded-xl px-3 md:px-4 py-2 md:py-3 font-black text-[8px] md:text-[9px] uppercase tracking-widest transition-all",
                    qualityMode === 'original' ? "bg-background text-accent shadow-sm" : "text-muted-foreground"
                  )}
                >
                  <Settings2 className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1 md:mr-1.5" /> 1:1 Original
                </Button>
              </div>
            </div>

            <TabsContent value="encoder" className="mt-0 outline-none">
              <div className="w-full relative glass-card rounded-[2rem] md:rounded-[4rem] p-3 md:p-8 shadow-2xl overflow-hidden border-white/10">
                <FileUploader 
                  onFilesSelect={handleFilesSelect} 
                  onClear={clearAll}
                  hasAssets={assets.length > 0}
                  assetCount={assets.length}
                  maxAssets={10}
                />

                {isProcessing && (
                  <div className="mt-12 md:mt-16 flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-primary">Synthesizing Batch...</p>
                  </div>
                )}

                {assets.length > 0 && (
                  <div className="mt-8 md:mt-12 space-y-16 md:space-y-24 w-full">
                    <div className="flex items-center justify-between border-b border-foreground/5 pb-8 px-2 md:px-4">
                      <h2 className="text-sm md:text-2xl font-black tracking-tighter flex items-center gap-2 md:gap-4 uppercase opacity-50">
                        Forged Assets ({assets.length} / 10)
                      </h2>
                      <Button 
                        variant="ghost" 
                        onClick={clearAll}
                        className="rounded-xl h-10 px-3 text-[9px] font-bold uppercase tracking-widest text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Clear
                      </Button>
                    </div>
                    
                    <div className="space-y-16 md:space-y-24">
                      {assets.map((asset) => (
                        <div key={asset.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                          <CodeOutput asset={asset} onRemove={() => removeAsset(asset.id)} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="decoder" className="mt-0 outline-none">
              <div className="relative glass-card rounded-[2rem] md:rounded-[4rem] p-6 md:p-16 shadow-2xl overflow-hidden border-white/10">
                <DecoderTool 
                  onDecode={() => {}}
                />
              </div>
            </TabsContent>
          </Tabs>

          {user && cloudHistory && cloudHistory.length > 0 && assets.length === 0 && (
            <div className="mt-20 md:mt-32 space-y-12 md:space-y-16 w-full animate-in fade-in duration-1000">
              <h2 className="text-xl md:text-2xl font-black tracking-tighter flex items-center gap-3 uppercase text-muted-foreground px-4">
                <History className="w-5 h-5" /> Recent Cloud Vaults
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4">
                {cloudHistory.map((snippet) => (
                  <div key={snippet.id} className="glass-card p-8 rounded-[2rem] md:rounded-[2.5rem] border-white/10 space-y-6 flex flex-col">
                    <div className="flex items-start justify-between gap-4 flex-1">
                      <div className="space-y-4 min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary">{snippet.mimeType.split('/')[1]}</span>
                          <span className="text-[10px] font-bold text-muted-foreground">{new Date(snippet.createdAt?.toDate()).toLocaleDateString()}</span>
                        </div>
                        <h4 className="font-bold truncate text-base">{snippet.fileName}</h4>
                      </div>
                      <div className="h-16 w-16 rounded-2xl bg-foreground/5 p-1 border border-foreground/5 overflow-hidden shrink-0 shadow-inner mt-1">
                        <img src={snippet.base64String} alt={snippet.fileName} className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <Button asChild variant="outline" className="w-full rounded-2xl text-[10px] font-black uppercase tracking-widest h-12">
                      <Link href="/cloud-sync">View Details</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <div id="security" className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 w-full max-w-6xl mt-48 md:mt-64 mb-24 md:mb-40 px-4 md:px-0">
          {[
            { icon: Zap, title: "Zero Latency", desc: "Forging happens entirely in-browser. No server round-trips.", color: "text-primary" },
            { icon: ShieldCheck, title: "Member Vault", desc: "Logged-in users get cloud history sync across all devices.", color: "text-accent" },
            { icon: History, title: "Unlimited Use", desc: "No caps. Forge as many assets as your pipeline requires.", color: "text-secondary" },
          ].map((feature, i) => (
            <div key={i} className="glass-card p-10 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] hover:translate-y-[-12px] transition-all duration-500 group">
              <div className={cn("w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-foreground/5 flex items-center justify-center mb-8 md:mb-10", feature.color)}>
                <feature.icon className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed font-medium text-base md:text-lg">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div id="guide" className="w-full mt-32 md:mt-48 px-2 md:px-0">
          <SEOIntro />
          <FAQSection />
        </div>
      </main>

      <footer className="w-full py-16 md:py-32 px-6 md:px-8 border-t border-foreground/5 bg-background/80 backdrop-blur-3xl">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-24">
          <div className="md:col-span-2 space-y-10 md:space-y-12">
            <ForgeLogo />
            <div className="space-y-6">
              <p className="text-muted-foreground max-w-md leading-relaxed text-lg md:text-xl font-medium">
                Free online Base64 converter and image encoder for developers. Convert PNG, JPEG, WebP, SVG to Base64 Data URI and decode Base64 back to images instantly.
              </p>
              <p className="text-primary/60 max-w-md leading-relaxed text-sm font-semibold italic">
                The fastest Base64 string generator online — supports PNG to Base64, JPEG to Base64, WebP to Base64, SVG to Base64, CSS image encoder, HTML image encoder, and lossless Data URI generation.
              </p>
            </div>
            <div className="flex items-center gap-6">
              {[
                { icon: Github, href: "https://github.com/webhridoyc/forge.studio" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: MessageCircle, href: "#" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  target={social.icon === Github ? "_blank" : undefined}
                  rel={social.icon === Github ? "noopener noreferrer" : undefined}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300"
                >
                  <social.icon className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="space-y-6 md:space-y-8">
            <h4 className="font-bold text-[11px] uppercase tracking-[0.3em] text-primary">System</h4>
            <nav className="flex flex-col gap-4 md:gap-5 text-base font-semibold text-muted-foreground">
              <a href="/docs" className="hover:text-foreground transition-colors">Documentation</a>
              <a href="/performance" className="hover:text-foreground transition-colors">Performance Audit</a>
              <a href="/api-reference" className="hover:text-foreground transition-colors">API Reference</a>
              <a href="/preferences" className="hover:text-foreground transition-colors">Settings</a>
            </nav>
          </div>

          <div className="space-y-6 md:space-y-8">
            <h4 className="font-bold text-[11px] uppercase tracking-[0.3em] text-secondary">History</h4>
            <nav className="flex flex-col gap-4 md:gap-5 text-base font-semibold text-muted-foreground">
              <a href="/cloud-sync" className="hover:text-foreground transition-colors">Cloud Sync</a>
              <a href="/usage-specs" className="hover:text-foreground transition-colors">Usage Specs</a>
              <a href="/about" className="hover:text-foreground transition-colors">Forge Studios</a>
              <a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
            </nav>
          </div>
        </div>
        <div className="container mx-auto mt-24 md:mt-32 pt-16 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10 text-[11px] text-muted-foreground font-bold tracking-[0.2em] uppercase text-center md:text-left">
          <p>© {currentYear ?? '...'} FORGE STUDIOS. DISTRIBUTED SECURELY.</p>
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              LIVE DEPLOYMENT READY
            </span>
            <span className="opacity-50">V6.0.0</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
