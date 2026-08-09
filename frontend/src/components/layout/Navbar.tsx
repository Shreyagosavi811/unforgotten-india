import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#fcf8f2]/90 backdrop-blur-md border-b border-stone-200/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 rounded-md p-1"
          aria-label="Unforgotten India Homepage"
        >
          <div className="w-9 h-9 rounded-lg bg-[#1e1b4b] flex items-center justify-center text-amber-400 font-serif text-xl font-bold shadow-sm group-hover:bg-amber-900 transition-colors">
            🇮🇳
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-wider text-[#1e1b4b] group-hover:text-amber-900 transition-colors">
              UNFORGOTTEN INDIA
            </span>
            <span className="text-[10px] font-sans uppercase tracking-widest text-amber-800/80 font-medium">
              Cultural Exploration
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-700">
          <Link 
            to="/india" 
            className="hover:text-amber-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 rounded py-1 px-2"
          >
            Explore India
          </Link>
          <Link 
            to="/stories" 
            className="hover:text-amber-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 rounded py-1 px-2"
          >
            Stories
          </Link>
          <a 
            href="#evidence" 
            className="hover:text-amber-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 rounded py-1 px-2"
          >
            Evidence & Trust
          </a>
          <a 
            href="#about" 
            className="hover:text-amber-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 rounded py-1 px-2"
          >
            About
          </a>
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button 
            type="button"
            className="text-xs font-semibold text-stone-600 hover:text-stone-900 px-3 py-2 rounded-md hover:bg-stone-100/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
            title="Authentication arriving in Phase 3"
          >
            Sign In
          </button>
          <a
            href="#community"
            className="text-xs font-semibold bg-[#1e1b4b] text-amber-100 hover:bg-amber-900 hover:text-white px-4 py-2.5 rounded-lg shadow-xs transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
          >
            Share a Story
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-stone-200/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-[#fcf8f2] px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3 font-medium text-slate-800">
            <Link
              to="/india"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-amber-50 hover:text-amber-900 transition-colors"
            >
              Explore India
            </Link>
            <Link
              to="/stories"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-amber-50 hover:text-amber-900 transition-colors"
            >
              Stories
            </Link>
            <a
              href="#evidence"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-amber-50 hover:text-amber-900 transition-colors"
            >
              Evidence & Trust
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-amber-50 hover:text-amber-900 transition-colors"
            >
              About
            </a>
          </nav>
          <div className="pt-4 border-t border-stone-200 flex flex-col space-y-3">
            <button
              type="button"
              className="w-full text-center py-2.5 text-sm font-medium text-slate-700 rounded-md border border-stone-300 bg-white"
            >
              Sign In
            </button>
            <a
              href="#community"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-sm font-medium bg-[#1e1b4b] text-amber-100 rounded-md shadow-xs"
            >
              Share a Story
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
