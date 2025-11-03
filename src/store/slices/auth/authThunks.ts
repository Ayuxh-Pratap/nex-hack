import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { tokenService } from "@/services/tokenService";
import { authApi } from "./authApi";
import { setUser, setFirebaseToken, setBackendToken, clearAuth, setLoading, setError } from "./authSlice";
import type { AppDispatch } from "@/lib/store";
import type { User } from "@/types/auth";

// Helper: Convert Firebase user to app User type
const firebaseUserToUser = (firebaseUser: FirebaseUser): User => ({
    id: firebaseUser.uid,
    email: firebaseUser.email || "",
    name: firebaseUser.displayName || undefined,
    avatar: firebaseUser.photoURL || undefined,
    emailVerified: firebaseUser.emailVerified,
});

// Sign in with Google
export const signInWithGoogle = createAsyncThunk(
    "auth/signInWithGoogle",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));

            // Firebase Google sign-in
            const result = await signInWithPopup(auth, googleProvider);
            const firebaseUser = result.user;
            const firebaseToken = await firebaseUser.getIdToken();

            // Convert to app User type
            const user = firebaseUserToUser(firebaseUser);

            // Exchange Firebase token for backend token
            const exchangeResult = await dispatch(
                authApi.endpoints.exchangeToken.initiate({ firebase_token: firebaseToken })
            ).unwrap();

            const backendToken = exchangeResult.access_token;

            // Store tokens
            tokenService.setTokens(firebaseToken, backendToken);

            // Update Redux state
            dispatch(setUser(user));
            dispatch(setFirebaseToken(firebaseToken));
            dispatch(setBackendToken(backendToken));

            dispatch(setLoading(false));
            return { user, firebaseToken, backendToken };
        } catch (error: any) {
            dispatch(setLoading(false));
            const errorMessage = error?.message || "Sign in failed";
            dispatch(setError(errorMessage));
            return rejectWithValue(errorMessage);
        }
    }
);

// Sign out
export const signOut = createAsyncThunk(
    "auth/signOut",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            dispatch(setLoading(true));

            // Firebase sign out
            await firebaseSignOut(auth);

            // Clear tokens
            tokenService.clearTokens();

            // Clear Redux state
            dispatch(clearAuth());

            dispatch(setLoading(false));
        } catch (error: any) {
            dispatch(setLoading(false));
            const errorMessage = error?.message || "Sign out failed";
            dispatch(setError(errorMessage));
            return rejectWithValue(errorMessage);
        }
    }
);

// Check auth state (run on app load)
export const checkAuthState = createAsyncThunk(
    "auth/checkAuthState",
    async (_, { dispatch }) => {
        return new Promise<{ user: User | null; firebaseToken: string | null }>((resolve) => {
            dispatch(setLoading(true));

            onAuthStateChanged(auth, async (firebaseUser) => {
                try {
                    if (firebaseUser) {
                        const firebaseToken = await firebaseUser.getIdToken();
                        const user = firebaseUserToUser(firebaseUser);

                        // Get stored backend token
                        const backendToken = tokenService.getBackendToken();

                        if (backendToken) {
                            dispatch(setUser(user));
                            dispatch(setFirebaseToken(firebaseToken));
                            dispatch(setBackendToken(backendToken));
                        } else {
                            // Exchange token if backend token missing
                            const exchangeResult = await dispatch(
                                authApi.endpoints.exchangeToken.initiate({ firebase_token: firebaseToken })
                            ).unwrap();

                            const newBackendToken = exchangeResult.access_token;
                            tokenService.setTokens(firebaseToken, newBackendToken);
                            dispatch(setBackendToken(newBackendToken));
                            dispatch(setUser(user));
                            dispatch(setFirebaseToken(firebaseToken));
                        }

                        dispatch(setLoading(false));
                        resolve({ user, firebaseToken });
                    } else {
                        // User not signed in
                        dispatch(clearAuth());
                        dispatch(setLoading(false));
                        resolve({ user: null, firebaseToken: null });
                    }
                } catch (error: any) {
                    dispatch(setLoading(false));
                    dispatch(setError(error?.message || "Auth check failed"));
                    resolve({ user: null, firebaseToken: null });
                }
            });
        });
    }
);

