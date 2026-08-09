export function EvidenceSection() {
  const classifications = [
    {
      title: "Historical Evidence",
      badge: "HISTORICAL_EVIDENCE",
      badgeStyle: "bg-emerald-100 text-emerald-900 border-emerald-300",
      iconColor: "text-emerald-700",
      description: "Stories supported by documented historical sources, primary manuscripts, inscriptions, and peer-reviewed archaeological findings.",
      sources: ["Archaeological Survey Records", "Primary Manuscripts", "Epigraphic Inscriptions"]
    },
    {
      title: "Historical Debate",
      badge: "HISTORICAL_DEBATE",
      badgeStyle: "bg-amber-100 text-amber-900 border-amber-300",
      iconColor: "text-amber-700",
      description: "Accounts where evidence, timeline, or historiographical interpretations remain actively contested among historians.",
      sources: ["Competing Academic Papers", "Alternate Chronologies", "Historiographical Reviews"]
    },
    {
      title: "Folklore & Oral Tradition",
      badge: "FOLKLORE / ORAL_TRADITION",
      badgeStyle: "bg-purple-100 text-purple-900 border-purple-300",
      iconColor: "text-purple-700",
      description: "Stories, songs, and legends preserved through generations of local cultural memory and oral storytelling.",
      sources: ["Community Oral Histories", "Regional Ballads", "Living Cultural Traditions"]
    }
  ];

  return (
    <section id="evidence" className="py-20 bg-[#f6f0e6] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
            Historiography & Trust Framework
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1e1b4b]">
            Stories deserve context.
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            We distinguish between verified facts, ongoing academic debate, and living oral traditions so you always understand the grounding of every story.
          </p>
        </div>

        {/* 3 Classification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {classifications.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white p-8 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-all duration-200 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <span className={`inline-block text-[11px] font-mono font-bold px-3 py-1 rounded border ${item.badgeStyle}`}>
                  {item.badge}
                </span>

                <h3 className="font-serif text-2xl font-bold text-[#1e1b4b]">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                  Typical Source Types:
                </span>
                <ul className="space-y-1 text-xs text-slate-700">
                  {item.sources.map((src, i) => (
                    <li key={i} className="flex items-center space-x-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{src}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* AI Transparency & Reconstruction Banner Callout */}
        <div className="p-6 bg-white border border-amber-300/80 rounded-2xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-lg shrink-0">
              ⚖️
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-[#1e1b4b]">
                Commitment to Archival Authenticity
              </h4>
              <p className="text-xs text-slate-600">
                AI-assisted content generation and visual reconstructions will always be explicitly tagged with disclaimers and never misrepresented as authentic archival photographs.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold text-amber-900 bg-amber-50 px-3 py-1.5 rounded border border-amber-200 shrink-0">
            Strict Metadata Standard
          </span>
        </div>
      </div>
    </section>
  );
}
