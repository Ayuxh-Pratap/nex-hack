"use client";

import Container from "@/components/global/container";
import { capitalizeFirstLetter } from "@/utils";
import { User } from "@/types/auth";

interface Props {
    user: User | null;
    handleSelectPrompt: (prompt: string) => void;
}

const OvaEmptyState = ({ user, handleSelectPrompt }: Props) => {
    return (
        <Container animation="blurIn" className="relative flex flex-col items-center justify-end w-full h-full">
            <div className="flex flex-col items-center justify-center size-full">
                <div className="relative w-full flex flex-col items-center justify-center">
                    <div className="relative flex items-center justify-center">
                        <img src="/icon.gif" className="w-32" alt="Ova" />
                        <div className="absolute bottom-4 bg-orange-500 w-10 h-[2px] blur-sm rounded-full mx-auto"></div>
                    </div>
                    <h2 className="text-2xl font-medium mt-4">
                        Hello {capitalizeFirstLetter(user?.name || "there")}!
                    </h2>
                    <p className="text-muted-foreground text-center">
                        I'm Ova, How can I help you today?
                    </p>
                </div>
            </div>
        </Container>
    );
};

export default OvaEmptyState;

