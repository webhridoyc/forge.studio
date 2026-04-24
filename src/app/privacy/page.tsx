
"use client"

import * as React from "react"
import { Code2, ShieldAlert, Lock, Fingerprint, EyeOff, FileText } from "lucide-react"
import { AuthUI } from "@/components/AuthModal"
import { cn } from "@/lib/utils"

export default function PrivacyPage() {
  const [isAuthOpen, setIsAuthOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-accent/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-primary/5 blur-[150px] rounded-full" />
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
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
              <ShieldAlert className="w-3.5 h-3.5" />
              Privacy Protocol
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">DATA & PRIVACY <br /><span className="text-gradient">PROTECTION</span></h1>
            <p className="text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed">
              Your assets never leave your device unless you explicitly sync them. We architected Forge Studios to be a "Zero-Knowledge" utility.
            </p>
          </div>

          <div className="grid gap-8">
            <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 space-y-6">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <Lock className="w-6 h-6 text-primary" />
                Local Processing
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed font-medium">
                <p>When you drop an image into the Forge, it is processed within your browser's local memory. The binary-to-text conversion occurs entirely client-side. This ensures:</p>
                <ul className="space-y-3 pt-2">
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>No raw image files are ever uploaded to our servers.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Processing continues to function even without an internet connection.</span>
                  </li>
                </ul>
              </div>
            </section>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-8 rounded-[2rem] border-white/10 space-y-4">
                <Fingerprint className="w-8 h-8 text-accent" />
                <h3 className="text-xl font-black">Anonymous Usage</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We don't collect personally identifiable information (PII) from guest users. Your local history is stored only in your browser's persistent storage.
                </p>
              </div>
              <div className="glass-card p-8 rounded-[2rem] border-white/10 space-y-4">
                <EyeOff className="w-8 h-8 text-secondary" />
                <h3 className="text-xl font-black">Secure Vaults</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Member data is stored in Firebase using high-level encryption and strict per-user security rules. Only you can access your forged snippets.
                </p>
              </div>
            </div>

            <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 space-y-6">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <FileText className="w-6 h-6 text-accent" />
                Policy Updates
              </h2>
              <p className="text-muted-foreground leading-relaxed font-medium">
                This protocol is reviewed annually to ensure alignment with global privacy standards (GDPR, CCPA). Last updated: January 2026.
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="w-full py-12 px-8 border-t border-foreground/5 bg-background/80 backdrop-blur-3xl">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">© 2026 FORGE STUDIOS. PRIVACY SECURED.</p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <a href="/about" className="hover:text-foreground">About</a>
            <a href="/privacy" className="text-primary">Privacy</a>
            <a href="/contact" className="hover:text-foreground">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
