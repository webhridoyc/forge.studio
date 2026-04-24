"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Download, Check } from "lucide-react"
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
    { id: "uri", label: "Data URI" },
    { id: "raw", label: "Raw String" },
    { id: "html", label: "HTML Tag" },
    { id: "css", label: "CSS Property" },
  ] as const

  const handleCopy = (type: typeof formats[number]["id"]) => {
    const code = formatBase64Code(base64, type)
    navigator.clipboard.writeText(code)
    setCopied(type)
    toast({
      title: "Copied to clipboard",
      description: `${type.toUpperCase()} snippet has been copied successfully.`,
    })
    setTimeout(() => setCopied(null), 2000)
  }

  const handleDownload = (type: typeof formats[number]["id"]) => {
    const code = formatBase64Code(base64, type)
    downloadTextFile(code, `${fileName.split(".")[0]}-${type}.txt`)
  }

  return (
    <div className="w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Tabs defaultValue="uri" className="w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
          <TabsList className="bg-muted p-1 rounded-lg">
            {formats.map((format) => (
              <TabsTrigger
                key={format.id}
                value={format.id}
                className="rounded-md px-4 py-2 transition-all data-[state=active]:bg-background data-[state=active]:text-primary"
              >
                {format.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {formats.map((format) => (
          <TabsContent key={format.id} value={format.id} className="relative mt-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <div className="relative group">
              <Textarea
                readOnly
                value={formatBase64Code(base64, format.id)}
                className="min-h-[250px] font-code text-sm p-6 bg-card border-2 border-border/50 rounded-2xl resize-none pr-12 focus-visible:border-primary/50 transition-colors"
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => handleCopy(format.id)}
                  className="rounded-full shadow-lg h-10 w-10 bg-background hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  {copied === format.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleDownload(format.id)}
                  className="rounded-full shadow-lg h-10 w-10 bg-background hover:bg-muted transition-all"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between px-2">
              <p className="text-xs text-muted-foreground font-medium">
                Size in Base64: {((base64.length * 0.75) / 1024).toFixed(2)} KB (approx)
              </p>
              <Button 
                variant="link" 
                className="text-xs text-primary h-auto p-0 hover:no-underline hover:text-secondary"
                onClick={() => handleCopy(format.id)}
              >
                Click to copy snippet
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}