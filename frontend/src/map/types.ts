/**
 * Geographic Types for Isolated India Map Module
 */

export interface MapRegion {
  /** Canonical ISO 3166-2:IN region identifier (e.g. 'IN-MH', 'IN-WB') */
  id: string;
  /** Display name of the region (e.g. 'Maharashtra', 'West Bengal') */
  name: string;
  /** Unique ID from source GeoJSON feature (ID_1) */
  geoFeatureId: string;
  /** Flag indicating if this is a Union Territory */
  isUnionTerritory: boolean;
  /** Optional historical/geographical note about boundary source mapping */
  sourceNote?: string;
}

export interface IndiaMapProps {
  /** Currently selected region ID (e.g. 'IN-MH') */
  selectedRegionId?: string | null;
  /** Hover callback returning canonical region ID and optional cursor position */
  onRegionHover?: (regionId: string | null, position?: { x: number; y: number } | null) => void;
  /** Click callback returning canonical region ID */
  onRegionClick?: (regionId: string) => void;
  /** Optional custom CSS container class */
  className?: string;
}

export interface GeoFeatureProperties {
  ID_0: number;
  ISO: string;
  NAME_0: string;
  ID_1: number;
  NAME_1: string;
  TYPE_1: string;
  ENGTYPE_1: string;
}

export interface GeoFeature {
  type: string;
  id: number;
  properties: GeoFeatureProperties;
  geometry: {
    type: string;
    coordinates: any[];
  };
}
