import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';

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
  description: 'Fastest online Base64 converter and image encoder. Convert PNG, JPEG, WebP, SVG to Base64 Data URI strings instantly. Lossless Base64 decoder and CSS/HTML image encoder for professional developers.',
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
    description: 'Convert images to Base64 Data URIs instantly. Fast, free, and lossless — the developer-grade Base64 encoder and decoder.',
    url: baseUrl,
    siteName: 'Forge Studios',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Forge Studios — Professional Base64 Converter',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Base64 Converter & Image Encoder | Forge Studios',
    description: 'Instant PNG, JPEG, WebP and SVG to Base64 encoding. Professional-grade Data URI generator.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'googlef11e306c0ec883d4',
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
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
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
    "name": "Forge Studios — Base64 Converter",
    "url": baseUrl,
    "operatingSystem": "Web",
    "applicationCategory": "DeveloperApplication",
    "description": "Free online Base64 converter and image encoder. Convert images to Data URI strings and decode Base64 back to binary instantly.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Base64 Encoding — PNG, JPEG, WebP, SVG",
      "Base64 Decoding — Restore binary assets",
      "Data URI Generator — CSS and HTML compatible",
      "Lossless optimization",
      "Cloud Sync for members"
    ]
  };

  return (
    <html lang="en" className={`light ${inter.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-K2K5DGZB');`}
        </Script>
        {/* End Google Tag Manager */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
        />
      </head>
      <body className={`${inter.className} font-body antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-K2K5DGZB"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <FirebaseClientProvider>
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
