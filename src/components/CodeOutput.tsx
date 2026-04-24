"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Download, Check, ExternalLink, Info } from "lucide-react"
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
      title: "Copied to Clipboard",
      description: `Full ${type.toUpperCase()} string copied securely.`,
    })
    setTimeout(() => setCopied(null), 2000)
  }

  const handleDownload = (type: typeof formats[number]["id"]) => {
    const code = formatBase64Code(base64, type)
    downloadTextFile(code, `${fileName.split(".")[0]}-${type}.txt`)
  }

  // Anti-crash: Only render first 500 chars in the UI
  const getDisplayValue = (type: typeof formats[number]["id"]) => {
    const fullCode = formatBase64Code(base64, type)
    if (fullCode.length <= 500) return fullCode
    return `${fullCode.substring(0, 500)}\n\n/* ... [CODE TRUNCATED FOR UI PERFORMANCE] ... */\n/* CLICK COPY TO GET THE FULL STRING */`
  }

  return (
    <div className="w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out fill-mode-forwards">
      <div className="mb-6 flex items-center gap-3 p-4 bg-accent/10 rounded-2xl border border-accent/20 text-accent">
        <Info className="w-5 h-5 shrink-0" />
        <p className="text-xs font-bold uppercase tracking-wider leading-relaxed">
          Output optimized. Previews are truncated to prevent browser freezing. Use "Copy" for the full string.
        </p>
      </div>

      <Tabs defaultValue="uri" className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <TabsList className="bg-white/5 p-1.5 rounded-2xl border border-white/5 backdrop-blur-xl h-auto flex-wrap gap-1">
            {formats.map((format) => (
              <TabsTrigger
                key={format.id}
                value={format.id}
                className="rounded-xl px-5 py-2.5 transition-all font-bold text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white shadow-xl data-[state=active]:scale-[1.03] active:scale-95"
              >
                <span className="mr-2 opacity-80">{format.icon}</span>
                {format.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {formats.map((format) => (
          <TabsContent key={format.id} value={format.id} className="relative mt-0 focus-visible:outline-none">
            <div className="relative group rounded-[2.5rem] overflow-hidden p-[1px] bg-gradient-to-br from-white/10 to-transparent shadow-2xl transition-all duration-500 hover:shadow-primary/5">
              <div className="bg-card/80 backdrop-blur-xl rounded-[calc(2.5rem-1px)] relative">
                <Textarea
                  readOnly
                  value={getDisplayValue(format.id)}
                  className="min-h-[380px] font-code text-[13px] leading-relaxed p-10 bg-transparent border-0 resize-none pr-20 focus-visible:ring-0 custom-scrollbar selection:bg-primary/30"
                />
                <div className="absolute top-8 right-8 flex flex-col gap-3">
                  <Button
                    size="icon"
                    onClick={() => handleCopy(format.id)}
                    className={cn(
                      "rounded-2xl shadow-2xl h-14 w-14 transition-all duration-300 hover:scale-110 active:scale-90",
                      copied === format.id ? "bg-accent text-white" : "bg-primary text-white"
                    )}
                  >
                    {copied === format.id ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleDownload(format.id)}
                    className="rounded-2xl shadow-xl h-14 w-14 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300 hover:scale-110 active:scale-90"
                  >
                    <Download className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 px-6 font-bold">
              <div className="flex items-center gap-4">
                <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                  Optimized Size: <span className="text-foreground">{((base64.length * 0.75) / 1024).toFixed(2)} KB</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(var(--accent),0.5)]" />
                <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">Matrix Processed</span>
              </div>
              <Button 
                variant="ghost" 
                className="text-[10px] uppercase tracking-[0.2em] text-accent hover:text-white hover:bg-accent/20 transition-all rounded-full px-8 h-10"
                onClick={() => handleCopy(format.id)}
              >
                Copy Full Snippet <ExternalLink className="ml-2 w-3 h-3" />
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
