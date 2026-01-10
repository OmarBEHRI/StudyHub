import fs from "fs";
import path from "path";
import { Course } from "@/lib/types";

export function getAllCourses(): Course[] {
    try {
        const filePath = path.join(process.cwd(), "public", "data", "courses.json");
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const rawCourses = JSON.parse(fileContent);
        return rawCourses.map((c: any) => {
            const questionFilePath = path.join(process.cwd(), "public", "data", c.file);
            let count = 0;
            try {
                const qContent = fs.readFileSync(questionFilePath, "utf-8");
                const qJson = JSON.parse(qContent);
                count = Array.isArray(qJson) ? qJson.length : 0;
            } catch (e) {
                console.error(`Error counting questions for ${c.id}:`, e);
            }

            return {
                id: c.id,
                title: c.title,
                description: c.title, // Using title as description for now
                questionFile: "/data/" + c.file,
                color: "bg-primary/10 text-primary border-primary/20", // Default color
                questionCount: count,
            };
        });
    } catch (error) {
        console.error("Error reading courses file:", error);
        return [];
    }
}

export const courses: Course[] = []; // Deprecated, keep for type safety if needed temporarily

