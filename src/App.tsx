import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { ProgressProvider } from './context/ProgressContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { LessonsPage } from './pages/LessonsPage';
import { SimulationPage } from './pages/SimulationPage';
import { QuizPage } from './pages/QuizPage';
import { ResultPage } from './pages/ResultPage';
import { AboutPage } from './pages/AboutPage';

export function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [activeLessonId, setActiveLessonId] = useState<string | undefined>(undefined);

  const handleNavigate = (page: PageId, lessonId?: string) => {
    setCurrentPage(page);
    if (lessonId) {
      setActiveLessonId(lessonId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* 3-Zone Clean Header with Dark/Light Toggle */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} />
        )}
        {currentPage === 'lessons' && (
          <LessonsPage
            initialLessonId={activeLessonId}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'simulation' && (
          <SimulationPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'quiz' && (
          <QuizPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'result' && (
          <ResultPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Clean Institutional Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <AppContent />
      </ProgressProvider>
    </ThemeProvider>
  );
}
