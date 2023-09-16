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
    <li>
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
    </li>
  )
})
ListRole.displayName = "ListRole"

export default function Home() {
  return (
    <div className="prose dark:prose-invert">
      <div className="flex flex-col justify-between m-10 p-10 item-outline">
        <p><span className="text-9xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Hi!</span></p>
        <p>{`I'm Elliot Roe and I love to design, build, and teach things.`}</p>
      </div>
      {allPages.map((page) => (
        <article key={page._id}>
          {page.title === "About" && <Mdx code={page.body.code}/>}
        </article>
      ))}
      <div className="flex flex-row item-outline justify-between items-center mt-10 p-1">
        <div className="flex flex-col items-center w-4/12 mr-2">
          <p className="section-header">Experience</p>
        </div>
        <div className="border-l border-gray-200 h-4" />
        <div className="flex flex-col items-center w-4/12">
          <p className="section-header">Projects</p>
        </div>
        <div className="border-l border-gray-200 h-4" />
        <div className="flex flex-col items-center w-4/12 ml-2">
          <p className="section-header">Posts</p>
        </div>
      </div>
      <div className="flex flex-row justify-between mt-4">
        <div className="flex flex-col items-center w-4/12 mr-2">
        <ul className="grid gap-3">
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
          </ul>
        </div>
        <div className="flex flex-col items-center w-4/12">
          <ul className="grid gap-3">
            {allProjects.map((project) => (
              <ListItem
                key={project.title}
                title={project.title}
                href={"/"}
              >
                {project.description}
              </ListItem>
              ))}
          </ul>
        </div>
        <div className="flex flex-col items-center w-4/12 ml-2">
          
        </div>
      </div>
    </div>
  )
}
