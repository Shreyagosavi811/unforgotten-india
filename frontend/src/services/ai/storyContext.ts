/**
 * Story Context Builder — Unforgotten India
 *
 * Transforms a Story object into a strictly bounded context for AI inference.
 *
 * IMPORTANT CONSTRAINTS:
 * - Only fields from the current story are included.
 * - No other stories or user data are ever included.
 * - The context explicitly labels what is documented vs. debated vs. oral tradition.
 * - The AI must respond only from within this bounded context.
 */

import type { Story, EvidenceSource, NarrativeSection } from '../../types/domain';

// ─── Public Types ────────────────────────────────────────────

/** Strictly bounded context sent to the AI provider. */
export interface StoryAIContext {
  storyId: string;
  storySlug: string;
  title: string;
  subtitle: string | undefined;
  summary: string;
  classification: string;
  classificationLabel: string;
  classificationInstruction: string;
  historicalPeriod: string | undefined;
  regionId: string;
  category: string;
  tags: string[];
  narrativeSections: BoundedNarrativeSection[];
  evidenceSources: BoundedEvidenceSource[];
  relatedStoryIds: string[];
  relatedRegionIds: string[];
  /** Pre-built system instruction for AI providers */
  systemPrompt: string;
}

export interface BoundedNarrativeSection {
  id: string;
  type: string;
  heading: string | undefined;
  body: string;
  attribution: string | undefined;
}

export interface BoundedEvidenceSource {
  id: string;
  title: string;
  publisher: string;
  sourceType: string;
  verificationLevel: string;
  citation: string | undefined;
  notes: string | undefined;
  /** URL is deliberately EXCLUDED from AI context to prevent hallucination of URLs */
}

// ─── Classification Labels ────────────────────────────────────

const CLASSIFICATION_LABELS: Record<string, string> = {
  HISTORICAL_EVIDENCE: 'Historical Evidence',
  HISTORICAL_DEBATE: 'Historical Debate',
  FOLKLORE: 'Folklore',
  ORAL_TRADITION: 'Oral Tradition',
};

const CLASSIFICATION_INSTRUCTIONS: Record<string, string> = {
  HISTORICAL_EVIDENCE:
    'This story is classified as HISTORICAL EVIDENCE. When answering, state clearly that the account is supported by documented primary or secondary sources. Reference the specific evidence sources provided. Do not speculate beyond what the sources support.',
  HISTORICAL_DEBATE:
    'This story is classified as HISTORICAL DEBATE. When answering, explicitly state that scholarly interpretation of this subject remains debated. Present multiple perspectives where they exist in the provided context. Do not assert a single definitive answer.',
  FOLKLORE:
    'This story is classified as FOLKLORE. When answering, explicitly state that this is a traditional account and is NOT presented as independently verified historical fact. Treat it as a cultural narrative, not a documented record.',
  ORAL_TRADITION:
    'This story is classified as ORAL TRADITION. When answering, explicitly state that this account derives from oral tradition and is NOT presented as independently verified historical fact. Distinguish clearly between oral tradition and documented evidence.',
};

// ─── Context Builder ──────────────────────────────────────────

/**
 * Builds a StoryAIContext from a Story object.
 *
 * This is the ONLY source of data that should reach the AI provider.
 * The system prompt enforces that the AI responds ONLY from this context.
 */
