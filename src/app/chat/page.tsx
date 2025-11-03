"use client";

import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks";
import { useMockData } from "@/store/mock-data";
import { CHAT_MODES, DEFAULT_CHAT_MODE } from "@/constants/chat";
import type { ChatMode } from "@/types/chat";
import OvaContainer from "@/components/chat/ova/ova-container";
import DriveContainer from "@/components/chat/drive/drive-container";
import ModeToggle from "@/components/chat/mode-toggle";
import ChatContentSkeleton from "@/components/chat/chat-content-skeleton";
import { useEffect, Suspense } from "react";

const OVA_LAST_CHAT_ID_KEY = 'ova_last_chat_id';

const ChatPageContent = () => {
    const searchParams = useSearchParams();
    const mode = (searchParams.get('mode') as ChatMode) || DEFAULT_CHAT_MODE;
    const user = useAppSelector((state) => state.auth.user);
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const { messages } = useMockData();
    
    const currentMessages = messages[""] || [];

    // Clear stored chat ID when user is on main chat page in OVA mode
    // Run after mount to avoid hydration issues
    useEffect(() => {
        if (mode === CHAT_MODES.OVA) {
            sessionStorage.removeItem(OVA_LAST_CHAT_ID_KEY);
        }
    }, [mode]);

    // Three-state pattern: loading -> error -> content
    // Show skeleton with orb and input during loading
    if (isLoading) {
        return (
            <>
                <ChatContentSkeleton />
            </>
        );
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Please sign in to access chat</h1>
                    <p className="text-muted-foreground">You need to be authenticated to use the chat feature.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center w-full relative h-full">
            {/* Mode Toggle - Fixed at top */}
            <div className="fixed top-[4.5rem] lg:top-8 z-40 w-full flex justify-center pointer-events-none">
                <div className="pointer-events-auto">
                    <ModeToggle />
                </div>
            </div>

            {/* Background gradients */}
            <div className="fixed -z-10 top-0 left-1/2 -translate-x-1/2 bg-blue-500 rounded-full w-full h-1/6 blur-[10rem] opacity-10"></div>
            <div className="fixed -z-10 top-0 left-1/2 -translate-x-1/2 bg-amber-500 rounded-full w-3/4 h-1/6 blur-[10rem] opacity-10"></div>
            <div className="fixed -z-10 top-1/8 left-1/4 -translate-x-1/4 bg-orange-500 rounded-full w-1/3 h-1/6 blur-[10rem] mix-blend-multiply opacity-20"></div>
            <div className="fixed -z-10 top-1/8 right-1/4 translate-x-1/4 bg-sky-500 rounded-full w-1/3 h-1/6 blur-[10rem] mix-blend-multiply opacity-20"></div>

            {/* Mode-specific content */}
            <div className="w-full h-full pt-24 pb-32">
                {mode === CHAT_MODES.OVA ? (
                    <OvaContainer user={user} messages={currentMessages} />
                ) : (
                    <DriveContainer user={user} />
                )}
            </div>
        </div>
    );
};

const ChatPage = () => {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        }>
            <ChatPageContent />
        </Suspense>
    );
};

export default ChatPage;
