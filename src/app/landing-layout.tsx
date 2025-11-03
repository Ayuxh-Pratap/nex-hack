"use client";

// Landing layout wrapper - just wraps content, doesn't render html/body
// The root layout handles html/body tags
export default function LandingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
