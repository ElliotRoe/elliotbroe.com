import { Metadata } from "next"
import { PostsFeed } from "./posts-feed"

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles from this site and Medium.",
}

export default async function PostsPage() {
  return (
    <section className="py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="text-muted-foreground">
          Articles from local MDX posts and Medium RSS, sorted by publish date.
        </p>
      </div>
      <PostsFeed />
    </section>
  )
}
