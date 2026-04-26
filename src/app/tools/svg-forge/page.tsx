
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
  Settings2
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
          <div className="glass-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border-white/10 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Source Vector</label>
                  <div className="flex items-center gap-2">
                    <Switch checked={isCleaned} onCheckedChange={setIsCleaned} id="clean-mode" />
                    <Label htmlFor="clean-mode" className="text-[9px] font-black uppercase tracking-widest opacity-60">Clean Synthesis</Label>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setInput("")} className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
              <Textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="<svg ...>...</svg>"
                className="min-h-[400px] rounded-[2rem] bg-foreground/5 border-foreground/10 focus:ring-secondary p-8 text-[13px] font-code transition-all custom-scrollbar"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                onClick={() => handleCopy('data-uri')}
                disabled={!isSvg}
                className="h-14 rounded-2xl bg-secondary text-white hover:scale-105 transition-all font-black text-[10px] uppercase tracking-widest px-4 shadow-xl"
              >
                {copied === 'data-uri' ? <Check className="w-3.5 h-3.5 mr-2" /> : <ExternalLink className="w-3.5 h-3.5 mr-2" />}
                Data URI
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleCopy('react')}
                disabled={!isSvg}
                className="h-14 rounded-2xl border-foreground/10 hover:bg-foreground hover:text-background transition-all font-black text-[10px] uppercase tracking-widest px-4"
              >
                {copied === 'react' ? <Check className="w-3.5 h-3.5 mr-2" /> : <Braces className="w-3.5 h-3.5 mr-2" />}
                React Code
              </Button>
              <Button 
                variant="outline"
                onClick={handleDownload}
                disabled={!isSvg}
                className="h-14 rounded-2xl border-foreground/10 hover:bg-foreground hover:text-background transition-all font-black text-[10px] uppercase tracking-widest px-4 sm:col-span-2"
              >
                <Download className="w-3.5 h-3.5 mr-2" /> Download .tsx Component
              </Button>
            </div>
          </div>

          <div className="glass-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border-white/10 min-h-[500px] lg:sticky lg:top-32 flex flex-col items-center justify-center text-center space-y-8">
            <div className="absolute top-8 left-8 flex items-center gap-2">
              <Monitor className="w-4 h-4 text-secondary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Synthesis Preview</span>
            </div>
            
            {input && isSvg ? (
              <div className="w-full flex flex-col items-center gap-12 animate-in zoom-in duration-500">
                <div 
                  className="w-48 h-48 flex items-center justify-center p-4 bg-foreground/5 rounded-3xl border border-foreground/5 shadow-inner"
                  dangerouslySetInnerHTML={{ __html: processSvg(input) }}
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-black uppercase tracking-tight">Render Validated</h3>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic">Vector path reconciled successfully.</p>
                </div>
              </div>
            ) : (
              <div className="opacity-20 flex flex-col items-center gap-6 select-none">
                <Sparkles className="w-16 h-16 text-secondary" />
                <div className="space-y-1">
                  <p className="text-sm font-black uppercase tracking-[0.3em]">Awaiting Vector</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest">Synthesis module ready</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
