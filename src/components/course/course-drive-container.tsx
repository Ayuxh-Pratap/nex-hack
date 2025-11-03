"use client";

import { useState } from "react";
import type { User } from "@/types/auth";
import type { Course, CourseMessage } from "@/types/course";
import { useCourseData } from "@/store/course-mock-data";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ChatWrapper from "../chat/chat-wrapper";
import { generateMockAIResponse, generateMockTitle } from "@/utils/mock-ai";
import { BookOpen, MessageSquare } from "lucide-react";

interface CourseDriveContainerProps {
    user: User;
    course?: Course;
    courses?: Course[];
    messages?: CourseMessage[];
}

const CourseDriveContainer = ({ user, course, courses, messages: propMessages }: CourseDriveContainerProps) => {
    const router = useRouter();
    const {
        addMessage,
        setIsLoading,
        setIsAiLoading,
        isLoading,
        isAiLoading,
        messages: storeMessages,
    } = useCourseData();

    // If no course selected, show course list for chat
    if (!course && courses) {
        return (
            <div className="relative flex-1 size-full">
                <div className="relative flex flex-col w-full max-w-5xl pt-8 pb-24 mx-auto h-full overflow-auto px-4">
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Chat About Courses</h1>
                            <p className="text-muted-foreground">Select a course to start chatting with AI</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {courses.map((c) => {
                                const courseMessages = storeMessages[c.id] || [];
                                const lastMessage = courseMessages.length > 0 ? courseMessages[courseMessages.length - 1] : null;
                                
                                return (
                                    <div 
                                        key={c.id} 
                                        className="cursor-pointer p-4 rounded-lg hover:bg-accent/50 transition-colors space-y-3"
                                        onClick={() => router.push(`/course/${c.id}?mode=drive`)}
                                    >
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <MessageSquare className="h-5 w-5 text-primary" />
                                                <h3 className="font-semibold text-lg line-clamp-2">{c.title}</h3>
                                            </div>
                                            <p className="text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">
                                                    {courseMessages.length} messages
                                                </span>
                                            </div>
                                            {lastMessage && (
                                                <p className="text-xs text-muted-foreground truncate">
                                                    {lastMessage.content.substring(0, 60)}...
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <p className="text-muted-foreground">No course selected</p>
                </div>
            </div>
        );
    }

    // Use store messages if available, otherwise use props
    // This ensures messages persist when switching between OVA and Drive modes
    // Convert CourseMessage to Message format for ChatWrapper
    const allMessages = storeMessages[course.id] || propMessages || [];
    const displayMessages = allMessages.map(msg => ({
        id: msg.id,
        chat_id: course.id,
        content: msg.content,
        role: msg.role as 'user' | 'assistant',
        created_at: msg.created_at,
    }));

    const handleSendMessage = async (message: string) => {
        setIsLoading(true);

        if (!message.trim()) return;

        try {
            setIsAiLoading(true);
            
            // Add user message
            const userMessage: CourseMessage = {
                id: `msg-${Date.now()}-user`,
                course_id: course.id,
                content: message,
                role: "user",
                created_at: new Date().toISOString(),
            };

            addMessage(course.id, userMessage);

            // Generate AI response with course context
            const chatHistory = displayMessages.map(m => ({ role: m.role, content: m.content }));
            const contextPrompt = `You are an AI assistant helping with the course "${course.title}". ${course.description}. Answer questions about this course.`;
            const aiResponse = await generateMockAIResponse(message, chatHistory);

            const aiMessage: CourseMessage = {
                id: `msg-${Date.now()}-ai`,
                course_id: course.id,
                content: aiResponse,
                role: 'assistant',
                created_at: new Date().toISOString()
            };

            addMessage(course.id, aiMessage);
        } catch (error) {
            console.log("Error sending message", error);
            toast.error("Error sending message. Please try again");
        } finally {
            setIsLoading(false);
            setIsAiLoading(false);
        }
    };

    return (
        <ChatWrapper
            user={user}
            messages={displayMessages}
            isLoading={isLoading}
            oMessages={[]}
            isAiLoading={isAiLoading}
            onSubmit={handleSendMessage}
        />
    );
};

export default CourseDriveContainer;

