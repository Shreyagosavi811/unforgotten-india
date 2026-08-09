/**
 * Tests for Phase 5A: AI Story Assistant
 *
 * Covers:
 * - Story context generation (fields included / excluded)
 * - Classification handling
 * - Evidence sources preserved
 * - Suggested questions
 * - Empty question handling
 * - Deterministic fallback behaviour
 * - No fabricated source URLs in context
 * - askStoryAssistant contract
 */

import { describe, test, expect } from 'vitest';
import { buildStoryContext, buildSuggestedQuestions } from '../services/ai/storyContext';
import { askStoryAssistant } from '../services/ai/index';
import type { Story } from '../types/domain';

// ─── Fixtures ─────────────────────────────────────────────────

const MOCK_STORY_HISTORICAL: Story = {
  id: 'test-001',
  slug: 'test-historical-story',
  title: 'A Documented Historical Event',
  subtitle: 'How something happened',
  shortDescription: 'A short description of the documented event.',
  regionId: 'IN-MH',
  category: 'EVENTS',
  classification: 'HISTORICAL_EVIDENCE',
  status: 'PUBLISHED',
  historicalPeriod: '1850–1900 CE',
  estimatedReadingMinutes: 5,
  tags: ['history', 'test', 'maharashtra'],
  narrativeSections: [
    {
      id: 'sec-1',
      type: 'NARRATIVE',
      heading: 'The Beginning',
      body: 'This is the first paragraph of the narrative.',
    },
    {
      id: 'sec-2',
      type: 'QUOTE',
      body: '"A famous quote from this era."',
      attribution: 'A Known Figure, 1875',
    },
    {
      id: 'sec-3',
      type: 'CONTEXT',
      heading: 'Historical Context',
      body: 'Some contextual information about the period.',
    },
  ],
  evidenceSources: [
    {
      id: 'src-1',
      title: 'Primary Archive Document',
      publisher: 'National Archives of India',
      sourceType: 'OFFICIAL_ARCHIVE',
      verificationLevel: 'PRIMARY',
      url: 'https://archives.gov.in/test-document',
      citation: 'NAI Document Reference 1875.',
      notes: 'Authentic archive record.',
    },
    {
      id: 'src-2',
      title: 'A Scholarly Book',
      publisher: 'Oxford University Press',
      sourceType: 'BOOK',
      verificationLevel: 'SECONDARY',
      citation: 'Scholar Name, 1995.',
    },
  ],
  relatedStoryIds: ['mh-001', 'wb-001'],
  relatedRegionIds: ['IN-WB'],
  audioNarration: { available: false },
};

const MOCK_STORY_FOLKLORE: Story = {
  ...MOCK_STORY_HISTORICAL,
  id: 'test-002',
  slug: 'test-folklore-story',
  title: 'A Traditional Oral Tale',
  classification: 'FOLKLORE',
  evidenceSources: [
    {
      id: 'folk-src-1',
      title: 'Fieldwork Documentation',
      publisher: 'Local Research Institute',
      sourceType: 'ORAL_SOURCE',
      verificationLevel: 'ORAL',
    },
  ],
};

const MOCK_STORY_DEBATE: Story = {
  ...MOCK_STORY_HISTORICAL,
  id: 'test-003',
  slug: 'test-debate-story',
  title: 'A Historically Debated Topic',
  classification: 'HISTORICAL_DEBATE',
};

const MOCK_STORY_ORAL: Story = {
  ...MOCK_STORY_HISTORICAL,
  id: 'test-004',
  slug: 'test-oral-story',
  title: 'An Oral Tradition Story',
  classification: 'ORAL_TRADITION',
};

// ─── buildStoryContext Tests ──────────────────────────────────

