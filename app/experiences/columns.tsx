"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Experience } from "@/.contentlayer/generated";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { SkillChip } from "@/components/skill-chip";

export const columns: ColumnDef<Experience>[] = [
  {
    id: "logo",
    header: "Organization",
    cell: ({ row }) => {
      const experience = row.original;

      return (
        <div className="flex flex-row items-center space-x-1">
          <div className="w-6 h-6 relative">
            <Image
              src={experience.logoPath ?? "/images/placeholder.png"}
              alt={experience.organization}
              fill
              className="rounded-md"
            />
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex flex-col">
            <div className="text-sm leading-none">
              {experience.organization}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "position",
    header: "Role",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const experience = row.original;
      return experience.endDate ? experience.endDate : "Present";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const experience = row.original;

      return (
        <Link href={experience.slug}>
          <div className="p-2">
            <InfoCircledIcon />
          </div>
        </Link>
      );
    },
  },
];
