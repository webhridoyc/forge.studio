"use client"

import * as React from "react"
import { Moon, Sun, Palette } from "lucide-react"
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
      className="rounded-2xl w-14 h-14 bg-foreground/5 hover:bg-foreground/10 border border-foreground/5 transition-all duration-500 hover:rotate-12 active:scale-90"
    >
      <div className="relative w-6 h-6">
        <div className={`absolute inset-0 transition-all duration-700 transform ${theme === 'light' ? 'rotate-0 opacity-100 scale-100' : 'rotate-90 opacity-0 scale-50'}`}>
          <Sun className="h-6 w-6 text-orange-500" />
        </div>
        <div className={`absolute inset-0 transition-all duration-700 transform ${theme === 'dark' ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'}`}>
          <Moon className="h-6 w-6 text-primary" />
        </div>
      </div>
      <span className="sr-only">Toggle mood</span>
    </Button>
  )
}