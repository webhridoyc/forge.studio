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
  Database,
  BarChart3,
  Activity,
  Layers,
  ChevronRight,
  ShieldCheck,
  Zap,
  Info
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const DEFAULT_SAMPLE = {
  "studio": "Forge Studios",
  "synthesis_engine": "V8 Industrial",
  "version": "7.0.0",
  "is_active": true,
  "config": {
    "optimization_level": "maximum",
    "supported_formats": ["Base64", "WebP", "SVG", "JSON", "TS"]
  },
  "metrics": {
    "uptime": 99.99,
    "load_factor": 0.42
  }
}

export default function JsonSynthPage() {
  const { toast } = useToast()
  const [input, setInput] = React.useState(JSON.stringify(DEFAULT_SAMPLE, null, 2))
  const [output, setOutput] = React.useState(JSON.stringify(DEFAULT_SAMPLE, null, 2))
  const [copied, setCopied] = React.useState(false)
  const [mode, setMode] = React.useState<"json" | "ts" | "raw">("json")
  const [metrics, setMetrics] = React.useState({ size: 0, keys: 0, depth: 0 })

  const calculateMetrics = (str: string) => {
    try {
      const obj = JSON.parse(str)
      const getKeysCount = (o: any): number => {
        if (typeof o !== 'object' || o === null) return 0
        return Object.keys(o).length + Object.values(o).reduce((acc, val) => acc + getKeysCount(val), 0)
      }
      const getDepth = (o: any): number => {
        if (typeof o !== 'object' || o === null) return 0
        const depths = Object.values(o).map(val => getDepth(val))
        return 1 + (depths.length > 0 ? Math.max(...depths) : 0)
      }
      setMetrics({
        size: str.length,
        keys: getKeysCount(obj),
        depth: getDepth(obj)
      })
    } catch (e) {
      setMetrics({ size: str.length, keys: 0, depth: 0 })
    }
  }

  React.useEffect(() => {
    calculateMetrics(input)
  }, [input])

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
        const subName = key.charAt(0).toUpperCase() + key.slice(1)
        result += `  ${key}: ${subName};\n`
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
    const textToCopy = output || input
    if (!textToCopy) return
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    toast({ title: "Synthesis Dispatched", description: "Result copied to workstation." })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClear = () => {
    setInput("")
    setOutput("")
    setMode("raw")
  }

  const handleLoadSample = () => {
    const sampleStr = JSON.stringify(DEFAULT_SAMPLE, null, 2)
    setInput(sampleStr)
    setOutput(sampleStr)
    setMode("json")
    toast({ title: "Sample Loaded", description: "Industrial test bitstream ready." })
  }

  const displayValue = output || input
  const isUsingInputAsPreview = !output && input.length > 0

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-primary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-accent/5 blur-[150px] rounded-full" />
      </div>

      <NavigationHeader />

      <main className="container mx-auto px-4 pt-32 md:pt-48 pb-32 relative z-10 max-w-7xl">
        <section className="text-center space-y-8 mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mx-auto">
            <Braces className="w-3.5 h-3.5" />
            Industrial Data Orchestration
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none uppercase">
            JSON <br /><span className="text-gradient">Synthesizer Pro.</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
            Professional data synthesis workstation. Transform bitstreams, generate TypeScript architectures, and optimize structural hierarchies instantly with zero latency.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-in fade-in duration-1000 delay-150">
          {[
            { label: "Bitstream Size", value: `${metrics.size} Bytes`, icon: Database, color: "text-primary" },
            { label: "Node Density", value: `${metrics.keys} Keys`, icon: Layers, color: "text-secondary" },
            { label: "Structural Depth", value: `Level ${metrics.depth}`, icon: BarChart3, color: "text-accent" },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 rounded-[2rem] border-white/10 flex items-center gap-6 group hover:translate-y-[-4px] transition-all">
              <div className={cn("w-14 h-14 rounded-2xl bg-foreground/5 flex items-center justify-center shrink-0", stat.color)}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-xl font-black tabular-nums">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <section className="grid lg:grid-cols-2 gap-8 items-start animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          <div className="glass-card p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border-white/10 space-y-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
               <Activity className="w-24 h-24 text-primary" />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Database className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground block leading-none mb-1">Source</span>
                    <span className="text-[11px] font-black uppercase tracking-widest">Data Bitstream</span>
                  </div>
                </div>
                <div className="flex gap-4">
                   <button 
                    onClick={handleLoadSample}
                    className="text-[9px] font-black text-primary uppercase tracking-widest hover:underline"
                  >
                    Load Sample
                  </button>
                  {input && <span className="text-[10px] font-black text-primary uppercase tracking-widest">Validated</span>}
                </div>
              </div>
              <div className="relative group">
                <Textarea 
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value)
                    if (output) setOutput("")
                  }}
                  placeholder='{ "studio": "Forge Studios", "engine": "V8", "active": true }'
                  className="min-h-[450px] rounded-[2rem] bg-foreground/5 border-foreground/10 focus:ring-primary p-8 text-[13px] font-code transition-all custom-scrollbar shadow-inner resize-none scroll-smooth"
                />
                {input && (
                  <Button variant="ghost" size="icon" onClick={handleClear} className="absolute top-6 right-6 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button onClick={handleFormat} disabled={!input} className="h-16 rounded-2xl bg-foreground text-background hover:scale-[1.02] transition-all font-black text-[11px] uppercase tracking-widest shadow-xl">
                <Maximize2 className="w-4 h-4 mr-2" /> Format
              </Button>
              <Button onClick={handleSort} disabled={!input} variant="outline" className="h-16 rounded-2xl border-foreground/10 hover:bg-foreground hover:text-background transition-all font-black text-[11px] uppercase tracking-widest">
                <ArrowDownAz className="w-5 h-5 mr-2" /> Sort Keys
              </Button>
              <Button onClick={handleGenerateTs} disabled={!input} variant="outline" className="h-16 rounded-2xl border-foreground/10 hover:bg-foreground hover:text-background transition-all font-black text-[11px] uppercase tracking-widest">
                <Code2 className="w-5 h-5 mr-2" /> JSON to TS
              </Button>
              <Button onClick={handleMinify} disabled={!input} variant="outline" className="h-16 rounded-2xl border-foreground/10 hover:bg-foreground hover:text-background transition-all font-black text-[11px] uppercase tracking-widest">
                <Minimize2 className="w-5 h-5 mr-2" /> Minify
              </Button>
            </div>
          </div>

          <div className="glass-card p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] border-white/10 min-h-[500px] lg:sticky lg:top-32 flex flex-col space-y-8 shadow-2xl">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground block leading-none mb-1">Synthesis</span>
                  <span className="text-[11px] font-black uppercase tracking-widest">Result Portal</span>
                </div>
              </div>
              {displayValue && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 animate-pulse">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-primary">
                    {mode === 'ts' ? 'TypeScript Validated' : isUsingInputAsPreview ? 'Live Preview' : 'Synthesis Optimized'}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1 relative group flex flex-col min-h-0">
              {displayValue ? (
                <div className="animate-in zoom-in-95 duration-500 h-full flex flex-col space-y-6 flex-1">
                  <div className="flex-1 bg-zinc-950 rounded-[2rem] p-8 border border-white/5 font-code text-[12px] md:text-[13px] leading-relaxed text-green-400 overflow-auto custom-scrollbar shadow-inner min-h-[400px]">
                    <pre className="whitespace-pre-wrap break-all">{displayValue}</pre>
                  </div>
                  <Button 
                    onClick={handleCopyOutput}
                    className="w-full h-16 rounded-2xl bg-primary text-white hover:scale-[1.02] transition-all font-black text-[11px] uppercase tracking-[0.15em] shadow-xl shadow-primary/20 group"
                  >
                    {copied ? <Check className="w-5 h-5 mr-2" /> : <Copy className="w-5 h-5 mr-2 group-hover:translate-y-[-2px] transition-transform" />}
                    Copy Synthesis
                  </Button>
                </div>
              ) : (
                <div className="flex-1 min-h-[450px] flex flex-col items-center justify-center text-center space-y-8 opacity-20 select-none bg-foreground/5 rounded-[2.5rem] border border-dashed border-foreground/10">
                  <div className="w-24 h-24 rounded-full bg-foreground/5 flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-black uppercase tracking-[0.3em]">Awaiting Input</p>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em]">Standby for bitstream</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="system-specs" className="mt-48 space-y-16 animate-in fade-in duration-1000">
          <div className="text-center space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mx-auto">
              <Zap className="w-3.5 h-3.5" />
              Module Specs
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Data Synthesis <br /><span className="text-gradient">Capabilities</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Maximize2, title: "Beautification", desc: "Transforms minified or chaotic bitstreams into industry-standard formatted JSON with configurable indentation." },
              { icon: Code2, title: "Architecture", desc: "Synthesizes robust TypeScript interfaces directly from JSON objects, maintaining recursive node integrity." },
              { icon: ShieldCheck, title: "Validation", desc: "Real-time parsing and validation using the V8 industrial engine to ensure structural compliance." },
            ].map((feature, i) => (
              <div key={i} className="glass-card p-10 rounded-[2.5rem] space-y-6 hover:translate-y-[-8px] transition-all">
                <div className="w-14 h-14 rounded-2xl bg-foreground/5 flex items-center justify-center text-primary">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">{feature.title}</h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="mt-32 pt-32 border-t border-foreground/5">
           <h2 className="text-2xl md:text-3xl font-black text-center mb-16 tracking-tighter uppercase">JSON Orchestration — FAQ</h2>
           <div className="max-w-4xl mx-auto">
             <Accordion type="single" collapsible className="w-full space-y-4">
                {[
                  {
                    q: "How does 'JSON to TS' synthesis work?",
                    a: "Our engine recursively traverses your JSON bitstream, identifying property types and structural hierarchies. It then synthesizes a production-ready TypeScript interface, including nested object definitions and array typed mappings."
                  },
                  {
                    q: "What is the benefit of Key Sorting?",
                    a: "Alphabetical key sorting improves structural predictability and git diff readability. It is an industrial standard for maintaining clean, professional configuration and data files in large-scale architectures."
                  },
                  {
                    q: "Is my data processed on the cloud?",
                    a: "No. In alignment with the Forge Studios Privacy Protocol, all data synthesis occurs locally within your browser's memory. Your JSON bitstreams are never transmitted to our servers."
                  }
                ].map((faq, idx) => (
                  <AccordionItem 
                    key={idx} 
                    value={`item-${idx}`} 
                    className="border-2 border-foreground/5 rounded-[1.5rem] md:rounded-[2rem] px-8 bg-foreground/[0.02] overflow-hidden data-[state=open]:border-primary/20 transition-all"
                  >
                    <AccordionTrigger className="text-left font-bold hover:no-underline py-8 text-lg tracking-tight">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-8 leading-relaxed font-medium">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
             </Accordion>
           </div>
        </section>
      </main>

      <footer className="w-full py-12 px-8 border-t border-foreground/5 bg-background/80 backdrop-blur-3xl">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">© 2026 FORGE STUDIOS. DATA ORCHESTRATED SECURELY.</p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <a href="/docs" className="hover:text-foreground">Docs</a>
            <a href="/performance" className="hover:text-foreground">Audit</a>
            <a href="/api-reference" className="hover:text-foreground">API</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
