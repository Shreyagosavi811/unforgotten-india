import type { NarrativeSection } from '../../types/domain';

interface StorySectionRendererProps {
  sections: NarrativeSection[];
}

const CLASSIFICATION_LABELS: Record<string, string> = {
  NARRATIVE: 'Narrative',
  CONTEXT: 'Historical Context',
  TIMELINE: 'Timeline',
  QUOTE: 'Primary Quote',
  IMAGE: 'Visual',
  MAP: 'Geographic Context',
  EVIDENCE: 'Evidence',
  REFLECTION: 'Reflection',
};

export function StorySectionRenderer({ sections }: StorySectionRendererProps) {
  return (
    <div className="space-y-10">
      {sections.map((section, idx) => (
        <div key={section.id} className="scroll-mt-24">
          {section.type === 'QUOTE' ? (
            <blockquote className="border-l-4 border-amber-500 pl-6 py-4 bg-amber-50/50 rounded-r-xl">
              <p className="font-serif text-xl sm:text-2xl text-[#1e1b4b] italic leading-relaxed">
                {section.body}
              </p>
              {section.attribution && (
                <cite className="block mt-3 text-xs font-sans text-stone-600 not-italic">
                  — {section.attribution}
                </cite>
              )}
            </blockquote>
          ) : section.type === 'REFLECTION' ? (
            <div className="bg-[#f5efe6] border border-[#e2d9cc] rounded-2xl p-6 sm:p-8 space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-900">
                {CLASSIFICATION_LABELS[section.type]}
              </span>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-serif italic">
                {section.body}
              </p>
            </div>
          ) : section.type === 'CONTEXT' ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {CLASSIFICATION_LABELS[section.type]}
                </span>
              </div>
              {section.heading && (
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1e1b4b]">
                  {section.heading}
                </h3>
              )}
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {section.body}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {section.heading && (
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1e1b4b]">
                  {section.heading}
                </h3>
              )}
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {section.body}
              </p>
            </div>
          )}

          {/* Section media */}
          {section.media && section.media.length > 0 && (
            <div className="mt-4 space-y-3">
              {section.media.map((m, mi) => (
                <figure key={mi} className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2">
                  {m.url && (
                    <img src={m.url} alt={m.alt} className="w-full rounded-lg" loading="lazy" />
                  )}
                  {m.caption && (
                    <figcaption className="text-xs text-stone-600 italic">{m.caption}</figcaption>
                  )}
                  {m.source && (
                    <span className="text-[10px] text-stone-500 block">Source: {m.source}</span>
                  )}
                  {m.isAiReconstruction && (
                    <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-200 inline-block">
                      AI-assisted reconstruction — illustrative, not an original historical image
                    </span>
                  )}
                </figure>
              ))}
            </div>
          )}

          {/* Divider between sections, except after the last one */}
          {idx < sections.length - 1 && section.type !== 'QUOTE' && section.type !== 'REFLECTION' && (
            <div className="pt-6">
              <div className="border-t border-stone-200" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
