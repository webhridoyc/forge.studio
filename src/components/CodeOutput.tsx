"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Download, Check, ExternalLink, ShieldCheck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { formatBase64Code, downloadTextFile } from "@/lib/image-utils"
import { cn } from "@/lib/utils"

interface CodeOutputProps {
  base64: string
  fileName: string
}

export function CodeOutput({ base64, fileName }: CodeOutputProps) {
  const { toast } = useToast()
  const [copied, setCopied] = React.useState<string | null>(null)

  const formats = [
    { id: "uri", label: "Data URI", icon: "🔗" },
    { id: "raw", label: "Raw String", icon: "📄" },
    { id: "html", label: "HTML Tag", icon: "🌐" },
    { id: "css", label: "CSS Prop", icon: "🎨" },
  ] as const

  const handleCopy = (type: typeof formats[number]["id"]) => {
    const code = formatBase64Code(base64, type)
    navigator.clipboard.writeText(code)
    setCopied(type)
    toast({
      title: "Synthesized Code Copied",
      description: `Full ${type.toUpperCase()} payload is ready for deployment.`,
    })
    setTimeout(() => setCopied(null), 2000)
  }

  const handleDownload = (type: typeof formats[number]["id"]) => {
    const code = formatBase64Code(base64, type)
    downloadTextFile(code, `${fileName.split(".")[0]}-${type}.txt`)
  }

  const getDisplayValue = (type: typeof formats[number]["id"]) => {
    const fullCode = formatBase64Code(base64, type)
    if (fullCode.length <= 500) return fullCode
    return `${fullCode.substring(0, 500)}\n\n/* [SYNTHESIS OPTIMIZED: PAYLOAD TRUNCATED FOR UI] */\n/* CLICK COPY TO OBTAIN FULL BITSTREAM */`
  }

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="mb-12 flex items-center gap-4 p-6 bg-accent/5 rounded-[2rem] border border-accent/10 text-accent">
        <ShieldCheck className="w-6 h-6 shrink-0" />
        <p className="text-xs font-bold uppercase tracking-[0.1em] leading-relaxed">
          Memory Safety Enabled: Large payloads are virtualized in the preview. Use "Copy" to retrieve the complete bitstream.
        </p>
      </div>

      <Tabs defaultValue="uri" className="w-full">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-10 gap-6">
          <TabsList className="bg-foreground/5 p-1.5 rounded-3xl border border-foreground/5 h-auto flex-wrap gap-1">
            {formats.map((format) => (
              <TabsTrigger
                key={format.id}
                value={format.id}
                className="rounded-2xl px-6 py-3 font-bold text-[11px] uppercase tracking-widest transition-all data-[state=active]:bg-foreground data-[state=active]:text-background shadow-lg"
              >
                {format.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {formats.map((format) => (
          <TabsContent key={format.id} value={format.id} className="relative mt-0 outline-none">
            <div className="glass-card rounded-[3.5rem] overflow-hidden p-1">
              <div className="bg-background/40 rounded-[3.3rem] relative p-12">
                <Textarea
                  readOnly
                  value={getDisplayValue(format.id)}
                  className="min-h-[420px] font-code text-[14px] leading-relaxed bg-transparent border-0 resize-none pr-12 focus-visible:ring-0 custom-scrollbar selection:bg-primary/20"
                />
                <div className="absolute top-10 right-10 flex flex-col gap-4">
                  <Button
                    size="icon"
                    onClick={() => handleCopy(format.id)}
                    className={cn(
                      "rounded-3xl shadow-2xl h-16 w-16 transition-all duration-300 hover:scale-110 active:scale-90",
                      copied === format.id ? "bg-accent text-white" : "bg-primary text-white"
                    )}
                  >
                    {copied === format.id ? <Check className="w-7 h-7" /> : <Copy className="w-7 h-7" />}
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleDownload(format.id)}
                    className="rounded-3xl shadow-xl h-16 w-16 bg-background/50 border-foreground/10 hover:bg-foreground hover:text-background transition-all hover:scale-110 active:scale-90"
                  >
                    <Download className="w-7 h-7" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-8 px-8">
              <div className="flex items-center gap-5">
                <div className="px-6 py-2 rounded-full bg-foreground/5 border border-foreground/5 text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                  Payload: <span className="text-foreground">{((base64.length * 0.75) / 1024).toFixed(1)} KB</span>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Synthesis Secure</span>
              </div>
              <Button 
                variant="ghost" 
                className="text-[11px] font-black uppercase tracking-[0.3em] text-primary hover:text-foreground transition-all rounded-full px-10 h-12"
                onClick={() => handleCopy(format.id)}
              >
                Copy Bitstream <ExternalLink className="ml-3 w-4 h-4" />
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}