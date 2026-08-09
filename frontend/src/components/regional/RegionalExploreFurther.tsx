import { Link } from 'react-router-dom';
import { getMvpRegions } from '../../data/regions';
import type { RegionDetail } from '../../data/regions';

interface RegionalExploreFurtherProps {
  currentRegion: RegionDetail;
}

export function RegionalExploreFurther({ currentRegion }: RegionalExploreFurtherProps) {
  const mvpRegions = getMvpRegions().filter((r) => r.id !== currentRegion.id);

  return (
    <section id="explore-further" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-900">
            Geographic Navigation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1e1b4b]">
            Explore Further
          </h2>
        </div>
        <Link
          to="/india"
          className="text-xs font-semibold text-amber-900 hover:text-[#1e1b4b] flex items-center space-x-1"
        >
          <span>View Interactive India Map</span>
          <span>→</span>
        </Link>
      </div>

      {/* Other Prepared Regions Shortcuts */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider">
          Other Prepared MVP Regions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {mvpRegions.map((reg) => (
            <Link
              key={reg.id}
              to={`/india/${reg.id}`}
              className="bg-white/80 border border-stone-200 rounded-xl p-3.5 space-y-1 hover:border-amber-400 hover:shadow-2xs transition-all group"
            >
              <span className="text-[10px] font-mono font-bold text-amber-900 block group-hover:text-amber-700">
                {reg.code}
              </span>
              <h4 className="font-serif text-sm font-bold text-[#1e1b4b] truncate">
                {reg.name}
              </h4>
            </Link>
          ))}
        </div>
      </div>

      {/* Structural Category Exploration Links */}
      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="font-serif text-lg font-bold text-[#1e1b4b]">
          National Discovery Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          {['People', 'Places', 'Events', 'Movements', 'Stories', 'Folklore'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                const el = document.getElementById('categories');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3.5 py-1.5 bg-white border border-stone-300 hover:border-amber-400 rounded-lg text-xs font-medium text-slate-700 hover:text-amber-900 transition-colors shadow-2xs"
            >
              Explore {cat} →
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
