import type { AudioNarrationMeta } from '../../types/domain';

interface AudioNarrationProps {
  narration?: AudioNarrationMeta;
  storyTitle: string;
}

export function AudioNarration({ narration, storyTitle }: AudioNarrationProps) {
  if (!narration || !narration.available) {
    return (
      <div className="bg-[#f5efe6] border border-[#e2d9cc] rounded-xl p-4 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 text-amber-900 flex items-center justify-center text-lg shrink-0">
          🎧
        </div>
        <div className="space-y-0.5">
          <span className="text-xs font-semibold text-[#1e1b4b] block">Audio Narration</span>
          <span className="text-[11px] text-stone-600">
            Audio narration for this story is being prepared and will be available in a future update.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1e1b4b] text-amber-50 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center text-lg shrink-0">
            🎧
          </div>
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-amber-100 block">Listen to this story</span>
            {narration.narrator && (
              <span className="text-[11px] text-stone-400">Narrated by {narration.narrator}</span>
            )}
          </div>
        </div>
        {narration.durationSeconds && (
          <span className="text-[11px] font-mono text-amber-300/80">
            {Math.floor(narration.durationSeconds / 60)}:{String(narration.durationSeconds % 60).padStart(2, '0')}
          </span>
        )}
      </div>

      {narration.audioUrl && (
        <audio
          controls
          preload="none"
          className="w-full h-10"
          aria-label={`Audio narration of ${storyTitle}`}
        >
          <source src={narration.audioUrl} />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}
