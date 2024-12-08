import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { RSSFeedItem } from "@/types/RSSFeedItem"

interface BlogPostCardProps {
  post: RSSFeedItem
}

const extractFirstImage = (content: string): string | undefined => {
  const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
  return imgMatch?.[1];
};

export function BlogPostCard({ post }: BlogPostCardProps) {
  const formattedDate = new Date(post.pubDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const imageUrl = extractFirstImage(post['content:encoded']);

  return (
    <Card className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={post.link} target="_blank">
        {imageUrl && (
          <div className="relative w-full h-48">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <CardHeader>
          <h3 className="text-xl font-semibold line-clamp-2">{post.title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span>By {post.creator}</span>
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap gap-2">
          {post.categories.slice(0, 3).map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
        </CardFooter>
      </Link>
    </Card>
  )
} 