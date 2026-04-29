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
  ShieldCheck
} from "lucide-react"
import { ForgeLogo } from "@/components/ForgeLogo"
import { AuthUI } from "@/components/AuthModal"
import { cn } from "@/lib/utils"
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetHeader, 
  SheetTitle,
  SheetClose
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export function NavigationHeader() {
  const pathname = usePathname()
  const [isAuthOpen, setIsAuthOpen] = React.useState(false)

  const tools = [
    { 
      name: "Base64 Forge", 
      href: "/", 
      icon: Zap, 
      color: "text-primary",
      gradient: "from-primary/20 to-transparent",
      desc: "Industrial binary-to-text synthesis"
    },
    { 
      name: "Image Optimizer", 
      href: "/tools/image-optimizer", 
      icon: ImageIcon, 
      color: "text-accent",
      gradient: "from-accent/20 to-transparent",
      desc: "High-performance bitstream scaling"
    },
    { 
      name: "SVG Studio", 
      href: "/tools/svg-forge", 
      icon: FileCode, 
      color: "text-secondary",
      gradient: "from-secondary/20 to-transparent",
      desc: "Vector-to-component orchestration"
    },
    { 
      name: "JSON Synthesizer", 
      href: "/tools/json-synth", 
      icon: Braces, 
      color: "text-primary",
      gradient: "from-primary/20 to-transparent",
      desc: "Industrial data architecture tools"
    },
    {
      name: "Code Architect",
      href: "/tools/code-architect",
      icon: Terminal,
      color: "text-accent",
      gradient: "from-accent/20 to-transparent",
      desc: "AI-powered logic breakout & sandbox"
    },
    {
      name: "Prompt Architect",
      href: "/tools/prompt-architect",
      icon: Target,
      color: "text-primary",
      gradient: "from-primary/20 to-transparent",
      desc: "Agentic system prompt engineering"
    },
    {
      name: "Product Forge",
      href: "/tools/product-forge",
      icon: ShoppingBag,
      color: "text-secondary",
      gradient: "from-secondary/20 to-transparent",
      desc: "AI Vision catalog synthesis"
    }
  ]

  const systemNodes = [
    { name: "Documentation", href: "/docs", icon: BookOpen },
    { name: "Performance", href: "/performance", icon: BarChart3 },
    { name: "API Reference", href: "/api-reference", icon: Braces },
    { name: "Studio Settings", href: "/preferences", icon: Settings },
  ]

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-[100] w-full px-4 py-4 md:px-8 flex justify-center transition-all",
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
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                className="h-12 md:h-14 rounded-2xl md:rounded-[1.4rem] bg-foreground/5 border-foreground/10 hover:bg-foreground hover:text-background transition-all px-4 md:px-8 group/toggle shadow-xl"
              >
                <LayoutGrid className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 transition-transform group-hover/toggle:rotate-90 duration-500" />
                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em]">Workstation</span>
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="left" 
              className="w-full sm:max-w-md bg-zinc-950 border-white/10 p-0 text-white overflow-hidden flex flex-col"
            >
              <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
                <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-primary/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-secondary/20 blur-[120px] rounded-full" />
              </div>

              <SheetHeader className="p-8 border-b border-white/5 bg-white/[0.02] relative z-10">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-white">
                    <ForgeLogo className="scale-90 origin-left" />
                  </SheetTitle>
                  <SheetClose className="rounded-2xl p-2.5 bg-white/5 hover:bg-white/10 transition-all active:scale-95 border border-white/5">
                    <X className="w-5 h-5 text-white" />
                  </SheetClose>
                </div>
                <div className="mt-6 flex items-center gap-3 px-1">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-green-500">Command Active</span>
                  </div>
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-12 relative z-10 pb-24">
                <section className="space-y-4">
                  <div className="flex items-center justify-between px-2 mb-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Synthesis Modules</h3>
                    <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-md">V7.0.0</span>
                  </div>
                  <div className="grid gap-3">
                    {tools.map((tool) => {
                      const isActive = pathname === tool.href
                      return (
                        <Link 
                          key={tool.name} 
                          href={tool.href}
                          className={cn(
                            "flex items-center gap-4 p-4 rounded-3xl transition-all group/item border relative overflow-hidden",
                            isActive 
                              ? "bg-primary/20 border-primary/40 text-white shadow-[0_0_40px_-10px_rgba(var(--primary),0.3)]" 
                              : "bg-white/[0.03] border-white/5 hover:border-white/20 text-muted-foreground hover:text-white"
                          )}
                        >
                          <div className={cn(
                            "absolute inset-0 bg-gradient-to-r opacity-0 group-hover/item:opacity-100 transition-opacity duration-700",
                            tool.gradient
                          )} />
                          
                          <div className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 relative z-10 shrink-0",
                            isActive 
                              ? "bg-primary text-white shadow-xl rotate-0" 
                              : "bg-white/5 group-hover/item:rotate-6 " + tool.color
                          )}>
                            <tool.icon className="w-6 h-6" />
                          </div>
                          
                          <div className="flex-1 min-w-0 relative z-10">
                            <p className="text-[12px] font-black uppercase tracking-widest leading-none mb-1.5">{tool.name}</p>
                            <p className="text-[10px] font-medium opacity-50 truncate leading-none">{tool.desc}</p>
                          </div>
                          
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 opacity-0 group-hover/item:opacity-100 transition-all relative z-10">
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent px-2 mb-4">System Nodes</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {systemNodes.map((node) => (
                      <Link 
                        key={node.name} 
                        href={node.href}
                        className="flex flex-col gap-3 p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all group/node relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover/node:opacity-30 transition-opacity">
                          <node.icon className="w-8 h-8 text-white" />
                        </div>
                        <node.icon className="w-5 h-5 text-muted-foreground group-hover/node:text-accent transition-colors relative z-10" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover/node:text-white relative z-10">{node.name}</span>
                      </Link>
                    ))}
                  </div>
                </section>
              </div>

              <div className="p-8 border-t border-white/5 bg-white/[0.01] mt-auto relative z-20">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-white/5">
                      <Cpu className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-widest text-white leading-none mb-1">Vibe Coding Node</p>
                      <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Industrial Cluster 01</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[8px] font-black text-accent uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-accent/10 border border-accent/20">READY</span>
                    <span className="text-[7px] font-bold text-muted-foreground opacity-30">© 2026 FORGE</span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
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
  )
}
