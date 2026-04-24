
"use client"

import * as React from "react"
import { 
  Code2, 
  Braces, 
  Terminal, 
  Layers, 
  Globe, 
  Copy, 
  Check, 
  Lock, 
  Zap, 
  Server, 
  ShieldCheck,
  ChevronRight,
  Monitor,
  Play,
  FileCode,
  Loader2
} from "lucide-react"
import { AuthUI } from "@/components/AuthModal"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { optimizeImage } from "@/lib/image-utils"
import Link from "next/link"

export default function ApiRefPage() {
  const [isAuthOpen, setIsAuthOpen] = React.useState(false)
  const [copied, setCopied] = React.useState<string | null>(null)
  const [isSimulating, setIsSimulating] = React.useState(false)
  const [sandboxResult, setSandboxResult] = React.useState<any>(null)

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const simulateApiCall = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsSimulating(true)
    try {
      // Simulate network latency
      await new Promise(resolve => setTimeout(resolve, 800))
      const result = await optimizeImage(file, 'image/webp')
      setSandboxResult({
        status: "success",
        data: {
          id: result.id,
          name: result.name,
          mime: result.format,
          dimensions: `${result.dimensions.width}x${result.dimensions.height}`,
          base64: result.base64.substring(0, 50) + "..."
        }
      })
    } catch (err) {
      setSandboxResult({ status: "error", message: "Synthesis pipeline failed" })
    } finally {
      setIsSimulating(false)
    }
  }

  const sections = [
    { id: "auth", label: "Authentication", icon: Lock },
    { id: "sandbox", label: "Live Sandbox", icon: Play },
    { id: "encode", label: "Encode Endpoint", icon: Zap },
    { id: "limits", label: "Rate Limits", icon: ShieldCheck },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-secondary/5 blur-[150px] rounded-full" />
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
            <Link href="/api-reference" className="text-primary">API</Link>
          </nav>
          <AuthUI onOpenChange={setIsAuthOpen} />
        </div>
      </header>

      <main className="container mx-auto px-4 pt-28 md:pt-32 pb-32 relative z-10 max-w-6xl">
        <div className="grid lg:grid-cols-[250px_1fr] gap-8 md:gap-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {/* Sidebar Nav */}
          <aside className="hidden lg:block space-y-8 sticky top-32 h-fit">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-4">API Navigation</p>
              {sections.map((section) => (
                <a 
                  key={section.id} 
                  href={`#${section.id}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-foreground/5 transition-all group"
                >
                  <section.icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold uppercase tracking-widest">{section.label}</span>
                </a>
              ))}
            </div>
            <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10">
              <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-2">Pro Access</p>
              <p className="text-[11px] font-medium text-muted-foreground leading-relaxed">Unlock high-volume API keys in your usage specs dashboard.</p>
              <Button asChild variant="link" className="p-0 h-auto text-[10px] font-black uppercase tracking-widest mt-3 text-primary">
                <Link href="/billing">Upgrade Now <ChevronRight className="w-3 h-3 ml-1" /></Link>
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="space-y-16 md:space-y-24">
            <section className="space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-black uppercase tracking-widest">
                <Braces className="w-3.5 h-3.5" />
                V1.0.0 Stable
              </div>
              <h1 className="text-3xl md:text-7xl font-black tracking-tighter leading-none uppercase">Technical <br /><span className="text-gradient">API Reference</span></h1>
              <p className="text-sm md:text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
                Seamlessly integrate the Forge synthesis engine into your developer workstation or server-side pipelines.
              </p>
            </section>

            <section id="auth" className="scroll-mt-32 space-y-6 md:space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Lock className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase">Authentication</h2>
              </div>
              <div className="glass-card p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border-white/10 space-y-6">
                <p className="text-xs md:text-sm text-muted-foreground font-medium leading-relaxed">
                  All Forge API requests must include a secret key in the request header. You can manage your access tokens within the <Link href="/usage-specs" className="text-primary hover:underline">Usage Specs</Link> portal.
                </p>
                <div className="p-4 md:p-6 bg-zinc-950 rounded-2xl md:rounded-3xl border border-white/5 font-code text-[11px] md:text-sm overflow-x-auto whitespace-nowrap group relative">
                  <span className="text-zinc-500">Header:</span> <span className="text-accent font-bold">X-Forge-API-Key</span> <span className="text-zinc-500">:</span> <span className="text-zinc-300">your_secret_token_here</span>
                  <Button
                    size="icon"
                    onClick={() => handleCopy("auth-header", "X-Forge-API-Key: your_secret_token_here")}
                    className="absolute top-3 right-3 md:top-4 md:right-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    {copied === "auth-header" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </section>

            {/* Live API Sandbox */}
            <section id="sandbox" className="scroll-mt-32 space-y-6 md:space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <Play className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase">Live Sandbox</h2>
              </div>
              <div className="glass-card p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border-white/10 space-y-8">
                <div className="space-y-2">
                  <h3 className="text-lg font-black uppercase tracking-tight">Test Pipeline</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">Upload an asset to simulate a real-time API response from the Forge Studio engine.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-2">Input Simulation</label>
                    <div className="relative border-2 border-dashed border-foreground/10 rounded-[1.5rem] p-8 text-center hover:border-primary/50 transition-colors cursor-pointer group">
                      <input 
                        type="file" 
                        onChange={simulateApiCall}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept="image/*"
                      />
                      <div className="flex flex-col items-center gap-3">
                        {isSimulating ? (
                          <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        ) : (
                          <Play className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                        )}
                        <span className="text-[10px] font-black uppercase tracking-widest">Run Simulation</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-2">Real-time Response</label>
                    <div className="bg-zinc-950 rounded-[1.5rem] p-6 border border-white/5 min-h-[200px] font-code text-xs overflow-hidden">
                      {sandboxResult ? (
                        <pre className="text-green-400 whitespace-pre-wrap break-all leading-relaxed animate-in fade-in slide-in-from-top-2">
                          {JSON.stringify(sandboxResult, null, 2)}
                        </pre>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-zinc-600 space-y-2 opacity-50">
                          <Terminal className="w-6 h-6" />
                          <span className="text-[9px] uppercase tracking-widest font-black italic">Awaiting Request...</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="encode" className="scroll-mt-32 space-y-6 md:space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase">Encode Endpoint</h2>
              </div>
              <div className="glass-card p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border-white/10 space-y-8">
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  <span className="px-3 py-1 rounded-md bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest border border-green-500/20 shrink-0">POST</span>
                  <code className="text-xs md:text-sm font-bold text-muted-foreground whitespace-nowrap">/v1/encode</code>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground font-medium leading-relaxed">
                  Transforms binary image streams into optimized Base64 payloads. Supports PNG, JPG, WebP, and SVG formats.
                </p>

                <Tabs defaultValue="js" className="w-full">
                  <TabsList className="bg-foreground/5 p-1 rounded-xl md:rounded-2xl border border-foreground/5 mb-6 w-full md:w-fit">
                    <TabsTrigger value="js" className="flex-1 md:flex-none rounded-lg md:rounded-xl px-4 md:px-6 py-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest">JavaScript</TabsTrigger>
                    <TabsTrigger value="curl" className="flex-1 md:flex-none rounded-lg md:rounded-xl px-4 md:px-6 py-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest">cURL</TabsTrigger>
                    <TabsTrigger value="python" className="flex-1 md:flex-none rounded-lg md:rounded-xl px-4 md:px-6 py-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Python</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="js" className="mt-0 group relative">
                    <pre className="p-6 md:p-8 bg-zinc-950 text-zinc-300 rounded-[1.5rem] md:rounded-[2rem] font-code text-[10px] md:text-xs lg:text-sm overflow-x-auto leading-relaxed border border-white/5 custom-scrollbar">
                      <code>{`const response = await fetch('https://api.forge.studio/v1/encode', {
  method: 'POST',
  headers: {
    'X-Forge-API-Key': 'YOUR_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    image: 'base64_or_binary_stream',
    target: 'webp'
  })
});

const { data } = await response.json();
console.log(data.uri);`}</code>
                    </pre>
                    <Button
                      size="icon"
                      onClick={() => handleCopy("js-encode", `const response = await fetch('https://api.forge.studio/v1/encode', ...`)}
                      className="absolute top-4 right-4 md:top-6 md:right-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      {copied === "js-encode" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </TabsContent>

                  <TabsContent value="curl" className="mt-0 group relative">
                    <pre className="p-6 md:p-8 bg-zinc-950 text-zinc-300 rounded-[1.5rem] md:rounded-[2rem] font-code text-[10px] md:text-xs lg:text-sm overflow-x-auto leading-relaxed border border-white/5 custom-scrollbar">
                      <code>{`curl -X POST https://api.forge.studio/v1/encode \\
  -H "X-Forge-API-Key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"image": "...", "target": "png"}'`}</code>
                    </pre>
                  </TabsContent>
                </Tabs>
              </div>
            </section>

            <section id="limits" className="scroll-mt-32 space-y-6 md:space-y-8 pb-12">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase">Rate Limits</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="glass-card p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border-white/10 space-y-4">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-muted-foreground" />
                    <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest">Free Tier</h3>
                  </div>
                  <p className="text-3xl md:text-4xl font-black tabular-nums">100<span className="text-xs md:text-sm font-medium text-muted-foreground">/day</span></p>
                  <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed">Perfect for personal workstations and small independent architectures.</p>
                </div>
                <div className="glass-card p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border-primary/20 bg-primary/[0.02] space-y-4">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 text-primary" />
                    <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-primary">Pro Studio</h3>
                  </div>
                  <p className="text-3xl md:text-4xl font-black tabular-nums text-primary">∞<span className="text-xs md:text-sm font-medium text-primary/60">/day</span></p>
                  <p className="text-[10px] md:text-xs text-primary/60 leading-relaxed">Uncapped synthesis for high-volume pipelines and automated dev ecosystems.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="w-full py-12 px-8 border-t border-foreground/5 bg-background/80 backdrop-blur-3xl">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-center md:text-left">© 2026 FORGE STUDIOS. API VERSION 1.0.0 READY.</p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <Link href="/docs" className="hover:text-foreground">Docs</Link>
            <Link href="/performance" className="hover:text-foreground">Audit</Link>
            <Link href="/api-reference" className="text-primary">API</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
