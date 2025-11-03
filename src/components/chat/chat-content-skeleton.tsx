"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils";
import ModeToggle from "./mode-toggle";

const ChatContentSkeleton = () => {
    return (
        <div className={cn("relative flex flex-col items-center justify-center w-full relative h-full animate-in fade-in duration-300")}>
            {/* Mode Toggle - Show actual toggle */}
            <div className="fixed top-[4.5rem] lg:top-8 z-40 w-full flex justify-center pointer-events-none">
                <div className="pointer-events-auto">
                    <ModeToggle />
                </div>
            </div>

            {/* Background gradients - always visible */}
            <div className="fixed -z-10 top-0 left-1/2 -translate-x-1/2 bg-blue-500 rounded-full w-full h-1/6 blur-[10rem] opacity-10"></div>
            <div className="fixed -z-10 top-0 left-1/2 -translate-x-1/2 bg-amber-500 rounded-full w-3/4 h-1/6 blur-[10rem] opacity-10"></div>
            <div className="fixed -z-10 top-1/8 left-1/4 -translate-x-1/4 bg-orange-500 rounded-full w-1/3 h-1/6 blur-[10rem] mix-blend-multiply opacity-20"></div>
            <div className="fixed -z-10 top-1/8 right-1/4 translate-x-1/4 bg-sky-500 rounded-full w-1/3 h-1/6 blur-[10rem] mix-blend-multiply opacity-20"></div>

            {/* Content Area - Match exact layout structure */}
            <div className="w-full h-full pt-24 pb-32">
                <div className="relative flex flex-col w-full max-w-3xl pt-16 pb-24 mx-auto h-full">
                    <div className="flex flex-col items-center justify-center size-full">
                        <div className="relative w-full flex flex-col items-center justify-center gap-4">
                            {/* Actual orb image - no skeleton needed */}
                            <div className="relative flex items-center justify-center">
                                <img src="/icon.gif" className="w-32" alt="Ova" />
                                <div className="absolute bottom-4 bg-orange-500 w-10 h-[2px] blur-sm rounded-full mx-auto"></div>
                            </div>
                            {/* Title skeleton */}
                            <Skeleton className="h-7 w-64" />
                            {/* Description skeleton */}
                            <Skeleton className="h-5 w-96 max-w-md" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatContentSkeleton;

