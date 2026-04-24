
"use client"

import * as React from "react"
import { Code2, Cloud, ShieldCheck, RefreshCw, Smartphone, Laptop, Layout } from "lucide-react"
import { AuthUI } from "@/components/AuthModal"
import { cn } from "@/lib/utils"

export default function CloudSyncPage() {
  const [isAuthOpen, setIsAuthOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-secondary/5 blur-[150px] rounded-full" />
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-black uppercase tracking-widest">
              <Cloud className="w-3.5 h-3.5" />
              Cloud Sync Hub
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">CROSS-DEVICE <br /><span className="text-gradient">SYNCHRONIZATION</span></h1>
            <p className="text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed">
              Your forged assets, available everywhere. Establish your Member Vault to unlock real-time history synchronization across your entire developer ecosystem.
            </p>
          </div>

          <div className="grid gap-8">
            <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 space-y-6">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-primary" />
                Secure Vaulting
              </h2>
              <p className="text-muted-foreground leading-relaxed font-medium">
                Forge Studios utilizes Firebase's real-time infrastructure to sync your conversion history. When you "Vault" an asset, it is encrypted and stored in your private subcollection, accessible only by your authenticated profile.
              </p>
              <div className="grid md:grid-cols-3 gap-6 pt-4">
                {[
                  { icon: Laptop, title: "Workstation", desc: "Forge on desktop" },
                  { icon: RefreshCw, title: "Real-time", desc: "Instant sync" },
                  { icon: Smartphone, title: "Mobile", desc: "Retrieve on-the-go" }
                ].map((item, i) => (
                  <div key={i} className="bg-foreground/5 p-6 rounded-2xl border border-foreground/5 text-center space-y-3">
                    <item.icon className="w-6 h-6 mx-auto text-secondary" />
                    <h3 className="text-xs font-black uppercase tracking-widest">{item.title}</h3>
                    <p className="text-[10px] text-muted-foreground font-bold">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 space-y-6">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <Layout className="w-6 h-6 text-accent" />
                History Management
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed font-medium">
                <p>Members can manage their most recent 5 forged assets via the "Cloud Vaults" section. This limit ensures zero-latency performance for your workbench while providing enough history for active projects.</p>
                <ul className="space-y-3 pt-2">
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
                    <span><strong>Auto-Cleanup:</strong> Older assets are automatically pruned to keep your vault efficient.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
                    <span><strong>Metadata Retention:</strong> File names, MIME types, and original dimensions are preserved.</span>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="w-full py-12 px-8 border-t border-foreground/5 bg-background/80 backdrop-blur-3xl">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">© 2024 FORGE STUDIOS. SYNCED GLOBALLY.</p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <a href="/cloud-sync" className="text-primary">Sync</a>
            <a href="/usage-specs" className="hover:text-foreground">Specs</a>
            <a href="/contact" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
