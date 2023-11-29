import { Experience } from "@/.contentlayer/generated";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { useInterval } from "usehooks-ts";
import { Button } from "./ui/button";
import { InfoCircledIcon } from "@radix-ui/react-icons";

type IconCardProps = {
  experience: Experience;
  className?: string;
};

export const IconCard: FC<IconCardProps> = ({ experience, className }) => {
  return (
    <div
      className={`mt-4 card flex flex-col p-5 justify-between items-center space-y-2 ${className}`}
    >
      <div className="w-32 h-32 relative">
        <Image
          src={experience.logoPath ?? "/images/placeholder.png"}
          alt={experience.organization}
          fill
          className="rounded-xl"
        />
      </div>
      <div className="flex flex-col items-center space-y-1">
        <div className="text-2xl font-bold leading-none text-center">
          {experience.position}
        </div>
        <div className="text-md italic leading-none">
          {`@${experience.organization}`}
        </div>
      </div>
      <Link href={experience.slug}>
        <Button variant="outline">
          <span className="text-sm px-2">Learn more</span>
          <InfoCircledIcon />
        </Button>
      </Link>
    </div>
  );
};
