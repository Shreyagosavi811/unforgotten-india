import { IndiaMap as BaseIndiaMap } from '../../map';
import { getRegionById } from '../../data/regions';
import type { RegionDetail } from '../../data/regions';

interface IndiaMapWrapperProps {
  selectedRegionId: string | null;
  onSelectRegion: (region: RegionDetail) => void;
  onHoverRegion: (region: RegionDetail | null, position: { x: number; y: number } | null) => void;
}

export function IndiaMap({ selectedRegionId, onSelectRegion, onHoverRegion }: IndiaMapWrapperProps) {
  const handleRegionHover = (regionId: string | null, position?: { x: number; y: number } | null) => {
    if (!regionId) {
      onHoverRegion(null, null);
      return;
    }
    const region = getRegionById(regionId);
    if (region) {
      const pos = position || { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      onHoverRegion(region, pos);
    } else {
      onHoverRegion(null, null);
    }
  };

  const handleRegionClick = (regionId: string) => {
    const region = getRegionById(regionId);
    if (region) {
      onSelectRegion(region);
    }
  };

  return (
    <div className="relative w-full bg-[#fcf8f2] border border-stone-300/90 rounded-2xl shadow-sm overflow-hidden p-4 sm:p-6 parchment-texture space-y-3">
      {/* Map Legend / Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/80 pb-3 text-xs">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-sm bg-[#D97706] inline-block border border-amber-800" />
            <span className="text-slate-800 font-medium">Selected Region</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-sm bg-[#EBF1F5] inline-block border border-[#312E81]" />
            <span className="text-slate-700 font-medium">State / UT Boundary</span>
          </span>
        </div>
        <span className="text-stone-500 font-mono text-[11px]">
          GeoJSON Foundation • Click to Select Region
        </span>
      </div>

      {/* Pure Isolated GeoJSON Map */}
      <BaseIndiaMap
        selectedRegionId={selectedRegionId}
        onRegionHover={handleRegionHover}
        onRegionClick={handleRegionClick}
      />

      {/* Map Footer helper note */}
      <div className="text-center text-stone-500 text-[11px] font-medium pt-1">
        📍 Hover or tap any state to inspect region metadata • Click to view Explorer panel.
      </div>
    </div>
  );
}

export default IndiaMap;
