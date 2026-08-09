import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { getRegionById } from '../data/regions';
import { RegionalHero } from '../components/regional/RegionalHero';
import { RegionalNavigation } from '../components/regional/RegionalNavigation';
import { DiscoveryCategories } from '../components/regional/DiscoveryCategories';
import { FeaturedStorySection } from '../components/regional/FeaturedStorySection';
import { RegionalTimelinePreview } from '../components/regional/RegionalTimelinePreview';
import { RegionalConnections } from '../components/regional/RegionalConnections';
import { RegionalExploreFurther } from '../components/regional/RegionalExploreFurther';
import { RegionalFooterCTA } from '../components/regional/RegionalFooterCTA';

export function RegionalExplorerPage() {
  const { stateId } = useParams<{ stateId: string }>();
  const region = stateId ? getRegionById(stateId) : undefined;

  if (!region) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fcf8f2] text-[#0f172a]">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6 parchment-texture">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-300 text-amber-900 flex items-center justify-center text-3xl font-bold shadow-xs">
            🧭
          </div>
          <div className="space-y-2 max-w-md">
            <span className="text-xs font-mono font-bold uppercase text-amber-900">
              Unknown Region Identifier
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#1e1b4b]">
              Region Not Found
            </h1>
            <p className="text-xs text-slate-600">
              No regional data mapping exists for identifier <code className="bg-stone-200 px-1.5 py-0.5 rounded font-mono">{stateId}</code>.
            </p>
          </div>
          <Link
            to="/india"
            className="px-6 py-3 bg-[#1e1b4b] text-amber-100 hover:bg-amber-900 rounded-xl font-semibold text-xs transition-colors shadow-xs"
          >
            ← Return to Interactive India Map
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf8f2] text-[#0f172a] selection:bg-amber-200 selection:text-amber-900">
      <Navbar />

      <main className="flex-1 space-y-4">
        {/* Regional Hero Section */}
        <div id="overview">
          <RegionalHero region={region} />
        </div>

        {/* Sticky Section Navigation Bar */}
        <RegionalNavigation />

        {/* Discovery Categories ("What can you discover?") */}
        <DiscoveryCategories region={region} />

        {/* Featured Stories — real content or preparation state */}
        <FeaturedStorySection region={region} />

        {/* Timeline Section */}
        <RegionalTimelinePreview region={region} />

        {/* Interconnected Stories Section */}
        <RegionalConnections region={region} />

        {/* Explore Further Navigation */}
        <RegionalExploreFurther currentRegion={region} />

        {/* Editorial Footer CTA */}
        <RegionalFooterCTA />
      </main>

      <Footer />
    </div>
  );
}

export default RegionalExplorerPage;
