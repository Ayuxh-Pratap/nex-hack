"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/utils";
import Icons from "../global/icons";
import UserAccount from "../common/user-account";
import Link from "next/link";
import { useSidebar } from "@/hooks";
import { useAppSelector } from "@/lib/store/hooks";

const DesktopHeader = () => {
    const user = useAppSelector((state) => state.auth.user);
    const isLoading = useAppSelector((state) => state.auth.isLoading);

    const router = useRouter();

    const pathname = usePathname();

    const { isOpen: isOpenSidebar, setIsOpen: setIsOpenSidebar } = useSidebar();

    useEffect(() => {

    }, [pathname]);

    return (
        <header className="fixed inset-x-0 top-0 z-50 w-full pl-4 pt-8 pr-6 h-14 hidden lg:block">
            <div className="flex items-center justify-between w-full h-full mx-auto">
                <div className="flex items-center gap-x-2 text-muted-foreground">
                    <Link href="/" className="mr-2 text-foreground">
                        <img 
                            src="/logo/ova.svg" 
                            alt="OVA Logo" 
                            className="size-6 animate-spin-slow"
                        />
                    </Link>
                    {user && (
                        <TooltipProvider delayDuration={0}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className={cn(
                                            "transition transform duration-300",
                                        )}
                                        onClick={() => setIsOpenSidebar(!isOpenSidebar)}
                                    >
                                        <Icons.panel className="size-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Sidebar
                                </TooltipContent>
                            </Tooltip>
                            {/* <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => router.push("/")}
                                        className={cn(
                                            "transition transform duration-300",
                                            // TODO: make a array of protected routes in constants to show auth
                                            // isOpenSidebar ? "translate-x-[152px]" : "translate-x-0"
                                        )}
                                    >
                                        <Icons.create className="size-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    New chat
                                </TooltipContent>
                            </Tooltip> */}
                        </TooltipProvider>
                    )}
                </div>
                <React.Suspense fallback={<div>
                    wait a moment
                </div>}>
                    <div className="flex items-center gap-x-4 text-muted-foreground">
                        {user ? (
                            <UserAccount />
                        ) : !isLoading ? (
                            <>
                                <Link href="/auth/signin" className={buttonVariants({ size: "sm", variant: "outline" })}>
                                    Log in
                                </Link>
                                <Link href="/auth/signup" className={buttonVariants({ size: "sm" })}>
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <UserAccount />
                        )}
                    </div>
                </React.Suspense>
            </div>
        </header>
    )
};

export default DesktopHeader
