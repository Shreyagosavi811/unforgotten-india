import type { GeoFeatureProperties, MapRegion } from './types';

/**
 * Static dictionary of canonical regions supported by the map module.
 */
export const CANONICAL_MAP_REGIONS: Record<string, MapRegion> = {
  'IN-AN': {
    id: 'IN-AN',
    name: 'Andaman & Nicobar Islands',
    geoFeatureId: '1',
    isUnionTerritory: true,
  },
  'IN-AP': {
    id: 'IN-AP',
    name: 'Andhra Pradesh',
    geoFeatureId: '2',
    isUnionTerritory: false,
    sourceNote: 'Source geometry covers pre-2014 Andhra Pradesh (including Telangana).',
  },
  'IN-AR': {
    id: 'IN-AR',
    name: 'Arunachal Pradesh',
    geoFeatureId: '3',
    isUnionTerritory: false,
  },
  'IN-AS': {
    id: 'IN-AS',
    name: 'Assam',
    geoFeatureId: '4',
    isUnionTerritory: false,
  },
  'IN-BR': {
    id: 'IN-BR',
    name: 'Bihar',
    geoFeatureId: '5',
    isUnionTerritory: false,
  },
  'IN-CH': {
    id: 'IN-CH',
    name: 'Chandigarh',
    geoFeatureId: '6',
    isUnionTerritory: true,
  },
  'IN-CT': {
    id: 'IN-CT',
    name: 'Chhattisgarh',
    geoFeatureId: '7',
    isUnionTerritory: false,
  },
  'IN-DH': {
    id: 'IN-DH',
    name: 'Dadra & Nagar Haveli and Daman & Diu',
    geoFeatureId: '8', // Maps both feature 8 and feature 9
    isUnionTerritory: true,
  },
  'IN-DL': {
    id: 'IN-DL',
    name: 'Delhi',
    geoFeatureId: '10',
    isUnionTerritory: true,
  },
  'IN-GA': {
    id: 'IN-GA',
    name: 'Goa',
    geoFeatureId: '11',
    isUnionTerritory: false,
  },
  'IN-GJ': {
    id: 'IN-GJ',
    name: 'Gujarat',
    geoFeatureId: '12',
    isUnionTerritory: false,
  },
  'IN-HR': {
    id: 'IN-HR',
    name: 'Haryana',
    geoFeatureId: '13',
    isUnionTerritory: false,
  },
  'IN-HP': {
    id: 'IN-HP',
    name: 'Himachal Pradesh',
    geoFeatureId: '14',
    isUnionTerritory: false,
  },
  'IN-JK': {
    id: 'IN-JK',
    name: 'Jammu & Kashmir',
    geoFeatureId: '15',
    isUnionTerritory: false,
    sourceNote: 'Source geometry covers pre-2019 Jammu & Kashmir (including Ladakh).',
  },
  'IN-JH': {
    id: 'IN-JH',
    name: 'Jharkhand',
    geoFeatureId: '16',
    isUnionTerritory: false,
  },
  'IN-KA': {
    id: 'IN-KA',
    name: 'Karnataka',
    geoFeatureId: '17',
    isUnionTerritory: false,
  },
  'IN-KL': {
    id: 'IN-KL',
    name: 'Kerala',
    geoFeatureId: '18',
    isUnionTerritory: false,
  },
  'IN-LD': {
    id: 'IN-LD',
    name: 'Lakshadweep',
    geoFeatureId: '19',
    isUnionTerritory: true,
  },
  'IN-MP': {
    id: 'IN-MP',
    name: 'Madhya Pradesh',
    geoFeatureId: '20',
    isUnionTerritory: false,
  },
  'IN-MH': {
    id: 'IN-MH',
    name: 'Maharashtra',
    geoFeatureId: '21',
    isUnionTerritory: false,
  },
  'IN-MN': {
    id: 'IN-MN',
    name: 'Manipur',
    geoFeatureId: '22',
    isUnionTerritory: false,
  },
  'IN-ML': {
    id: 'IN-ML',
    name: 'Meghalaya',
    geoFeatureId: '23',
    isUnionTerritory: false,
  },
  'IN-MZ': {
    id: 'IN-MZ',
    name: 'Mizoram',
    geoFeatureId: '24',
    isUnionTerritory: false,
  },
  'IN-NL': {
    id: 'IN-NL',
    name: 'Nagaland',
    geoFeatureId: '25',
    isUnionTerritory: false,
  },
  'IN-OD': {
    id: 'IN-OD',
    name: 'Odisha',
    geoFeatureId: '26',
    isUnionTerritory: false,
    sourceNote: 'Source feature named "Orissa".',
  },
  'IN-PY': {
    id: 'IN-PY',
    name: 'Puducherry',
    geoFeatureId: '27',
    isUnionTerritory: true,
  },
  'IN-PB': {
    id: 'IN-PB',
    name: 'Punjab',
    geoFeatureId: '28',
    isUnionTerritory: false,
  },
  'IN-RJ': {
    id: 'IN-RJ',
    name: 'Rajasthan',
    geoFeatureId: '29',
    isUnionTerritory: false,
  },
  'IN-SK': {
    id: 'IN-SK',
    name: 'Sikkim',
    geoFeatureId: '30',
    isUnionTerritory: false,
  },
  'IN-TN': {
    id: 'IN-TN',
    name: 'Tamil Nadu',
    geoFeatureId: '31',
    isUnionTerritory: false,
  },
  'IN-TR': {
    id: 'IN-TR',
    name: 'Tripura',
    geoFeatureId: '32',
    isUnionTerritory: false,
  },
  'IN-UP': {
    id: 'IN-UP',
    name: 'Uttar Pradesh',
    geoFeatureId: '33',
    isUnionTerritory: false,
  },
  'IN-UK': {
    id: 'IN-UK',
    name: 'Uttarakhand',
    geoFeatureId: '34',
    isUnionTerritory: false,
    sourceNote: 'Source feature named "Uttaranchal".',
  },
  'IN-WB': {
    id: 'IN-WB',
    name: 'West Bengal',
    geoFeatureId: '35',
    isUnionTerritory: false,
  },
};

