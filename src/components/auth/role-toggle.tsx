"use client";

import * as React from "react";
import { cn } from "@/utils";
import type { UserRole } from "@/types/auth";

interface RoleToggleProps {
    value: UserRole;
    onValueChange: (role: UserRole) => void;
    disabled?: boolean;
}

export function RoleToggle({ value, onValueChange, disabled }: RoleToggleProps) {
    return (
        <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-1">
            <button
                type="button"
                onClick={() => onValueChange("student")}
                disabled={disabled}
                className={cn(
                    "flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all",
                    "hover:bg-background/50",
                    value === "student"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground",
                    disabled && "opacity-50 cursor-not-allowed"
                )}
            >
                Student
            </button>
            <button
                type="button"
                onClick={() => onValueChange("teacher")}
                disabled={disabled}
                className={cn(
                    "flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all",
                    "hover:bg-background/50",
                    value === "teacher"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground",
                    disabled && "opacity-50 cursor-not-allowed"
                )}
            >
                Teacher
            </button>
        </div>
    );
}

