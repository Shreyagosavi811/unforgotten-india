import { Link } from 'react-router-dom';
import type { RegionDetail } from '../../data/regions';

interface RegionalHeroProps {
  region: RegionDetail;
}

export function RegionalHero({ region }: RegionalHeroProps) {
  const handleScrollToCategories = () => {
    const el = document.getElementById('categories');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full bg-[#fcf8f2] border-b border-stone-300/80 parchment-texture py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Decorative Accent Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        {/* Breadcrumb Header */}
        <div className="flex items-center space-x-2 text-xs font-mono font-medium text-stone-500">
          <Link to="/" className="hover:text-amber-900 transition-colors">
            INDIA
          </Link>
          <span>/</span>
          <Link to="/india" className="hover:text-amber-900 transition-colors">
            REGIONS
          </Link>
          <span>/</span>
          <span className="text-amber-900 font-bold uppercase">{region.name}</span>
        </div>

        {/* Main Editorial Hero Header */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-md border border-amber-300/80 shadow-2xs">
              {region.code}
            </span>
            {region.capital && (
              <span className="text-xs font-medium text-stone-500 bg-white/80 px-2.5 py-1 rounded-md border border-stone-200">
                Capital: {region.capital}
              </span>
            )}
            {region.isMvpAvailable ? (
              <span className="text-xs font-mono text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-md border border-emerald-300/80 font-bold">
                MVP Region Prepared
              </span>
            ) : (
              <span className="text-xs font-mono text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-md border border-amber-300/80">
                Stories Coming Soon
              </span>
            )}
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-[#1e1b4b] tracking-tight leading-none">
            {region.name}
          </h1>

          <p className="font-serif text-lg sm:text-xl md:text-2xl text-amber-900/90 italic max-w-3xl leading-relaxed">
            "{region.tagline}"
          </p>

          <p className="text-sm sm:text-base text-slate-700 max-w-2xl leading-relaxed">
            {region.description}
          </p>
        </div>

        {/* Scroll CTA Action */}
        <div className="pt-4 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={handleScrollToCategories}
            className="px-6 py-3.5 bg-[#1e1b4b] text-amber-100 hover:bg-amber-900 hover:text-white rounded-xl font-semibold text-xs transition-colors shadow-sm flex items-center space-x-2 group"
          >
            <span>Explore Discovery Categories</span>
            <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
          </button>

          <Link
            to="/india"
            className="px-5 py-3.5 bg-white/90 text-stone-700 hover:bg-stone-100 border border-stone-300 rounded-xl font-medium text-xs transition-colors flex items-center space-x-1.5"
          >
            <span>← Return to India Map</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
