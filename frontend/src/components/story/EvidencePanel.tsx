import type { EvidenceSource } from '../../types/domain';

interface EvidencePanelProps {
  sources: EvidenceSource[];
  classification: string;
}

const VERIFICATION_LABELS: Record<string, { label: string; color: string }> = {
  PRIMARY: { label: 'Primary Source', color: 'text-emerald-800 bg-emerald-50 border-emerald-200' },
  SECONDARY: { label: 'Secondary Source', color: 'text-blue-800 bg-blue-50 border-blue-200' },
  TERTIARY: { label: 'Tertiary Source', color: 'text-stone-700 bg-stone-100 border-stone-300' },
  ORAL: { label: 'Oral Tradition', color: 'text-amber-800 bg-amber-50 border-amber-200' },
};

const SOURCE_TYPE_LABELS: Record<string, string> = {
  OFFICIAL_ARCHIVE: 'Official Archive',
  GOVERNMENT: 'Government Record',
  MUSEUM: 'Museum Collection',
  ASI: 'Archaeological Survey of India',
  ACADEMIC: 'Academic Publication',
  BOOK: 'Published Book',
  RESEARCH_PAPER: 'Research Paper',
  REPUTABLE_SECONDARY: 'Reputable Secondary Source',
  ORAL_SOURCE: 'Oral Source / Fieldwork',
};

const CLASSIFICATION_DISCLAIMERS: Record<string, string> = {
  HISTORICAL_EVIDENCE: 'This account is supported by documented historical evidence.',
  HISTORICAL_DEBATE: 'Historical interpretation of this subject remains debated among scholars.',
  FOLKLORE: 'Traditional account — not presented as independently verified historical fact.',
  ORAL_TRADITION: 'Traditional oral account — not presented as independently verified historical fact.',
};

export function EvidencePanel({ sources, classification }: EvidencePanelProps) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6 scroll-mt-24">
      <div className="border-t-2 border-amber-500 pt-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-900">
            Source Verification
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1e1b4b]">
            How do we know?
          </h2>
        </div>

        {/* Classification Disclaimer */}
        {classification && CLASSIFICATION_DISCLAIMERS[classification] && (
          <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
            classification === 'FOLKLORE' || classification === 'ORAL_TRADITION'
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : classification === 'HISTORICAL_DEBATE'
              ? 'bg-blue-50 border-blue-200 text-blue-900'
              : 'bg-emerald-50 border-emerald-200 text-emerald-900'
          }`}>
            <span className="font-bold block mb-1">Content Classification</span>
            {CLASSIFICATION_DISCLAIMERS[classification]}
          </div>
        )}

        {/* Source List */}
        <div className="space-y-4">
          {sources.map((source) => {
            const verification = VERIFICATION_LABELS[source.verificationLevel] || VERIFICATION_LABELS.SECONDARY;
            return (
              <div key={source.id} className="bg-white border border-stone-200 rounded-xl p-5 space-y-3 hover:border-stone-300 transition-colors">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${verification.color}`}>
                    {verification.label}
                  </span>
                  <span className="text-[10px] font-mono text-stone-500 bg-stone-50 px-2 py-0.5 rounded border border-stone-200">
                    {SOURCE_TYPE_LABELS[source.sourceType] || source.sourceType}
                  </span>
                </div>

                <h4 className="font-serif text-base font-bold text-[#1e1b4b] leading-snug">
                  {source.title}
                </h4>

                <p className="text-xs text-stone-600">
                  {source.publisher}
                </p>

                {source.citation && (
                  <p className="text-xs text-stone-500 italic border-l-2 border-stone-200 pl-3">
                    {source.citation}
                  </p>
                )}

                {source.notes && (
                  <p className="text-xs text-stone-500">
                    {source.notes}
                  </p>
                )}

                {source.url && (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-amber-900 hover:text-amber-700 underline"
                  >
                    View source →
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
