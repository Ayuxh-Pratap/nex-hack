"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { signInWithGoogle, signInWithEmail } from "@/store/slices/auth/authThunks";
import { toast } from "sonner";
import { AuthContainer } from "@/components/auth/auth-container";
import type { UserRole } from "@/types/auth";

const SignInPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user, isLoading, error } = useAppSelector((state) => state.auth);

    // Redirect if already authenticated
    useEffect(() => {
        if (user) {
            router.push("/course");
        }
    }, [user, router]);

    // Show error toast
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const handleGoogleSignIn = async (role: UserRole) => {
        try {
            const result = await dispatch(signInWithGoogle(role)).unwrap();
            if (result) {
                toast.success("Signed in successfully!");
                router.push("/course");
            }
        } catch (err) {
            // Error handled by thunk
        }
    };

    const handleEmailSignIn = async (
        data: { email: string; password: string },
        role: UserRole
    ) => {
        try {
            const result = await dispatch(
                signInWithEmail({ email: data.email, password: data.password, role })
            ).unwrap();
            if (result) {
                toast.success("Signed in successfully!");
                router.push("/course");
            }
        } catch (err) {
            // Error handled by thunk
        }
    };

    return (
        <AuthContainer
            mode="signin"
            onGoogleAuth={handleGoogleSignIn}
            onEmailAuth={handleEmailSignIn}
            isLoading={isLoading}
        />
    );
};

export default SignInPage;
