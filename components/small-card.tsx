import { Experience } from "@/.contentlayer/generated";
import { Separator } from "@/components/ui/separator";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { useInterval } from "usehooks-ts";

type SmallCardProps = {
  experience: Experience;
  className?: string;
};

export const SmallCard: FC<SmallCardProps> = ({ experience, className }) => {
  return (
    <div
      className={`mt-4 card flex flex-row justify-center items-center border rounded-md ${className}`}
    >
      <Link
        className="px-2 h-full flex items-center hover:bg-muted transition-colors duration-200 ease-in-out"
        href={experience.slug}
      >
        <InfoCircledIcon />
      </Link>
      <Separator orientation="vertical" className="h-full" />
      <div className="flex items-center justify-center w-2/3 h-full p-5">
        <div className="text-md font-bold leading-none">
          {experience.position}
        </div>
      </div>
      <div className="relative h-full w-1/3">
        <Separator orientation="vertical" className="h-full" />
        <Image
          src={experience.logoPath ?? "/images/placeholder.png"}
          alt="BxCoding"
          fill
          className="rounded-md rounded-l-none"
          style={{
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
};
