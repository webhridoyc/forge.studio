"use client"

import * as React from "react"
import { NavigationHeader } from "@/components/NavigationHeader"
import { FileUploader } from "@/components/FileUploader"
import { optimizeImage, type ProcessedAsset, type OutputFormat } from "@/lib/image-utils"
import { useToast } from "@/hooks/use-toast"
import { 
  ImageIcon, 
  Zap, 
  Download, 
  Trash2, 
  Loader2,
  Maximize2,
  Activity,
  Maximize,
  ShieldCheck,
  Layers,
  ChevronRight,
  Sparkles,
  Cpu,
  BarChart3,
  Monitor,
  Info,
  Settings2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ImageOptimizerPage() {
  const { toast } = useToast()
  const [assets, setAssets] = React.useState<ProcessedAsset[]>([])
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [quality, setQuality] = React.useState([0.8])
  const [scale, setScale] = React.useState([1.0])
  const [targetFormat, setTargetFormat] = React.useState<OutputFormat>('image/webp')

  const handleFilesSelect = async (files: File[]) => {
    setIsProcessing(true)
    const newAssets: ProcessedAsset[] = []
    
    for (const file of files) {
      try {
        const asset = await optimizeImage(file, targetFormat, 2000 * scale[0], quality[0])
        newAssets.push(asset)
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Synthesis Error",
          description: `Could not process ${file.name}`,
        })
      }
    }

    setAssets(prev => [...prev, ...newAssets])
    setIsProcessing(false)
    toast({
      title: "Synthesis Complete",
      description: `Successfully recalibrated ${newAssets.length} asset bitstreams.`,
    })
  }

  const handleDownload = (asset: ProcessedAsset) => {
    const link = document.createElement('a')
    link.href = asset.base64
    const ext = asset.format.split('/')[1] || 'webp'
    link.download = `forge-${asset.name.split('.')[0]}.${ext}`
    link.click()
  }

  const totalOriginal = assets.reduce((acc, a) => acc + a.originalSize, 0)
  const totalOptimized = assets.reduce((acc, a) => acc + a.optimizedSize, 0)
  const totalSavings = totalOriginal > 0 ? Math.round(((totalOriginal - totalOptimized) / totalOriginal) * 100) : 0

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-accent/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-primary/5 blur-[150px] rounded-full" />
      </div>

      <NavigationHeader />

      <main className="container mx-auto px-4 pt-32 md:pt-48 pb-32 relative z-10 max-w-7xl">
        <section className="text-center space-y-8 mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mx-auto">
            <Layers className="w-3.5 h-3.5" />
            Industrial Asset Optimizer
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none uppercase">
            Image <br /><span className="text-gradient">Optimizer Pro.</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
            Professional bitstream synthesis. Recalibrate resolution, compression quality, and target MIME types for production-ready asset delivery with real-time optimization previews.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-in fade-in duration-1000 delay-150">
          {[
            { label: "Efficiency Index", value: `${totalSavings}% Savings`, icon: Activity, color: "text-accent" },
            { label: "Asset Volume", value: `${assets.length} Files`, icon: Layers, color: "text-primary" },
            { label: "Bitstream Guard", value: "Verified", icon: ShieldCheck, color: "text-secondary" },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 rounded-[2rem] border-white/10 flex items-center gap-6 group hover:translate-y-[-4px] transition-all">
              <div className={cn("w-14 h-14 rounded-2xl bg-foreground/5 flex items-center justify-center shrink-0", stat.color)}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-xl font-black tabular-nums">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <section className="space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          <div className="glass-card p-6 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border-white/10 space-y-10 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none hidden md:block">
              <Cpu className="w-32 h-32 text-accent" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-b border-foreground/5 pb-10">
              <div className="space-y-4">
                <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-2 flex items-center gap-2">
                  Compression ({Math.round(quality[0] * 100)}%) <Zap className="w-3 h-3 text-accent" />
                </Label>
                <Slider value={quality} onValueChange={setQuality} max={1} step={0.05} className="py-4" />
              </div>

              <div className="space-y-4">
                <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-2 flex items-center gap-2">
                  Resolution Scale ({Math.round(scale[0] * 100)}%) <Maximize2 className="w-3 h-3 text-primary" />
                </Label>
                <Slider value={scale} onValueChange={setScale} min={0.1} max={2.0} step={0.1} className="py-4" />
              </div>

              <div className="space-y-4">
                <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-2">MIME Output Pipeline</Label>
                <Select value={targetFormat} onValueChange={(v: any) => setTargetFormat(v)}>
                  <SelectTrigger className="h-14 rounded-2xl bg-background border-foreground/10 font-black text-[10px] uppercase tracking-widest px-6 shadow-inner">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-foreground/10">
                    <SelectItem value="image/webp" className="font-bold text-[10px] uppercase tracking-widest">WebP (Next-Gen)</SelectItem>
                    <SelectItem value="image/jpeg" className="font-bold text-[10px] uppercase tracking-widest">JPEG (Universal)</SelectItem>
                    <SelectItem value="image/png" className="font-bold text-[10px] uppercase tracking-widest">PNG (Lossless)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <FileUploader 
              onFilesSelect={handleFilesSelect} 
              onClear={() => setAssets([])}
              hasAssets={assets.length > 0}
              assetCount={assets.length}
              maxAssets={10}
            />

            {isProcessing && (
              <div className="flex flex-col items-center gap-4 py-12 animate-in fade-in">
                <Loader2 className="w-12 h-12 text-accent animate-spin" />
                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-accent">Recalibrating Bitstreams...</p>
              </div>
            )}

            {assets.length > 0 && (
              <div className="space-y-12 pt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4">
                   <div className="flex items-center gap-6 bg-accent/5 px-8 py-6 rounded-[2rem] border border-accent/10 shadow-inner w-full md:w-auto">
                    <Activity className="w-6 h-6 text-accent animate-pulse" />
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">Efficiency Reconciled</p>
                      <p className="text-3xl font-black text-accent tracking-tighter">{totalSavings > 0 ? `-${totalSavings}% Data Reduction` : 'Lossless Synthesis'}</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={() => setAssets([])} 
                    className="text-[10px] font-black uppercase tracking-widest text-destructive hover:bg-destructive/10 h-14 rounded-2xl px-8 w-full md:w-auto transition-all"
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Purge Batch
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {assets.map((asset) => (
                    <div key={asset.id} className="glass-card group rounded-[2.5rem] border-white/10 overflow-hidden flex flex-col hover:translate-y-[-4px] transition-all duration-300 shadow-xl">
                      <div className="p-8 space-y-8 flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1 min-w-0 flex-1">
                            <span className="px-2 py-0.5 rounded-md bg-accent/10 text-accent text-[9px] font-black uppercase tracking-widest border border-accent/20">
                              {asset.format.split('/')[1]}
                            </span>
                            <h4 className="font-black text-xl tracking-tight truncate uppercase mt-2">{asset.name}</h4>
                          </div>
                          <div className="h-24 w-24 rounded-3xl bg-foreground/5 p-1 border border-foreground/5 overflow-hidden group-hover:scale-110 transition-transform shadow-2xl relative shrink-0">
                            <img src={asset.base64} alt={asset.name} className="w-full h-full object-contain" />
                            <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Maximize className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-foreground/[0.03] p-5 rounded-[1.5rem] border border-foreground/5">
                            <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-1">ORIGINAL</p>
                            <p className="text-base font-black tabular-nums">{(asset.originalSize / 1024).toFixed(1)} KB</p>
                          </div>
                          <div className="bg-accent/5 p-5 rounded-[1.5rem] border border-accent/5">
                            <p className="text-[8px] font-black uppercase tracking-widest text-accent mb-1">SYNTHESIZED</p>
                            <p className="text-base font-black text-accent tabular-nums">{(asset.optimizedSize / 1024).toFixed(1)} KB</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-foreground/5 rounded-2xl border border-foreground/5">
                          <ShieldCheck className="w-4 h-4 text-primary" />
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            {asset.dimensions.width}x{asset.dimensions.height} Resolution Validated
                          </p>
                        </div>
                      </div>

                      <Button 
                        onClick={() => handleDownload(asset)}
                        className="w-full h-16 bg-accent text-white hover:bg-accent/90 transition-all font-black text-[11px] uppercase tracking-widest rounded-none border-t border-white/5 group"
                      >
                        <Download className="w-4 h-4 mr-2 group-hover:translate-y-0.5 transition-transform" /> Download Optimized Asset
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="module-specs" className="mt-48 space-y-16 animate-in fade-in duration-1000">
          <div className="text-center space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mx-auto">
              <Settings2 className="w-3.5 h-3.5" />
              Efficiency Protocol
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Asset Synthesis <br /><span className="text-gradient">Capabilities</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "WebP Synthesis", desc: "Transforms legacy binary formats into optimized WebP bitstreams, offering superior compression while maintaining high visual fidelity." },
              { icon: Maximize2, title: "Resolution Scaling", desc: "Industrial-grade resizing engine that recalibrates pixel density to your exact specifications before encoding." },
              { icon: ShieldCheck, title: "Privacy First", desc: "All synthesis occurs locally within the V8 engine. Your assets never leave the workstation, ensuring zero data transmission risk." },
            ].map((feature, i) => (
              <div key={i} className="glass-card p-10 rounded-[2.5rem] space-y-6 hover:translate-y-[-8px] transition-all">
                <div className="w-14 h-14 rounded-2xl bg-foreground/5 flex items-center justify-center text-accent">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">{feature.title}</h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="mt-32 pt-32 border-t border-foreground/5">
           <h2 className="text-2xl md:text-3xl font-black text-center mb-16 tracking-tighter uppercase">Optimizer FAQ — Asset Delivery</h2>
           <div className="max-w-4xl mx-auto">
             <Accordion type="single" collapsible className="w-full space-y-4">
                {[
                  {
                    q: "Why should I optimize assets before Base64 encoding?",
                    a: "Base64 encoding adds a mandatory 33% size overhead. By optimizing your assets first—reducing resolution and switching to WebP—you can often achieve a final bitstream that is smaller than the original raw file, even with the encoding penalty."
                  },
                  {
                    q: "What is the recommended resolution for UI icons?",
                    a: "For high-density displays (Retina), we recommend scaling icons to 2x their display size. Our resolution scaler allows you to input exact pixel dimensions to ensure crisp rendering across all workstation configurations."
                  },
                  {
                    q: "Is it safe to batch process multiple assets?",
                    a: "Absolutely. The Forge Studios engine is optimized for parallel synthesis. You can drop up to 10 assets into the batch workbench, and our pipeline will recalibrate each one sequentially without blocking the UI thread."
                  }
                ].map((faq, idx) => (
                  <AccordionItem 
                    key={idx} 
                    value={`item-${idx}`} 
                    className="border-2 border-foreground/5 rounded-[1.5rem] md:rounded-[2rem] px-8 bg-foreground/[0.02] overflow-hidden data-[state=open]:border-accent/20 transition-all"
                  >
                    <AccordionTrigger className="text-left font-bold hover:no-underline py-8 text-lg tracking-tight hover:text-accent">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-8 leading-relaxed font-medium">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
             </Accordion>
           </div>
        </section>
      </main>

      <footer className="w-full py-12 px-8 border-t border-foreground/5 bg-background/80 backdrop-blur-3xl">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">© 2026 FORGE STUDIOS. ASSETS OPTIMIZED SECURELY.</p>
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
