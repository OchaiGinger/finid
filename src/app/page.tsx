import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { SleekScoreSection } from "@/components/sections/ScoreVisualizer";
import { PlatformSolutions } from "@/components/sections/Features";
import { ApiPreview } from "@/components/sections/ApiPreview";
import { Waitlist } from "@/components/sections/Waitlist";
import { AdvantagesSection } from "@/components/sections/Advantage";
import { TeamSection } from "@/components/sections/TeamSection";
import { Footer } from "@/components/sections/Footer";
export default function Home() {
  return (
    <main className="relative bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <Hero />
      <div id="product">
        <SleekScoreSection />
      </div>
      <div id="solutions">
        <PlatformSolutions />
      </div>
      <div id="api">
        <ApiPreview />
      </div>
      <div id="advantage">
        <AdvantagesSection />
      </div>
      <div id="team">
        <TeamSection />
      </div>
      <Waitlist />
      <Footer />
    </main>
  );
}
