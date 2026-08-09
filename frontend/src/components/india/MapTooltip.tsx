import type { RegionDetail } from '../../data/regions';

interface MapTooltipProps {
  region: RegionDetail | null;
  position: { x: number; y: number } | null;
}

export function MapTooltip({ region, position }: MapTooltipProps) {
  if (!region || !position) return null;

  return (
    <div
      className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full -mt-3 bg-[#1e1b4b] text-amber-100 text-xs rounded-xl p-3 shadow-xl border border-amber-500/40 backdrop-blur-md max-w-xs transition-opacity duration-150"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <div className="space-y-1.5">
        <div className="flex items-center justify-between space-x-3">
          <span className="font-serif font-bold text-sm text-amber-100">
            {region.name}
          </span>
          {region.isMvpAvailable ? (
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
              MVP Region
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px] border border-amber-500/30">
              Coming Soon
            </span>
          )}
        </div>

        {region.isMvpAvailable ? (
          <div className="space-y-1 pt-1 border-t border-indigo-900/80">
            <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider block">
              Available Categories:
            </span>
            <div className="flex flex-wrap gap-1">
              {region.availableCategories.map((cat) => (
                <span
                  key={cat}
                  className="px-1.5 py-0.5 rounded bg-indigo-950 text-amber-200 text-[10px] font-mono border border-indigo-800"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-[11px] text-stone-300 italic pt-1">
            Regional exploration stories currently being curated.
          </p>
        )}
      </div>
    </div>
  );
}
