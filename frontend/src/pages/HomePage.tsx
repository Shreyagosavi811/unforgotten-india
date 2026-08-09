import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/landing/Hero';
import { ExperienceSection } from '../components/landing/ExperienceSection';
import { JourneySection } from '../components/landing/JourneySection';
import { MapPreview } from '../components/landing/MapPreview';
import { StoryPreview } from '../components/landing/StoryPreview';
import { EvidenceSection } from '../components/landing/EvidenceSection';
import { CommunitySection } from '../components/landing/CommunitySection';
import { FinalCTA } from '../components/landing/FinalCTA';

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcf8f2] text-[#0f172a]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ExperienceSection />
        <JourneySection />
        <MapPreview />
        <StoryPreview />
        <EvidenceSection />
        <CommunitySection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
