"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RoleToggle } from "./role-toggle";
import { EmailPasswordForm } from "./email-password-form";
import AuroraBackground from "./aurora-background";
import type { UserRole } from "@/types/auth";

interface AuthContainerProps {
    mode: "signin" | "signup";
    onGoogleAuth: (role: UserRole) => void;
    onEmailAuth: (data: { email: string; password: string; name?: string }, role: UserRole) => void;
    isLoading?: boolean;
}

export function AuthContainer({
    mode,
    onGoogleAuth,
    onEmailAuth,
    isLoading = false,
}: AuthContainerProps) {
    const router = useRouter();
    const [role, setRole] = React.useState<UserRole>("student");

    const handleEmailSubmit = (data: { email: string; password: string; name?: string }) => {
        onEmailAuth(data, role);
    };

    const handleGoogleClick = () => {
        onGoogleAuth(role);
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4 relative overflow-hidden">
            <AuroraBackground variant="chat" className="fixed inset-0 -z-10 pointer-events-none" />
            
            <div className="w-full max-w-md space-y-6 relative z-0">
                {/* Role Toggle */}
                <div className="space-y-2">
                    <p className="text-sm text-muted-foreground text-center">
                        Continue as
                    </p>
                    <RoleToggle value={role} onValueChange={setRole} disabled={isLoading} />
                </div>

                {/* Auth Card */}
                <div className="space-y-6 rounded-lg border-none bg-card p-6 shadow-sm">
                    <div className="space-y-2 text-center">
                        <h1 className="text-2xl font-semibold">
                            {mode === "signup" ? "Create Account" : "Sign In"}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {mode === "signup"
                                ? "Enter your details to get started"
                                : "Welcome back! Enter your credentials"}
                        </p>
                    </div>

                    {/* Email Form */}
                    <EmailPasswordForm
                        onSubmit={handleEmailSubmit}
                        isLoading={isLoading}
                        showNameField={mode === "signup"}
                    />

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">Or</span>
                        </div>
                    </div>

                    {/* Google Auth */}
                    <Button
                        onClick={handleGoogleClick}
                        variant="outline"
                        className="w-full"
                        disabled={isLoading}
                    >
                        <Chrome className="mr-2 h-4 w-4" />
                        Continue with Google
                    </Button>

                    {/* Switch Mode */}
                    <div className="text-center text-sm text-muted-foreground">
                        {mode === "signin" ? (
                            <>
                                Don't have an account?{" "}
                                <button
                                    onClick={() => router.push("/auth/signup")}
                                    className="text-primary hover:underline font-medium"
                                >
                                    Sign up
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <button
                                    onClick={() => router.push("/auth/signin")}
                                    className="text-primary hover:underline font-medium"
                                >
                                    Sign in
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
