
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
  Minimize2,
  Maximize2,
  Code2,
  ArrowDownAz,
  Sparkles,
  Terminal,
  ChevronRight,
  Database
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export default function JsonSynthPage() {
  const { toast } = useToast()
  const [input, setInput] = React.useState("")
  const [output, setOutput] = React.useState("")
  const [copied, setCopied] = React.useState(false)
  const [mode, setMode] = React.useState<"json" | "ts">("json")

  const handleFormat = () => {
    try {
      const obj = JSON.parse(input)
      const formatted = JSON.stringify(obj, null, 2)
      setOutput(formatted)
      setMode("json")
      toast({ title: "Synthesis Complete", description: "JSON structure has been formatted." })
    } catch (e) {
      toast({ variant: "destructive", title: "Parse Error", description: "Invalid JSON structure detected." })
    }
  }

  const handleMinify = () => {
    try {
      const obj = JSON.parse(input)
      const minified = JSON.stringify(obj)
      setOutput(minified)
      setMode("json")
      toast({ title: "Synthesis Complete", description: "JSON bitstream has been minified." })
    } catch (e) {
      toast({ variant: "destructive", title: "Parse Error", description: "Invalid JSON structure detected." })
    }
  }

  const handleSort = () => {
    try {
      const obj = JSON.parse(input)
      const sortObject = (o: any): any => {
        if (Array.isArray(o)) return o.map(sortObject)
        if (o === null || typeof o !== 'object') return o
        return Object.keys(o).sort().reduce((acc: any, key) => {
          acc[key] = sortObject(o[key])
          return acc
        }, {})
      }
      const sorted = JSON.stringify(sortObject(obj), null, 2)
      setOutput(sorted)
      setMode("json")
      toast({ title: "Synthesis Complete", description: "Keys sorted alphabetically." })
    } catch (e) {
      toast({ variant: "destructive", title: "Parse Error", description: "Invalid JSON." })
    }
  }

  const generateTsInterface = (obj: any, name: string = "RootObject"): string => {
    let result = `export interface ${name} {\n`
    for (const key in obj) {
      const val = obj[key]
      const type = val === null ? 'any' : typeof val
      if (type === 'object' && !Array.isArray(val)) {
        result += `  ${key}: {\n`
        for (const sub in val) {
          result += `    ${sub}: ${typeof val[sub]};\n`
        }
        result += `  };\n`
      } else if (Array.isArray(val)) {
        const itemType = val.length > 0 ? typeof val[0] : 'any'
        result += `  ${key}: ${itemType}[];\n`
      } else {
        result += `  ${key}: ${type};\n`
      }
    }
    result += `}`
    return result
  }

  const handleGenerateTs = () => {
    try {
      const obj = JSON.parse(input)
      const ts = generateTsInterface(obj)
      setOutput(ts)
      setMode("ts")
      toast({ title: "TS Synthesis Complete", description: "TypeScript interface generated." })
    } catch (e) {
      toast({ variant: "destructive", title: "Synthesis Failed", description: "Invalid JSON input." })
    }
  }

  const handleCopyOutput = () => {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    toast({ title: "Synthesis Dispatched", description: "Result copied to workstation." })
    setTimeout(() => setCopied(null), 2000)
  }

  const handleClear = () => {
    setInput("")
    setOutput("")
  }

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-primary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-accent/5 blur-[150px] rounded-full" />
      </div>

      <NavigationHeader />

      <main className="container mx-auto px-4 pt-32 md:pt-48 pb-32 relative z-10 max-w-6xl">
        <section className="text-center space-y-8 mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mx-auto">
            <Braces className="w-3.5 h-3.5" />
            Industrial Data Orchestration
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none uppercase">
            JSON <br /><span className="text-gradient">Synthesizer Pro.</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
            Professional data synthesis. Transform bitstreams, generate TypeScript architectures, and optimize structural hierarchies instantly.
          </p>
        </section>

        <section className="grid lg:grid-cols-2 gap-8 items-start animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          <div className="glass-card p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border-white/10 space-y-8 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Input Bitstream</label>
                {input && <span className="text-[10px] font-black text-primary uppercase tracking-widest">{input.length} Bytes</span>}
              </div>
              <div className="relative group">
                <Textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='{ "status": "awaiting_input" }'
                  className="min-h-[450px] rounded-[2rem] bg-foreground/5 border-foreground/10 focus:ring-primary p-8 text-[13px] font-code transition-all custom-scrollbar shadow-inner"
                />
                {input && (
                  <Button variant="ghost" size="icon" onClick={handleClear} className="absolute top-6 right-6 rounded-xl text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button onClick={handleFormat} disabled={!input} className="h-14 rounded-2xl bg-foreground text-background hover:scale-105 transition-all font-black text-[10px] uppercase tracking-widest shadow-xl">
                <Maximize2 className="w-3.5 h-3.5 mr-2" /> Format
              </Button>
              <Button onClick={handleSort} disabled={!input} variant="outline" className="h-14 rounded-2xl border-foreground/10 hover:bg-foreground hover:text-background transition-all font-black text-[10px] uppercase tracking-widest">
                <ArrowDownAz className="w-4 h-4 mr-2" /> Sort Keys
              </Button>
              <Button onClick={handleGenerateTs} disabled={!input} variant="outline" className="h-14 rounded-2xl border-foreground/10 hover:bg-foreground hover:text-background transition-all font-black text-[10px] uppercase tracking-widest">
                <Code2 className="w-4 h-4 mr-2" /> JSON to TS
              </Button>
              <Button onClick={handleMinify} disabled={!input} variant="outline" className="h-14 rounded-2xl border-foreground/10 hover:bg-foreground hover:text-background transition-all font-black text-[10px] uppercase tracking-widest">
                <Minimize2 className="w-4 h-4 mr-2" /> Minify
              </Button>
            </div>
          </div>

          <div className="glass-card p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border-white/10 min-h-[500px] lg:sticky lg:top-32 flex flex-col space-y-8">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Synthesis Result</span>
              </div>
              {output && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
                  <Database className="w-3 h-3 text-primary" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-primary">{mode === 'ts' ? 'TypeScript' : 'JSON'} Validated</span>
                </div>
              )}
            </div>

            <div className="flex-1 relative group">
              {output ? (
                <div className="animate-in zoom-in duration-500 h-full flex flex-col space-y-6">
                  <div className="flex-1 bg-zinc-950 rounded-[2rem] p-8 border border-white/5 font-code text-[12px] leading-relaxed text-green-400 overflow-auto custom-scrollbar shadow-2xl min-h-[400px]">
                    <pre className="whitespace-pre-wrap break-all">{output}</pre>
                  </div>
                  <Button 
                    onClick={handleCopyOutput}
                    className="w-full h-14 rounded-2xl bg-primary text-white hover:scale-[1.02] transition-all font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20"
                  >
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    Copy Synthesis
                  </Button>
                </div>
              ) : (
                <div className="h-full min-h-[450px] flex flex-col items-center justify-center text-center space-y-6 opacity-20 select-none">
                  <Sparkles className="w-16 h-16 text-primary" />
                  <div className="space-y-1">
                    <p className="text-sm font-black uppercase tracking-[0.3em]">Awaiting Input</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest">Synthesis module standby</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
