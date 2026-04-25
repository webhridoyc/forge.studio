import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Base64 Performance Audit & Benchmarks',
  description: 'Technical analysis of Base64 encoding impact on Core Web Vitals, LCP optimization, and network overhead vs. HTTP requests.',
};

export default function PerformanceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
