"use client";

import { Session } from "@/types/chat";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";
import Icons from "../global/icons";
import { Button } from "../ui/button";

interface SessionItemProps {
    session: Session;
    index: number;
}

const SessionItem = ({ session, index }: SessionItemProps) => {
    const pathname = usePathname();
    
    // Use session_id if available, otherwise use date as fallback
    const sessionId = session.session_id || session.date;
    const href = `/chat/${sessionId}?mode=ova`;
    const isActive = pathname?.includes(sessionId);

    return (
        <li className="relative">
            <Link 
                href={href} 
                className={cn(
                    "pl-2.5 pr-1 flex items-center justify-between rounded-lg cursor-pointer hover:bg-neutral-200/40 w-full group/id transition-all duration-200 h-10 shrink-0",
                    isActive && "bg-neutral-200/40 font-medium"
                )}
            >
                <div className="flex items-center w-full gap-2 min-w-0 flex-1">
                    <p className="text-sm font-normal truncate flex-1">
                        {session.heading}
                    </p>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="focus-visible:ring-0 focus-visible:ring-transparent outline-none border-none">
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                            className="text-muted-foreground invisible hover:bg-transparent group-hover/id:visible h-5 px-1 border-none outline-none shrink-0"
                        >
                            <EllipsisVertical className="size-4 data-[state=open]:opacity-100 data-[state=open]:visible" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="border border-border w-36">
                        <DropdownMenuItem disabled>
                            <Icons.pen className="size-4" />
                            <p>Rename</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled className="text-destructive hover:!text-destructive hover:!bg-destructive/10">
                            <Icons.delete className="size-4 text-destructive" />
                            <p>Delete</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </Link>
        </li>
    );
};

export default SessionItem;

