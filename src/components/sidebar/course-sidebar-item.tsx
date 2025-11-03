"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, MoreVertical, Trash2 } from "lucide-react";
import { cn } from "@/utils";
import type { Course } from "@/types/course";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CourseSidebarItemProps {
    course: Course;
    index: number;
    isActive?: boolean;
}

const CourseSidebarItem = ({ course, index, isActive }: CourseSidebarItemProps) => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const href = `/course/${course.id}?mode=ova`;
    const displayTitle = course.title.length > 30 
        ? course.title.substring(0, 30) + "..." 
        : course.title;

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
                    <BookOpen className="h-4 w-4 text-muted-foreground shrink-0" />
                    <p className="text-sm font-normal truncate flex-1">
                        {displayTitle}
                    </p>
                    {course.progress !== undefined && (
                        <span className="text-xs text-muted-foreground shrink-0">
                            {course.progress}%
                        </span>
                    )}
                </div>
                <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                    <DropdownMenuTrigger asChild>
                        <button
                            className="opacity-0 group-hover/id:opacity-100 p-1 hover:bg-neutral-200/60 rounded transition-opacity"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsOpen(true);
                            }}
                        >
                            <MoreVertical className="h-4 w-4 text-muted-foreground" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.preventDefault();
                                // TODO: Handle course deletion
                                setIsOpen(false);
                            }}
                            className="text-destructive"
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove from sidebar
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </Link>
        </li>
    );
};

export default CourseSidebarItem;

