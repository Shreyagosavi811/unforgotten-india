/**
 * Re-export all story selectors from the stories/ directory.
 * This file exists for backward compatibility with Phase 3 imports.
 */
export {
  ALL_STORIES as STORIES,
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
} from './stories/index';
