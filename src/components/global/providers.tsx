"use client";

import React, { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "../ui/sonner";
import { ReduxProvider } from "@/lib/store/ReduxProvider";
import { useAppDispatch } from "@/lib/store/hooks";
import { checkAuthState } from "@/store/slices/auth/authThunks";

interface AuthCheckerProps {
    children: React.ReactNode;
}

// This component must be inside ReduxProvider to use hooks
const AuthChecker = ({ children }: AuthCheckerProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Check auth state on mount
        dispatch(checkAuthState());
    }, [dispatch]);

    return <>{children}</>;
};

interface Props {
    children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
    return (
        <ReduxProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <AuthChecker>
                    <Toaster
                        richColors
                        theme="light"
                        position="top-center"
                    />
                    {children}
                </AuthChecker>
            </ThemeProvider>
        </ReduxProvider>
    );
};

export default Providers;
