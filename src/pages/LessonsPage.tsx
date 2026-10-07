import React, { useState, useEffect } from 'react';
import { PageId, Lesson } from '../types';
import { LESSONS } from '../data/lessonsData';
import { useProgress } from '../context/ProgressContext';
import {
  Globe,
  FileQuestion,
  Sparkles,
  Share2,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Clock,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  AlertTriangle,
  RotateCcw,
  Check,
  BookOpen
} from 'lucide-react';

interface LessonsPageProps {
  initialLessonId?: string;
  onNavigate: (page: PageId) => void;
}

// Visual theme configurations for the 4 lessons
const LESSON_THEMES: Record<string, {
  icon: React.ElementType;
  badgeBg: string;
  badgeText: string;
  cardBorder: string;
  iconBg: string;
  heroGradient: string;
}> = {
  'digital-media': {
    icon: Globe,
    badgeBg: 'bg-teal-50 dark:bg-teal-950/60',
    badgeText: 'text-teal-700 dark:text-teal-300',
    cardBorder: 'hover:border-teal-400 dark:hover:border-teal-500',
    iconBg: 'bg-teal-600 text-white',
    heroGradient: 'from-teal-600 via-teal-700 to-slate-900',
  },
  'fake-news': {
    icon: FileQuestion,
    badgeBg: 'bg-rose-50 dark:bg-rose-950/60',
    badgeText: 'text-rose-700 dark:text-rose-300',
    cardBorder: 'hover:border-rose-400 dark:hover:border-rose-500',
    iconBg: 'bg-rose-600 text-white',
    heroGradient: 'from-rose-600 via-rose-700 to-slate-900',
  },
  'ai-media': {
    icon: Sparkles,
    badgeBg: 'bg-purple-50 dark:bg-purple-950/60',
    badgeText: 'text-purple-700 dark:text-purple-300',
    cardBorder: 'hover:border-purple-400 dark:hover:border-purple-500',
    iconBg: 'bg-purple-600 text-white',
    heroGradient: 'from-purple-600 via-indigo-700 to-slate-900',
  },
  'how-to-check': {
    icon: Share2,
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/60',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    cardBorder: 'hover:border-emerald-400 dark:hover:border-emerald-500',
    iconBg: 'bg-emerald-600 text-white',
    heroGradient: 'from-emerald-600 via-teal-700 to-slate-900',
  }
};

