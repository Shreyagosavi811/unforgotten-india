import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ALL_STORIES } from '../data/stories/index';
import { REGIONS_DATA } from '../data/regions';
import type { RegionalCategory, ContentClassification } from '../types/domain';

const CATEGORIES: { id: RegionalCategory; label: string }[] = [
  { id: 'PEOPLE', label: 'People' },
  { id: 'PLACES', label: 'Places' },
  { id: 'EVENTS', label: 'Events' },
  { id: 'MOVEMENTS', label: 'Movements' },
  { id: 'STORIES', label: 'Stories' },
  { id: 'FOLKLORE', label: 'Folklore' },
];

const CLASSIFICATION_BADGE: Record<string, { label: string; classes: string }> = {
  HISTORICAL_EVIDENCE: { label: 'Historical Evidence', classes: 'text-emerald-800 bg-emerald-50 border-emerald-200' },
  HISTORICAL_DEBATE: { label: 'Historical Debate', classes: 'text-blue-800 bg-blue-50 border-blue-200' },
  FOLKLORE: { label: 'Folklore', classes: 'text-amber-800 bg-amber-50 border-amber-200' },
  ORAL_TRADITION: { label: 'Oral Tradition', classes: 'text-amber-800 bg-amber-50 border-amber-200' },
};

