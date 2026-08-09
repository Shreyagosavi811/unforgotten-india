export function CommunitySection() {
  return (
    <section id="community" className="py-20 bg-[#fcf8f2] border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-300">
          <span>Open Cultural Preservation</span>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1e1b4b]">
            Some stories live beyond textbooks.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Know a forgotten story, regional legend, or oral tradition from your home state? Share it with our growing community of cultural archivists.
          </p>
        </div>

        <div className="pt-2 flex flex-col items-center space-y-4">
          <button
            type="button"
            className="px-8 py-4 bg-[#1e1b4b] text-amber-100 hover:bg-amber-900 hover:text-white text-base font-semibold rounded-xl shadow-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
            title="Community story submission coming in Phase 3"
          >
            SHARE A STORY
          </button>
          
          <p className="text-xs text-slate-500 font-medium max-w-md">
            Exploration is always free and unauthenticated. Create an account only when you choose to publish articles or contribute stories.
          </p>
        </div>
      </div>
    </section>
  );
}
