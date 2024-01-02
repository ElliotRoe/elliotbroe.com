import { Project } from "@/.contentlayer/generated";
import { FigmaLogoIcon } from "@radix-ui/react-icons";
import { FC, ReactElement } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import Image from "next/image";
import NextJSIcon from "./icon/nextjs-icon";
import TSIcon from "./icon/ts-icon";
import PythonIcon from "./icon/python-icon";
import FirebaseIcon from "./icon/firebase-icon";
import SvelteIcon from "./icon/svelte-icon";
import LangchainIcon from "./icon/langchain-icon";
import TailwindIcon from "./icon/tailwind-icon";
import ReactIcon from "./icon/react-icon";
import MUIIcon from "./icon/mui-icon";

type Skill = Project["skills"][0];

const SkillIcons: Record<Skill, ReactElement | undefined> = {
  Figma: <FigmaLogoIcon />,
  Docker: undefined,
  Git: undefined,
  HTML: undefined,
  JavaScript: undefined,
  LaTeX: undefined,
  "Node.js": undefined,
  Python: <PythonIcon />,
  React: undefined,
  SQL: undefined,
  Verilog: undefined,
  Pyodide: <PythonIcon />,
  Airflow: undefined,
  AWS: undefined,
  Typescript: <TSIcon />,
  Firebase: <FirebaseIcon />,
  Java: undefined,
  TailwindCSS: <TailwindIcon />,
  "Next.js": <NextJSIcon />,
  SvelteKit: <SvelteIcon />,
  Langchain: <LangchainIcon />,
  React: <ReactIcon />,
  "Material UI": <MUIIcon />,
};

type SkillChipProps = {
  skill: Skill;
  className?: string;
};

export const SkillChip: FC<SkillChipProps> = ({ skill, className }) => {
  return (
    <div className={className}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="rounded-full border bg-border text-primary p-1 drop-shadow-sm">
              {SkillIcons[skill] ?? skill}
            </div>
          </TooltipTrigger>
          <TooltipContent sideOffset={5} side="top" align="center">
            {skill}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
