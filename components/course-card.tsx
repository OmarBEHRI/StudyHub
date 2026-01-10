import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Course } from "@/lib/types";
import { IconArrowRight, IconBook, IconCalendar, IconUser, IconSchool } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface CourseCardProps {
    course: Course;
    index?: number;
}

const gradients = [
    { bg: "from-blue-600 to-cyan-500", text: "text-blue-600", light: "bg-blue-50 text-blue-700" },
    { bg: "from-violet-600 to-purple-500", text: "text-violet-600", light: "bg-violet-50 text-violet-700" },
    { bg: "from-emerald-600 to-teal-500", text: "text-emerald-600", light: "bg-emerald-50 text-emerald-700" },
    { bg: "from-amber-500 to-orange-400", text: "text-amber-600", light: "bg-amber-50 text-amber-700" },
    { bg: "from-rose-600 to-pink-500", text: "text-rose-600", light: "bg-rose-50 text-rose-700" },
    { bg: "from-indigo-600 to-blue-500", text: "text-indigo-600", light: "bg-indigo-50 text-indigo-700" },
];

export function CourseCard({ course, index = 0 }: CourseCardProps) {
    // Deterministic gradient based on string char code sum
    const getGradient = (str: string) => {
        const sum = str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return gradients[sum % gradients.length];
    };

    const theme = getGradient(course.id);

    return (
        <Link href={`/courses/${course.id}`} className="block h-full group">
            <Card className="flex flex-col h-full border-border/60 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 relative overflow-hidden">
                {/* Top gradient line */}
                <div className={cn("absolute top-0 left-0 w-full h-1 bg-gradient-to-r opacity-80", theme.bg)} />

                <CardHeader className="pt-5 pb-2">
                    <div className="flex justify-between items-start gap-2">
                        <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {course.title}
                        </CardTitle>
                        {course.questionCount !== undefined && (
                            <span className="shrink-0 text-[10px] font-bold tracking-wider uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700 mt-1">
                                {course.questionCount} Qs
                            </span>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="flex-grow pt-1 pb-2">
                    <div className="space-y-2">

                        <div className="space-y-1">
                            {course.professor && (
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <IconUser size={14} className="text-zinc-400" />
                                    <span>{course.professor}</span>
                                </div>
                            )}
                            {(course.date || course.time) && (
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <IconCalendar size={14} className="text-zinc-400" />
                                    <span>{course.date} {course.time && <span className="">• {course.time}</span>}</span>
                                </div>
                            )}
                            {(course.mode || course.room) && (
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <IconSchool size={14} className="text-zinc-400" />
                                    <span>{course.mode} {course.room && <span>({course.room})</span>}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="pt-2 pb-4 text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors flex items-center">
                    <span>Start Practice</span>
                    <IconArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100" />
                </CardFooter>
            </Card>
        </Link>
    );
}