export function buildStoryContext(story: Story): StoryAIContext {
  const classificationLabel =
    CLASSIFICATION_LABELS[story.classification] ?? story.classification;
  const classificationInstruction =
    CLASSIFICATION_INSTRUCTIONS[story.classification] ??
    CLASSIFICATION_INSTRUCTIONS['HISTORICAL_EVIDENCE'];

  const boundedSections: BoundedNarrativeSection[] = story.narrativeSections.map(
    (s: NarrativeSection) => ({
      id: s.id,
      type: s.type,
      heading: s.heading,
      body: s.body,
      attribution: s.attribution,
    }),
  );

  const boundedSources: BoundedEvidenceSource[] = story.evidenceSources.map(
    (src: EvidenceSource) => ({
      id: src.id,
      title: src.title,
      publisher: src.publisher,
      sourceType: src.sourceType,
      verificationLevel: src.verificationLevel,
      citation: src.citation,
      notes: src.notes,
      // url intentionally excluded — AI must not repeat or hallucinate URLs
    }),
  );

  const systemPrompt = buildSystemPrompt({
    title: story.title,
    classificationLabel,
    classificationInstruction,
    evidenceSources: boundedSources,
    narrativeSections: boundedSections,
  });

  return {
    storyId: story.id,
    storySlug: story.slug,
    title: story.title,
    subtitle: story.subtitle,
    summary: story.shortDescription,
    classification: story.classification,
    classificationLabel,
    classificationInstruction,
    historicalPeriod: story.historicalPeriod,
    regionId: story.regionId,
    category: story.category,
    tags: [...story.tags],
    narrativeSections: boundedSections,
    evidenceSources: boundedSources,
    relatedStoryIds: [...(story.relatedStoryIds ?? [])],
    relatedRegionIds: [...(story.relatedRegionIds ?? [])],
    systemPrompt,
  };
}

// ─── System Prompt Builder ────────────────────────────────────

interface SystemPromptInput {
  title: string;
  classificationLabel: string;
  classificationInstruction: string;
  evidenceSources: BoundedEvidenceSource[];
  narrativeSections: BoundedNarrativeSection[];
}

function buildSystemPrompt(input: SystemPromptInput): string {
  const sourceList = input.evidenceSources
    .map(
      (src, i) =>
        `  [Source ${i + 1}] "${src.title}" — ${src.publisher} (${src.verificationLevel} / ${src.sourceType})${src.citation ? ' — ' + src.citation : ''}${src.notes ? '. ' + src.notes : ''}`,
    )
    .join('\n');

  const narrativeText = input.narrativeSections
    .map((s) => {
      const prefix = s.type === 'QUOTE' ? `QUOTE (${s.attribution ?? 'unknown'})` : s.type;
      return `[${prefix}]${s.heading ? ' ' + s.heading + ':' : ''} ${s.body}`;
    })
    .join('\n\n');

  return `You are an evidence-aware historical assistant embedded in Unforgotten India, a digital museum platform.

STORY: "${input.title}"
CLASSIFICATION: ${input.classificationLabel}

CRITICAL INSTRUCTION: ${input.classificationInstruction}

STRICT RULES — YOU MUST FOLLOW THESE:
1. Answer ONLY using the story context provided below. Do not use external knowledge or invent information.
2. Never fabricate dates, names, locations, statistics, or citations not present in this context.
3. Never generate URLs. If a source has a URL, do not reference it — only reference the source title and publisher.
4. If the question cannot be answered from the provided context, say clearly: "The available sources for this story do not address that question."
5. Keep responses concise and clear — 2–4 paragraphs maximum.
6. Always distinguish between what is documented evidence vs. what is traditionally held or debated.
7. When referencing a source, cite it by title and publisher as given — do not invent bibliographic details.

EVIDENCE SOURCES FOR THIS STORY:
${sourceList || '  No formal sources documented.'}

STORY CONTENT:
${narrativeText}

End of story context. Respond only from the above.`;
}

// ─── Suggested Questions ──────────────────────────────────────

/**
 * Returns 5 contextually appropriate suggested questions for the story.
 * Questions vary by classification so folklore vs evidence are framed differently.
 */
export function buildSuggestedQuestions(story: Story): string[] {
  const base: string[] = [
    `What do we actually know about ${story.title.split(':')[0]}?`,
    'What evidence supports this account?',
    'Why is this story historically significant?',
  ];

  const byClassification: Record<string, string[]> = {
    HISTORICAL_EVIDENCE: [
      'What are the primary sources for this?',
      'How did this event change what came after?',
    ],
    HISTORICAL_DEBATE: [
      'What aspects of this are still debated by historians?',
      'What do different scholars say about this?',
    ],
    FOLKLORE: [
      'Is this story historically verified or traditional?',
      'How has this tradition been preserved over time?',
    ],
    ORAL_TRADITION: [
      'Is this account verified or part of oral tradition?',
      'Who has documented this tradition and how?',
    ],
  };

  const extra = byClassification[story.classification] ?? byClassification['HISTORICAL_EVIDENCE'];
  return [...base, ...extra].slice(0, 5);
}
