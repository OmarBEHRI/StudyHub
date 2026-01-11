import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className="h-[100vh] w-full flex flex-col items-center justify-center bg-white relative overflow-hidden">
            {/* Detailed Hero Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-100/40 via-white to-white z-0 pointer-events-none"></div>

            {/* Blobs/Shapes for Visual Interest */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-100/50 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-orange-100/40 rounded-full blur-3xl -z-10"></div>

            {/* Main Content */}
            <div className="z-10 text-center space-y-8 px-4">
                <div className="space-y-4">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-500 animate-in fade-in zoom-in duration-700">
                        StudyHub
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                        All MCQ exams for ENSIAS 3A GL, in one place.
                    </p>
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                    <Button
                        asChild
                        size="lg"
                        className="text-lg px-10 py-7 rounded-full shadow-orange-200/50 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 border-0"
                    >
                        <Link href="/courses">Start Learning</Link>
                    </Button>
                </div>
            </div>

            {/* Footer Text */}
            <div className="absolute bottom-8 text-center text-sm text-gray-400">
                <p>© {new Date().getFullYear()} StudyHub. All rights reserved.</p>
            </div>
        </div>
    );
}