'use server';
/**
 * @fileOverview Agentic Prompt Architect Synthesis Flow.
 *
 * - forgePrompt - Function to synthesize structured system prompts.
 * - ForgePromptInput - Input schema for the rough concept.
 * - ForgePromptOutput - Structured JSON prompt architecture.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ForgePromptInputSchema = z.object({
  concept: z.string().describe('The rough concept or idea for the AI agent.'),
  persona: z.string().optional().describe('The desired persona (e.g. "Software Architect", "Creative Director").'),
});
export type ForgePromptInput = z.infer<typeof ForgePromptInputSchema>;

const ForgePromptOutputSchema = z.object({
  systemPrompt: z.object({
    role: z.string().describe('The defined role of the agent.'),
    objective: z.string().describe('The primary goal the agent must achieve.'),
    constraints: z.array(z.string()).describe('A list of industrial constraints and rules.'),
    outputFormat: z.string().describe('The required structure for agent responses.'),
    context: z.string().describe('The environmental context for the agent.'),
  }).describe('The complete structured system prompt object.'),
  metadata: z.object({
    complexity: z.string(),
    estimatedTokens: z.number(),
    agentType: z.string(),
  })
});
export type ForgePromptOutput = z.infer<typeof ForgePromptOutputSchema>;

const forgePromptPrompt = ai.definePrompt({
  name: 'forgePromptPrompt',
  input: { schema: ForgePromptInputSchema },
  output: { schema: ForgePromptOutputSchema },
  prompt: `You are the Lead Agentic Architect at Forge Studios.
  Your goal is to synthesize a professional, industrial-grade "System Prompt" from the following concept.
  
  Concept: {{{concept}}}
  Requested Persona: {{{persona}}}
  
  Generate a structured JSON object that defines the agent's role, objective, constraints, and output format.
  The instructions must be precise, modular, and optimized for high-performance LLMs (GPT-4o, Gemini 1.5 Pro).`
});

const forgePromptFlow = ai.defineFlow(
  {
    name: 'forgePromptFlow',
    inputSchema: ForgePromptInputSchema,
    outputSchema: ForgePromptOutputSchema,
  },
  async (input) => {
    const { output } = await forgePromptPrompt(input);
    return output!;
  }
);

export async function forgePrompt(input: ForgePromptInput): Promise<ForgePromptOutput> {
  return forgePromptFlow(input);
}
