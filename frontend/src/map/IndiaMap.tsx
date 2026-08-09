import React, { useMemo } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';
import indiaRuntimeGeoJSON from './data/india_states_runtime.json';
import { getCanonicalRegionFromFeature } from './regionMapping';
import type { GeoFeatureProperties, IndiaMapProps } from './types';

/**
 * Pure, isolated geographic India map component.
 * Renders state geometries from preprocessed runtime GeoJSON asset.
 */
export const IndiaMap: React.FC<IndiaMapProps> = ({
  selectedRegionId = null,
  onRegionHover,
  onRegionClick,
  className = '',
}) => {
  const normalizedSelectedId = useMemo(() => {
    if (!selectedRegionId) return null;
    const clean = selectedRegionId.toUpperCase().trim();
    return clean.startsWith('IN-') ? clean : `IN-${clean}`;
  }, [selectedRegionId]);

  return (
    <div className={`relative w-full h-full min-h-[500px] flex items-center justify-center overflow-hidden rounded-xl bg-[#F5EFE6] border border-[#E2D9CC] shadow-inner select-none ${className}`}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1000,
          center: [82.0, 22.0],
        }}
        width={800}
        height={700}
        className="w-full h-full max-h-[750px] focus:outline-none"
      >
        <Geographies geography={indiaRuntimeGeoJSON}>
          {({ geographies }: { geographies: any[] }) =>
            geographies.map((geo: any) => {
              const props = geo.properties as GeoFeatureProperties;
              const region = getCanonicalRegionFromFeature(props);
              const regionId = region ? region.id : (props.ISO || `IN-${props.ID_1}`);
              const isSelected = Boolean(regionId && regionId === normalizedSelectedId);
              const displayName = region ? region.name : props.NAME_1;

              // Calculate geographic centroid using d3-geo
              let centroid: [number, number] | null = null;
              try {
                const c = geoCentroid(geo);
                if (c && !isNaN(c[0]) && !isNaN(c[1])) {
                  centroid = [c[0], c[1]];
                }
              } catch {
                centroid = null;
              }

              // State abbreviation label (e.g., 'MH', 'RJ', 'WB')
              const stateAbbr = regionId ? regionId.replace('IN-', '') : '';

              return (
                <React.Fragment key={geo.rsmKey || props.ID_1}>
                  <Geography
                    geography={geo}
                    tabIndex={0}
                    role="button"
                    aria-label={`${displayName}${region?.isUnionTerritory ? ' (Union Territory)' : ''}`}
                    aria-pressed={isSelected}
                    onMouseEnter={(e: React.MouseEvent) => {
                      if (regionId && onRegionHover) {
                        onRegionHover(regionId, { x: e.clientX, y: e.clientY });
                      }
                    }}
                    onMouseLeave={() => {
                      if (onRegionHover) onRegionHover(null, null);
                    }}
                    onClick={() => {
                      if (regionId && onRegionClick) onRegionClick(regionId);
                    }}
                    onFocus={() => {
                      if (regionId && onRegionHover) onRegionHover(regionId, null);
                    }}
                    onBlur={() => {
                      if (onRegionHover) onRegionHover(null, null);
                    }}
                    onKeyDown={(e: React.KeyboardEvent) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (regionId && onRegionClick) onRegionClick(regionId);
                      }
                    }}
                    style={{
                      default: {
                        fill: isSelected ? '#D97706' : '#D1D5DB',
                        stroke: isSelected ? '#78350F' : '#312E81',
                        strokeWidth: isSelected ? 1.75 : 0.8,
                        outline: 'none',
                        transition: 'fill 0.15s ease, stroke 0.15s ease',
                      },
                      hover: {
                        fill: isSelected ? '#F59E0B' : '#3B82F6',
                        stroke: isSelected ? '#451A03' : '#1E1B4B',
                        strokeWidth: 1.5,
                        cursor: 'pointer',
                        outline: 'none',
                      },
                      pressed: {
                        fill: '#B45309',
                        stroke: '#451A03',
                        strokeWidth: 1.75,
                        outline: 'none',
                      },
                    }}
                  />

                  {/* Centroid Label Anchor for major states */}
                  {centroid && stateAbbr && !region?.isUnionTerritory && (
                    <Marker coordinates={centroid}>
                      <text
                        textAnchor="middle"
                        alignmentBaseline="central"
                        className="text-[9px] font-sans font-bold pointer-events-none fill-slate-800 tracking-wider"
                        style={{
                          textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 3px rgba(255,255,255,0.8)',
                          pointerEvents: 'none',
                        }}
                      >
                        {stateAbbr}
                      </text>
                    </Marker>
                  )}
                </React.Fragment>
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default IndiaMap;
