'use server';
/**
 * @fileOverview A Genkit flow for generating personalized explanations of a user's FinID trust score.
 *
 * - generateFinIDScoreExplanation - A function that generates an explanation for the FinID trust score.
 * - GenerateFinIDScoreExplanationInput - The input type for the generateFinIDScoreExplanation function.
 * - GenerateFinIDScoreExplanationOutput - The return type for the generateFinIDScoreExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFinIDScoreExplanationInputSchema = z.object({
  overallScore: z.number().describe('The user\'s overall FinID trust score (e.g., 750).'),
  dimensionScores: z.array(
    z.object({
      name: z.string().describe('The name of the scoring dimension (e.g., "Credit History", "Income Stability").'),
      score: z.number().describe('The score for this specific dimension (e.g., 80, 95).'),
    })
  ).describe('Detailed scores for each dimension contributing to the overall FinID trust score.'),
});
export type GenerateFinIDScoreExplanationInput = z.infer<typeof GenerateFinIDScoreExplanationInputSchema>;

const GenerateFinIDScoreExplanationOutputSchema = z.object({
  overallExplanation: z.string().describe('A clear and concise explanation of the overall FinID trust score.'),
  dimensionExplanations: z.array(
    z.object({
      dimensionName: z.string().describe('The name of the scoring dimension.'),
      explanation: z.string().describe('An explanation of how this dimension contributes to the overall score.'),
    })
  ).describe('Detailed explanations for each dimension\'s contribution to the FinID trust score.'),
});
export type GenerateFinIDScoreExplanationOutput = z.infer<typeof GenerateFinIDScoreExplanationOutputSchema>;

export async function generateFinIDScoreExplanation(
  input: GenerateFinIDScoreExplanationInput
): Promise<GenerateFinIDScoreExplanationOutput> {
  return generateFinIDScoreExplanationFlow(input);
}

const finIDScoreExplanationPrompt = ai.definePrompt({
  name: 'finIDScoreExplanationPrompt',
  input: {schema: GenerateFinIDScoreExplanationInputSchema},
  output: {schema: GenerateFinIDScoreExplanationOutputSchema},
  prompt: `You are an AI assistant specialized in explaining financial identity scores. Your goal is to provide clear, concise, and personalized explanations for a user's FinID trust score and how each dimension contributes to it.

Here is the user's FinID trust score and contributing dimension scores:

Overall FinID Trust Score: {{{overallScore}}}

Dimension Scores:
{{#each dimensionScores}}
- {{{this.name}}}: {{{this.score}}}
{{/each}}

Please provide:
1. An overall explanation of the FinID trust score, highlighting its meaning and general implications.
2. For each dimension listed, explain its significance and how its specific score contributes to or impacts the overall FinID trust score. Be specific about whether a high or low score in that dimension is beneficial or detrimental.

Ensure the explanations are easy to understand for someone who may not have a financial background.`,
});

const generateFinIDScoreExplanationFlow = ai.defineFlow(
  {
    name: 'generateFinIDScoreExplanationFlow',
    inputSchema: GenerateFinIDScoreExplanationInputSchema,
    outputSchema: GenerateFinIDScoreExplanationOutputSchema,
  },
  async (input) => {
    const {output} = await finIDScoreExplanationPrompt(input);
    return output!;
  }
);
