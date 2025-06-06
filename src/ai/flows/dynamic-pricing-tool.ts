// This is an auto-generated file from Firebase Studio.

'use server';

/**
 * @fileOverview AI-powered dynamic pricing suggestion tool for farmers in the Bangladeshi market.
 *
 * - suggestOptimalPrice - A function that suggests optimal pricing (in BDT) for a product based on season, surplus, and urgency.
 * - SuggestOptimalPriceInput - The input type for the suggestOptimalPrice function.
 * - SuggestOptimalPriceOutput - The return type for the suggestOptimalPrice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestOptimalPriceInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  season: z.string().describe('The current season (e.g., Spring, Summer, Autumn, Winter).'),
  surplus: z.string().describe('The current surplus level of the product (e.g., low, medium, high).'),
  urgency: z.string().describe('The urgency to sell the product (e.g., low, medium, high).'),
  currentPrice: z.number().describe('The current price of the product in BDT (Bangladeshi Taka).'),
});

export type SuggestOptimalPriceInput = z.infer<typeof SuggestOptimalPriceInputSchema>;

const SuggestOptimalPriceOutputSchema = z.object({
  suggestedPrice: z.number().describe('The suggested optimal price for the product in BDT (Bangladeshi Taka).'),
  reasoning: z.string().describe('The reasoning behind the suggested price.'),
});

export type SuggestOptimalPriceOutput = z.infer<typeof SuggestOptimalPriceOutputSchema>;

export async function suggestOptimalPrice(input: SuggestOptimalPriceInput): Promise<SuggestOptimalPriceOutput> {
  return suggestOptimalPriceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOptimalPricePrompt',
  input: {schema: SuggestOptimalPriceInputSchema},
  output: {schema: SuggestOptimalPriceOutputSchema},
  prompt: `You are an expert in agricultural product pricing within the Bangladeshi market. Given the following information about a product, suggest an optimal price in BDT (Bangladeshi Taka) to maximize profit for the farmer.

Product Name: {{{productName}}}
Season: {{{season}}}
Surplus Level: {{{surplus}}}
Urgency to Sell: {{{urgency}}}
Current Price (BDT): {{{currentPrice}}}

Consider the impact of each factor on the price. For example, a high surplus level might suggest lowering the price, while a high urgency to sell might suggest a slightly lower but still profitable price. All prices should be considered in BDT.

Provide a suggested price in BDT and a brief explanation of your reasoning.

Output should be in the following JSON format:
{
  "suggestedPrice": <suggested BDT price as a number>,
  "reasoning": "<reasoning for the suggested price>"
}`,
});

const suggestOptimalPriceFlow = ai.defineFlow(
  {
    name: 'suggestOptimalPriceFlow',
    inputSchema: SuggestOptimalPriceInputSchema,
    outputSchema: SuggestOptimalPriceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
