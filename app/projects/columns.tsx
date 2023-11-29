"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Project } from "@/.contentlayer/generated";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { ExternalLinkIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { SkillChip } from "@/components/skill-chip";

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const project = row.original;

      return (
        <div className="flex flex-row items-center space-x-1">
          <div className="w-6 h-6 relative">
            <Image
              src={project.icon ?? "/images/placeholder.png"}
              alt={project.title}
              fill
            />
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex flex-col">
            <div className="text-sm font-medium leading-none">
              {project.title}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "organization",
    header: "Organization",
  },
  {
    accessorKey: "skills",
    header: "Skills",
    filterFn: (row, id = "skills", filterValue: string[]) => {
      if (filterValue.length == 0) return true;

      const project = row.original;
      const projectSkills: string[] = project.skills.map((skill) => skill);
      return filterValue.every((filter) =>
        projectSkills.some((skill) =>
          skill.toLowerCase().includes(filter.toLowerCase())
        )
      );
    },
    cell: ({ row }) => {
      const project = row.original;
      return (
        <div className="flex flex-row w-12 -space-x-3 items-center justify-center hover:space-x-0.5 transition-all">
          {project.skills.map((skill, i) => (
            <SkillChip className="transition-all" key={i} skill={skill} />
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const project = row.original;

      return (
        <Link href={project.slug}>
          <div className="flex flex-col">
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {project.description}
            </p>
          </div>
        </Link>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original;

      return (
        <a target="_blank" href={project.link ?? "#"}>
          <div className="p-2">
            <ExternalLinkIcon />
          </div>
        </a>
      );
    },
  },
];
