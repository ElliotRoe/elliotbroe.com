"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { allProjects } from "@/.contentlayer/generated"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import "./styles.css"

const navigationOptions: { title: string; href: string; description: string }[] = [
    {
        title: "Home",
        href: "/",
        description: "The homepage.",
    },
    {
        title: "About Me",
        href: "/aboutme",
        description: "Learn more about me.",
    },
    {
        title: "Projects",
        href: "/projects",
        description: "My projects.",
    },
]

function AboutMeItem({ title, href, description }: typeof navigationOptions[0]) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{navigationOptions[1].title}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
          <li className="row-span-3">
            <NavigationMenuLink asChild>
              <a
              className="relative p-3 flex h-full w-full select-none flex-row justify-center no-underline outline-none focus:shadow-md focus:bg-accent focus:text-accent-foreground item-hover item-outline"
              href="/"
              >
                <div className="absolute z-20 bottom-0 flex justify-end">
                  <Image 
                    src="/headshot-nb-r.png" 
                    alt="headshot"   
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '85%', height: 'auto', margin: 0 }}
                  />
                </div>
                <div className="z-30 flex flex-col h-full w-full justify-start">
                  <div className="text-sm font-medium w-1">
                      {navigationOptions[1].title}
                  </div>
                </div>
              </a>
            </NavigationMenuLink>
          </li>
          <ListRole href="https://bxcoding.org/" title="BX Coding" avatar={
            <Avatar>
                <AvatarImage src="https://bxcoding.org/wp-content/uploads/2023/08/pfpLogoLarge.png" />
                <AvatarFallback>BXC</AvatarFallback>
            </Avatar>
          }>
            Co-founder @
          </ListRole>
          <ListRole href="/" title="Play and Learn Lab"avatar={
            <Avatar>
                <AvatarImage src="https://bxcoding.org/wp-content/uploads/2023/08/base_logo_transparent_background.png" />
                <AvatarFallback>P&LL</AvatarFallback>
            </Avatar>
          }>
            Research Assistant @
          </ListRole>
          <ListItem href="/" title="LinkedIn">
            Connect with me on LinkedIn
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
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
      </NavigationMenuLink>
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
      <NavigationMenuLink asChild>
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
      </NavigationMenuLink>
    </li>
  )
})
ListRole.displayName = "ListRole"

export function MainMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <AboutMeItem title={navigationOptions[1].title} href={navigationOptions[1].href} description={navigationOptions[1].description} />
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
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
          </NavigationMenuContent>
        </NavigationMenuItem> */}
        {/* <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
