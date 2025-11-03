"use client";

import useSidebar from "@/hooks/use-sidebar";
import { cn } from "@/utils";
import ChatList from "./chat-list";
import CourseList from "./course-list";
import { useParams, usePathname } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks";

const DesktopSidebar = () => {
    const user = useAppSelector((state) => state.auth.user);
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const { id } = useParams<{ id: string }>();
    const pathname = usePathname();
    const { isOpen, setIsOpen } = useSidebar();

    // Determine if we're on course routes
    const isCourseRoute = pathname?.startsWith('/course');

    // Show sidebar structure even when loading (optimistic UI)
    // Only hide if explicitly not authenticated after loading completes
    if (!isLoading && !user) {
        return null;
    }

    return (
        <div
            id="sidebar"
            className={cn(
                "flex-col hidden lg:flex fixed left-0 top-0 bottom-0 z-[99] bg-muted/20 backdrop-blur-lg border-r transition-all duration-300 ease-in-out",
                isOpen ? "w-68 border-border/60" : "w-0 border-r-0 border-transparent",
            )}
        >
            <div
                className={cn(
                    "flex flex-col size-full transition-opacity duration-300 ease-in-out",
                    isOpen
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                )}
                style={{
                    visibility: isOpen ? "visible" : "hidden"
                }}
            >
                {isCourseRoute ? <CourseList /> : <ChatList />}
            </div>
        </div>
    )
};

export default DesktopSidebar
