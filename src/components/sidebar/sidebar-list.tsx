"use client";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SessionItem from "./session-item";
import SessionItemSkeleton from "./session-item-skeleton";
import SidebarListSkeleton from "./sidebar-list-skeleton";
import { useAppSelector } from "@/lib/store/hooks";
import { useLazyGetSessionsQuery } from "@/store/slices/auth/authApi";
import type { Session } from "@/types/chat";

const SidebarList = () => {
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const user = useAppSelector((state) => state.auth.user);
    
    const [sessions, setSessions] = useState<Session[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [total, setTotal] = useState(0);
    
    const pageSize = 10;
    
    const [fetchSessions, { data, isLoading: isFetching, isError }] = useLazyGetSessionsQuery();

    // Initial fetch
    useEffect(() => {
        if (user && !isLoading) {
            fetchSessions({ page_number: 1, page_size: pageSize });
        }
    }, [user, isLoading, fetchSessions]);

    // Update sessions when data changes
    useEffect(() => {
        if (data) {
            // If page number is 1, replace sessions, otherwise append
            if (data.page_number === 1) {
                setSessions(data.data);
            } else {
                setSessions((prev) => [...prev, ...data.data]);
            }
            setTotal(data.total);
            setHasMore(data.pagination.next !== null);
            setPageNumber(data.page_number);
        }
    }, [data]);

    const loadMore = () => {
        if (!isFetching && hasMore && user) {
            const nextPage = pageNumber + 1;
            fetchSessions({ page_number: nextPage, page_size: pageSize });
        }
    };

    // Show skeleton while auth is loading or initial fetch
    if (isLoading || (isFetching && sessions.length === 0)) {
        return <SidebarListSkeleton />;
    }

    // Show error state
    if (isError && sessions.length === 0) {
        return (
            <div className="flex flex-col overflow-hidden">
                <div className="overflow-y-auto overflow-x-hidden scrollbar-hide h-[360px] flex items-center justify-center">
                    <div className="p-6 text-center">
                        <p className="text-sm text-muted-foreground font-medium">
                            Failed to load sessions
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                            Please try refreshing the page
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Show empty state
    if (sessions.length === 0 && !isFetching) {
        return (
            <div className="flex flex-col overflow-hidden">
                <div className="overflow-y-auto overflow-x-hidden scrollbar-hide h-[360px] flex items-center justify-center">
                    <div className="p-6 text-center">
                        <p className="text-sm text-muted-foreground font-medium">
                            No sessions found
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col overflow-hidden">
            <div
                id="sessions-scrollable"
                className="overflow-y-auto overflow-x-hidden scrollbar-hide h-[360px]"
            >
                <InfiniteScroll
                    dataLength={sessions.length}
                    next={loadMore}
                    hasMore={hasMore}
                    loader={
                        <div className="sm:px-2">
                            <ol>
                                {/* Show 3 skeleton items while loading next page */}
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <SessionItemSkeleton 
                                        key={`skeleton-${sessions.length + index}`} 
                                        index={index} 
                                    />
                                ))}
                            </ol>
                        </div>
                    }
                    endMessage={
                        sessions.length > 0 && hasMore === false ? (
                            <div className="px-2 py-3 text-center">
                                <p className="text-xs text-muted-foreground">
                                    All {total} sessions loaded
                                </p>
                            </div>
                        ) : null
                    }
                    scrollableTarget="sessions-scrollable"
                >
                    <ol className="sm:px-2">
                        {sessions.map((session, index) => (
                            <SessionItem 
                                key={session.session_id || `${session.date}-${index}`} 
                                session={session} 
                                index={index} 
                            />
                        ))}
                    </ol>
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default SidebarList;
