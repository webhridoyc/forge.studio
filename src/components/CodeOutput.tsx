
"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { 
  Copy, 
  Download, 
  Check, 
  Cloud,
  BarChart3, 
  X,
  Zap,
  Maximize2,
  ChevronRight
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useUser, useFirestore, addDocumentNonBlocking } from "@/firebase"
import { collection, serverTimestamp } from "firebase/firestore"
import { formatBase64Code, downloadTextFile, type ProcessedAsset } from "@/lib/image-utils"
import { cn } from "@/lib/utils"

interface CodeOutputProps {
  asset: ProcessedAsset
  onRemove: () => void
}

export function CodeOutput({ asset, onRemove }: CodeOutputProps) {
  const { toast } = useToast()
  const { user } = useUser()
  const db = useFirestore()
  const [copied, setCopied] = React.useState<string | null>(null)
  const [isSaving, setIsSaving] = React.useState(false)

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

  const handleSaveToCloud = () => {
    if (!user || !db) {
      toast({
        title: "Auth Required",
        description: "Sign in to vault your assets to the cloud.",
      })
      return
    }

    setIsSaving(true)
    const snippetsRef = collection(db, 'users', user.uid, 'conversionSnippets')
    
    addDocumentNonBlocking(snippetsRef, {
      userId: user.uid,
      fileName: asset.name,
      base64String: asset.base64,
      mimeType: asset.format,
      outputFormat: 'data-uri',
      createdAt: serverTimestamp()
    });

    toast({
      title: "Sync Initiated",
      description: "Asset is being vaulted to your cloud history.",
    })
    
    // Optimistic UI reset
    setTimeout(() => setIsSaving(false), 1000)
  }

  const handleDownload = (type: typeof formats[number]["id"]) => {
    const code = formatBase64Code(asset.base64, type)
    downloadTextFile(code, `${asset.name.split(".")[0]}-${type}.txt`)
  }

  const getDisplayValue = (type: typeof formats[number]["id"]) => {
    const fullCode = formatBase64Code(asset.base64, type)
    if (fullCode.length <= 1000) return fullCode
    return `${fullCode.substring(0, 1000)}\n\n/* [SYSTEM: LARGE BITSTREAM VIRTUALIZED FOR UI STABILITY] */\n/* CLICK 'COPY' TO RETRIEVE COMPLETE DATA */`
  }

  const sizeIncrease = Math.round(((asset.optimizedSize - asset.originalSize) / asset.originalSize) * 100)

  return (
    <div className="w-full relative group overflow-x-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6 px-2 md:px-4">
        <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
          <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl md:rounded-3xl overflow-hidden bg-foreground/5 p-1 border border-foreground/5 shadow-inner shrink-0 transition-transform">
            <img src={asset.base64} alt={asset.name} className="w-full h-full object-contain" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base md:text-2xl font-black tracking-tight flex flex-wrap items-center gap-2">
              <span className="truncate max-w-[120px] md:max-w-none">{asset.name}</span>
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-[8px] md:text-[10px] text-primary uppercase border border-primary/20">
                {asset.format.split('/')[1]}
              </span>
            </h3>
            <p className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">
              {asset.dimensions.width}px × {asset.dimensions.height}px
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto justify-end">
          <Button 
            variant="outline" 
            onClick={handleSaveToCloud}
            disabled={isSaving}
            className="flex-1 md:flex-none rounded-xl md:rounded-2xl h-11 md:h-12 px-3 md:px-6 border-foreground/10 hover:bg-primary hover:text-white transition-all font-bold text-[9px] md:text-[10px] uppercase tracking-widest whitespace-nowrap"
          >
            {isSaving ? "Vaulting..." : <><Cloud className="w-3.5 h-3.5 mr-1.5 md:mr-2" /> Vault</>}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onRemove}
            className="rounded-full h-10 w-10 md:h-12 md:w-12 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-8 px-1 md:px-0">
        {[
          { label: "Original", value: `${(asset.originalSize / 1024).toFixed(1)} KB`, icon: Maximize2, color: "text-foreground" },
          { label: "Base64", value: `${(asset.optimizedSize / 1024).toFixed(1)} KB`, icon: BarChart3, color: "text-primary" },
          { label: "Overhead", value: `+${sizeIncrease}%`, icon: Zap, color: sizeIncrease > 35 ? "text-destructive" : "text-accent" },
          { label: "Status", value: "Ready", icon: ChevronRight, color: "text-accent" },
        ].map((stat, i) => (
          <div key={i} className="bg-foreground/[0.02] border border-foreground/5 rounded-xl md:rounded-[2rem] p-3 md:p-6 flex flex-col items-center text-center">
            <stat.icon className={cn("w-3.5 h-3.5 md:w-5 md:h-5 mb-1.5 md:mb-3 opacity-40", stat.color)} />
            <p className="text-[7px] md:text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-0.5 md:mb-1">{stat.label}</p>
            <p className={cn("text-xs md:text-xl font-black tabular-nums tracking-tighter", stat.color)}>{stat.value}</p>
          </div>
        ))}
      </div>

      <Tabs defaultValue="uri" className="w-full">
        <div className="w-full overflow-x-auto custom-scrollbar pb-2 mb-6">
          <TabsList className="bg-foreground/5 p-1 rounded-2xl border border-foreground/5 h-auto flex-nowrap w-max min-w-full md:min-w-0">
            {formats.map((format) => (
              <TabsTrigger
                key={format.id}
                value={format.id}
                className="rounded-xl px-4 md:px-5 py-2 md:py-2.5 font-bold text-[9px] md:text-[10px] uppercase tracking-widest data-[state=active]:bg-foreground data-[state=active]:text-background transition-all"
              >
                {format.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {formats.map((format) => (
          <TabsContent key={format.id} value={format.id} className="relative mt-0 outline-none">
            <div className="glass-card rounded-[1.5rem] md:rounded-[3rem] overflow-hidden border border-foreground/5 shadow-xl">
              <div className="bg-background/40 relative p-4 md:p-8">
                <Textarea
                  readOnly
                  value={getDisplayValue(format.id)}
                  className="min-h-[180px] md:min-h-[280px] font-code text-[11px] md:text-[13px] leading-relaxed bg-transparent border-0 resize-none pr-10 md:pr-12 focus-visible:ring-0 custom-scrollbar"
                />
                <div className="absolute top-4 right-4 md:top-8 md:right-8 flex flex-col gap-2 md:gap-3">
                  <Button
                    size="icon"
                    onClick={() => handleCopy(format.id)}
                    className={cn(
                      "rounded-lg md:rounded-2xl shadow-xl h-9 w-9 md:h-12 md:w-12 transition-all duration-300 hover:scale-110",
                      copied === format.id ? "bg-accent text-white" : "bg-primary text-white"
                    )}
                  >
                    {copied === format.id ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : <Copy className="w-4 h-4 md:w-5 md:h-5" />}
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleDownload(format.id)}
                    className="rounded-lg md:rounded-2xl shadow-lg h-9 w-9 md:h-12 md:w-12 bg-background/50 border-foreground/10 hover:bg-foreground hover:text-background"
                  >
                    <Download className="w-4 h-4 md:w-5 md:h-5" />
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
