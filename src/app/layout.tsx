import type {Metadata} from 'next';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';

const baseUrl = 'https://base64-forge.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'FORGE. | Industrial Image Synthesis Studio',
  description: 'Professional-grade Base64 studio. Convert images to code and decode Base64 back to images instantly. Optimized for high-performance developer workflows.',
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
    title: 'FORGE. | Professional Image Synthesis',
    description: 'Industrial-grade Base64 encoding and decoding for modern developers.',
    url: baseUrl,
    siteName: 'Forge Studios',
    images: [
      {
        url: 'https://picsum.photos/seed/forge-og/1200/630',
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
    title: 'FORGE. | Industrial Image Synthesis',
    description: 'High-performance Base64 encoding and decoding engine.',
    images: ['https://picsum.photos/seed/forge-twitter/1200/630'],
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
  const jsonLd = {
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
      "Multi-Format Support (WebP, PNG, JPG, SVG)"
    ]
  };

  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
