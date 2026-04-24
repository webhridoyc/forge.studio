
"use client"

import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Image as ImageIcon, Download, Trash2, Zap, AlertCircle, Cloud } from "lucide-react"
import { downloadImageFromBase64 } from "@/lib/image-utils"
import { useToast } from "@/hooks/use-toast"
import { useUser, useFirestore, addDocumentNonBlocking } from "@/firebase"
import { collection, serverTimestamp } from "firebase/firestore"

interface DecoderToolProps {
  onDecode: () => void;
}

export function DecoderTool({ onDecode }: DecoderToolProps) {
  const { toast } = useToast()
  const { user } = useUser()
  const db = useFirestore()
  const [input, setInput] = React.useState("")
  const [preview, setPreview] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [isVaulting, setIsVaulting] = React.useState(false)

  const handleInput = (val: string) => {
    setInput(val)
    setError(null)
    
    if (!val.trim()) {
      setPreview(null)
      return
    }

    // Try to normalize input
    let cleanVal = val.trim()
    if (!cleanVal.startsWith("data:")) {
      // Basic heuristic: check if it looks like base64
      if (/^[A-Za-z0-9+/=]+$/.test(cleanVal)) {
        cleanVal = `data:image/png;base64,${cleanVal}`
      }
    }

    setPreview(cleanVal)
  }

  const handleDownload = () => {
    if (!preview) return
    
    try {
      downloadImageFromBase64(preview, `decoded-asset-${Date.now()}.png`)
      onDecode()
      toast({
        title: "Asset Restored",
        description: "Decoded image saved to disk.",
      })
    } catch (e) {
      setError("Invalid Base64 format. Synthesis failed.")
    }
  }

  const handleVaultToCloud = () => {
    if (!user || !db || !preview) {
      toast({
        title: "Auth Required",
        description: "Sign in to vault assets to your cloud sync.",
      })
      return
    }

    setIsVaulting(true)
    const snippetsRef = collection(db, 'users', user.uid, 'conversionSnippets')
    
    // Extract basic metadata for the vault
    const mimeMatch = preview.match(/^data:(image\/[a-z+]+);base64,/)
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/png'

    addDocumentNonBlocking(snippetsRef, {
      userId: user.uid,
      fileName: `restored-asset-${Date.now()}.${mimeType.split('/')[1] || 'png'}`,
      base64String: preview,
      mimeType: mimeType,
      outputFormat: 'data-uri',
      createdAt: serverTimestamp()
    });

    toast({
      title: "Reconstruction Vaulted",
      description: "Asset metadata pushed to your cloud history.",
    })
    
    setTimeout(() => setIsVaulting(false), 1000)
  }

  const clear = () => {
    setInput("")
    setPreview(null)
    setError(null)
  }

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-700">
      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground ml-2">
          Paste Base64 Payload
        </label>
        <div className="relative group">
          <Textarea
            value={input}
            onChange={(e) => handleInput(e.target.value)}
            placeholder="data:image/png;base64,..."
            className="min-h-[200px] rounded-[2rem] bg-foreground/5 border-foreground/10 focus:ring-primary p-6 text-[13px] font-code transition-all custom-scrollbar"
          />
          {input && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clear}
              className="absolute top-4 right-4 rounded-xl hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {preview && !error && (
        <div className="glass-card rounded-[3rem] p-8 md:p-12 animate-in slide-in-from-bottom-8 duration-700 border-white/10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="relative group shrink-0">
              <div className="absolute -inset-4 bg-primary/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="h-48 w-48 md:h-64 md:w-64 rounded-3xl overflow-hidden bg-foreground/5 p-2 border border-foreground/5 shadow-2xl relative z-10">
                <img 
                  src={preview} 
                  alt="Synthesis Preview" 
                  className="w-full h-full object-contain"
                  onError={() => setError("The provided string is not a valid image stream.")}
                />
              </div>
            </div>
            
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[9px] font-black uppercase tracking-widest">
                  <Zap className="w-3 h-3" />
                  Live Reconstruction
                </div>
                <h3 className="text-3xl font-black tracking-tighter">SYNTHESIS READY</h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  Payload detected and validated. You can now restore this binary asset or sync it to your member vault.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleDownload}
                  className="flex-1 h-14 rounded-2xl bg-foreground text-background hover:scale-105 transition-all font-black text-xs uppercase tracking-widest px-10 shadow-xl"
                >
                  <Download className="w-4 h-4 mr-3" /> Forge to Disk
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleVaultToCloud}
                  disabled={isVaulting}
                  className="flex-1 h-14 rounded-2xl border-foreground/10 hover:bg-primary hover:text-white transition-all font-black text-xs uppercase tracking-widest px-8"
                >
                  <Cloud className="w-4 h-4 mr-3" /> {isVaulting ? "Vaulting..." : "Vault to Cloud"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 p-6 rounded-2xl bg-destructive/5 border border-destructive/10 text-destructive animate-in shake-1 duration-500">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm font-bold tracking-tight">{error}</p>
        </div>
      )}

      {!preview && (
        <div className="py-20 flex flex-col items-center justify-center text-center space-y-6 opacity-30 select-none">
          <ImageIcon className="w-16 h-16" />
          <div className="space-y-1">
            <p className="text-sm font-black uppercase tracking-[0.3em]">Awaiting Payload</p>
            <p className="text-xs font-medium">Insert a Base64 string to begin synthesis</p>
          </div>
        </div>
      )}
    </div>
  )
}
