
"use client"

import * as React from "react"
import { Code2, BookOpen, Zap, ShieldCheck, ArrowRight, History } from "lucide-react"
import { AuthUI } from "@/components/AuthModal"
import { cn } from "@/lib/utils"

export default function DocsPage() {
  const [isAuthOpen, setIsAuthOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Background Blurs */}
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
            <a href="/docs" className="text-primary">Documentation</a>
            <a href="/performance" className="hover:text-foreground transition-colors">Performance</a>
            <a href="/api-reference" className="hover:text-foreground transition-colors">API</a>
          </nav>
          <AuthUI onOpenChange={setIsAuthOpen} />
        </div>
      </header>

      <main className="container mx-auto px-4 pt-32 pb-32 relative z-10 max-w-4xl">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
              <BookOpen className="w-3.5 h-3.5" />
              Technical Guide
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">SYSTEM <br /><span className="text-gradient">DOCUMENTATION</span></h1>
            <p className="text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed">
              Master the art of binary-to-text synthesis. Learn how to optimize your asset pipeline using the Base64 Forge ecosystem.
            </p>
          </div>

          <div className="grid gap-8">
            <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 space-y-6">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <Zap className="w-6 h-6 text-primary" />
                Getting Started
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed font-medium">
                <p>Forge Studios utilizes the browser-native <code>FileReader API</code> to process assets. This ensures zero data ever leaves your device unless you explicitly choose to sync it to your Member Vault.</p>
                <div className="grid md:grid-cols-2 gap-4 pt-4">
                  <div className="bg-foreground/5 p-6 rounded-2xl border border-foreground/5">
                    <h3 className="text-foreground font-bold mb-2">1. Synthesis (Encoding)</h3>
                    <p className="text-sm">Drop any image into the Forge. Our engine automatically detects MIME types and generates optimized Base64 strings.</p>
                  </div>
                  <div className="bg-foreground/5 p-6 rounded-2xl border border-foreground/5">
                    <h3 className="text-foreground font-bold mb-2">2. Restoration (Decoding)</h3>
                    <p className="text-sm">Paste a raw Base64 string or Data URI to reconstruct the binary asset for local download.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 space-y-6">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-accent" />
                Security & Privacy
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed font-medium">
                <p>We operate on a "Privacy-First" architecture. Unlike traditional converters that upload files to a server, Forge performs 100% of the transformation within your browser's V8 engine.</p>
                <ul className="space-y-3 pt-2">
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
                    <span><strong>Local Synthesis:</strong> Your files never hit our servers.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
                    <span><strong>Encrypted Vaults:</strong> History is stored in Firebase with strict security rules.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
                    <span><strong>No Cookies:</strong> We use local storage and Firebase Auth tokens only.</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 space-y-6">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <History className="w-6 h-6 text-secondary" />
                Cloud Sync Features
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed font-medium">
                <p>By establishing a Member Vault, you unlock cross-device synchronization. This allows you to encode a batch of icons on your desktop and retrieve the snippets on your laptop later.</p>
                <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl italic text-sm">
                  "Member history is limited to the most recent 10 assets to maintain extreme performance and zero-latency cloud querying."
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="w-full py-12 px-8 border-t border-foreground/5 bg-background/80 backdrop-blur-3xl">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">© 2024 FORGE STUDIOS. DISTRIBUTED SECURELY.</p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <a href="/docs" className="text-primary">Docs</a>
            <a href="/performance" className="hover:text-foreground">Audit</a>
            <a href="/api-reference" className="hover:text-foreground">API</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
