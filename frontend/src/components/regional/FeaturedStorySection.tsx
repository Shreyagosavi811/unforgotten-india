import { Link } from 'react-router-dom';
import type { RegionDetail } from '../../data/regions';
import { getStoriesByRegion } from '../../data/stories/index';

const CLASSIFICATION_BADGE: Record<string, { label: string; classes: string }> = {
  HISTORICAL_EVIDENCE: { label: 'Historical Evidence', classes: 'text-emerald-100 bg-emerald-900/60 border-emerald-700/50' },
  HISTORICAL_DEBATE: { label: 'Historical Debate', classes: 'text-blue-100 bg-blue-900/60 border-blue-700/50' },
  FOLKLORE: { label: 'Folklore', classes: 'text-amber-200 bg-amber-900/60 border-amber-700/50' },
  ORAL_TRADITION: { label: 'Oral Tradition', classes: 'text-amber-200 bg-amber-900/60 border-amber-700/50' },
};

interface FeaturedStorySectionProps {
  region: RegionDetail;
}

export function FeaturedStorySection({ region }: FeaturedStorySectionProps) {
  const stories = getStoriesByRegion(region.id);

  // If no real stories exist, show the preparation state
  if (stories.length === 0) {
    return (
      <section id="featured-stories" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
        <div className="bg-[#1e1b4b] text-amber-50 rounded-3xl p-8 sm:p-12 border border-amber-900/40 shadow-xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-500/40">
              Featured Stories
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-100 leading-tight">
              Stories deserve to be experienced, not simply read.
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed">
              Curated stories for <span className="text-amber-300 font-semibold">{region.name}</span> are being researched and prepared for publication.
            </p>
          </div>
          <div className="pt-4 flex items-center gap-4 border-t border-amber-900/50 relative z-10">
            <Link to="/india" className="px-5 py-2.5 bg-amber-400 text-[#1e1b4b] hover:bg-amber-300 font-semibold text-xs rounded-xl transition-colors">
              Explore another region →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const featured = stories[0];
  const otherStories = stories.slice(1);
  const featuredBadge = CLASSIFICATION_BADGE[featured.classification];

  return (
    <section id="featured-stories" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 scroll-mt-24">
      {/* Featured Story — Cinematic Card */}
      <div className="bg-[#1e1b4b] text-amber-50 rounded-3xl p-8 sm:p-12 border border-amber-900/40 shadow-xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-500/40">
              Featured Story
            </span>
            {featuredBadge && (
              <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border ${featuredBadge.classes}`}>
                {featuredBadge.label}
              </span>
            )}
            {featured.historicalPeriod && (
              <span className="text-[10px] font-mono text-stone-400">
                {featured.historicalPeriod}
              </span>
            )}
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 leading-tight">
            {featured.title}
          </h2>

          {featured.subtitle && (
            <p className="font-serif text-base sm:text-lg text-amber-200/80 italic leading-relaxed">
              {featured.subtitle}
            </p>
          )}

          <p className="text-sm text-stone-300 leading-relaxed max-w-2xl">
            {featured.shortDescription}
          </p>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-amber-900/50 relative z-10">
          <span className="text-[10px] font-mono text-stone-400">
            {featured.estimatedReadingMinutes} min read · {featured.evidenceSources.length} sources cited
          </span>
          <Link
            to={`/story/${featured.slug}`}
            className="px-6 py-3 bg-amber-400 text-[#1e1b4b] hover:bg-amber-300 font-bold text-xs rounded-xl transition-colors flex items-center space-x-1.5 shadow-sm group"
          >
            <span>Read Full Story</span>
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>
      </div>

      {/* Other Stories Grid */}
      {otherStories.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
              More Stories from {region.name}
            </h3>
            <span className="text-[10px] font-mono text-stone-400">
              {stories.length} total
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {otherStories.map((story) => {
              const badge = CLASSIFICATION_BADGE[story.classification];
              return (
                <Link
                  key={story.id}
                  to={`/story/${story.slug}`}
                  className="bg-white border border-stone-200 rounded-2xl p-6 space-y-3 hover:border-amber-400 hover:shadow-lg transition-all group"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    {badge && (
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        story.classification === 'HISTORICAL_EVIDENCE' ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                        : story.classification === 'HISTORICAL_DEBATE' ? 'text-blue-800 bg-blue-50 border-blue-200'
                        : 'text-amber-800 bg-amber-50 border-amber-200'
                      }`}>
                        {badge.label}
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-stone-500">{story.estimatedReadingMinutes} min</span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#1e1b4b] group-hover:text-amber-900 transition-colors leading-snug">
                    {story.title}
                  </h4>
                  {story.subtitle && (
                    <p className="text-xs text-stone-500 italic line-clamp-2">{story.subtitle}</p>
                  )}
                  <div className="pt-2 border-t border-stone-100 text-[10px] font-mono text-amber-900 font-semibold">
                    Read Story →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
