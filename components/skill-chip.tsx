import { Project } from "@/.contentlayer/generated";
import { FigmaLogoIcon } from "@radix-ui/react-icons";
import { FC, ReactElement } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import Image from "next/image";
import NextJSIcon from "./icon/nextjs-icon";
import TSIcon from "./icon/ts-icon";
import PythonIcon from "./icon/python-icon";

type Skill = Project["skills"][0]

const SkillIcons: Record<Skill, ReactElement | undefined> = {
    "Figma": <FigmaLogoIcon />,
    Docker: undefined,
    Git: undefined,
    HTML: undefined,
    JavaScript: undefined,
    LaTeX: undefined,
    "Node.js": undefined,
    Python: <PythonIcon/>,
    React: undefined,
    SQL: undefined,
    TypeScript: undefined,
    Verilog: undefined,
    Pyodide: <PythonIcon/>,
    Airflow: undefined,
    AWS: undefined,
    Typescript: <TSIcon/>,
    Firebase: undefined,
    Java: undefined,
    TailwindCSS: undefined,
    "Next.js": <NextJSIcon />,
};

type SkillChipProps = {
    skill: Skill
    className?: string
}

export const SkillChip: FC<SkillChipProps> = ({skill, className}) => {
    return (
    <div  className={className}>
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="rounded-full border bg-border text-primary p-1 drop-shadow-sm">
                    {SkillIcons[skill]?? skill}
                </div>
            </TooltipTrigger>
            <TooltipContent sideOffset={5} side="top" align="center">
                {skill}
            </TooltipContent>
        </Tooltip>
    </TooltipProvider></div>    );
  }