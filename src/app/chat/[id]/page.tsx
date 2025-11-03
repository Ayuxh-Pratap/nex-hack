"use client";

import OvaContainer from "@/components/chat/ova/ova-container";
import { useMockData } from "@/store/mock-data";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks";
import { useEffect, Suspense } from "react";
import { CHAT_MODES } from "@/constants/chat";
import ModeToggle from "@/components/chat/mode-toggle";
import ChatContentSkeleton from "@/components/chat/chat-content-skeleton";

const ChatIdPageContent = () => {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const searchParams = useSearchParams();
    const user = useAppSelector((state) => state.auth.user);
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const { messages } = useMockData();

    // Ensure OVA mode for individual chats
    useEffect(() => {
        const mode = searchParams.get('mode');
        if (mode !== CHAT_MODES.OVA) {
            const params = new URLSearchParams(searchParams.toString());
            params.set('mode', CHAT_MODES.OVA);
            router.replace(`/chat/${id}?${params.toString()}`);
        }
    }, [id, searchParams, router]);

    // Three-state pattern: loading -> error -> content
    // Show skeleton with orb and input during loading
    if (isLoading) {
        return <ChatContentSkeleton />;
    }

    if (!id || !user) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">
                        {!user ? "Please sign in to access chat" : "Chat not found"}
                    </h1>
                    <p className="text-muted-foreground">
                        {!user 
                            ? "You need to be authenticated to use the chat feature."
                            : "The requested chat could not be found."}
                    </p>
                </div>
            </div>
        );
    }

    const chatMessages = messages[id] || [];

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

            {/* Content */}
            <div className="w-full h-full pt-24 pb-32">
                <OvaContainer user={user} chatId={id} messages={chatMessages} />
            </div>
        </div>
    );
};

const ChatIdPage = () => {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        }>
            <ChatIdPageContent />
        </Suspense>
    );
};

export default ChatIdPage;
