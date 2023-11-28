import { Experience } from "@/.contentlayer/generated";
import { Separator } from "@/components/ui/separator";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { useElementSize } from "usehooks-ts";

type SmallCardProps = {
  experience: Experience;
  className?: string;
};

export const SmallCard: FC<SmallCardProps> = ({ experience, className }) => {
  const [squareRef, { height }] = useElementSize();

  return (
    <div
      className={`mt-4 card flex flex-row justify-between items-center border rounded-md ${className}`}
    >
      <div className="h-full flex flex-row">
        <Link
          className="px-2 h-full flex items-center hover:bg-muted transition-colors duration-200 ease-in-out"
          href={experience.slug}
        >
          <InfoCircledIcon />
        </Link>
        <Separator orientation="vertical" className="h-full" />
      </div>
      <div className="flex items-center justify-center h-full p-5">
        <div className="text-md font-bold leading-none">
          {experience.position}
        </div>
      </div>
      <div className={`h-full flex flex-row w-20`} ref={squareRef}>
        <Separator orientation="vertical" className="h-full" />
        <div className="relative h-full w-full">
          <Image
            src={experience.logoPath ?? "/images/placeholder.png"}
            alt="BxCoding"
            fill
            className="rounded-md rounded-l-none"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </div>
  );
};
