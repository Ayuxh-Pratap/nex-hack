// Course types for the edtech platform

export interface Lecture {
    id: string;
    course_id: string;
    title: string;
    description: string;
    video_url?: string;
    duration?: number; // in seconds
    order: number;
    created_at: string;
    updated_at: string;
    materials?: CourseMaterial[];
}

export interface CourseMaterial {
    id: string;
    lecture_id: string;
    type: 'pdf' | 'doc' | 'link' | 'code' | 'image';
    title: string;
    url: string;
    created_at: string;
}

export interface Course {
    id: string;
    title: string;
    description: string;
    instructor?: {
        id: string;
        name: string;
        avatar?: string;
    };
    thumbnail?: string;
    total_lectures: number;
    total_duration?: number; // in seconds
    enrolled_at?: string;
    progress?: number; // 0-100 percentage
    created_at: string;
    updated_at: string;
    lectures: Lecture[];
}

export interface CourseProgress {
    course_id: string;
    user_id: string;
    completed_lectures: string[]; // lecture IDs
    current_lecture_id?: string;
    progress_percentage: number;
    last_accessed_at: string;
    updated_at: string;
}

export interface CourseMessage {
    id: string;
    course_id: string;
    content: string;
    role: 'user' | 'assistant';
    created_at: string;
}

