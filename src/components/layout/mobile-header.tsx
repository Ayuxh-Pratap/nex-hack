"use client";

import { Chat } from "@/types/mock";
import { cn } from "@/utils";
import Link from "next/link";
import Icons from "../global/icons";
import MobileSidebar from "../sidebar/mobile-sidebar";
import { buttonVariants } from "../ui/button";
import UserAccount from "../common/user-account";
import UserAccountSkeleton from "../common/user-account-skeleton";
import { useAppSelector } from "@/lib/store/hooks";

interface Props {
    chats: Chat[];
}

const MobileHeader = ({ chats }: Props) => {
    const user = useAppSelector((state) => state.auth.user);
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    return (
        <header className="fixed inset-x-0 top-0 z-50 w-full px-3 h-14 bg-background border-b border-border/80 block lg:hidden">
            <div className="flex items-center justify-between w-full h-full text-muted-foreground">
                <div className="flex items-center gap-x-2">
                    {/* Logo - Always visible */}
                    <Link href="/">
                        <img 
                            src="/logo/ova.svg" 
                            alt="OVA Logo" 
                            className="size-6 block"
                        />
                    </Link>
                    {/* Sidebar button - Only when user exists */}
                    {user && (
                        <MobileSidebar />
                    )}
                </div>

                <div className="flex items-center">
                    {isLoading ? (
                        <UserAccountSkeleton />
                    ) : user ? (
                        <UserAccount />
                    ) : (
                        <Link href="/auth/signup" className={buttonVariants({ size: "sm" })}>
                            <span className="text-sm font-medium">
                                Sign Up
                            </span>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}

export default MobileHeader
