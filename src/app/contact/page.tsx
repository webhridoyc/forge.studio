
"use client"

import * as React from "react"
import { Code2, MessageCircle, Mail, Github, Twitter, Linkedin, ArrowRight } from "lucide-react"
import { AuthUI } from "@/components/AuthModal"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ForgeLogo } from "@/components/ForgeLogo"

export default function ContactPage() {
  const [isAuthOpen, setIsAuthOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-primary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-accent/5 blur-[150px] rounded-full" />
      </div>

      <header className={cn(
        "fixed top-0 left-0 right-0 z-[100] w-full border-b border-white/10 bg-background/40 backdrop-blur-2xl px-4 md:px-12 h-20 flex items-center justify-between shadow-sm transition-all",
        isAuthOpen && "hidden"
      )}>
        <a href="/" className="focus:outline-none">
          <ForgeLogo />
        </a>
        <div className="flex items-center gap-4">
          <nav className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mr-6">
            <a href="/docs" className="hover:text-foreground transition-colors">Documentation</a>
            <a href="/performance" className="hover:text-foreground transition-colors">Performance</a>
            <a href="/api-reference" className="hover:text-foreground transition-colors">API</a>
          </nav>
          <AuthUI onOpenChange={setIsAuthOpen} />
        </div>
      </header>

      <main className="container mx-auto px-4 pt-32 pb-32 relative z-10 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                <MessageCircle className="w-3.5 h-3.5" />
                Support Portal
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">CONTACT <br /><span className="text-gradient">STUDIOS</span></h1>
              <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                Need technical assistance or want to integrate the Forge engine into your pipeline? Our team is ready to help.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Mail, label: "Technical Support", value: "support@forge.studio", href: "mailto:support@forge.studio" },
                { icon: Github, label: "Open Source", value: "github.com/webhridoyc/forge.studio", href: "https://github.com/webhridoyc/forge.studio" },
                { icon: Twitter, label: "Updates", value: "@ForgeSynthesis", href: "#" }
              ].map((item, i) => (
                <a key={i} href={item.href} className="flex items-center gap-4 group cursor-pointer" target={item.icon === Github ? "_blank" : undefined} rel={item.icon === Github ? "noopener noreferrer" : undefined}>
                  <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.label}</p>
                    <p className="font-bold text-foreground">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10">
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-2">Full Name</label>
                <Input placeholder="Developer Name" className="rounded-2xl h-14 bg-foreground/5 border-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-2">Email Address</label>
                <Input placeholder="architect@studio.com" className="rounded-2xl h-14 bg-foreground/5 border-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest ml-2">Your Inquiry</label>
                <Textarea placeholder="How can we assist your pipeline?" className="rounded-2xl min-h-[150px] bg-foreground/5 border-none" />
              </div>
              <Button className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-xl group">
                Send Transmission <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </main>

      <footer className="w-full py-12 px-8 border-t border-foreground/5 bg-background/80 backdrop-blur-3xl">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">© 2024 FORGE STUDIOS. READY FOR TRANSMISSION.</p>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            <a href="/cloud-sync" className="hover:text-foreground">Sync</a>
            <a href="/usage-specs" className="hover:text-foreground">Specs</a>
            <a href="/contact" className="text-primary">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
