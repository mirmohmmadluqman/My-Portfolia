"use client";

import { useState } from "react";
import { Wand2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { generateProfessionalIntro } from "@/ai/flows/generate-professional-intro";
import { skills, projects } from "@/lib/data";

export function IntroGeneratorSection() {
  const [introduction, setIntroduction] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateIntro = async () => {
    setIsLoading(true);
    setError(null);
    setIntroduction("");

    try {
      const projectTitles = projects.original.map(p => p.title);
      const skillNames = skills.map(s => s.name);
      
      const result = await generateProfessionalIntro({
        name: "Mir Mohmmad Luqman",
        skills: skillNames,
        projectTitles,
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
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-intro" className="w-full">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">AI-Powered Introduction</h2>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Curious? Let AI generate a professional intro for me based on my portfolio.
        </p>
      </div>
      <div className="mt-8 flex flex-col items-center gap-6">
        <Button onClick={handleGenerateIntro} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          {isLoading ? "Generating..." : "Generate an Intro for Me"}
        </Button>
        
        {introduction && (
          <Card className="w-full max-w-2xl animate-fade-in">
            <CardContent className="p-6">
              <p className="text-center italic text-muted-foreground">{introduction}</p>
            </CardContent>
          </Card>
        )}
        {error && (
            <p className="text-destructive text-sm">{error}</p>
        )}
      </div>
    </section>
  );
}
