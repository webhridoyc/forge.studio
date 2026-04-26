import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JSON Synthesizer Pro | Data Structure Orchestration',
  description: 'Industrial-grade JSON formatter and TypeScript interface generator. Transform bitstreams, sort keys, and optimize data structures with the Forge synthesis engine.',
  keywords: [
    'JSON formatter',
    'JSON to TypeScript',
    'JSON minifier',
    'JSON validator',
    'Data structure optimizer',
    'JSON key sorter',
    'Developer utility JSON',
    'TypeScript interface generator',
    'JSON bitstream synthesis',
    'Industrial data orchestration'
  ],
};

export default function JsonSynthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
