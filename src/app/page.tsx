"use client"

import * as React from "react"
import { FileUploader } from "@/components/FileUploader"
import { CodeOutput } from "@/components/CodeOutput"
import { DecoderTool } from "@/components/DecoderTool"
import { SEOIntro, FAQSection } from "@/components/SEOSections"
import { AuthUI } from "@/components/AuthModal"
import { optimizeImage, type ProcessedAsset, type OutputFormat } from "@/lib/image-utils"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { useUser, useFirestore, useMemoFirebase, useCollection } from "@/firebase"
import { collection, query, orderBy, limit } from "firebase/firestore"
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
  History,
  ArrowRightLeft
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const { toast } = useToast()
  const { user } = useUser()
  const db = useFirestore()
  const [assets, setAssets] = React.useState<ProcessedAsset[]>([])
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [targetFormat] = React.useState<OutputFormat>('original')
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
    setIsProcessing(true)
    const newAssets: ProcessedAsset[] = []
    
    for (const file of files) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File Too Large",
          description: "Files over 2MB are not recommended for Base64.",
        })
        continue
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
  }

  const handleDecode = async () => {
    // Decoding processed
  }

  const removeAsset = (id: string) => {
    setAssets(prev => prev.filter(a => a.id !== id))
  }

  const clearAll = () => {
    setAssets([])
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-primary/20 transition-colors duration-700">
      {/* Dynamic Header Blur Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-primary/5 blur-[150px] animate-pulse rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-secondary/5 blur-[150px] animate-pulse delay-1000 rounded-full" />
      </div>

      <header className={cn(
        "fixed top-0 left-0 right-0 z-[100] w-full border-b border-white/10 bg-background/40 backdrop-blur-2xl px-4 md:px-12 h-20 flex items-center justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] transition-all",
        isAuthOpen && "hidden"
      )}>
        <div className="flex items-center gap-2 md:gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="bg-gradient-to-br from-primary to-secondary p-1.5 md:p-2 rounded-xl shadow-lg group-hover:scale-110 transition-all">
            <Code2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tighter">FORGE.</span>
        </div>
        
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

      <main className="container mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-32 flex flex-col items-center relative z-10">
        <section className="text-center max-w-5xl mb-16 md:mb-24 space-y-8 md:space-y-12 animate-in fade-in slide-in-from-top-12 duration-1000">
          <div className="inline-flex flex-col items-center gap-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Unlimited Pro Edition</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-8xl lg:text-[9rem] font-black text-foreground tracking-tighter leading-[0.85] select-none text-center">
            DUAL <br />
            <span className="text-gradient">PIPELINE</span>
          </h1>
          <p className="text-sm md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium px-4">
            Unified Base64 synthesis. Encode, decode, and optimize with zero-latency cloud history.
          </p>
        </section>

        <section id="workbench" className="w-full max-w-5xl flex flex-col items-center gap-8 md:gap-12 scroll-mt-32">
          <Tabs defaultValue="encoder" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-foreground/5 p-1 rounded-2xl border border-foreground/5 h-auto w-full max-w-xs md:max-w-md mx-auto">
                <TabsTrigger 
                  value="encoder" 
                  className="flex-1 rounded-xl px-4 md:px-8 py-3 font-black text-[10px] uppercase tracking-[0.2em] data-[state=active]:bg-foreground data-[state=active]:text-background transition-all"
                >
                  <Zap className="w-4 h-4 mr-2" /> Encoder
                </TabsTrigger>
                <TabsTrigger 
                  value="decoder"
                  className="flex-1 rounded-xl px-4 md:px-8 py-3 font-black text-[10px] uppercase tracking-[0.2em] data-[state=active]:bg-foreground data-[state=active]:text-background transition-all"
                >
                  <ArrowRightLeft className="w-4 h-4 mr-2" /> Decoder
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="encoder" className="mt-0 outline-none">
              <div className="w-full relative glass-card rounded-[2rem] md:rounded-[3rem] p-3 md:p-6 shadow-2xl overflow-hidden border-white/10">
                <FileUploader 
                  onFilesSelect={handleFilesSelect} 
                  onClear={clearAll}
                  hasAssets={assets.length > 0}
                />

                {isProcessing && (
                  <div className="mt-12 md:mt-16 flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
                    <Loader2 className="w-8 h-8 md:w-10 md:h-10 text-primary animate-spin" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Synthesizing Batch...</p>
                  </div>
                )}

                {assets.length > 0 && (
                  <div className="mt-8 md:mt-12 space-y-16 md:space-y-24 w-full">
                    <div className="flex items-center justify-between border-b border-foreground/5 pb-8 px-4">
                      <h2 className="text-lg md:text-2xl font-black tracking-tighter flex items-center gap-4 uppercase opacity-50">
                        Forged Assets ({assets.length})
                      </h2>
                      <Button 
                        variant="ghost" 
                        onClick={clearAll}
                        className="rounded-2xl text-[10px] font-bold uppercase tracking-widest text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Clear All
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
              <div className="relative glass-card rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-2xl overflow-hidden border-white/10">
                <DecoderTool 
                  onDecode={handleDecode}
                />
              </div>
            </TabsContent>
          </Tabs>

          {user && cloudHistory && cloudHistory.length > 0 && assets.length === 0 && (
            <div className="mt-16 md:mt-20 space-y-8 md:space-y-12 w-full animate-in fade-in duration-1000">
              <h2 className="text-xl md:text-2xl font-black tracking-tighter flex items-center gap-3 uppercase text-muted-foreground px-4">
                <History className="w-5 h-5" /> Recent Cloud Vaults
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {cloudHistory.map((snippet) => (
                  <div key={snippet.id} className="glass-card p-6 rounded-[2rem] border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary">{snippet.mimeType.split('/')[1]}</span>
                      <span className="text-[10px] font-bold text-muted-foreground">{new Date(snippet.createdAt?.toDate()).toLocaleDateString()}</span>
                    </div>
                    <h4 className="font-bold truncate text-sm">{snippet.fileName}</h4>
                    <Button variant="outline" className="w-full rounded-xl text-[10px] font-black uppercase tracking-widest h-10">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <div id="security" className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl mt-32 md:mt-48 mb-24 md:mb-32 px-4 md:px-0">
          {[
            { icon: Zap, title: "Zero Latency", desc: "Forging happens entirely in-browser. No server round-trips.", color: "text-primary" },
            { icon: ShieldCheck, title: "Member Vault", desc: "Logged-in users get cloud history sync across all devices.", color: "text-accent" },
            { icon: History, title: "Unlimited Use", desc: "No caps. Forge as many assets as your pipeline requires.", color: "text-secondary" },
          ].map((feature, i) => (
            <div key={i} className="glass-card p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] hover:translate-y-[-8px] transition-all duration-500 group">
              <div className={cn("w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-foreground/5 flex items-center justify-center mb-6 md:mb-8", feature.color)}>
                <feature.icon className="w-7 h-7 md:w-8 md:h-8" />
              </div>
              <h3 className="text-xl md:text-2xl font-black mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed font-medium text-sm md:text-base">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div id="guide" className="w-full mt-24 md:mt-32">
          <SEOIntro />
          <FAQSection />
        </div>
      </main>

      <footer className="w-full py-16 md:py-24 px-6 md:px-8 border-t border-foreground/5 bg-background/80 backdrop-blur-3xl">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16">
          <div className="md:col-span-2 space-y-8 md:space-y-10">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl shadow-lg">
                <Code2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className="text-2xl md:text-3xl font-black tracking-tighter">FORGE.</span>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground max-w-md leading-relaxed text-base md:text-lg font-medium">
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
                  className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300"
                >
                  <social.icon className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="space-y-4 md:space-y-6">
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] text-primary">System</h4>
            <nav className="flex flex-col gap-3 md:gap-4 text-sm font-semibold text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Documentation</a>
              <a href="#" className="hover:text-foreground transition-colors">Performance Audit</a>
              <a href="#" className="hover:text-foreground transition-colors">API Reference</a>
            </nav>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] text-secondary">History</h4>
            <nav className="flex flex-col gap-3 md:gap-4 text-sm font-semibold text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Cloud Sync</a>
              <a href="#" className="hover:text-foreground transition-colors">Usage Specs</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact Forge</a>
            </nav>
          </div>
        </div>
        <div className="container mx-auto mt-16 md:mt-24 pt-12 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 text-[10px] text-muted-foreground font-bold tracking-[0.2em] uppercase text-center md:text-left">
          <p>© {currentYear ?? '...'} FORGE STUDIOS. DISTRIBUTED SECURELY.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              LIVE DEPLOYMENT READY
            </span>
            <span className="opacity-50">V5.2.0</span>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}