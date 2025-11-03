"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { signInWithGoogle, signUpWithEmail } from "@/store/slices/auth/authThunks";
import { toast } from "sonner";
import { AuthContainer } from "@/components/auth/auth-container";
import type { UserRole } from "@/types/auth";

const SignUpPage = () => {
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

    const handleGoogleSignUp = async (role: UserRole) => {
        try {
            const result = await dispatch(signInWithGoogle(role)).unwrap();
            if (result) {
                toast.success("Account created successfully!");
                router.push("/course");
            }
        } catch (err) {
            // Error handled by thunk
        }
    };

    const handleEmailSignUp = async (
        data: { email: string; password: string; name?: string },
        role: UserRole
    ) => {
        try {
            const result = await dispatch(
                signUpWithEmail({
                    email: data.email,
                    password: data.password,
                    name: data.name,
                    role,
                })
            ).unwrap();
            if (result) {
                toast.success("Account created successfully!");
                router.push("/course");
            }
        } catch (err) {
            // Error handled by thunk
        }
    };

    return (
        <AuthContainer
            mode="signup"
            onGoogleAuth={handleGoogleSignUp}
            onEmailAuth={handleEmailSignUp}
            isLoading={isLoading}
        />
    );
};

export default SignUpPage;
