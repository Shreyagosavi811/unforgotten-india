import type { RegionDetail } from '../../data/regions';

interface RegionalTimelinePreviewProps {
  region: RegionDetail;
}

const HISTORICAL_ERAS = [
  { id: 'ancient', label: 'Ancient Era', range: 'c. 2500 BCE – 600 CE' },
  { id: 'medieval', label: 'Medieval Era', range: 'c. 600 CE – 1500 CE' },
  { id: 'early_modern', label: 'Early Modern Era', range: 'c. 1500 CE – 1800 CE' },
  { id: 'colonial', label: 'Colonial Era', range: 'c. 1800 CE – 1947 CE' },
  { id: 'modern', label: 'Modern Era', range: '1947 CE – Present' },
];

export function RegionalTimelinePreview({ region }: RegionalTimelinePreviewProps) {
  return (
    <section id="timeline" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-900">
            Chronological Framework
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1e1b4b]">
            A Region Through Time
          </h2>
        </div>
        <span className="text-xs font-mono text-stone-500 bg-stone-100 px-3 py-1 rounded-md border border-stone-200">
          Historical Span: {region.historicalPeriod || 'Multi-Era Heritage'}
        </span>
      </div>

      {/* Era Navigation Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {HISTORICAL_ERAS.map((era) => (
          <div
            key={era.id}
            className="bg-white/80 border border-stone-200/90 rounded-xl p-4 space-y-1 shadow-2xs hover:border-amber-400 transition-colors"
          >
            <h4 className="font-serif text-sm font-bold text-[#1e1b4b]">
              {era.label}
            </h4>
            <p className="text-[11px] font-mono text-stone-500">
              {era.range}
            </p>
          </div>
        ))}
      </div>

      {/* Timeline Intentional Empty State Container */}
      <div className="bg-stone-50 border border-dashed border-stone-300 rounded-2xl p-8 sm:p-12 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-amber-100 border border-amber-300 text-amber-900 mx-auto flex items-center justify-center font-serif text-xl font-bold">
          ⏳
        </div>
        <div className="space-y-2 max-w-xl mx-auto">
          <h3 className="font-serif text-xl font-bold text-[#1e1b4b]">
            Regional Timeline Curation in Progress
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Detailed chronological milestones for <span className="font-semibold text-amber-900">{region.name}</span> are currently being researched and verified against primary sources.
          </p>
        </div>
        <div className="pt-2">
          <span className="inline-flex items-center space-x-2 text-xs font-mono text-stone-500 bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-2xs">
            <span>Verified Timeline Records • Coming Soon</span>
          </span>
        </div>
      </div>
    </section>
  );
}
