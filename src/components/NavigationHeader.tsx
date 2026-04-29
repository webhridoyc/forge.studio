
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Zap, 
  Image as ImageIcon, 
  FileCode, 
  Braces, 
  CircleDot,
  Terminal,
  ChevronRight,
  Cpu,
  Target,
  ShoppingBag,
  LayoutGrid,
  Settings,
  BookOpen,
  BarChart3,
  X,
  Menu,
  Sparkles,
  ShieldCheck,
  Command
} from "lucide-react"
import { ForgeLogo } from "@/components/ForgeLogo"
import { AuthUI } from "@/components/AuthModal"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function NavigationHeader() {
  const pathname = usePathname()
  const [isAuthOpen, setIsAuthOpen] = React.useState(false)
  const [isWorkstationOpen, setIsWorkstationOpen] = React.useState(false)

  // Auto-close menu on route change
  React.useEffect(() => {
    setIsWorkstationOpen(false)
  }, [pathname])

  const tools = [
    { 
      name: "Base64 Forge", 
      href: "/", 
      icon: Zap, 
      color: "text-primary",
      gradient: "from-primary/20 to-transparent",
      desc: "Binary-to-text synthesis"
    },
    { 
      name: "Image Optimizer", 
      href: "/tools/image-optimizer", 
      icon: ImageIcon, 
      color: "text-accent",
      gradient: "from-accent/20 to-transparent",
      desc: "Bitstream scaling"
    },
    { 
      name: "SVG Studio", 
      href: "/tools/svg-forge", 
      icon: FileCode, 
      color: "text-secondary",
      gradient: "from-secondary/20 to-transparent",
      desc: "Vector orchestration"
    },
    { 
      name: "JSON Synthesizer", 
      href: "/tools/json-synth", 
      icon: Braces, 
      color: "text-primary",
      gradient: "from-primary/20 to-transparent",
      desc: "Data architecture"
    },
    {
      name: "Code Architect",
      href: "/tools/code-architect",
      icon: Terminal,
      color: "text-accent",
      gradient: "from-accent/20 to-transparent",
      desc: "AI logic breakout"
    },
    {
      name: "Prompt Architect",
      href: "/tools/prompt-architect",
      icon: Target,
      color: "text-primary",
      gradient: "from-primary/20 to-transparent",
      desc: "Agentic engineering"
    },
    {
      name: "Product Forge",
      href: "/tools/product-forge",
      icon: ShoppingBag,
      color: "text-secondary",
      gradient: "from-secondary/20 to-transparent",
      desc: "AI Vision synthesis"
    }
  ]

  const systemNodes = [
    { name: "Docs", href: "/docs", icon: BookOpen, color: "text-primary" },
    { name: "Audit", href: "/performance", icon: BarChart3, color: "text-accent" },
    { name: "API", href: "/api-reference", icon: Braces, color: "text-secondary" },
    { name: "Config", href: "/preferences", icon: Settings, color: "text-primary" },
  ]

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-[110] w-full px-4 py-4 md:px-8 flex justify-center transition-all",
        isAuthOpen && "hidden"
      )}>
        <div className="w-full max-w-7xl flex items-center justify-between bg-background/40 backdrop-blur-3xl border border-white/10 rounded-[2rem] md:rounded-[3rem] px-4 md:px-8 h-20 md:h-24 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="flex items-center gap-4 shrink-0 relative z-10">
            <Link href="/" className="focus:outline-none group/logo">
              <ForgeLogo iconOnly className="md:hidden" />
              <ForgeLogo className="hidden md:flex" />
            </Link>
            <div className="hidden xl:flex h-8 w-px bg-foreground/10 mx-2" />
            <div className="hidden xl:flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground leading-none mb-1">Engine</span>
              <div className="flex items-center gap-2">
                <CircleDot className="w-2.5 h-2.5 text-green-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Active</span>
              </div>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 z-10">
            <Button 
              variant="outline" 
              onClick={() => setIsWorkstationOpen(!isWorkstationOpen)}
              className={cn(
                "h-12 md:h-14 rounded-2xl md:rounded-[1.4rem] transition-all px-4 md:px-8 group/toggle shadow-xl border-foreground/10",
                isWorkstationOpen 
                  ? "bg-primary text-white border-primary shadow-[0_0_40px_-10px_rgba(var(--primary),0.6)] animate-pulse" 
                  : "bg-foreground/5 hover:bg-foreground hover:text-background"
              )}
            >
              {isWorkstationOpen ? (
                <>
                  <X className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 animate-in fade-in zoom-in duration-300" />
                  <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em]">Close Monitor</span>
                </>
              ) : (
                <>
                  <LayoutGrid className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 transition-transform group-hover/toggle:rotate-90 duration-500" />
                  <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em]">Workstation</span>
                </>
              )}
            </Button>
          </div>

          <div className="flex items-center gap-4 md:gap-6 shrink-0 relative z-10">
            <div className="hidden lg:flex flex-col items-end">
               <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Audit Ready</span>
                  <div className="w-1 h-1 rounded-full bg-primary" />
               </div>
               <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest opacity-50">Local Pipeline Encrypted</p>
            </div>

            <div className="w-px h-10 bg-foreground/10 hidden md:block" />
            
            <div className="flex items-center gap-4">
               <AuthUI onOpenChange={setIsAuthOpen} />
            </div>
          </div>
        </div>
      </header>

      {/* Workstation Drop-Down Monitor */}
      {isWorkstationOpen && (
        <div 
          className="fixed inset-0 z-[105] pt-[104px] md:pt-[128px] animate-in fade-in duration-500"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsWorkstationOpen(false)
          }}
        >
          {/* Backdrop Blur */}
          <div className="absolute inset-0 bg-background/60 backdrop-blur-2xl pointer-events-none" />
          
          <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-20">
            <div className="w-full bg-zinc-950 border border-primary/20 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(var(--primary),0.2)] overflow-hidden flex flex-col max-h-[calc(100vh-140px)] animate-in slide-in-from-top-12 duration-500 cubic-bezier(0.16, 1, 0.3, 1)">
              
              {/* Internal Monitor Glow - Using palette blurs */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
                <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-primary/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-secondary/20 blur-[120px] rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-accent/10 blur-[150px] rounded-full" />
              </div>

              {/* Monitor Header */}
              <div className="p-6 md:p-10 border-b border-white/10 bg-primary/5 flex items-center justify-between relative z-10">
                <div className="space-y-1">
                   <p className="text-[8px] md:text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-1">Command Center</p>
                   <h3 className="text-xl md:text-3xl font-black text-white tracking-tighter uppercase">Synthesis Workspace</h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 shadow-[0_0_20px_-5px_rgba(var(--primary),0.4)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">Live Status: Active</span>
                  </div>
                </div>
              </div>

              {/* Tools Grid */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 space-y-10 relative z-10 pb-20">
                <section className="space-y-6">
                  <div className="flex items-center justify-between px-2">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">Industrial Modules</h3>
                    <span className="text-[9px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">Engine v7.0.0</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {tools.map((tool) => {
                      const isActive = pathname === tool.href
                      return (
                        <Link 
                          key={tool.name} 
                          href={tool.href}
                          className={cn(
                            "flex items-center gap-5 p-5 rounded-[2rem] transition-all group/item border relative overflow-hidden h-24",
                            isActive 
                              ? "bg-primary/20 border-primary/40 text-white shadow-[0_0_40px_-10px_rgba(var(--primary),0.3)]" 
                              : "bg-white/[0.04] border-white/10 hover:border-primary/30 text-muted-foreground hover:text-white"
                          )}
                        >
                          <div className={cn(
                            "absolute inset-0 bg-gradient-to-r opacity-0 group-hover/item:opacity-100 transition-opacity duration-700",
                            tool.gradient
                          )} />
                          
                          <div className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 relative z-10 shrink-0 shadow-lg",
                            isActive 
                              ? "bg-primary text-white scale-110 shadow-primary/20" 
                              : "bg-zinc-900 border border-white/10 group-hover/item:rotate-6 " + tool.color
                          )}>
                            <tool.icon className="w-6 h-6" />
                          </div>
                          
                          <div className="flex-1 min-w-0 relative z-10">
                            <p className="text-[13px] font-black uppercase tracking-widest leading-none mb-1.5">{tool.name}</p>
                            <p className="text-[10px] font-medium opacity-40 truncate leading-none uppercase tracking-tighter">{tool.desc}</p>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </section>

                <section className="space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent/60 px-2">System Infrastructure</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {systemNodes.map((node) => (
                      <Link 
                        key={node.name} 
                        href={node.href}
                        className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/20 transition-all group/node relative overflow-hidden"
                      >
                        <node.icon className={cn("w-4 h-4 transition-colors relative z-10", node.color)} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover/node:text-white relative z-10">{node.name}</span>
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/node:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </section>
              </div>

              {/* Monitor Footer / Exit Node */}
              <div className="p-8 border-t border-white/10 bg-primary/[0.02] mt-auto relative z-20 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-white/10 shadow-lg">
                    <Cpu className="w-6 h-6 text-primary animate-pulse" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-white leading-none mb-1">Vibe Coding Node</p>
                    <p className="text-[9px] font-bold text-primary/60 uppercase tracking-widest">Industrial Cluster 01</p>
                  </div>
                </div>
                
                <Button 
                  onClick={() => setIsWorkstationOpen(false)}
                  variant="ghost"
                  className="w-full md:w-auto h-14 rounded-2xl border border-primary/20 bg-primary/5 hover:bg-primary hover:text-white transition-all font-black uppercase tracking-widest text-[11px] px-10 group shadow-xl"
                >
                  <X className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" />
                  Close Workstation
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
