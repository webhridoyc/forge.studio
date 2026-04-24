"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"

export function SEOIntro() {
  return (
    <section className="w-full max-w-5xl mx-auto py-16 md:py-24 px-4">
      <div className="space-y-6 text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground uppercase">PROFESSIONAL WORKFLOW</h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium px-2">
          Forge Studios isn't just a converter; it's a performance-first utility designed to streamline modern asset delivery pipelines. 
          By synthesizing binary data into optimized code, we eliminate HTTP overhead for critical path assets.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mt-12">
        <div className="glass-card p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border border-foreground/5 flex flex-col h-full">
          <h3 className="text-xl md:text-2xl font-black mb-6 tracking-tight">How to use Base64</h3>
          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed flex-1">
            <div className="space-y-2">
              <p className="font-bold text-foreground">1. HTML Implementation</p>
              <code className="block p-4 bg-foreground/5 rounded-xl font-code text-[10px] md:text-xs overflow-x-auto whitespace-pre-wrap break-all">
                &lt;img src="data:image/png;base64,..." /&gt;
              </code>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-foreground">2. CSS Implementation</p>
              <code className="block p-4 bg-foreground/5 rounded-xl font-code text-[10px] md:text-xs overflow-x-auto whitespace-pre-wrap break-all">
                background-image: url("data:image/png;base64,...");
              </code>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border border-foreground/5 flex flex-col h-full overflow-hidden">
          <h3 className="text-xl md:text-2xl font-black mb-6 tracking-tight">Performance Comparison</h3>
          <div className="overflow-x-auto -mx-2 px-2 scrollbar-hide">
            <Table className="min-w-[300px]">
              <TableHeader>
                <TableRow className="hover:bg-transparent border-foreground/5">
                  <TableHead className="font-bold text-foreground/80">Feature</TableHead>
                  <TableHead className="font-bold text-foreground/80">URL Method</TableHead>
                  <TableHead className="font-bold text-foreground/80">Base64 Forge</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-foreground/5">
                  <TableCell className="font-medium text-foreground/70">HTTP Requests</TableCell>
                  <TableCell>1 Request</TableCell>
                  <TableCell className="text-primary font-bold">0 Requests</TableCell>
                </TableRow>
                <TableRow className="border-foreground/5">
                  <TableCell className="font-medium text-foreground/70">File Size</TableCell>
                  <TableCell>100%</TableCell>
                  <TableCell className="text-accent font-bold">~133%</TableCell>
                </TableRow>
                <TableRow className="border-none">
                  <TableCell className="font-medium text-foreground/70">Cacheability</TableCell>
                  <TableCell>Individual</TableCell>
                  <TableCell>Linked</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  )
}

export function FAQSection() {
  const faqs = [
    {
      q: "What is the 33% overhead rule?",
      a: "Base64 encoding increases file size by approximately 33% because it uses 4 characters to represent every 3 bytes of binary data. We recommend using Forge only for assets under 10KB (like icons or logos) where the elimination of an HTTP request outweighs the size increase."
    },
    {
      q: "When should I convert PNG to WebP Base64?",
      a: "Always, if your target environment supports modern browsers. WebP Base64 strings are significantly shorter than PNG Base64 strings, often offsetting the 33% encoding overhead entirely."
    },
    {
      q: "Is batch processing limited?",
      a: "No, but browser memory is. We recommend processing batches of 10-20 assets at a time to maintain UI smoothness (120Hz performance)."
    },
    {
      q: "How does this tool impact SEO?",
      a: "By reducing HTTP requests, your page's First Contentful Paint (FCP) can improve, which is a key Core Web Vital for Google ranking. However, overusing large Base64 strings can bloat your HTML and delay overall parsing."
    }
  ]

  return (
    <section className="w-full max-w-4xl mx-auto py-16 md:py-24 px-4 border-t border-foreground/5">
      <h2 className="text-2xl md:text-3xl font-black text-center mb-10 md:mb-12 tracking-tighter uppercase">TECHNICAL ADVISORY</h2>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, idx) => (
          <AccordionItem 
            key={idx} 
            value={`item-${idx}`} 
            className="border-2 border-foreground/5 rounded-[1.5rem] md:rounded-[2rem] px-5 md:px-8 bg-foreground/[0.02] overflow-hidden transition-all duration-300 data-[state=open]:bg-foreground/[0.04] data-[state=open]:border-primary/20"
          >
            <AccordionTrigger className="text-left font-bold hover:no-underline py-6 md:py-8 text-base md:text-lg tracking-tight transition-colors hover:text-primary">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6 md:pb-8 leading-relaxed font-medium text-sm md:text-base">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
