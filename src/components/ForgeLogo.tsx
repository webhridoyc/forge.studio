"use client"

import { cn } from "@/lib/utils"

interface ForgeLogoProps {
  className?: string
  iconOnly?: boolean
}

/**
 * A custom, high-fidelity SVG logo for Forge Studios.
 * Features a geometric anvil and spark design.
 */
export function ForgeLogo({ className, iconOnly = false }: ForgeLogoProps) {
  return (
    <div className={cn("flex items-center gap-2 md:gap-3 group", className)}>
      <div className="bg-gradient-to-br from-primary via-secondary to-accent p-1.5 md:p-2 rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 md:w-6 md:h-6 text-white"
        >
          {/* Anvil Base */}
          <path
            d="M19 15V17C19 18.1046 18.1046 19 17 19H7C5.89543 19 5 18.1046 5 17V15"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Anvil Body */}
          <path
            d="M4 11V12C4 13.6569 5.34315 15 7 15H17C18.6569 15 20 13.6569 20 12V11H4Z"
            fill="currentColor"
          />
          {/* Anvil Top */}
          <path
            d="M7 6H17C18.6569 6 20 7.34315 20 9V11H4V9C4 7.34315 5.34315 6 7 6Z"
            fill="currentColor"
          />
          {/* Synthesis Spark */}
          <path
            d="M12 2L13 5L16 6L13 7L12 10L11 7L8 6L11 5L12 2Z"
            fill="white"
            className="animate-pulse"
          />
        </svg>
        <div className="absolute -inset-1 bg-white/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      {!iconOnly && (
        <span className="text-xl md:text-2xl font-black tracking-tighter text-foreground">
          FORGE.
        </span>
      )}
    </div>
  )
}
