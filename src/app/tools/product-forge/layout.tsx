import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'E-Commerce Product Forge | Vision AI Catalog Synthesis',
  description: 'Industrial-grade image-to-catalog utility. Transform product photos into optimized WebP assets and structured JSON listings with AI vision.',
  keywords: [
    'Image to product catalog',
    'AI vision product tagging',
    'E-commerce data synthesis',
    'Bengali product description AI',
    'Product photo optimizer',
    'Micro-SaaS product forge',
    'Village e-commerce tool'
  ],
};

export default function ProductForgeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
