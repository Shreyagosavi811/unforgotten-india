import { Link } from 'react-router-dom';

export function FinalCTA() {
  return (
    <section className="py-24 bg-[#1e1b4b] text-amber-100 text-center relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h2 className="font-serif text-5xl sm:text-6xl font-bold text-amber-100 leading-tight">
          Which story will you uncover?
        </h2>

        <p className="text-stone-300 text-lg sm:text-xl font-serif italic max-w-2xl mx-auto">
          "Explore the places, people and stories that shaped India."
        </p>

        <div className="pt-4">
          <Link
            to="/india"
            className="inline-flex items-center space-x-3 px-10 py-5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-lg rounded-xl shadow-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group"
          >
            <span>EXPLORE INDIA</span>
            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
