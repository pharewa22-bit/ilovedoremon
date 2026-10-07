import React, { useState } from 'react';
import { PageId } from '../types';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { useProgress } from '../context/ProgressContext';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Award,
  Sparkles,
  Lightbulb,
  Check
} from 'lucide-react';

interface QuizPageProps {
  onNavigate: (page: PageId) => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({ onNavigate }) => {
  const { finalizeQuiz, recordQuizAnswer, progress } = useProgress();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isAnsweredCurrent, setIsAnsweredCurrent] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];
  const selectedChoiceIdx = selectedAnswers[currentQ?.id];

  // Handle user clicking an option
  const handleSelectChoice = (choiceIdx: number) => {
    if (isAnsweredCurrent) return; // prevent changing after answering

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: choiceIdx,
    }));
    recordQuizAnswer(currentQ.id, choiceIdx);
    setIsAnsweredCurrent(true);
  };

  // Continue to next question or show final score
  const handleNextQuestion = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsAnsweredCurrent(false);
    } else {
      // Calculate total score out of 10 safely including current selection
      const allAnswers = {
        ...selectedAnswers,
        ...(selectedChoiceIdx !== undefined ? { [currentQ.id]: selectedChoiceIdx } : {}),
      };
      let correctCount = 0;
      QUIZ_QUESTIONS.forEach((q) => {
        const userChoice = allAnswers[q.id];
        if (userChoice !== undefined && q.options[userChoice]?.isCorrect) {
          correctCount += 1;
        }
      });
      finalizeQuiz(correctCount); // save score out of 10
      setIsFinished(true);
    }
  };

  // Retake quiz
  const handleRestartQuiz = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsAnsweredCurrent(false);
    setIsFinished(false);
  };

  // Calculate score at end
  const totalCorrect = QUIZ_QUESTIONS.filter((q) => {
    const choice = selectedAnswers[q.id];
    return choice !== undefined && q.options[choice]?.isCorrect;
  }).length;

  // Feedback based on score (requested by user)
  let feedbackMessage = '';
  let feedbackBadge = '';
  let feedbackColor = '';

  if (totalCorrect >= 8) {
    feedbackMessage = 'ยอดเยี่ยม! คุณมีทักษะการรู้เท่าทันสื่อที่ดี';
    feedbackBadge = 'ระดับดีเยี่ยม (Excellent)';
    feedbackColor = 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800';
  } else if (totalCorrect >= 5) {
    feedbackMessage = 'ทำได้ดี แต่ยังสามารถพัฒนาทักษะการตรวจสอบข้อมูลได้อีก';
    feedbackBadge = 'ระดับปานกลาง (Good)';
    feedbackColor = 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800';
  } else {
    feedbackMessage = 'ลองทบทวนบทเรียนและฝึกตรวจสอบข้อมูลเพิ่มเติม';
    feedbackBadge = 'ควรพัฒนาเพิ่มเติม (Needs Practice)';
    feedbackColor = 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800';
  }

  // Find correct option for current question
  const correctOption = currentQ?.options.find((opt) => opt.isCorrect);

  // VIEW 1: Final Score Screen
  if (isFinished) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-sm text-center space-y-6">
          <div className="w-20 h-20 rounded-full mx-auto bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold shadow-xs">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              สรุปผลแบบทดสอบการรู้ทันสื่อ
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              คะแนนของคุณ: {totalCorrect}/10
            </h1>
          </div>

          {/* Feedback Box Requested by user */}
          <div className={`p-6 rounded-2xl border text-center space-y-2 max-w-lg mx-auto ${feedbackColor}`}>
            <span className="text-xs font-bold uppercase tracking-wider block opacity-90">
              {feedbackBadge}
            </span>
            <p className="text-lg sm:text-xl font-bold leading-relaxed">
              {feedbackMessage}
            </p>
          </div>

          {/* Breakdown summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto pt-2">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
              <span className="text-slate-500 dark:text-slate-400 block">ตอบถูก</span>
              <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                {totalCorrect} ข้อ
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
              <span className="text-slate-500 dark:text-slate-400 block">ตอบผิด</span>
              <span className="text-lg font-bold text-rose-600 dark:text-rose-400 font-mono">
                {10 - totalCorrect} ข้อ
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
              <span className="text-slate-500 dark:text-slate-400 block">ร้อยละ</span>
              <span className="text-lg font-bold text-teal-600 dark:text-teal-400 font-mono">
                {totalCorrect * 10}%
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
              <span className="text-slate-500 dark:text-slate-400 block">จำนวนข้อ</span>
              <span className="text-lg font-bold text-slate-800 dark:text-slate-200 font-mono">
                10 ข้อ
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRestartQuiz}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors shadow-2xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ทำแบบทดสอบอีกครั้ง</span>
            </button>

            <button
              onClick={() => onNavigate('lessons')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-teal-700 hover:bg-teal-800 text-white transition-colors shadow-xs"
            >
              <BookOpen className="w-4 h-4" />
              <span>ทบทวน 4 บทเรียน</span>
            </button>

            <button
              onClick={() => onNavigate('result')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white transition-colors shadow-xs"
            >
              <Award className="w-4 h-4" />
              <span>รับเกียรติบัตรของฉัน</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // VIEW 2: Question-by-Question Interactive Quiz
  const isSelectedCorrect =
    selectedChoiceIdx !== undefined &&
    currentQ.options[selectedChoiceIdx]?.isCorrect;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Quiz Header & Progress */}
      <div className="text-center space-y-3 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-3.5 py-1.5 rounded-full border border-teal-200 dark:border-teal-800">
          <HelpCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>แบบทดสอบวัดระดับการรู้ทันสื่อ 10 ข้อ</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          แบบทดสอบรู้ทันสื่อดิจิทัล
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          ทดสอบความรู้ 5 ด้าน: การรู้เท่าทันสื่อ ข่าวปลอม สื่อสังเคราะห์ AI การตรวจสอบข้อมูล และความปลอดภัยบนโซเชียล
        </p>

        {progress.quizCompleted && (
          <div className="text-xs text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-xl px-3.5 py-1.5 inline-block">
            คะแนนรอบก่อนหน้าของคุณ: {progress.quizScore}/10 ข้อ (กำลังทำรอบใหม่)
          </div>
        )}

        {/* Progress Bar */}
        <div className="pt-3 max-w-md mx-auto">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5 font-medium">
            <span>คำถามข้อที่ {currentIndex + 1} จาก 10</span>
            <span>ตอบแล้ว {Object.keys(selectedAnswers).length}/10 ข้อ</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-teal-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / 10) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6">
        {/* Category & Step badge */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/50 px-3 py-1 rounded-lg border border-teal-200 dark:border-teal-800">
            {currentQ.categoryLabel}
          </span>
          <span className="text-slate-400 dark:text-slate-500 font-mono">
            ข้อ {currentIndex + 1}/10
          </span>
        </div>

        {/* Context / Scenario */}
        {currentQ.scenarioContext && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            <strong className="text-slate-900 dark:text-white font-semibold">สถานการณ์: </strong>
            {currentQ.scenarioContext}
          </div>
        )}

        {/* Question Text */}
        <h2 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
          {currentQ.question}
        </h2>

        {/* 4 Choices */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedChoiceIdx === idx;
            const letter = ['ก', 'ข', 'ค', 'ง'][idx] || String.fromCharCode(65 + idx);

            let choiceStyle =
              'bg-slate-50 dark:bg-slate-800/70 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200';

            if (isAnsweredCurrent) {
              if (opt.isCorrect) {
                // Correct answer is always green
                choiceStyle =
                  'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-medium ring-1 ring-emerald-400';
              } else if (isSelected && !opt.isCorrect) {
                // User's wrong selection is red
                choiceStyle =
                  'bg-rose-50 dark:bg-rose-950/50 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-200 font-medium ring-1 ring-rose-400';
              } else {
                choiceStyle =
                  'bg-slate-50/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnsweredCurrent}
                onClick={() => handleSelectChoice(idx)}
                className={`w-full p-4 sm:p-5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3.5 ${choiceStyle}`}
              >
                <span className="w-7 h-7 rounded-xl border border-current flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono">
                  {isAnsweredCurrent ? (
                    opt.isCorrect ? (
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : isSelected ? (
                      <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    ) : (
                      letter
                    )
                  ) : (
                    letter
                  )}
                </span>
                <span className="leading-relaxed pt-0.5">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {/* Immediate Feedback Box (After user answers) */}
        {isAnsweredCurrent && selectedChoiceIdx !== undefined && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-fadeIn">
            <div
              className={`p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed space-y-2 ${
                isSelectedCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200'
              }`}
            >
              {/* Correct or Incorrect Label */}
              <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
                {isSelectedCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span>ถูกต้อง! ✓</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    <span>ยังไม่ถูกต้อง ✕</span>
                  </>
                )}
              </div>

              {/* Show Correct Answer if user got it wrong */}
              {!isSelectedCorrect && correctOption && (
                <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-rose-200 dark:border-rose-900 text-slate-800 dark:text-slate-200 font-medium">
                  <span className="text-rose-700 dark:text-rose-400 font-bold block mb-0.5">
                    คำตอบที่ถูกต้องคือ:
                  </span>
                  <span>{correctOption.text}</span>
                </div>
              )}

              {/* Short Explanation */}
              <div className="pt-1">
                <strong className="block mb-0.5 opacity-90">คำอธิบาย:</strong>
                <p className="opacity-95">{currentQ.options[selectedChoiceIdx]?.explanation}</p>
              </div>
            </div>

            {/* Pro Tip */}
            {currentQ.proTip && (
              <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 text-xs sm:text-sm text-teal-950 dark:text-teal-200 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-teal-700 dark:text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-teal-900 dark:text-teal-300 block mb-0.5">
                    ข้อคิดสะกิดใจ:
                  </span>
                  <span>{currentQ.proTip}</span>
                </div>
              </div>
            )}

            {/* Continue to Next Question Button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs"
              >
                <span>
                  {currentIndex < QUIZ_QUESTIONS.length - 1
                    ? 'ไปยังข้อถัดไป'
                    : 'ดูสรุปผลคะแนน'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
