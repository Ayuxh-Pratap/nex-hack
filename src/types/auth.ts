// User roles
export type UserRole = "teacher" | "student";

// Auth types
export interface User {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
    emailVerified?: boolean;
    role?: UserRole;
}

export interface AuthState {
    user: User | null;
    firebaseToken: string | null;
    backendToken: string | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

// API Response types
export interface TokenExchangeRequest {
    firebase_token: string;
    role?: UserRole;
}

export interface TokenExchangeResponse {
    access_token: string;
    user?: User;
}

export interface AuthError {
    code: string;
    message: string;
}

