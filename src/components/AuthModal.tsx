
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
import { LogOut, User as UserIcon, LogIn, Chrome, Moon, Sun, Mail, Lock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function AuthUI() {
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

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      setIsOpen(false)
      toast({ title: "Welcome back!", description: "Successfully signed in with Google." })
    } catch (error: any) {
      toast({ variant: "destructive", title: "Auth Error", description: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password)
        toast({ title: "Account Created", description: "Welcome to the Forge." })
      } else {
        await signInWithEmailAndPassword(auth, email, password)
        toast({ title: "Welcome back!", description: "Signed in successfully." })
      }
      setIsOpen(false)
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
          <Button variant="ghost" className="relative h-12 w-12 rounded-full ring-2 ring-primary/20 ring-offset-2 hover:ring-primary transition-all p-0">
            <Avatar className="h-full w-full">
              <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
              <AvatarFallback className="bg-primary text-white font-black">
                {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase() || <UserIcon className="w-4 h-4" />}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-2 rounded-2xl glass-card" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-black leading-none tracking-tight">{user.displayName || "Forge Member"}</p>
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
      <DialogContent className="sm:max-w-[450px] rounded-[3rem] p-10 glass-card border-white/10">
        <DialogHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl rotate-3">
            <UserIcon className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-4xl font-black tracking-tighter uppercase">
            {isSignUp ? "Join the Forge" : "Member Login"}
          </DialogTitle>
          <p className="text-muted-foreground text-sm font-medium leading-relaxed">
            {isSignUp 
              ? "Create an account to unlock 10 daily conversions and cloud history."
              : "Welcome back! Sign in to access your saved asset history."}
          </p>
        </DialogHeader>

        <form onSubmit={handleEmailAuth} className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-widest font-black text-muted-foreground ml-1">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-2xl h-14 pl-12 bg-foreground/5 border-foreground/10 focus:ring-primary"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-widest font-black text-muted-foreground ml-1">Password</Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-2xl h-14 pl-12 bg-foreground/5 border-foreground/10 focus:ring-primary"
              />
            </div>
          </div>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-xs uppercase tracking-widest transition-all"
          >
            {isLoading ? "Processing..." : (isSignUp ? "Create Account" : "Sign In")}
          </Button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-foreground/10" /></div>
          <div className="relative flex justify-center text-[9px] uppercase tracking-[0.3em] font-black"><span className="bg-background px-4 text-muted-foreground">OR</span></div>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={handleGoogleLogin} 
            variant="outline" 
            disabled={isLoading}
            className="w-full h-14 rounded-2xl border-foreground/10 hover:bg-foreground hover:text-background transition-all font-bold text-xs"
          >
            <Chrome className="w-5 h-5 mr-3" /> Continue with Google
          </Button>
          
          <button 
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full text-[10px] font-black text-primary uppercase tracking-[0.2em] hover:underline"
          >
            {isSignUp ? "Already have an account? Log in" : "Don't have an account? Sign up"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
