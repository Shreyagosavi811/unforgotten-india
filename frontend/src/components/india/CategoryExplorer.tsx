export function CategoryExplorer() {
  const categories = [
    {
      name: "People",
      code: "PEOPLE",
      desc: "Rulers, reformers, scholars, revolutionaries, and unsung pioneers.",
      icon: "👤"
    },
    {
      name: "Movements",
      code: "MOVEMENTS",
      desc: "Social reform, freedom struggles, agrarian uprisings, and cultural revivals.",
      icon: "🚩"
    },
    {
      name: "Events",
      code: "EVENTS",
      desc: "Battles, treaties, congresses, satyagrahas, and watershed moments.",
      icon: "⚔️"
    },
    {
      name: "Places",
      code: "PLACES",
      desc: "Ancient ports, hill fortresses, university ruins, and sacred rivers.",
      icon: "🏰"
    },
    {
      name: "Stories",
      code: "STORIES",
      desc: "Narratives, folktales, maritime epics, and regional legends.",
      icon: "📜"
    },
    {
      name: "Timeline",
      code: "TIMELINE",
      desc: "Chronological cross-region histories from antiquity to independence.",
      icon: "⏳"
    }
  ];

  return (
    <section className="py-16 bg-[#f6f0e6] border-t border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-300 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              National Discovery Pillars
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1e1b4b]">
              Explore across India
            </h2>
          </div>
          <span className="text-xs font-mono text-stone-500">
            6 Domain Categories
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs hover:border-amber-700/40 transition-colors space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg bg-amber-100/70 text-amber-900 flex items-center justify-center font-bold text-base">
                  {cat.icon}
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {cat.code}
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1e1b4b]">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {cat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
