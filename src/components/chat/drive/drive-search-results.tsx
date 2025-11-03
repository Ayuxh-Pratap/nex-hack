"use client";

import { StoredConversation } from "@/types/chat";
import { formatDistanceToNow } from "date-fns";
import { MessageSquareIcon, MicIcon, SearchIcon } from "lucide-react";
import { cn } from "@/utils";
import { Loader2Icon } from "lucide-react";

interface Props {
    query: string;
    results: StoredConversation[];
    isSearching: boolean;
}

const DriveSearchResults = ({ query, results, isSearching }: Props) => {
    if (isSearching) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-3">
                    <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Searching conversations...</p>
                </div>
            </div>
        );
    }

    if (query && results.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-3 text-center">
                    <SearchIcon className="size-12 text-muted-foreground/50" />
                    <div>
                        <p className="text-lg font-medium">No results found</p>
                        <p className="text-sm text-muted-foreground mt-1">
                            No conversations match "{query}"
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (results.length === 0) {
        return null;
    }

    return (
        <div className="w-full h-full overflow-auto">
            <div className="max-w-4xl mx-auto p-6 space-y-4">
                {query && (
                    <div className="mb-6">
                        <p className="text-sm text-muted-foreground">
                            Found {results.length} {results.length === 1 ? 'conversation' : 'conversations'}
                            {query && ` for "${query}"`}
                        </p>
                    </div>
                )}
                
                <div className="space-y-3">
                    {results.map((conversation) => (
                        <div
                            key={conversation.id}
                            className={cn(
                                "group relative p-4 rounded-lg border border-border/60",
                                "hover:bg-muted/50 hover:border-border transition-all cursor-pointer",
                                "active:scale-[0.99]"
                            )}
                        >
                            <div className="flex items-start gap-3">
                                <div className={cn(
                                    "flex items-center justify-center size-10 rounded-lg",
                                    conversation.type === 'audio' 
                                        ? "bg-blue-500/10 text-blue-500" 
                                        : "bg-purple-500/10 text-purple-500"
                                )}>
                                    {conversation.type === 'audio' ? (
                                        <MicIcon className="size-5" />
                                    ) : (
                                        <MessageSquareIcon className="size-5" />
                                    )}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="font-medium text-sm line-clamp-1">
                                            {conversation.title}
                                        </h3>
                                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                                            {formatDistanceToNow(new Date(conversation.createdAt), { addSuffix: true })}
                                        </span>
                                    </div>
                                    
                                    <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">
                                        {conversation.transcript}
                                    </p>
                                    
                                    {conversation.type === 'audio' && conversation.duration && (
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-xs text-muted-foreground">
                                                {Math.floor(conversation.duration / 60)}:{(conversation.duration % 60).toString().padStart(2, '0')}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DriveSearchResults;

