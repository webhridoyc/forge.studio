'use server';
/**
 * @fileOverview AI Code Architect Explainer.
 *
 * - explainCode - Function to deconstruct and explain code snippets.
 * - ExplainCodeInput - Input schema for the code snippet.
 * - ExplainCodeOutput - Structured analysis of the code.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ExplainCodeInputSchema = z.object({
  code: z.string().describe('The raw code bitstream to analyze.'),
  language: z.string().optional().describe('Optional language context (e.g. "react", "html").'),
});
export type ExplainCodeInput = z.infer<typeof ExplainCodeInputSchema>;

const ExplainCodeOutputSchema = z.object({
  overview: z.string().describe('A high-level summary of what the code does.'),
  breakdown: z.array(z.object({
    block: z.string().describe('A logical segment of the code.'),
    meaning: z.string().describe('Technical explanation of this segment.')
  })).describe('A modular breakdown of the code architecture.'),
  suggestions: z.array(z.string()).describe('Professional suggestions for optimization or security.'),
  complexity: z.enum(['Low', 'Medium', 'High', 'Industrial']).describe('The structural complexity index.')
});
export type ExplainCodeOutput = z.infer<typeof ExplainCodeOutputSchema>;

const explainCodePrompt = ai.definePrompt({
  name: 'explainCodePrompt',
  input: { schema: ExplainCodeInputSchema },
  output: { schema: ExplainCodeOutputSchema },
  prompt: `You are the Lead Software Architect at Forge Studios.
  Analyze the following code bitstream:
  
  {{{code}}}
  
  Context: {{{language}}}
  
  Your goal is to "break out" this code so a developer can instantly understand its architecture. 
  Provide a modular breakdown, a performance overview, and industrial-grade optimization tips.`
});

const explainCodeFlow = ai.defineFlow(
  {
    name: 'explainCodeFlow',
    inputSchema: ExplainCodeInputSchema,
    outputSchema: ExplainCodeOutputSchema,
  },
  async (input) => {
    const { output } = await explainCodePrompt(input);
    return output!;
  }
);

export async function explainCode(input: ExplainCodeInput): Promise<ExplainCodeOutput> {
  return explainCodeFlow(input);
}
