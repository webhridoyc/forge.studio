"use client"

import * as React from "react"
import { useAuth, useUser } from "@/firebase"
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { LogOut, User as UserIcon, LogIn, Chrome, Moon, Sun } from "lucide-react"

export function AuthUI() {
  const auth = useAuth()
  const { user, isUserLoading } = useUser()
  const [isOpen, setIsOpen] = React.useState(false)
  const [theme, setTheme] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    const root = window.document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
      root.classList.remove("light")
    } else {
      root.classList.add("light")
      root.classList.remove("dark")
    }
  }, [theme])

  const toggleTheme = () => setTheme(prev => prev === "light" ? "dark" : "light")

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      setIsOpen(false)
    } catch (error) {
      console.error("Login failed", error)
    }
  }

  const handleSignOut = () => signOut(auth)

  if (isUserLoading) return <div className="w-10 h-10 rounded-full bg-foreground/5 animate-pulse" />

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-12 w-12 rounded-full ring-2 ring-primary/20 ring-offset-2 hover:ring-primary transition-all p-0">
            <Avatar className="h-full w-full">
              <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
              <AvatarFallback className="bg-primary text-white font-black">
                {user.displayName?.charAt(0) || <UserIcon className="w-4 h-4" />}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-2 rounded-2xl glass-card" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-black leading-none tracking-tight">{user.displayName}</p>
              <p className="text-xs leading-none text-muted-foreground font-medium">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-foreground/5" />
          
          <DropdownMenuItem onClick={toggleTheme} className="rounded-xl cursor-pointer py-3 transition-colors">
            {theme === 'light' ? <Moon className="mr-3 h-4 w-4" /> : <Sun className="mr-3 h-4 w-4" />}
            <span className="font-bold text-xs uppercase tracking-widest">
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="bg-foreground/5" />
          
          <DropdownMenuItem onClick={handleSignOut} className="rounded-xl focus:bg-destructive/10 focus:text-destructive cursor-pointer py-3 transition-colors">
            <LogOut className="mr-3 h-4 w-4" />
            <span className="font-bold text-xs uppercase tracking-widest">Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-2xl h-12 px-8 bg-foreground text-background hover:scale-105 transition-all font-black text-[10px] uppercase tracking-widest">
          <LogIn className="w-4 h-4 mr-2" /> Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] rounded-[3rem] p-12 glass-card border-white/10">
        <DialogHeader className="space-y-6 text-center">
          <div className="mx-auto w-16 h-16 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl rotate-3">
            <UserIcon className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-4xl font-black tracking-tighter">JOIN THE FORGE</DialogTitle>
          <p className="text-muted-foreground text-sm font-medium leading-relaxed">
            Unlock 10 daily conversions, save your asset history to the cloud, and batch process like a pro.
          </p>
        </DialogHeader>
        <div className="space-y-4 pt-8">
          <Button 
            onClick={handleGoogleLogin} 
            variant="outline" 
            className="w-full h-16 rounded-3xl border-foreground/10 hover:bg-foreground hover:text-background transition-all font-bold text-sm"
          >
            <Chrome className="w-5 h-5 mr-3" /> Continue with Google
          </Button>
          <p className="text-[9px] text-center text-muted-foreground uppercase tracking-[0.2em] font-black pt-4">
            Secured by Firebase Analytics
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
