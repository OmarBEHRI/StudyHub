export interface Course {
    id: string;
    title: string;
    description: string;
    questionFile: string;
    color: string;
    questionCount: number;
    professor?: string;
    time?: string;
    mode?: string;
    date?: string;
    room?: string;
}
