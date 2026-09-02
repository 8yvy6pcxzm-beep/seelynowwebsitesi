import { Suspense } from "react";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Services } from "@/components/sections/services";
import { Automations } from "@/components/sections/automations";
import { Process } from "@/components/sections/process";
import { InnovationBand } from "@/components/sections/innovation-band";
import { Cta } from "@/components/sections/cta";
import { Contact } from "@/components/sections/contact";

// Metadata layout.tsx'teki siteMetadata'dan (lib/seo.ts) miras alınıyor —
// burada ayrıca tanımlamaya gerek yok, iki farklı title tanımının
// birbirini ezmesini önler.

export default function HomePage() {
  return (
    <main className="min-h-screen bg-surface">
      <Hero />
      <Stats />
      <Services />
      <Automations />
      <Process />
      <InnovationBand />
      <Cta />
      <Suspense fallback={null}>
        <Contact />
      </Suspense>
    </main>
  );
}
