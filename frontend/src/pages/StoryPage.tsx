import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { StorySectionRenderer } from '../components/story/StorySectionRenderer';
import { EvidencePanel } from '../components/story/EvidencePanel';
import { AudioNarration } from '../components/story/AudioNarration';
import { RelatedStories } from '../components/story/RelatedStories';
import { StoryAssistant } from '../components/story/StoryAssistant';
import { getStoryBySlug } from '../data/stories/index';
import { getRegionById } from '../data/regions';

import { StoryTimeline } from '../components/story/StoryTimeline';

const CLASSIFICATION_BADGE: Record<string, { label: string; classes: string }> = {
  HISTORICAL_EVIDENCE: { label: 'Historical Evidence', classes: 'text-emerald-100 bg-emerald-900/60 border-emerald-700/50' },
  HISTORICAL_DEBATE: { label: 'Historical Debate', classes: 'text-blue-100 bg-blue-900/60 border-blue-700/50' },
  FOLKLORE: { label: 'Folklore', classes: 'text-amber-200 bg-amber-900/60 border-amber-700/50' },
  ORAL_TRADITION: { label: 'Oral Tradition', classes: 'text-amber-200 bg-amber-900/60 border-amber-700/50' },
};

const CATEGORY_LABELS: Record<string, string> = {
  PEOPLE: 'People',
  PLACES: 'Places',
  EVENTS: 'Events',
  MOVEMENTS: 'Movements',
  STORIES: 'Stories',
  FOLKLORE: 'Folklore',
};

export function StoryPage() {
  const { storySlug } = useParams<{ storySlug: string }>();
  const story = storySlug ? getStoryBySlug(storySlug) : undefined;

  if (!story) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fcf8f2] text-[#0f172a]">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-300 text-amber-900 flex items-center justify-center text-3xl font-bold shadow-xs">
            📜
          </div>
          <div className="space-y-2 max-w-md">
            <span className="text-xs font-mono font-bold uppercase text-amber-900">Story Not Found</span>
            <h1 className="font-serif text-3xl font-bold text-[#1e1b4b]">Story Not Found</h1>
            <p className="text-xs text-slate-600">
              No curated story exists for slug <code className="bg-stone-200 px-1.5 py-0.5 rounded font-mono">{storySlug}</code>.
            </p>
          </div>
          <Link
            to="/india"
            className="px-6 py-3 bg-[#1e1b4b] text-amber-100 hover:bg-amber-900 rounded-xl font-semibold text-xs transition-colors"
          >
            ← Explore India
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const region = getRegionById(story.regionId);
  const badge = CLASSIFICATION_BADGE[story.classification];
  const categoryLabel = CATEGORY_LABELS[story.category] || story.category;

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf8f2] text-[#0f172a] selection:bg-amber-200 selection:text-amber-900">
      <Navbar />

      <main className="flex-1">
        {/* ── Cinematic Hero ───────────────────────────────────── */}
        <section className="relative bg-[#1e1b4b] text-amber-50 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/8 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto space-y-6 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-stone-400" aria-label="Story breadcrumb">
              <Link to="/" className="hover:text-amber-300 transition-colors">INDIA</Link>
              <span>/</span>
              {region && (
                <>
                  <Link to={`/india/${region.id}`} className="hover:text-amber-300 transition-colors">
                    {region.name.toUpperCase()}
                  </Link>
                  <span>/</span>
                  <Link to={`/india/${region.id}/${story.category}`} className="hover:text-amber-300 transition-colors">
                    {categoryLabel.toUpperCase()}
                  </Link>
                  <span>/</span>
                </>
              )}
              <span className="text-amber-300 font-bold truncate max-w-[200px]">{story.title.toUpperCase()}</span>
            </nav>

            {/* Classification + Category Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {badge && (
                <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border ${badge.classes}`}>
                  {badge.label}
                </span>
              )}
              <span className="text-[10px] font-mono font-bold text-amber-300/80 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-800/40">
                {categoryLabel}
              </span>
              {story.historicalPeriod && (
                <span className="text-[10px] font-mono text-stone-400 bg-stone-800/50 px-2.5 py-1 rounded-lg border border-stone-700/40">
                  {story.historicalPeriod}
                </span>
              )}
              <span className="text-[10px] font-mono text-stone-500">
                {story.estimatedReadingMinutes} min read
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-amber-50 tracking-tight leading-tight">
              {story.title}
            </h1>

            {/* Subtitle */}
            {story.subtitle && (
              <p className="font-serif text-lg sm:text-xl text-amber-200/90 italic leading-relaxed max-w-3xl">
                {story.subtitle}
              </p>
            )}

            {/* Short Description */}
            <p className="text-sm text-stone-300 leading-relaxed max-w-2xl">
              {story.shortDescription}
            </p>
          </div>
        </section>

        {/* ── Audio Narration Bar ──────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
          <AudioNarration narration={story.audioNarration} storyTitle={story.title} />
        </div>

        {/* ── Story Narrative Body ──────────────────────────────── */}
        <article className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <StorySectionRenderer sections={story.narrativeSections} />
        </article>

        {/* ── Story Timeline ────────────────────────────────────── */}
        {story.timelineEntries && story.timelineEntries.length > 0 && (
          <StoryTimeline entries={story.timelineEntries} storyTitle={story.title} />
        )}

        {/* ── Evidence Panel ────────────────────────────────────── */}
        <EvidencePanel sources={story.evidenceSources} classification={story.classification} />

        {/* ── Ask the Story — AI Interpreter ───────────────────── */}
        <StoryAssistant story={story} />

        {/* ── Related Stories ───────────────────────────────────── */}
        <RelatedStories story={story} />

        {/* ── Explore Further Footer ───────────────────────────── */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="border-t border-stone-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            {region && (
              <Link
                to={`/india/${region.id}`}
                className="px-6 py-3 bg-[#1e1b4b] text-amber-100 hover:bg-amber-900 rounded-xl font-semibold text-xs transition-colors"
              >
                ← Back to {region.name}
              </Link>
            )}
            <Link
              to="/india"
              className="px-6 py-3 bg-white border border-stone-300 text-stone-700 hover:bg-stone-100 rounded-xl font-semibold text-xs transition-colors"
            >
              Explore India Map →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default StoryPage;
