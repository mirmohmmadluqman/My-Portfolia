'use server';

/**
 * @fileOverview A flow to generate a professional introduction for Mir Mohmmad Luqman.
 *
 * - generateProfessionalIntro - A function that generates a professional introduction.
 * - GenerateProfessionalIntroInput - The input type for the generateProfessionalIntro function.
 * - GenerateProfessionalIntroOutput - The return type for the generateProfessionalIntro function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProfessionalIntroInputSchema = z.object({
  name: z.string().describe('The name of the person.'),
  skills: z.array(z.string()).describe('A list of skills.'),
  projectTitles: z.array(z.string()).describe('A list of project titles.'),
});
export type GenerateProfessionalIntroInput = z.infer<
  typeof GenerateProfessionalIntroInputSchema
>;

const GenerateProfessionalIntroOutputSchema = z.object({
  introduction: z.string().describe('A professional introduction.'),
});
export type GenerateProfessionalIntroOutput = z.infer<
  typeof GenerateProfessionalIntroOutputSchema
>;

export async function generateProfessionalIntro(
  input: GenerateProfessionalIntroInput
): Promise<GenerateProfessionalIntroOutput> {
  return generateProfessionalIntroFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProfessionalIntroPrompt',
  input: {schema: GenerateProfessionalIntroInputSchema},
  output: {schema: GenerateProfessionalIntroOutputSchema},
  prompt: `You are a professional introduction writer. You will generate a brief introduction for the following person:

Name: {{{name}}}
Skills: {{#each skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Projects: {{#each projectTitles}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Write a polished greeting text with a pleasant tone, no irrelevant details. Follow a minimalist style guide.
`,
});

const generateProfessionalIntroFlow = ai.defineFlow(
  {
    name: 'generateProfessionalIntroFlow',
    inputSchema: GenerateProfessionalIntroInputSchema,
    outputSchema: GenerateProfessionalIntroOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
