"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Download, Check, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { formatBase64Code, downloadTextFile } from "@/lib/image-utils"

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
      title: "Successfully Copied",
      description: `The ${type.toUpperCase()} fragment is ready to paste.`,
    })
    setTimeout(() => setCopied(null), 2000)
  }

  const handleDownload = (type: typeof formats[number]["id"]) => {
    const code = formatBase64Code(base64, type)
    downloadTextFile(code, `${fileName.split(".")[0]}-${type}.txt`)
  }

  return (
    <div className="w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <Tabs defaultValue="uri" className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <TabsList className="bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md h-auto flex-wrap">
            {formats.map((format) => (
              <TabsTrigger
                key={format.id}
                value={format.id}
                className="rounded-xl px-6 py-2.5 transition-all font-bold text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white shadow-lg data-[state=active]:scale-105"
              >
                <span className="mr-2">{format.icon}</span>
                {format.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {formats.map((format) => (
          <TabsContent key={format.id} value={format.id} className="relative mt-0 focus-visible:outline-none">
            <div className="relative group rounded-[2rem] overflow-hidden p-[1px] bg-gradient-to-br from-white/10 to-transparent">
              <div className="bg-card rounded-[calc(2rem-1px)] relative">
                <Textarea
                  readOnly
                  value={formatBase64Code(base64, format.id)}
                  className="min-h-[320px] font-code text-[13px] leading-relaxed p-8 bg-transparent border-0 resize-none pr-16 focus-visible:ring-0 custom-scrollbar"
                />
                <div className="absolute top-6 right-6 flex flex-col gap-3">
                  <Button
                    size="icon"
                    onClick={() => handleCopy(format.id)}
                    className={cn(
                      "rounded-2xl shadow-2xl h-12 w-12 transition-all hover:scale-110",
                      copied === format.id ? "bg-accent text-white" : "bg-primary text-white"
                    )}
                  >
                    {copied === format.id ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleDownload(format.id)}
                    className="rounded-2xl shadow-xl h-12 w-12 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white transition-all hover:scale-110"
                  >
                    <Download className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-4 font-bold">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-muted-foreground uppercase tracking-widest">
                  Payload Size: <span className="text-foreground">{((base64.length * 0.75) / 1024).toFixed(2)} KB</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Optimized Output</span>
              </div>
              <Button 
                variant="ghost" 
                className="text-[10px] uppercase tracking-widest text-accent hover:text-white hover:bg-accent/20 transition-all rounded-full px-6"
                onClick={() => handleCopy(format.id)}
              >
                Copy Snippet <ExternalLink className="ml-2 w-3 h-3" />
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
