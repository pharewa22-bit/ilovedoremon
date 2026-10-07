export type PageId = 'home' | 'lessons' | 'simulation' | 'quiz' | 'result' | 'about';

export interface LessonSection {
  id: string;
  title: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
  caseStudy?: {
    title: string;
    description: string;
    realTruth: string;
    lessonLearned: string;
  };
  checklist?: string[];
}

export interface Lesson {
  id: string;
  number: string;
  title: string;
  titleEn: string;
  subtitle: string;
  readTime: string;
  image?: string;
  overview: string;
  sections: LessonSection[];
  flashcards: {
    question: string;
    answer: string;
  }[];
}

export interface QuizQuestion {
  id: number;
  category: string;
  categoryLabel: string;
  question: string;
  scenarioContext?: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  proTip?: string;
}

export interface ForensicClue {
  id: string;
  label: string;
  detail: string;
  coordinate?: { x: number; y: number }; // percentage position for inspection
}

export interface ScenarioCase {
  id: string;
  platform: 'line' | 'facebook' | 'tiktok' | 'x' | 'instagram' | 'messenger';
  platformName: string;
  category: string;
  scenarioTitle: string;
  situationText: string;
  authorName: string;
  authorHandle: string;
  authorAvatarText: string;
  timestamp: string;
  postText: string;
  postImageDesc: string;
  isSponsored?: boolean;
  sharesCount: string;
  likesCount: string;
  promptQuestion: string; // e.g. "คุณควรทำอย่างไร?"
  clues: ForensicClue[];
  options: {
    id: string;
    letter: string; // 'A' | 'B' | 'C' | 'D'
    text: string;
    isCorrect: boolean;
    explanation: string;
    verdict: 'correct' | 'risky' | 'dangerous';
    score: number;
    consequence: string;
  }[];
  correctOptionLetter: string;
  truthAnalysis: {
    headline: string;
    reality: string;
    howToCheck: string;
    redFlags: string[];
  };
}

export interface UserProgress {
  studentName: string;
  completedLessons: string[];
  quizAnswers: Record<number, number>; // questionId -> selectedOptionIndex
  quizCompleted: boolean;
  quizScore: number;
  simulationCompleted: boolean;
  simulationScore: number;
  simulationAnswers: Record<string, string>; // caseId -> optionId
  cluesDiscovered: string[];
  bookmarkedLessons: string[];
  certifiedAt?: string;
}
