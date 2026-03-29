"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { allProjects } from "@/.contentlayer/generated";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import "./styles.css";
import { Separator } from "../ui/separator";

const navigationOptions: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Experiences",
    href: "/experiences",
    description: "Learn more about my work.",
  },
  {
    title: "Projects",
    href: "/projects",
    description: "My projects.",
  },
  {
    title: "Home",
    href: "/",
    description: "The homepage.",
  },
];

export function MainMenu() {
  return (
    <NavigationMenu className="card w-full max-w-full overflow-x-auto sm:w-auto sm:max-w-max sm:overflow-visible">
      <NavigationMenuList className="w-full justify-start sm:w-auto sm:justify-center">
        {navigationOptions.map((option, i, arr) => (
          <>
            <NavigationMenuItem key={i}>
              <Link href={option.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} h-9 px-2 text-xs sm:h-10 sm:px-4 sm:text-sm`}
                >
                  {option.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {i < arr.length - 1 && (
              <Separator orientation="vertical" className="hidden h-4 sm:block" />
            )}
          </>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
