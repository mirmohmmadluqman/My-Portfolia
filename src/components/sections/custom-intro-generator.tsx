
"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { generateCustomIntro } from "@/ai/flows/generate-custom-intro";

export function CustomIntroGeneratorSection() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult("");

    try {
      const response = await generateCustomIntro({ query });
      if (response.answer) {
        setResult(response.answer);
      } else {
        setError("I couldn't find an answer to that question. Try rephrasing it.");
      }
    } catch (e) {
      console.error(e);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-custom-intro" className="w-full">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
          Ask Me Anything
        </h2>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Have a specific question about my work or skills? Ask the AI.
        </p>
      </div>
      <div className="mt-8 mx-auto max-w-2xl">
        <form onSubmit={handleGenerate} className="flex gap-2">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., What are his main technical skills?"
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
            <span className="sr-only">Ask</span>
          </Button>
        </form>

        {result && !isLoading && (
          <Card className="w-full mt-6 animate-fade-in">
            <CardContent className="p-6">
              <p className="italic text-muted-foreground">
                {result}
              </p>
            </CardContent>
          </Card>
        )}
        {error && <p className="text-destructive text-sm mt-2 text-center">{error}</p>}
      </div>
    </section>
  );
}
