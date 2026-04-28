import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agentic Prompt Architect | JSON System Prompt Synthesis',
  description: 'Industrial-grade prompt synthesizer for AI agents. Transform rough concepts into structured JSON system prompts optimized for multi-agent swarms.',
  keywords: [
    'System prompt generator',
    'AI agent architect',
    'JSON prompt synthesizer',
    'Agentic engineering tool',
    'MCP prompt forge',
    'Professional AI instructions',
    'System prompt optimizer'
  ],
};

export default function PromptArchitectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
