/**
 * Domain Architecture Types for Unforgotten India
 * Phase 4: Real Content Engine + Digital Museum Story Experience
 */

export interface HealthCheckResponse {
  status: string;
  service: string;
  version: string;
}

export type ContentLifecycleStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type ContentClassification =
  | 'HISTORICAL_EVIDENCE'
  | 'HISTORICAL_DEBATE'
  | 'FOLKLORE'
  | 'ORAL_TRADITION';

export type RegionalCategory =
  | 'PEOPLE'
  | 'PLACES'
  | 'EVENTS'
  | 'MOVEMENTS'
  | 'STORIES'
  | 'FOLKLORE';

export type Category = RegionalCategory | 'TIMELINE';

export interface RegionalCategoryInfo {
  id: RegionalCategory;
  title: string;
  description: string;
  available: boolean;
}

// ─── Story Section Types ─────────────────────────────────────
export type StorySectionType =
  | 'NARRATIVE'
  | 'CONTEXT'
  | 'TIMELINE'
  | 'QUOTE'
  | 'IMAGE'
  | 'MAP'
  | 'EVIDENCE'
  | 'REFLECTION';

export interface StoryMedia {
  type: 'IMAGE' | 'MAP' | 'ILLUSTRATION' | 'ARCHIVAL_IMAGE' | 'AUDIO' | 'VIDEO';
  url?: string;
  alt: string;
  caption?: string;
  source?: string;
  isAiReconstruction?: boolean;
}

export interface NarrativeSection {
  id: string;
  type: StorySectionType;
  heading?: string;
  body: string;
  attribution?: string;
  media?: StoryMedia[];
}

// ─── Evidence / Source System ────────────────────────────────
export type EvidenceSourceType =
  | 'OFFICIAL_ARCHIVE'
  | 'GOVERNMENT'
  | 'MUSEUM'
  | 'ASI'
  | 'ACADEMIC'
  | 'BOOK'
  | 'RESEARCH_PAPER'
  | 'REPUTABLE_SECONDARY'
  | 'ORAL_SOURCE';

export type VerificationLevel =
  | 'PRIMARY'
  | 'SECONDARY'
  | 'TERTIARY'
  | 'ORAL';

export interface EvidenceSource {
  id: string;
  title: string;
  publisher: string;
  sourceType: EvidenceSourceType;
  url?: string;
  citation?: string;
  verificationLevel: VerificationLevel;
  notes?: string;
}

// ─── Audio Narration Metadata ────────────────────────────────
export interface AudioNarrationMeta {
  available: boolean;
  audioUrl?: string;
  narrator?: string;
  durationSeconds?: number;
}

// ─── Story Domain Model ─────────────────────────────────────
export interface Story {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  shortDescription: string;
  regionId: string;
  category: RegionalCategory;
  classification: ContentClassification;
  status: ContentLifecycleStatus;
  historicalPeriod?: string;
  estimatedReadingMinutes: number;
  heroMedia?: StoryMedia;
  narrativeSections: NarrativeSection[];
  evidenceSources: EvidenceSource[];
  relatedStoryIds?: string[];
  relatedRegionIds?: string[];
  tags: string[];
  audioNarration?: AudioNarrationMeta;
  timelineEntries?: TimelineEntry[];
}

// ─── Timeline Entry ──────────────────────────────────────────
export interface TimelineEntry {
  id: string;
  yearLabel: string;
  title: string;
  description: string;
  periodEra?: 'ancient' | 'medieval' | 'early_modern' | 'colonial' | 'modern';
  storyId?: string;
}

// ─── Region Base Type ────────────────────────────────────────
export interface Region {
  id: string;
  name: string;
  code: string;
  capital?: string;
  description: string;
  availableCategories: Category[];
}
