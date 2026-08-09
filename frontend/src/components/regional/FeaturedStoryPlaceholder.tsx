import { Link } from 'react-router-dom';
import type { RegionDetail } from '../../data/regions';

interface FeaturedStoryPlaceholderProps {
  region: RegionDetail;
}

export function FeaturedStoryPlaceholder({ region }: FeaturedStoryPlaceholderProps) {
  return (
    <section id="featured-stories" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <div className="bg-[#1e1b4b] text-amber-50 rounded-3xl p-8 sm:p-12 border border-amber-900/40 shadow-xl space-y-8 relative overflow-hidden">
        {/* Background Subtle Texture Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-mono font-semibold uppercase tracking-wider">
            <span>Featured Editorial Story</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-amber-100 leading-tight">
            Stories deserve to be experienced, not simply read.
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            The first curated historical and cultural stories for <span className="text-amber-300 font-semibold">{region.name}</span> are currently being researched and prepared for publication.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10 pt-2">
          <div className="bg-amber-950/40 border border-amber-800/30 rounded-xl p-4 space-y-2">
            <span className="text-amber-400 text-xs font-mono font-bold uppercase">01 / Audio</span>
            <h4 className="font-serif text-base font-bold text-stone-100">Narrated Voices</h4>
            <p className="text-xs text-stone-400">Listen to immersive, spoken historical narrations in regional dialects.</p>
          </div>

          <div className="bg-amber-950/40 border border-amber-800/30 rounded-xl p-4 space-y-2">
            <span className="text-amber-400 text-xs font-mono font-bold uppercase">02 / Visuals</span>
            <h4 className="font-serif text-base font-bold text-stone-100">Reconstructions</h4>
            <p className="text-xs text-stone-400">Explore visual reconstructions of ancient forts, ports, and shrines.</p>
          </div>

          <div className="bg-amber-950/40 border border-amber-800/30 rounded-xl p-4 space-y-2">
            <span className="text-amber-400 text-xs font-mono font-bold uppercase">03 / Chronology</span>
            <h4 className="font-serif text-base font-bold text-stone-100">Timeline Tracing</h4>
            <p className="text-xs text-stone-400">Follow key events across ancient, medieval, and modern eras.</p>
          </div>

          <div className="bg-amber-950/40 border border-amber-800/30 rounded-xl p-4 space-y-2">
            <span className="text-amber-400 text-xs font-mono font-bold uppercase">04 / Evidence</span>
            <h4 className="font-serif text-base font-bold text-stone-100">Primary Evidence</h4>
            <p className="text-xs text-stone-400">Examine primary inscriptions, coins, travelogues, and oral archives.</p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-amber-900/50 relative z-10">
          <span className="text-xs font-mono text-amber-300/80">
            Curated archive release: Phase 4
          </span>

          <Link
            to="/india"
            className="px-5 py-2.5 bg-amber-400 text-[#1e1b4b] hover:bg-amber-300 font-semibold text-xs rounded-xl transition-colors flex items-center space-x-1.5 shadow-sm"
          >
            <span>Explore another region</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
