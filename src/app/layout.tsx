import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const fontHeadline = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-headline",
  weight: ["300", "400", "500", "600", "700"],
});


export const metadata: Metadata = {
  title: "Mir Mohmmad Luqman - Web3 Developer Portfolio",
  description: "Personal portfolio of Mir Mohmmad Luqman, a Web3 Developer specializing in Smart Contracts, Security, and Frontend Integration.",
  openGraph: {
    images: ['https://pbs.twimg.com/profile_images/1920434245127774208/gcxmtzLx_400x400.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
       <head>
        <link rel="icon" href="https://pbs.twimg.com/profile_images/1920434245127774208/gcxmtzLx_400x400.jpg" sizes="any" />
      </head>
      <body className={cn("font-body antialiased", fontBody.variable, fontHeadline.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
