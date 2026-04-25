import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const baseUrl = 'https://forge.studio';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Free Base64 Converter & Image Encoder | Forge Studios',
    template: '%s | Forge Studios',
  },
  description: 'Professional-grade Base64 converter and image synthesis studio. Convert PNG, JPEG, WebP, and SVG to Base64 strings or Data URIs instantly. Optimized for high-performance developer workflows and lossless encoding.',
  keywords: [
    'Base64 converter',
    'Image to Base64',
    'Data URI generator',
    'Base64 decoder',
    'Image optimization',
    'Web performance tool',
    'Forge Studios',
    'Bitstream synthesis',
    'Developer utility',
    'Asset pipeline',
    'Online Base64 tool',
    'Fast Base64 converter',
    'Lossless Base64',
    'WebP to Base64',
    'PNG to Base64',
    'JPEG to Base64',
    'SVG to Base64',
    'CSS image encoder',
    'HTML image encoder',
    'Base64 string generator'
  ],
  authors: [{ name: 'Forge Studios' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'FORGE. | Professional Image Encoder & Base64 Studio',
    description: 'Industrial-grade Base64 encoding and decoding for modern developers. Optimized PNG, JPEG, WebP, and SVG synthesis.',
    url: baseUrl,
    siteName: 'Forge Studios',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Forge Studios Synthesis Workbench',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FORGE. | Industrial Base64 Converter',
    description: 'High-performance Base64 encoding and decoding engine for developers.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Forge Studios",
    "url": baseUrl,
    "operatingSystem": "Web",
    "applicationCategory": "DeveloperApplication",
    "description": "Industrial-grade Base64 synthesis engine. Convert images to Base64 strings and decode back to images with zero-latency. Includes cloud-synced history for members.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Base64 Encoding",
      "Base64 Decoding",
      "Image Optimization",
      "Cloud Sync History",
      "Multi-Format Support (WebP, PNG, JPG, SVG)",
      "CSS Image Encoder",
      "HTML Image Encoder",
      "Data URI Generator"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Forge Studios",
    "url": baseUrl
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the 33% overhead rule for Base64?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Base64 encoding increases file size by approximately 33% because it uses 4 characters to represent every 3 bytes of binary data. We recommend using Forge only for assets under 10KB where the elimination of an HTTP request outweighs the size increase."
        }
      },
      {
        "@type": "Question",
        "name": "When should I convert PNG to WebP Base64?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Always, if your target environment supports modern browsers. WebP Base64 strings are significantly shorter than PNG Base64 strings, often offsetting the 33% encoding overhead entirely."
        }
      },
      {
        "@type": "Question",
        "name": "Is batch processing limited in the Forge?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, but browser memory is. We recommend processing batches of 10-20 assets at a time to maintain UI smoothness (120Hz performance)."
        }
      },
      {
        "@type": "Question",
        "name": "How does this Base64 tool impact SEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "By reducing HTTP requests, your page's First Contentful Paint (FCP) can improve. However, overusing large Base64 strings can bloat your HTML and delay overall parsing."
        }
      }
    ]
  };

  return (
    <html lang="en" className={`light ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
