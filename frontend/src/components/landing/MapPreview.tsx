import { Link } from 'react-router-dom';

export function MapPreview() {
  const featuredRegions = [
    { name: "Rajasthan", stories: 42, period: "Desert Fortresses & Ballads" },
    { name: "Kerala", stories: 38, period: "Spice Trade & Maritime Heritage" },
    { name: "Assam", stories: 29, period: "Ahom Dynasty & River Legends" },
    { name: "Gujarat", stories: 35, period: "Harappan Ports & Maritime Echoes" },
    { name: "West Bengal", stories: 44, period: "Renaissance & Folk Movements" },
    { name: "Ladakh", stories: 22, period: "High Mountain Passes & Monastic Lore" },
  ];

  return (
    <section className="py-20 bg-[#1e1b4b] text-amber-100 relative overflow-hidden border-b border-indigo-950">
      {/* Background Subtle Map Grid / Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider border border-amber-500/30">
              <span>Interactive Gateway Preview</span>
            </div>
            
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-amber-100 leading-tight">
              Explore India, one region at a time.
            </h2>
            
            <p className="text-stone-300 text-base leading-relaxed">
              Start anywhere. Choose a state. Follow the stories across geographic boundaries, historical eras, and living oral traditions.
            </p>

            <div className="pt-2">
              <Link
                to="/india"
                className="inline-flex items-center space-x-3 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group"
              >
                <span>EXPLORE THE MAP</span>
                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Stylized SVG Map & Region Badges */}
          <div className="lg:col-span-7 bg-[#17143a]/80 border border-indigo-900/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm relative space-y-6">
            <div className="flex items-center justify-between border-b border-indigo-900/60 pb-4">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                Interactive Regional Matrix (Preview)
              </span>
              <span className="text-xs font-mono text-stone-400">
                Data-Driven Gateway
              </span>
            </div>

            {/* Stylized Map Representation */}
            <div className="relative h-64 sm:h-72 w-full flex items-center justify-center bg-[#0f0c29]/60 rounded-xl overflow-hidden border border-indigo-900/40">
              <svg 
                viewBox="0 0 500 500" 
                className="w-full h-full text-amber-500/20 stroke-current fill-none stroke-1"
                aria-label="Stylized map graphic of India"
              >
                {/* Geographic Grid Lines */}
                <line x1="0" y1="125" x2="500" y2="125" strokeDasharray="3 3" />
                <line x1="0" y1="250" x2="500" y2="250" strokeDasharray="3 3" />
                <line x1="0" y1="375" x2="500" y2="375" strokeDasharray="3 3" />
                <line x1="125" y1="0" x2="125" y2="500" strokeDasharray="3 3" />
                <line x1="250" y1="0" x2="250" y2="500" strokeDasharray="3 3" />
                <line x1="375" y1="0" x2="375" y2="500" strokeDasharray="3 3" />

                {/* India Outline Stylized Polygon */}
                <polygon 
                  points="210,60 280,100 320,160 380,210 320,250 290,320 250,420 210,340 140,240 160,160" 
                  className="fill-amber-500/10 stroke-amber-400 stroke-2"
                />

                {/* Region Nodes */}
                <circle cx="210" cy="180" r="6" className="fill-amber-400 animate-ping" />
                <circle cx="210" cy="180" r="5" className="fill-amber-300" />
                
                <circle cx="220" cy="380" r="5" className="fill-amber-400" />
                <circle cx="340" cy="220" r="5" className="fill-amber-400" />
                <circle cx="160" cy="220" r="5" className="fill-amber-400" />
                <circle cx="300" cy="240" r="5" className="fill-amber-400" />
                <circle cx="250" cy="100" r="5" className="fill-amber-400" />
              </svg>

              <div className="absolute bottom-3 left-3 bg-[#1e1b4b]/90 border border-amber-500/30 px-3 py-1.5 rounded-lg text-[11px] font-mono text-amber-200">
                📍 Hover over regions to preview story depth
              </div>
            </div>

            {/* Region Sample Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {featuredRegions.map((reg, i) => (
                <div 
                  key={i}
                  className="p-3 bg-[#1e1b4b] border border-indigo-900 hover:border-amber-500/50 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-amber-100">{reg.name}</span>
                    <span className="text-[10px] font-mono text-amber-400">{reg.stories} stories</span>
                  </div>
                  <p className="text-[11px] text-stone-400 truncate mt-0.5">{reg.period}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
