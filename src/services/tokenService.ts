class TokenService {
    private readonly FIREBASE_TOKEN_KEY = 'firebase_token';
    private readonly BACKEND_TOKEN_KEY = 'backend_access_token';

    setTokens(firebaseToken: string, backendToken: string): void {
        if (typeof window === 'undefined') return;
        try {
            localStorage.setItem(this.FIREBASE_TOKEN_KEY, firebaseToken);
            localStorage.setItem(this.BACKEND_TOKEN_KEY, backendToken);
        } catch (error) {
            console.error('Failed to store tokens:', error);
        }
    }

    getBackendToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(this.BACKEND_TOKEN_KEY);
    }

    getFirebaseToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(this.FIREBASE_TOKEN_KEY);
    }

    clearTokens(): void {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(this.FIREBASE_TOKEN_KEY);
        localStorage.removeItem(this.BACKEND_TOKEN_KEY);
    }

    async exchangeToken(firebaseToken: string): Promise<string> {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firebase_token: firebaseToken }),
        });

        if (!response.ok) throw new Error('Token exchange failed');
        const data = await response.json();
        return data.access_token;
    }
}

export const tokenService = new TokenService();
