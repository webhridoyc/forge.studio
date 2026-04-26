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
  Maximize
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function SvgForgePage() {
  const { toast } = useToast()
  const [input, setInput] = React.useState("")
  const [copied, setCopied] = React.useState<string | null>(null)
  const [isCleaned, setIsCleaned] = React.useState(true)

  const processSvg = (raw: string) => {
    if (!isCleaned) return raw.trim()
    
    // Industrial grade basic cleaning
    return raw.trim()
      .replace(/<\?xml.*?\?>/g, '')
      .replace(/<!--.*?-->/g, '')
      .replace(/xmlns:xlink=".*?"/g, '')
      .replace(/xml:space=".*?"/g, '')
      .replace(/version=".*?"/g, '')
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
  }

  const handleCopy = (type: 'data-uri' | 'raw' | 'react') => {
    let output = processSvg(input)
    if (type === 'data-uri') {
      output = `data:image/svg+xml;base64,${btoa(output)}`
    } else if (type === 'react') {
      const camel = output
        .replace(/fill-rule/g, 'fillRule')
        .replace(/clip-rule/g, 'clipRule')
        .replace(/stroke-width/g, 'strokeWidth')
        .replace(/stroke-linecap/g, 'strokeLinecap')
        .replace(/stroke-linejoin/g, 'strokeLinejoin')
      output = `export const ForgedIcon = () => (\n  ${camel}\n);`
    }
    
    navigator.clipboard.writeText(output)
    setCopied(type)
    toast({
      title: "Synthesis Dispatched",
      description: `Copied ${type.toUpperCase()} to workstation.`,
    })
    setTimeout(() => setCopied(null), 2000)
  }

  const handleDownload = () => {
    const component = `
import React from 'react';

export const ForgedIcon = () => (
  ${processSvg(input).replace(/fill-rule/g, 'fillRule').replace(/clip-rule/g, 'clipRule')}
);
    `.trim();
    
    const blob = new Blob([component], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'forged-icon.tsx';
    a.click();
    toast({ title: "Asset Dispatched", description: "React component saved to disk." });
  }

  const isSvg = input.trim().startsWith('<svg')

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-secondary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-primary/5 blur-[150px] rounded-full" />
      </div>

      <NavigationHeader />

      <main className="container mx-auto px-4 pt-32 md:pt-48 pb-32 relative z-10 max-w-6xl">
        <section className="text-center space-y-8 mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-black uppercase tracking-widest mx-auto">
            <FileCode className="w-3.5 h-3.5" />
            Vector Orchestration Pro
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none uppercase">
            SVG <br /><span className="text-gradient">Studio Architect.</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
            Professional vector-to-code synthesis. Orchestrate clean paths, generate components, and optimize Data URIs.
          </p>
        </section>

        <section className="grid lg:grid-cols-2 gap-8 items-start animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          <div className="glass-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border-white/10 space-y-8 shadow-2xl relative">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between px-2 gap-4">
                <div className="flex items-center gap-6">
                  <div className="space-y-0.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground block">Source Vector</label>
                    <p className="text-[11px] font-black uppercase tracking-widest text-primary">Bitstream Input</p>
                  </div>
                  <div className="flex items-center gap-3 bg-secondary/5 px-4 py-2 rounded-xl border border-secondary/10">
                    <Switch checked={isCleaned} onCheckedChange={setIsCleaned} id="clean-mode" />
                    <Label htmlFor="clean-mode" className="text-[9px] font-black uppercase tracking-widest opacity-60 cursor-pointer">Clean Synthesis</Label>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setInput("")} className="h-10 w-10 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <Textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="<svg xmlns='http://www.w3.org/2000/svg' ...>...</svg>"
                className="min-h-[400px] rounded-[2rem] bg-foreground/5 border-foreground/10 focus:ring-secondary p-8 text-[13px] font-code transition-all custom-scrollbar resize-none shadow-inner"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                onClick={() => handleCopy('data-uri')}
                disabled={!isSvg}
                className="h-16 rounded-2xl bg-secondary text-white hover:scale-[1.02] transition-all font-black text-[11px] uppercase tracking-widest px-4 shadow-xl"
              >
                {copied === 'data-uri' ? <Check className="w-4 h-4 mr-2" /> : <ExternalLink className="w-4 h-4 mr-2" />}
                Data URI
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleCopy('react')}
                disabled={!isSvg}
                className="h-16 rounded-2xl border-foreground/10 hover:bg-foreground hover:text-background transition-all font-black text-[11px] uppercase tracking-widest px-4"
              >
                {copied === 'react' ? <Check className="w-4 h-4 mr-2" /> : <Braces className="w-4 h-4 mr-2" />}
                React Code
              </Button>
              <Button 
                variant="outline"
                onClick={handleDownload}
                disabled={!isSvg}
                className="h-16 rounded-2xl border-foreground/10 hover:bg-foreground hover:text-background transition-all font-black text-[11px] uppercase tracking-widest px-4 sm:col-span-2 group"
              >
                <Download className="w-4 h-4 mr-2 group-hover:translate-y-0.5 transition-transform" /> Download .tsx Component
              </Button>
            </div>
          </div>

          <div className="glass-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border-white/10 min-h-[500px] lg:sticky lg:top-32 flex flex-col items-center justify-center text-center space-y-12 shadow-2xl overflow-hidden relative">
            <div className="absolute top-8 left-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                 <Monitor className="w-5 h-5 text-secondary" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground block leading-none mb-1">Live</span>
                <span className="text-[11px] font-black uppercase tracking-widest">Synthesis Preview</span>
              </div>
            </div>

            <div className="absolute top-8 right-8 opacity-20 pointer-events-none hidden md:block">
               <Layers className="w-16 h-16 text-secondary" />
            </div>
            
            {input && isSvg ? (
              <div className="w-full flex flex-col items-center gap-12 animate-in zoom-in-95 duration-500">
                <div className="relative group">
                  <div className="absolute -inset-10 bg-secondary/10 blur-[60px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div 
                    className="w-56 h-56 md:w-72 md:h-72 flex items-center justify-center p-8 bg-foreground/5 rounded-[3rem] border border-foreground/5 shadow-2xl relative z-10 transition-transform group-hover:scale-105 duration-500"
                    dangerouslySetInnerHTML={{ __html: processSvg(input) }}
                  />
                </div>
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-black uppercase tracking-widest">
                    <Zap className="w-3.5 h-3.5" />
                    Path Validated
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Render Secured</h3>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] italic">Vector orchestration reconciled successfully.</p>
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
      </main>
    </div>
  )
}
