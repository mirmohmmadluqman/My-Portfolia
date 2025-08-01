
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

const professionalAssistantPrompt = ai.definePrompt({
  name: 'professionalAssistantPrompt',
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

const generalAssistantPrompt = ai.definePrompt({
  name: 'generalAssistantPrompt',
  input: { schema: GenerateCustomIntroInputSchema },
  output: { schema: GenerateCustomIntroOutputSchema },
  prompt: `You are a helpful general-purpose AI assistant. Please answer the following user query.

User's Question: "{{query}}"`,
});


const generateCustomIntroFlow = ai.defineFlow(
  {
    name: 'generateCustomIntroFlow',
    inputSchema: GenerateCustomIntroInputSchema,
    outputSchema: GenerateCustomIntroOutputSchema,
  },
  async (input) => {
    // This is the "easter egg" code.
    const activationCode = '155309507';

    if (input.query.trim() === activationCode) {
        return { answer: "Welcome! General assistant mode activated. How can I help you today?" };
    }
    
    const isGeneralQuery = await ai.generate({
        prompt: `Does the following query ask for general knowledge or something unrelated to a person's professional life? Answer with only "yes" or "no". Query: "${input.query}"`,
        model: 'googleai/gemini-2.0-flash',
        output: {
            format: 'text'
        }
    });

    const isGeneral = isGeneralQuery.text.toLowerCase().includes('yes');

    if (isGeneral) {
         // Check if a previous query was the activation code, which is not implemented in this stateless setup
         // For now, we assume this flow is for general queries if it's not about the person.
         // A more robust solution would involve session management.
         // Let's check for a magic word in the session or a flag. For now, we will just use a simpler check.
         const { output } = await generalAssistantPrompt({ query: "Answer this query: " + input.query });
         return output!;
    }
    
    const {output} = await professionalAssistantPrompt({
      ...input,
      // Augment the prompt input with data from our app
      socialLinks,
      skills,
      projects,
    });
    return output!;
  }
);
