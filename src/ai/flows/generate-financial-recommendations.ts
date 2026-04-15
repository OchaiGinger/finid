'use server';
/**
 * @fileOverview A Genkit flow for generating personalized financial recommendations.
 *
 * - generateFinancialRecommendations - A function that handles the generation of financial recommendations.
 * - FinancialRecommendationsInput - The input type for the generateFinancialRecommendations function.
 * - FinancialRecommendationsOutput - The return type for the generateFinancialRecommendations function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FinancialRecommendationsInputSchema = z.object({
  explanation: z
    .string()
    .describe(
      "A detailed explanation of the user's FinID trust score and its current state, including areas of strength and weakness."
    ),
});
export type FinancialRecommendationsInput = z.infer<typeof FinancialRecommendationsInputSchema>;

const RecommendationSchema = z.object({
  title: z.string().describe('A concise title for the recommendation.'),
  description: z
    .string()
    .describe('Detailed steps or advice for implementing the recommendation.'),
  impact: z
    .enum(['High', 'Medium', 'Low'])
    .describe('The estimated impact level of this recommendation on the FinID score or financial health.'),
});

const FinancialRecommendationsOutputSchema = z.object({
  recommendations: z.array(RecommendationSchema).describe('An array of personalized and actionable financial recommendations.'),
});
export type FinancialRecommendationsOutput = z.infer<typeof FinancialRecommendationsOutputSchema>;

export async function generateFinancialRecommendations(
  input: FinancialRecommendationsInput
): Promise<FinancialRecommendationsOutput> {
  return generateFinancialRecommendationsFlow(input);
}

const generateFinancialRecommendationsPrompt = ai.definePrompt({
  name: 'generateFinancialRecommendationsPrompt',
  input: { schema: FinancialRecommendationsInputSchema },
  output: { schema: FinancialRecommendationsOutputSchema },
  prompt: `You are an expert financial advisor specializing in improving FinID trust scores and overall financial health.

The user has provided an explanation of their current FinID trust score and its contributing factors. Your task is to generate personalized, actionable recommendations and strategies to help them improve their FinID score and enhance their financial well-being.

Focus on clear, practical steps they can take. For each recommendation, provide a title, a detailed description of how to implement it, and an estimated impact level (High, Medium, or Low).

FinID Score Explanation:
{{{explanation}}}`,
});

const generateFinancialRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateFinancialRecommendationsFlow',
    inputSchema: FinancialRecommendationsInputSchema,
    outputSchema: FinancialRecommendationsOutputSchema,
  },
  async (input) => {
    const { output } = await generateFinancialRecommendationsPrompt(input);
    if (!output) {
      throw new Error('Failed to generate financial recommendations.');
    }
    return output;
  }
);
