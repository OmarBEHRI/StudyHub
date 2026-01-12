"use client";

import { useQuizSettings } from "./quiz-settings-provider";
import { IconArrowsShuffle } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function RandomizeToggle() {
    const { isRandomized, toggleRandomize } = useQuizSettings();

    return (
        <button
            onClick={toggleRandomize}
            className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all",
                isRandomized && "text-orange-500 border-orange-200 shadow-sm shadow-orange-100"
            )}
            title={isRandomized ? "Disable Randomization" : "Enable Randomization"}
        >
            <IconArrowsShuffle size={20} className={cn(isRandomized && "animate-pulse")} />
        </button>
    );
}
