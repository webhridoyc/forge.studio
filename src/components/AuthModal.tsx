"use client"

import * as React from "react"
import { useAuth, useUser } from "@/firebase"
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  LogOut, 
  User as UserIcon, 
  LogIn, 
  Chrome, 
  Moon, 
  Sun, 
  Mail, 
  Lock,
  LayoutDashboard,
  ShieldCheck,
  History
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface AuthUIProps {
  onOpenChange?: (open: boolean) => void
}

export function AuthUI({ onOpenChange }: AuthUIProps) {
  const auth = useAuth()
  const { toast } = useToast()
  const { user, isUserLoading } = useUser()
  const [isOpen, setIsOpen] = React.useState(false)
  const [theme, setTheme] = React.useState<"light" | "dark">("light")
  const [isSignUp, setIsSignUp] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

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

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    onOpenChange?.(open)
  }

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      handleOpenChange(false)
      toast({ title: "Welcome back!", description: "Successfully signed in with Google." })
    } catch (error: any) {
      toast({ variant: "destructive", title: "Auth Error", description: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return

    setIsLoading(true)
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password)
        toast({ title: "Account Created", description: "Welcome to the Forge." })
      } else {
        await signInWithEmailAndPassword(auth, email, password)
        toast({ title: "Welcome back!", description: "Signed in successfully." })
      }
      handleOpenChange(false)
    } catch (error: any) {
      toast({ variant: "destructive", title: "Auth Error", description: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = () => {
    signOut(auth)
    toast({ title: "Signed Out", description: "Come back soon!" })
  }

  if (isUserLoading) return <div className="w-10 h-10 rounded-full bg-foreground/5 animate-pulse" />

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-12 w-12 rounded-full ring-2 ring-primary/20 ring-offset-2 hover:ring-primary hover:scale-105 transition-all p-0 overflow-hidden shadow-lg">
            <Avatar className="h-full w-full">
              <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
              <AvatarFallback className="bg-primary text-white font-black text-xs">
                {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase() || <UserIcon className="w-4 h-4" />}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72 p-2 rounded-[2rem] glass-card border-white/10 shadow-2xl animate-in fade-in zoom-in-95 duration-300" align="end" forceMount>
          <DropdownMenuLabel className="font-normal px-4 py-4">
            <div className="flex flex-col space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-black leading-none tracking-tight text-foreground">{user.displayName || "Forge Member"}</p>
                <div className="bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20 flex items-center gap-1">
                  <ShieldCheck className="w-2.5 h-2.5 text-primary" />
                  <span className="text-[8px] font-black uppercase text-primary tracking-widest">PRO</span>
                </div>
              </div>
              <p className="text-xs leading-none text-muted-foreground font-medium pt-1">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-foreground/5 mx-2" />
          
          <div className="p-1 space-y-1">
            <DropdownMenuItem onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="rounded-xl cursor-pointer py-3 px-4 transition-colors hover:bg-foreground/5">
              <LayoutDashboard className="mr-3 h-4 w-4 text-muted-foreground" />
              <span className="font-bold text-[10px] uppercase tracking-widest">My Workbench</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="rounded-xl cursor-pointer py-3 px-4 transition-colors hover:bg-foreground/5">
              <History className="mr-3 h-4 w-4 text-muted-foreground" />
              <span className="font-bold text-[10px] uppercase tracking-widest">Cloud Vaults</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={toggleTheme} className="rounded-xl cursor-pointer py-3 px-4 transition-colors hover:bg-foreground/5">
              {theme === 'light' ? <Moon className="mr-3 h-4 w-4 text-muted-foreground" /> : <Sun className="mr-3 h-4 w-4 text-muted-foreground" />}
              <span className="font-bold text-[10px] uppercase tracking-widest">
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </span>
            </DropdownMenuItem>
          </div>
          
          <DropdownMenuSeparator className="bg-foreground/5 mx-2" />
          
          <div className="p-1">
            <DropdownMenuItem onClick={handleSignOut} className="rounded-xl focus:bg-destructive/10 focus:text-destructive cursor-pointer py-3 px-4 transition-colors">
              <LogOut className="mr-3 h-4 w-4" />
              <span className="font-bold text-[10px] uppercase tracking-widest">Sign Out</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="rounded-2xl h-12 px-6 md:px-8 bg-foreground text-background hover:scale-105 transition-all font-black text-[10px] uppercase tracking-widest shadow-xl">
          <LogIn className="w-4 h-4 mr-2 hidden sm:inline" /> Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[450px] rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-12 border-none bg-white dark:bg-zinc-950 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] overflow-y-auto max-h-[90vh]">
        <DialogHeader className="space-y-6 text-center">
          <div className="mx-auto w-16 h-16 md:w-20 md:h-20 rounded-[2rem] bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-2xl rotate-3 transform hover:rotate-0 transition-transform duration-500">
            <UserIcon className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
          <div className="space-y-2">
            <DialogTitle className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-zinc-900 dark:text-zinc-100">
              {isSignUp ? "Join Forge" : "Welcome"}
            </DialogTitle>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm font-medium leading-relaxed max-w-[280px] mx-auto">
              {isSignUp 
                ? "Secure your assets in the cloud and access them from any device."
                : "Enter the studio to sync your conversion history globally."}
            </p>
          </div>
        </DialogHeader>

        <form onSubmit={handleEmailAuth} className="space-y-5 pt-8">
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-400 dark:text-zinc-500 ml-2">
              Email Address
            </Label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-primary transition-colors" />
              <Input 
                type="email" 
                placeholder="architect@forge.studio" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-2xl h-14 md:h-16 pl-14 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus:ring-primary focus:border-primary text-zinc-900 dark:text-zinc-100 text-sm shadow-sm transition-all"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-400 dark:text-zinc-500 ml-2">
              Secure Password
            </Label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-primary transition-colors" />
              <Input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-2xl h-14 md:h-16 pl-14 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus:ring-primary focus:border-primary text-zinc-900 dark:text-zinc-100 text-sm shadow-sm transition-all"
              />
            </div>
          </div>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-14 md:h-16 rounded-2xl bg-foreground text-background hover:bg-primary hover:text-white font-black text-[11px] uppercase tracking-widest shadow-xl active:scale-95 transition-all mt-4"
          >
            {isLoading ? "Synthesizing..." : (isSignUp ? "Establish Account" : "Access Studio")}
          </Button>
        </form>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-zinc-100 dark:border-zinc-800" /></div>
          <div className="relative flex justify-center text-[9px] uppercase tracking-[0.4em] font-black">
            <span className="bg-white dark:bg-zinc-950 px-6 text-zinc-300">OR</span>
          </div>
        </div>

        <div className="space-y-5">
          <Button 
            onClick={handleGoogleLogin} 
            variant="outline" 
            disabled={isLoading}
            className="w-full h-14 md:h-16 rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-transparent hover:bg-zinc-50 dark:hover:bg-white/5 transition-all font-bold text-xs text-zinc-900 dark:text-zinc-100 shadow-sm"
          >
            <Chrome className="w-5 h-5 mr-3 text-primary" /> Continue with Google
          </Button>
          
          <button 
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] hover:text-primary transition-colors"
          >
            {isSignUp ? "Already a member? Sign in" : "New architect? Create account"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
