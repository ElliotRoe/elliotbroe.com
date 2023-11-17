"use client"

import { allPosts, allPages, allProjects, allExperiences } from "@/.contentlayer/generated"
import { Mdx } from "@/components/mdx-components"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import React from "react"
import { LinkHover } from "@/components/link-hover"

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
  const designProject = allProjects.filter((project) => project.title === "Educational AI K-12 Games")[0]
  const buildProject = allProjects.filter((project) => project.title === "Prompt Ed")[0]
  const teachProject = allProjects.filter((project) => project.title === "Patch")[0]

  const design = <LinkHover href={designProject.slug} description={designProject.title} icon={designProject.icon}>design</LinkHover>
  const build = <LinkHover href={buildProject.slug ?? "#"} description={buildProject.title} icon={buildProject.icon}>build</LinkHover>
  const teach = <LinkHover href={teachProject.slug ?? "#"} description={teachProject.title} icon={teachProject.icon}>teach</LinkHover>

  return (
    <div className="prose dark:prose-invert">
      <div className="flex flex-row m-10 item-outline">
        <div className="w-[250px] relative -left-7 max-sm:hidden">
          <Image
            src="/headshot-nb-r.png" 
            alt="headshot"   
            fill
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
        <div className="flex flex-col items-start p-10 pl-0 max-sm:pl-10">
          <p><span className="text-9xl font-black text-theme-gradient">Hi!</span></p>
          <p>I&#39;m Elliot Roe and I love to {design}, {build}, and {teach} things.</p>
        </div>
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
