import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress } from '../types';
import { SCENARIO_CASES } from '../data/scenarioData';

interface ProgressContextType {
  progress: UserProgress;
  setStudentName: (name: string) => void;
  completeLesson: (lessonId: string) => void;
  toggleBookmark: (lessonId: string) => void;
  recordQuizAnswer: (questionId: number, optionIndex: number) => void;
  finalizeQuiz: (scoreOutOf10: number) => void;
  recordScenarioAnswer: (caseId: string, optionId: string, scoreDelta: number) => void;
  discoverClue: (clueId: string) => void;
  resetAllProgress: () => void;
  totalScore: number;
  readinessPercentage: number;
  completedLessonsCount: number;
  quizScoreOutOf10: number;
  scenariosPassedCount: number;
  overallProgressPercent: number;
}

const STORAGE_KEY = 'media_smart_user_progress_v2';

const initialProgress: UserProgress = {
  studentName: '',
  completedLessons: [],
  quizAnswers: {},
  quizCompleted: false,
  quizScore: 0,
  simulationCompleted: false,
  simulationScore: 0,
  simulationAnswers: {},
  cluesDiscovered: [],
  bookmarkedLessons: [],
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...initialProgress, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
    return initialProgress;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  const setStudentName = (name: string) => {
    setProgress((prev) => ({ ...prev, studentName: name }));
  };

  const completeLesson = (lessonId: string) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      };
    });
  };

  const toggleBookmark = (lessonId: string) => {
    setProgress((prev) => {
      const exists = prev.bookmarkedLessons.includes(lessonId);
      return {
        ...prev,
        bookmarkedLessons: exists
          ? prev.bookmarkedLessons.filter((id) => id !== lessonId)
          : [...prev.bookmarkedLessons, lessonId],
      };
    });
  };

  const recordQuizAnswer = (questionId: number, optionIndex: number) => {
    setProgress((prev) => ({
      ...prev,
      quizAnswers: { ...prev.quizAnswers, [questionId]: optionIndex },
    }));
  };

  const finalizeQuiz = (scoreOutOf10: number) => {
    setProgress((prev) => ({
      ...prev,
      quizCompleted: true,
      quizScore: scoreOutOf10,
      certifiedAt: prev.certifiedAt || new Date().toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    }));
  };

  const recordScenarioAnswer = (caseId: string, optionId: string, scoreDelta: number) => {
    setProgress((prev) => {
      const updatedAnswers = { ...prev.simulationAnswers, [caseId]: optionId };
      const allCasesDone = Object.keys(updatedAnswers).length >= SCENARIO_CASES.length;
      const newScore = Math.max(0, prev.simulationScore + scoreDelta);
      return {
        ...prev,
        simulationAnswers: updatedAnswers,
        simulationScore: newScore,
        simulationCompleted: allCasesDone,
      };
    });
  };

  const discoverClue = (clueId: string) => {
    setProgress((prev) => {
      if (prev.cluesDiscovered.includes(clueId)) return prev;
      return {
        ...prev,
        cluesDiscovered: [...prev.cluesDiscovered, clueId],
      };
    });
  };

  const resetAllProgress = () => {
    setProgress(initialProgress);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  // Exact metrics as requested
  const completedLessonsCount = Math.min(4, progress.completedLessons.length);
  const quizScoreOutOf10 = Math.min(10, Math.max(0, progress.quizScore));

  const scenariosPassedCount = SCENARIO_CASES.filter((c) => {
    const ansId = progress.simulationAnswers[c.id];
    if (!ansId) return false;
    const opt = c.options.find((o) => o.id === ansId);
    return opt ? opt.isCorrect : false;
  }).length;

  // Composite overall progress (Lessons 30%, Quiz 35%, Scenarios 35%)
  const lessonPart = (completedLessonsCount / 4) * 30;
  const quizPart = (quizScoreOutOf10 / 10) * 35;
  const scenarioPart = (scenariosPassedCount / 5) * 35;
  const overallProgressPercent = Math.min(100, Math.round(lessonPart + quizPart + scenarioPart));

  const totalScore = (quizScoreOutOf10 * 10) + (scenariosPassedCount * 10);
  const readinessPercentage = overallProgressPercent;

  return (
    <ProgressContext.Provider
      value={{
        progress,
        setStudentName,
        completeLesson,
        toggleBookmark,
        recordQuizAnswer,
        finalizeQuiz,
        recordScenarioAnswer,
        discoverClue,
        resetAllProgress,
        totalScore,
        readinessPercentage,
        completedLessonsCount,
        quizScoreOutOf10,
        scenariosPassedCount,
        overallProgressPercent,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
