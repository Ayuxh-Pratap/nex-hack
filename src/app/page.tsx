"use client";

import Container from "@/components/global/container";
import Icons from "@/components/global/icons";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center h-screen">
            <Container animation="fadeUp">
                <div className="flex flex-col items-center max-w-xl px-2 mx-auto sm:px-0">
                    <Icons.icon className="size-12" />
                    <h1 className="mt-6 text-3xl font-medium text-center">Hey Ova</h1>
                    <p className="w-full mt-4 text-center text-muted-foreground text-balance">Hey Ova is your creative companion, effortlessly generating content, diagrams, and images</p>
                    <div className="flex gap-4 mt-6">
                        <button 
                            onClick={() => router.push("/auth/signin")} 
                            className={buttonVariants({ variant: "outline" })}
                        >
                            Sign In
                        </button>
                        <button 
                            onClick={() => router.push("/auth/signup")} 
                            className={buttonVariants({ className: "ml-2" })}
                        >
                            Get Started
                            <ArrowRightIcon className="w-4 h-4 ml-1.5" />
                        </button>
                    </div>
                </div>
            </Container>
        </div>
    )
};

export default LandingPage
