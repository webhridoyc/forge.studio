
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
  Activity
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
        // Advanced synthesis: combining scale and quality
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
            Asset Delivery Suite
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none uppercase">
            Image <br /><span className="text-gradient">Optimizer Pro.</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
            Advanced bitstream synthesis. Recalibrate resolution and quality for production-ready asset delivery.
          </p>
        </section>

        <section className="space-y-12">
          <div className="glass-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border-white/10 space-y-10 shadow-2xl">
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
              <div className="space-y-8 pt-12">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4 bg-foreground/5 px-6 py-4 rounded-2xl border border-foreground/5">
                    <Activity className="w-4 h-4 text-accent" />
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Efficiency Index</p>
                      <p className="text-xl font-black text-accent">{totalSavings > 0 ? `-${totalSavings}%` : 'Lossless'}</p>
                    </div>
                  </div>
                  <Button variant="ghost" onClick={() => setAssets([])} className="text-[10px] font-black uppercase tracking-widest text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4 mr-2" /> Reset Batch
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {assets.map((asset) => (
                    <div key={asset.id} className="glass-card p-6 rounded-[2rem] border-white/10 flex items-center gap-6 group hover:translate-y-[-4px] transition-all duration-300">
                      <div className="w-20 h-20 rounded-2xl bg-foreground/5 p-1 border border-foreground/5 overflow-hidden shrink-0 shadow-inner">
                        <img src={asset.base64} alt={asset.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-black text-sm tracking-tight truncate uppercase">{asset.name}</h4>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-[9px] font-bold text-muted-foreground uppercase">{(asset.originalSize / 1024).toFixed(1)} KB</span>
                          <ArrowRight className="w-2.5 h-2.5 text-accent" />
                          <span className="text-[9px] font-black text-accent uppercase">{(asset.optimizedSize / 1024).toFixed(1)} KB</span>
                        </div>
                      </div>
                      <Button 
                        size="icon" 
                        onClick={() => handleDownload(asset)}
                        className="rounded-xl h-11 w-11 bg-accent text-white hover:scale-110 transition-all shadow-lg shadow-accent/20"
                      >
                        <Download className="w-4 h-4" />
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
