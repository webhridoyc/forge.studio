"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function SEOIntro() {
  return (
    <section className="w-full max-w-4xl mx-auto py-16 px-4">
      <div className="space-y-6 text-center">
        <h2 className="text-3xl font-headline font-bold text-foreground">Why use Base64 Forge?</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Base64 Forge is a professional-grade image conversion tool designed for developers and designers who need 
          reliable, fast, and secure assets. By encoding small images directly into your code, you can eliminate 
          unnecessary HTTP requests and improve your website's performance.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {[
          {
            title: "Client-Side Privacy",
            desc: "Your images never leave your browser. All processing is done locally using the FileReader API."
          },
          {
            title: "Performance First",
            desc: "Instantly generate snippets for HTML, CSS, and Data URIs with zero server latency."
          },
          {
            title: "Modern Formats",
            desc: "Supports SVG, PNG, JPG, and WEBP for seamless integration into any modern web project."
          }
        ].map((item, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors">
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function FAQSection() {
  const faqs = [
    {
      q: "What is Base64 encoding?",
      a: "Base64 is an encoding scheme that converts binary data (like images) into a text format (specifically ASCII strings). This allows binary files to be embedded directly into text-based files like HTML, CSS, or JSON."
    },
    {
      q: "When should I use Base64 images?",
      a: "It's best for small assets like icons, logos, or tiny decorative elements (usually under 5-10KB). Using Base64 for large images is generally discouraged because it increases the file size by about 33% compared to binary."
    },
    {
      q: "Is it secure to upload my images here?",
      a: "Absolutely. Base64 Forge processes everything entirely within your web browser. No data is sent to our servers, ensuring your privacy and the security of your creative assets."
    },
    {
      q: "How does this tool help SEO?",
      a: "By reducing HTTP requests, your page load speed can improve, which is a positive signal for search engines like Google. However, balance this with the slightly larger file size of the encoded string."
    }
  ]

  return (
    <section className="w-full max-w-4xl mx-auto py-16 px-4 border-t border-border/50">
      <h2 className="text-3xl font-headline font-bold text-center mb-12">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`} className="border-2 border-border/50 rounded-2xl px-6 bg-card overflow-hidden">
            <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-6">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}