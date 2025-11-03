"use client";

import { useSidebar } from "@/hooks";
import { cn } from "@/utils";
import { useAppSelector } from "@/lib/store/hooks";

interface Props {
    children: React.ReactNode;
}

const MainWrapper = ({ children }: Props) => {
    const user = useAppSelector((state) => state.auth.user);
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const { isOpen: isOpenSidebar } = useSidebar();

    const shouldApplyMargin = isOpenSidebar && (user || isLoading);

    return (
        <div
            className={cn(
                "w-full h-dvh mx-auto transition-all duration-300 ease-in-out",
                shouldApplyMargin ? "lg:ml-68" : "lg:ml-0"
            )}
        >
            {children}
        </div>
    );
};

export default MainWrapper;
