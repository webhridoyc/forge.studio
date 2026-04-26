"use client"

import * as React from "react"
import { BarChart3, Zap, Info, Shield, CheckCircle2 } from "lucide-react"
import { NavigationHeader } from "@/components/NavigationHeader"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

export default function PerformancePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-accent/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-primary/5 blur-[150px] rounded-full" />
      </div>

      <NavigationHeader />

      <main className="container mx-auto px-4 pt-32 md:pt-48 pb-32 relative z-10 max-w-4xl">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
              <BarChart3 className="w-3.5 h-3.5" />
              Network Audit
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">PERFORMANCE <br /><span className="text-gradient">BENCHMARKS</span></h1>
            <p className="text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed">
              Analyzing the impact of Base64 synthesis on modern Core Web Vitals. Is the HTTP request trade-off worth it for your pipeline?
            </p>
          </div>

          <div className="grid gap-8">
            <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-black tracking-tight">The 33% Encoding Overhead</h2>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  Base64 uses 6 bits per character to represent 8 bits of data, resulting in a predictable ~33.3% size increase. However, in modern web development, the "First Contentful Paint" (FCP) is often delayed more by <strong>HTTP Round Trips</strong> than by slightly larger payloads.
                </p>
              </div>

              <div className="overflow-hidden border border-foreground/5 rounded-3xl">
                <Table>
                  <TableHeader className="bg-foreground/5">
                    <TableRow className="border-foreground/5">
                      <TableHead className="font-black text-[10px] uppercase tracking-widest">Metric</TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest">Standard URL</TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest">Forge Base64</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-foreground/5">
                      <TableCell className="font-bold text-sm">DNS Lookup</TableCell>
                      <TableCell className="text-sm">20ms - 100ms</TableCell>
                      <TableCell className="text-primary font-black text-sm">0ms</TableCell>
                    </TableRow>
                    <TableRow className="border-foreground/5">
                      <TableCell className="font-bold text-sm">TCP Handshake</TableCell>
                      <TableCell className="text-sm">15ms - 50ms</TableCell>
                      <TableCell className="text-primary font-black text-sm">0ms</TableCell>
                    </TableRow>
                    <TableRow className="border-foreground/5">
                      <TableCell className="font-bold text-sm">Request Overhead</TableCell>
                      <TableCell className="text-sm">~400 Bytes</TableCell>
                      <TableCell className="text-primary font-black text-sm">0 Bytes</TableCell>
                    </TableRow>
                    <TableRow className="border-none">
                      <TableCell className="font-bold text-sm">Rendering</TableCell>
                      <TableCell className="text-sm">Post-Download</TableCell>
                      <TableCell className="text-accent font-black text-sm">Instant (Inline)</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </section>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card p-8 rounded-[2rem] border-white/10 space-y-4">
                <Zap className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-black">LCP Optimization</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  For logos and above-the-fold icons, Base64 synthesis eliminates the "flash of unstyled content" by ensuring the asset is ready as soon as the HTML parses.
                </p>
              </div>
              <div className="glass-card p-8 rounded-[2rem] border-white/10 space-y-4">
                <Shield className="w-8 h-8 text-accent" />
                <h3 className="text-xl font-black">Browser Caching</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Inlined assets are cached with the document itself. This is ideal for utility pages but should be used sparingly for massive asset libraries.
                </p>
              </div>
            </div>

            <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 space-y-6">
              <h2 className="text-2xl font-black tracking-tight">Best Practice Advisory</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed font-medium">
                <div className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                  <p><strong>Use for:</strong> Small icons, logos, critical path assets, and SVG-to-WebP conversions where the size reduction offsets the overhead.</p>
                </div>
                <div className="flex gap-4 items-start">
                  <Info className="w-6 h-6 text-primary shrink-0" />
                  <p><strong>Avoid for:</strong> High-resolution hero images or background galleries exceeding 20KB. These are better served via optimized CDN URLs.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="w-full py-12 px-8 border-t border-foreground/5 bg-background/80 backdrop-blur-3xl">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">© 2024 FORGE STUDIOS. AUDITED FOR SPEED.</p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <Link href="/docs" className="hover:text-foreground">Docs</Link>
            <Link href="/performance" className="text-primary">Audit</Link>
            <Link href="/api-reference" className="hover:text-foreground">API</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
