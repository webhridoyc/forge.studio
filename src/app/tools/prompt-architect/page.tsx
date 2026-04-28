"use client"

import * as React from "react"
import { NavigationHeader } from "@/components/NavigationHeader"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { 
  Target, 
  Sparkles, 
  Terminal, 
  Copy, 
  Check, 
  Trash2, 
  Cpu, 
  Layers, 
  Activity, 
  ShieldCheck, 
  Loader2,
  Settings2,
  Zap,
  Info,
  ChevronRight,
  Database
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { forgePrompt, type ForgePromptOutput } from "@/ai/flows/forge-prompt-flow"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PromptArchitectPage() {
  const { toast } = useToast()
  const [concept, setConcept] = React.useState("")
  const [persona, setPersona] = React.useState("Software Architect")
  const [output, setOutput] = React.useState<ForgePromptOutput | null>(null)
  const [isForaging, setIsForaging] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const handleForge = async () => {
    if (!concept.trim()) return
    setIsForaging(true)
    try {
      const result = await forgePrompt({ concept, persona })
      setOutput(result)
      toast({ title: "Synthesis Complete", description: "System prompt orchestrated successfully." })
    } catch (e) {
      toast({ variant: "destructive", title: "Synthesis Failed", description: "AI engine could not reconcile the concept." })
    } finally {
      setIsForaging(false)
    }
  }

  const handleCopy = () => {
    if (!output) return
    navigator.clipboard.writeText(JSON.stringify(output.systemPrompt, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({ title: "Architecture Dispatched", description: "Structured prompt copied to clipboard." })
  }

  const metrics = React.useMemo(() => ({
    length: concept.length,
    complexity: concept.length > 300 ? 'Advanced' : concept.length > 100 ? 'Standard' : 'Initial'
  }), [concept])

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-primary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-secondary/5 blur-[150px] rounded-full" />
      </div>

      <NavigationHeader />

      <main className="container mx-auto px-4 pt-32 md:pt-48 pb-32 relative z-10 max-w-7xl">
        <section className="text-center space-y-8 mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mx-auto">
            <Target className="w-3.5 h-3.5" />
            Agentic Orchestration Suite
          </div>
          <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-none uppercase">
            Prompt <br /><span className="text-gradient">Architect Pro.</span>
          </h1>
          <p className="text-sm md:text-lg text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
            Industrial system prompt synthesis. Transform rough concepts into structured JSON architectures optimized for multi-agent swarms and high-fidelity execution.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 animate-in fade-in duration-1000 delay-150">
          {[
            { label: "Concept Volume", value: `${metrics.length} Chars`, icon: Layers, color: "text-primary" },
            { label: "Synthesis Type", value: persona, icon: Cpu, color: "text-secondary" },
            { label: "Logic Depth", value: output ? "Optimized" : metrics.complexity, icon: Activity, color: "text-accent" },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border-white/10 flex items-center gap-4 md:gap-6 group hover:translate-y-[-2px] transition-all">
              <div className={cn("w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-foreground/5 flex items-center justify-center shrink-0", stat.color)}>
                <stat.icon className="w-5 h-5 md:w-7 md:h-7" />
              </div>
              <div>
                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-0.5">{stat.label}</p>
                <p className="text-sm md:text-xl font-black tabular-nums uppercase">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <section className="grid lg:grid-cols-2 gap-6 md:gap-8 items-start animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          <div className="glass-card p-6 md:p-10 rounded-[2rem] md:rounded-[3.5rem] border-white/10 space-y-6 md:space-y-8 shadow-2xl relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Database className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground block leading-none mb-1">Source</span>
                    <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest">Concept Bitstream</span>
                  </div>
                </div>
                <Select value={persona} onValueChange={setPersona}>
                  <SelectTrigger className="w-[180px] h-10 rounded-xl border-white/5 bg-zinc-950 font-black text-[9px] uppercase tracking-widest">
                    <SelectValue placeholder="Persona" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-white/5">
                    <SelectItem value="Software Architect" className="text-[10px] font-black uppercase">Software Architect</SelectItem>
                    <SelectItem value="Creative Director" className="text-[10px] font-black uppercase">Creative Director</SelectItem>
                    <SelectItem value="Technical Writer" className="text-[10px] font-black uppercase">Technical Writer</SelectItem>
                    <SelectItem value="Industrial Engineer" className="text-[10px] font-black uppercase">Industrial Engineer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative group">
                <Textarea 
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  placeholder="Paste your rough agent concept here (e.g. 'A bot that helps developers optimize SQL queries for PostgreSQL 15')..."
                  className="min-h-[300px] md:min-h-[450px] rounded-[1.5rem] md:rounded-[2rem] bg-zinc-950 border-white/5 focus:ring-primary p-6 md:p-8 text-[13px] md:text-[14px] font-medium text-zinc-300 transition-all custom-scrollbar shadow-inner resize-none"
                />
                {concept && (
                  <Button variant="ghost" size="icon" onClick={() => setConcept("")} className="absolute top-4 right-4 h-8 w-8 rounded-lg text-zinc-500 hover:text-destructive hover:bg-destructive/5">
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>
            </div>

            <Button 
              onClick={handleForge} 
              disabled={isForaging || !concept} 
              className="w-full h-14 md:h-16 rounded-xl md:rounded-2xl bg-foreground text-background hover:scale-[1.02] transition-all font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] shadow-xl group"
            >
              {isForaging ? (
                <><Loader2 className="w-4 h-4 md:w-5 md:h-5 mr-2 animate-spin" /> Synthesizing...</>
              ) : (
                <><Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2 text-primary group-hover:animate-pulse" /> Forge System Prompt</>
              )}
            </Button>
          </div>

          <div className="glass-card p-6 md:p-10 rounded-[2rem] md:rounded-[3.5rem] border-white/10 min-h-[400px] md:min-h-[600px] lg:sticky lg:top-32 flex flex-col space-y-6 md:space-y-8 shadow-2xl">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground block leading-none mb-1">Architecture</span>
                  <span className="text-[11px] font-black uppercase tracking-widest">Orchestration Monitor</span>
                </div>
              </div>
              {output && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 animate-pulse">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-primary">Orchestrated</span>
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col">
              {output ? (
                <div className="animate-in zoom-in-95 duration-500 space-y-6 h-full flex flex-col">
                  <div className="flex-1 bg-zinc-950 rounded-[2rem] p-6 md:p-8 border border-white/5 font-code text-[11px] md:text-[12px] leading-relaxed text-green-400 overflow-auto custom-scrollbar shadow-inner min-h-[350px]">
                    <pre className="whitespace-pre-wrap break-all">{JSON.stringify(output.systemPrompt, null, 2)}</pre>
                  </div>
                  <Button 
                    onClick={handleCopy}
                    className="w-full h-14 md:h-16 rounded-xl md:rounded-2xl bg-primary text-white hover:scale-[1.02] transition-all font-black text-[10px] uppercase tracking-[0.15em] shadow-xl shadow-primary/20 group"
                  >
                    {copied ? <Check className="w-5 h-5 mr-2" /> : <Copy className="w-5 h-5 mr-2 group-hover:translate-y-[-2px] transition-transform" />}
                    Dispatch Prompt
                  </Button>
                </div>
              ) : (
                <div className="flex-1 min-h-[350px] md:min-h-[450px] flex flex-col items-center justify-center text-center space-y-8 opacity-20 select-none bg-foreground/5 rounded-[2.5rem] border border-dashed border-foreground/10">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-foreground/5 flex items-center justify-center">
                    <Target className="w-8 h-8 md:w-12 md:h-12 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg md:text-xl font-black uppercase tracking-[0.3em]">Awaiting Concept</p>
                    <p className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em]">Initiate synthesis sequence</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="system-specs" className="mt-32 md:mt-48 pt-16 md:pt-32 border-t border-foreground/5">
           <div className="text-center mb-12 md:mb-16 space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mx-auto">
              <Settings2 className="w-3.5 h-3.5" />
              Module Specifications
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Architectural <br /><span className="text-gradient">Capabilities</span></h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Zap, title: "Context synthesis", desc: "Intelligently extracts core objectives and technical constraints from unstructured concepts, synthesizing them into precise agent instructions." },
              { icon: Target, title: "Persona Mapping", desc: "Applies professional linguistic frameworks to ensure the synthesized prompt maintains a consistent and industrial-grade persona." },
              { icon: ShieldCheck, title: "Agentic Validation", desc: "Prompts are structured to prevent common LLM pitfalls like hallucination or instruction drift, ensuring high-fidelity execution." },
            ].map((feature, i) => (
              <div key={i} className="glass-card p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] space-y-4 md:space-y-6 hover:translate-y-[-4px] transition-all">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-foreground/5 flex items-center justify-center text-primary">
                  <feature.icon className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h3 className="text-lg md:text-xl font-black uppercase tracking-tight">{feature.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="w-full py-12 px-8 border-t border-foreground/5 bg-background/80 backdrop-blur-3xl">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-center md:text-left">© 2026 FORGE STUDIOS. PROMPT ARCHITECTURE SECURED.</p>
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
