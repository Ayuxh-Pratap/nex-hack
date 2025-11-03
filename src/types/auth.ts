// Auth types
export interface User {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
    emailVerified?: boolean;
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
}

export interface TokenExchangeResponse {
    access_token: string;
    user?: User;
}

export interface AuthError {
    code: string;
    message: string;
}

