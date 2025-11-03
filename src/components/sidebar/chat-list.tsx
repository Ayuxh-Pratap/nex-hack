"use client";

import { cn } from "@/utils";
import Link from "next/link";
import React from "react";
import Icons from "../global/icons";
import SidebarList from "./sidebar-list";
import SidebarListSkeleton from "./sidebar-list-skeleton";
import SummaryPrompts from "./summary-prompts";
import { Button, buttonVariants } from "../ui/button";
import { useSearch } from "@/hooks";

const ChatList = () => {
    const { isOpen, setIsOpen } = useSearch();

    return (
        <div className="h-full w-full flex flex-col lg:pt-18">
            <div className="my-2 lg:px-2">
                <Link
                    href="/chat?mode=ova"
                    className={cn(
                        buttonVariants({ size: "default", variant: 'ghost' }),
                        "w-full gap-x-2 justify-start px-2.5 text-foreground/80 hover:bg-neutral-200/40 font-normal"
                    )}
                >
                    <Icons.edit className="size-4" />
                    New chat
                </Link>
                <Button
                    variant="ghost"
                    onClick={() => setIsOpen(true)}
                    className="w-full gap-x-1.5 justify-start px-2.5 text-foreground/80 hover:bg-neutral-200/40 font-normal"
                >
                    <Icons.search className="size-[15px]" />
                    Search chats
                </Button>
            </div>
            <div className="flex items-center p-2 mt-2">
                <h4 className="text-sm text-muted-foreground capitalize md:pl-2.5">
                    Sessions
                </h4>
            </div>
            <React.Suspense
                fallback={
                    <SidebarListSkeleton />
                }
            >
                <SidebarList />
            </React.Suspense>
            <SummaryPrompts />
        </div>
    )
};

export default ChatList
