import { Link } from 'react-router-dom';

export function RegionalFooterCTA() {
  return (
    <section className="bg-[#1e1b4b] text-amber-50 border-t border-amber-950 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-6 relative z-10">
        <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800/60">
          Continuous Archival Curation
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-amber-100 tracking-tight leading-tight">
          One region is only the beginning.
        </h2>

        <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          India holds thousands of stories across centuries of people, places, events, and movements — and we are only beginning to uncover them.
        </p>

        <div className="pt-4 flex items-center justify-center space-x-4">
          <Link
            to="/india"
            className="px-8 py-3.5 bg-amber-400 text-[#1e1b4b] hover:bg-amber-300 font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-md flex items-center space-x-2"
          >
            <span>Explore Interactive India Map</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
