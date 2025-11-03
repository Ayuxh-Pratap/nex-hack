"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";
import { CHAT_MODES, DEFAULT_CHAT_MODE } from "@/constants/chat";
import type { ChatMode } from "@/types/chat";

const OVA_LAST_CHAT_ID_KEY = 'ova_last_chat_id';
const OVA_LAST_COURSE_ID_KEY = 'ova_last_course_id';

const ModeToggle = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const currentMode = (searchParams.get('mode') as ChatMode) || DEFAULT_CHAT_MODE;

    const handleModeChange = (mode: ChatMode) => {
        // Check if we're on course or chat route
        const courseIdMatch = pathname?.match(/^\/course\/([^\/]+)$/);
        const chatIdMatch = pathname?.match(/^\/chat\/([^\/]+)$/);
        const isCourseRoute = pathname?.startsWith('/course');
        const currentId = courseIdMatch ? courseIdMatch[1] : (chatIdMatch ? chatIdMatch[1] : null);

        const params = new URLSearchParams(searchParams.toString());
        params.set('mode', mode);

        if (mode === CHAT_MODES.DRIVE) {
            // Switching to DRIVE: Store current ID if we're in OVA mode
            if (currentId && currentMode === CHAT_MODES.OVA) {
                if (typeof window !== 'undefined') {
                    if (isCourseRoute) {
                        sessionStorage.setItem(OVA_LAST_COURSE_ID_KEY, currentId);
                    } else {
                        sessionStorage.setItem(OVA_LAST_CHAT_ID_KEY, currentId);
                    }
                }
            }
            // Navigate to same page with DRIVE mode, preserving the ID
            if (isCourseRoute) {
                if (currentId) {
                    router.push(`/course/${currentId}?${params.toString()}`);
                } else {
                    router.push(`/course?${params.toString()}`);
                }
            } else {
                if (currentId) {
                    router.push(`/chat/${currentId}?${params.toString()}`);
                } else {
                    router.push(`/chat?${params.toString()}`);
                }
            }
        } else if (mode === CHAT_MODES.OVA) {
            // Switching to OVA: Check for stored ID
            let targetId: string | null = null;
            
            if (typeof window !== 'undefined') {
                targetId = isCourseRoute 
                    ? sessionStorage.getItem(OVA_LAST_COURSE_ID_KEY)
                    : sessionStorage.getItem(OVA_LAST_CHAT_ID_KEY);
            }

            if (targetId) {
                if (isCourseRoute) {
                    router.push(`/course/${targetId}?${params.toString()}`);
                } else {
                    router.push(`/chat/${targetId}?${params.toString()}`);
                }
            } else {
                if (isCourseRoute) {
                    router.push(`/course?${params.toString()}`);
                } else {
                    router.push(`/chat?${params.toString()}`);
                }
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

