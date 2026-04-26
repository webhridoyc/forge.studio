import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SVG Studio Architect | Vector to Code Synthesis',
  description: 'Industrial-grade SVG optimizer and React component generator. Orchestrate clean paths, generate Data URIs, and transform vectors into production-ready code.',
  keywords: [
    'SVG optimizer',
    'SVG to React',
    'SVG to JSX',
    'SVG cleaner',
    'SVG Data URI generator',
    'Vector path orchestration',
    'SVG to Base64',
    'Industrial vector tools',
    'Developer SVG utility'
  ],
};

export default function SvgForgeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
