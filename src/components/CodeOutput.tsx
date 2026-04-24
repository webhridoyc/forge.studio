
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
    <div className="w-full relative group">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6 px-4">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-3xl overflow-hidden bg-foreground/5 p-1 border border-foreground/5 shadow-inner group-hover:scale-110 transition-transform">
            <img src={asset.base64} alt={asset.name} className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-3">
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
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={handleSaveToCloud}
            disabled={isSaving}
            className="rounded-2xl h-12 px-6 border-foreground/10 hover:bg-primary hover:text-white transition-all font-bold text-[10px] uppercase tracking-widest"
          >
            {isSaving ? "Vaulting..." : <><Cloud className="w-4 h-4 mr-2" /> Vault to Cloud</>}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onRemove}
            className="rounded-full h-12 w-12 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 px-2 md:px-0">
        {[
          { label: "Original Size", value: `${(asset.originalSize / 1024).toFixed(1)} KB`, icon: Maximize2, color: "text-foreground" },
          { label: "Base64 Size", value: `${(asset.optimizedSize / 1024).toFixed(1)} KB`, icon: BarChart3, color: "text-primary" },
          { label: "Overhead", value: `+${sizeIncrease}%`, icon: Zap, color: sizeIncrease > 35 ? "text-destructive" : "text-accent" },
          { label: "Status", value: "Ready", icon: ChevronRight, color: "text-accent" },
        ].map((stat, i) => (
          <div key={i} className="bg-foreground/[0.02] border border-foreground/5 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 flex flex-col items-center text-center">
            <stat.icon className={cn("w-4 h-4 md:w-5 md:h-5 mb-2 md:mb-3 opacity-40", stat.color)} />
            <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</p>
            <p className={cn("text-base md:text-xl font-black tabular-nums tracking-tighter", stat.color)}>{stat.value}</p>
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
                className="rounded-xl px-5 py-2.5 font-bold text-[10px] uppercase tracking-widest data-[state=active]:bg-foreground data-[state=active]:text-background transition-all"
              >
                {format.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {formats.map((format) => (
          <TabsContent key={format.id} value={format.id} className="relative mt-0 outline-none">
            <div className="glass-card rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-foreground/5 shadow-xl">
              <div className="bg-background/40 relative p-6 md:p-8">
                <Textarea
                  readOnly
                  value={getDisplayValue(format.id)}
                  className="min-h-[220px] md:min-h-[280px] font-code text-[12px] md:text-[13px] leading-relaxed bg-transparent border-0 resize-none pr-12 focus-visible:ring-0 custom-scrollbar"
                />
                <div className="absolute top-6 right-6 md:top-8 md:right-8 flex flex-col gap-3">
                  <Button
                    size="icon"
                    onClick={() => handleCopy(format.id)}
                    className={cn(
                      "rounded-xl md:rounded-2xl shadow-xl h-10 w-10 md:h-12 md:w-12 transition-all duration-300 hover:scale-110",
                      copied === format.id ? "bg-accent text-white" : "bg-primary text-white"
                    )}
                  >
                    {copied === format.id ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleDownload(format.id)}
                    className="rounded-xl md:rounded-2xl shadow-lg h-10 w-10 md:h-12 md:w-12 bg-background/50 border-foreground/10 hover:bg-foreground hover:text-background"
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
