import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Base64 API Reference & Integration',
  description: 'Integrate the Forge synthesis engine into your pipeline. Documentation for Base64 encoding endpoints, rate limits, and authentication.',
};

export default function ApiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
