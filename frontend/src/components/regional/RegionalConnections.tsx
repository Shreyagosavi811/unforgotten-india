import type { RegionDetail } from '../../data/regions';

interface RegionalConnectionsProps {
  region: RegionDetail;
}

const CONNECTION_TYPES = [
  { label: 'People ↔ Places', desc: 'Connecting historical figures with their regional landmarks.' },
  { label: 'Events ↔ Movements', desc: 'Connecting turning points to broader cultural shifts.' },
  { label: 'Region ↔ Region', desc: 'Connecting cross-boundary trade routes, ideas, and migrations.' },
];

export function RegionalConnections({ region }: RegionalConnectionsProps) {
  return (
    <section id="connections" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-900">
            Interconnected Heritage
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1e1b4b]">
            The Stories Connect
          </h2>
        </div>
        <p className="text-xs text-stone-500 max-w-md">
          History is never isolated. Regional events resonate across geographic and temporal boundaries.
        </p>
      </div>

      {/* Connection Topology Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CONNECTION_TYPES.map((conn, idx) => (
          <div
            key={idx}
            className="bg-white/80 border border-stone-200/90 rounded-2xl p-6 space-y-3 shadow-2xs hover:border-amber-400/80 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 font-mono text-xs font-bold flex items-center justify-center border border-amber-300">
              0{idx + 1}
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1e1b4b]">
              {conn.label}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              {conn.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Intentional Empty State Banner */}
      <div className="bg-[#f5efe6] border border-[#e2d9cc] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-serif text-lg font-bold text-[#1e1b4b]">
            Relational Archival Connections
          </h4>
          <p className="text-xs text-stone-600">
            Cross-regional relationship links for <span className="font-semibold text-amber-900">{region.name}</span> will emerge as curated stories are connected to the central graph repository.
          </p>
        </div>
        <span className="shrink-0 text-xs font-mono text-amber-900 bg-amber-100 px-3.5 py-1.5 rounded-lg border border-amber-300 font-medium">
          Graph Relationships • Coming Soon
        </span>
      </div>
    </section>
  );
}