describe('buildStoryContext', () => {
  test('includes required story fields', () => {
    const ctx = buildStoryContext(MOCK_STORY_HISTORICAL);
    expect(ctx.storyId).toBe('test-001');
    expect(ctx.storySlug).toBe('test-historical-story');
    expect(ctx.title).toBe('A Documented Historical Event');
    expect(ctx.subtitle).toBe('How something happened');
    expect(ctx.summary).toBe('A short description of the documented event.');
    expect(ctx.regionId).toBe('IN-MH');
    expect(ctx.category).toBe('EVENTS');
    expect(ctx.historicalPeriod).toBe('1850–1900 CE');
  });

  test('includes all narrative sections', () => {
    const ctx = buildStoryContext(MOCK_STORY_HISTORICAL);
    expect(ctx.narrativeSections).toHaveLength(3);
    expect(ctx.narrativeSections[0].id).toBe('sec-1');
    expect(ctx.narrativeSections[0].heading).toBe('The Beginning');
    expect(ctx.narrativeSections[0].body).toBeTruthy();
    expect(ctx.narrativeSections[1].type).toBe('QUOTE');
    expect(ctx.narrativeSections[1].attribution).toBe('A Known Figure, 1875');
  });

  test('includes evidence sources with required fields', () => {
    const ctx = buildStoryContext(MOCK_STORY_HISTORICAL);
    expect(ctx.evidenceSources).toHaveLength(2);
    expect(ctx.evidenceSources[0].id).toBe('src-1');
    expect(ctx.evidenceSources[0].title).toBe('Primary Archive Document');
    expect(ctx.evidenceSources[0].publisher).toBe('National Archives of India');
    expect(ctx.evidenceSources[0].verificationLevel).toBe('PRIMARY');
    expect(ctx.evidenceSources[0].citation).toBe('NAI Document Reference 1875.');
    expect(ctx.evidenceSources[0].notes).toBe('Authentic archive record.');
  });

  test('EXCLUDES url from bounded evidence sources', () => {
    const ctx = buildStoryContext(MOCK_STORY_HISTORICAL);
    // URL must not be present in the context sent to AI (prevents hallucinated URLs)
    for (const src of ctx.evidenceSources) {
      expect((src as any).url).toBeUndefined();
    }
  });

  test('includes relatedStoryIds and relatedRegionIds', () => {
    const ctx = buildStoryContext(MOCK_STORY_HISTORICAL);
    expect(ctx.relatedStoryIds).toContain('mh-001');
    expect(ctx.relatedStoryIds).toContain('wb-001');
    expect(ctx.relatedRegionIds).toContain('IN-WB');
  });

  test('includes tags', () => {
    const ctx = buildStoryContext(MOCK_STORY_HISTORICAL);
    expect(ctx.tags).toContain('history');
    expect(ctx.tags).toContain('maharashtra');
  });

  test('systemPrompt is a non-empty string', () => {
    const ctx = buildStoryContext(MOCK_STORY_HISTORICAL);
    expect(typeof ctx.systemPrompt).toBe('string');
    expect(ctx.systemPrompt.length).toBeGreaterThan(200);
  });

  test('systemPrompt contains story title', () => {
    const ctx = buildStoryContext(MOCK_STORY_HISTORICAL);
    expect(ctx.systemPrompt).toContain('A Documented Historical Event');
  });

  test('systemPrompt contains classification instruction', () => {
    const ctx = buildStoryContext(MOCK_STORY_HISTORICAL);
    expect(ctx.systemPrompt).toContain('HISTORICAL EVIDENCE');
  });

  test('systemPrompt contains narrative body text', () => {
    const ctx = buildStoryContext(MOCK_STORY_HISTORICAL);
    expect(ctx.systemPrompt).toContain('This is the first paragraph of the narrative.');
  });

  test('systemPrompt does NOT contain source URLs', () => {
    const ctx = buildStoryContext(MOCK_STORY_HISTORICAL);
    expect(ctx.systemPrompt).not.toContain('https://archives.gov.in');
  });
});

// ─── Classification Handling Tests ───────────────────────────

describe('buildStoryContext — classification handling', () => {
  test('HISTORICAL_EVIDENCE classification label is correct', () => {
    const ctx = buildStoryContext(MOCK_STORY_HISTORICAL);
    expect(ctx.classificationLabel).toBe('Historical Evidence');
    expect(ctx.classificationInstruction).toContain('HISTORICAL EVIDENCE');
  });

  test('FOLKLORE classification label is correct', () => {
    const ctx = buildStoryContext(MOCK_STORY_FOLKLORE);
    expect(ctx.classificationLabel).toBe('Folklore');
    expect(ctx.classificationInstruction).toContain('FOLKLORE');
  });

  test('HISTORICAL_DEBATE classification label is correct', () => {
    const ctx = buildStoryContext(MOCK_STORY_DEBATE);
    expect(ctx.classificationLabel).toBe('Historical Debate');
    expect(ctx.classificationInstruction).toContain('HISTORICAL DEBATE');
  });

  test('ORAL_TRADITION classification label is correct', () => {
    const ctx = buildStoryContext(MOCK_STORY_ORAL);
    expect(ctx.classificationLabel).toBe('Oral Tradition');
    expect(ctx.classificationInstruction).toContain('ORAL TRADITION');
  });

  test('FOLKLORE system prompt warns about traditional account', () => {
    const ctx = buildStoryContext(MOCK_STORY_FOLKLORE);
    expect(ctx.systemPrompt).toContain('FOLKLORE');
  });

  test('HISTORICAL_DEBATE system prompt mentions debate', () => {
    const ctx = buildStoryContext(MOCK_STORY_DEBATE);
    expect(ctx.systemPrompt).toContain('debated');
  });
});

// ─── Suggested Questions Tests ────────────────────────────────

