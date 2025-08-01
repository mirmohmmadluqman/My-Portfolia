import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CopyButton } from "@/components/copy-button";
import { Mail } from "lucide-react";

export function ContactSection() {
  const email = "0x867012e82708278fbda998030ace0aa9f14fd83e@dmail.ai";

  return (
    <section id="contact" className="w-full">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Get in Touch</h2>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Have a question or want to collaborate? Feel free to reach out.
        </p>
      </div>
      <div className="mt-8 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              <span>Email</span>
            </CardTitle>
            <CardDescription>
              Click to copy my dApp mail address.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-3 rounded-md bg-secondary">
              <span className="text-sm font-mono truncate">{email}</span>
              <CopyButton textToCopy={email} />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
