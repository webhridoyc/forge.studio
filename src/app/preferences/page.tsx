
"use client"

import * as React from "react"
import { Code2, Settings, Moon, Sun, Monitor, Bell, Shield, Sliders } from "lucide-react"
import { AuthUI } from "@/components/AuthModal"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PreferencesPage() {
  const [isAuthOpen, setIsAuthOpen] = React.useState(false)

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
              <Settings className="w-3.5 h-3.5" />
              Studio Settings
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">STUDIO <br /><span className="text-gradient">PREFERENCES</span></h1>
            <p className="text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed">
              Tailor your synthesis environment. Configure default output formats, interface themes, and privacy protocols.
            </p>
          </div>

          <div className="grid gap-8">
            <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 space-y-8">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <Sliders className="w-6 h-6 text-primary" />
                Synthesis Defaults
              </h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 rounded-2xl bg-foreground/5 border border-foreground/5">
                  <div className="space-y-1">
                    <Label className="text-sm font-bold">Default Output Format</Label>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Preferred snippet type for new forging</p>
                  </div>
                  <Select defaultValue="data-uri">
                    <SelectTrigger className="w-[180px] rounded-xl bg-background border-foreground/10">
                      <SelectValue placeholder="Select Format" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-foreground/10">
                      <SelectItem value="data-uri">Data URI</SelectItem>
                      <SelectItem value="raw">Raw Base64</SelectItem>
                      <SelectItem value="html">HTML Img Tag</SelectItem>
                      <SelectItem value="css">CSS Property</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-6 rounded-2xl bg-foreground/5 border border-foreground/5">
                  <div className="space-y-1">
                    <Label className="text-sm font-bold">Auto-Optimize Large Files</Label>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Automatically downscale images over 1MB</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </section>

            <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 space-y-8">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <Monitor className="w-6 h-6 text-accent" />
                Interface Customization
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: Sun, label: "Studio Light", active: true },
                  { icon: Moon, label: "Deep Obsidian", active: false },
                  { icon: Monitor, label: "System Sync", active: false }
                ].map((t, i) => (
                  <Button key={i} variant="outline" className={cn(
                    "h-20 rounded-2xl border-foreground/10 flex items-center justify-start gap-4 px-6 transition-all",
                    t.active && "border-primary bg-primary/5"
                  )}>
                    <t.icon className={cn("w-5 h-5", t.active ? "text-primary" : "text-muted-foreground")} />
                    <span className="font-bold text-xs uppercase tracking-widest">{t.label}</span>
                  </Button>
                ))}
              </div>
            </section>

            <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 space-y-8">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <Shield className="w-6 h-6 text-secondary" />
                Privacy & Data
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-6 rounded-2xl bg-foreground/5 border border-foreground/5">
                  <div className="space-y-1">
                    <Label className="text-sm font-bold">Cloud History Retention</Label>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Allow syncing of forged assets to your vault</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-6 rounded-2xl bg-foreground/5 border border-foreground/5">
                  <div className="space-y-1">
                    <Label className="text-sm font-bold">Analytics Sharing</Label>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">Anonymously share performance metrics</p>
                  </div>
                  <Switch />
                </div>
              </div>
              <div className="pt-4">
                <Button variant="destructive" className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[10px]">
                  Purge Local Storage & History
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="w-full py-12 px-8 border-t border-foreground/5 bg-background/80 backdrop-blur-3xl">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">© 2024 FORGE STUDIOS. CONFIGURATION SAVED.</p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <a href="/cloud-sync" className="hover:text-foreground">Sync</a>
            <a href="/usage-specs" className="hover:text-foreground">Specs</a>
            <a href="/preferences" className="text-primary">Settings</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
