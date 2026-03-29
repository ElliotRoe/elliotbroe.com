"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { allPosts } from "@/.contentlayer/generated"

import { getFeedItems } from "@/lib/rss"
import type { RSSFeedItem } from "@/types/RSSFeedItem"

type BlogSource = "local" | "medium"

type UnifiedBlogPost = {
  id: string
  title: string
  description?: string
  href: string
  source: BlogSource
  timestamp: number
}

const normalizeTitle = (title: string) => title.trim().toLowerCase()

const toTimestamp = (value: string | undefined) => {
  if (!value) return 0
  const parsed = Date.parse(value)
  return Number.isNaN(parsed) ? 0 : parsed
}

const stripHtml = (html: string) =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()

const truncate = (text: string, maxLength: number) =>
  text.length > maxLength ? `${text.slice(0, maxLength - 1)}...` : text

const formatDate = (timestamp: number) => {
  if (!timestamp) return "Unknown date"
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

const getMediumDescription = (item: RSSFeedItem) => {
  const encodedSnippet = item["content:encodedSnippet"]
  if (encodedSnippet) return encodedSnippet

  const encodedContent = item["content:encoded"] || item["content.encoded"]
  if (!encodedContent) return undefined

  const plainText = stripHtml(encodedContent)
  if (!plainText) return undefined
  return truncate(plainText, 180)
}

const localPosts: UnifiedBlogPost[] = allPosts.map((post) => ({
  id: post.slug,
  title: post.title,
  description: post.description,
  href: post.slug,
  source: "local",
  timestamp: toTimestamp(post.date),
}))

const toMediumPost = (item: RSSFeedItem): UnifiedBlogPost | null => {
  if (!item.link) return null

  const primaryDate = item.isoDate || item.pubDate || item.updated
  return {
    id: item.guid || item.link,
    title: item.title || "Untitled",
    description: getMediumDescription(item),
    href: item.link,
    source: "medium",
    timestamp: toTimestamp(primaryDate),
  }
}

const isUnifiedBlogPost = (
  post: UnifiedBlogPost | null
): post is UnifiedBlogPost => post !== null

export function PostsFeed() {
  const [mediumPosts, setMediumPosts] = useState<UnifiedBlogPost[]>([])

  useEffect(() => {
    getFeedItems()
      .then((items) => setMediumPosts(items.map(toMediumPost).filter(isUnifiedBlogPost)))
      .catch((error) => {
        console.error("Failed to load Medium RSS posts", error)
      })
  }, [])

  const posts = useMemo(() => {
    const localTitles = new Set(localPosts.map((post) => normalizeTitle(post.title)))
    const dedupedMedium = mediumPosts.filter(
      (post) => !localTitles.has(normalizeTitle(post.title))
    )

    return [...localPosts, ...dedupedMedium].sort(
      (a, b) => b.timestamp - a.timestamp
    )
  }, [mediumPosts])

  if (posts.length === 0) {
    return (
      <div className="card p-5">
        <p className="text-muted-foreground">No posts yet.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {posts.map((post) => {
        const sourceLabel = post.source === "local" ? "On-site" : "Medium"
        const details = (
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {sourceLabel}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              {formatDate(post.timestamp)}
            </p>
            {post.description && (
              <p className="text-muted-foreground">{post.description}</p>
            )}
          </div>
        )

        if (post.source === "medium") {
          return (
            <a
              key={post.id}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card block p-5 hover:bg-muted/30 transition-colors"
            >
              {details}
            </a>
          )
        }

        return (
          <Link
            key={post.id}
            href={post.href}
            className="card block p-5 hover:bg-muted/30 transition-colors"
          >
            {details}
          </Link>
        )
      })}
    </div>
  )
}
