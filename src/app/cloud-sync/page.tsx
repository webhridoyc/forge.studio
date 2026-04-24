
"use client"

import * as React from "react"
import { 
  Code2, 
  Cloud, 
  ShieldCheck, 
  RefreshCw, 
  Smartphone, 
  Laptop, 
  Trash2, 
  Copy, 
  Check, 
  ExternalLink,
  History,
  Zap,
  Info
} from "lucide-react"
import { AuthUI } from "@/components/AuthModal"
import { useUser, useFirestore, useMemoFirebase, useCollection } from "@/firebase"
import { collection, query, orderBy, deleteDoc, doc } from "firebase/firestore"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function CloudSyncPage() {
  const { toast } = useToast()
  const { user, isUserLoading } = useUser()
  const db = useFirestore()
  const [copiedId, setCopiedId] = React.useState<string | null>(null)
  const [isAuthOpen, setIsAuthOpen] = React.useState(false)

  const snippetsQuery = useMemoFirebase(() => {
    if (!db || !user) return null
    return query(
      collection(db, 'users', user.uid, 'conversionSnippets'),
      orderBy('createdAt', 'desc')
    )
  }, [db, user])

  const { data: snippets, isLoading: isDataLoading } = useCollection(snippetsQuery)

  const handleCopy = (id: string, base64: string) => {
    navigator.clipboard.writeText(base64)
    setCopiedId(id)
    toast({
      title: "Snippet Restored",
      description: "Data URI copied from cloud vault.",
    })
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDelete = async (id: string) => {
    if (!user || !db) return
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'conversionSnippets', id))
      toast({
        title: "Vault Purged",
        description: "Asset removed from your cloud history.",
      })
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Delete Failed",
        description: "Could not sync deletion to cloud.",
      })
    }
  }

  const formatSyncTime = (timestamp: any) => {
    if (!timestamp || !timestamp.toDate) return 'Syncing...'
    return new Date(timestamp.toDate()).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-secondary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-primary/5 blur-[150px] rounded-full" />
      </div>

      <header className={cn(
        "fixed top-0 left-0 right-0 z-[100] w-full border-b border-white/10 bg-background/40 backdrop-blur-2xl px-4 md:px-12 h-20 flex items-center justify-between shadow-sm transition-all",
        isAuthOpen && "hidden"
      )}>
        <Link href="/" className="flex items-center gap-2 md:gap-3 group">
          <div className="bg-gradient-to-br from-primary to-secondary p-1.5 md:p-2 rounded-xl shadow-lg group-hover:scale-110 transition-all">
            <Code2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tighter">FORGE.</span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mr-6">
            <a href="/docs" className="hover:text-foreground transition-colors">Documentation</a>
            <a href="/performance" className="hover:text-foreground transition-colors">Performance</a>
            <a href="/api-reference" className="hover:text-foreground transition-colors">API</a>
          </nav>
          <AuthUI onOpenChange={setIsAuthOpen} />
        </div>
      </header>

      <main className="container mx-auto px-4 pt-32 pb-32 relative z-10 max-w-6xl">
        {user ? (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-foreground/5 pb-12">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
                  Live Sync Active
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none uppercase">Member <br /><span className="text-gradient">Vault Dashboard</span></h1>
                <p className="text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed">
                  Managing {snippets?.length || 0} secure cloud-synced assets across your professional ecosystem.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="bg-foreground/5 px-6 py-4 rounded-3xl border border-foreground/5 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Vault Capacity</p>
                  <p className="text-2xl font-black tracking-tighter">{snippets?.length || 0} / 50</p>
                </div>
              </div>
            </div>

            {isDataLoading ? (
              <div className="py-32 flex flex-col items-center gap-4 opacity-50">
                <RefreshCw className="w-8 h-8 animate-spin text-primary" />
                <p className="text-[10px] font-black uppercase tracking-widest">Reconciling Database...</p>
              </div>
            ) : snippets && snippets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {snippets.map((snippet) => (
                  <div key={snippet.id} className="glass-card group rounded-[2.5rem] border-white/10 overflow-hidden flex flex-col hover:translate-y-[-4px] transition-all duration-300">
                    <div className="p-6 md:p-8 space-y-6 flex-1">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <span className="px-2 py-0.5 rounded-md bg-secondary/10 text-secondary text-[9px] font-black uppercase tracking-widest border border-secondary/20">
                            {snippet.mimeType?.split('/')[1] || 'asset'}
                          </span>
                          <h4 className="font-black text-lg tracking-tight truncate max-w-[180px]">{snippet.fileName}</h4>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                          <Cloud className="w-5 h-5 text-primary" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-foreground/[0.03] p-3 rounded-2xl">
                          <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-1">MIME TYPE</p>
                          <p className="text-[11px] font-bold truncate">{snippet.mimeType || 'unknown'}</p>
                        </div>
                        <div className="bg-foreground/[0.03] p-3 rounded-2xl">
                          <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-1">SYNCED AT</p>
                          <p className="text-[11px] font-bold">{formatSyncTime(snippet.createdAt)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-foreground/5 border-t border-foreground/5 flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        onClick={() => handleCopy(snippet.id, snippet.base64String)}
                        className="flex-1 rounded-2xl h-12 bg-background border border-foreground/10 hover:bg-primary hover:text-white transition-all font-black text-[10px] uppercase tracking-widest"
                      >
                        {copiedId === snippet.id ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                        Copy URI
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(snippet.id)}
                        className="rounded-2xl h-12 w-12 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-32 flex flex-col items-center justify-center text-center space-y-8 glass-card rounded-[3rem] border-dashed border-2 border-foreground/10 bg-transparent">
                <div className="w-20 h-20 rounded-full bg-foreground/5 flex items-center justify-center">
                  <History className="w-10 h-10 text-muted-foreground/30" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black tracking-tight">VAULT IS EMPTY</h3>
                  <p className="text-muted-foreground font-medium max-w-xs">Forge or Decode an asset and "Vault to Cloud" to begin your developer history.</p>
                </div>
                <Button asChild className="rounded-2xl h-12 px-8 font-black uppercase tracking-widest text-[10px]">
                  <Link href="/">Open Workbench</Link>
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-4xl mx-auto">
            <div className="space-y-4 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-black uppercase tracking-widest mx-auto">
                <Cloud className="w-3.5 h-3.5" />
                Cloud Sync Hub
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none uppercase">Cross-Device <br /><span className="text-gradient">Synchronization</span></h1>
              <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
                Your forged assets, available everywhere. Establish your Member Vault to unlock real-time history synchronization across your entire developer ecosystem.
              </p>
              <div className="pt-6">
                 <AuthUI />
              </div>
            </div>

            <div className="grid gap-8">
              <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 space-y-6">
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  Technical Architecture
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed font-medium">
                  <p>Forge Studios utilizes a real-time <strong>Database Reconciliation</strong> engine. When you vault an asset, we perform an optimistic UI update—saving locally first while asynchronously broadcasting the metadata to your private Firestore vault.</p>
                  <div className="grid md:grid-cols-3 gap-6 pt-4">
                    {[
                      { icon: Laptop, title: "Workstation", desc: "Native desk desktop" },
                      { icon: RefreshCw, title: "Reconciliation", desc: "Conflict resolution" },
                      { icon: Smartphone, title: "Mobile", desc: "Instant retrieval" }
                    ].map((item, i) => (
                      <div key={i} className="bg-foreground/5 p-6 rounded-2xl border border-foreground/5 text-center space-y-3">
                        <item.icon className="w-6 h-6 mx-auto text-secondary" />
                        <h3 className="text-[10px] font-black uppercase tracking-widest">{item.title}</h3>
                        <p className="text-[9px] text-muted-foreground font-bold leading-tight">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 space-y-6">
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                  <Zap className="w-6 h-6 text-accent" />
                  Optimization Strategy
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed font-medium">
                  <div className="flex gap-4 items-start p-6 bg-accent/5 rounded-3xl border border-accent/10">
                    <Info className="w-6 h-6 text-accent shrink-0" />
                    <p className="text-sm">To maintain extreme performance, Forge utilizes <strong>Delta Syncing</strong>. We sync primary bitstreams and metadata separately to ensure your UI thread remains unblocked (120Hz performance).</p>
                  </div>
                  <ul className="space-y-3 pt-2">
                    <li className="flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
                      <span><strong>State Detection:</strong> Real-time monitoring of local vs. cloud state.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
                      <span><strong>Optimistic Updates:</strong> Instant visual feedback before server confirmation.</span>
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        )}
      </main>

      <footer className="w-full py-12 px-8 border-t border-foreground/5 bg-background/80 backdrop-blur-3xl">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">© 2026 FORGE STUDIOS. SYNCED GLOBALLY.</p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <Link href="/cloud-sync" className="text-primary">Sync</Link>
            <Link href="/usage-specs" className="hover:text-foreground">Specs</Link>
            <Link href="/contact" className="hover:text-foreground">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
