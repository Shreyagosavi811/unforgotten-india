import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export function IndiaExplorerPlaceholder() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcf8f2] text-[#0f172a]">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6 parchment-texture">
        <div className="w-16 h-16 rounded-2xl bg-[#1e1b4b] text-amber-400 flex items-center justify-center text-3xl font-bold shadow-md">
          🇮🇳
        </div>
        <div className="space-y-3 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            Phase 2 Preparation Gateway
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1e1b4b]">
            India Explorer — Coming in Phase 2
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            The data-driven interactive map of India, state/regional explorer hubs, and categorized storytelling pillars are currently queued for Phase 2.
          </p>
        </div>

        <div className="pt-4">
          <Link
            to="/"
            className="px-6 py-3 bg-[#1e1b4b] text-amber-100 hover:bg-amber-900 rounded-lg font-semibold text-sm shadow-xs transition-colors"
          >
            ← Return to Landing Page
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default IndiaExplorerPlaceholder;
