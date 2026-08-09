import { Link } from 'react-router-dom';
import type { Story } from '../../types/domain';
import { getRelatedStories } from '../../data/stories/index';
import { getRegionById } from '../../data/regions';

interface RelatedStoriesProps {
  story: Story;
}

const CLASSIFICATION_BADGE: Record<string, { label: string; classes: string }> = {
  HISTORICAL_EVIDENCE: { label: 'Historical Evidence', classes: 'text-emerald-800 bg-emerald-50 border-emerald-200' },
  HISTORICAL_DEBATE: { label: 'Historical Debate', classes: 'text-blue-800 bg-blue-50 border-blue-200' },
  FOLKLORE: { label: 'Folklore', classes: 'text-amber-800 bg-amber-50 border-amber-200' },
  ORAL_TRADITION: { label: 'Oral Tradition', classes: 'text-amber-800 bg-amber-50 border-amber-200' },
};

export function RelatedStories({ story }: RelatedStoriesProps) {
  const related = getRelatedStories(story);
  const relatedRegions = (story.relatedRegionIds || [])
    .map((id) => getRegionById(id))
    .filter(Boolean);

  if (related.length === 0 && relatedRegions.length === 0) return null;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 scroll-mt-24">
      <div className="border-t border-stone-200 pt-8 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-900">
            Connected Narratives
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1e1b4b]">
            This story connects to…
          </h2>
        </div>

        {/* Related Stories */}
        {related.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((r) => {
              const badge = CLASSIFICATION_BADGE[r.classification];
              const region = getRegionById(r.regionId);
              return (
                <Link
                  key={r.id}
                  to={`/story/${r.slug}`}
                  className="bg-white border border-stone-200 rounded-xl p-5 space-y-3 hover:border-amber-400 hover:shadow-md transition-all group"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    {badge && (
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${badge.classes}`}>
                        {badge.label}
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-stone-500">
                      {r.estimatedReadingMinutes} min read
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#1e1b4b] group-hover:text-amber-900 transition-colors leading-snug">
                    {r.title}
                  </h4>
                  <p className="text-xs text-stone-600 line-clamp-2">
                    {r.shortDescription}
                  </p>
                  {region && (
                    <span className="text-[10px] font-mono text-amber-900">
                      {region.name} →
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}

        {/* Related Regions */}
        {relatedRegions.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
              Connected Regions
            </h3>
            <div className="flex flex-wrap gap-2">
              {relatedRegions.map((reg) => reg && (
                <Link
                  key={reg.id}
                  to={`/india/${reg.id}`}
                  className="px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs font-medium text-slate-700 hover:border-amber-400 hover:text-amber-900 transition-colors"
                >
                  {reg.name} →
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
