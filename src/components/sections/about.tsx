import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="w-full">
      <div className="grid items-center gap-6 md:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Mir Mohmmad Luqman
          </h1>
          <h2 className="text-xl font-medium text-primary">Web3 Developer</h2>
          <p className="text-muted-foreground md:text-lg">
            A passionate Web3 Developer with a focus on building secure and efficient decentralized applications. My expertise spans across the full stack of dApp development, from crafting robust smart contracts to integrating them with seamless frontends. I thrive on solving complex problems and contributing to the future of the decentralized web.
          </p>
          <p className="text-muted-foreground md:text-lg">
            I specialize in Smart Contract Development using Solidity and Foundry, and I am proficient with security tools like Echidna and Certora Prover. My experience also includes Rust development for blockchains and building client-side integrations with TypeScript, Ethers.js, and Web3.js.
          </p>
        </div>
        <div className="flex justify-center">
          <Image 
            src="https://pbs.twimg.com/profile_images/1920434245127774208/gcxmtzLx_400x400.jpg"
            alt="Mir Mohmmad Luqman"
            width={450}
            height={450}
            className="rounded-full object-cover shadow-lg border-4 border-primary/20"
            data-ai-hint="developer portrait"
          />
        </div>
      </div>
    </section>
  );
}
