"use client"

import * as React from "react"
import { Code2, BarChart3, Zap, Info, ShieldAlert, Layers } from "lucide-react"
import { AuthUI } from "@/components/AuthModal"
import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function UsageSpecsPage() {
  const [isAuthOpen, setIsAuthOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-accent/5 blur-[150px] rounded-full" />
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
        <article className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
              <BarChart3 className="w-3.5 h-3.5" />
              Technical Specifications
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">BASE64 SYSTEM <br /><span className="text-gradient">CAPABILITIES</span></h1>
            <p className="text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed">
              Detailed breakdown of the Forge Synthesis Engine's limits, processing capabilities, and data retention policies for professional image encoding.
            </p>
          </div>

          <div className="grid gap-8">
            <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 space-y-8">
              <h2 className="text-2xl font-black tracking-tight">Image Encoding Processing Limits</h2>
              <div className="overflow-hidden border border-foreground/5 rounded-3xl">
                <Table>
                  <TableHeader className="bg-foreground/5">
                    <TableRow className="border-foreground/5">
                      <TableHead className="font-black text-[10px] uppercase tracking-widest">Parameter</TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest">Limit</TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest">Recommended</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-foreground/5">
                      <TableCell className="font-bold text-sm">Max File Size</TableCell>
                      <TableCell className="text-sm">5 MB</TableCell>
                      <TableCell className="text-primary font-black text-sm">&lt; 20 KB</TableCell>
                    </TableRow>
                    <TableRow className="border-foreground/5">
                      <TableCell className="font-bold text-sm">Batch Synthesis Size</TableCell>
                      <TableCell className="text-sm">Unlimited</TableCell>
                      <TableCell className="text-primary font-black text-sm">5-10 Files</TableCell>
                    </TableRow>
                    <TableRow className="border-foreground/5">
                      <TableCell className="font-bold text-sm">Vault Retention</TableCell>
                      <TableCell className="text-sm">5 Assets</TableCell>
                      <TableCell className="text-primary font-black text-sm">Active Project</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </section>

            <div className="grid md:grid-cols-2 gap-6">
              <section className="glass-card p-8 rounded-[2rem] border-white/10 space-y-4">
                <Layers className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-black">MIME Format Support</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Forge supports <code>image/png</code>, <code>image/jpeg</code>, <code>image/webp</code>, and <code>image/svg+xml</code>. Binary streams are sanitized before encoding to ensure lossless synthesis.
                </p>
              </section>
              <section className="glass-card p-8 rounded-[2rem] border-white/10 space-y-4">
                <ShieldAlert className="w-8 h-8 text-accent" />
                <h3 className="text-xl font-black">Data URI Safety</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Large Base64 strings are optimized and stored in your private cloud history. We maintain database integrity while preserving the most useful metadata for your asset pipeline.
                </p>
              </section>
            </div>
          </div>
        </article>
      </main>

      <footer className="w-full py-12 px-8 border-t border-foreground/5 bg-background/80 backdrop-blur-3xl">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">© 2024 FORGE STUDIOS. SPECIFIED FOR PERFORMANCE.</p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <a href="/cloud-sync" className="hover:text-foreground">Sync</a>
            <a href="/usage-specs" className="text-primary">Specs</a>
            <a href="/contact" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
