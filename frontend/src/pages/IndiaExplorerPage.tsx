import { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { IndiaMap } from '../components/india/IndiaMap';
import { MapTooltip } from '../components/india/MapTooltip';
import { RegionPanel } from '../components/india/RegionPanel';
import { CategoryExplorer } from '../components/india/CategoryExplorer';
import { RegionCard } from '../components/india/RegionCard';
import { getMvpRegions, getRegionById } from '../data/regions';
import type { RegionDetail } from '../data/regions';

export function IndiaExplorerPage() {
  const [selectedRegion, setSelectedRegion] = useState<RegionDetail | null>(getRegionById('IN-MH') || null);
  const [hoveredRegion, setHoveredRegion] = useState<RegionDetail | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const mvpRegions = getMvpRegions();

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf8f2] text-[#0f172a]">
      <Navbar />

      <main className="flex-1 space-y-16 pb-20">
        {/* Page Header */}
        <section className="pt-12 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-300">
                <span>Geographic Navigation Hub</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1e1b4b]">
                Explore India
              </h1>
              <p className="text-slate-600 text-base max-w-2xl">
                Choose a region. Discover the people, places, events and stories connected to it.
              </p>
            </div>

            <div className="px-4 py-2 bg-white border border-stone-300 rounded-xl text-xs font-medium text-slate-700 shadow-xs flex items-center space-x-2 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Exploration is free — no account required</span>
            </div>
          </div>
        </section>

        {/* Interactive Map & Selected Region Panel Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left/Main Column: India Map */}
            <div className="lg:col-span-8 space-y-4">
              <IndiaMap
                selectedRegionId={selectedRegion?.id || null}
                onSelectRegion={(reg) => setSelectedRegion(reg)}
                onHoverRegion={(reg, pos) => {
                  setHoveredRegion(reg);
                  setTooltipPos(pos);
                }}
              />
            </div>

            {/* Right Column: Selected Region Side Panel / Card */}
            <div className="lg:col-span-4 sticky top-24">
              <RegionPanel
                selectedRegion={selectedRegion}
                onClose={() => setSelectedRegion(null)}
              />
            </div>
          </div>
        </section>

        {/* Hover Tooltip */}
        <MapTooltip region={hoveredRegion} position={tooltipPos} />

        {/* Category Shortcuts Section */}
        <CategoryExplorer />

        {/* Featured MVP Regions Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                Active Cultural Hubs
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#1e1b4b]">
                Start with a region
              </h2>
            </div>
            <span className="text-xs font-mono text-stone-500">
              {mvpRegions.length} Regions Available in MVP
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mvpRegions.map((region) => (
              <RegionCard key={region.id} region={region} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default IndiaExplorerPage;
