"use client"

import * as React from "react"
import { Code2, Sparkles, ShieldCheck, Zap, Globe, Github, MessageCircle, Layers, ImageIcon, FileCode } from "lucide-react"
import { NavigationHeader } from "@/components/NavigationHeader"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-primary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-secondary/5 blur-[150px] rounded-full" />
      </div>

      <NavigationHeader />

      <main className="container mx-auto px-4 pt-32 pb-32 relative z-10 max-w-4xl">
        <article className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mx-auto">
              <Sparkles className="w-3.5 h-3.5" />
              The Mission
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">THE FORGE <br /><span className="text-gradient">STUDIO STORY</span></h1>
            <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              We started Forge Studios with a simple goal: to build a developer ecosystem that never crashes, never compromises privacy, and always prioritizes speed.
            </p>
          </div>

          <div className="grid gap-12">
            <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 space-y-8">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl shrink-0">
                  <Layers className="w-12 h-12 text-white" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-black tracking-tight">The Synthesis Suite</h2>
                  <p className="text-muted-foreground leading-relaxed font-medium">
                    Forge Studios has evolved from a simple converter into a comprehensive **Synthesis Suite**. We provide industrial-grade utilities for Base64 encoding, high-performance image optimization, and clean vector orchestration.
                  </p>
                </div>
              </div>
            </section>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Zap, title: "Base64 Forge", desc: "Binary-to-text synthesis", href: "/" },
                { icon: ImageIcon, title: "Image Optimizer", desc: "WebP compression", href: "/tools/image-optimizer" },
                { icon: FileCode, title: "SVG Studio", desc: "Vector orchestration", href: "/tools/svg-forge" }
              ].map((tool, i) => (
                <Link key={i} href={tool.href} className="glass-card p-6 rounded-[2rem] border-white/10 space-y-4 hover:border-primary/50 transition-colors group">
                  <tool.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-tight">{tool.title}</h3>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{tool.desc}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <section className="glass-card p-8 rounded-[2rem] border-white/10 space-y-6">
                <ShieldCheck className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-black">Privacy First</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your assets are yours. We believe that developer tools shouldn't harvest your data. Forge utilizes your browser's V8 engine to perform 100% of the synthesis locally.
                </p>
              </section>
              <section className="glass-card p-8 rounded-[2rem] border-white/10 space-y-6">
                <Globe className="w-8 h-8 text-accent" />
                <h3 className="text-xl font-black">Global Sync</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  While synthesis is local, we use Firebase to securely sync your metadata across your developer ecosystem, ensuring your pipeline is always accessible.
                </p>
              </section>
            </div>
          </div>
        </article>
      </main>

      <footer className="w-full py-12 px-8 border-t border-foreground/5 bg-background/80 backdrop-blur-3xl">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">© 2026 FORGE STUDIOS. DISTRIBUTED SECURELY.</p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <Link href="/about" className="text-primary">About</Link>
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link href="/contact" className="hover:text-foreground">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
