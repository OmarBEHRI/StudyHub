"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { IconCheck, IconX, IconRefresh, IconArrowRight, IconBulb } from "@tabler/icons-react";
import { useSound } from "./sound-provider";
import { cn } from "@/lib/utils";

interface Choice {
    choice: string;
    isCorrect: boolean;
}

interface Question {
    question: string;
    type: "single" | "multiple";
    choices: Choice[];
}

interface QuizGameProps {
    questions: Question[];
    courseTitle: string;
}

export function QuizGame({ questions, courseTitle }: QuizGameProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [hasValidated, setHasValidated] = useState(false);
    const { playSound } = useSound();

    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex) / questions.length) * 100;

    const handleOptionClick = (index: number) => {
        if (hasValidated) return; // Prevent changing answer after validation

        if (currentQuestion.type === "single") {
            setSelectedIndices([index]);
        } else {
            setSelectedIndices(prev => {
                if (prev.includes(index)) {
                    return prev.filter(i => i !== index);
                } else {
                    return [...prev, index];
                }
            });
        }
    };

    const handleValidate = () => {
        setHasValidated(true);

        // Calculate score for this question
        const correctIndices = currentQuestion.choices
            .map((c, i) => c.isCorrect ? i : null)
            .filter((i): i is number => i !== null);

        const isCorrect =
            selectedIndices.length === correctIndices.length &&
            selectedIndices.every(val => correctIndices.includes(val));

        if (isCorrect) {
            setScore(prev => prev + 1);
            playSound("correct");
        } else {
            playSound("wrong");
        }
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedIndices([]);
            setHasValidated(false);
        } else {
            setIsFinished(true);
        }
    };

    const restart = () => {
        setCurrentIndex(0);
        setSelectedIndices([]);
        setScore(0);
        setIsFinished(false);
        setHasValidated(false);
    };

    if (isFinished) {
        const percentage = Math.round((score / questions.length) * 100);
        let message = "";
        if (percentage === 100) message = "Parfait ! Vous maîtrisez le sujet.";
        else if (percentage >= 80) message = "Excellent travail !";
        else if (percentage >= 50) message = "Pas mal, mais vous pouvez faire mieux.";
        else message = "Continuez à réviser !";

        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] animate-in fade-in zoom-in duration-500">
                <Card className="w-full max-w-2xl text-center p-8 border-primary/20 shadow-2xl bg-card/50 backdrop-blur">
                    <div className="mb-6 flex justify-center">
                        <div className="relative flex items-center justify-center w-32 h-32 rounded-full border-4 border-primary bg-primary/5">
                            <span className="text-4xl font-bold text-primary">{score}</span>
                            <span className="absolute -bottom-2 text-xs font-medium uppercase tracking-wider bg-background px-2 text-muted-foreground">sur {questions.length}</span>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-500">
                        Test Terminé
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8">{message}</p>
                    <div className="flex justify-center gap-4">
                        <Button size="lg" onClick={restart} className="gap-2">
                            <IconRefresh size={20} />
                            Recommencer
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                            <a href="/">Choisir un autre cours</a>
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto w-full">
            <div className="mb-8">
                <div className="flex justify-between items-end mb-2">
                    <h1 className="text-2xl font-bold text-foreground">{courseTitle}</h1>
                    <span className="text-muted-foreground font-mono">
                        {currentIndex + 1} / {questions.length}
                    </span>
                </div>
                <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <Card className="border-border shadow-lg animate-in slide-in-from-bottom-4 duration-500">
                <CardHeader>
                    <div className="flex justify-between items-start gap-4">
                        <h2 className="text-xl font-medium leading-relaxed">
                            {currentQuestion.question}
                        </h2>
                        {hasValidated && (
                            <div className="flex-shrink-0">
                                {(() => {
                                    const correctIndices = currentQuestion.choices
                                        .map((c, i) => c.isCorrect ? i : null)
                                        .filter((i): i is number => i !== null);
                                    const isCorrect =
                                        selectedIndices.length === correctIndices.length &&
                                        selectedIndices.every(val => correctIndices.includes(val));

                                    return isCorrect ? (
                                        <div className="flex items-center gap-1 text-green-500 bg-green-500/10 px-3 py-1 rounded-full text-sm font-medium">
                                            <IconCheck size={16} /> Correct
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1 text-red-500 bg-red-500/10 px-3 py-1 rounded-full text-sm font-medium">
                                            <IconX size={16} /> Incorrect
                                        </div>
                                    );
                                })()}
                            </div>
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mt-2 flex items-center gap-2">
                        <IconBulb size={14} />
                        {currentQuestion.type === 'single' ? 'Choix unique' : 'Choix multiple'}
                    </p>
                </CardHeader>
                <CardContent className="space-y-3">
                    {currentQuestion.choices.map((choice, index) => {
                        const isSelected = selectedIndices.includes(index);
                        const isCorrect = choice.isCorrect;

                        let cardClassName = "bg-card hover:bg-secondary/50 border-transparent hover:border-secondary-foreground/10";
                        let indicatorClassName = "border-muted-foreground/30";
                        let textClassName = "text-foreground";

                        if (hasValidated) {
                            if (isCorrect) {
                                // Always highlight correct answers in green
                                cardClassName = "bg-green-500/10 border-green-500/50 shadow-sm";
                                indicatorClassName = "border-green-500 bg-green-500 text-white";
                                textClassName = "font-medium text-green-700 dark:text-green-400";
                            } else if (isSelected) {
                                // Highlight incorrect selected answers in red
                                cardClassName = "bg-red-500/10 border-red-500/50 shadow-sm";
                                indicatorClassName = "border-red-500 bg-red-500 text-white";
                                textClassName = "font-medium text-red-700 dark:text-red-400";
                            } else {
                                // Not selected, not correct -> dim it
                                cardClassName = "opacity-50";
                            }
                        } else if (isSelected) {
                            // Selected before validation
                            cardClassName = "bg-primary/10 border-primary shadow-sm";
                            indicatorClassName = "border-primary bg-primary text-primary-foreground";
                            textClassName = "font-medium text-primary";
                        }

                        return (
                            <div
                                key={index}
                                onClick={() => handleOptionClick(index)}
                                className={cn(
                                    "flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all border",
                                    cardClassName
                                )}
                            >
                                <div className={cn(
                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0",
                                    indicatorClassName
                                )}>
                                    {hasValidated ? (
                                        isCorrect ? <IconCheck size={14} /> : (isSelected ? <IconX size={14} /> : null)
                                    ) : (
                                        isSelected && <div className="w-2 h-2 bg-white rounded-full" />
                                    )}
                                </div>
                                <span className={cn("text-base leading-snug", textClassName)}>
                                    {choice.choice}
                                </span>
                            </div>
                        );
                    })}
                </CardContent>
                <CardFooter className="justify-end pt-6">
                    {!hasValidated ? (
                        <Button
                            onClick={handleValidate}
                            disabled={selectedIndices.length === 0}
                            size="lg"
                            className="w-full sm:w-auto gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Valider
                            <IconCheck size={18} />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleNext}
                            size="lg"
                            className="w-full sm:w-auto gap-2 animate-in fade-in zoom-in duration-300"
                        >
                            Continuer
                            <IconArrowRight size={18} />
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
