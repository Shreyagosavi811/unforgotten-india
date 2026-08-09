import { useState } from 'react';

export function StoryPreview() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  return (
    <section id="stories-preview" className="py-20 bg-[#fcf8f2] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
            Interactive Storytelling Format
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1e1b4b]">
            History, experienced differently.
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Stories are presented with narrative clarity, audio narration controls, verifiable primary sources, and clear evidence classifications.
          </p>
        </div>

        {/* Cinematic Mock Story Showcase Card */}
        <div className="bg-white rounded-2xl border border-stone-300 shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Visual Scene Placeholder */}
          <div className="lg:col-span-5 bg-[#1e1b4b] text-amber-100 p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Background Texture Graphic */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative space-y-4">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 text-[11px] font-mono font-semibold uppercase tracking-wider border border-amber-500/30">
                  HISTORICAL_EVIDENCE
                </span>
                <span className="text-stone-400 text-xs font-mono">• Harappan Era</span>
              </div>
              <h3 className="font-serif text-3xl font-bold text-amber-100 leading-tight">
                The Maritime Echoes of Lothal
              </h3>
              <p className="text-stone-300 text-xs flex items-center space-x-1 font-medium">
                <span>📍 Lothal, Gulf of Khambhat, Gujarat</span>
              </p>
            </div>

            {/* Stylized Architectural Dockyard SVG Drawing */}
            <div className="relative my-8 p-6 bg-[#17143a] rounded-xl border border-indigo-900 flex items-center justify-center">
              <svg 
                viewBox="0 0 300 160" 
                className="w-full h-36 text-amber-400/40 stroke-current fill-none stroke-1"
                aria-label="Architectural drawing of Harappan dockyard at Lothal"
              >
                {/* Tidal Basin Outline */}
                <rect x="20" y="30" width="260" height="90" rx="4" className="stroke-amber-400/60 stroke-2 fill-amber-500/5" />
                {/* Brickwork patterns */}
                <line x1="20" y1="60" x2="280" y2="60" strokeDasharray="4 4" />
                <line x1="20" y1="90" x2="280" y2="90" strokeDasharray="4 4" />
                {/* Sluice Gate */}
                <path d="M 260 30 L 260 120" className="stroke-amber-300 stroke-2" />
                {/* Ancient Vessel Outline */}
                <path d="M 80 75 Q 120 105 160 75 Z" className="fill-amber-400/30 stroke-amber-300 stroke-2" />
                <line x1="120" y1="45" x2="120" y2="75" className="stroke-amber-300 stroke-2" />
              </svg>
              <span className="absolute bottom-2 right-3 text-[10px] font-mono text-stone-400">
                Visual Reconstruction Diagram
              </span>
            </div>

            {/* Audio Narration Bar Visual Control */}
            <div className="relative bg-[#17143a] border border-indigo-900 rounded-xl p-3.5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-9 h-9 rounded-full bg-amber-600 hover:bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-sm transition-transform active:scale-95"
                  aria-label={isPlayingAudio ? "Pause narration" : "Listen to story narration"}
                >
                  {isPlayingAudio ? "⏸" : "▶"}
                </button>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-amber-100">
                    Listen to Story Narration
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {isPlayingAudio ? "Playing audio stream (0:42 / 3:15)..." : "3 min 15 sec • Voice Storytelling"}
                  </span>
                </div>
              </div>

              {/* Audio Wave Visualizer */}
              <div className="flex items-end space-x-1 h-5">
                {[40, 70, 30, 90, 50, 80, 40].map((h, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full bg-amber-400 transition-all ${isPlayingAudio ? "animate-pulse" : "opacity-40"}`}
                    style={{ height: `${isPlayingAudio ? Math.min(100, h + 10) : h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Story Text Content & Sources */}
          <div className="lg:col-span-7 p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-amber-900 border-b border-stone-200 pb-3">
                <span className="font-semibold uppercase tracking-wider">
                  Historical Context & Narrative
                </span>
                <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-mono text-[11px] font-bold">
                  Demonstration Preview
                </span>
              </div>

              <p className="font-serif text-lg text-slate-800 leading-relaxed italic">
                "Four thousand years ago, long before modern ports dotting the Arabian Sea, master builders at Lothal carved the world's earliest known tidal dockyard out of baked red brick..."
              </p>

              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>
                  Engineered to harness the massive tidal surges of the Gulf of Khambhat, Lothal served as a vital international emporium connecting the Indus Valley civilization with ancient Mesopotamia and Elam.
                </p>
                <p>
                  Archaeological excavations led by S.R. Rao revealed standardized stone weights, carnelian bead workshops, and clay sealings bearing Harappan script — testament to sophisticated maritime governance.
                </p>
              </div>
            </div>

            {/* Evidence Citation Box */}
            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-amber-900 font-semibold">
                <span>📚 Primary Historical Source Citation</span>
              </div>
              <p className="text-slate-700 italic">
                Rao, S.R. (1979). "Lothal: A Harappan Port Town (1955–62)." Memoirs of the Archaeological Survey of India, No. 78.
              </p>
              <div className="text-[11px] text-amber-800 font-mono pt-1">
                Source Classification: Verified Factual Evidence • ASI Archival Ref #78
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
