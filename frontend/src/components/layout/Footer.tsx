import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-[#1e1b4b] text-stone-300 border-t border-indigo-950 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-indigo-900/60">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded bg-amber-500/20 text-amber-300 flex items-center justify-center font-serif font-bold text-lg">
                🇮🇳
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-amber-100">
                UNFORGOTTEN INDIA
              </span>
            </div>
            <p className="text-amber-200/80 font-serif text-lg italic">
              "The stories behind India's history."
            </p>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Explore the people, places, movements and stories that shaped India — and the ones waiting to be remembered. Explore freely. Discover deeply. Contribute optionally.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Exploration
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/india" className="hover:text-amber-200 transition-colors">
                  Explore India Map
                </Link>
              </li>
              <li>
                <a href="#experience" className="hover:text-amber-200 transition-colors">
                  Regional Stories
                </a>
              </li>
              <li>
                <a href="#evidence" className="hover:text-amber-200 transition-colors">
                  Evidence & Sources
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-amber-200 transition-colors">
                  The Core Journey
                </a>
              </li>
            </ul>
          </div>

          {/* Platform Info */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Platform
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:text-amber-200 transition-colors">
                  About the Project
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-amber-200 transition-colors">
                  Share a Story
                </a>
              </li>
              <li>
                <a href="#evidence" className="hover:text-amber-200 transition-colors">
                  Content Standards
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 space-y-4 sm:space-y-0">
          <p>
            Built to preserve, explore and connect India's stories. &copy; {new Date().getFullYear()} Unforgotten India.
          </p>
          <p className="text-stone-400 font-mono text-[11px]">
            National Geographic & Museum-Inspired Cultural Technology
          </p>
        </div>
      </div>
    </footer>
  );
}
