"use client"

import * as React from "react"
import { NavigationHeader } from "@/components/NavigationHeader"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { 
  Terminal, 
  Sparkles, 
  Play, 
  Zap, 
  Cpu, 
  Activity, 
  Layers, 
  ShieldCheck, 
  Trash2, 
  Copy, 
  Check, 
  Eye, 
  Info,
  ChevronRight,
  Code2,
  Loader2,
  Settings2
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { explainCode, type ExplainCodeOutput } from "@/ai/flows/explain-code-flow"

const DEFAULT_CODE = `<div class="relative min-h-[300px] md:min-h-[400px] w-full flex flex-col items-center justify-center p-6 md:p-8 bg-zinc-950 rounded-[2rem] md:rounded-[3rem] border border-white/5 overflow-hidden">
  <!-- Background Glow -->
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>

  <!-- Trigger Button -->
  <button 
    id="menuToggle" 
    class="relative z-50 px-6 md:px-8 py-3 md:py-4 bg-white text-black rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 border border-white/20"
    onclick="const menu = document.getElementById('forgeMenu'); menu.classList.toggle('hidden'); menu.classList.toggle('flex');"
  >
    <span class="text-base md:text-lg">☰</span> WORKSTATION ACCESS
  </button>

  <!-- Side Navigation (Forged) -->
  <aside 
    id="forgeMenu" 
    class="hidden absolute inset-0 z-40 flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-2xl p-6 md:p-8 animate-in fade-in zoom-in-95 duration-300"
  >
    <nav class="w-full max-w-xs space-y-2 md:space-y-3">
      <div class="text-center mb-6 md:mb-8">
        <p class="text-[8px] md:text-[9px] font-black text-primary uppercase tracking-[0.4em]">Synthesis Menu</p>
        <h3 class="text-xl md:text-2xl font-black text-white tracking-tighter">FORGE STUDIOS</h3>
      </div>
      
      <a href="#" class="flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all group">
        <span class="text-base md:text-lg">🏠</span>
        <span class="font-black text-[9px] md:text-[10px] uppercase tracking-widest">Workbench</span>
      </a>
      
      <a href="#" class="flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl hover:bg-white/5 text-zinc-400 hover:text-white transition-all group border border-transparent hover:border-white/5">
        <span class="text-base md:text-lg">🌐</span>
        <span class="font-black text-[9px] md:text-[10px] uppercase tracking-widest">Ecosystem</span>
      </a>
      
      <a href="#" class="flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl hover:bg-white/5 text-zinc-400 hover:text-white transition-all group border border-transparent hover:border-white/5">
        <span class="text-base md:text-lg">📈</span>
        <span class="font-black text-[9px] md:text-[10px] uppercase tracking-widest">Audit</span>
      </a>

      <div class="h-px bg-white/10 my-4 md:my-6"></div>

      <button 
        onclick="const menu = document.getElementById('forgeMenu'); menu.classList.add('hidden'); menu.classList.remove('flex');"
        class="w-full py-3 md:py-4 rounded-xl md:rounded-2xl border border-white/10 text-white font-black text-[8px] md:text-[9px] uppercase tracking-widest hover:bg-white/5 transition-all"
      >
        Close Monitor
      </button>
    </nav>
  </aside>

  <!-- Status Info -->
  <div class="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-30">
    <div class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
    <p class="text-[7px] md:text-[8px] font-black text-white uppercase tracking-widest">V8 Engine Active</p>
  </div>
</div>`;

export default function CodeArchitectPage() {
  const { toast } = useToast()
  const [input, setInput] = React.useState(DEFAULT_CODE)
  const [output, setOutput] = React.useState<ExplainCodeOutput | null>(null)
  const [isExplaining, setIsVerifying] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("preview")

  const handleExplain = async () => {
    if (!input.trim()) return
    setIsVerifying(true)
    try {
      const result = await explainCode({ code: input, language: 'html/tailwind' })
      setOutput(result)
      setActiveTab("explanation")
      toast({ title: "Synthesis Complete", description: "AI has deconstructed the code architecture." })
    } catch (e) {
      toast({ variant: "destructive", title: "Analysis Failed", description: "The AI engine could not parse this bitstream." })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(input)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({ title: "Snippet Dispatched", description: "Code copied to workstation clipboard." })
  }

  const metrics = React.useMemo(() => ({
    size: input.length,
    lines: input.split('\n').length,
    complexity: input.length > 500 ? 'Industrial' : input.length > 200 ? 'Standard' : 'Module'
  }), [input])

  // Simple sandbox approach using srcDoc
  const previewDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  primary: '#BAB5EE',
                  secondary: '#7095F5',
                  accent: '#BAB5EE',
                }
              }
            }
          }
        </script>
        <style>
          body { 
            background: transparent; 
            margin: 0; 
            padding: 0.75rem; 
            font-family: sans-serif; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            min-height: 100vh; 
          }
          @media (min-width: 768px) {
            body { padding: 2rem; }
          }
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(186, 181, 238, 0.2); border-radius: 10px; }
        </style>
      </head>
      <body>
        ${input}
      </body>
    </html>
  `

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
            <Terminal className="w-3.5 h-3.5" />
            Vibe Coding Orchestrator
          </div>
          <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-none uppercase">
            Code <br /><span className="text-gradient">Architect Pro.</span>
          </h1>
          <p className="text-sm md:text-lg text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
            Professional snippet synthesis. Break out code blocks with AI intelligence, visualize live changes in the Studio Monitor, and optimize components.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 animate-in fade-in duration-1000 delay-150">
          {[
            { label: "Bitstream Volume", value: `${metrics.size} B`, icon: Layers, color: "text-primary" },
            { label: "Module Depth", value: `${metrics.lines} L`, icon: Cpu, color: "text-secondary" },
            { label: "Complexity", value: output?.complexity || metrics.complexity, icon: Activity, color: "text-accent" },
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
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
               <Code2 className="w-24 h-24 text-primary" />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Terminal className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground block leading-none mb-1">Source</span>
                    <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest">Snippet Bitstream</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setInput(DEFAULT_CODE)}
                    className="text-[8px] md:text-[9px] font-black text-primary uppercase tracking-widest hover:underline"
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div className="relative group">
                <Textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste HTML/Tailwind snippet here..."
                  className="min-h-[300px] md:min-h-[500px] rounded-[1.5rem] md:rounded-[2rem] bg-zinc-950 border-white/5 focus:ring-primary p-6 md:p-8 text-[12px] md:text-[13px] font-code text-zinc-300 transition-all custom-scrollbar shadow-inner resize-none scroll-smooth"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button variant="ghost" size="icon" onClick={() => setInput("")} className="h-8 w-8 rounded-lg text-zinc-500 hover:text-destructive hover:bg-destructive/5 transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleCopy} className="h-8 w-8 rounded-lg text-zinc-500 hover:text-primary hover:bg-primary/5 transition-all">
                    {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </Button>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleExplain} 
              disabled={isExplaining || !input} 
              className="w-full h-14 md:h-16 rounded-xl md:rounded-2xl bg-foreground text-background hover:scale-[1.02] transition-all font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] shadow-xl group"
            >
              {isExplaining ? (
                <><Loader2 className="w-4 h-4 md:w-5 md:h-5 mr-2 animate-spin" /> Analyzing...</>
              ) : (
                <><Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2 text-primary group-hover:animate-pulse" /> Breakout Code Logic</>
              )}
            </Button>
          </div>

          <div className="glass-card p-6 md:p-10 rounded-[2rem] md:rounded-[3.5rem] border-white/10 min-h-[400px] md:min-h-[600px] lg:sticky lg:top-32 flex flex-col space-y-6 md:space-y-8 shadow-2xl">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
              <div className="flex items-center justify-between px-2 mb-4 md:mb-6">
                <TabsList className="bg-foreground/5 p-1 rounded-xl md:rounded-2xl border border-foreground/5">
                  <TabsTrigger value="preview" className="rounded-lg md:rounded-xl px-3 md:px-4 py-1.5 md:py-2 font-black text-[8px] md:text-[9px] uppercase tracking-widest">Preview</TabsTrigger>
                  <TabsTrigger value="explanation" className="rounded-lg md:rounded-xl px-3 md:px-4 py-1.5 md:py-2 font-black text-[8px] md:text-[9px] uppercase tracking-widest">Breakdown</TabsTrigger>
                </TabsList>
                {output && (
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10">
                    <ShieldCheck className="w-3 h-3 text-primary" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-primary">Validated</span>
                  </div>
                )}
              </div>

              <TabsContent value="preview" className="flex-1 mt-0 outline-none flex flex-col">
                <div className="flex-1 bg-zinc-900 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-foreground/10 shadow-inner relative group min-h-[350px] md:min-h-[450px]">
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-zinc-950/80 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/10">
                      <span className="text-[7px] font-black text-white uppercase tracking-widest">Isolated Sandbox</span>
                    </div>
                  </div>
                  <iframe 
                    srcDoc={previewDoc}
                    title="Code Preview"
                    className="w-full h-full border-none"
                    sandbox="allow-scripts"
                  />
                </div>
              </TabsContent>

              <TabsContent value="explanation" className="flex-1 mt-0 outline-none">
                {output ? (
                  <div className="space-y-6 md:space-y-8 animate-in fade-in zoom-in-95 duration-500">
                    <div className="space-y-3">
                      <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-primary">Architectural Overview</h4>
                      <p className="text-xs md:text-sm text-muted-foreground font-medium leading-relaxed">{output.overview}</p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-secondary">Modular Breakdown</h4>
                      <div className="space-y-2 md:space-y-3">
                        {output.breakdown.map((item, idx) => (
                          <div key={idx} className="bg-foreground/[0.02] p-3 md:p-4 rounded-xl md:rounded-2xl border border-foreground/5 space-y-1.5 group hover:bg-foreground/[0.04] transition-colors">
                            <code className="text-[10px] md:text-[11px] font-bold text-foreground block truncate">{item.block}</code>
                            <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed font-medium">{item.meaning}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-accent">Optimization Suite</h4>
                      <ul className="grid gap-2">
                        {output.suggestions.map((s, idx) => (
                          <li key={idx} className="flex items-center gap-3 p-3 md:p-4 bg-accent/5 rounded-xl md:rounded-2xl border border-accent/10">
                            <Zap className="w-3.5 h-3.5 text-accent shrink-0" />
                            <span className="text-[10px] md:text-xs font-bold text-accent/80 tracking-tight">{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 min-h-[350px] md:min-h-[450px] flex flex-col items-center justify-center text-center space-y-6 md:space-y-8 opacity-20 select-none">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-foreground/5 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-primary" />
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-lg md:text-xl font-black uppercase tracking-[0.3em]">Awaiting Analysis</p>
                      <p className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em]">Click "Breakout Code" to initiate AI synthesis</p>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section id="faq" className="mt-32 md:mt-48 pt-16 md:pt-32 border-t border-foreground/5">
           <div className="text-center mb-12 md:mb-16 space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest mx-auto">
              <Settings2 className="w-3.5 h-3.5" />
              Module Capabilities
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Architectural <br /><span className="text-gradient">Specifications</span></h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Play, title: "Live Synthesis", desc: "Real-time render monitor that executes HTML and Tailwind bitstreams in a secure, isolated sandbox for instant visual reconciliation." },
              { icon: Sparkles, title: "AI Intelligence", desc: "Utilizes the Gemini 2.5 Flash engine to deconstruct chaotic snippets into clean, modular architectural segments with human-readable explanations." },
              { icon: ShieldCheck, title: "Security Sandbox", desc: "Previews are executed within an iframe with strict sandbox attributes, ensuring your workstation environment remains untainted." },
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
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-center md:text-left">© 2026 FORGE STUDIOS. CODE ARCHITECTURE SECURED.</p>
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
