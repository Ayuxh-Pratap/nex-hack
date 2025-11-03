// Mock types for frontend-only application

export type Message = {
    id: string;
    chat_id: string;
    content: string;
    role: 'user' | 'assistant';
    created_at: string;
}

export interface Chat {
    id: string;
    user_id: string;
    title: string;
    created_at: string;
    updated_at: string;
}

export type MockUser = {
    id: string;
    email?: string;
    name?: string;
    avatar?: string;
}

