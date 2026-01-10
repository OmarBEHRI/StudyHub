import { getAllCourses } from "@/lib/courses";
import { CourseList } from "@/components/course-list";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

export default function CoursesPage() {
    const courses = getAllCourses();

    return (
        <div className="min-h-screen bg-zinc-50/50 dark:bg-black">
            {/* Header / Hero Section */}
            <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                <main className="container mx-auto px-6 py-8 md:py-10">
                    <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group">
                        <IconArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>

                    <div className="max-w-3xl">
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
                            Explore Courses
                        </h1>
                        <p className="text-s text-muted-foreground leading-relaxed">
                            Master your subjects with our comprehensive collection of multiple-choice questions.
                            Select a course below to start practicing and testing your knowledge.
                        </p>
                    </div>
                </main>
            </div>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8">
                <CourseList initialCourses={courses} />
            </main>
        </div>
    );
}
