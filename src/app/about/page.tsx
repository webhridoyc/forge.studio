
"use client"

import * as React from "react"
import { Code2, Sparkles, ShieldCheck, Zap, Globe, Github, MessageCircle } from "lucide-react"
import { AuthUI } from "@/components/AuthModal"
import { cn } from "@/lib/utils"

export default function AboutPage() {
  const [isAuthOpen, setIsAuthOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-primary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-secondary/5 blur-[150px] rounded-full" />
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
            <a href="/api-reference" className="hover:text-foreground transition-colors">API</a>
          </nav>
          <AuthUI onOpenChange={setIsAuthOpen} />
        </div>
      </header>

      <main className="container mx-auto px-4 pt-32 pb-32 relative z-10 max-w-4xl">
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mx-auto">
              <Sparkles className="w-3.5 h-3.5" />
              Our Mission
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">THE FORGE <br /><span className="text-gradient">STUDIO STORY</span></h1>
            <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              We started Forge Studios with a simple goal: to build a Base64 engine that never crashes, never compromises privacy, and always prioritizes speed.
            </p>
          </div>

          <div className="grid gap-12">
            <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 space-y-8">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl shrink-0">
                  <Zap className="w-12 h-12 text-white" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-black tracking-tight">Zero-Server Synthesis</h2>
                  <p className="text-muted-foreground leading-relaxed font-medium">
                    Traditional converters upload your assets to a server. Forge Studios utilizes the power of your browser's V8 engine to perform 100% of the encoding locally. This is "No-Crash" technology designed for the modern web.
                  </p>
                </div>
              </div>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card p-8 rounded-[2rem] border-white/10 space-y-6">
                <ShieldCheck className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-black">Privacy First</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your assets are yours. We believe that developer tools shouldn't harvest your data. Forge doesn't use tracking cookies or persistent server-side storage for your raw images.
                </p>
              </div>
              <div className="glass-card p-8 rounded-[2rem] border-white/10 space-y-6">
                <Globe className="w-8 h-8 text-accent" />
                <h3 className="text-xl font-black">Global Sync</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  While synthesis is local, we use Firebase to securely sync your snippets across your developer ecosystem, ensuring your pipeline is always accessible.
                </p>
              </div>
            </div>

            <section className="text-center space-y-8 py-12">
              <h2 className="text-3xl font-black tracking-tighter uppercase">Connect with the Studio</h2>
              <div className="flex justify-center gap-6">
                {[
                  { icon: Github, label: "Open Source" },
                  { icon: MessageCircle, label: "Support" },
                  { icon: Globe, label: "Status" }
                ].map((social, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 group cursor-pointer">
                    <div className="w-14 h-14 rounded-2xl bg-foreground/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <social.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-50">{social.label}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="w-full py-12 px-8 border-t border-foreground/5 bg-background/80 backdrop-blur-3xl">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">© 2026 FORGE STUDIOS. DISTRIBUTED SECURELY.</p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <a href="/about" className="text-primary">About</a>
            <a href="/privacy" className="hover:text-foreground">Privacy</a>
            <a href="/contact" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
