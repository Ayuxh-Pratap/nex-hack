"use client";

import { cn } from "@/utils";
import SessionItemSkeleton from "./session-item-skeleton";

const SidebarListSkeleton = () => {
    // Show 6 skeleton items to match typical session list
    // Fixed widths to prevent hydration mismatches and layout shifts
    const skeletonWidths = [180, 140, 160, 150, 170, 130];

    return (
        <div className={cn("flex flex-col overflow-hidden")}>
            <div className="overflow-y-auto overflow-x-hidden scrollbar-hide h-[360px]">
                <ol className="sm:px-2">
                    {skeletonWidths.map((width, index) => (
                        <SessionItemSkeleton key={index} index={index} width={width} />
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default SidebarListSkeleton;

