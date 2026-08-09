const fs = require('fs');
const path = require('path');

const SOURCE_PATH = 'd:/ExpIND/bharatverse/public/data/india_states.geojson';
const OUTPUT_DIR = 'd:/Antigravity/unforgotten-india/frontend/src/map/data';
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'india_states_runtime.json');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('Reading source GeoJSON:', SOURCE_PATH);
const rawData = fs.readFileSync(SOURCE_PATH, 'utf8');
const originalSizeBytes = Buffer.byteLength(rawData, 'utf8');
const geojson = JSON.parse(rawData);

// 1. Calculate original metrics
let totalFeatures = geojson.features.length;
let originalVertices = 0;

function countVertices(geometry) {
  let count = 0;
  if (geometry.type === 'Polygon') {
    geometry.coordinates.forEach(ring => {
      count += ring.length;
    });
  } else if (geometry.type === 'MultiPolygon') {
    geometry.coordinates.forEach(polygon => {
      polygon.forEach(ring => {
        count += ring.length;
      });
    });
  }
  return count;
}

geojson.features.forEach(f => {
  originalVertices += countVertices(f.geometry);
});

console.log(`Original Metrics:`);
console.log(`- Size: ${(originalSizeBytes / (1024 * 1024)).toFixed(2)} MB (${originalSizeBytes} bytes)`);
console.log(`- Features: ${totalFeatures}`);
console.log(`- Total Vertices: ${originalVertices}`);

// 2. Simplification functions
// Perpendicular distance from point to line segment
function getSqSegDist(p, p1, p2) {
  let x = p1[0], y = p1[1];
  let dx = p2[0] - x, dy = p2[2] ? p2[1] - y : p2[1] - y;

  if (dx !== 0 || dy !== 0) {
    let t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
    if (t > 1) {
      x = p2[0];
      y = p2[1];
    } else if (t > 0) {
      x += dx * t;
      y += dy * t;
    }
  }

  dx = p[0] - x;
  dy = p[1] - y;

  return dx * dx + dy * dy;
}

// Douglas-Peucker simplification algorithm
function simplifyDPStep(points, first, last, sqTolerance, simplified) {
  let maxSqDist = sqTolerance;
  let index = -1;

  for (let i = first + 1; i < last; i++) {
    let sqDist = getSqSegDist(points[i], points[first], points[last]);
    if (sqDist > maxSqDist) {
      index = i;
      maxSqDist = sqDist;
    }
  }

  if (index > -1) {
    if (index - first > 1) simplifyDPStep(points, first, index, sqTolerance, simplified);
    simplified.push(points[index]);
    if (last - index > 1) simplifyDPStep(points, index, last, sqTolerance, simplified);
  }
}

function simplifyPoints(points, sqTolerance) {
  if (points.length <= 4) return points;
  let last = points.length - 1;
  let simplified = [points[0]];
  simplifyDPStep(points, 0, last, sqTolerance, simplified);
  simplified.push(points[last]);
  return simplified;
}

// Coordinate precision rounding (4 decimal places = approx 11m precision)
function roundCoord(c) {
  return [
    Math.round(c[0] * 10000) / 10000,
    Math.round(c[1] * 10000) / 10000
  ];
}

function processRing(ring, sqTolerance) {
  // First simplify points
  let simplified = simplifyPoints(ring, sqTolerance);
  // Guarantee ring closing if closed originally
  if (simplified.length < 4) {
    simplified = ring; // Fallback if over-simplified
  }
  // Round coordinates to 4 decimals
  return simplified.map(roundCoord);
}

function processGeometry(geometry, sqTolerance) {
  if (geometry.type === 'Polygon') {
    return {
      type: 'Polygon',
      coordinates: geometry.coordinates.map(ring => processRing(ring, sqTolerance))
    };
  } else if (geometry.type === 'MultiPolygon') {
    return {
      type: 'MultiPolygon',
      coordinates: geometry.coordinates.map(polygon => 
        polygon.map(ring => processRing(ring, sqTolerance))
      )
    };
  }
  return geometry;
}

// Tolerance of 0.0005 degrees squared ~ approx 0.022 degrees (around 2km tolerance)
// Let's test a mild tolerance first (e.g. sqTolerance = 0.00005 -> ~0.007 degrees ~ 700m)
const SQ_TOLERANCE = 0.00005;

const optimizedFeatures = geojson.features.map(f => {
  return {
    type: 'Feature',
    id: f.properties.ID_1,
    properties: {
      ID_0: f.properties.ID_0,
      ISO: f.properties.ISO,
      NAME_0: f.properties.NAME_0,
      ID_1: f.properties.ID_1,
      NAME_1: f.properties.NAME_1,
      TYPE_1: f.properties.TYPE_1,
      ENGTYPE_1: f.properties.ENGTYPE_1
    },
    geometry: processGeometry(f.geometry, SQ_TOLERANCE)
  };
});

const optimizedGeoJSON = {
  type: 'FeatureCollection',
  features: optimizedFeatures
};

let newVertices = 0;
optimizedFeatures.forEach(f => {
  newVertices += countVertices(f.geometry);
});

const outputString = JSON.stringify(optimizedGeoJSON);
fs.writeFileSync(OUTPUT_FILE, outputString, 'utf8');
const newSizeBytes = Buffer.byteLength(outputString, 'utf8');

console.log(`\nOptimized Metrics:`);
console.log(`- Size: ${(newSizeBytes / (1024 * 1024)).toFixed(2)} MB (${newSizeBytes} bytes)`);
console.log(`- Size Reduction: ${((1 - newSizeBytes / originalSizeBytes) * 100).toFixed(2)}%`);
console.log(`- Total Vertices: ${newVertices}`);
console.log(`- Vertex Reduction: ${((1 - newVertices / originalVertices) * 100).toFixed(2)}%`);
console.log(`Output saved to: ${OUTPUT_FILE}`);
