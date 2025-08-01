"use client";

import { useState } from "react";
import { Wand2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  generateProfessionalIntro,
  GenerateProfessionalIntroInput,
} from "@/ai/flows/generate-professional-intro";
import { skills, projects } from "@/lib/data";

type IntroTopic = GenerateProfessionalIntroInput["topic"];

export function IntroGeneratorSection() {
  const [introduction, setIntroduction] = useState("");
  const [isLoading, setIsLoading] = useState<IntroTopic | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateIntro = async (topic: IntroTopic) => {
    setIsLoading(topic);
    setError(null);
    setIntroduction("");

    try {
      const projectTitles = projects.original.map((p) => p.title);
      const skillNames = skills.map((s) => s.name);

      const result = await generateProfessionalIntro({
        name: "Mir Mohmmad Luqman",
        skills: skillNames,
        projectTitles,
        topic: topic,
      });

      if (result.introduction) {
        setIntroduction(result.introduction);
      } else {
        setError("Failed to generate an introduction. Please try again.");
      }
    } catch (e) {
      console.error(e);
      setError("An error occurred while generating the introduction.");
    } finally {
      setIsLoading(null);
    }
  };

  const introOptions: { topic: IntroTopic; label: string }[] = [
    { topic: "introduction", label: "Generate a general intro" },
    { topic: "projects", label: "Tell me about his projects" },
    { topic: "profession", label: "What is his profession?" },
    { topic: "personality", label: "What is he like?" },
  ];

  return (
    <section id="ai-intro" className="w-full">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
          AI-Powered Insights
        </h2>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Curious? Let AI generate some insights about me based on my portfolio. Click a button to start.
        </p>
      </div>
      <div className="mt-8 flex flex-col items-center gap-6">
        <div className="flex flex-wrap justify-center gap-4">
          {introOptions.map(({ topic, label }) => (
            <Button
              key={topic}
              onClick={() => handleGenerateIntro(topic)}
              disabled={!!isLoading}
            >
              {isLoading === topic ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              {isLoading === topic ? "Generating..." : label}
            </Button>
          ))}
        </div>

        {introduction && !isLoading && (
          <Card className="w-full max-w-2xl animate-fade-in">
            <CardContent className="p-6">
              <p className="text-center italic text-muted-foreground">
                {introduction}
              </p>
            </CardContent>
          </Card>
        )}
        {error && <p className="text-destructive text-sm">{error}</p>}
      </div>
    </section>
  );
}
