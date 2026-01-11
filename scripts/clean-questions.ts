import * as fs from 'fs';
import * as path from 'path';

interface Question {
  question: string;
  type: string;
  choices: Array<{ choice: string; isCorrect: boolean }>;
}

interface Course {
  id: string;
  title: string;
  file: string;
}

interface CheckResult {
  courseId: string;
  courseTitle: string;
  totalQuestions: number;
  duplicates: Array<{
    question: string;
    indices: number[];
  }>;
  singleChoiceQuestions: Array<{
    index: number;
    question: string;
  }>;
}

function normalizeQuestion(question: string): string {
  return question.trim().replace(/\s+/g, ' ');
}

function checkCourseQuestions(course: Course, dataDir: string): CheckResult {
  const filePath = path.join(dataDir, course.file);
  
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return {
      courseId: course.id,
      courseTitle: course.title,
      totalQuestions: 0,
      duplicates: [],
      singleChoiceQuestions: []
    };
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const questions: Question[] = JSON.parse(fileContent);

  // Check for duplicates
  const questionMap = new Map<string, number[]>();
  questions.forEach((q, index) => {
    const normalized = normalizeQuestion(q.question);
    if (!questionMap.has(normalized)) {
      questionMap.set(normalized, []);
    }
    questionMap.get(normalized)!.push(index);
  });

  const duplicates: Array<{ question: string; indices: number[] }> = [];
  questionMap.forEach((indices, question) => {
    if (indices.length > 1) {
      duplicates.push({ question, indices });
    }
  });

  // Check for single choice questions
  const singleChoiceQuestions: Array<{ index: number; question: string }> = [];
  questions.forEach((q, index) => {
    if (q.choices.length === 1) {
      singleChoiceQuestions.push({
        index,
        question: q.question
      });
    }
  });

  return {
    courseId: course.id,
    courseTitle: course.title,
    totalQuestions: questions.length,
    duplicates,
    singleChoiceQuestions
  };
}

function removeDuplicatesAndSingleChoices(
  course: Course,
  dataDir: string,
  results: CheckResult
): { removed: number; remaining: number } {
  const filePath = path.join(dataDir, course.file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const questions: Question[] = JSON.parse(fileContent);

  // Create set of indices to remove
  const indicesToRemove = new Set<number>();

  // Add duplicate indices (keep first occurrence)
  results.duplicates.forEach(dup => {
    // Keep the first index, remove the rest
    for (let i = 1; i < dup.indices.length; i++) {
      indicesToRemove.add(dup.indices[i]);
    }
  });

  // Add single choice question indices
  results.singleChoiceQuestions.forEach(sq => {
    indicesToRemove.add(sq.index);
  });

  // Filter out questions to remove
  const cleanedQuestions = questions.filter((_, index) => !indicesToRemove.has(index));

  // Write back to file
  fs.writeFileSync(filePath, JSON.stringify(cleanedQuestions, null, 2), 'utf-8');
  
  return {
    removed: indicesToRemove.size,
    remaining: cleanedQuestions.length
  };
}

async function main() {
  const coursesPath = path.join(process.cwd(), 'public', 'data', 'courses.json');
  const dataDir = path.join(process.cwd(), 'public', 'data');

  if (!fs.existsSync(coursesPath)) {
    console.error(`Courses file not found: ${coursesPath}`);
    process.exit(1);
  }

  const courses: Course[] = JSON.parse(fs.readFileSync(coursesPath, 'utf-8'));
  const results: CheckResult[] = [];

  // Check all courses first
  console.log('Checking courses...\n');
  for (const course of courses) {
    const result = checkCourseQuestions(course, dataDir);
    results.push(result);
  }

  // Check if there are any issues
  const hasDuplicates = results.some(r => r.duplicates.length > 0);
  const hasSingleChoices = results.some(r => r.singleChoiceQuestions.length > 0);

  if (!hasDuplicates && !hasSingleChoices) {
    console.log('✅ No issues found! All questions are valid.\n');
    return;
  }

  // Remove issues
  console.log('\n' + '='.repeat(80));
  console.log('CLEANING QUESTIONS');
  console.log('='.repeat(80) + '\n');

  let totalRemoved = 0;
  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];
    const result = results[i];
    
    const { removed, remaining } = removeDuplicatesAndSingleChoices(course, dataDir, result);
    if (removed > 0) {
      console.log(`✅ ${course.title}:`);
      console.log(`   Removed: ${removed} questions`);
      console.log(`   Remaining: ${remaining} questions\n`);
      totalRemoved += removed;
    }
  }

  console.log('='.repeat(80));
  console.log(`✅ Cleaning complete! Total questions removed: ${totalRemoved}`);
  console.log('='.repeat(80) + '\n');
}

main().catch(console.error);

