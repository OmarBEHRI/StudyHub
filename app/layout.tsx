import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { SoundProvider } from "@/components/sound-provider";
import { MuteToggle } from "@/components/mute-toggle";
import { QuizSettingsProvider } from "@/components/quiz-settings-provider";
import { RandomizeToggle } from "@/components/randomize-toggle";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "StudyHub",
  description: "Interactive learning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <SoundProvider>
          <QuizSettingsProvider>
            {children}
            <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
              <MuteToggle />
              <RandomizeToggle />
            </div>
          </QuizSettingsProvider>
        </SoundProvider>
        <Analytics />
      </body>
    </html>
  );
}
