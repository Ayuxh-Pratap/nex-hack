"use client";

import { create } from "zustand";
import { Chat, Message, MockUser } from "@/types/mock";

interface MockDataStore {
    // User
    user: MockUser | null;
    setUser: (user: MockUser | null) => void;

    // Chats
    chats: Chat[];
    setChats: (chats: Chat[]) => void;
    addChat: (chat: Chat) => void;
    updateChat: (chatId: string, updates: Partial<Chat>) => void;
    deleteChat: (chatId: string) => void;

    // Messages
    messages: Record<string, Message[]>; // chatId -> messages
    setMessages: (chatId: string, messages: Message[]) => void;
    addMessage: (chatId: string, message: Message) => void;
    
    // Loading states
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    isAiLoading: boolean;
    setIsAiLoading: (loading: boolean) => void;
}

// Generate mock user
const mockUser: MockUser = {
    id: "mock-user-1",
    email: "user@example.com",
    name: "Demo User",
    avatar: undefined,
};

// Initial mock chats
const initialChats: Chat[] = [
    {
        id: "chat-1",
        user_id: mockUser.id,
        title: "Getting Started with React",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "chat-2",
        user_id: mockUser.id,
        title: "JavaScript Best Practices",
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString(),
    },
];

// Initial mock messages
const initialMessages: Record<string, Message[]> = {
    "chat-1": [
        {
            id: "msg-1",
            chat_id: "chat-1",
            content: "What is React?",
            role: "user",
            created_at: new Date().toISOString(),
        },
        {
            id: "msg-2",
            chat_id: "chat-1",
            content: "React is a JavaScript library for building user interfaces. It was developed by Facebook and is now maintained by a community of individual developers and companies.",
            role: "assistant",
            created_at: new Date().toISOString(),
        },
    ],
    "chat-2": [
        {
            id: "msg-3",
            chat_id: "chat-2",
            content: "What are some JavaScript best practices?",
            role: "user",
            created_at: new Date(Date.now() - 86400000).toISOString(),
        },
        {
            id: "msg-4",
            chat_id: "chat-2",
            content: "Here are some JavaScript best practices:\n\n1. **Use `const` and `let`** instead of `var`\n2. **Write meaningful variable names**\n3. **Use arrow functions** for cleaner syntax\n4. **Implement error handling** with try-catch\n5. **Avoid global variables**",
            role: "assistant",
            created_at: new Date(Date.now() - 86400000).toISOString(),
        },
    ],
};

export const useMockData = create<MockDataStore>((set) => ({
    // User
    user: mockUser,
    setUser: (user) => set({ user }),

    // Chats
    chats: initialChats,
    setChats: (chats) => set({ chats }),
    addChat: (chat) => set((state) => ({ chats: [chat, ...state.chats] })),
    updateChat: (chatId, updates) =>
        set((state) => ({
            chats: state.chats.map((chat) =>
                chat.id === chatId ? { ...chat, ...updates } : chat
            ),
        })),
    deleteChat: (chatId) =>
        set((state) => ({
            chats: state.chats.filter((chat) => chat.id !== chatId),
            messages: Object.fromEntries(
                Object.entries(state.messages).filter(([key]) => key !== chatId)
            ),
        })),

    // Messages
    messages: initialMessages,
    setMessages: (chatId, messages) =>
        set((state) => ({
            messages: { ...state.messages, [chatId]: messages },
        })),
    addMessage: (chatId, message) =>
        set((state) => ({
            messages: {
                ...state.messages,
                [chatId]: [...(state.messages[chatId] || []), message],
            },
        })),

    // Loading states
    isLoading: false,
    setIsLoading: (loading) => set({ isLoading: loading }),
    isAiLoading: false,
    setIsAiLoading: (loading) => set({ isAiLoading: loading }),
}));

