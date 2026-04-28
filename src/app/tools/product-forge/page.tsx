"use client"

import * as React from "react"
import { NavigationHeader } from "@/components/NavigationHeader"
import { FileUploader } from "@/components/FileUploader"
import { Button } from "@/components/ui/button"
import { 
  ShoppingBag, 
  Sparkles, 
  Loader2, 
  Trash2, 
  Copy, 
  Check, 
  Globe, 
  Zap, 
  Layers, 
  Activity, 
  ShieldCheck, 
  Database,
  ArrowRight,
  RefreshCw,
  Tag,
  CreditCard
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { productForge, type ProductForgeOutput } from "@/ai/flows/product-forge-flow"
import { optimizeImage } from "@/lib/image-utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductForgePage() {
  const { toast } = useToast()
  const [sourceImage, setSourceImage] = React.useState<string | null>(null)
  const [isForging, setIsForging] = React.useState(false)
  const [output, setOutput] = React.useState<ProductForgeOutput | null>(null)
  const [language, setLanguage] = React.useState<'en' | 'bn'>('en')
  const [copied, setCopied] = React.useState(false)

  const handleFileSelect = async (files: File[]) => {
    const file = files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => setSourceImage(e.target?.result as string)
    reader.readAsDataURL(file)
    setOutput(null)
  }

  const handleForge = async () => {
    if (!sourceImage) return
    setIsForging(true)
    try {
      const result = await productForge({ photoDataUri: sourceImage, language })
      setOutput(result)
      toast({ title: "Synthesis Complete", description: "Product catalog entry has been forged." })
    } catch (e) {
      toast({ variant: "destructive", title: "Synthesis Failed", description: "Vision AI could not parse the image bitstream." })
    } finally {
      setIsForging(false)
    }
  }

  const handleCopyJson = () => {
    if (!output) return
    navigator.clipboard.writeText(JSON.stringify(output.product, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({ title: "Architecture Dispatched", description: "JSON catalog entry copied to workstation." })
  }

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-primary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-secondary/5 blur-[150px] rounded-full" />
      </div>

      <NavigationHeader />

      <main className="container mx-auto px-4 pt-32 md:pt-48 pb-32 relative z-10 max-w-7xl">
        <section className="text-center space-y-8 mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mx-auto">
            <ShoppingBag className="w-3.5 h-3.5" />
            E-Commerce Synthesis Suite
          </div>
          <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-none uppercase">
            Product <br /><span className="text-gradient">Forge Pro.</span>
          </h1>
          <p className="text-sm md:text-lg text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
            Industrial image-to-catalog synthesis. Transform product photos into structured JSON listings and optimized assets for the global and local-first markets.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 animate-in fade-in duration-1000 delay-150">
          {[
            { label: "Synthesis Mode", value: language === 'en' ? 'English' : 'Bengali', icon: Globe, color: "text-primary" },
            { label: "Vision Engine", value: "Gemini 2.5", icon: Zap, color: "text-secondary" },
            { label: "Output Pipeline", value: "JSON / WebP", icon: Database, color: "text-accent" },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border-white/10 flex items-center gap-4 md:gap-6 group hover:translate-y-[-2px] transition-all">
              <div className={cn("w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-foreground/5 flex items-center justify-center shrink-0", stat.color)}>
                <stat.icon className="w-5 h-5 md:w-7 md:h-7" />
              </div>
              <div>
                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-0.5">{stat.label}</p>
                <p className="text-sm md:text-xl font-black tabular-nums uppercase">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <section className="grid lg:grid-cols-2 gap-8 items-start animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          <div className="glass-card p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border-white/10 space-y-8 shadow-2xl relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground block leading-none mb-1">Source</span>
                    <span className="text-[11px] font-black uppercase tracking-widest">Product Bitstream</span>
                  </div>
                </div>
                <div className="flex bg-zinc-950 p-1 rounded-xl border border-white/5">
                  <button 
                    onClick={() => setLanguage('en')}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                      language === 'en' ? "bg-primary text-white" : "text-muted-foreground hover:text-white"
                    )}
                  >
                    English
                  </button>
                  <button 
                    onClick={() => setLanguage('bn')}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                      language === 'bn' ? "bg-primary text-white" : "text-muted-foreground hover:text-white"
                    )}
                  >
                    Bengali
                  </button>
                </div>
              </div>

              {!sourceImage ? (
                <FileUploader 
                  onFilesSelect={handleFileSelect}
                  onClear={() => setSourceImage(null)}
                  hasAssets={!!sourceImage}
                  assetCount={sourceImage ? 1 : 0}
                  maxAssets={1}
                />
              ) : (
                <div className="relative group rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl aspect-square">
                  <img src={sourceImage} alt="Source" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <Button variant="ghost" onClick={() => setSourceImage(null)} className="rounded-2xl h-14 w-14 bg-white/10 backdrop-blur-md text-white hover:bg-destructive hover:text-white">
                      <Trash2 className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <Button 
              onClick={handleForge} 
              disabled={isForging || !sourceImage} 
              className="w-full h-14 md:h-16 rounded-xl md:rounded-2xl bg-foreground text-background hover:scale-[1.02] transition-all font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] shadow-xl group"
            >
              {isForging ? (
                <><Loader2 className="w-4 h-4 md:w-5 md:h-5 mr-2 animate-spin" /> Synthesizing...</>
              ) : (
                <><Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2 text-primary group-hover:animate-pulse" /> Forge Catalog Entry</>
              )}
            </Button>
          </div>

          <div className="glass-card p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border-white/10 min-h-[500px] lg:sticky lg:top-32 flex flex-col space-y-8 shadow-2xl">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground block leading-none mb-1">Architecture</span>
                  <span className="text-[11px] font-black uppercase tracking-widest">Catalog Monitor</span>
                </div>
              </div>
              {output && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 animate-pulse">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-primary">Orchestrated</span>
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col">
              {output ? (
                <Tabs defaultValue="preview" className="w-full flex-1 flex flex-col">
                  <TabsList className="bg-foreground/5 p-1 rounded-2xl border border-foreground/5 mb-6">
                    <TabsTrigger value="preview" className="flex-1 rounded-xl px-4 py-2 font-black text-[9px] uppercase tracking-widest">Visual Card</TabsTrigger>
                    <TabsTrigger value="json" className="flex-1 rounded-xl px-4 py-2 font-black text-[9px] uppercase tracking-widest">JSON Data</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="preview" className="flex-1 mt-0 outline-none animate-in fade-in zoom-in-95">
                    <div className="bg-zinc-950 rounded-[2.5rem] overflow-hidden border border-white/5 flex flex-col shadow-2xl">
                      <div className="aspect-[16/9] overflow-hidden relative">
                         <img src={sourceImage!} alt="Product" className="w-full h-full object-cover" />
                         <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/80 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest">
                            {output.product.category}
                         </div>
                      </div>
                      <div className="p-8 space-y-6">
                        <div className="flex justify-between items-start">
                           <h3 className="text-2xl font-black tracking-tighter uppercase">{output.product.name}</h3>
                           <p className="text-xl font-black text-primary tabular-nums">{output.product.estimatedPrice}</p>
                        </div>
                        <p className="text-sm text-muted-foreground font-medium leading-relaxed">{output.product.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                           {output.product.tags.map((tag, idx) => (
                             <span key={idx} className="px-2 py-1 rounded-lg bg-white/5 border border-white/5 text-[8px] font-black uppercase tracking-widest text-muted-foreground">
                               {tag}
                             </span>
                           ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                           {Object.entries(output.product.specs).slice(0, 4).map(([key, val], idx) => (
                             <div key={idx}>
                               <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1">{key}</p>
                               <p className="text-[10px] font-bold text-white truncate">{val}</p>
                             </div>
                           ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="json" className="flex-1 mt-0 outline-none flex flex-col">
                    <div className="flex-1 bg-zinc-950 rounded-[2rem] p-6 border border-white/5 font-code text-[11px] leading-relaxed text-green-400 overflow-auto custom-scrollbar shadow-inner min-h-[400px]">
                      <pre className="whitespace-pre-wrap break-all">{JSON.stringify(output.product, null, 2)}</pre>
                    </div>
                    <Button 
                      onClick={handleCopyJson}
                      className="w-full h-14 md:h-16 rounded-xl md:rounded-2xl bg-primary text-white hover:scale-[1.02] transition-all font-black text-[10px] uppercase tracking-[0.15em] shadow-xl mt-6 group"
                    >
                      {copied ? <Check className="w-5 h-5 mr-2" /> : <Copy className="w-5 h-5 mr-2 group-hover:translate-y-[-2px] transition-transform" />}
                      Dispatch Catalog Entry
                    </Button>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="flex-1 min-h-[450px] flex flex-col items-center justify-center text-center space-y-8 opacity-20 select-none bg-foreground/5 rounded-[2.5rem] border border-dashed border-foreground/10">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-foreground/5 flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 md:w-12 md:h-12 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg md:text-xl font-black uppercase tracking-[0.3em]">Awaiting Asset</p>
                    <p className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em]">Initiate catalog sequence</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="system-specs" className="mt-32 md:mt-48 pt-16 md:pt-32 border-t border-foreground/5">
           <div className="text-center mb-12 md:mb-16 space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mx-auto">
              <Zap className="w-3.5 h-3.5" />
              Module Capability
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Product Synthesis <br /><span className="text-gradient">Specifications</span></h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Tag, title: "Vision Tagging", desc: "Utilizes advanced neural architectures to identify product categories, materials, and features from a single raw bitstream." },
              { icon: Globe, title: "Bilingual Logic", desc: "Synthesizes native Bengali and English descriptions, optimized for both local marketplaces and global delivery pipelines." },
              { icon: CreditCard, title: "Price Estimation", desc: "Analyzes visual quality and category benchmarks to provide logical market price estimations in regional currencies." },
            ].map((feature, i) => (
              <div key={i} className="glass-card p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] space-y-4 md:space-y-6 hover:translate-y-[-4px] transition-all">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-foreground/5 flex items-center justify-center text-primary">
                  <feature.icon className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h3 className="text-lg md:text-xl font-black uppercase tracking-tight">{feature.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="w-full py-12 px-8 border-t border-foreground/5 bg-background/80 backdrop-blur-3xl">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-center md:text-left">© 2026 FORGE STUDIOS. PRODUCT CATALOG ARCHITECTURE READY.</p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <a href="/docs" className="hover:text-foreground">Docs</a>
            <a href="/performance" className="hover:text-foreground">Audit</a>
            <a href="/api-reference" className="hover:text-foreground">API</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
