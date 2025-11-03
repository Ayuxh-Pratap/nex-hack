"use client";

import { Skeleton } from "../ui/skeleton";

interface SessionItemSkeletonProps {
    index: number;
    width?: number;
}

const SessionItemSkeleton = ({ index, width }: SessionItemSkeletonProps) => {
    // Use random widths if not provided for more realistic loading state
    const skeletonWidth = width || Math.floor(Math.random() * (180 - 120 + 1)) + 120;

    return (
        <li className="relative shrink-0">
            <div className="pl-2.5 pr-1 flex items-center justify-between rounded-lg w-full h-10">
                <div className="flex items-center w-full gap-2 flex-1">
                    <Skeleton 
                        className="h-5 flex-1 rounded-md" 
                        style={{ maxWidth: `${skeletonWidth}px` }}
                    />
                </div>
                {/* Invisible space for dropdown button to maintain layout */}
                <div className="w-5 h-5 shrink-0" />
            </div>
        </li>
    );
};

export default SessionItemSkeleton;

