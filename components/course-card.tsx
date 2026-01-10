import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Course } from "@/lib/types";
import { IconArrowRight, IconBook } from "@tabler/icons-react";

interface CourseCardProps {
    course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
    return (
        <Card className="flex flex-col h-full hover:border-primary/50 transition-all duration-300 hover:shadow-xl shadow-md group border-border/50 bg-card">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <IconBook size={24} />
                    </div>
                    {course.questionCount !== undefined && (
                        <span className="text-xs font-medium text-muted-foreground bg-secondary/50 px-2 py-1 rounded-full">
                            {course.questionCount} Questions
                        </span>
                    )}
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                {/* Content spacer if needed, currently empty but flex-grow pushes footer down */}
            </CardContent>
            <CardFooter className="mt-auto">
                <Link href={`/courses/${course.id}`} className="w-full">
                    <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-sm">
                        Start Quiz
                        <IconArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
