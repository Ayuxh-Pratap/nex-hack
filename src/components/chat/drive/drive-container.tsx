"use client";

import { useState, useEffect, useCallback } from "react";
import { User } from "@/types/auth";
import { StoredConversation } from "@/types/chat";
import DriveEmptyState from "./drive-empty-state";
import DriveSearchResults from "./drive-search-results";
import ChatInput from "../chat-input";
import { toast } from "sonner";

interface Props {
    user: User;
}

const DriveContainer = ({ user }: Props) => {
    const [conversations, setConversations] = useState<StoredConversation[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<StoredConversation[]>([]);
    const [currentQuery, setCurrentQuery] = useState<string>("");

    // Load stored conversations from localStorage (mock for now)
    useEffect(() => {
        // In a real app, this would fetch from API
        const stored = localStorage.getItem('drive_conversations');
        if (stored) {
            try {
                setConversations(JSON.parse(stored));
            } catch (e) {
                console.error('Error loading conversations:', e);
            }
        }
    }, []);

    const handleSearch = useCallback(async (query: string) => {
        // Don't clear input - let user continue searching
        setCurrentQuery(query);
        
        if (!query.trim()) {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        
        try {
            // Simulate search delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Mock search - in real app, this would search through stored conversations
            const results = conversations.filter(conv => 
                conv.transcript.toLowerCase().includes(query.toLowerCase()) ||
                conv.title.toLowerCase().includes(query.toLowerCase())
            );
            
            setSearchResults(results);
        } catch (error) {
            console.error('Search error:', error);
            toast.error("Search failed. Please try again.");
        } finally {
            setIsSearching(false);
        }
    }, [conversations]);

    const hasConversations = conversations.length > 0;
    const showResults = currentQuery.trim().length > 0;

    // Empty state when no conversations and no search
    if (!hasConversations && !showResults) {
        return (
            <div className="relative flex-1 size-full">
                <div className="relative flex flex-col w-full max-w-3xl pt-16 pb-24 mx-auto h-full">
                    <DriveEmptyState user={user} />
                </div>
                <ChatInput isLoading={isSearching} handleSendMessage={async () => {}} onSearch={handleSearch} />
            </div>
        );
    }

    // Show search results or all conversations
    return (
        <div className="relative flex-1 size-full">
            <div className="relative flex flex-col w-full max-w-3xl pt-16 pb-24 mx-auto h-full overflow-auto">
                {showResults ? (
                    <DriveSearchResults
                        query={currentQuery}
                        results={searchResults}
                        isSearching={isSearching}
                    />
                ) : (
                    <DriveSearchResults
                        query=""
                        results={conversations}
                        isSearching={false}
                    />
                )}
            </div>
            <ChatInput isLoading={isSearching} handleSendMessage={async () => {}} onSearch={handleSearch} />
        </div>
    );
};

export default DriveContainer;

