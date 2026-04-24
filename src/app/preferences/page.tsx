
"use client"

import * as React from "react"
import { Code2, Settings, Moon, Sun, Monitor, Bell, Shield, Sliders, Zap, Copy, Trash2, Globe, Check } from "lucide-react"
import { AuthUI } from "@/components/AuthModal"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function PreferencesPage() {
  const { toast } = useToast()
  const [isAuthOpen, setIsAuthOpen] = React.useState(false)
  const [isPurging, setIsPurging] = React.useState(false)

  const handlePurge = () => {
    setIsPurging(true)
    setTimeout(() => {
      localStorage.clear()
      setIsPurging(false)
      toast({
        title: "System Purge Complete",
        description: "Local cache and preferences have been reset.",
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-primary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-accent/5 blur-[150px] rounded-full" />
      </div>

      <header className={cn(
        "fixed top-0 left-0 right-0 z-[100] w-full border-b border-white/10 bg-background/40 backdrop-blur-2xl px-4 md:px-12 h-20 flex items-center justify-between shadow-sm transition-all",
        isAuthOpen && "hidden"
      )}>
        <Link href="/" className="flex items-center gap-2 md:gap-3 group">
          <div className="bg-gradient-to-br from-primary to-secondary p-1.5 md:p-2 rounded-xl shadow-lg group-hover:scale-110 transition-all">
            <Code2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tighter">FORGE.</span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mr-6">
            <Link href="/docs" className="hover:text-foreground transition-colors">Documentation</Link>
            <Link href="/performance" className="hover:text-foreground transition-colors">Performance</Link>
            <Link href="/api-reference" className="hover:text-foreground transition-colors">API</Link>
          </nav>
          <AuthUI onOpenChange={setIsAuthOpen} />
        </div>
      </header>

      <main className="container mx-auto px-4 pt-32 pb-32 relative z-10 max-w-4xl">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
              <Settings className="w-3.5 h-3.5" />
              Studio Environment
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-none uppercase">Studio <br /><span className="text-gradient">Preferences</span></h1>
            <p className="text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed">
              Architect your synthesis workstation. Configure default bitstream outputs, interface schemas, and professional privacy protocols.
            </p>
          </div>

          <div className="grid gap-8">
            {/* Synthesis Defaults */}
            <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 space-y-8">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3 uppercase">
                <Sliders className="w-6 h-6 text-primary" />
                Synthesis Config
              </h2>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-3xl bg-foreground/[0.02] border border-foreground/5 gap-4">
                  <div className="space-y-1">
                    <Label className="text-sm font-bold">Default Output Format</Label>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Initial tab selection for new forges</p>
                  </div>
                  <Select defaultValue="data-uri">
                    <SelectTrigger className="w-full md:w-[180px] rounded-xl bg-background border-foreground/10 h-12 font-bold text-xs">
                      <SelectValue placeholder="Select Format" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-foreground/10">
                      <SelectItem value="data-uri" className="font-bold text-xs uppercase tracking-widest">Data URI</SelectItem>
                      <SelectItem value="raw" className="font-bold text-xs uppercase tracking-widest">Raw Base64</SelectItem>
                      <SelectItem value="html" className="font-bold text-xs uppercase tracking-widest">HTML Tag</SelectItem>
                      <SelectItem value="css" className="font-bold text-xs uppercase tracking-widest">CSS Property</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-6 rounded-3xl bg-foreground/[0.02] border border-foreground/5">
                  <div className="space-y-1">
                    <Label className="text-sm font-bold flex items-center gap-2">
                      Auto-Copy to Clipboard <Zap className="w-3 h-3 text-primary" />
                    </Label>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Copy snippet immediately after synthesis</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-6 rounded-3xl bg-foreground/[0.02] border border-foreground/5">
                  <div className="space-y-1">
                    <Label className="text-sm font-bold">Safe Mode Rendering</Label>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Truncate large bitstreams to prevent UI lag</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </section>

            {/* Interface Customization */}
            <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 space-y-8">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3 uppercase">
                <Monitor className="w-6 h-6 text-accent" />
                Interface Schema
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'light', icon: Sun, label: "Studio Light", active: true },
                  { id: 'dark', icon: Moon, label: "Deep Obsidian", active: false },
                  { id: 'system', icon: Monitor, label: "System Sync", active: false }
                ].map((t) => (
                  <Button key={t.id} variant="outline" className={cn(
                    "h-24 rounded-3xl border-foreground/10 flex flex-col items-center justify-center gap-3 transition-all",
                    t.active && "border-primary bg-primary/5 ring-1 ring-primary/20"
                  )}>
                    <t.icon className={cn("w-6 h-6", t.active ? "text-primary" : "text-muted-foreground")} />
                    <span className="font-black text-[9px] uppercase tracking-[0.2em]">{t.label}</span>
                  </Button>
                ))}
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-3xl bg-foreground/[0.02] border border-foreground/5 gap-4">
                <div className="space-y-1">
                  <Label className="text-sm font-bold flex items-center gap-2">
                    Primary Region <Globe className="w-3 h-3 text-accent" />
                  </Label>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Studio localization and time formats</p>
                </div>
                <Select defaultValue="en">
                  <SelectTrigger className="w-full md:w-[180px] rounded-xl bg-background border-foreground/10 h-12 font-bold text-xs">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-foreground/10">
                    <SelectItem value="en" className="font-bold text-xs uppercase tracking-widest">English (US)</SelectItem>
                    <SelectItem value="bn" className="font-bold text-xs uppercase tracking-widest">Bengali (IN/BD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </section>

            {/* Privacy & Data */}
            <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 space-y-8">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3 uppercase">
                <Shield className="w-6 h-6 text-secondary" />
                Security & Data
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-6 rounded-3xl bg-foreground/[0.02] border border-foreground/5">
                  <div className="space-y-1">
                    <Label className="text-sm font-bold">Cloud Vault Retention</Label>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Allow snippets to be vaulted to your private history</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-6 rounded-3xl bg-foreground/[0.02] border border-foreground/5">
                  <div className="space-y-1">
                    <Label className="text-sm font-bold">Anonymized Performance Audit</Label>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Contribute synthesis metrics to our speed engine</p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <div className="pt-8 border-t border-foreground/5 space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Danger Zone</p>
                <Button 
                  variant="ghost" 
                  onClick={handlePurge}
                  disabled={isPurging}
                  className="w-full h-16 rounded-[1.5rem] border border-destructive/10 bg-destructive/5 hover:bg-destructive hover:text-white transition-all font-black uppercase tracking-widest text-[11px]"
                >
                  {isPurging ? "Reconciling Storage..." : <><Trash2 className="w-4 h-4 mr-2" /> Purge Local Cache & History</>}
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="w-full py-12 px-8 border-t border-foreground/5 bg-background/80 backdrop-blur-3xl">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">© 2026 FORGE STUDIOS. CONFIGURATION ENCRYPTED.</p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <Link href="/cloud-sync" className="hover:text-foreground">Sync</Link>
            <Link href="/usage-specs" className="hover:text-foreground">Specs</Link>
            <Link href="/preferences" className="text-primary">Settings</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
