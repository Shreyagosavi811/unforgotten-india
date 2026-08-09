import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { getRegionById } from '../data/regions';

export function RegionalExplorerPlaceholder() {
  const { stateId } = useParams<{ stateId: string }>();
  const region = stateId ? getRegionById(stateId) : undefined;

  if (!region) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fcf8f2] text-[#0f172a]">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6 parchment-texture">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center text-3xl font-bold shadow-xs">
            ⚠️
          </div>
          <div className="space-y-2 max-w-md">
            <span className="text-xs font-mono font-bold uppercase text-rose-800">
              Unknown Region Identifier
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#1e1b4b]">
              Region Not Found
            </h1>
            <p className="text-xs text-slate-600">
              No regional data mapping exists for identifier <code className="bg-stone-200 px-1.5 py-0.5 rounded font-mono">{stateId}</code>.
            </p>
          </div>
          <Link
            to="/india"
            className="px-6 py-3 bg-[#1e1b4b] text-amber-100 hover:bg-amber-900 rounded-xl font-semibold text-xs transition-colors"
          >
            ← Return to India Explorer Map
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf8f2] text-[#0f172a]">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-xs font-medium text-stone-500">
          <Link to="/" className="hover:text-amber-800 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/india" className="hover:text-amber-800 transition-colors">
            Explore India
          </Link>
          <span>/</span>
          <span className="text-amber-900 font-bold">{region.name}</span>
        </div>

        {/* Header Block */}
        <div className="bg-white p-8 rounded-2xl border border-stone-300 shadow-sm space-y-6 parchment-texture">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300">
                  {region.code}
                </span>
                {region.capital && (
                  <span className="text-xs text-stone-500">Capital: {region.capital}</span>
                )}
                {region.isMvpAvailable ? (
                  <span className="text-xs font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                    MVP Content Ready
                  </span>
                ) : (
                  <span className="text-xs font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    Stories Coming Soon
                  </span>
                )}
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1e1b4b]">
                {region.name} Regional Explorer
              </h1>

              <p className="font-serif text-base text-amber-900 italic font-medium">
                "{region.tagline}"
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="block font-mono text-sm font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                {region.isMvpAvailable ? 'MVP Active Region' : 'Stories Coming Soon'}
              </span>
            </div>
          </div>

          {/* Status Message */}
          <div className="p-6 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-3">
            <div className="flex items-center space-x-2 font-bold text-amber-950 text-sm">
              <span>🏗️ Phase 3 Regional Explorer Preparation</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              The regional exploration hub for <strong className="text-amber-950">{region.name}</strong> will feature categorized storytelling pillars (People, Movements, Events, Places, Stories, Timeline) and interactive story experiences in Phase 3.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
              Supported Historical Categories for {region.name}:
            </span>
            <div className="flex flex-wrap gap-2">
              {region.availableCategories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1.5 bg-[#1e1b4b] text-amber-100 text-xs font-mono rounded-lg border border-indigo-900"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/india"
              className="w-full sm:w-auto px-6 py-3 bg-[#1e1b4b] text-amber-100 hover:bg-amber-900 rounded-xl text-xs font-semibold shadow-xs transition-colors text-center"
            >
              ← Return to India Map Explorer
            </Link>

            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-xl text-xs font-semibold transition-colors text-center"
            >
              Go to Landing Page
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default RegionalExplorerPlaceholder;
