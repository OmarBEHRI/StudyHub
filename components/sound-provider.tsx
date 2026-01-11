"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

interface SoundContextType {
    isMuted: boolean;
    toggleMute: () => void;
    playSound: (soundType: "correct" | "wrong") => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
    const [isMuted, setIsMuted] = useState(false);

    // Load mute state from localStorage on mount
    useEffect(() => {
        const savedMute = localStorage.getItem("isMuted");
        if (savedMute !== null) {
            setIsMuted(JSON.parse(savedMute));
        }
    }, []);

    const toggleMute = useCallback(() => {
        setIsMuted((prev) => {
            const newState = !prev;
            localStorage.setItem("isMuted", JSON.stringify(newState));
            return newState;
        });
    }, []);

    const playSound = useCallback((soundType: "correct" | "wrong") => {
        if (isMuted) return;

        const soundPath = soundType === "correct" ? "/sounds/correct-sound.mp3" : "/sounds/wrong-sound.mp3";
        const audio = new Audio(soundPath);
        audio.play().catch(err => console.error("Error playing sound:", err));
    }, [isMuted]);

    return (
        <SoundContext.Provider value={{ isMuted, toggleMute, playSound }}>
            {children}
        </SoundContext.Provider>
    );
}

export function useSound() {
    const context = useContext(SoundContext);
    if (context === undefined) {
        throw new Error("useSound must be used within a SoundProvider");
    }
    return context;
}
