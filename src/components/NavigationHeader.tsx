"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Zap, 
  ChevronDown, 
  Image as ImageIcon, 
  Code2, 
  FileCode, 
  Braces, 
  Layers,
  Sparkles
} from "lucide-react"
import { ForgeLogo } from "@/components/ForgeLogo"
import { AuthUI } from "@/components/AuthModal"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function NavigationHeader() {
  const pathname = usePathname()
  const [isAuthOpen, setIsAuthOpen] = React.useState(false)

  const tools = [
    { 
      name: "Base64 Forge", 
      href: "/", 
      icon: Zap, 
      desc: "Binary-to-text synthesis",
      color: "text-primary"
    },
    { 
      name: "Image Optimizer", 
      href: "/tools/image-optimizer", 
      icon: ImageIcon, 
      desc: "Lossless WebP compression",
      color: "text-accent"
    },
    { 
      name: "SVG Studio", 
      href: "/tools/svg-forge", 
      icon: FileCode, 
      desc: "SVG to Code & Data URI",
      color: "text-secondary"
    },
    { 
      name: "JSON Synthesizer", 
      href: "/tools/json-synth", 
      icon: Braces, 
      desc: "Coming Soon",
      color: "text-muted-foreground",
      disabled: true
    }
  ]

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-[100] w-full border-b border-white/10 bg-background/40 backdrop-blur-2xl px-4 md:px-12 h-20 flex items-center justify-between shadow-sm transition-all",
      isAuthOpen && "hidden"
    )}>
      <div className="flex items-center gap-8">
        <Link href="/" className="focus:outline-none">
          <ForgeLogo />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-foreground/5 transition-all text-[10px] font-black uppercase tracking-[0.2em] outline-none group">
                <Layers className="w-3.5 h-3.5 text-primary" />
                Studio Tools
                <ChevronDown className="w-3 h-3 opacity-50 group-data-[state=open]:rotate-180 transition-transform" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-2 rounded-[2.5rem] glass-card border-white/10 shadow-2xl z-[200]" align="start" sideOffset={12}>
              <DropdownMenuLabel className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground px-5 py-3">Workbench Synthesis Suite</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-foreground/5 mx-2" />
              <div className="p-1 space-y-1">
                {tools.map((tool) => (
                  <DropdownMenuItem key={tool.name} asChild disabled={tool.disabled}>
                    <Link 
                      href={tool.disabled ? "#" : tool.href}
                      className={cn(
                        "flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300",
                        pathname === tool.href ? "bg-primary/10" : "hover:bg-foreground/5"
                      )}
                    >
                      <div className={cn("w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center shrink-0", tool.color)}>
                        <tool.icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-black uppercase tracking-widest">{tool.name}</p>
                        <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-wider truncate">{tool.desc}</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

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
          <Link 
            href="/api-reference" 
            className={cn(
              "px-4 py-2 rounded-xl hover:bg-foreground/5 transition-all text-[10px] font-black uppercase tracking-[0.2em]",
              pathname === "/api-reference" ? "text-primary" : "text-muted-foreground"
            )}
          >
            API
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-accent/5 border border-accent/20">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest text-accent">Studio Live</span>
        </div>
        <AuthUI onOpenChange={setIsAuthOpen} />
      </div>
    </header>
  )
}
