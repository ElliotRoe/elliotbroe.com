import { Experience } from "@/.contentlayer/generated";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { FC, useState } from "react";
import { useInterval } from "usehooks-ts";

type IconCardProps = {
  experience: Experience;
  className?: string;
};

export const IconCard: FC<IconCardProps> = ({ experience, className }) => {
  return (
    <div
      className={`mt-4 card flex flex-col p-5 justify-center items-center border rounded-md space-y-2 ${className}`}
    >
      <div className="w-32 h-32 relative">
        <Image
          src={experience.logoPath ?? "/images/placeholder.png"}
          alt={experience.organization}
          fill
          className="rounded-xl"
        />
      </div>
      <div className="text-2xl font-bold leading-none text-center">
        {experience.position}
      </div>
      <div className="text-md italic leading-none">
        {`@${experience.organization}`}
      </div>
    </div>
  );
};
