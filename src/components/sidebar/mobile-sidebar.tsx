"use client";

import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useSidebar } from "@/hooks";
import ChatList from "./chat-list";
import CourseList from "./course-list";
import Icons from "../global/icons";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const MobileSidebar = () => {
    const { isOpen, setIsOpen } = useSidebar();
    const pathname = usePathname();
    const isCourseRoute = pathname?.startsWith('/course');

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size="iconlg"
                    variant="ghost"
                    onClick={() => setIsOpen(!isOpen)}
                    className="transition transform z-[999]"
                >
                    <Icons.panel className="size-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" show={false}>
                <SheetHeader className="sr-only">
                    <SheetTitle>
                        {isCourseRoute ? "Course list" : "Chat history"}
                    </SheetTitle>
                </SheetHeader>
                <SheetClose asChild>
                    <Button
                        size="iconlg"
                        variant="ghost"
                        onClick={() => setIsOpen(!isOpen)}
                        className="transition transform text-muted-foreground mt-2 ml-3"
                    >
                        <Icons.panel className="size-5" />
                    </Button>
                </SheetClose>

                <div className="px-3">
                    {isCourseRoute ? <CourseList /> : <ChatList />}
                </div>
            </SheetContent>
        </Sheet>
    )
};

export default MobileSidebar
