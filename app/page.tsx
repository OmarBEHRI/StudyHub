import { getAllCourses } from "@/lib/courses";
import { CourseList } from "@/components/course-list";

export default function Home() {
    const courses = getAllCourses();

    return (
        <div className="min-h-screen bg-white">
            <section className="py-20 px-6 text-center bg-gradient-to-b from-white to-gray-50/50">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-500">
                    StudyHub
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Master your subjects with our interactive quiz platform. Select a course below to begin.
                </p>
            </section>

            <main className="container mx-auto px-6 py-10">
                <CourseList initialCourses={courses} />
            </main>
        </div>
    );
}