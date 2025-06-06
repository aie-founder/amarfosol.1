'use server';
/**
 * @fileOverview An AI flow for translating text from English to Bengali.
 *
 * - translateToBengali - A function that translates English text to Bengali.
 * - TranslateTextInput - The input type for the translateToBengali function.
 * - TranslateTextOutput - The return type for the translateToBengali function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateTextInputSchema = z.object({
  textToTranslate: z.string().describe('The English text to be translated.'),
});
export type TranslateTextInput = z.infer<typeof TranslateTextInputSchema>;

const TranslateTextOutputSchema = z.object({
  translatedText: z.string().describe('The translated text in Bengali.'),
});
export type TranslateTextOutput = z.infer<typeof TranslateTextOutputSchema>;

export async function translateToBengali(input: TranslateTextInput): Promise<TranslateTextOutput> {
  return translateToBengaliFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateToBengaliPrompt',
  input: {schema: TranslateTextInputSchema},
  output: {schema: TranslateTextOutputSchema},
  prompt: `Translate the following English text to Bengali:

English Text:
{{{textToTranslate}}}

Bengali Translation:
`,
});

const translateToBengaliFlow = ai.defineFlow(
  {
    name: 'translateToBengaliFlow',
    inputSchema: TranslateTextInputSchema,
    outputSchema: TranslateTextOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
