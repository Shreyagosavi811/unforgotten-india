import { Link } from 'react-router-dom';
import type { RegionDetail } from '../../data/regions';

interface RegionPanelProps {
  selectedRegion: RegionDetail | null;
  onClose?: () => void;
}

export function RegionPanel({ selectedRegion, onClose }: RegionPanelProps) {
  if (!selectedRegion) {
    return (
      <div className="bg-white/90 border border-stone-200/90 rounded-2xl p-6 shadow-sm backdrop-blur-sm space-y-3 text-center">
        <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-lg mx-auto">
          📍
        </div>
        <h3 className="font-serif text-lg font-bold text-[#1e1b4b]">
          Select a Region on the Map
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Hover over or click any Indian state to preview its historical categories and cultural heritage.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-stone-300 rounded-2xl p-6 shadow-md space-y-5 relative transition-all duration-200">
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-md"
          aria-label="Close region panel"
        >
          ✕
        </button>
      )}

      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
            {selectedRegion.code}
          </span>
          {selectedRegion.capital && (
            <span className="text-xs text-stone-500 font-medium">
              Capital: {selectedRegion.capital}
            </span>
          )}
        </div>
        <h3 className="font-serif text-3xl font-bold text-[#1e1b4b]">
          {selectedRegion.name}
        </h3>
        <p className="font-serif text-xs text-amber-900 italic font-medium">
          "{selectedRegion.tagline}"
        </p>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-700 leading-relaxed">
        {selectedRegion.description}
      </p>

      {/* Categories / Availability */}
      <div className="space-y-2 pt-2 border-t border-stone-200">
        <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
          <span>Exploration Status:</span>
          <span className="font-mono font-bold text-amber-900">
            {selectedRegion.isMvpAvailable ? 'MVP Region Available' : 'Stories Coming Soon'}
          </span>
        </div>

        {selectedRegion.isMvpAvailable ? (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {selectedRegion.availableCategories.map((cat) => (
              <span
                key={cat}
                className="px-2 py-1 bg-amber-50 text-amber-900 text-[11px] font-mono font-semibold rounded border border-amber-200"
              >
                {cat}
              </span>
            ))}
          </div>
        ) : (
          <div className="p-3 bg-amber-50/60 border border-amber-200/60 rounded-lg text-xs text-amber-900">
            Stories and cultural research for {selectedRegion.name} are currently being curated for future release.
          </div>
        )}
      </div>

      {/* CTA Button */}
      <div className="pt-2">
        <Link
          to={`/india/${selectedRegion.id}`}
          className="w-full py-3 px-4 bg-[#1e1b4b] text-amber-100 hover:bg-amber-900 hover:text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-2 group"
        >
          <span>Explore {selectedRegion.name}</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </div>
  );
}
