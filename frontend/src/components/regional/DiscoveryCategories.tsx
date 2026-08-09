import { Link } from 'react-router-dom';
import { REGIONAL_CATEGORIES } from '../../data/regionalCategories';
import { getCategoryStoryCount } from '../../data/stories/index';
import type { RegionDetail } from '../../data/regions';

interface DiscoveryCategoriesProps {
  region: RegionDetail;
}

export function DiscoveryCategories({ region }: DiscoveryCategoriesProps) {
  return (
    <section id="categories" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-900">
            Regional Discovery Hub
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1e1b4b]">
            What can you discover?
          </h2>
        </div>
        <p className="text-xs text-stone-500 max-w-md">
          Six core structural categories for exploring regional history, heritage, and oral traditions.
        </p>
      </div>

      {/* Grid of 6 Discovery Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REGIONAL_CATEGORIES.map((cat) => {
          const storyCount = getCategoryStoryCount(cat.id, region.id);
          const hasStories = storyCount > 0;

          return (
            <Link
              key={cat.id}
              to={`/india/${region.id}/${cat.id}`}
              className="bg-white/80 border border-stone-200/90 rounded-2xl p-6 space-y-4 hover:border-amber-400/80 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold tracking-wider uppercase text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                    {cat.id}
                  </span>
                  {hasStories ? (
                    <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {storyCount} {storyCount === 1 ? 'story' : 'stories'}
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                      Coming Soon
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-xl font-bold text-[#1e1b4b] group-hover:text-amber-900 transition-colors">
                  {cat.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-amber-900 font-medium flex items-center space-x-1 group-hover:translate-x-0.5 transition-transform">
                  <span>{hasStories ? 'Explore Stories' : 'View Category'}</span>
                  <span>→</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
