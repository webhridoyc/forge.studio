"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { 
  Copy, 
  Download, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  BarChart3, 
  X,
  Zap,
  Maximize2
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { formatBase64Code, downloadTextFile, type ProcessedAsset } from "@/lib/image-utils"
import { cn } from "@/lib/utils"

interface CodeOutputProps {
  asset: ProcessedAsset
  onRemove: () => void
}

export function CodeOutput({ asset, onRemove }: CodeOutputProps) {
  const { toast } = useToast()
  const [copied, setCopied] = React.useState<string | null>(null)

  const formats = [
    { id: "uri", label: "Data URI", icon: "🔗" },
    { id: "raw", label: "Raw String", icon: "📄" },
    { id: "html", label: "HTML Tag", icon: "🌐" },
    { id: "css", label: "CSS Prop", icon: "🎨" },
  ] as const

  const handleCopy = (type: typeof formats[number]["id"]) => {
    const code = formatBase64Code(asset.base64, type)
    navigator.clipboard.writeText(code)
    setCopied(type)
    toast({
      title: "Payload Copied",
      description: `Optimized ${type.toUpperCase()} snippet ready.`,
    })
    setTimeout(() => setCopied(null), 2000)
  }

  const handleDownload = (type: typeof formats[number]["id"]) => {
    const code = formatBase64Code(asset.base64, type)
    downloadTextFile(code, `${asset.name.split(".")[0]}-${type}.txt`)
  }

  const getDisplayValue = (type: typeof formats[number]["id"]) => {
    const fullCode = formatBase64Code(asset.base64, type)
    if (fullCode.length <= 400) return fullCode
    return `${fullCode.substring(0, 400)}\n\n/* [SYSTEM: LARGE BITSTREAM VIRTUALIZED FOR UI STABILITY] */\n/* CLICK 'COPY' TO RETRIEVE COMPLETE DATA */`
  }

  const sizeIncrease = Math.round(((asset.optimizedSize - asset.originalSize) / asset.originalSize) * 100)

  return (
    <div className="w-full relative group">
      {/* Asset Header Info */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6 px-4">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-3xl overflow-hidden bg-foreground/5 p-1 border border-foreground/5 shadow-inner">
            <img src={asset.base64} alt={asset.name} className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
              {asset.name}
              <span className="px-3 py-1 rounded-full bg-primary/10 text-[10px] text-primary uppercase border border-primary/20">
                {asset.format.split('/')[1]}
              </span>
            </h3>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">
              {asset.dimensions.width}px × {asset.dimensions.height}px
            </p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onRemove}
          className="rounded-full h-12 w-12 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
        >
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* Performance Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Original Size", value: `${(asset.originalSize / 1024).toFixed(1)} KB`, icon: Maximize2, color: "text-foreground" },
          { label: "Base64 Size", value: `${(asset.optimizedSize / 1024).toFixed(1)} KB`, icon: BarChart3, color: "text-primary" },
          { label: "Size Overhead", value: `+${sizeIncrease}%`, icon: Zap, color: sizeIncrease > 35 ? "text-destructive" : "text-accent" },
          { label: "Load Impact", value: "Minimal", icon: Zap, color: "text-accent" },
        ].map((stat, i) => (
          <div key={i} className="bg-foreground/[0.02] border border-foreground/5 rounded-[2rem] p-6 flex flex-col items-center text-center">
            <stat.icon className={cn("w-5 h-5 mb-3 opacity-40", stat.color)} />
            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</p>
            <p className={cn("text-xl font-black tabular-nums tracking-tighter", stat.color)}>{stat.value}</p>
          </div>
        ))}
      </div>

      <Tabs defaultValue="uri" className="w-full">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-6">
          <TabsList className="bg-foreground/5 p-1 rounded-2xl border border-foreground/5 h-auto">
            {formats.map((format) => (
              <TabsTrigger
                key={format.id}
                value={format.id}
                className="rounded-xl px-5 py-2.5 font-bold text-[10px] uppercase tracking-widest data-[state=active]:bg-foreground data-[state=active]:text-background"
              >
                {format.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {formats.map((format) => (
          <TabsContent key={format.id} value={format.id} className="relative mt-0 outline-none">
            <div className="glass-card rounded-[3rem] overflow-hidden border border-foreground/5 shadow-xl">
              <div className="bg-background/40 rounded-[2.8rem] relative p-8">
                <Textarea
                  readOnly
                  value={getDisplayValue(format.id)}
                  className="min-h-[280px] font-code text-[13px] leading-relaxed bg-transparent border-0 resize-none pr-12 focus-visible:ring-0 custom-scrollbar"
                />
                <div className="absolute top-8 right-8 flex flex-col gap-3">
                  <Button
                    size="icon"
                    onClick={() => handleCopy(format.id)}
                    className={cn(
                      "rounded-2xl shadow-xl h-12 w-12 transition-all duration-300 hover:scale-110",
                      copied === format.id ? "bg-accent text-white" : "bg-primary text-white"
                    )}
                  >
                    {copied === format.id ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleDownload(format.id)}
                    className="rounded-2xl shadow-lg h-12 w-12 bg-background/50 border-foreground/10 hover:bg-foreground hover:text-background"
                  >
                    <Download className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
