"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const emailPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    name: z.string().optional(),
});

type EmailPasswordFormValues = z.infer<typeof emailPasswordSchema>;

interface EmailPasswordFormProps {
    onSubmit: (data: { email: string; password: string; name?: string }) => void;
    isLoading?: boolean;
    showNameField?: boolean;
}

export function EmailPasswordForm({
    onSubmit,
    isLoading = false,
    showNameField = false,
}: EmailPasswordFormProps) {
    const [showPassword, setShowPassword] = React.useState(false);

    const form = useForm<EmailPasswordFormValues>({
        resolver: zodResolver(emailPasswordSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        },
    });

    const handleSubmit = (data: EmailPasswordFormValues) => {
        onSubmit({
            email: data.email,
            password: data.password,
            name: data.name || undefined,
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    {showNameField && (
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="John Doe"
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="email"
                                    placeholder="you@example.com"
                                    disabled={isLoading}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        {...field}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="pr-9"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                        disabled={isLoading}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Processing..." : showNameField ? "Create Account" : "Sign In"}
                </Button>
            </form>
        </Form>
    );
}

