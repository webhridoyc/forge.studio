
"use client"

import * as React from "react"
import { Code2, Braces, Terminal, Layers, Globe, Copy, Check } from "lucide-react"
import { AuthUI } from "@/components/AuthModal"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function ApiRefPage() {
  const [isAuthOpen, setIsAuthOpen] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-secondary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-accent/5 blur-[150px] rounded-full" />
      </div>

      <header className={cn(
        "fixed top-0 left-0 right-0 z-[100] w-full border-b border-white/10 bg-background/40 backdrop-blur-2xl px-4 md:px-12 h-20 flex items-center justify-between shadow-sm transition-all",
        isAuthOpen && "hidden"
      )}>
        <a href="/" className="flex items-center gap-2 md:gap-3 group">
          <div className="bg-gradient-to-br from-primary to-secondary p-1.5 md:p-2 rounded-xl shadow-lg group-hover:scale-110 transition-all">
            <Code2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tighter">FORGE.</span>
        </a>
        <div className="flex items-center gap-4">
          <nav className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mr-6">
            <a href="/docs" className="hover:text-foreground transition-colors">Documentation</a>
            <a href="/performance" className="hover:text-foreground transition-colors">Performance</a>
            <a href="/api-reference" className="text-primary">API</a>
          </nav>
          <AuthUI onOpenChange={setIsAuthOpen} />
        </div>
      </header>

      <main className="container mx-auto px-4 pt-32 pb-32 relative z-10 max-w-4xl">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-black uppercase tracking-widest">
              <Braces className="w-3.5 h-3.5" />
              Developer API
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">DATA URI <br /><span className="text-gradient">REFERENCE</span></h1>
            <p className="text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed">
              Technical specifications for the RFC 2397 standard as implemented by the Forge Synthesis Engine.
            </p>
          </div>

          <div className="grid gap-8">
            <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 space-y-6">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <Terminal className="w-6 h-6 text-secondary" />
                Data URI Schema
              </h2>
              <div className="space-y-4">
                <p className="text-muted-foreground font-medium leading-relaxed">
                  The Base64 Forge follows the standardized URI scheme for inlining data. The structure is composed of four distinct segments:
                </p>
                <div className="p-6 bg-foreground/5 rounded-3xl border border-foreground/5 font-code text-sm overflow-x-auto whitespace-nowrap">
                  <span className="text-primary">data</span>
                  <span className="text-muted-foreground">:[</span>
                  <span className="text-accent">mediatype</span>
                  <span className="text-muted-foreground">][;</span>
                  <span className="text-secondary font-bold">base64</span>
                  <span className="text-muted-foreground">],</span>
                  <span className="text-foreground font-bold">data</span>
                </div>
              </div>
            </section>

            <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 space-y-8">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <Layers className="w-6 h-6 text-primary" />
                Implementation Example
              </h2>
              <div className="space-y-6">
                <p className="text-muted-foreground font-medium leading-relaxed">
                  A 1x1 transparent pixel encoded by Forge results in the following structure. This can be used as a placeholder or a network-silent asset.
                </p>
                <div className="relative group">
                  <pre className="p-6 bg-zinc-950 text-zinc-300 rounded-3xl font-code text-xs md:text-sm overflow-x-auto break-all leading-relaxed border border-white/5">
                    <code>{`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==`}</code>
                  </pre>
                  <Button
                    size="icon"
                    onClick={handleCopy}
                    className="absolute top-4 right-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all opacity-0 group-hover:opacity-100"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </section>

            <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 space-y-6">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <Globe className="w-6 h-6 text-accent" />
                Browser Support
              </h2>
              <div className="space-y-4 text-muted-foreground font-medium leading-relaxed">
                <p>Base64 Data URIs are supported by all modern evergreen browsers and legacy browsers dating back to IE8 (with size limits).</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  {['Chrome 4+', 'Firefox 2+', 'Safari 3.1+', 'Edge 12+'].map((browser) => (
                    <div key={browser} className="px-4 py-3 rounded-2xl bg-foreground/5 border border-foreground/5 text-center text-[10px] font-black uppercase tracking-widest text-foreground/60">
                      {browser}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="w-full py-12 px-8 border-t border-foreground/5 bg-background/80 backdrop-blur-3xl">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">© 2024 FORGE STUDIOS. SPECIFIED RFC 2397.</p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <a href="/docs" className="hover:text-foreground">Docs</a>
            <a href="/performance" className="hover:text-foreground">Audit</a>
            <a href="/api-reference" className="text-primary">API</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
