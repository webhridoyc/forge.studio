'use server';
/**
 * @fileOverview E-Commerce Product Forge - Vision AI Catalog Synthesizer.
 *
 * - productForge - Function to synthesize catalog data from a product image.
 * - ProductForgeInput - Input schema for the photo bitstream and language.
 * - ProductForgeOutput - Structured JSON product architecture.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ProductForgeInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a product as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  language: z.enum(['en', 'bn']).default('en').describe('Target output language (English or Bengali).'),
});
export type ProductForgeInput = z.infer<typeof ProductForgeInputSchema>;

const ProductForgeOutputSchema = z.object({
  product: z.object({
    name: z.string().describe('The synthesized name of the product.'),
    description: z.string().describe('An SEO-optimized product description.'),
    category: z.string().describe('The primary market category.'),
    estimatedPrice: z.string().describe('A logical price estimation based on market standards.'),
    tags: z.array(z.string()).describe('Industrial search tags.'),
    specs: z.record(z.string()).describe('Detected technical specifications or attributes.'),
  }),
  metadata: z.object({
    confidence: z.number(),
    languageApplied: z.string(),
  })
});
export type ProductForgeOutput = z.infer<typeof ProductForgeOutputSchema>;

const productForgePrompt = ai.definePrompt({
  name: 'productForgePrompt',
  input: { schema: ProductForgeInputSchema },
  output: { schema: ProductForgeOutputSchema },
  prompt: `You are the Lead E-Commerce Architect at Forge Studios.
  Analyze the following product photo bitstream:
  
  Photo: {{media url=photoDataUri}}
  Requested Language: {{{language}}}
  
  Your goal is to synthesize a professional, industrial-grade product catalog entry.
  If the language is "bn", provide the Name, Description, and Category in high-quality Bengali.
  Ensure the description is optimized for SEO and highlights the product's quality and utility.
  Estimate a reasonable price in BDT if it looks like a local product, otherwise in USD.`
});

const productForgeFlow = ai.defineFlow(
  {
    name: 'productForgeFlow',
    inputSchema: ProductForgeInputSchema,
    outputSchema: ProductForgeOutputSchema,
  },
  async (input) => {
    const { output } = await productForgePrompt(input);
    return output!;
  }
);

export async function productForge(input: ProductForgeInput): Promise<ProductForgeOutput> {
  return productForgeFlow(input);
}
