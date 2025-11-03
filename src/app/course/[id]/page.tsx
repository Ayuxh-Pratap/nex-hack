"use client";

import CourseOvaContainer from "@/components/course/course-ova-container";
import CourseDriveContainer from "@/components/course/course-drive-container";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks";
import { Suspense, useEffect } from "react";
import { CHAT_MODES } from "@/constants/chat";
import ModeToggle from "@/components/chat/mode-toggle";
import ChatContentSkeleton from "@/components/chat/chat-content-skeleton";
import { useCourseData } from "@/store/course-mock-data";

const CourseIdPageContent = () => {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const searchParams = useSearchParams();
    const user = useAppSelector((state) => state.auth.user);
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const { getCourseById, messages } = useCourseData();

    const course = getCourseById(id as string);
    const mode = searchParams.get('mode') as 'ova' | 'drive';
    const courseMessages = course ? (messages[course.id] || []) : [];

    // Default to OVA mode if no mode specified
    useEffect(() => {
        if (!mode) {
            const params = new URLSearchParams(searchParams.toString());
            params.set('mode', CHAT_MODES.OVA);
            router.replace(`/course/${id}?${params.toString()}`);
        }
    }, [id, mode, searchParams, router]);

    if (isLoading) {
        return <ChatContentSkeleton />;
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Please sign in to access courses</h1>
                    <p className="text-muted-foreground">You need to be authenticated to view courses.</p>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Course not found</h1>
                    <p className="text-muted-foreground">The requested course could not be found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center w-full relative h-full">
            {/* Background gradients */}
            <div className="fixed -z-10 top-0 left-1/2 -translate-x-1/2 bg-blue-500 rounded-full w-full h-1/6 blur-[10rem] opacity-10"></div>
            <div className="fixed -z-10 top-0 left-1/2 -translate-x-1/2 bg-amber-500 rounded-full w-3/4 h-1/6 blur-[10rem] opacity-10"></div>
            <div className="fixed -z-10 top-1/8 left-1/4 -translate-x-1/4 bg-orange-500 rounded-full w-1/3 h-1/6 blur-[10rem] mix-blend-multiply opacity-20"></div>
            <div className="fixed -z-10 top-1/8 right-1/4 translate-x-1/4 bg-sky-500 rounded-full w-1/3 h-1/6 blur-[10rem] mix-blend-multiply opacity-20"></div>
            
            {/* Mode Toggle - Fixed at top */}
            <div className="fixed top-[4.5rem] lg:top-8 z-40 w-full flex justify-center pointer-events-none">
                <div className="pointer-events-auto">
                    <ModeToggle />
                </div>
            </div>

            {/* Content */}
            <div className="w-full h-full pt-20">
                {mode === CHAT_MODES.OVA ? (
                    <CourseOvaContainer user={user} course={course} messages={courseMessages} />
                ) : (
                    <CourseDriveContainer user={user} course={course} messages={courseMessages} />
                )}
            </div>
        </div>
    );
};

const CourseIdPage = () => {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        }>
            <CourseIdPageContent />
        </Suspense>
    );
};

export default CourseIdPage;

