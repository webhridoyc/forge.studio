"use client"

import * as React from "react"
import { ThemeToggle } from "@/components/ThemeToggle"
import { FileUploader } from "@/components/FileUploader"
import { CodeOutput } from "@/components/CodeOutput"
import { SEOIntro, FAQSection } from "@/components/SEOSections"
import { fileToBase64 } from "@/lib/image-utils"
import { Toaster } from "@/components/ui/toaster"
import { Code2, Zap, Sparkles, Layers, ShieldCheck } from "lucide-react"

export default function Home() {
  const [file, setFile] = React.useState<File | null>(null)
  const [base64, setBase64] = React.useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile)
    try {
      const b64 = await fileToBase64(selectedFile)
      setBase64(b64)
      setPreviewUrl(b64)
    } catch (err) {
      console.error("Conversion failed:", err)
    }
  }

  const handleClear = () => {
    setFile(null)
    setBase64(null)
    setPreviewUrl(null)
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl px-4 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl shadow-lg shadow-primary/20">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            FORGE.
          </span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 pt-20 pb-24 flex flex-col items-center relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mb-20 space-y-6 animate-in fade-in slide-in-from-top-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-accent text-sm font-bold uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
            <span>Next-Gen Image Encoding</span>
          </div>
          <h1 className="text-6xl sm:text-8xl font-black text-foreground tracking-tight leading-[0.9] lg:text-9xl">
            FORGE <span className="text-primary">ASSETS</span> <br />
            INTO <span className="text-secondary italic">PIXELS</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The professional developer's workbench for instant, secure Base64 conversion. 
            No cloud. No latency. Just pure performance.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-20">
          {[
            { icon: Zap, title: "Instant", desc: "Real-time encoding in your browser", color: "text-primary" },
            { icon: ShieldCheck, title: "Private", desc: "Zero server uploads. 100% client-side", color: "text-accent" },
            { icon: Layers, title: "Versatile", desc: "HTML, CSS, URI, and Raw formats", color: "text-secondary" },
          ].map((feature, i) => (
            <div key={i} className="glass-card p-6 rounded-3xl border hover:border-white/20 transition-all hover:translate-y-[-4px] group">
              <feature.icon className={`w-8 h-8 ${feature.color} mb-4 group-hover:scale-110 transition-transform`} />
              <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Tool Section */}
        <section className="w-full flex flex-col items-center gap-12 relative">
          <div className="w-full max-w-4xl relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-[2rem] blur opacity-20 pointer-events-none" />
            <div className="relative glass-card rounded-[2rem] p-2">
              <FileUploader 
                onFileSelect={handleFileSelect} 
                onClear={handleClear}
                currentFile={file}
              />
            </div>

            {previewUrl && (
              <div className="mt-12 mb-12 flex flex-col items-center animate-in fade-in zoom-in duration-500">
                <div className="relative p-1 rounded-2xl bg-gradient-to-br from-primary/50 to-secondary/50 shadow-2xl">
                  <div className="bg-card rounded-[calc(var(--radius)-4px)] p-4">
                    <img 
                      src={previewUrl} 
                      alt="Uploaded preview" 
                      className="max-h-64 rounded-lg object-contain"
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Live Asset Ready</span>
                </div>
              </div>
            )}

            {base64 && file && (
              <div className="mt-8">
                <CodeOutput base64={base64} fileName={file.name} />
              </div>
            )}
          </div>
        </section>

        <SEOIntro />
        <FAQSection />
      </main>

      <footer className="w-full py-16 px-4 border-t border-border/50 bg-card/50 backdrop-blur-md">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter">FORGE.</span>
            </div>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              We provide the tools, you build the future. A premium utility for modern developers who value speed and privacy.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-primary">Resources</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="#" className="hover:text-white transition-colors">Documentation</a>
              <a href="#" className="hover:text-white transition-colors">API Reference</a>
              <a href="#" className="hover:text-white transition-colors">Changelog</a>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-secondary">Legal</h4>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </nav>
          </div>
        </div>
        <div className="container mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-medium">
          <p>© {new Date().getFullYear()} FORGE STUDIOS. BUILT FOR THE BOLD.</p>
          <div className="flex gap-4">
            <span>V2.4.0</span>
            <span className="text-accent">STABLE RELEASE</span>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}
