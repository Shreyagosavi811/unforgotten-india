/**
 * AI Service — Unforgotten India
 *
 * Architecture:
 *   User Question
 *     → askStoryAssistant(question, story)
 *       → buildStoryContext(story)  [strictly bounded]
 *         → AIProvider.query(systemPrompt, userQuestion)
 *           → StoryAssistantResponse
 *
 * INTEGRITY RULES:
 * - AI receives ONLY the curated story context. No external data.
 * - AI must never fabricate historical facts, URLs, or citations.
 * - All responses are labelled by classification (Evidence / Debate / Folklore).
 * - No API keys are embedded in frontend code.
 *   Keys are read from Vite's import.meta.env (environment variables only).
 *
 * PROVIDER SELECTION:
 * - If VITE_GEMINI_API_KEY is set → use Google Gemini (gemini-1.5-flash)
 * - Otherwise → use DeterministicFallbackProvider (clearly labelled, no invented facts)
 */

import type { Story } from '../../types/domain';
import {
  buildStoryContext,
  type StoryAIContext,
} from './storyContext';

// ─── Public Types ─────────────────────────────────────────────

export interface StoryAssistantResponse {
  answer: string;
  sourceIds: string[];
  classificationLabel: string;
  classificationWarning: string | null;
  isFallback: boolean;
  isError: boolean;
  errorMessage: string | null;
}

export interface StoryAssistantRequest {
  question: string;
  story: Story;
}

// ─── Legacy types (preserved for backward compatibility) ───────

export interface AIServiceConfig {
  enabled: boolean;
  endpoint?: string;
  modelId?: string;
}

export interface AIContextInput {
  storyId?: string;
  regionId?: string;
  query: string;
  maxSourceReferences: number;
}

export interface AIResponse {
  text: string;
  sourceReferenceIds: string[];
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  disclaimers: string[];
}

/** @deprecated Use askStoryAssistant() instead */
export async function queryAIAssistant(_input: AIContextInput): Promise<AIResponse> {
  return {
    text: 'Use askStoryAssistant() for Phase 5A story Q&A.',
    sourceReferenceIds: [],
    confidence: 'LOW',
    disclaimers: ['Legacy stub — see askStoryAssistant().'],
  };
}

export const AI_SERVICE_CONFIG: AIServiceConfig = {
  enabled: true,
};

// ─── Provider Interface ───────────────────────────────────────

interface AIProvider {
  name: string;
  isAvailable(): boolean;
  query(systemPrompt: string, userQuestion: string): Promise<string>;
}

// ─── Classification Labels & Warnings ───────────────────────

const CLASSIFICATION_LABELS: Record<string, string> = {
  HISTORICAL_EVIDENCE: 'Historical Evidence',
  HISTORICAL_DEBATE: 'Historical Debate',
  FOLKLORE: 'Folklore',
  ORAL_TRADITION: 'Oral Tradition',
};

const CLASSIFICATION_WARNINGS: Record<string, string | null> = {
  HISTORICAL_EVIDENCE: null,
  HISTORICAL_DEBATE:
    'Scholarly interpretation of this subject remains debated. The response below reflects the documented context — not a definitive historical verdict.',
  FOLKLORE:
    'This is a traditional account. It is not presented as independently verified historical fact.',
  ORAL_TRADITION:
    'This account derives from oral tradition. It is not presented as independently verified historical fact.',
};

// ─── Gemini Provider ─────────────────────────────────────────

/**
 * Google Gemini provider.
 * Activated only when VITE_GEMINI_API_KEY is present in the environment.
 * API key is NEVER hardcoded — it must be set via .env.local:
 *   VITE_GEMINI_API_KEY=your_key_here
 */
const GeminiProvider: AIProvider = {
  name: 'Google Gemini (gemini-1.5-flash)',

  isAvailable(): boolean {
    const key = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
    return typeof key === 'string' && key.trim().length > 0;
  },

  async query(systemPrompt: string, userQuestion: string): Promise<string> {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string;
    const endpoint =
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

    const requestBody = {
      system_instruction: {
        parts: [{ text: systemPrompt }],
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: userQuestion }],
        },
      ],
      generationConfig: {
        temperature: 0.3,   // lower temperature = more grounded, less creative
        maxOutputTokens: 512,
        topK: 40,
        topP: 0.95,
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      ],
    };

    const response = await fetch(`${endpoint}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`Gemini API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const text: string | undefined =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text || text.trim().length === 0) {
      throw new Error('Gemini returned an empty response.');
    }

    return text.trim();
  },
};

// ─── Deterministic Fallback Provider ─────────────────────────

/**
 * Fallback provider — active when no real API key is configured.
 *
 * DOES NOT invent historical information.
 * DOES NOT make network calls.
 * Returns a deterministic, honest response that:
 *   - Acknowledges the question
 *   - Summarises what the story context says about the topic
 *   - Clearly labels itself as a demonstration fallback
 */
