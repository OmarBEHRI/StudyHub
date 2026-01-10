import { getAllCourses } from "@/lib/courses";
import { QuizGame } from "@/components/quiz-game";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

interface PageProps {
    params: Promise<{
        courseId: string;
    }>;
}

export default async function CoursePage({ params }: PageProps) {
    const { courseId } = await params;
    const course = getAllCourses().find((c) => c.id === courseId);

    if (!course) {
        notFound();
    }

    // Read the questions file
    const filePath = path.join(process.cwd(), "public", course.questionFile);
    let questions = [];

    try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const allQuestions = JSON.parse(fileContent);
        // Fisher-Yates shuffle
        questions = [...allQuestions];
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }
    } catch (error) {
        console.error("Error reading questions file:", error);
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
                <h1 className="text-2xl font-bold text-destructive mb-2">Erreur</h1>
                <p className="text-muted-foreground mb-4">Impossible de charger les questions pour ce cours.</p>
                <Button asChild variant="outline">
                    <Link href="/">Retour à l'accueil</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />

            <header className="p-6">
                <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
                    <IconArrowLeft size={20} className="mr-2" />
                    Retour aux cours
                </Link>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-6 w-full">
                <QuizGame questions={questions} courseTitle={course.title} />
            </main>
        </div>
    );
}
