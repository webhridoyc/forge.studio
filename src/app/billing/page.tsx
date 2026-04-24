
"use client"

import * as React from "react"
import { Code2, CreditCard, Check, Zap, ShieldCheck, Crown, ArrowRight } from "lucide-react"
import { AuthUI } from "@/components/AuthModal"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function BillingPage() {
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

      <main className="container mx-auto px-4 pt-32 pb-32 relative z-10 max-w-6xl">
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-black uppercase tracking-widest mx-auto">
              <CreditCard className="w-3.5 h-3.5" />
              Billing & Plans
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">PROFESSIONAL <br /><span className="text-gradient">SUBSCRIPTIONS</span></h1>
            <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
              Choose the capacity that fits your pipeline. From independent architects to global studios.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Tier */}
            <div className="glass-card p-8 md:p-10 rounded-[2.5rem] border-white/10 flex flex-col space-y-8">
              <div className="space-y-2">
                <h3 className="text-xl font-black uppercase tracking-tight">Independent</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">$0</span>
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">/ Month</span>
                </div>
              </div>
              <ul className="space-y-4 flex-1">
                {['Unlimited Synthesis', 'Basic MIME Support', 'Local History Only', 'Community Access'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                    <Check className="w-4 h-4 text-primary" /> {f}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] border-foreground/10">
                Current Tier
              </Button>
            </div>

            {/* Pro Tier */}
            <div className="glass-card p-8 md:p-10 rounded-[2.5rem] border-primary/20 bg-primary/[0.02] shadow-[0_0_80px_-20px_rgba(var(--primary),0.1)] flex flex-col space-y-8 relative overflow-hidden">
              <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-primary text-white text-[8px] font-black uppercase tracking-widest animate-pulse">
                Most Popular
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-black uppercase tracking-tight">Studio Pro</h3>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">$12</span>
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">/ Month</span>
                </div>
              </div>
              <ul className="space-y-4 flex-1">
                {[
                  '10 Cloud Vaults', 
                  'Cross-Device Sync', 
                  'Advanced MIME (WebP/SVG)', 
                  'Priority Synthesis', 
                  'No Ad Transmission'
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-foreground">
                    <Zap className="w-4 h-4 text-primary fill-primary" /> {f}
                  </li>
                ))}
              </ul>
              <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20">
                Upgrade to Pro
              </Button>
            </div>

            {/* Enterprise Tier */}
            <div className="glass-card p-8 md:p-10 rounded-[2.5rem] border-white/10 flex flex-col space-y-8">
              <div className="space-y-2">
                <h3 className="text-xl font-black uppercase tracking-tight">Enterprise</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">$49</span>
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">/ Month</span>
                </div>
              </div>
              <ul className="space-y-4 flex-1">
                {['Unlimited Vaults', 'API Access', 'Dedicated Support', 'Custom MIME Pipelines', 'SLA Guarantee'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-secondary" /> {f}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] border-foreground/10 group">
                Contact Sales <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-12 px-8 border-t border-foreground/5 bg-background/80 backdrop-blur-3xl">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">© 2024 FORGE STUDIOS. SECURE BILLING.</p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <a href="/usage-specs" className="hover:text-foreground">Usage</a>
            <a href="/billing" className="text-primary">Plans</a>
            <a href="/contact" className="hover:text-foreground">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
