import Image from "next/image";

export function PageHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <Image
              src="https://pbs.twimg.com/profile_images/1920434245127774208/gcxmtzLx_400x400.jpg"
              alt="Mir Mohmmad Luqman Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-bold sm:inline-block">
              Mir Mohmmad Luqman
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
