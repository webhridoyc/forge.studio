import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
});

const baseUrl = 'https://base64-forge.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Free Base64 Converter & Image Encoder | Forge Studios',
    template: '%s | Forge Studios',
  },
  description: 'Free online Base64 converter and image encoder. Convert PNG, JPEG, WebP, SVG to Base64 Data URI instantly. Fast Base64 decoder, CSS/HTML image encoder, and lossless asset pipeline for developers.',
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
    'Base64 string generator',
  ],
  authors: [{ name: 'Forge Studios' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Free Base64 Converter & Image Encoder | Forge Studios',
    description: 'Convert PNG, JPEG, WebP and SVG images to Base64 Data URIs instantly. Fast, free, and lossless — the developer-grade Base64 encoder and decoder.',
    url: baseUrl,
    siteName: 'Forge Studios',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Forge Studios — Free Base64 Converter & Image Encoder',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Base64 Converter & Image Encoder | Forge Studios',
    description: 'Convert PNG, JPEG, WebP and SVG to Base64 Data URIs. Fast, free online Base64 encoder and decoder for developers.',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Forge Studios — Free Base64 Converter",
    "url": baseUrl,
    "operatingSystem": "Web",
    "applicationCategory": "DeveloperApplication",
    "description": "Free online Base64 converter and image encoder. Convert PNG, JPEG, WebP, SVG to Base64 Data URI strings and decode Base64 back to images instantly. Fast, lossless, and private.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Base64 Encoding — PNG to Base64, JPEG to Base64, WebP to Base64, SVG to Base64",
      "Base64 Decoding — restore Base64 strings back to original images",
      "Data URI Generator — ready-to-use CSS and HTML image encoder output",
      "Lossless Base64 conversion with image optimization",
      "Cloud Sync History for registered members",
      "Multi-Format Support: WebP, PNG, JPG, SVG, GIF"
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the 33% overhead rule for Base64?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Base64 encoding increases file size by approximately 33% because it uses 4 characters to represent every 3 bytes of binary data. We recommend using Forge only for assets under 10KB (like icons or logos) where the elimination of an HTTP request outweighs the size increase."
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
        "name": "Is batch Base64 conversion limited?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, but browser memory is. We recommend processing batches of 10–20 assets at a time to maintain UI smoothness (120Hz performance). The Base64 string generator supports PNG, JPEG, WebP, SVG, and GIF in a single batch."
        }
      },
      {
        "@type": "Question",
        "name": "How does Base64 encoding impact SEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "By reducing HTTP requests, your page's First Contentful Paint (FCP) can improve, which is a key Core Web Vital for Google ranking. However, overusing large Base64 strings can bloat your HTML and delay overall parsing."
        }
      }
    ]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Forge Studios",
    "url": baseUrl,
    "description": "Free online Base64 converter, image encoder, and Data URI generator for developers.",
  };

  return (
    <html lang="en" className={`light ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${inter.className} font-body antialiased`}>
        <FirebaseClientProvider>
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
