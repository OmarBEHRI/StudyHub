"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

interface QuizSettingsContextType {
    isRandomized: boolean;
    toggleRandomize: () => void;
}

const QuizSettingsContext = createContext<QuizSettingsContextType | undefined>(undefined);

export function QuizSettingsProvider({ children }: { children: React.ReactNode }) {
    const [isRandomized, setIsRandomized] = useState(false);

    // Load randomization state from localStorage on mount
    useEffect(() => {
        const savedRandom = localStorage.getItem("isRandomized");
        if (savedRandom !== null) {
            setIsRandomized(JSON.parse(savedRandom));
        }
    }, []);

    const toggleRandomize = useCallback(() => {
        setIsRandomized((prev) => {
            const newState = !prev;
            localStorage.setItem("isRandomized", JSON.stringify(newState));
            return newState;
        });
    }, []);

    return (
        <QuizSettingsContext.Provider value={{ isRandomized, toggleRandomize }}>
            {children}
        </QuizSettingsContext.Provider>
    );
}

export function useQuizSettings() {
    const context = useContext(QuizSettingsContext);
    if (context === undefined) {
        throw new Error("useQuizSettings must be used within a QuizSettingsProvider");
    }
    return context;
}
