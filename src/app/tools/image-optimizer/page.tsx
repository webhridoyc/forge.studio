
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
  ArrowRight,
  Maximize2,
  Settings2,
  Layers,
  Activity,
  Maximize,
  ShieldCheck,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

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

      <main className="container mx-auto px-4 pt-32 md:pt-48 pb-32 relative z-10 max-w-6xl">
        <section className="text-center space-y-8 mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mx-auto">
            <Layers className="w-3.5 h-3.5" />
            Industrial Asset Optimizer
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none uppercase">
            Image <br /><span className="text-gradient">Optimizer Pro.</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
            Professional bitstream synthesis. Recalibrate resolution and quality for production-ready asset delivery with real-time optimization previews.
          </p>
        </section>

        <section className="space-y-12">
          <div className="glass-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border-white/10 space-y-10 shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-foreground/5 pb-10">
              <div className="space-y-4">
                <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-2 flex items-center gap-2">
                  Quality ({Math.round(quality[0] * 100)}%) <Zap className="w-3 h-3 text-accent" />
                </Label>
                <Slider value={quality} onValueChange={setQuality} max={1} step={0.05} />
              </div>

              <div className="space-y-4">
                <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-2 flex items-center gap-2">
                  Resolution Scale ({Math.round(scale[0] * 100)}%) <Maximize2 className="w-3 h-3 text-primary" />
                </Label>
                <Slider value={scale} onValueChange={setScale} min={0.1} max={2.0} step={0.1} />
              </div>

              <div className="space-y-4">
                <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-2">Output Pipeline</Label>
                <Select value={targetFormat} onValueChange={(v: any) => setTargetFormat(v)}>
                  <SelectTrigger className="h-12 rounded-xl bg-background border-foreground/10 font-black text-[10px] uppercase tracking-widest">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="image/webp" className="font-bold text-[10px] uppercase tracking-widest">WebP (Smallest)</SelectItem>
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
                <Loader2 className="w-10 h-10 text-accent animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-widest text-accent">Recalibrating Bitstreams...</p>
              </div>
            )}

            {assets.length > 0 && (
              <div className="space-y-12 pt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="flex items-center justify-between px-4">
                   <div className="flex items-center gap-6 bg-accent/5 px-8 py-4 rounded-[1.5rem] border border-accent/10 shadow-inner">
                    <Activity className="w-5 h-5 text-accent animate-pulse" />
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">Efficiency Index</p>
                      <p className="text-2xl font-black text-accent tracking-tighter">{totalSavings > 0 ? `-${totalSavings}% Reduction` : 'Lossless Synthesis'}</p>
                    </div>
                  </div>
                  <Button variant="ghost" onClick={() => setAssets([])} className="text-[10px] font-black uppercase tracking-widest text-destructive hover:bg-destructive/10 h-12 rounded-xl px-6">
                    <Trash2 className="w-4 h-4 mr-2" /> Reset Batch
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {assets.map((asset) => (
                    <div key={asset.id} className="glass-card group rounded-[2.5rem] border-white/10 overflow-hidden flex flex-col hover:translate-y-[-4px] transition-all duration-300 shadow-xl">
                      <div className="p-8 space-y-8 flex-1">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <span className="px-2 py-0.5 rounded-md bg-accent/10 text-accent text-[9px] font-black uppercase tracking-widest border border-accent/20">
                              {asset.format.split('/')[1]}
                            </span>
                            <h4 className="font-black text-xl tracking-tight truncate max-w-[200px] uppercase mt-2">{asset.name}</h4>
                          </div>
                          <div className="h-24 w-24 rounded-2xl bg-foreground/5 p-1 border border-foreground/5 overflow-hidden group-hover:scale-110 transition-transform shadow-2xl relative">
                            <img src={asset.base64} alt={asset.name} className="w-full h-full object-contain" />
                            <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Maximize className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-foreground/[0.03] p-4 rounded-2xl border border-foreground/5">
                            <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-1">ORIGINAL</p>
                            <p className="text-sm font-black tabular-nums">{(asset.originalSize / 1024).toFixed(1)} KB</p>
                          </div>
                          <div className="bg-accent/5 p-4 rounded-2xl border border-accent/5">
                            <p className="text-[8px] font-black uppercase tracking-widest text-accent mb-1">SYNTHESIZED</p>
                            <p className="text-sm font-black text-accent tabular-nums">{(asset.optimizedSize / 1024).toFixed(1)} KB</p>
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
                        className="w-full h-14 bg-accent text-white hover:bg-accent/90 transition-all font-black text-[10px] uppercase tracking-widest rounded-none border-t border-white/5"
                      >
                        <Download className="w-4 h-4 mr-2" /> Download Optimized Asset
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
