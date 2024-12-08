import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import type { RSSFeedItem } from '@/types/RSSFeedItem';

type CustomFeed = {
  title: string;
  description: string;
};

const parser: Parser<CustomFeed, RSSFeedItem> = new Parser({
  customFields: {
    item: [
      ['dc:creator', 'creator'],
      ['content:encoded', 'content.encoded'],
      ['atom:updated', 'updated'],
    ],
  },
});

export async function GET() {
  try {
    const feedUrl = process.env.NEXT_PUBLIC_BLOG_RSS_URL;
    if (!feedUrl) {
      return NextResponse.json(
        { error: 'RSS feed URL not configured' },
        { status: 500 }
      );
    }

    const feed = await parser.parseURL(feedUrl);
    return NextResponse.json(feed.items);
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch RSS feed' },
      { status: 500 }
    );
  }
} 