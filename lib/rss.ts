import type { RSSFeedItem } from '@/types/RSSFeedItem';

export async function getFeedItems(): Promise<RSSFeedItem[]> {
  const response = await fetch('/api/rss', {
    // Disable cache to always fetch fresh data
    cache: 'no-store',
    // Optional: You can also add a small random parameter to force a fresh request
    next: {
      revalidate: 0 // Disable Next.js cache
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch RSS feed');
  }
  
  return response.json();
}