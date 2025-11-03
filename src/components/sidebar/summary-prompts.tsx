"use client";

import { useState } from "react";
import { CalendarCheck, FileText, Star, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/utils";

interface PromptItem {
    id: string;
    icon: React.ReactNode;
    label: string;
}

const prompts: PromptItem[] = [
    {
        id: "upcoming-events",
        icon: <CalendarCheck className="size-4" />,
        label: "Upcoming events",
    },
    {
        id: "summary-about-you",
        icon: <FileText className="size-4" />,
        label: "Summary about you",
    },
    {
        id: "astrological-sign",
        icon: <Star className="size-4" />,
        label: "Guess your astrological sign",
    },
];

const SummaryPrompts = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-4">
            <div className="flex items-center p-2">
                <CollapsibleTrigger asChild>
                    <button className="flex items-center justify-between w-full group hover:bg-transparent">
                        <h4 className="text-sm text-muted-foreground capitalize md:pl-2.5 font-medium">
                            Summary prompts
                        </h4>
                        <ChevronUp
                            className={cn(
                                "size-4 text-muted-foreground transition-transform duration-200",
                                !isOpen && "rotate-180"
                            )}
                        />
                    </button>
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
                <div className="sm:px-2">
                    <ul>
                        {prompts.map((prompt) => (
                            <li key={prompt.id} className="relative">
                                <button
                                    className="pl-2.5 pr-1 flex items-center gap-2.5 rounded-lg cursor-pointer hover:bg-neutral-200/40 w-full transition-colors duration-200 h-9 shrink-0 group/prompt"
                                >
                                    <span className="text-muted-foreground group-hover/prompt:text-foreground transition-colors shrink-0">
                                        {prompt.icon}
                                    </span>
                                    <span className="text-sm font-normal text-left flex-1 truncate">
                                        {prompt.label}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
};

export default SummaryPrompts;

