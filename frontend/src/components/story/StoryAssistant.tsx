import { useState, useRef, useEffect } from 'react';
import type { Story, EvidenceSource } from '../../types/domain';
import { askStoryAssistant, buildSuggestedQuestions } from '../../services/ai/index';
import type { StoryAssistantResponse } from '../../services/ai/index';

// ─── Sub-Components ───────────────────────────────────────────

function ClassificationBadge({ classification }: { classification: string }) {
  const styles: Record<string, string> = {
    HISTORICAL_EVIDENCE: 'text-emerald-800 bg-emerald-50 border-emerald-200',
    HISTORICAL_DEBATE: 'text-blue-800 bg-blue-50 border-blue-200',
    FOLKLORE: 'text-amber-800 bg-amber-50 border-amber-200',
    ORAL_TRADITION: 'text-amber-800 bg-amber-50 border-amber-200',
  };
  const labels: Record<string, string> = {
    HISTORICAL_EVIDENCE: 'Historical Evidence',
    HISTORICAL_DEBATE: 'Historical Debate',
    FOLKLORE: 'Folklore',
    ORAL_TRADITION: 'Oral Tradition',
  };
  return (
    <span
      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
        styles[classification] ?? 'text-stone-700 bg-stone-50 border-stone-200'
      }`}
    >
      {labels[classification] ?? classification}
    </span>
  );
}

function SourceMiniCard({ source }: { source: EvidenceSource }) {
  const levelColors: Record<string, string> = {
    PRIMARY: 'text-emerald-800 bg-emerald-50 border-emerald-200',
    SECONDARY: 'text-blue-800 bg-blue-50 border-blue-200',
    TERTIARY: 'text-stone-700 bg-stone-100 border-stone-300',
    ORAL: 'text-amber-800 bg-amber-50 border-amber-200',
  };
  return (
    <div className="flex items-start gap-2 text-xs py-2 border-b border-stone-100 last:border-0">
      <span
        className={`shrink-0 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border mt-0.5 ${
          levelColors[source.verificationLevel] ?? levelColors.SECONDARY
        }`}
      >
        {source.verificationLevel}
      </span>
      <div className="min-w-0">
        <p className="font-medium text-[#1e1b4b] leading-snug truncate">{source.title}</p>
        <p className="text-stone-500 text-[10px] truncate">{source.publisher}</p>
      </div>
    </div>
  );
}

function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-1" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────

interface StoryAssistantProps {
  story: Story;
}

export function StoryAssistant({ story }: StoryAssistantProps) {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<StoryAssistantResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const suggestedQuestions = buildSuggestedQuestions(story);

  // Scroll response into view when it arrives
  useEffect(() => {
    if (response && answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [response]);

  async function handleSubmit(q: string) {
    const trimmed = q.trim();
    if (!trimmed || isLoading) return;

    setHasInteracted(true);
    setIsLoading(true);
    setResponse(null);

    const result = await askStoryAssistant({ question: trimmed, story });
    setResponse(result);
    setIsLoading(false);
  }

  function handleSuggestedClick(q: string) {
    setQuestion(q);
    handleSubmit(q);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(question);
    }
  }

  function handleReset() {
    setQuestion('');
    setResponse(null);
    setHasInteracted(false);
    inputRef.current?.focus();
  }

  return (
    <section
      id="ask-the-story"
      aria-labelledby="story-assistant-heading"
      className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-24"
    >
      {/* ── Panel Container ── */}
      <div className="bg-[#f5efe6] border border-[#e2d9cc] rounded-2xl overflow-hidden">
        {/* Header Row */}
        <div className="px-6 pt-6 pb-4 border-b border-[#e2d9cc] space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-base" role="img" aria-label="Museum interpreter">
                🏛️
              </span>
              <div>
                <h2
                  id="story-assistant-heading"
                  className="font-serif text-lg font-bold text-[#1e1b4b] leading-tight"
                >
                  Ask the Story
                </h2>
                <p className="text-[11px] font-mono text-stone-500 mt-0.5">
                  Evidence-aware historical interpreter
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ClassificationBadge classification={story.classification} />
            </div>
          </div>

          {/* Classification warning */}
          {(story.classification === 'FOLKLORE' ||
            story.classification === 'ORAL_TRADITION' ||
            story.classification === 'HISTORICAL_DEBATE') && (
            <p className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 leading-relaxed">
              {story.classification === 'HISTORICAL_DEBATE'
                ? 'Scholarly interpretation of this subject is debated. Responses reflect the documented context — not a definitive verdict.'
                : 'This is a traditional account. Responses will clarify what is documented vs. traditional.'}
            </p>
          )}
        </div>

        {/* ── Suggested Questions (shown when idle) ── */}
        {!hasInteracted && (
          <div className="px-6 py-5 space-y-3">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
              Suggested questions
            </p>
            <div className="flex flex-col gap-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSuggestedClick(q)}
                  className="text-left text-xs text-[#1e1b4b] bg-white border border-stone-200 rounded-xl px-4 py-2.5 hover:border-amber-400 hover:bg-amber-50 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1 group"
                  aria-label={`Ask: ${q}`}
                >
                  <span className="text-amber-700 mr-1.5 group-hover:mr-2 transition-all">→</span>
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Response Area ── */}
        {(isLoading || response) && (
          <div ref={answerRef} className="px-6 py-5 space-y-4 border-t border-[#e2d9cc]">
            {/* The question asked */}
            <div className="bg-[#1e1b4b]/5 rounded-xl px-4 py-3">
              <p className="text-[11px] font-mono text-stone-500 mb-1">Your question</p>
              <p className="text-sm text-[#1e1b4b] font-medium leading-snug">{question}</p>
            </div>

            {/* Loading state */}
            {isLoading && (
              <div
                role="status"
                aria-live="polite"
                aria-label="Loading response"
                className="flex items-center gap-3 py-2"
              >
                <LoadingDots />
                <span className="text-xs text-stone-500 font-mono">
                  Consulting the story context…
                </span>
              </div>
            )}

            {/* Response state */}
            {!isLoading && response && !response.isError && (
              <div className="space-y-4" role="region" aria-label="AI response">
                {/* Fallback notice */}
                {response.isFallback && (
                  <div className="text-[10px] font-mono text-stone-500 bg-stone-100 border border-stone-200 rounded-lg px-3 py-2">
                    <span className="font-bold">Demonstration mode</span> — No AI provider
                    configured. Add{' '}
                    <code className="bg-stone-200 px-1 rounded">VITE_GEMINI_API_KEY</code> to{' '}
                    <code className="bg-stone-200 px-1 rounded">.env.local</code> for real
                    AI responses.
                  </div>
                )}

                {/* Classification warning if applicable */}
                {response.classificationWarning && (
                  <div className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 leading-relaxed">
                    {response.classificationWarning}
                  </div>
                )}

                {/* Answer body */}
                <div className="space-y-2">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">
                    Response
                  </p>
                  <div className="text-sm text-slate-800 leading-relaxed whitespace-pre-line font-sans">
                    {response.answer}
                  </div>
                </div>

                {/* Sources used */}
                {response.sourceIds.length > 0 && (
                  <div className="space-y-2 pt-3 border-t border-stone-200">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500">
                      Sources for this story
                    </p>
                    <div className="space-y-0 bg-white border border-stone-200 rounded-xl px-4 py-1">
                      {story.evidenceSources
                        .filter((src) => response.sourceIds.includes(src.id))
                        .map((src) => (
                          <SourceMiniCard key={src.id} source={src} />
                        ))}
                    </div>
                    <p className="text-[10px] text-stone-400 font-mono">
                      AI responses are grounded in the curated sources above. No URLs are
                      generated.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Error state */}
            {!isLoading && response?.isError && (
              <div
                role="alert"
                className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 space-y-1"
              >
                <p className="text-xs font-bold text-red-800">Unable to respond</p>
                <p className="text-xs text-red-700 leading-relaxed">
                  {response.errorMessage}
                </p>
              </div>
            )}

            {/* Ask another / reset */}
            {!isLoading && (
              <button
                onClick={handleReset}
                className="text-[11px] font-mono text-amber-900 hover:text-amber-700 underline underline-offset-2 transition-colors"
              >
                ← Ask another question
              </button>
            )}
          </div>
        )}

        {/* ── Input Area ── */}
        <div className="px-6 py-4 border-t border-[#e2d9cc] space-y-3">
          <label htmlFor="story-assistant-input" className="sr-only">
            Ask a question about this story
          </label>
          <div className="flex gap-2 items-end">
            <textarea
              id="story-assistant-input"
              ref={inputRef}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question about this story…"
              rows={2}
              maxLength={400}
              disabled={isLoading}
              aria-label="Ask a question about this story"
              className="flex-1 resize-none text-sm text-[#1e1b4b] placeholder-stone-400 bg-white border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-colors disabled:opacity-60 font-sans leading-relaxed"
            />
            <button
              onClick={() => handleSubmit(question)}
              disabled={isLoading || !question.trim()}
              aria-label="Submit question"
              className="px-4 py-3 bg-[#1e1b4b] text-amber-100 rounded-xl font-semibold text-xs hover:bg-amber-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1 shrink-0"
            >
              {isLoading ? (
                <span className="flex items-center gap-1.5">
                  <LoadingDots />
                  <span className="sr-only">Responding…</span>
                </span>
              ) : (
                'Ask'
              )}
            </button>
          </div>
          <p className="text-[10px] text-stone-400 font-mono leading-relaxed">
            Responses are grounded in the curated story content above. The AI does not
            generate historical claims beyond what is documented here.
            Press Enter to submit · Shift+Enter for new line.
          </p>
        </div>
      </div>
    </section>
  );
}
