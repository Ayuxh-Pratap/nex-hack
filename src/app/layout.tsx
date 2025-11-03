"use client";

import DesktopHeader from "@/components/layout/desktop-header";
import DesktopSidebar from "@/components/sidebar/desktop-sidebar";
import Providers from "@/components/global/providers";
import MainWrapper from "@/components/layout/main-wrapper";
import MobileHeader from "@/components/layout/mobile-header";
import { useMockData } from "@/store/mock-data";
import "@/styles/globals.css";
import { cn } from "@/utils";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import LandingLayout from "./landing-layout";

// Dynamically import modals with SSR disabled to prevent hydration mismatches
const SearchModal = dynamic(() => import("@/components/modals/search-modal").then(mod => ({ default: mod.default })), { ssr: false });
const SettingsModal = dynamic(() => import("@/components/modals/settings-modal").then(mod => ({ default: mod.default })), { ssr: false });
const InstructionsModal = dynamic(() => import("@/components/modals/instructions-modal").then(mod => ({ default: mod.default })), { ssr: false });

const font = Inter({
    subsets: ["latin"],
});

// Inner layout component that uses Redux (inside Provider)
function InnerLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { chats } = useMockData();

    // Determine layout type
    const isLandingPage = pathname === "/";
    const isAuthPage = pathname.startsWith("/auth/");

    if (isLandingPage) {
        return <LandingLayout>{children}</LandingLayout>;
    }

    if (isAuthPage) {
        return <>{children}</>;
    }

    return (
        <>
            <SearchModal chats={chats} />
            <SettingsModal />
            <InstructionsModal />
            <DesktopHeader />
            <MobileHeader chats={chats} />
            <div className="relative flex grow h-dvh w-full mx-auto overflow-auto -14 z-0">
                <DesktopSidebar />
                <MainWrapper>
                    {children}
                </MainWrapper>
            </div>
        </>
    );
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <title>Hey Ova</title>
                <meta name="description" content="Hey Ova" />
            </head>
            <body
                className={cn(
                    "min-h-screen bg-background text-foreground antialiased",
                    font.className,
                )}
                suppressHydrationWarning
            >
                <Providers>
                    <InnerLayout>{children}</InnerLayout>
                </Providers>
            </body>
        </html>
    );
}
