import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image Optimizer Pro | High-Performance Bitstream Synthesis',
  description: 'Industrial-grade image optimizer and WebP converter. Recalibrate resolution, quality, and bitstream efficiency for production-ready asset delivery.',
  keywords: [
    'Image optimizer',
    'WebP converter',
    'Bulk image compressor',
    'Resolution scaler',
    'Asset pipeline optimization',
    'Professional image tool',
    'Lossless image synthesis',
    'Developer utility image',
    'Bitstream recalibration'
  ],
};

export default function ImageOptimizerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
