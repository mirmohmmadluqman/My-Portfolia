"use client";

import { useState } from "react";
import { projects } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

export function ProjectsSection() {
  const [showAllOriginal, setShowAllOriginal] = useState(false);
  const [showAllOther, setShowAllOther] = useState(false);

  const originalProjectsToShow = showAllOriginal ? projects.original : projects.original.slice(0, 4);
  const otherProjectsToShow = showAllOther ? projects.other : projects.other.slice(0, 4);

  const ProjectCard = ({ project }: { project: typeof projects.original[0] }) => (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
            <CardTitle>{project.title}</CardTitle>
            <Badge variant={project.type === "Original (Real)" ? "default" : "secondary"}>
                {project.type}
            </Badge>
        </div>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="aspect-video relative overflow-hidden rounded-md border">
          <Image
            src="https://placehold.co/600x400.png"
            alt={project.title}
            fill
            className="object-cover"
            data-ai-hint="abstract code"
          />
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button variant="outline" className="w-full">
              <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
            </Button>
          </a>
        )}
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button className="w-full">
            <Github className="mr-2 h-4 w-4" /> Source Code
          </Button>
        </a>
      </CardFooter>
    </Card>
  );

  return (
    <section id="projects" className="w-full">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Projects</h2>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Here are some of the projects I've worked on.
        </p>
      </div>
      <div className="mt-8">
        <Tabs defaultValue="original" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mx-auto max-w-md">
            <TabsTrigger value="original">Original</TabsTrigger>
            <TabsTrigger value="other">Learning & Forks</TabsTrigger>
          </TabsList>
          <TabsContent value="original" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {originalProjectsToShow.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
            {projects.original.length > 4 && (
              <div className="mt-8 text-center">
                <Button variant="outline" onClick={() => setShowAllOriginal(!showAllOriginal)}>
                  {showAllOriginal ? <ChevronUp className="mr-2 h-4 w-4" /> : <ChevronDown className="mr-2 h-4 w-4" />}
                  {showAllOriginal ? "Show Less" : "Show More"}
                </Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="other" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherProjectsToShow.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
             {projects.other.length > 4 && (
              <div className="mt-8 text-center">
                <Button variant="outline" onClick={() => setShowAllOther(!showAllOther)}>
                  {showAllOther ? <ChevronUp className="mr-2 h-4 w-4" /> : <ChevronDown className="mr-2 h-4 w-4" />}
                  {showAllOther ? "Show Less" : "Show More"}
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
