"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils";

const UserAccountSkeleton = () => {
    return (
        <div className={cn("transition-opacity duration-300")}>
            <Skeleton className="w-8 h-8 rounded-full" />
        </div>
    );
};

export default UserAccountSkeleton;