describe('buildSuggestedQuestions', () => {
  test('returns exactly 5 questions', () => {
    const questions = buildSuggestedQuestions(MOCK_STORY_HISTORICAL);
    expect(questions).toHaveLength(5);
  });

  test('all questions are non-empty strings', () => {
    const questions = buildSuggestedQuestions(MOCK_STORY_HISTORICAL);
    questions.forEach((q) => {
      expect(typeof q).toBe('string');
      expect(q.trim().length).toBeGreaterThan(0);
    });
  });

  test('FOLKLORE questions mention traditional nature', () => {
    const questions = buildSuggestedQuestions(MOCK_STORY_FOLKLORE);
    const combined = questions.join(' ').toLowerCase();
    expect(combined).toMatch(/traditional|verified|folklore/i);
  });

  test('HISTORICAL_DEBATE questions mention debate', () => {
    const questions = buildSuggestedQuestions(MOCK_STORY_DEBATE);
    const combined = questions.join(' ').toLowerCase();
    expect(combined).toMatch(/debate|historian|scholar/i);
  });
});

// ─── askStoryAssistant Contract Tests ────────────────────────

describe('askStoryAssistant', () => {
  test('returns error response for empty question', async () => {
    const result = await askStoryAssistant({ question: '', story: MOCK_STORY_HISTORICAL });
    expect(result.isError).toBe(true);
    expect(result.errorMessage).toBeTruthy();
    expect(result.answer).toBe('');
  });

  test('returns error response for whitespace-only question', async () => {
    const result = await askStoryAssistant({ question: '   ', story: MOCK_STORY_HISTORICAL });
    expect(result.isError).toBe(true);
  });

  test('returns a response for a valid question (fallback mode)', async () => {
    const result = await askStoryAssistant({
      question: 'What do we know about this story?',
      story: MOCK_STORY_HISTORICAL,
    });
    expect(result.isError).toBe(false);
    expect(result.answer.length).toBeGreaterThan(0);
  });

  test('response includes classificationLabel', async () => {
    const result = await askStoryAssistant({
      question: 'What is the evidence?',
      story: MOCK_STORY_HISTORICAL,
    });
    expect(result.classificationLabel).toBe('Historical Evidence');
  });

  test('FOLKLORE response has classificationWarning set', async () => {
    const result = await askStoryAssistant({
      question: 'Tell me about this tradition.',
      story: MOCK_STORY_FOLKLORE,
    });
    expect(result.classificationWarning).not.toBeNull();
    expect(result.classificationWarning!.length).toBeGreaterThan(0);
  });

  test('HISTORICAL_EVIDENCE response has null classificationWarning', async () => {
    const result = await askStoryAssistant({
      question: 'What happened?',
      story: MOCK_STORY_HISTORICAL,
    });
    expect(result.classificationWarning).toBeNull();
  });

  test('response sourceIds reference actual story evidence source IDs', async () => {
    const result = await askStoryAssistant({
      question: 'What are the sources?',
      story: MOCK_STORY_HISTORICAL,
    });
    if (!result.isError) {
      result.sourceIds.forEach((id) => {
        const validIds = MOCK_STORY_HISTORICAL.evidenceSources.map((s) => s.id);
        expect(validIds).toContain(id);
      });
    }
  });

  test('fallback response does not contain fabricated URLs', async () => {
    const result = await askStoryAssistant({
      question: 'Where can I find more information?',
      story: MOCK_STORY_HISTORICAL,
    });
    if (!result.isError) {
      // Fallback must not fabricate URLs
      expect(result.answer).not.toMatch(/https?:\/\/[^\s]+/);
    }
  });

  test('isFallback is true when no real API is configured', async () => {
    // In test environment, VITE_GEMINI_API_KEY is not set → fallback must be used
    const result = await askStoryAssistant({
      question: 'What is this about?',
      story: MOCK_STORY_HISTORICAL,
    });
    expect(result.isFallback).toBe(true);
  });
});

// ─── Context Isolation Tests ──────────────────────────────────

describe('context isolation', () => {
  test('context does not include data from other stories', () => {
    const ctx = buildStoryContext(MOCK_STORY_HISTORICAL);
    const ctxString = JSON.stringify(ctx);
    // The context should only contain this story's ID, not others
    expect(ctxString).toContain('test-001');
    expect(ctxString).not.toContain('test-002');
    expect(ctxString).not.toContain('test-003');
  });

  test('mutating relatedStoryIds on returned context does not affect original story', () => {
    const ctx = buildStoryContext(MOCK_STORY_HISTORICAL);
    ctx.relatedStoryIds.push('INJECTED-ID');
    expect(MOCK_STORY_HISTORICAL.relatedStoryIds).not.toContain('INJECTED-ID');
  });

  test('mutating tags on returned context does not affect original story', () => {
    const ctx = buildStoryContext(MOCK_STORY_HISTORICAL);
    ctx.tags.push('INJECTED-TAG');
    expect(MOCK_STORY_HISTORICAL.tags).not.toContain('INJECTED-TAG');
  });
});
