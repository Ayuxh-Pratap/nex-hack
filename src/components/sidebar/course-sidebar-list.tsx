"use client";

import { useCourseData } from "@/store/course-mock-data";
import CourseSidebarItem from "./course-sidebar-item";
import { usePathname } from "next/navigation";

const CourseSidebarList = () => {
    const { courses } = useCourseData();
    const pathname = usePathname();

    if (courses.length === 0) {
        return (
            <div className="flex items-center justify-center p-4">
                <p className="text-sm text-muted-foreground">No courses enrolled yet</p>
            </div>
        );
    }

    return (
        <ul className="flex flex-col gap-1 px-3">
            {courses.map((course, index) => (
                <CourseSidebarItem 
                    key={course.id} 
                    course={course} 
                    index={index}
                    isActive={pathname?.includes(`/course/${course.id}`)}
                />
            ))}
        </ul>
    );
};

export default CourseSidebarList;

