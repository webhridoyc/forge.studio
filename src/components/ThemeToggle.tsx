"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark">("dark")

  React.useEffect(() => {
    const root = window.document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [theme])

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-2xl w-12 h-12 transition-all duration-500 active:scale-90 bg-white/5 hover:bg-white/10 border border-white/5"
    >
      <div className="relative w-6 h-6">
        <div className={`absolute inset-0 transition-all duration-500 transform ${theme === 'light' ? 'rotate-0 opacity-100 scale-100' : 'rotate-90 opacity-0 scale-0'}`}>
          <Sun className="h-6 w-6 text-secondary" />
        </div>
        <div className={`absolute inset-0 transition-all duration-500 transform ${theme === 'dark' ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-0'}`}>
          <Moon className="h-6 w-6 text-primary" />
        </div>
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}