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
  Terminal
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
      color: "text-primary"
    },
    { 
      name: "Optimizer", 
      href: "/tools/image-optimizer", 
      icon: ImageIcon, 
      color: "text-accent"
    },
    { 
      name: "SVG Studio", 
      href: "/tools/svg-forge", 
      icon: FileCode, 
      color: "text-secondary"
    },
    { 
      name: "JSON Synth", 
      href: "/tools/json-synth", 
      icon: Braces, 
      color: "text-primary"
    },
    {
      name: "Code Architect",
      href: "/tools/code-architect",
      icon: Terminal,
      color: "text-accent"
    }
  ]

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-[100] w-full border-b border-white/10 bg-background/40 backdrop-blur-2xl px-4 md:px-12 h-20 flex items-center justify-between shadow-sm transition-all",
      isAuthOpen && "hidden"
    )}>
      <div className="flex items-center gap-4 md:gap-10 min-w-0">
        <Link href="/" className="focus:outline-none shrink-0">
          <ForgeLogo iconOnly className="md:hidden" />
          <ForgeLogo className="hidden md:flex" />
        </Link>

        <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide no-scrollbar">
          <div className="flex items-center gap-1 pr-2">
            {tools.map((tool) => (
              <Link 
                key={tool.name}
                href={tool.href}
                className={cn(
                  "flex items-center gap-1.5 md:gap-2 px-3 py-2 rounded-xl transition-all whitespace-nowrap shrink-0",
                  pathname === tool.href 
                    ? "bg-foreground text-background shadow-lg shadow-foreground/10" 
                    : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                )}
              >
                <tool.icon className={cn("w-3.5 h-3.5", pathname === tool.href ? "text-inherit" : tool.color)} />
                <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">{tool.name}</span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:block w-px h-4 bg-foreground/10 mx-2 shrink-0" />

          <div className="hidden lg:flex items-center gap-1 shrink-0">
            <Link 
              href="/docs" 
              className={cn(
                "px-4 py-2 rounded-xl hover:bg-foreground/5 transition-all text-[10px] font-black uppercase tracking-[0.2em]",
                pathname === "/docs" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Docs
            </Link>
            <Link 
              href="/performance" 
              className={cn(
                "px-4 py-2 rounded-xl hover:bg-foreground/5 transition-all text-[10px] font-black uppercase tracking-[0.2em]",
                pathname === "/performance" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Performance
            </Link>
          </div>
        </nav>
      </div>

      <div className="flex items-center gap-3 md:gap-4 shrink-0">
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 border border-accent/20">
          <CircleDot className="w-2 h-2 text-accent animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-widest text-accent">Studio Live</span>
        </div>
        <AuthUI onOpenChange={setIsAuthOpen} />
      </div>
    </header>
  )
}