export const LessonsPage: React.FC<LessonsPageProps> = ({ initialLessonId, onNavigate }) => {
  const { progress, completeLesson, toggleBookmark } = useProgress();
  
  // Active detail view: if null, show the 4 cards overview; if string, show lesson detail view
  const [activeLessonId, setActiveLessonId] = useState<string | null>(initialLessonId || null);
  const [activeFlashcardIndex, setActiveFlashcardIndex] = useState<number>(0);
  const [revealedFlashcard, setRevealedFlashcard] = useState<boolean>(false);

  useEffect(() => {
    if (initialLessonId) {
      setActiveLessonId(initialLessonId);
    }
  }, [initialLessonId]);

  useEffect(() => {
    setActiveFlashcardIndex(0);
    setRevealedFlashcard(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeLessonId]);

  const currentLesson: Lesson | undefined = LESSONS.find((l) => l.id === activeLessonId);
  const isCurrentCompleted = currentLesson ? progress.completedLessons.includes(currentLesson.id) : false;
  const isCurrentBookmarked = currentLesson ? progress.bookmarkedLessons.includes(currentLesson.id) : false;

  const currentIdx = currentLesson ? LESSONS.findIndex((l) => l.id === currentLesson.id) : -1;
  const prevLesson = currentIdx > 0 ? LESSONS[currentIdx - 1] : null;
  const nextLesson = currentIdx >= 0 && currentIdx < LESSONS.length - 1 ? LESSONS[currentIdx + 1] : null;

  // VIEW 1: Detail View of a specific Lesson
  if (currentLesson) {
    const currentTheme = LESSON_THEMES[currentLesson.id] || LESSON_THEMES['digital-media'];
    const CurrentIcon = currentTheme.icon;

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
        {/* Navigation Breadcrumb & Back button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveLessonId(null)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-teal-700 dark:hover:text-teal-400 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl transition-all shadow-2xs self-start"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>กลับสู่หน้ารวมบทเรียน</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              บทที่ {currentLesson.number} จาก 04
            </span>
            <div className="flex items-center gap-1.5">
              {LESSONS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setActiveLessonId(l.id)}
                  title={l.title}
                  className={`w-3 h-3 rounded-full transition-all ${
                    l.id === currentLesson.id
                      ? 'bg-teal-700 dark:bg-teal-400 scale-125'
                      : progress.completedLessons.includes(l.id)
                      ? 'bg-emerald-500'
                      : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Hero Visual Header for Lesson Detail */}
        <div className={`rounded-3xl p-6 sm:p-10 text-white bg-gradient-to-br ${currentTheme.heroGradient} shadow-md relative overflow-hidden`}>
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-mono font-bold bg-white/20 px-2.5 py-1 rounded-md backdrop-blur-xs">
                บทที่ {currentLesson.number}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md">
                <Clock className="w-3.5 h-3.5" />
                <span>เวลาอ่าน {currentLesson.readTime}</span>
              </span>
              {isCurrentCompleted && (
                <span className="flex items-center gap-1 bg-emerald-400/30 text-emerald-200 px-2.5 py-1 rounded-md font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>เรียนสำเร็จแล้ว</span>
                </span>
              )}
            </div>

            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 shadow-xs hidden sm:flex">
                <CurrentIcon className="w-7 h-7 text-white" />
              </div>
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                  {currentLesson.title}
                </h1>
                <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed">
                  {currentLesson.subtitle}
                </p>
              </div>
            </div>

            {/* Overview Quote */}
            <div className="p-4 rounded-2xl bg-black/20 border border-white/15 text-xs sm:text-sm text-slate-100 leading-relaxed backdrop-blur-xs mt-2">
              <strong className="text-white block mb-1">ภาพรวมของบทเรียน:</strong>
              {currentLesson.overview}
            </div>
          </div>
        </div>

        {/* Content Layout: 8 cols content + 4 cols sticky tools */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Article (8 cols) */}
          <article className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-10">
            {/* Visual Media Showcase if available */}
            {currentLesson.image && (
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900">
                <img
                  src={currentLesson.image}
                  alt={currentLesson.title}
                  className="w-full h-auto object-cover max-h-80"
                  referrerPolicy="no-referrer"
                />
                <div className="p-3 text-center text-xs text-slate-300 bg-slate-900 border-t border-slate-800">
                  สื่อสังเคราะห์ AI: การเปรียบเทียบภาพมนุษย์จริงกับ Deepfake ที่สร้างด้วยแบบจำลองคอมพิวเตอร์
                </div>
              </div>
            )}

            {/* Sections Content */}
            <div className="space-y-10">
              {currentLesson.sections.map((section, sIdx) => (
                <section key={section.id} className="space-y-4 pt-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-teal-100 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                      {sIdx + 1}
                    </span>
                    <span>{section.title.split('. ')[1] || section.title}</span>
                  </h2>

                  {/* Summary Callout */}
                  <div className="p-3.5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800 text-teal-950 dark:text-teal-200 text-xs sm:text-sm font-medium leading-relaxed">
                    💡 {section.summary}
                  </div>

                  {/* Paragraphs */}
                  <div className="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                    {section.content.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {/* Key Takeaways */}
                  {section.keyTakeaways && section.keyTakeaways.length > 0 && (
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 mt-4">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        <span>ข้อควรจำสำคัญ (Key Takeaway)</span>
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 list-disc list-inside">
                        {section.keyTakeaways.map((item, kIdx) => (
                          <li key={kIdx} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Real Case Study */}
                  {section.caseStudy && (
                    <div className="p-6 rounded-3xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200 space-y-3 mt-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                        <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <span>{section.caseStudy.title}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                        {section.caseStudy.description}
                      </p>
                      <div className="text-xs sm:text-sm bg-white/95 dark:bg-slate-900/90 p-4 rounded-2xl border border-amber-200 dark:border-amber-800/80 space-y-2 text-slate-800 dark:text-slate-200">
                        <div>
                          <strong className="text-rose-800 dark:text-rose-400">ความจริงเบื้องหลัง:</strong>{' '}
                          {section.caseStudy.realTruth}
                        </div>
                        <div>
                          <strong className="text-teal-800 dark:text-teal-400">บทเรียนสำหรับนักศึกษา:</strong>{' '}
                          {section.caseStudy.lessonLearned}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Practical Checklist */}
                  {section.checklist && section.checklist.length > 0 && (
                    <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2 mt-4">
                      <div className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>เช็กลิสต์ฝึกปฏิบัติจริง</span>
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        {section.checklist.map((item, cIdx) => (
                          <li key={cIdx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Bottom Actions: Mark complete & Next lesson */}
            <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => completeLesson(currentLesson.id)}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all shadow-xs ${
                  isCurrentCompleted
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                    : 'bg-teal-700 hover:bg-teal-800 text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCurrentCompleted ? 'บันทึกแล้วว่าเรียนจบบทนี้' : 'ทำเครื่องหมายว่าเรียนจบแล้ว'}</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {prevLesson && (
                  <button
                    onClick={() => setActiveLessonId(prevLesson.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>บทก่อนหน้า</span>
                  </button>
                )}

                {nextLesson ? (
                  <button
                    onClick={() => setActiveLessonId(nextLesson.id)}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-slate-900 dark:bg-slate-750 hover:bg-slate-800 rounded-xl transition-colors shadow-xs"
                  >
                    <span>บทถัดไป: {nextLesson.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate('simulation')}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-teal-800 hover:bg-teal-900 rounded-xl transition-colors shadow-xs"
                  >
                    <span>ไปทำห้องสืบสวนคดี</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </article>

          {/* Sidebar / Tools Deck (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Interactive Flashcard Deck */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>บัตรคำทบทวน (Flashcard)</span>
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                  {activeFlashcardIndex + 1}/{currentLesson.flashcards.length}
                </span>
              </div>

              <div
                onClick={() => setRevealedFlashcard(!revealedFlashcard)}
                className="min-h-52 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-teal-50/40 dark:hover:bg-teal-950/30 transition-all cursor-pointer flex flex-col justify-between text-left relative"
              >
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-400 block mb-1">
                    คำถามทบทวน:
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                    {currentLesson.flashcards[activeFlashcardIndex].question}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-700">
                  {revealedFlashcard ? (
                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold text-teal-700 dark:text-teal-300 block">
                        เฉลย / คำอธิบาย:
                      </span>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {currentLesson.flashcards[activeFlashcardIndex].answer}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-1.5 text-xs text-teal-700 dark:text-teal-300 font-medium py-1">
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>คลิกเพื่อดูเฉลย</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Flashcard Controller */}
              <div className="flex items-center justify-between pt-1">
                <button
                  disabled={activeFlashcardIndex === 0}
                  onClick={() => {
                    setActiveFlashcardIndex((prev) => Math.max(0, prev - 1));
                    setRevealedFlashcard(false);
                  }}
                  className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 transition-colors"
                >
                  ← ข้อก่อนหน้า
                </button>

                <button
                  onClick={() => setRevealedFlashcard(!revealedFlashcard)}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                >
                  {revealedFlashcard ? 'ซ่อน' : 'เปิดเฉลย'}
                </button>

                <button
                  disabled={activeFlashcardIndex === currentLesson.flashcards.length - 1}
                  onClick={() => {
                    setActiveFlashcardIndex((prev) =>
                      Math.min(currentLesson.flashcards.length - 1, prev + 1)
                    );
                    setRevealedFlashcard(false);
                  }}
                  className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 transition-colors"
                >
                  ข้อถัดไป →
                </button>
              </div>
            </div>

            {/* Bookmark & Actions */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-3">
              <button
                onClick={() => toggleBookmark(currentLesson.id)}
                className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold border transition-all ${
                  isCurrentBookmarked
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750'
                }`}
              >
                {isCurrentBookmarked ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>บันทึกบุ๊กมาร์กแล้ว</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <span>บุ๊กมาร์กบทเรียนนี้</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onNavigate('simulation')}
                className="w-full py-2.5 px-4 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors shadow-2xs"
              >
                ทดลองสืบสวนคดีจำลอง
              </button>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // VIEW 2: 4 Lesson Cards Overview (Main Learning Page)
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 animate-fadeIn">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-3.5 py-1.5 rounded-full border border-teal-200 dark:border-teal-800">
          <BookOpen className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span>หลักสูตรสื่อดิจิทัลศึกษา 4 บทเรียน</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          บทเรียนรู้ทันสื่อดิจิทัล
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
          เรียนรู้วิธีคิด วิเคราะห์ และตรวจสอบข้อมูลก่อนเชื่อหรือแชร์บนโลกออนไลน์ผ่าน 4 บทเรียนสำคัญ
        </p>

        {/* Progress Tracker Bar */}
        <div className="pt-4 max-w-md mx-auto">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5 font-medium">
            <span>ความคืบหน้าการเรียนรู้</span>
            <span>{progress.completedLessons.length} จาก 4 บทเรียน</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-teal-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${(progress.completedLessons.length / 4) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* The 4 Lesson Cards (As specifically requested by user) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {LESSONS.map((lesson) => {
          const theme = LESSON_THEMES[lesson.id] || LESSON_THEMES['digital-media'];
          const Icon = theme.icon;
          const isDone = progress.completedLessons.includes(lesson.id);

          return (
            <div
              key={lesson.id}
              onClick={() => setActiveLessonId(lesson.id)}
              className={`group p-7 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 ${theme.cardBorder} shadow-xs hover:shadow-lg transition-all flex flex-col justify-between text-left relative overflow-hidden cursor-pointer`}
            >
              <div className="space-y-5">
                {/* Header row: Icon & Status */}
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold shadow-2xs ${theme.iconBg}`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
                      บทที่ {lesson.number}
                    </span>
                    {isDone && (
                      <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>เรียนแล้ว</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Short Description */}
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors tracking-tight">
                    {lesson.title}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {lesson.subtitle}
                  </p>
                </div>

                {/* Topics Highlights Pill list */}
                <div className="pt-2">
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-medium block mb-2">
                    หัวข้อเด่นในบทเรียน:
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {lesson.sections.map((sec, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-md text-[11px]"
                      >
                        {sec.title.split('. ')[1] || sec.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom row: Read time & "เรียนบทนี้" button */}
              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  <span>เวลาอ่าน {lesson.readTime}</span>
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveLessonId(lesson.id);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs group-hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                >
                  <span>เรียนบทนี้</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Extra Educational Guidance Section */}
      <div className="bg-slate-900 dark:bg-slate-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-slate-800">
        <div className="space-y-2 text-left max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>พร้อมประเมินความรู้แล้วหรือยัง?</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            เมื่อเรียนครบทั้ง 4 บท ทดสอบความจำได้ทันที
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            เข้าทำแบบทดสอบวัดระดับ 10 ข้อ หรือไปจำลองสถานการณ์สืบสวนจริงในโซเชียลมีเดียเพื่อรับเกียรติบัตร
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('simulation')}
            className="px-5 py-3 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs rounded-xl transition-colors"
          >
            เข้าห้องจำลองสถานการณ์
          </button>
          <button
            onClick={() => onNavigate('quiz')}
            className="px-5 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl transition-colors"
          >
            ทำแบบทดสอบ 10 ข้อ
          </button>
        </div>
      </div>
    </div>
  );
};
