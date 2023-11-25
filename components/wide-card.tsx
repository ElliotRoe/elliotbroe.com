import { Experience } from "@/.contentlayer/generated";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { FC, useState } from "react";
import { useInterval } from "usehooks-ts";

type WideCardProps = {
  experience: Experience;
  content: string;
  featurePhoto: string;
  className?: string;
};

export const WideCard: FC<WideCardProps> = ({
  experience,
  content,
  featurePhoto,
  className,
}) => {
  return (
    <div
      className={`mt-4 card flex flex-row justify-start items-center border rounded-md space-x-2 ${className}`}
    >
      <div className="w-2/3 h-full p-5">
        <div className="flex flex-row items-center space-x-1">
          <div className="w-8 h-8 relative">
            <Image
              src={experience.logoPath ?? "/images/placeholder.png"}
              alt={experience.organization}
              fill
              className="rounded-md"
            />
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex flex-col">
            <div className="text-2xl font-bold leading-none">
              {experience.position}
            </div>
            <div className="text-md italic leading-none">
              {`@${experience.organization}`}
            </div>
          </div>
        </div>
        <div className="text-md leading-none my-5">{content}</div>
      </div>
      <div className="relative h-full w-1/3">
        <Separator orientation="vertical" className="h-full" />
        <Image
          src={featurePhoto}
          alt="BxCoding"
          fill
          className="rounded-md rounded-l-none"
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
};
