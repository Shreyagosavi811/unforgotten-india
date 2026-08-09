import type { StoryMedia as StoryMediaType } from '../../types/domain';

interface StoryMediaProps {
  media: StoryMediaType;
}

const MEDIA_TYPE_LABELS: Record<string, string> = {
  IMAGE: 'Photograph',
  MAP: 'Historical Map',
  ILLUSTRATION: 'Illustration',
  ARCHIVAL_IMAGE: 'Archival Image',
  AUDIO: 'Audio Recording',
  VIDEO: 'Video',
};

export function StoryMedia({ media }: StoryMediaProps) {
  return (
    <figure className="bg-stone-50 border border-stone-200 rounded-xl overflow-hidden">
      {/* Media Display */}
      {media.url && (media.type === 'AUDIO' ? (
        <div className="p-4">
          <audio
            controls
            preload="none"
            className="w-full"
            aria-label={media.alt}
          >
            <source src={media.url} />
          </audio>
        </div>
      ) : media.type === 'VIDEO' ? (
        <video
          controls
          preload="none"
          className="w-full"
          aria-label={media.alt}
        >
          <source src={media.url} />
        </video>
      ) : (
        <img
          src={media.url}
          alt={media.alt}
          className="w-full object-cover"
          loading="lazy"
        />
      ))}

      {/* Caption & Provenance */}
      <div className="p-4 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
            {MEDIA_TYPE_LABELS[media.type] || media.type}
          </span>
          {media.isAiReconstruction && (
            <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
              AI-Assisted Reconstruction
            </span>
          )}
        </div>

        {media.caption && (
          <p className="text-xs text-stone-700 italic leading-relaxed">{media.caption}</p>
        )}

        {media.source && (
          <p className="text-[10px] text-stone-500">Source: {media.source}</p>
        )}

        {media.isAiReconstruction && (
          <p className="text-[10px] text-amber-800 bg-amber-50 border border-amber-200 rounded px-2 py-1 leading-relaxed">
            AI-assisted reconstruction — illustrative, not an original historical image.
          </p>
        )}
      </div>
    </figure>
  );
}
