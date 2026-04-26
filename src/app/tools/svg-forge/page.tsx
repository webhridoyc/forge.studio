"use client"

import * as React from "react"
import { NavigationHeader } from "@/components/NavigationHeader"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { 
  FileCode, 
  Copy, 
  Check, 
  Trash2, 
  Zap, 
  Sparkles,
  ExternalLink,
  Code2
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SvgForgePage() {
  const { toast } = useToast()
  const [input, setInput] = React.useState("")
  const [copied, setCopied] = React.useState<string | null>(null)

  const handleCopy = (type: 'data-uri' | 'raw') => {
    let output = input.trim()
    if (type === 'data-uri') {
      output = `data:image/svg+xml;base64,${btoa(input)}`
    }
    navigator.clipboard.writeText(output)
    setCopied(type)
    toast({
      title: "SVG Synthesized",
      description: `Copied ${type === 'data-uri' ? 'Data URI' : 'Clean SVG'} to clipboard.`,
    })
    setTimeout(() => setCopied(null), 2000)
  }

  const isSvg = input.trim().startsWith('<svg')

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-secondary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-primary/5 blur-[150px] rounded-full" />
      </div>

      <NavigationHeader />

      <main className="container mx-auto px-4 pt-32 md:pt-48 pb-32 relative z-10 max-w-4xl">
        <section className="text-center space-y-8 mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-black uppercase tracking-widest mx-auto">
            <FileCode className="w-3.5 h-3.5" />
            Vector Orchestration
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none uppercase">
            SVG <br /><span className="text-gradient">Studio.</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
            Professional SVG-to-Code synthesis. Clean your vector paths and generate optimized Data URIs or React components instantly.
          </p>
        </section>

        <section className="space-y-8">
          <div className="glass-card p-8 md:p-12 rounded-[3rem] border-white/10 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-2">
                Input Raw SVG Code
              </label>
              <div className="relative group">
                <Textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="<svg ...>...</svg>"
                  className="min-h-[300px] rounded-[2rem] bg-foreground/5 border-foreground/10 focus:ring-secondary p-8 text-[13px] font-code transition-all custom-scrollbar"
                />
                {input && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setInput("")}
                    className="absolute top-6 right-6 rounded-xl hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            {input && isSvg && (
              <div className="flex flex-col md:flex-row gap-4 animate-in slide-in-from-bottom-4 duration-500">
                <Button 
                  onClick={() => handleCopy('data-uri')}
                  className="flex-1 h-14 rounded-2xl bg-secondary text-white hover:scale-105 transition-all font-black text-xs uppercase tracking-widest px-8 shadow-xl shadow-secondary/20"
                >
                  {copied === 'data-uri' ? <Check className="w-4 h-4 mr-2" /> : <ExternalLink className="w-4 h-4 mr-2" />}
                  Data URI Snippet
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleCopy('raw')}
                  className="flex-1 h-14 rounded-2xl border-foreground/10 hover:bg-foreground hover:text-background transition-all font-black text-xs uppercase tracking-widest px-8"
                >
                  {copied === 'raw' ? <Check className="w-4 h-4 mr-2" /> : <Code2 className="w-4 h-4 mr-2" />}
                  Clean Vector Code
                </Button>
              </div>
            )}

            {!isSvg && input.trim() && (
              <div className="flex items-center gap-3 p-6 rounded-2xl bg-destructive/5 border border-destructive/10 text-destructive text-sm font-bold uppercase tracking-tight">
                <Zap className="w-5 h-5" />
                Input does not appear to be valid SVG synthesis.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
