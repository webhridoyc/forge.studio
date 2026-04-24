"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"
import { Sparkles } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface UsageLimitIndicatorProps {
  used: number
  limit: number
  isGuest: boolean
}

export function UsageLimitIndicator({ used, limit, isGuest }: UsageLimitIndicatorProps) {
  // Per instructions: don't show limit for guest user
  if (isGuest) return null

  const percentage = (used / limit) * 100
  const remaining = Math.max(0, limit - used)

  return (
    <div className="w-full max-w-xs space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 text-primary p-1.5 rounded-lg">
            <Sparkles className="w-3 h-3" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            Member Limit
          </span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className={`text-[10px] font-bold tabular-nums ${remaining === 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                {remaining} / {limit} Left
              </span>
            </TooltipTrigger>
            <TooltipContent className="glass-card rounded-xl text-[10px] font-bold p-3">
              Daily reset in 24h
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Progress value={percentage} className="h-1.5 bg-foreground/5" />
    </div>
  )
}
