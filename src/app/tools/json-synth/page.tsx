
"use client"

import * as React from "react"
import { NavigationHeader } from "@/components/NavigationHeader"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { 
  Braces, 
  Copy, 
  Check, 
  Trash2, 
  Zap, 
  FileCode,
  LayoutGrid,
  Minimize2,
  Maximize2
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function JsonSynthPage() {
  const { toast } = useToast()
  const [input, setInput] = React.useState("")
  const [copied, setCopied] = React.useState(false)

  const handleFormat = () => {
    try {
      const obj = JSON.parse(input)
      setInput(JSON.stringify(obj, null, 2))
      toast({ title: "Synthesis Complete", description: "JSON structure has been formatted." })
    } catch (e) {
      toast({ variant: "destructive", title: "Parse Error", description: "Invalid JSON structure detected." })
    }
  }

  const handleMinify = () => {
    try {
      const obj = JSON.parse(input)
      setInput(JSON.stringify(obj))
      toast({ title: "Synthesis Complete", description: "JSON bitstream has been minified." })
    } catch (e) {
      toast({ variant: "destructive", title: "Parse Error", description: "Invalid JSON structure detected." })
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(input)
    setCopied(true)
    toast({ title: "Copied", description: "JSON payload sent to clipboard." })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-primary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-accent/5 blur-[150px] rounded-full" />
      </div>

      <NavigationHeader />

      <main className="container mx-auto px-4 pt-32 md:pt-48 pb-32 relative z-10 max-w-4xl">
        <section className="text-center space-y-8 mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mx-auto">
            <Braces className="w-3.5 h-3.5" />
            Data Structure Synthesis
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none uppercase">
            JSON <br /><span className="text-gradient">Synthesizer.</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
            Professional-grade JSON orchestration. Format, minify, and validate complex data structures with zero latency.
          </p>
        </section>

        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          <div className="glass-card p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border-white/10 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">
                  Input Bitstream
                </label>
                {input && (
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                    {input.length} Bytes
                  </span>
                )}
              </div>
              <div className="relative group">
                <Textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='{ "status": "awaiting_input" }'
                  className="min-h-[400px] rounded-[2rem] md:rounded-[2.5rem] bg-foreground/5 border-foreground/10 focus:ring-primary p-8 text-[13px] font-code transition-all custom-scrollbar"
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                onClick={handleFormat}
                disabled={!input}
                className="h-14 rounded-2xl bg-foreground text-background hover:scale-105 transition-all font-black text-[10px] uppercase tracking-widest px-6 shadow-xl"
              >
                <Maximize2 className="w-4 h-4 mr-2" /> Format
              </Button>
              <Button 
                onClick={handleMinify}
                disabled={!input}
                variant="outline"
                className="h-14 rounded-2xl border-foreground/10 hover:bg-foreground hover:text-background transition-all font-black text-[10px] uppercase tracking-widest px-6"
              >
                <Minimize2 className="w-4 h-4 mr-2" /> Minify
              </Button>
              <Button 
                onClick={handleCopy}
                disabled={!input}
                variant="outline"
                className="h-14 rounded-2xl border-foreground/10 hover:bg-foreground hover:text-background transition-all font-black text-[10px] uppercase tracking-widest px-6 col-span-2"
              >
                {copied ? <Check className="w-4 h-4 mr-2 text-primary" /> : <Copy className="w-4 h-4 mr-2" />}
                Copy Synthesis
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
