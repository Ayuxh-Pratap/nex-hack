"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { signInWithGoogle } from "@/store/slices/auth/authThunks";
import { toast } from "sonner";

const SignInPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user, isLoading, error } = useAppSelector((state) => state.auth);

    // Redirect if already authenticated
    useEffect(() => {
        if (user) {
            router.push("/chat");
        }
    }, [user, router]);

    // Show error toast
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const handleGoogleSignIn = async () => {
        try {
            const result = await dispatch(signInWithGoogle()).unwrap();
            if (result) {
                toast.success("Signed in successfully!");
                router.push("/chat");
            }
        } catch (err) {
            // Error handled by thunk
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center max-w-md px-4 mx-auto">
                <h1 className="text-3xl font-bold mb-8">Sign In</h1>
                <div className="w-full space-y-4">
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                        className={buttonVariants({ className: "w-full" })}
                    >
                        {isLoading ? "Signing in..." : "Sign in with Google"}
                    </button>
                    <button
                        onClick={() => router.push("/")}
                        className={buttonVariants({ variant: "outline", className: "w-full" })}
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
