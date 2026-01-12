"use client";

import { useSound } from "./sound-provider";
import { IconVolume, IconVolumeOff } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function MuteToggle() {
    const { isMuted, toggleMute } = useSound();

    return (
        <button
            onClick={toggleMute}
            className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all",
                isMuted && "text-red-500 border-red-200 shadow-sm shadow-red-100"
            )}
            title={isMuted ? "Unmute" : "Mute"}
        >
            {isMuted ? <IconVolumeOff size={20} /> : <IconVolume size={20} />}
        </button>
    );
}
