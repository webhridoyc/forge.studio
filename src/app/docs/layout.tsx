import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Base64 Documentation & Technical Guide',
  description: 'Master Base64 synthesis. Technical guide for image encoding, Data URI usage in CSS/HTML, and binary-to-text optimization strategies.',
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
