
"use client"

import * as React from "react"
import { NavigationHeader } from "@/components/NavigationHeader"
import { FileUploader } from "@/components/FileUploader"
import { optimizeImage, type ProcessedAsset } from "@/lib/image-utils"
import { useToast } from "@/hooks/use-toast"
import { 
  ImageIcon, 
  Zap, 
  Download, 
  Trash2, 
  Loader2,
  ArrowRight,
  ShieldCheck,
  Activity
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function ImageOptimizerPage() {
  const { toast } = useToast()
  const [assets, setAssets] = React.useState<ProcessedAsset[]>([])
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [quality, setQuality] = React.useState([0.8])

  const handleFilesSelect = async (files: File[]) => {
    setIsProcessing(true)
    const newAssets: ProcessedAsset[] = []
    
    for (const file of files) {
      try {
        const asset = await optimizeImage(file, 'image/webp', 1200, quality[0])
        newAssets.push(asset)
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Compression Failed",
          description: `Could not optimize ${file.name}`,
        })
      }
    }

    setAssets(prev => [...prev, ...newAssets])
    setIsProcessing(false)
  }

  const handleDownload = (asset: ProcessedAsset) => {
    const link = document.createElement('a')
    link.href = asset.base64
    link.download = `optimized-${asset.name.split('.')[0]}.webp`
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
            <ImageIcon className="w-3.5 h-3.5" />
            Asset Delivery Suite
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none uppercase">
            Image <br /><span className="text-gradient">Optimizer.</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
            High-performance WebP synthesis. Recalibrate your assets for peak LCP scores with lossless resizing.
          </p>
        </section>

        <section className="space-y-12">
          <div className="glass-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border-white/10 space-y-10 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-foreground/5 pb-10">
              <div className="space-y-4 w-full md:w-auto flex-1 max-w-md">
                <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-2 flex items-center gap-2">
                  Bitstream Quality ({Math.round(quality[0] * 100)}%) <Zap className="w-3 h-3 text-accent" />
                </Label>
                <Slider 
                  value={quality} 
                  onValueChange={setQuality} 
                  max={1} 
                  step={0.05} 
                  className="w-full"
                />
              </div>
              
              {assets.length > 0 && (
                <div className="flex items-center gap-4 bg-foreground/5 px-6 py-4 rounded-2xl border border-foreground/5 animate-in zoom-in duration-500">
                  <Activity className="w-4 h-4 text-accent" />
                  <div className="text-left">
                    <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Efficiency Index</p>
                    <p className="text-xl font-black text-accent">-{totalSavings}% Size</p>
                  </div>
                </div>
              )}

              <Button 
                variant="ghost" 
                onClick={() => setAssets([])}
                className="rounded-xl h-12 px-6 text-[10px] font-black uppercase tracking-widest text-destructive hover:bg-destructive/10 shrink-0"
              >
                <Trash2 className="w-4 h-4 mr-2" /> Reset
              </Button>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
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
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
