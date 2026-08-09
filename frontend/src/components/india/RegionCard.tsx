import { Link } from 'react-router-dom';
import type { RegionDetail } from '../../data/regions';

interface RegionCardProps {
  region: RegionDetail;
}

export function RegionCard({ region }: RegionCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md hover:border-amber-700/40 transition-all duration-200 flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
            {region.code}
          </span>
          <span className="text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            MVP Active Region
          </span>
        </div>

        <div>
          <h3 className="font-serif text-2xl font-bold text-[#1e1b4b]">
            {region.name}
          </h3>
          <p className="font-serif text-xs text-amber-900 italic font-medium mt-0.5">
            "{region.tagline}"
          </p>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {region.description}
        </p>

        <div className="pt-2 border-t border-stone-100 space-y-1">
          <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block">
            Featured Categories:
          </span>
          <div className="flex flex-wrap gap-1">
            {region.availableCategories.map((cat) => (
              <span
                key={cat}
                className="px-1.5 py-0.5 bg-stone-100 text-stone-700 text-[10px] font-mono rounded"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-2">
        <Link
          to={`/india/${region.id}`}
          className="w-full py-2.5 px-4 bg-[#1e1b4b] text-amber-100 hover:bg-amber-900 hover:text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center space-x-2 group"
        >
          <span>Explore {region.name}</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
}
