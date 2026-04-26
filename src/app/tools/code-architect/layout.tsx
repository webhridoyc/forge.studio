import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Code Architect Pro | AI Snippet Synthesis & Preview',
  description: 'Industrial-grade code explainer and live component playground. Deconstruct React/Tailwind code with AI and visualize real-time changes in a secure sandbox.',
  keywords: [
    'Code explainer AI',
    'Live code preview',
    'Tailwind playground',
    'Code breakout tool',
    'Developer code architect',
    'Snippet optimizer',
    'React component preview',
    'Industrial code synthesis'
  ],
};

export default function CodeArchitectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
