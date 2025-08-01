
'use server';

/**
 * @fileOverview A flow to generate a custom introduction for Mir Mohmmad Luqman.
 *
 * - generateCustomIntro - A function that generates a custom introduction based on a user query.
 * - GenerateCustomIntroInput - The input type for the generateCustomIntro function.
 * - GenerateCustomIntroOutput - The return type for the generateCustomIntro function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { socialLinks, skills, projects } from '@/lib/data';

const GenerateCustomIntroInputSchema = z.object({
  query: z.string().describe('The user\'s question about Mir Mohmmad Luqman.'),
});
export type GenerateCustomIntroInput = z.infer<typeof GenerateCustomIntroInputSchema>;

const GenerateCustomIntroOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the user\'s question.'),
});
export type GenerateCustomIntroOutput = z.infer<typeof GenerateCustomIntroOutputSchema>;

export async function generateCustomIntro(
  input: GenerateCustomIntroInput
): Promise<GenerateCustomIntroOutput> {
  return generateCustomIntroFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCustomIntroPrompt',
  input: {schema: GenerateCustomIntroInputSchema},
  output: {schema: GenerateCustomIntroOutputSchema},
  prompt: `You are a professional assistant for Mir Mohmmad Luqman, a Web3 Developer. Your role is to answer questions about him based ONLY on the context provided below.

You MUST NOT answer any questions that are not related to Mir Mohmmad Luqman's professional life, skills, or projects as described in the context. If a question is outside of this scope (e.g., personal life, opinions, or anything unrelated to his career), you MUST politely decline to answer.

Context about Mir Mohmmad Luqman:
- Name: Mir Mohmmad Luqman
- Profession: Web3 Developer specializing in Smart Contracts, Security, and Frontend Integration.
- Social/Professional Profiles:
{{#each socialLinks}}
  - {{name}}: {{url}}
{{/each}}
- Skills:
{{#each skills}}
  - {{name}} (Proficiency: {{proficiency}}%)
{{/each}}
- Projects:
{{#each projects.original}}
  - {{title}}: {{description}} (URL: {{githubUrl}})
{{/each}}
{{#each projects.other}}
  - {{title}}: {{description}} (URL: {{githubUrl}})
{{/each}}

User's Question: "{{query}}"

Based on the context above, please provide a concise and professional answer to the user's question.
`,
});

const generateCustomIntroFlow = ai.defineFlow(
  {
    name: 'generateCustomIntroFlow',
    inputSchema: GenerateCustomIntroInputSchema,
    outputSchema: GenerateCustomIntroOutputSchema,
  },
  async (input) => {
    const {output} = await prompt({
      ...input,
      // Augment the prompt input with data from our app
      socialLinks,
      skills,
      projects,
    });
    return output!;
  }
);
