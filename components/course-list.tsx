"use client";

import { useState } from "react";
import { Course } from "@/lib/types";
import { CourseCard } from "@/components/course-card";
import { Input } from "@/components/ui/input";
import { IconSearch, IconFileSad } from "@tabler/icons-react";

interface CourseListProps {
    initialCourses: Course[];
}

export function CourseList({ initialCourses }: CourseListProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCourses = initialCourses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="relative max-w-2xl mx-auto mb-6 group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl blur-lg transition-opacity opacity-0 group-hover:opacity-100 -z-10" />
                <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" size={20} />
                <Input
                    type="text"
                    placeholder="Search for a course..."
                    className="pl-12 h-14 w-full shadow-sm border-2 border-transparent bg-white dark:bg-zinc-900 ring-1 ring-zinc-200 dark:ring-zinc-800 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-base rounded-xl"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course, index) => (
                        <div key={course.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-backwards" style={{ animationDelay: `${index * 50}ms` }}>
                            <CourseCard course={course} index={index} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
                    <div className="bg-zinc-100 dark:bg-zinc-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconFileSad size={32} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-1">No courses found</h3>
                    <p className="text-muted-foreground">
                        We couldn't find any courses matching "{searchTerm}".
                    </p>
                    <button
                        onClick={() => setSearchTerm("")}
                        className="mt-4 text-primary font-medium hover:underline text-sm"
                    >
                        Clear search
                    </button>
                </div>
            )}
        </div>
    );
}
