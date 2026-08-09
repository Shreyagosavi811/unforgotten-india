import { describe, test, expect } from 'vitest';
import {
  ALL_STORIES,
  getStoryById,
  getStoryBySlug,
  getStoriesByRegion,
  getStoriesByCategory,
  getStoriesByClassification,
  getRelatedStories,
  getFeaturedStory,
  searchStories,
  getRegionStoryCount,
  getCategoryStoryCount,
} from '../data/stories/index';

describe('Story Repository', () => {
  test('ALL_STORIES contains curated stories', () => {
    expect(ALL_STORIES.length).toBeGreaterThanOrEqual(8);
    expect(ALL_STORIES.length).toBeLessThanOrEqual(20);
  });

  test('every story has required fields', () => {
    for (const story of ALL_STORIES) {
      expect(story.id).toBeTruthy();
      expect(story.slug).toBeTruthy();
      expect(story.title).toBeTruthy();
      expect(story.shortDescription).toBeTruthy();
      expect(story.regionId).toBeTruthy();
      expect(story.category).toBeTruthy();
      expect(story.classification).toBeTruthy();
      expect(story.status).toBe('PUBLISHED');
      expect(story.estimatedReadingMinutes).toBeGreaterThan(0);
      expect(story.narrativeSections.length).toBeGreaterThan(0);
      expect(story.evidenceSources.length).toBeGreaterThan(0);
      expect(story.tags.length).toBeGreaterThan(0);
    }
  });

  test('no story contains fabricated counts or Lorem ipsum', () => {
    const serialized = JSON.stringify(ALL_STORIES);
    expect(serialized).not.toContain('Lorem ipsum');
    expect(serialized).not.toContain('storyCount');
    expect(serialized).not.toContain('42 stories');
  });
});

describe('getStoryById', () => {
  test('returns a valid story for known ID', () => {
    const story = getStoryById('mh-001');
    expect(story).toBeDefined();
    expect(story!.title).toContain('Savitribai');
  });

  test('returns undefined for unknown ID', () => {
    expect(getStoryById('xxx-999')).toBeUndefined();
  });
});

describe('getStoryBySlug', () => {
  test('returns story for valid slug', () => {
    const story = getStoryBySlug('savitribai-phule-first-school');
    expect(story).toBeDefined();
    expect(story!.id).toBe('mh-001');
  });

  test('returns undefined for invalid slug', () => {
    expect(getStoryBySlug('nonexistent-story-slug')).toBeUndefined();
  });
});

describe('getStoriesByRegion', () => {
  test('returns Maharashtra stories', () => {
    const stories = getStoriesByRegion('IN-MH');
    expect(stories.length).toBeGreaterThanOrEqual(3);
    stories.forEach((s) => expect(s.regionId).toBe('IN-MH'));
  });

  test('normalizes region ID', () => {
    const a = getStoriesByRegion('IN-MH');
    const b = getStoriesByRegion('mh');
    expect(a.length).toBe(b.length);
  });

  test('returns empty array for region without stories', () => {
    const stories = getStoriesByRegion('IN-SK');
    expect(stories).toEqual([]);
  });
});

describe('getStoriesByCategory', () => {
  test('returns PEOPLE stories', () => {
    const stories = getStoriesByCategory('PEOPLE');
    expect(stories.length).toBeGreaterThan(0);
    stories.forEach((s) => expect(s.category).toBe('PEOPLE'));
  });

  test('filters by region when provided', () => {
    const stories = getStoriesByCategory('PEOPLE', 'IN-MH');
    stories.forEach((s) => {
      expect(s.category).toBe('PEOPLE');
      expect(s.regionId).toBe('IN-MH');
    });
  });
});

describe('getStoriesByClassification', () => {
  test('returns FOLKLORE stories', () => {
    const stories = getStoriesByClassification('FOLKLORE');
    stories.forEach((s) => expect(s.classification).toBe('FOLKLORE'));
  });

  test('returns ORAL_TRADITION stories', () => {
    const stories = getStoriesByClassification('ORAL_TRADITION');
    stories.forEach((s) => expect(s.classification).toBe('ORAL_TRADITION'));
  });
});

describe('getRelatedStories', () => {
  test('returns related stories for a story with relations', () => {
    const story = getStoryById('mh-001')!;
    const related = getRelatedStories(story);
    expect(related.length).toBeGreaterThan(0);
  });
});

describe('getFeaturedStory', () => {
  test('returns first story for region with content', () => {
    const featured = getFeaturedStory('IN-MH');
    expect(featured).toBeDefined();
    expect(featured!.regionId).toBe('IN-MH');
  });

  test('returns undefined for region without content', () => {
    expect(getFeaturedStory('IN-SK')).toBeUndefined();
  });
});

describe('searchStories', () => {
  test('finds stories by title keyword', () => {
    const results = searchStories('Phule');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].title).toContain('Phule');
  });

  test('finds stories by tag', () => {
    const results = searchStories('stepwell');
    expect(results.length).toBeGreaterThan(0);
  });

  test('returns empty for no match', () => {
    expect(searchStories('xyznonexistent')).toEqual([]);
  });

  test('returns empty for empty query', () => {
    expect(searchStories('')).toEqual([]);
    expect(searchStories('   ')).toEqual([]);
  });
});

describe('count helpers', () => {
  test('getRegionStoryCount returns correct count', () => {
    expect(getRegionStoryCount('IN-MH')).toBeGreaterThanOrEqual(3);
    expect(getRegionStoryCount('IN-SK')).toBe(0);
  });

  test('getCategoryStoryCount returns correct count', () => {
    expect(getCategoryStoryCount('PEOPLE')).toBeGreaterThan(0);
    expect(getCategoryStoryCount('PEOPLE', 'IN-MH')).toBeGreaterThanOrEqual(1);
  });
});