/**
 * Mapping from GeoJSON ID_1 or NAME_1 to canonical ISO region code (IN-XX)
 */
const FEATURE_ID_TO_CANONICAL: Record<number, string> = {
  1: 'IN-AN',
  2: 'IN-AP',
  3: 'IN-AR',
  4: 'IN-AS',
  5: 'IN-BR',
  6: 'IN-CH',
  7: 'IN-CT',
  8: 'IN-DH', // Dadra & Nagar Haveli
  9: 'IN-DH', // Daman & Diu
  10: 'IN-DL',
  11: 'IN-GA',
  12: 'IN-GJ',
  13: 'IN-HR',
  14: 'IN-HP',
  15: 'IN-JK',
  16: 'IN-JH',
  17: 'IN-KA',
  18: 'IN-KL',
  19: 'IN-LD',
  20: 'IN-MP',
  21: 'IN-MH',
  22: 'IN-MN',
  23: 'IN-ML',
  24: 'IN-MZ',
  25: 'IN-NL',
  26: 'IN-OD', // Orissa -> Odisha
  27: 'IN-PY',
  28: 'IN-PB',
  29: 'IN-RJ',
  30: 'IN-SK',
  31: 'IN-TN',
  32: 'IN-TR',
  33: 'IN-UP',
  34: 'IN-UK', // Uttaranchal -> Uttarakhand
  35: 'IN-WB',
};

/**
 * Resolves a GeoJSON feature's properties to a normalized MapRegion object.
 */
export function getCanonicalRegionFromFeature(props: GeoFeatureProperties): MapRegion | null {
  if (!props) return null;
  const canonicalId = FEATURE_ID_TO_CANONICAL[props.ID_1];
  if (canonicalId && CANONICAL_MAP_REGIONS[canonicalId]) {
    return CANONICAL_MAP_REGIONS[canonicalId];
  }
  return null;
}

/**
 * Resolves a canonical ISO region ID to a MapRegion object.
 */
export function getCanonicalRegionById(id: string): MapRegion | undefined {
  if (!id) return undefined;
  const cleanId = id.toUpperCase().trim();
  const formattedId = cleanId.startsWith('IN-') ? cleanId : `IN-${cleanId}`;
  return CANONICAL_MAP_REGIONS[formattedId];
}

/**
 * Returns all canonical regions mapped by the module.
 */
export function getAllCanonicalRegions(): MapRegion[] {
  return Object.values(CANONICAL_MAP_REGIONS);
}
