import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Forge Studios | Professional Image-to-Base64 Utility',
  description: 'High-performance image-to-code pipeline. Batch process, transcode PNG to WebP, and optimize assets for modern web delivery. 100% Secure & Client-Side.',
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
    "description": "Professional-grade image to Base64 code converter with performance optimization and batch processing.",
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
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