const DeterministicFallbackProvider: AIProvider = {
  name: 'Demonstration Fallback (no API configured)',

  isAvailable(): boolean {
    return true; // always available as last resort
  },

  async query(systemPrompt: string, userQuestion: string): Promise<string> {
    // Simulate a brief loading delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Extract the narrative text from the system prompt for basic summarisation
    const narrativeMatch = systemPrompt.match(/STORY CONTENT:\n([\s\S]+?)(?:\n\nEnd of story context)/);
    const narrativeSnippet = narrativeMatch
      ? narrativeMatch[1].slice(0, 400).replace(/\[.*?\]/g, '').trim()
      : '';

    const questionLower = userQuestion.toLowerCase();

    // Pattern-match common question types for a more useful (but still honest) response
    if (
      questionLower.includes('evidence') ||
      questionLower.includes('source') ||
      questionLower.includes('know') ||
      questionLower.includes('documented')
    ) {
      return [
        `[Demonstration Fallback — configure VITE_GEMINI_API_KEY for real AI responses]`,
        ``,
        `The sources documented for this story include the evidence listed in the "How do we know?" section below. These represent the primary and secondary materials consulted by the curators.`,
        narrativeSnippet
          ? `\nFrom the story context: "${narrativeSnippet}…"`
          : '',
        ``,
        `For a full AI-powered answer, a Gemini API key must be configured.`,
      ]
        .filter(Boolean)
        .join('\n');
    }

    if (
      questionLower.includes('important') ||
      questionLower.includes('significant') ||
      questionLower.includes('why')
    ) {
      return [
        `[Demonstration Fallback — configure VITE_GEMINI_API_KEY for real AI responses]`,
        ``,
        `The significance of this story is described in its curated narrative sections above. The classification and evidence sources reflect the editorial judgement of the Unforgotten India research team.`,
        narrativeSnippet
          ? `\nFrom the story context: "${narrativeSnippet}…"`
          : '',
        ``,
        `For a full AI-powered answer grounded in all narrative sections and sources, configure VITE_GEMINI_API_KEY.`,
      ]
        .filter(Boolean)
        .join('\n');
    }

    // Generic fallback
    return [
      `[Demonstration Fallback — configure VITE_GEMINI_API_KEY for real AI responses]`,
      ``,
      `Your question: "${userQuestion}"`,
      ``,
      `The story content and evidence sources above contain the curated information available for this topic. This demonstration fallback does not generate synthesised answers.`,
      narrativeSnippet
        ? `\nAvailable context begins: "${narrativeSnippet}…"`
        : '',
      ``,
      `To enable full AI-powered responses, add VITE_GEMINI_API_KEY to your .env.local file.`,
    ]
      .filter(Boolean)
      .join('\n');
  },
};

// ─── Provider Selection ───────────────────────────────────────

function selectProvider(): AIProvider {
  if (GeminiProvider.isAvailable()) {
    return GeminiProvider;
  }
  return DeterministicFallbackProvider;
}

// ─── Public API ───────────────────────────────────────────────

/**
 * askStoryAssistant — the primary Phase 5A function.
 *
 * Accepts a user question and a Story object.
 * Builds a strictly bounded context and routes to the active AI provider.
 * Returns a StoryAssistantResponse with classification metadata.
 *
 * The AI ONLY receives the current story's content — no other data.
 */
export async function askStoryAssistant(
  request: StoryAssistantRequest,
): Promise<StoryAssistantResponse> {
  const { question, story } = request;

  const trimmedQuestion = question.trim();
  if (!trimmedQuestion) {
    return {
      answer: '',
      sourceIds: [],
      classificationLabel: CLASSIFICATION_LABELS[story.classification] ?? story.classification,
      classificationWarning: CLASSIFICATION_WARNINGS[story.classification] ?? null,
      isFallback: false,
      isError: true,
      errorMessage: 'Question cannot be empty.',
    };
  }

  const context: StoryAIContext = buildStoryContext(story);
  const provider = selectProvider();
  const isFallback = provider.name === DeterministicFallbackProvider.name;

  try {
    const answer = await provider.query(context.systemPrompt, trimmedQuestion);

    return {
      answer,
      sourceIds: context.evidenceSources.map((s) => s.id),
      classificationLabel: context.classificationLabel,
      classificationWarning: CLASSIFICATION_WARNINGS[story.classification] ?? null,
      isFallback,
      isError: false,
      errorMessage: null,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
    return {
      answer: '',
      sourceIds: [],
      classificationLabel: context.classificationLabel,
      classificationWarning: CLASSIFICATION_WARNINGS[story.classification] ?? null,
      isFallback,
      isError: true,
      errorMessage: `Unable to reach the AI assistant. ${message}`,
    };
  }
}

/**
 * Re-export context utilities for use in components and tests.
 */
export { buildStoryContext, buildSuggestedQuestions } from './storyContext';
export type { StoryAIContext, BoundedEvidenceSource, BoundedNarrativeSection } from './storyContext';
