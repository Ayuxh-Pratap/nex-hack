"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useInstructions, useSettings } from "@/hooks";
import Avvvatars from 'avvvatars-react';
import { LogOutIcon, SettingsIcon, UserCogIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { signOut } from "@/store/slices/auth/authThunks";
import UserAccountSkeleton from "./user-account-skeleton";

const UserAccount = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const isLoading = useAppSelector((state) => state.auth.isLoading);

    const { isOpen, setIsOpen } = useInstructions();
    const { isOpen: isOpenSettings, setIsOpen: setIsOpenSettings } = useSettings();

    const handleSignout = async () => {
        try {
            await dispatch(signOut()).unwrap();
            toast.success("You're logged out!");
            router.push("/");
        } catch (error) {
            toast.error("Failed to sign out");
        }
    };

    if (isLoading) {
        return <UserAccountSkeleton />;
    }

    if (!user) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
                {user.avatar ? (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                        <img 
                            src={user.avatar} 
                            alt={user.name || user.email}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ) : (
                    <Avvvatars
                        value={user.name || user.email}
                        border
                        size={32}
                        radius={999}
                        borderSize={1}
                        borderColor="hsl(var(--border))"
                    />
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-2 w-60 shadow-black/20">
                <div className="flex flex-col items-start px-3.5 py-1.5">
                    <h5 className="text-sm font-medium capitalize">
                        {user.name || "User"}
                    </h5>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        {user.email}
                    </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsOpen(true)}>
                    <UserCogIcon className="size-4 mr-2" />
                    Customize
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsOpenSettings(true)}>
                    <SettingsIcon className="size-4 mr-2" />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignout}>
                    <LogOutIcon className="size-4 mr-2" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

export default UserAccount
