import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative overflow-hidden parchment-texture pt-12 pb-20 md:pt-20 md:pb-32 border-b border-stone-200">
      {/* Background Stylized Topographic & Geographic Silhouette Graphic */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.18] flex items-center justify-center">
        <svg 
          viewBox="0 0 800 800" 
          className="w-full h-full max-w-4xl text-amber-900 stroke-current fill-none stroke-[0.8]"
          aria-hidden="true"
        >
          {/* Topographic Contour Ellipses */}
          <ellipse cx="400" cy="400" rx="360" ry="320" strokeDasharray="4 6" />
          <ellipse cx="400" cy="400" rx="280" ry="240" strokeDasharray="3 5" />
          <ellipse cx="400" cy="400" rx="200" ry="170" />
          <ellipse cx="400" cy="400" rx="120" ry="100" strokeDasharray="2 4" />
          <ellipse cx="400" cy="400" rx="50" ry="40" />

          {/* Compass rose lines */}
          <line x1="400" y1="40" x2="400" y2="760" strokeDasharray="2 8" />
          <line x1="40" y1="400" x2="760" y2="400" strokeDasharray="2 8" />

          {/* Abstract Peninsular India Map Silhouette Outline */}
          <path 
            d="M 330 180 Q 420 160 480 210 Q 520 280 470 360 Q 430 460 400 580 Q 370 460 330 360 Q 280 270 330 180 Z" 
            className="stroke-amber-900 stroke-[1.5] fill-amber-900/10" 
          />
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Subtle Tag Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300/80 text-amber-900 text-xs font-medium tracking-wide shadow-xs animate-in fade-in duration-500">
          <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
          <span>Interactive Digital Cultural Platform</span>
        </div>

        {/* Primary Title Block */}
        <div className="space-y-4">
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#1e1b4b] leading-[1.05]">
            UNFORGOTTEN INDIA
          </h1>
          <p className="font-serif text-2xl sm:text-3xl text-amber-900 italic font-medium">
            "The stories behind India's history."
          </p>
        </div>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
          Explore the people, places, movements and stories that shaped India — and the ones waiting to be remembered.
        </p>

        {/* CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            to="/india"
            className="w-full sm:w-auto px-8 py-4 bg-[#1e1b4b] text-amber-100 hover:bg-amber-900 hover:text-white text-base font-semibold rounded-xl shadow-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 flex items-center justify-center space-x-3 group"
          >
            <span>EXPLORE INDIA</span>
            <svg 
              className="w-5 h-5 text-amber-300 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          <a
            href="#experience"
            className="w-full sm:w-auto px-8 py-4 bg-white/80 hover:bg-white text-[#1e1b4b] border border-stone-300 hover:border-amber-700/50 text-base font-semibold rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 flex items-center justify-center"
          >
            DISCOVER STORIES
          </a>
        </div>

        {/* Core Principle Callout */}
        <div className="pt-8 flex items-center justify-center space-x-6 text-xs text-slate-500 font-medium tracking-wide uppercase">
          <span className="flex items-center space-x-1.5">
            <span className="text-amber-700 font-bold">✓</span>
            <span>Explore Freely</span>
          </span>
          <span className="text-stone-300">•</span>
          <span className="flex items-center space-x-1.5">
            <span className="text-amber-700 font-bold">✓</span>
            <span>Discover Deeply</span>
          </span>
          <span className="text-stone-300">•</span>
          <span className="flex items-center space-x-1.5">
            <span className="text-amber-700 font-bold">✓</span>
            <span>Contribute Optionally</span>
          </span>
        </div>
      </div>
    </section>
  );
}
