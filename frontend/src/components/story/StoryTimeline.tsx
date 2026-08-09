import type { TimelineEntry } from '../../types/domain';

// ─── Era Styles ───────────────────────────────────────────────

const ERA_STYLES: Record<string, { dot: string; year: string }> = {
  ancient:     { dot: 'bg-stone-400 border-stone-300', year: 'text-stone-500' },
  medieval:    { dot: 'bg-amber-600 border-amber-400', year: 'text-amber-800' },
  early_modern:{ dot: 'bg-indigo-500 border-indigo-300', year: 'text-indigo-700' },
  colonial:    { dot: 'bg-red-600 border-red-400', year: 'text-red-800' },
  modern:      { dot: 'bg-emerald-600 border-emerald-400', year: 'text-emerald-800' },
  default:     { dot: 'bg-[#1e1b4b] border-indigo-400', year: 'text-[#1e1b4b]' },
};

interface StoryTimelineProps {
  entries: TimelineEntry[];
  storyTitle?: string;
}

export function StoryTimeline({ entries, storyTitle }: StoryTimelineProps) {
  if (!entries || entries.length === 0) return null;

  return (
    <section
      id="story-timeline"
      aria-labelledby="story-timeline-heading"
      className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-24"
    >
      <div className="border-t-2 border-amber-500 pt-8 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-900">
            Chronology
          </span>
          <h2
            id="story-timeline-heading"
            className="font-serif text-2xl sm:text-3xl font-bold text-[#1e1b4b]"
          >
            Timeline
            {storyTitle && (
              <span className="block text-base font-normal text-stone-500 mt-1 font-sans">
                Key moments in this story
              </span>
            )}
          </h2>
        </div>

        {/* Timeline entries */}
        <div className="relative pl-6 sm:pl-8">
          {/* Vertical line */}
          <div
            className="absolute left-2 sm:left-3 top-2 bottom-2 w-px bg-stone-200"
            aria-hidden="true"
          />

          <ol className="space-y-8">
            {entries.map((entry) => {
              const era = entry.periodEra ?? 'default';
              const style = ERA_STYLES[era] ?? ERA_STYLES.default;

              return (
                <li key={entry.id} className="relative">
                  {/* Dot */}
                  <div
                    className={`absolute -left-6 sm:-left-8 w-4 h-4 rounded-full border-2 mt-1 ${style.dot}`}
                    aria-hidden="true"
                  />

                  <div className="space-y-1">
                    {/* Year label */}
                    <time
                      className={`text-[11px] font-mono font-bold uppercase tracking-wider ${style.year}`}
                      aria-label={`Date: ${entry.yearLabel}`}
                    >
                      {entry.yearLabel}
                    </time>

                    {/* Title */}
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#1e1b4b] leading-snug">
                      {entry.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {entry.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Era legend */}
        <div className="flex flex-wrap gap-3 pt-2">
          {[
            { era: 'ancient', label: 'Ancient' },
            { era: 'medieval', label: 'Medieval' },
            { era: 'early_modern', label: 'Early Modern' },
            { era: 'colonial', label: 'Colonial' },
            { era: 'modern', label: 'Modern' },
          ]
            .filter(({ era }) =>
              entries.some((e) => (e.periodEra ?? 'default') === era),
            )
            .map(({ era, label }) => {
              const style = ERA_STYLES[era];
              return (
                <span key={era} className="flex items-center gap-1.5 text-[10px] font-mono text-stone-500">
                  <span
                    className={`inline-block w-2.5 h-2.5 rounded-full border ${style.dot}`}
                    aria-hidden="true"
                  />
                  {label}
                </span>
              );
            })}
        </div>
      </div>
    </section>
  );
}
