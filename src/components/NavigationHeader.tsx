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
  Menu
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
      desc: "Industrial binary-to-text synthesis"
    },
    { 
      name: "Image Optimizer", 
      href: "/tools/image-optimizer", 
      icon: ImageIcon, 
      color: "text-accent",
      desc: "High-performance bitstream scaling"
    },
    { 
      name: "SVG Studio", 
      href: "/tools/svg-forge", 
      icon: FileCode, 
      color: "text-secondary",
      desc: "Vector-to-component orchestration"
    },
    { 
      name: "JSON Synthesizer", 
      href: "/tools/json-synth", 
      icon: Braces, 
      color: "text-primary",
      desc: "Industrial data architecture tools"
    },
    {
      name: "Code Architect",
      href: "/tools/code-architect",
      icon: Terminal,
      color: "text-accent",
      desc: "AI-powered logic breakout & sandbox"
    },
    {
      name: "Prompt Architect",
      href: "/tools/prompt-architect",
      icon: Target,
      color: "text-primary",
      desc: "Agentic system prompt engineering"
    },
    {
      name: "Product Forge",
      href: "/tools/product-forge",
      icon: ShoppingBag,
      color: "text-secondary",
      desc: "AI Vision catalog synthesis"
    }
  ]

  const systemLinks = [
    { name: "Documentation", href: "/docs", icon: BookOpen, color: "text-muted-foreground" },
    { name: "Performance Audit", href: "/performance", icon: BarChart3, color: "text-muted-foreground" },
    { name: "API Reference", href: "/api-reference", icon: Braces, color: "text-muted-foreground" },
    { name: "Studio Settings", href: "/preferences", icon: Settings, color: "text-muted-foreground" },
  ]

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-[100] w-full px-4 py-4 md:px-8 flex justify-center transition-all",
      isAuthOpen && "hidden"
    )}>
      <div className="w-full max-w-7xl flex items-center justify-between bg-background/40 backdrop-blur-3xl border border-white/10 rounded-[2rem] md:rounded-[3rem] px-4 md:px-8 h-20 md:h-24 shadow-2xl relative overflow-hidden group">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        {/* Left: Brand Identity */}
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

        {/* Center: Command Toggle */}
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
              className="w-full sm:max-w-md bg-zinc-950/95 backdrop-blur-2xl border-white/10 p-0 text-white overflow-hidden flex flex-col"
            >
              <SheetHeader className="p-8 border-b border-white/5 bg-foreground/[0.02]">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-white">
                    <ForgeLogo className="scale-90 origin-left" />
                  </SheetTitle>
                  <SheetClose className="rounded-xl p-2 hover:bg-white/5 transition-colors">
                    <X className="w-6 h-6 text-muted-foreground" />
                  </SheetClose>
                </div>
                <div className="mt-6 flex items-center gap-3 px-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Command Center Active</span>
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-10 pb-20">
                <section className="space-y-4">
                  <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-primary ml-2 mb-2">Synthesis Modules</h3>
                  <div className="grid gap-2">
                    {tools.map((tool) => {
                      const isActive = pathname === tool.href
                      return (
                        <Link 
                          key={tool.name} 
                          href={tool.href}
                          className={cn(
                            "flex items-center gap-4 p-4 rounded-2xl transition-all group/item border",
                            isActive 
                              ? "bg-primary/10 border-primary/20 text-white" 
                              : "bg-white/5 border-transparent hover:border-white/10 text-muted-foreground hover:text-white"
                          )}
                        >
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover/item:scale-110",
                            isActive ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white/5 " + tool.color
                          )}>
                            <tool.icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-black uppercase tracking-widest leading-none mb-1">{tool.name}</p>
                            <p className="text-[9px] font-medium opacity-60 truncate">{tool.desc}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 opacity-20 group-hover/item:opacity-100 transition-opacity" />
                        </Link>
                      )
                    })}
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-accent ml-2 mb-2">System Nodes</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {systemLinks.map((link) => (
                      <Link 
                        key={link.name} 
                        href={link.href}
                        className="flex flex-col gap-3 p-4 rounded-2xl bg-white/[0.02] border border-transparent hover:border-white/5 transition-all group/node"
                      >
                        <link.icon className="w-4 h-4 text-muted-foreground group-hover/node:text-accent transition-colors" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground group-hover/node:text-white">{link.name}</span>
                      </Link>
                    ))}
                  </div>
                </section>
              </div>

              <div className="p-8 border-t border-white/5 bg-foreground/[0.01] mt-auto">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white">Vibe Coding Node</p>
                    <p className="text-[8px] font-bold text-muted-foreground">VERSION 7.0.0 INDUSTRIAL</p>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-accent/10 border border-accent/20 flex items-center gap-2">
                    <Cpu className="w-3 h-3 text-accent" />
                    <span className="text-[8px] font-black text-accent uppercase tracking-widest">Node-01</span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Right: User Monitor */}
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
