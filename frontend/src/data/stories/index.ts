import type { Story, RegionalCategory, ContentClassification } from '../../types/domain';
import { MAHARASHTRA_STORIES } from './maharashtra';
import { WEST_BENGAL_STORIES } from './westBengal';
import { RAJASTHAN_STORIES } from './rajasthan';
import { TAMIL_NADU_STORIES } from './tamilNadu';
import { PAN_INDIA_STORIES } from './panIndia';

/**
 * Canonical story collection — all curated stories across all regions.
 * Only PUBLISHED stories with verified sources are included.
 */
export const ALL_STORIES: Story[] = [
  ...MAHARASHTRA_STORIES,
  ...WEST_BENGAL_STORIES,
  ...RAJASTHAN_STORIES,
  ...TAMIL_NADU_STORIES,
  ...PAN_INDIA_STORIES,
];

// ─── Selectors ───────────────────────────────────────────────

function normalizeRegionId(id: string): string {
  const clean = id.toUpperCase().trim();
  return clean.startsWith('IN-') ? clean : `IN-${clean}`;
}

export function getStoryById(id: string): Story | undefined {
  return ALL_STORIES.find((s) => s.id === id);
}

export function getStoryBySlug(slug: string): Story | undefined {
  return ALL_STORIES.find((s) => s.slug === slug);
}

export function getStoriesByRegion(regionId: string): Story[] {
  const targetId = normalizeRegionId(regionId);
  return ALL_STORIES.filter((s) => s.regionId === targetId && s.status === 'PUBLISHED');
}

export function getStoriesByCategory(category: RegionalCategory, regionId?: string): Story[] {
  let results = ALL_STORIES.filter((s) => s.category === category && s.status === 'PUBLISHED');
  if (regionId) {
    const targetId = normalizeRegionId(regionId);
    results = results.filter((s) => s.regionId === targetId);
  }
  return results;
}

export function getStoriesByClassification(classification: ContentClassification): Story[] {
  return ALL_STORIES.filter((s) => s.classification === classification && s.status === 'PUBLISHED');
}

export function getRelatedStories(story: Story): Story[] {
  if (!story.relatedStoryIds || story.relatedStoryIds.length === 0) return [];
  return story.relatedStoryIds
    .map((id) => ALL_STORIES.find((s) => s.id === id))
    .filter((s): s is Story => s !== undefined);
}

export function getFeaturedStory(regionId: string): Story | undefined {
  const stories = getStoriesByRegion(regionId);
  return stories.length > 0 ? stories[0] : undefined;
}

export function searchStories(query: string): Story[] {
  if (!query || query.trim().length === 0) return [];
  const q = query.toLowerCase().trim();
  return ALL_STORIES.filter((s) => {
    return (
      s.title.toLowerCase().includes(q) ||
      (s.subtitle && s.subtitle.toLowerCase().includes(q)) ||
      s.shortDescription.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q)) ||
      s.regionId.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
    );
  });
}

export function getRegionStoryCount(regionId: string): number {
  return getStoriesByRegion(regionId).length;
}

export function getCategoryStoryCount(category: RegionalCategory, regionId?: string): number {
  return getStoriesByCategory(category, regionId).length;
}
