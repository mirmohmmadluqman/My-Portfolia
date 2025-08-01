import { skills } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Code, Bot, MonitorSmartphone } from "lucide-react";

export function SkillsSection() {
  const getIcon = (category: string) => {
    switch (category) {
      case "EVM":
        return <Code className="h-6 w-6 text-primary" />;
      case "Rust":
        // Using a generic icon as a placeholder for Rust logo
        return <Bot className="h-6 w-6 text-primary" />;
      case "Client Side":
        return <MonitorSmartphone className="h-6 w-6 text-primary" />;
      default:
        return <Code className="h-6 w-6 text-primary" />;
    }
  };
  
  const groupedSkills: { [key: string]: typeof skills } = skills.reduce((acc, skill) => {
    const category = skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as { [key: string]: typeof skills });


  return (
    <section id="skills" className="w-full">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">My Skills</h2>
        <p className="mt-4 text-muted-foreground md:text-lg">
          A glimpse into my technical toolbox.
        </p>
      </div>
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {Object.entries(groupedSkills).map(([category, skillsInCategory]) => (
          <Card key={category} className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
            <CardHeader>
              <div className="flex items-center gap-4">
                {getIcon(category)}
                <CardTitle className="font-headline">{category}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {skillsInCategory.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">{skill.name}</h3>
                    <span className="text-sm text-muted-foreground">{skill.proficiency}%</span>
                  </div>
                  <Progress value={skill.proficiency} aria-label={`${skill.name} proficiency`} />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
