"use client";

import { Message, MockUser } from "@/types/mock";
import { User } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { toast } from "sonner";
import ChatWrapper from "./chat-wrapper";
import { useMockData } from "@/store/mock-data";
import { generateMockAIResponse, generateMockTitle } from "@/utils/mock-ai";

interface Props {
    user: MockUser;
    chatId?: string;
    messages: Message[] | [];
}

const ChatContainer = ({ user, chatId, messages }: Props) => {
    // Convert MockUser to User for ChatWrapper compatibility
    const userForWrapper: User = {
        id: user.id,
        email: user.email || '',
        name: user.name,
        avatar: user.avatar,
    };

    const router = useRouter();
    const {
        addChat,
        addMessage,
        setIsLoading,
        setIsAiLoading,
        isLoading,
        isAiLoading,
        messages: storeMessages,
    } = useMockData();
    
    // Use store messages if available, otherwise use props
    const displayMessages = chatId ? (storeMessages[chatId] || messages) : messages;

    const [oMessages, setOMessages] = useState<Message[]>([]);

    const handleSendMessage = async (message: string) => {
        setIsLoading(true);

        if (!message.trim()) return;

        const tempMessageId = `temp-${Date.now()}`;
        const userMessage: Message = {
            id: tempMessageId,
            chat_id: chatId || "",
            content: String(message),
            role: "user",
            created_at: new Date().toISOString(),
        };

        setOMessages((prev) => [...prev, userMessage]);

        try {
            if (chatId) {
                setIsAiLoading(true);
                
                // Add user message
                addMessage(chatId, userMessage);

                // Generate AI response
                const chatHistory = displayMessages.map(m => ({ role: m.role, content: m.content }));
                const aiResponse = await generateMockAIResponse(message, chatHistory);

                const aiMessage: Message = {
                    id: `ai-${Date.now()}`,
                    chat_id: chatId,
                    content: aiResponse,
                    role: 'assistant',
                    created_at: new Date().toISOString()
                };

                addMessage(chatId, aiMessage);
                setOMessages([]);
            } else {
                setIsAiLoading(true);

                // Create new chat
                const title = generateMockTitle(message);
                const newChatId = `chat-${Date.now()}`;
                
                const newChat = {
                    id: newChatId,
                    user_id: user.id,
                    title,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                };

                addChat(newChat);
                addMessage(newChatId, userMessage);

                // Generate AI response
                const aiResponse = await generateMockAIResponse(message);
                const aiMessage: Message = {
                    id: `ai-${Date.now()}`,
                    chat_id: newChatId,
                    content: aiResponse,
                    role: 'assistant',
                    created_at: new Date().toISOString()
                };

                addMessage(newChatId, aiMessage);
                router.push(`/c/${newChatId}`);
            }
        } catch (error) {
            console.log("Error creating chat", error);
            toast.error("Error creating chat. Please try again");
            setOMessages(prev =>
                prev.filter(msg => msg.id !== tempMessageId)
            );
        } finally {
            setIsLoading(false);
            setIsAiLoading(false);
            setTimeout(() => {
                setOMessages([]);
            }, 1000);
        }
    };

    return (
        <ChatWrapper
            user={userForWrapper}
            messages={displayMessages}
            isLoading={isLoading}
            oMessages={oMessages}
            isAiLoading={isAiLoading}
            onSubmit={handleSendMessage}
        />
    )
};

export default ChatContainer
