export function JourneySection() {
  const steps = [
    {
      step: "01",
      title: "India",
      subtitle: "The Gateway Map",
      desc: "Start with the interactive nationwide map overview."
    },
    {
      step: "02",
      title: "State / Region",
      subtitle: "Regional Explorer",
      desc: "Select a state to enter its distinct cultural hub."
    },
    {
      step: "03",
      title: "Category",
      subtitle: "Pillars of History",
      desc: "Filter across People, Movements, Events, Places & Stories."
    },
    {
      step: "04",
      title: "Interactive Story",
      subtitle: "Immersive View",
      desc: "Read context, inspect sources, listen to audio narration."
    },
    {
      step: "05",
      title: "Explore Further",
      subtitle: "Semantic Web",
      desc: "Follow connected timelines, entities, and related regions."
    }
  ];

  return (
    <section id="journey" className="py-20 bg-[#fcf8f2] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
            Navigation Architecture
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1e1b4b]">
            India is more than one story.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Every region carries stories of people, places, struggles and traditions. Unforgotten India connects them through an interactive, data-driven journey.
          </p>
        </div>

        {/* Horizontal Flow Desktop / Vertical Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((item, idx) => (
            <div 
              key={idx} 
              className="relative bg-white p-6 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-4 group hover:border-amber-700/50 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl font-bold text-amber-800/40 group-hover:text-amber-800 transition-colors">
                    {item.step}
                  </span>
                  {idx < steps.length - 1 && (
                    <span className="hidden md:inline text-stone-300 text-sm font-bold">→</span>
                  )}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1e1b4b]">
                  {item.title}
                </h3>
                <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-amber-900 bg-amber-50 px-2 py-0.5 rounded">
                  {item.subtitle}
                </span>
                <p className="text-xs text-slate-600 leading-normal pt-1">
                  {item.desc}
                </p>
              </div>

              {/* Mobile Connector Arrow */}
              {idx < steps.length - 1 && (
                <div className="md:hidden pt-2 flex justify-center text-stone-400">
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