export function StoriesDiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedClassification, setSelectedClassification] = useState<string>('ALL');

  const filteredStories = useMemo(() => {
    return ALL_STORIES.filter((story) => {
      // Region filter
      if (selectedRegion !== 'ALL' && story.regionId !== selectedRegion) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'ALL' && story.category !== selectedCategory) {
        return false;
      }
      // Classification filter
      if (selectedClassification !== 'ALL' && story.classification !== selectedClassification) {
        return false;
      }
      // Text query search
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = story.title.toLowerCase().includes(q);
        const matchesSub = story.subtitle?.toLowerCase().includes(q) ?? false;
        const matchesDesc = story.shortDescription.toLowerCase().includes(q);
        const matchesTags = story.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSub && !matchesDesc && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedRegion, selectedCategory, selectedClassification]);

  const activeRegions = useMemo(() => {
    const regionIds = Array.from(new Set(ALL_STORIES.map((s) => s.regionId)));
    return regionIds.map((id) => REGIONS_DATA[id] || { id, name: id, code: id }).filter(Boolean);
  }, []);

  function handleReset() {
    setSearchQuery('');
    setSelectedRegion('ALL');
    setSelectedCategory('ALL');
    setSelectedClassification('ALL');
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf8f2] text-[#0f172a] selection:bg-amber-200 selection:text-amber-900">
      <Navbar />

      <main className="flex-1">
        {/* Header Hero */}
        <section className="bg-white border-b border-stone-200 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-900">
                Digital Museum Index
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1e1b4b]">
                All Curated Stories
              </h1>
              <p className="text-sm text-stone-600 max-w-2xl leading-relaxed">
                Explore evidence-aware narratives, oral traditions, and cultural landmarks across India's diverse regions.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative max-w-xl">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stories by keyword, person, place, or tag..."
                className="w-full text-sm bg-[#fcf8f2] border border-stone-300 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
              <span className="absolute left-3.5 top-3.5 text-stone-400 text-sm" aria-hidden="true">
                🔍
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-xs font-mono text-stone-400 hover:text-stone-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="space-y-3 pt-2">
              {/* Region Filter */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono text-stone-500 font-bold uppercase text-[10px] w-20">Region:</span>
                <button
                  onClick={() => setSelectedRegion('ALL')}
                  className={`px-3 py-1 rounded-lg border font-mono transition-colors ${
                    selectedRegion === 'ALL'
                      ? 'bg-[#1e1b4b] text-amber-100 border-[#1e1b4b]'
                      : 'bg-white text-stone-600 border-stone-200 hover:border-amber-400'
                  }`}
                >
                  All Regions
                </button>
                {activeRegions.map((reg) => (
                  <button
                    key={reg.id}
                    onClick={() => setSelectedRegion(reg.id)}
                    className={`px-3 py-1 rounded-lg border font-mono transition-colors ${
                      selectedRegion === reg.id
                        ? 'bg-[#1e1b4b] text-amber-100 border-[#1e1b4b]'
                        : 'bg-white text-stone-600 border-stone-200 hover:border-amber-400'
                    }`}
                  >
                    {reg.name}
                  </button>
                ))}
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono text-stone-500 font-bold uppercase text-[10px] w-20">Category:</span>
                <button
                  onClick={() => setSelectedCategory('ALL')}
                  className={`px-3 py-1 rounded-lg border font-mono transition-colors ${
                    selectedCategory === 'ALL'
                      ? 'bg-[#1e1b4b] text-amber-100 border-[#1e1b4b]'
                      : 'bg-white text-stone-600 border-stone-200 hover:border-amber-400'
                  }`}
                >
                  All Categories
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 rounded-lg border font-mono transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-[#1e1b4b] text-amber-100 border-[#1e1b4b]'
                        : 'bg-white text-stone-600 border-stone-200 hover:border-amber-400'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Classification Filter */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono text-stone-500 font-bold uppercase text-[10px] w-20">Type:</span>
                <button
                  onClick={() => setSelectedClassification('ALL')}
                  className={`px-3 py-1 rounded-lg border font-mono transition-colors ${
                    selectedClassification === 'ALL'
                      ? 'bg-[#1e1b4b] text-amber-100 border-[#1e1b4b]'
                      : 'bg-white text-stone-600 border-stone-200 hover:border-amber-400'
                  }`}
                >
                  All Types
                </button>
                {[
                  { id: 'HISTORICAL_EVIDENCE', label: 'Historical Evidence' },
                  { id: 'HISTORICAL_DEBATE', label: 'Historical Debate' },
                  { id: 'FOLKLORE', label: 'Folklore' },
                  { id: 'ORAL_TRADITION', label: 'Oral Tradition' },
                ].map((cls) => (
                  <button
                    key={cls.id}
                    onClick={() => setSelectedClassification(cls.id)}
                    className={`px-3 py-1 rounded-lg border font-mono transition-colors ${
                      selectedClassification === cls.id
                        ? 'bg-[#1e1b4b] text-amber-100 border-[#1e1b4b]'
                        : 'bg-white text-stone-600 border-stone-200 hover:border-amber-400'
                    }`}
                  >
                    {cls.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Story Grid */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-stone-500">
              Showing {filteredStories.length} of {ALL_STORIES.length} stories
            </span>
            {(selectedRegion !== 'ALL' || selectedCategory !== 'ALL' || selectedClassification !== 'ALL' || searchQuery) && (
              <button
                onClick={handleReset}
                className="text-xs font-mono text-amber-900 hover:underline"
              >
                Reset all filters
              </button>
            )}
          </div>

          {filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStories.map((story) => {
                const badge = CLASSIFICATION_BADGE[story.classification];
                const reg = REGIONS_DATA[story.regionId];
                return (
                  <Link
                    key={story.id}
                    to={`/story/${story.slug}`}
                    className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-amber-400 hover:shadow-lg transition-all group"
                  >
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {badge && (
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${badge.classes}`}>
                            {badge.label}
                          </span>
                        )}
                        {reg && (
                          <span className="text-[10px] font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                            {reg.name}
                          </span>
                        )}
                      </div>
                      <h2 className="font-serif text-lg font-bold text-[#1e1b4b] group-hover:text-amber-900 transition-colors leading-snug">
                        {story.title}
                      </h2>
                      {story.subtitle && (
                        <p className="text-xs text-stone-500 italic">{story.subtitle}</p>
                      )}
                      <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                        {story.shortDescription}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 pt-4 border-t border-stone-100">
                      <span>{story.estimatedReadingMinutes} min read</span>
                      <span className="text-amber-900 font-semibold group-hover:translate-x-0.5 transition-transform">
                        Read Story →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="bg-stone-50 border border-dashed border-stone-300 rounded-2xl p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-900 mx-auto flex items-center justify-center font-serif text-xl font-bold">
                🔍
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="font-serif text-xl font-bold text-[#1e1b4b]">No Stories Match Your Filter</h3>
                <p className="text-xs text-stone-600">
                  Try broadening your search criteria or resetting filters to view all curated stories.
                </p>
              </div>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-[#1e1b4b] text-amber-100 rounded-xl text-xs font-semibold hover:bg-amber-900 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default StoriesDiscoveryPage;
