"use client";

import { cn } from "@/utils";
import Link from "next/link";
import React from "react";
import Icons from "../global/icons";
import CourseSidebarList from "./course-sidebar-list";
import SidebarListSkeleton from "./sidebar-list-skeleton";
import { Button, buttonVariants } from "../ui/button";
import { useSearch } from "@/hooks";
import { BookOpen } from "lucide-react";

const CourseList = () => {
    const { isOpen, setIsOpen } = useSearch();

    return (
        <div className="h-full w-full flex flex-col lg:pt-18">
            <div className="my-2 lg:px-2">
                <Link
                    href="/course?mode=ova"
                    className={cn(
                        buttonVariants({ size: "default", variant: 'ghost' }),
                        "w-full gap-x-2 justify-start px-2.5 text-foreground/80 hover:bg-neutral-200/40 font-normal"
                    )}
                >
                    <BookOpen className="size-4" />
                    Browse Courses
                </Link>
                <Button
                    variant="ghost"
                    onClick={() => setIsOpen(true)}
                    className="w-full gap-x-1.5 justify-start px-2.5 text-foreground/80 hover:bg-neutral-200/40 font-normal"
                >
                    <Icons.search className="size-[15px]" />
                    Search courses
                </Button>
            </div>
            <div className="flex items-center p-2 mt-2">
                <h4 className="text-sm text-muted-foreground capitalize md:pl-2.5">
                    Enrolled Courses
                </h4>
            </div>
            <React.Suspense
                fallback={
                    <SidebarListSkeleton />
                }
            >
                <CourseSidebarList />
            </React.Suspense>
        </div>
    )
};

export default CourseList

