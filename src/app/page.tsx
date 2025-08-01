import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { IntroGeneratorSection } from "@/components/sections/intro-generator";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { PageFooter } from "@/components/page-footer";
import { PageHeader } from "@/components/page-header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader />
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 md:py-12 space-y-20 md:space-y-28">
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <IntroGeneratorSection />
        <ContactSection />
      </main>
      <PageFooter />
    </div>
  );
}
