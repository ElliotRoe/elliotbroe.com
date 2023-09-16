"use client"

import { allPosts, allPages, allProjects, allExperiences } from "@/.contentlayer/generated"
import { Mdx } from "@/components/mdx-components"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"

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
  )
})
ListItem.displayName = "ListItem"

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
  )
})
ListRole.displayName = "ListRole"

export default function Home() {
  return (
    <div className="prose dark:prose-invert">
      <div className="flex flex-col justify-between m-10 p-10 item-outline">
        <p><span className="text-9xl font-black text-theme-gradient">Hi!</span></p>
        <p>{`I'm Elliot Roe and I love to design, build, and teach things.`}</p>
      </div>
      {allPages.map((page) => (
        <article key={page._id}>
          {page.title === "About" && <Mdx code={page.body.code}/>}
        </article>
      ))}
      <div className="flex flex-row item-outline justify-center items-center mt-10 p-1">
        <div className="flex flex-col items-center mr-2">
          <p className="section-header">Experience</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {allExperiences.map((experience) => (
            <ListRole href={experience.slug} key={experience._id} title={experience.organization} avatar={
              <Avatar>
                  <AvatarImage src={experience.logoPath} />
                  <AvatarFallback>{experience.position}</AvatarFallback>
              </Avatar>
            }>
              {experience.position}
            </ListRole>
          ))}
      </div>
    </div>
  )
}
