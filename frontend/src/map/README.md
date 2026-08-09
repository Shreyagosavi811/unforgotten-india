# Unforgotten India — Isolated Map Foundation Module

This module provides a clean, self-contained, isolated geographic map component for **Unforgotten India**, rendering Indian state and territory geometries from a preprocessed runtime GeoJSON asset.

---

## 1. Data Provenance & Terminology

- **Source Geographic Dataset**: BharatVerse `india_states.geojson` (originally derived from GADM administrative boundaries).
- **Processing Pipeline**: `BharatVerse source GeoJSON` → `Validation & Canonical Mapping` → `Douglas-Peucker Simplification & Coordinate Quantization` → `Optimized Runtime Asset`.
- **Runtime Asset**: `frontend/src/map/data/india_states_runtime.json`.

---

## 2. GeoJSON Schema & Inspection

- **Format**: GeoJSON `FeatureCollection` containing 35 features.
- **Geometry Types**: 18 `Polygon` geometries and 17 `MultiPolygon` geometries.
- **Feature Properties**:
  - `ID_0` (`number`): Country identifier (105 for India).
  - `ISO` (`string`): Country ISO code (`IND`).
  - `NAME_0` (`string`): Country name (`India`).
  - `ID_1` (`number`): Primary state feature identifier (1 to 35).
  - `NAME_1` (`string`): State / Territory name in source dataset.
  - `TYPE_1` (`string`): Administrative category (`State`, `Union Territor`).
  - `ENGTYPE_1` (`string`): English administrative category (`State`, `Union Territory`).

---

## 3. Optimization Metrics

| Metric | Source GeoJSON | Runtime GeoJSON Asset | Reduction |
| :--- | :--- | :--- | :--- |
| **File Size** | 21.90 MB (22,967,685 bytes) | **0.80 MB** (835,468 bytes) | **96.36%** |
| **Feature Count** | 35 features | 35 features | 0% (Preserved) |
| **Total Vertices** | 524,966 points | **46,583 points** | **91.13%** |
| **Precision** | Floating point | Quantized to 4 decimal places (~11m accuracy) | N/A |

### Optimization Method
Preprocessed using `scripts/preprocess_geojson.js`:
1. Douglas-Peucker point-reduction with a squared tolerance of `0.00005` degrees squared (~700m threshold).
2. Quantized latitude and longitude coordinates to 4 decimal places.
3. Pruned non-essential GADM metadata attributes (`VARNAME_1`, `NL_NAME_1`, `HASC_1`, etc.).

---

## 4. Canonical Region Identifiers (`IN-XX`)

The application maps source GeoJSON features to stable ISO 3166-2:IN canonical identifiers in `regionMapping.ts`:

| Source `ID_1` | Source `NAME_1` | Canonical ID (`id`) | Normalized Display Name (`name`) |
| :---: | :--- | :---: | :--- |
| 1 | Andaman and Nicobar | `IN-AN` | Andaman & Nicobar Islands |
| 2 | Andhra Pradesh | `IN-AP` | Andhra Pradesh |
| 3 | Arunachal Pradesh | `IN-AR` | Arunachal Pradesh |
| 4 | Assam | `IN-AS` | Assam |
| 5 | Bihar | `IN-BR` | Bihar |
| 6 | Chandigarh | `IN-CH` | Chandigarh |
| 7 | Chhattisgarh | `IN-CT` | Chhattisgarh |
| 8 | Dadra and Nagar Haveli | `IN-DH` | Dadra & Nagar Haveli and Daman & Diu |
| 9 | Daman and Diu | `IN-DH` | Dadra & Nagar Haveli and Daman & Diu |
| 10 | Delhi | `IN-DL` | Delhi |
| 11 | Goa | `IN-GA` | Goa |
| 12 | Gujarat | `IN-GJ` | Gujarat |
| 13 | Haryana | `IN-HR` | Haryana |
| 14 | Himachal Pradesh | `IN-HP` | Himachal Pradesh |
| 15 | Jammu and Kashmir | `IN-JK` | Jammu & Kashmir |
| 16 | Jharkhand | `IN-JH` | Jharkhand |
| 17 | Karnataka | `IN-KA` | Karnataka |
| 18 | Kerala | `IN-KL` | Kerala |
| 19 | Lakshadweep | `IN-LD` | Lakshadweep |
| 20 | Madhya Pradesh | `IN-MP` | Madhya Pradesh |
| 21 | Maharashtra | `IN-MH` | Maharashtra |
| 22 | Manipur | `IN-MN` | Manipur |
| 23 | Meghalaya | `IN-ML` | Meghalaya |
| 24 | Mizoram | `IN-MZ` | Mizoram |
| 25 | Nagaland | `IN-NL` | Nagaland |
| 26 | Orissa | `IN-OD` | Odisha |
| 27 | Puducherry | `IN-PY` | Puducherry |
| 28 | Punjab | `IN-PB` | Punjab |
| 29 | Rajasthan | `IN-RJ` | Rajasthan |
| 30 | Sikkim | `IN-SK` | Sikkim |
| 31 | Tamil Nadu | `IN-TN` | Tamil Nadu |
| 32 | Tripura | `IN-TR` | Tripura |
| 33 | Uttar Pradesh | `IN-UP` | Uttar Pradesh |
| 34 | Uttaranchal | `IN-UK` | Uttarakhand |
| 35 | West Bengal | `IN-WB` | West Bengal |

---

## 5. Geographic Dataset Limitations

- **Telangana Boundary**: The source GeoJSON feature 2 ("Andhra Pradesh") includes the geometry of Telangana (pre-2014 state reorganization).
- **Ladakh Boundary**: The source GeoJSON feature 15 ("Jammu and Kashmir") includes the geometry of Ladakh (pre-2019 reorganisational status).
- **Naming Standardization**: Source features `Orissa` and `Uttaranchal` are mapped to modern canonical names `Odisha` and `Uttarakhand`.
- **Union Territory Mergers**: `Dadra and Nagar Haveli` (ID_1: 8) and `Daman and Diu` (ID_1: 9) are mapped to unified canonical ID `IN-DH`.

---

## 6. Usage & Module API

```tsx
import { IndiaMap } from '@/map';

function MapContainer() {
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>('IN-MH');

  return (
    <IndiaMap
      selectedRegionId={selectedRegionId}
      onRegionHover={(regionId) => console.log('Hovered:', regionId)}
      onRegionClick={(regionId) => setSelectedRegionId(regionId)}
    />
  );
}
```

### Keyboard & Touch Accessibility
- **Keyboard Navigation**: Each state polygon is focusable via `Tab`. Pressing `Enter` or `Space` triggers `onRegionClick(id)`. Focus triggers `onRegionHover(id)`.
- **Touch / Mobile**: Tap gestures trigger selection and hover callbacks seamlessly.

---

## 7. Guidelines for Future Asset Replacement

If replacing the geographic source asset in the future:
1. Store raw source GeoJSON outside the client bundle.
2. Run `node scripts/preprocess_geojson.js` to simplify geometry and generate `india_states_runtime.json`.
3. Update feature-to-ISO mappings in `frontend/src/map/regionMapping.ts`.
4. Run `npm run build` to verify payload size and TypeScript types.
