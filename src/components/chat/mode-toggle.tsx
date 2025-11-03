"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";
import { CHAT_MODES, DEFAULT_CHAT_MODE } from "@/constants/chat";
import type { ChatMode } from "@/types/chat";

const OVA_LAST_CHAT_ID_KEY = 'ova_last_chat_id';

const ModeToggle = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const currentMode = (searchParams.get('mode') as ChatMode) || DEFAULT_CHAT_MODE;

    const handleModeChange = (mode: ChatMode) => {
        const chatIdMatch = pathname?.match(/^\/chat\/([^\/]+)$/);
        const currentChatId = chatIdMatch ? chatIdMatch[1] : null;

        const params = new URLSearchParams(searchParams.toString());
        params.set('mode', mode);

        if (mode === CHAT_MODES.DRIVE) {
            // Switching to DRIVE: Store current chat ID if we're on a specific chat
            if (currentChatId && currentMode === CHAT_MODES.OVA) {
                if (typeof window !== 'undefined') {
                    sessionStorage.setItem(OVA_LAST_CHAT_ID_KEY, currentChatId);
                }
            }
            // Navigate to main chat page in DRIVE mode
            router.push(`/chat?${params.toString()}`);
        } else if (mode === CHAT_MODES.OVA) {
            // Switching to OVA: Check for stored chat ID
            let targetChatId: string | null = null;
            
            if (typeof window !== 'undefined') {
                targetChatId = sessionStorage.getItem(OVA_LAST_CHAT_ID_KEY);
            }

            if (targetChatId) {
                router.push(`/chat/${targetChatId}?${params.toString()}`);
            } else {
                router.push(`/chat?${params.toString()}`);
            }
        }
    };

    return (
        <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
            <Button
                variant={currentMode === CHAT_MODES.OVA ? "default" : "ghost"}
                size="sm"
                onClick={() => handleModeChange(CHAT_MODES.OVA)}
                className={cn(
                    "px-4 py-1.5 text-sm font-medium transition-all hover:bg-background",
                    currentMode === CHAT_MODES.OVA
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                )}
            >
                OVA
            </Button>
            <Button
                variant={currentMode === CHAT_MODES.DRIVE ? "default" : "ghost"}
                size="sm"
                onClick={() => handleModeChange(CHAT_MODES.DRIVE)}
                className={cn(
                    "px-4 py-1.5 text-sm font-medium transition-all hover:bg-background",
                    currentMode === CHAT_MODES.DRIVE
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                )}
            >
                DRIVE
            </Button>
        </div>
    );
};

export default ModeToggle;

