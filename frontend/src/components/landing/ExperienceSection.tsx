export function ExperienceSection() {
  const experiences = [
    {
      title: "Explore by Region",
      description: "Choose a state and discover the stories connected to its people, places and history.",
      icon: (
        <svg className="w-6 h-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      badge: "Geography"
    },
    {
      title: "Experience Stories",
      description: "Go beyond static articles with immersive narratives designed to bring forgotten stories to life.",
      icon: (
        <svg className="w-6 h-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      badge: "Narrative"
    },
    {
      title: "Listen & See",
      description: "Experience selected stories through narration, visual storytelling and interactive timelines.",
      icon: (
        <svg className="w-6 h-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      ),
      badge: "Voice & Visual"
    },
    {
      title: "Follow the Connections",
      description: "Discover how people, places, events and movements connect across India's history.",
      icon: (
        <svg className="w-6 h-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      badge: "Context"
    },
    {
      title: "Discover the Evidence",
      description: "Understand what is historically documented, debated, or preserved through folklore and oral tradition.",
      icon: (
        <svg className="w-6 h-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      badge: "Trust & Sources"
    }
  ];

  return (
    <section id="experience" className="py-20 bg-[#f6f0e6] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
            A Cultural Exploration Platform
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1e1b4b]">
            What will you discover?
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Designed to feel like a modern digital museum — bringing richness, context, and clarity to India's historical legacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, idx) => (
            <div 
              key={idx}
              className="bg-white p-8 rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-md hover:border-amber-700/40 transition-all duration-200 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-amber-100/70 flex items-center justify-center">
                    {exp.icon}
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                    {exp.badge}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1e1b4b]">
                  {exp.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
