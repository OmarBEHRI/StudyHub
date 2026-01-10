"use client";

import { useState } from "react";
import { Course } from "@/lib/types";
import { CourseCard } from "@/components/course-card";
import { Input } from "@/components/ui/input";
import { IconSearch } from "@tabler/icons-react";

interface CourseListProps {
    initialCourses: Course[];
}

export function CourseList({ initialCourses }: CourseListProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCourses = initialCourses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="max-w-md mx-auto mb-10 relative">
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                    type="text"
                    placeholder="Rechercher un cours..."
                    className="pl-10 h-11 shadow-sm border-primary/20 focus-visible:ring-primary/30"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">Aucun cours trouvé pour "{searchTerm}"</p>
                </div>
            )}
        </div>
    );
}
