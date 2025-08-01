import { Github, Twitter, Link as LinkIcon } from "lucide-react";
import { socialLinks } from "@/lib/data";

export function PageFooter() {
  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "github":
        return <Github className="h-5 w-5" />;
      case "x":
        return <Twitter className="h-5 w-5" />;
      default:
        return <LinkIcon className="h-5 w-5" />;
    }
  };

  return (
    <footer className="w-full py-6 bg-secondary">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Mir Mohmmad Luqman. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {getIcon(link.name)}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
