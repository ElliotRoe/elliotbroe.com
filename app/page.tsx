"use client";

import {
  allPosts,
  allPages,
  allProjects,
  allExperiences,
} from "@/.contentlayer/generated";
import { Mdx } from "@/components/mdx-components";
import { CommitInfo, cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { LinkHover } from "@/components/link-hover";
import { Separator } from "@/components/ui/separator";
import { WideCard } from "@/components/wide-card";
import { IconCard } from "@/components/icon-card";
import { SmallCard } from "@/components/small-card";
import Link from "next/link";
import { useFetch } from "usehooks-ts";
import { BlogPostCard } from "@/components/blog-post-card"
import { getFeedItems } from "@/lib/rss"
import type { RSSFeedItem } from "@/types/RSSFeedItem";
import { ArrowRight } from "lucide-react";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <a
        ref={ref}
        className={cn(
          "block select-none space-y-1 p-3 border-gray-200 leading-none no-underline outline-none transition-colors item-hover item-outline",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    </li>
  );
});
ListItem.displayName = "ListItem";

const ListRole = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { avatar: React.ReactNode }
>(({ className, title, children, avatar, ...props }, ref) => {
  return (
    <a
      ref={ref}
      className={cn(
        "block select-none space-y-1 p-3 leading-none no-underline outline-none transition-colors item-hover item-outline",
        className
      )}
      {...props}
    >
      <div className="flex items-center space-x-2">
        {avatar}
        <div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
          <div className="text-sm font-medium leading-none">{title}</div>
        </div>
      </div>
    </a>
  );
});
ListRole.displayName = "ListRole";

export default function Home() {
  const blogUrl = process.env.NEXT_PUBLIC_BLOG_URL;
  if (!blogUrl) {
    throw new Error("NEXT_PUBLIC_BLOG_URL is not set");
  }

  const designProject = allProjects.filter(
    (project) => project.title === "Educational AI K-12 Games"
  )[0];
  const buildProject = allProjects.filter(
    (project) => project.title === "Prompt Ed"
  )[0];
  const teachProject = allProjects.filter(
    (project) => project.title === "Patch"
  )[0];

  const design = (
    <LinkHover
      href={"https://www.playandlearnlab.com/ai-games"}
      description={designProject.title}
      icon={designProject.icon}
    >
      design
    </LinkHover>
  );
  const build = (
    <LinkHover
      href={"https://prompt-ed.org"}
      description={buildProject.title}
      icon={buildProject.icon}
    >
      build
    </LinkHover>
  );
  const teach = (
    <LinkHover
      href={"https://bxcoding.org"}
      description={"Summer instructor at BX Coding"}
      icon={"/icons/bxcoding-icon.png"}
    >
      teach
    </LinkHover>
  );

  const highlightOrganizaitons = [
    "Verse",
    "BX Coding",
    "Play and Learn Lab",
    "Honeywell",
  ];
  const highlightedExperiences = allExperiences.filter((experience) =>
    highlightOrganizaitons.includes(experience.organization)
  ).sort((a, b) => 
    highlightOrganizaitons.indexOf(a.organization) - highlightOrganizaitons.indexOf(b.organization)
  );

  const aboutArticle = allPages.filter((page) => page.title === "About")[0];

  const repoCommitApiUrl =
    "https://api.github.com/repos/ElliotRoe/elliotbroe.com/commits?per_page=1";

  const { data, error } = useFetch<CommitInfo[]>(repoCommitApiUrl);

  const [posts, setPosts] = useState<RSSFeedItem[]>([]);

  useEffect(() => {
    getFeedItems().then(setPosts);
  }, []);

  return (
    <div className="prose dark:prose-invert space-y-6 flex flex-col items-center w-full h-full pb-10">
      <div className="my-5">
        <div className="flex flex-row card bg-background max-w-[580px] mx-auto">
          <div className="w-[250px] relative -left-7 max-sm:hidden">
            <Image
              src="/headshot-nb-r.png"
              alt="headshot"
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          <div className="flex flex-col items-start justify-between p-10 pl-0 max-sm:pl-10">
            <p>
              <span className="text-9xl font-black text-theme-gradient">
                Hi!
              </span>
            </p>
            <p>
              I&#39;m Elliot Roe and I love to {design}, {build}, and {teach}{" "}
              things.
            </p>
          </div>
        </div>
        <p className="text-sm italic text-muted-foreground my-1">{`Last Updated: ${
          data
            ? new Date(data[0].commit.author.date).toLocaleDateString()
            : "-----"
        }`}</p>
      </div>
      <article>
        <Mdx code={aboutArticle.body.code} />
      </article>
      <div className="flex flex-col h-full sm:grid sm:grid-cols-3 sm:grid-rows-3 sm:gap-4">
        <WideCard
          className="col-span-2 row-span-2"
          experience={highlightedExperiences[0]}
          featurePhoto="/bxcoding-feature.png"
          content="Building Verse, with my partner in crime, Duncan Johnson. Assignments your students can talk to. Creating Sunny, the talking egg 🍳"
        />
        <IconCard
          className="col-span-1 row-span-3"
          experience={highlightedExperiences[2]}
        />
        <SmallCard
          className="sm:col-span-1 sm:row-span-1 max-sm:h-16"
          experience={highlightedExperiences[1]}
        />
        <SmallCard
          className="sm:  col-span-1 sm:row-span-1 max-sm:h-16"
          experience={highlightedExperiences[3]}
        />
      </div>
      <Link href="/experiences">
        <Button variant="outline" className="rounded-full">All Experiences <ArrowRight className="ml-2 h-4 w-4" /></Button>
      </Link>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8 mt-12">Blog Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogPostCard key={post.guid} post={post} />
          ))}
        </div>
        <Link href={blogUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="rounded-full mt-6">Blog <ArrowRight className="ml-2 h-4 w-4" /></Button>
        </Link>
      </div>
    </div>  
  );
}
