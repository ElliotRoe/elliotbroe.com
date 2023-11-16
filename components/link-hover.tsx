import { FC, ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

type LinkHoverProps = {
    children: ReactNode;
    href: string;
    description: string;
    icon?: string;
    className?: string;
}

export const LinkHover: FC<LinkHoverProps> = ({children, href, description, icon, className}) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger><a className="font-extrabold underline decoration-2" href={href}>{children}</a></TooltipTrigger>
                <TooltipContent className="bg-background">
                    <a href={href}>
                        <div className="flex flex-row items-center space-x-2 h-5">
                            <div className="h-4 w-4 relative">
                                <Image
                                    src={icon ?? "/icons/link.svg"}
                                    alt="Icon"
                                    fill
                                />
                            </div>
                            <Separator orientation="vertical" />
                            <p>{description}</p>
                        </div>
                    </a>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
};