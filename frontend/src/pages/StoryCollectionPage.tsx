import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { getRegionById } from '../data/regions';
import { getStoriesByCategory } from '../data/stories/index';
import type { RegionalCategory } from '../types/domain';

const VALID_CATEGORIES: RegionalCategory[] = ['PEOPLE', 'PLACES', 'EVENTS', 'MOVEMENTS', 'STORIES', 'FOLKLORE'];

const CATEGORY_META: Record<string, { title: string; description: string }> = {
  PEOPLE: { title: 'People', description: 'Individuals, scholars, reformers, leaders, and unsung figures connected to this region.' },
  PLACES: { title: 'Places', description: 'Historically, architecturally, and culturally significant landmarks and sites.' },
  EVENTS: { title: 'Events', description: 'Pivotal moments, turning points, and events that shaped the region\'s trajectory.' },
  MOVEMENTS: { title: 'Movements', description: 'Social, intellectual, artistic, labour, and political movements.' },
  STORIES: { title: 'Stories', description: 'Narrative-driven historical and cultural exploration experiences.' },
  FOLKLORE: { title: 'Folklore', description: 'Oral traditions, legends, folk arts, and regional storytelling traditions.' },
};

const CLASSIFICATION_BADGE: Record<string, { label: string; classes: string }> = {
  HISTORICAL_EVIDENCE: { label: 'Historical Evidence', classes: 'text-emerald-800 bg-emerald-50 border-emerald-200' },
  HISTORICAL_DEBATE: { label: 'Historical Debate', classes: 'text-blue-800 bg-blue-50 border-blue-200' },
  FOLKLORE: { label: 'Folklore', classes: 'text-amber-800 bg-amber-50 border-amber-200' },
  ORAL_TRADITION: { label: 'Oral Tradition', classes: 'text-amber-800 bg-amber-50 border-amber-200' },
};

export function StoryCollectionPage() {
  const { stateId, category } = useParams<{ stateId: string; category: string }>();
  const region = stateId ? getRegionById(stateId) : undefined;
  const normalizedCategory = (category || '').toUpperCase() as RegionalCategory;
  const isValidCategory = VALID_CATEGORIES.includes(normalizedCategory);
  const catMeta = CATEGORY_META[normalizedCategory];

  if (!region || !isValidCategory) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fcf8f2] text-[#0f172a]">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-300 text-amber-900 flex items-center justify-center text-3xl font-bold shadow-xs">
            🔍
          </div>
          <div className="space-y-2 max-w-md">
            <h1 className="font-serif text-3xl font-bold text-[#1e1b4b]">
              {!region ? 'Region Not Found' : 'Invalid Category'}
            </h1>
            <p className="text-xs text-slate-600">
              {!region
                ? `No region found for "${stateId}".`
                : `"${category}" is not a valid exploration category.`}
            </p>
          </div>
          <Link to="/india" className="px-6 py-3 bg-[#1e1b4b] text-amber-100 hover:bg-amber-900 rounded-xl font-semibold text-xs transition-colors">
            ← Explore India
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const stories = getStoriesByCategory(normalizedCategory, region.id);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf8f2] text-[#0f172a] selection:bg-amber-200 selection:text-amber-900">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-white border-b border-stone-200 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Breadcrumb */}
            <nav className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-stone-500">
              <Link to="/" className="hover:text-amber-900 transition-colors">INDIA</Link>
              <span>/</span>
              <Link to={`/india/${region.id}`} className="hover:text-amber-900 transition-colors">
                {region.name.toUpperCase()}
              </Link>
              <span>/</span>
              <span className="text-amber-900 font-bold">{catMeta.title.toUpperCase()}</span>
            </nav>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md border border-amber-300">
                  {region.code}
                </span>
                <span className="text-xs font-mono font-bold text-[#1e1b4b] bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
                  {catMeta.title}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1e1b4b]">
                {catMeta.title} of {region.name}
              </h1>

              <p className="text-sm text-stone-600 max-w-2xl leading-relaxed">
                {catMeta.description}
              </p>
            </div>
          </div>
        </section>

        {/* Story Grid or Empty State */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          {stories.length > 0 ? (
            <div className="space-y-6">
              <span className="text-xs font-mono text-stone-500">
                {stories.length} {stories.length === 1 ? 'story' : 'stories'} curated
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stories.map((story) => {
                  const badge = CLASSIFICATION_BADGE[story.classification];
                  return (
                    <Link
                      key={story.id}
                      to={`/story/${story.slug}`}
                      className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 hover:border-amber-400 hover:shadow-lg transition-all group"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        {badge && (
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${badge.classes}`}>
                            {badge.label}
                          </span>
                        )}
                        {story.historicalPeriod && (
                          <span className="text-[10px] font-mono text-stone-500">
                            {story.historicalPeriod}
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#1e1b4b] group-hover:text-amber-900 transition-colors leading-snug">
                        {story.title}
                      </h3>
                      {story.subtitle && (
                        <p className="text-xs text-stone-500 italic">{story.subtitle}</p>
                      )}
                      <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                        {story.shortDescription}
                      </p>
                      <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 pt-2 border-t border-stone-100">
                        <span>{story.estimatedReadingMinutes} min read</span>
                        <span className="text-amber-900 font-semibold group-hover:translate-x-0.5 transition-transform">
                          Read Story →
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-stone-50 border border-dashed border-stone-300 rounded-2xl p-8 sm:p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 border border-amber-300 text-amber-900 mx-auto flex items-center justify-center font-serif text-xl font-bold">
                📚
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="font-serif text-xl font-bold text-[#1e1b4b]">
                  Stories Being Curated
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {catMeta.title} stories for <span className="font-semibold text-amber-900">{region.name}</span> are currently being researched, verified, and prepared for publication.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Navigation Footer */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="border-t border-stone-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to={`/india/${region.id}`}
              className="px-6 py-3 bg-[#1e1b4b] text-amber-100 hover:bg-amber-900 rounded-xl font-semibold text-xs transition-colors"
            >
              ← Back to {region.name}
            </Link>
            <div className="flex flex-wrap gap-2">
              {VALID_CATEGORIES.filter((c) => c !== normalizedCategory).map((c) => (
                <Link
                  key={c}
                  to={`/india/${region.id}/${c}`}
                  className="px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-medium text-slate-700 hover:border-amber-400 hover:text-amber-900 transition-colors"
                >
                  {CATEGORY_META[c]?.title || c}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default StoryCollectionPage;
