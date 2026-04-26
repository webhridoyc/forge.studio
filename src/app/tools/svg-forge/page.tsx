
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
  Code2,
  Monitor,
  Braces,
  Download,
  Settings2,
  Layers,
  Activity,
  Maximize,
  Grid3X3,
  Search,
  ShieldCheck,
  Cpu,
  Info,
  Play,
  Palette,
  Wind
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type AnimationType = 'none' | 'spin' | 'pulse' | 'bounce' | 'float';

export default function SvgForgePage() {
  const { toast } = useToast()
  const [input, setInput] = React.useState("")
  const [copied, setCopied] = React.useState<string | null>(null)
  const [isCleaned, setIsCleaned] = React.useState(true)
  const [showGrid, setShowGrid] = React.useState(true)
  const [animation, setAnimation] = React.useState<AnimationType>('none')
  const [colorMode, setColorMode] = React.useState<'original' | 'currentColor'>('original')
  const [metrics, setMetrics] = React.useState({ size: 0, paths: 0, complexity: 'low' })

  const calculateMetrics = (raw: string) => {
    const size = raw.length
    const paths = (raw.match(/<path|<circle|<rect|<line/g) || []).length
    let complexity = 'Low'
    if (paths > 20) complexity = 'High'
    else if (paths > 5) complexity = 'Medium'
    
    setMetrics({ size, paths, complexity })
  }

  React.useEffect(() => {
    calculateMetrics(input)
  }, [input])

  const processSvg = (raw: string) => {
    let output = raw.trim()
    
    if (isCleaned) {
      output = output
        .replace(/<\?xml.*?\?>/g, '')
        .replace(/<!--.*?-->/g, '')
        .replace(/xmlns:xlink=".*?"/g, '')
        .replace(/xml:space=".*?"/g, '')
        .replace(/version=".*?"/g, '')
        .replace(/id=".*?"/g, '')
        .replace(/\s+/g, ' ')
        .replace(/>\s+</g, '><')
    }

    if (colorMode === 'currentColor') {
      output = output
        .replace(/fill="((?!none)[^"]+)"/g, 'fill="currentColor"')
        .replace(/stroke="((?!none)[^"]+)"/g, 'stroke="currentColor"')
    }
    
    return output
  }

  const getAnimationClass = (anim: AnimationType) => {
    switch (anim) {
      case 'spin': return 'animate-spin'
      case 'pulse': return 'animate-pulse'
      case 'bounce': return 'animate-bounce'
      case 'float': return 'animate-float'
      default: return ''
    }
  }

  const handleCopy = (type: 'data-uri' | 'raw' | 'react') => {
    let output = processSvg(input)
    
    if (type === 'data-uri') {
      output = `data:image/svg+xml;base64,${btoa(output)}`
    } else if (type === 'react') {
      const animClass = getAnimationClass(animation)
      const camel = output
        .replace(/fill-rule/g, 'fillRule')
        .replace(/clip-rule/g, 'clipRule')
        .replace(/stroke-width/g, 'strokeWidth')
        .replace(/stroke-linecap/g, 'strokeLinecap')
        .replace(/stroke-linejoin/g, 'strokeLinejoin')
        .replace(/stroke-miterlimit/g, 'strokeMiterlimit')
      
      output = `import { cn } from "@/lib/utils";\n\nexport const ForgedIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (\n  ${camel.replace('<svg', `<svg className={cn("${animClass}", className)} {...props}`)}\n);`
    }
    
    navigator.clipboard.writeText(output)
    setCopied(type)
    toast({
      title: "Orchestration Dispatched",
      description: `Copied ${type.toUpperCase()} component to workstation.`,
    })
    setTimeout(() => setCopied(null), 2000)
  }

  const handleDownload = () => {
    const animClass = getAnimationClass(animation)
    const component = `
import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Synthesized by Forge Studios SVG Orchestrator
 * Industrial-grade React Vector Component
 */
export const ForgedIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  ${processSvg(input)
    .replace(/fill-rule/g, 'fillRule')
    .replace(/clip-rule/g, 'clipRule')
    .replace(/stroke-width/g, 'strokeWidth')
    .replace(/stroke-linecap/g, 'strokeLinecap')
    .replace(/stroke-linejoin/g, 'strokeLinejoin')
    .replace('<svg', `<svg className={cn("${animClass}", className)} {...props}`)}
);
    `.trim();
    
    const blob = new Blob([component], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'forged-component.tsx';
    a.click();
    toast({ title: "Asset Dispatched", description: "Orchestrated component saved to disk." });
  }

  const isSvg = input.trim().startsWith('<svg')

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-secondary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-primary/5 blur-[150px] rounded-full" />
      </div>

      <NavigationHeader />

      <main className="container mx-auto px-4 pt-32 md:pt-48 pb-32 relative z-10 max-w-7xl">
        <section className="text-center space-y-8 mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-black uppercase tracking-widest mx-auto">
            <FileCode className="w-3.5 h-3.5" />
            Visual Developer Utility
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none uppercase">
            SVG <br /><span className="text-gradient">Orchestrator.</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
            Professional vector-to-component synthesis. Transform raw SVG paths into responsive, animated React/Tailwind components optimized for industrial-grade workflows.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-in fade-in duration-1000 delay-150">
          {[
            { label: "Vector Size", value: `${metrics.size} Bytes`, icon: Layers, color: "text-secondary" },
            { label: "Path Segments", value: `${metrics.paths} Elements`, icon: Cpu, color: "text-primary" },
            { label: "Complexity Index", value: metrics.complexity, icon: Activity, color: "text-accent" },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 rounded-[2rem] border-white/10 flex items-center gap-6 group hover:translate-y-[-4px] transition-all">
              <div className={cn("w-14 h-14 rounded-2xl bg-foreground/5 flex items-center justify-center shrink-0", stat.color)}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-xl font-black tabular-nums uppercase">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <section className="grid lg:grid-cols-2 gap-8 items-start animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          <div className="glass-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border-white/10 space-y-8 shadow-2xl relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-foreground/5 pb-8">
              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground flex items-center gap-2">
                  <Wind className="w-3 h-3 text-secondary" /> Synthesis Animation
                </Label>
                <Select value={animation} onValueChange={(v: any) => setAnimation(v)}>
                  <SelectTrigger className="h-12 rounded-xl bg-background border-foreground/10 font-bold text-[10px] uppercase tracking-widest">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-foreground/10">
                    <SelectItem value="none" className="font-bold text-[10px] uppercase tracking-widest">Static</SelectItem>
                    <SelectItem value="spin" className="font-bold text-[10px] uppercase tracking-widest">Spin (Icon)</SelectItem>
                    <SelectItem value="pulse" className="font-bold text-[10px] uppercase tracking-widest">Pulse (Alert)</SelectItem>
                    <SelectItem value="bounce" className="font-bold text-[10px] uppercase tracking-widest">Bounce (Call)</SelectItem>
                    <SelectItem value="float" className="font-bold text-[10px] uppercase tracking-widest">Float (Ambient)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground flex items-center gap-2">
                  <Palette className="w-3 h-3 text-primary" /> Color Reconciliation
                </Label>
                <Select value={colorMode} onValueChange={(v: any) => setColorMode(v)}>
                  <SelectTrigger className="h-12 rounded-xl bg-background border-foreground/10 font-bold text-[10px] uppercase tracking-widest">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-foreground/10">
                    <SelectItem value="original" className="font-bold text-[10px] uppercase tracking-widest">Original HEX</SelectItem>
                    <SelectItem value="currentColor" className="font-bold text-[10px] uppercase tracking-widest">Tailwind CurrentColor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between px-2 gap-4">
                <div className="flex items-center gap-6">
                  <div className="space-y-0.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground block">Source Vector</label>
                    <p className="text-[11px] font-black uppercase tracking-widest text-primary">Raw Bitstream</p>
                  </div>
                  <div className="flex items-center gap-3 bg-secondary/5 px-4 py-2 rounded-xl border border-secondary/10">
                    <Switch checked={isCleaned} onCheckedChange={setIsCleaned} id="clean-mode" />
                    <Label htmlFor="clean-mode" className="text-[9px] font-black uppercase tracking-widest opacity-60 cursor-pointer">Clean Metadata</Label>
                  </div>
                </div>
                {input && (
                  <Button variant="ghost" size="icon" onClick={() => setInput("")} className="h-10 w-10 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <Textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="<svg xmlns='http://www.w3.org/2000/svg' ...>...</svg>"
                className="min-h-[350px] rounded-[2rem] bg-foreground/5 border-foreground/10 focus:ring-secondary p-8 text-[13px] font-code transition-all custom-scrollbar resize-none shadow-inner"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                onClick={() => handleCopy('react')}
                disabled={!isSvg}
                className="h-16 rounded-2xl bg-foreground text-background hover:scale-[1.02] transition-all font-black text-[11px] uppercase tracking-widest px-4 shadow-xl"
              >
                {copied === 'react' ? <Check className="w-4 h-4 mr-2" /> : <Braces className="w-4 h-4 mr-2" />}
                Copy React/Tailwind
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleCopy('data-uri')}
                disabled={!isSvg}
                className="h-16 rounded-2xl border-foreground/10 hover:bg-foreground hover:text-background transition-all font-black text-[11px] uppercase tracking-widest px-4"
              >
                {copied === 'data-uri' ? <Check className="w-4 h-4 mr-2" /> : <ExternalLink className="w-4 h-4 mr-2" />}
                Data URI
              </Button>
              <Button 
                variant="outline"
                onClick={handleDownload}
                disabled={!isSvg}
                className="h-16 rounded-2xl border-foreground/10 hover:bg-foreground hover:text-background transition-all font-black text-[11px] uppercase tracking-widest px-4 sm:col-span-2 group"
              >
                <Download className="w-4 h-4 mr-2 group-hover:translate-y-0.5 transition-transform" /> Download Component (.tsx)
              </Button>
            </div>
          </div>

          <div className="glass-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border-white/10 min-h-[500px] lg:sticky lg:top-32 flex flex-col items-center justify-center text-center space-y-12 shadow-2xl overflow-hidden relative">
            <div className="absolute top-8 left-8 flex items-center justify-between w-[calc(100%-4rem)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                   <Monitor className="w-5 h-5 text-secondary" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground block leading-none mb-1">Synthesis</span>
                  <span className="text-[11px] font-black uppercase tracking-widest">Preview Monitor</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-foreground/5 px-3 py-1.5 rounded-full border border-foreground/5">
                <Grid3X3 className="w-3.5 h-3.5 text-muted-foreground" />
                <Switch checked={showGrid} onCheckedChange={setShowGrid} id="grid-mode" />
              </div>
            </div>
            
            {input && isSvg ? (
              <div className="w-full flex flex-col items-center gap-12 animate-in zoom-in-95 duration-500">
                <div className="relative group">
                  <div className="absolute -inset-10 bg-secondary/10 blur-[60px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div 
                    className={cn(
                      "w-64 h-64 md:w-80 md:h-80 flex items-center justify-center p-12 rounded-[3.5rem] border border-foreground/5 shadow-2xl relative z-10 transition-all duration-500 overflow-hidden",
                      showGrid ? "bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat opacity-90" : "bg-foreground/5",
                      getAnimationClass(animation)
                    )}
                    dangerouslySetInnerHTML={{ __html: processSvg(input) }}
                  />
                </div>
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Motion Validated
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Component Ready</h3>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] italic">Orchestration sequence complete.</p>
                </div>
              </div>
            ) : (
              <div className="opacity-20 flex flex-col items-center gap-10 select-none bg-foreground/5 p-16 rounded-[3rem] border border-dashed border-foreground/10 w-full">
                <div className="w-24 h-24 rounded-full bg-foreground/5 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-secondary" />
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-black uppercase tracking-[0.3em]">Awaiting Vector</p>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em]">Synthesis module ready</p>
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="module-specs" className="mt-48 space-y-16 animate-in fade-in duration-1000">
          <div className="text-center space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-black uppercase tracking-widest mx-auto">
              <Settings2 className="w-3.5 h-3.5" />
              Module Capability
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Orchestration <br /><span className="text-gradient">Specifications</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Wind, title: "Motion Synthesis", desc: "Automatically injects Tailwind-driven animation sequences (Spin, Pulse, Bounce) into the component architecture for interactive UI states." },
              { icon: Palette, title: "Tailwind Theming", desc: "Synthesizes 'currentColor' support, allowing icons to instantly adapt to your application's design system via standard text color utilities." },
              { icon: Braces, title: "React Architecture", desc: "Generates production-ready TypeScript components with full prop forwarding and optimized path reconciliation for modern agentic workflows." },
            ].map((feature, i) => (
              <div key={i} className="glass-card p-10 rounded-[2.5rem] space-y-6 hover:translate-y-[-8px] transition-all">
                <div className="w-14 h-14 rounded-2xl bg-foreground/5 flex items-center justify-center text-secondary">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight">{feature.title}</h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="mt-32 pt-32 border-t border-foreground/5">
           <h2 className="text-2xl md:text-3xl font-black text-center mb-16 tracking-tighter uppercase">SVG Orchestrator — FAQ</h2>
           <div className="max-w-4xl mx-auto">
             <Accordion type="single" collapsible className="w-full space-y-4">
                {[
                  {
                    q: "What is 'CurrentColor' reconciliation?",
                    a: "It's an industrial standard for professional icon systems. By replacing fixed HEX colors with 'currentColor', the icon inherits the text color of its parent container, allowing you to change its color using simple Tailwind classes like 'text-blue-500'."
                  },
                  {
                    q: "How does the 'Motion Synthesis' work?",
                    a: "We inject Tailwind's native JIT animation classes directly into the SVG component's root className. This ensures high-performance, 60fps animations without the need for external libraries like Framer Motion or GSAP."
                  },
                  {
                    q: "Is this tool compatible with 'Vibe Coding' agents?",
                    a: "Yes. The generated components use a standardized React/TypeScript interface that is highly predictable and readable for agentic engineering tools like Cursor, Windsurf, and standard multi-agent swarms."
                  }
                ].map((faq, idx) => (
                  <AccordionItem 
                    key={idx} 
                    value={`item-${idx}`} 
                    className="border-2 border-foreground/5 rounded-[1.5rem] md:rounded-[2rem] px-8 bg-foreground/[0.02] overflow-hidden data-[state=open]:border-secondary/20 transition-all"
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
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">© 2026 FORGE STUDIOS. VECTOR ARCHITECTURE SECURED.</p>
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
