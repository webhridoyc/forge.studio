"use client"

import * as React from "react"
import Link from "next/link"
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
  DialogTrigger,
  DialogDescription
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
import { Progress } from "@/components/ui/progress"
import { 
  LogOut, 
  User as UserIcon, 
  LogIn, 
  Chrome, 
  Moon, 
  Sun, 
  Mail, 
  Lock,
  ShieldCheck,
  History,
  CreditCard,
  MessageCircle,
  Zap,
  Code,
  Settings,
  ShieldAlert
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
      let message = error.message;
      if (error.code === 'auth/unauthorized-domain') {
        message = "Unauthorized Domain: Please add this workstation URL to 'Authorized Domains' in your Firebase Console.";
      } else if (error.code === 'auth/popup-closed-by-user') {
        message = "Login Interrupted: The auth window was closed before completion. Please try again.";
      }
      toast({ variant: "destructive", title: "Auth Error", description: message })
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
          <button className="relative h-12 w-12 rounded-full ring-2 ring-primary/20 ring-offset-2 hover:ring-primary hover:scale-110 transition-all outline-none group">
            <Avatar className="h-full w-full border-2 border-white/10 shadow-lg">
              <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-black text-xs">
                {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase() || <UserIcon className="w-4 h-4" />}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-background flex items-center justify-center shadow-md">
              <Zap className="w-2.5 h-2.5 text-white" />
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 p-2 rounded-[2.5rem] glass-card border-white/10 shadow-2xl animate-in fade-in zoom-in-95 duration-300 z-[200]" align="end" sideOffset={8}>
          <DropdownMenuLabel className="font-normal px-5 py-5 bg-foreground/[0.02] rounded-[2rem] mb-1">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex flex-col space-y-0.5">
                  <p className="text-[13px] font-black leading-tight tracking-tight text-foreground truncate max-w-[140px]">{user.displayName || "Forge Member"}</p>
                  <p className="text-[9px] text-muted-foreground font-bold truncate max-w-[140px]">{user.email}</p>
                </div>
                <div className="bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20 flex items-center gap-1">
                  <ShieldCheck className="w-2.5 h-2.5 text-primary" />
                  <span className="text-[8px] font-black uppercase text-primary tracking-widest">PRO</span>
                </div>
              </div>
              
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[7px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
                  <span>Forge Capacity</span>
                  <span className="text-primary font-black">Unlimited Member</span>
                </div>
                <Progress value={100} className="h-1 bg-foreground/5" />
              </div>
            </div>
          </DropdownMenuLabel>
          
          <DropdownMenuSeparator className="bg-foreground/5 mx-2" />
          
          <div className="p-1 space-y-0.5">
            <DropdownMenuItem asChild className="rounded-2xl cursor-pointer py-3 px-4 transition-colors hover:bg-foreground/5">
              <Link href="/api-reference">
                <Code className="mr-3 h-3.5 w-3.5 text-primary" />
                <span className="font-bold text-[10px] uppercase tracking-widest">API Reference</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="rounded-2xl cursor-pointer py-3 px-4 transition-colors hover:bg-foreground/5">
              <Link href="/cloud-sync">
                <History className="mr-3 h-3.5 w-3.5 text-secondary" />
                <span className="font-bold text-[10px] uppercase tracking-widest">Cloud Sync</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="rounded-2xl cursor-pointer py-3 px-4 transition-colors hover:bg-foreground/5">
              <Link href="/preferences">
                <Settings className="mr-3 h-3.5 w-3.5 text-accent" />
                <span className="font-bold text-[10px] uppercase tracking-widest">Studio Settings</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="rounded-2xl cursor-pointer py-3 px-4 transition-colors hover:bg-foreground/5">
              <Link href="/billing">
                <CreditCard className="mr-3 h-3.5 w-3.5 text-primary" />
                <span className="font-bold text-[10px] uppercase tracking-widest">Pricing & Plans</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="rounded-2xl cursor-pointer py-3 px-4 transition-colors hover:bg-foreground/5">
              <Link href="/contact">
                <MessageCircle className="mr-3 h-3.5 w-3.5 text-secondary" />
                <span className="font-bold text-[10px] uppercase tracking-widest">Contact Support</span>
              </Link>
            </DropdownMenuItem>
          </div>
          
          <DropdownMenuSeparator className="bg-foreground/5 mx-2" />
          
          <div className="p-1.5 flex items-center justify-between gap-2">
            <Button variant="ghost" onClick={toggleTheme} className="flex-1 rounded-2xl h-11 hover:bg-foreground/5">
              {theme === 'light' ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
            </Button>
            <Button onClick={handleSignOut} variant="ghost" className="flex-1 rounded-2xl h-11 hover:bg-destructive/10 text-destructive">
              <LogOut className="mr-2 h-3.5 w-3.5" />
              <span className="font-bold text-[9px] uppercase tracking-widest">Logout</span>
            </Button>
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
      <DialogContent className="w-[90vw] max-w-[440px] rounded-[3rem] md:rounded-[4rem] p-0 border-none bg-white dark:bg-zinc-950 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25)] overflow-hidden z-[200]">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[80px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 blur-[80px] rounded-full" />
        </div>

        <div className="relative z-10 p-6 md:p-10 space-y-8">
          <DialogHeader className="space-y-4 text-center">
            <div className="mx-auto w-16 h-16 md:w-20 md:h-20 rounded-[2rem] bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-2xl rotate-6 transform hover:rotate-0 transition-all duration-700 p-0.5">
              <div className="w-full h-full bg-white dark:bg-zinc-950 rounded-[1.8rem] flex items-center justify-center">
                <LogIn className="w-6 h-6 md:w-8 md:h-8 text-primary animate-pulse" />
              </div>
            </div>
            <div className="space-y-2">
              <DialogTitle className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-zinc-900 dark:text-zinc-100">
                {isSignUp ? "Forge Your Vault" : "Studio Access"}
              </DialogTitle>
              <DialogDescription className="text-zinc-500 dark:text-zinc-400 text-[11px] md:text-xs font-medium leading-relaxed max-w-[280px] mx-auto">
                {isSignUp 
                  ? "Architect your professional pipeline. Secure your assets in the cloud for cross-device synthesis."
                  : "Welcome back to the forge. Synchronize your conversion history across your developer ecosystem."}
              </DialogDescription>
            </div>
          </DialogHeader>

          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[9px] uppercase tracking-[0.4em] font-black text-zinc-400 dark:text-zinc-500 ml-3">
                Member Email
              </Label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-primary transition-colors" />
                <Input 
                  type="email" 
                  placeholder="architect@forge.studio" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-3xl h-14 md:h-16 pl-14 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800 focus:ring-2 focus:ring-primary/20 focus:border-primary text-zinc-900 dark:text-zinc-100 text-sm shadow-inner transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[9px] uppercase tracking-[0.4em] font-black text-zinc-400 dark:text-zinc-500 ml-3">
                Secure Credentials
              </Label>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-300 group-focus-within:text-primary transition-colors" />
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-3xl h-14 md:h-16 pl-14 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800 focus:ring-2 focus:ring-primary/20 focus:border-primary text-zinc-900 dark:text-zinc-100 text-sm shadow-inner transition-all"
                />
              </div>
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-14 md:h-16 rounded-3xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-primary hover:text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all mt-2"
            >
              {isLoading ? "Synthesizing..." : (isSignUp ? "Establish Vault" : "Authorize Access")}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-zinc-100 dark:border-zinc-800" /></div>
            <div className="relative flex justify-center text-[8px] uppercase tracking-[0.4em] font-black">
              <span className="bg-white dark:bg-zinc-950 px-6 text-zinc-400">Collaborative Logic</span>
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={handleGoogleLogin} 
              variant="outline" 
              disabled={isLoading}
              className="w-full h-14 md:h-16 rounded-3xl border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/30 hover:bg-zinc-50 dark:hover:bg-white/5 transition-all font-black text-[9px] uppercase tracking-widest text-zinc-900 dark:text-zinc-100 shadow-sm"
            >
              <Chrome className="w-4 h-4 mr-3 text-primary" /> Continue with Google
            </Button>
            
            <div className="flex flex-col items-center gap-2 pt-2">
              <button 
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] hover:text-primary transition-colors"
              >
                {isSignUp ? "Already a member? Sign in" : "New architect? Create account"}
              </button>
              
              <div className="flex items-center gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 w-full justify-center">
                <Link href="/privacy" className="flex items-center gap-1.5 text-[8px] font-bold text-zinc-400 hover:text-primary transition-colors uppercase tracking-widest">
                  <ShieldAlert className="w-2.5 h-2.5" /> Privacy Policy
                </Link>
                <div className="w-0.5 h-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                <Link href="/docs" className="text-[8px] font-bold text-zinc-400 hover:text-primary transition-colors uppercase tracking-widest">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
