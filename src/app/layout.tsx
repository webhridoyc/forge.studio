import type {Metadata} from 'next';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'FORGE. | All-in-One Image Encoder & Decoder',
  description: 'Professional-grade Base64 studio. Convert images to code and decode Base64 back to images instantly. Optimized for performance and organic search.',
  keywords: ['Base64 converter', 'Image to Base64', 'Data URI generator', 'Base64 decoder', 'Image optimization', 'Web performance tool'],
  authors: [{ name: 'Forge Studios' }],
  openGraph: {
    title: 'FORGE. | Professional Image Synthesis',
    description: 'Industrial-grade Base64 encoding and decoding for modern developers.',
    url: 'https://forge.studio',
    siteName: 'Forge Studios',
    images: [
      {
        url: 'https://picsum.photos/seed/forge-og/1200/630',
        width: 1200,
        height: 630,
        alt: 'Forge Studios Workbench',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
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
    "operatingSystem": "Web",
    "applicationCategory": "DeveloperApplication",
    "description": "Convert images to Base64 strings and decode Base64 back to images instantly. Privacy-focused, professional-grade pipeline.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
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
