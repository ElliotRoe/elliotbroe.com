import type { RSSFeedItem } from '@/types/RSSFeedItem';

export async function getFeedItems(): Promise<RSSFeedItem[]> {
  const response = await fetch('/api/rss');
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch RSS feed');
  }
  
  return response.json();
} 