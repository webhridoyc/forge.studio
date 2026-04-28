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
  ShoppingBag
} from "lucide-react"
import { ForgeLogo } from "@/components/ForgeLogo"
import { AuthUI } from "@/components/AuthModal"
import { cn } from "@/lib/utils"

export function NavigationHeader() {
  const pathname = usePathname()
  const [isAuthOpen, setIsAuthOpen] = React.useState(false)

  const tools = [
    { 
      name: "Base64", 
      href: "/", 
      icon: Zap, 
      color: "text-primary",
      desc: "Binary Forge"
    },
    { 
      name: "Optimizer", 
      href: "/tools/image-optimizer", 
      icon: ImageIcon, 
      color: "text-accent",
      desc: "Bitstream Scale"
    },
    { 
      name: "SVG Studio", 
      href: "/tools/svg-forge", 
      icon: FileCode, 
      color: "text-secondary",
      desc: "Vector Ortho"
    },
    { 
      name: "JSON Synth", 
      href: "/tools/json-synth", 
      icon: Braces, 
      color: "text-primary",
      desc: "Data Architect"
    },
    {
      name: "Architect",
      href: "/tools/code-architect",
      icon: Terminal,
      color: "text-accent",
      desc: "Logic Breakout"
    },
    {
      name: "Prompts",
      href: "/tools/prompt-architect",
      icon: Target,
      color: "text-primary",
      desc: "Agentic Synth"
    },
    {
      name: "Products",
      href: "/tools/product-forge",
      icon: ShoppingBag,
      color: "text-secondary",
      desc: "Catalog Vision"
    }
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
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground leading-none mb-1">Status</span>
            <div className="flex items-center gap-2">
              <CircleDot className="w-2.5 h-2.5 text-green-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest">V8 Engine Active</span>
            </div>
          </div>
        </div>

        {/* Center: Workstation Dock */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center p-1.5 bg-foreground/[0.03] border border-foreground/5 rounded-[1.8rem] backdrop-blur-md relative z-10 overflow-x-auto no-scrollbar max-w-[50vw]">
          {tools.map((tool) => {
            const isActive = pathname === tool.href
            return (
              <Link 
                key={tool.name}
                href={tool.href}
                className={cn(
                  "relative flex flex-col items-center justify-center px-4 py-2.5 rounded-[1.4rem] transition-all duration-500 group/item shrink-0",
                  isActive 
                    ? "bg-foreground text-background shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] scale-105" 
                    : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-2">
                  <tool.icon className={cn(
                    "w-3.5 h-3.5 transition-transform duration-500 group-hover/item:scale-110", 
                    isActive ? "text-inherit" : tool.color
                  )} />
                  <span className="text-[9px] font-black uppercase tracking-widest">{tool.name}</span>
                </div>
                {/* Module Tooltip/Description (Only for Desktop) */}
                {!isActive && (
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl bg-zinc-900 text-white text-[8px] font-black uppercase tracking-widest opacity-0 group-hover/item:opacity-100 group-hover/item:-bottom-12 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl border border-white/5">
                    {tool.desc}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Mobile Suite Container */}
        <div className="lg:hidden flex items-center gap-1 max-w-[40%] overflow-x-auto no-scrollbar mask-fade-right">
           {tools.slice(0, 5).map((tool) => (
              <Link 
                key={tool.name}
                href={tool.href}
                className={cn(
                  "p-3 rounded-2xl transition-all shrink-0",
                  pathname === tool.href ? "bg-primary text-white" : "bg-foreground/5 text-muted-foreground"
                )}
              >
                <tool.icon className="w-4 h-4" />
              </Link>
           ))}
        </div>

        {/* Right: System Monitor */}
        <div className="flex items-center gap-4 md:gap-6 shrink-0 relative z-10">
          <div className="hidden lg:flex flex-col items-end">
            <Link 
              href="/docs" 
              className={cn(
                "text-[9px] font-black uppercase tracking-[0.2em] transition-all hover:text-primary",
                pathname === "/docs" ? "text-primary" : "text-muted-foreground"
              )}
            >
              System Docs
            </Link>
            <Link 
              href="/performance" 
              className={cn(
                "text-[9px] font-black uppercase tracking-[0.2em] transition-all hover:text-accent mt-1",
                pathname === "/performance" ? "text-accent" : "text-muted-foreground"
              )}
            >
              Network Audit
            </Link>
          </div>

          <div className="w-px h-10 bg-foreground/10 hidden md:block" />
          
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex flex-col items-center px-3 py-1.5 rounded-2xl bg-accent/5 border border-accent/10">
               <Cpu className="w-3 h-3 text-accent mb-1 animate-pulse" />
               <span className="text-[7px] font-black uppercase tracking-widest text-accent">Node-01</span>
             </div>
             <AuthUI onOpenChange={setIsAuthOpen} />
          </div>
        </div>
      </div>

      {/* Floating System Breadcrumb (Optional - shown when scrolling) */}
      <div className="fixed top-[110px] left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-background/40 backdrop-blur-xl border border-white/10 opacity-0 pointer-events-none transition-all duration-500 scale-90 translate-y-4">
        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-muted-foreground">
          <span>Forge Studios</span>
          <ChevronRight className="w-2.5 h-2.5" />
          <span className="text-foreground">Synthesis Mode</span>
        </div>
      </div>
    </header>
  )
}
