import React, { useState } from 'react';
import { PageId, ScenarioCase } from '../types';
import { SCENARIO_CASES } from '../data/scenarioData';
import { useProgress } from '../context/ProgressContext';
import {
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Share2,
  Heart,
  FileSearch,
  Check
} from 'lucide-react';

interface SimulationPageProps {
  onNavigate: (page: PageId) => void;
}

export const SimulationPage: React.FC<SimulationPageProps> = ({ onNavigate }) => {
  const { progress, recordScenarioAnswer, discoverClue } = useProgress();
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [inspectMode, setInspectMode] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const currentCase: ScenarioCase = SCENARIO_CASES[currentCaseIndex];
  const savedAnswerId = progress.simulationAnswers[currentCase.id];
  const activeAnswerId = selectedOptionId || savedAnswerId;
  const isAnswered = !!activeAnswerId;

  const handleSelectOption = (option: ScenarioCase['options'][0]) => {
    if (isAnswered) return; // lock once answered
    setSelectedOptionId(option.id);
    recordScenarioAnswer(currentCase.id, option.id, option.score);
  };

  const handleDiscoverClue = (clueId: string) => {
    discoverClue(clueId);
  };

  const handleNextCase = () => {
    if (currentCaseIndex < SCENARIO_CASES.length - 1) {
      setCurrentCaseIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setInspectMode(false);
    } else {
      if (progress.quizCompleted) {
        onNavigate('result');
      } else {
        onNavigate('quiz');
      }
    }
  };

  const handlePrevCase = () => {
    if (currentCaseIndex > 0) {
      setCurrentCaseIndex((prev) => prev - 1);
      setSelectedOptionId(null);
      setInspectMode(false);
    }
  };

  const completedCount = Object.keys(progress.simulationAnswers).length;
  const currentSelectedOpt = currentCase.options.find((o) => o.id === activeAnswerId);
  const correctOpt = currentCase.options.find((o) => o.isCorrect);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Simulation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-md border border-teal-200 dark:border-teal-800 mb-2">
            <Search className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>สถานการณ์จำลองชีวิตจริง (Real-Life Media Scenario)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            จำลองสถานการณ์จริงบนโซเชียลมีเดีย
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            เผชิญหน้ากับโพสต์และข่าวไวรัลจริง 5 สถานการณ์ ฝึกคิดวิเคราะห์และตัดสินใจอย่างรอบคอบ
          </p>
        </div>

        {/* Status Tracker */}
        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">สถานการณ์ที่ทำแล้ว</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">
              {completedCount} / {SCENARIO_CASES.length} ข้อ
            </div>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
          <div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">คะแนนสะสม</div>
            <div className="text-sm font-bold text-teal-700 dark:text-teal-400 font-mono">
              {progress.simulationScore} แต้ม
            </div>
          </div>
        </div>
      </div>

      {/* Case Navigator Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
        {SCENARIO_CASES.map((c, idx) => {
          const isDone = !!progress.simulationAnswers[c.id];
          const isCurrent = idx === currentCaseIndex;
          return (
            <button
              key={c.id}
              onClick={() => {
                setCurrentCaseIndex(idx);
                setSelectedOptionId(null);
                setInspectMode(false);
              }}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isCurrent
                  ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                  : isDone
                  ? 'bg-teal-50/70 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800 text-teal-900 dark:text-teal-300'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[10px] font-mono font-bold opacity-80">
                  สถานการณ์ที่ {idx + 1}
                </span>
                {isDone && <Check className="w-3 h-3 text-emerald-500" />}
              </div>
              <div className="text-xs font-semibold truncate">
                {c.platformName}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Investigation Split Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Realistic Simulated Social Post Card (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-teal-800 dark:text-teal-400 uppercase tracking-wider">
              {currentCase.category}
            </span>
            <button
              onClick={() => setInspectMode(!inspectMode)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                inspectMode
                  ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 border-teal-300 dark:border-teal-700 hover:bg-teal-50 dark:hover:bg-slate-700'
              }`}
            >
              <FileSearch className="w-3.5 h-3.5" />
              <span>{inspectMode ? 'ปิดโหมดส่องพิรุธ' : 'แว่นขยายส่องพิรุธ (Inspect Clues)'}</span>
            </button>
          </div>

          {/* Social Platform Mockup Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            {/* Header row */}
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                  {currentCase.authorAvatarText}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {currentCase.authorName}
                    </span>
                    {currentCase.isSponsored && (
                      <span className="text-[10px] text-slate-400 font-normal">· สปอนเซอร์</span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {currentCase.authorHandle} · {currentCase.timestamp}
                  </div>
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                {currentCase.platformName}
              </span>
            </div>

            {/* Post Content */}
            <div className="p-5 sm:p-6 space-y-4">
              {/* Situation Prompt text */}
              <div className="p-3.5 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 text-xs sm:text-sm text-teal-950 dark:text-teal-200 font-medium">
                📍 {currentCase.situationText}
              </div>

              {/* Exact Post Text */}
              <p className="text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-relaxed font-normal">
                {currentCase.postText}
              </p>

              {/* Visual simulation representation */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-900 text-white p-5 relative overflow-hidden">
                <div className="text-xs text-teal-300 font-mono mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ภาพประกอบ/วิดีโอบนหน้าจอ:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                  {currentCase.postImageDesc}
                </p>

                {inspectMode && (
                  <div className="mt-4 pt-3 border-t border-slate-700/80 text-xs text-amber-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                    <span>โหมดส่องพิรุธทำงาน: ดูรายละเอียดจุดสังเกตด้านล่าง</span>
                  </div>
                )}
              </div>

              {/* Social Metrics */}
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" />
                    <span>{currentCase.likesCount}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{currentCase.sharesCount}</span>
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">
                  กำลังเป็นไวรัลในหมู่นิสิตนักศึกษา
                </span>
              </div>
            </div>
          </div>

          {/* Forensic Clues Inspector Panel */}
          {inspectMode && (
            <div className="p-5 rounded-3xl bg-teal-50 dark:bg-slate-900 border border-teal-200 dark:border-slate-800 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900 dark:text-teal-300 uppercase tracking-wider">
                  <FileSearch className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                  <span>หลักฐานเชิงนิติวิทยาศาสตร์ดิจิทัล ({currentCase.clues.length} จุด)</span>
                </div>
                <span className="text-[11px] text-teal-700 dark:text-teal-400">คลิกเพื่อเก็บบันทึกหลักฐาน</span>
              </div>

              <div className="space-y-2">
                {currentCase.clues.map((clue) => {
                  const isFound = progress.cluesDiscovered.includes(clue.id);
                  return (
                    <div
                      key={clue.id}
                      onClick={() => handleDiscoverClue(clue.id)}
                      className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition-all ${
                        isFound
                          ? 'bg-white dark:bg-slate-800 border-teal-300 dark:border-teal-700 text-teal-950 dark:text-teal-200 shadow-2xs'
                          : 'bg-white/80 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold mb-1">
                        <span className="text-teal-900 dark:text-teal-300 font-bold">{clue.label}</span>
                        {isFound && (
                          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>ตรวจพบแล้ว</span>
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{clue.detail}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right: Decision Question & Explanation (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs space-y-5">
            {/* Ask Prompt Question */}
            <div>
              <div className="text-xs font-bold text-teal-800 dark:text-teal-400 uppercase tracking-wider mb-1">
                คำถามการตัดสินใจ
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {currentCase.promptQuestion}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                เลือกคำตอบที่ถูกต้องที่สุดจากตัวเลือก A, B, C หรือ D ด้านล่าง
              </p>
            </div>

            {/* 4 Choices (A, B, C, D) */}
            <div className="space-y-3">
              {currentCase.options.map((opt) => {
                const isSelected = activeAnswerId === opt.id;

                let cardStyle =
                  'bg-slate-50 dark:bg-slate-800/70 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200';

                if (isAnswered) {
                  if (opt.isCorrect) {
                    cardStyle =
                      'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-medium ring-1 ring-emerald-400';
                  } else if (isSelected && !opt.isCorrect) {
                    cardStyle =
                      'bg-rose-50 dark:bg-rose-950/50 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-200 font-medium ring-1 ring-rose-400';
                  } else {
                    cardStyle =
                      'bg-slate-50/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${cardStyle}`}
                  >
                    <span className="w-6 h-6 rounded-lg border border-current flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono">
                      {isAnswered ? (
                        opt.isCorrect ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        ) : isSelected ? (
                          <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                        ) : (
                          opt.letter
                        )
                      ) : (
                        opt.letter
                      )}
                    </span>
                    <span className="leading-relaxed pt-0.5">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation Section (Revealed after answer) */}
            {isAnswered && currentSelectedOpt && (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-fadeIn">
                {/* Result banner */}
                <div
                  className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed space-y-2 ${
                    currentSelectedOpt.isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                      : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {currentSelectedOpt.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>ตอบถูกต้อง! (+10 คะแนน)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                        <span>ยังไม่ถูกต้อง (0 คะแนน)</span>
                      </>
                    )}
                  </div>

                  {/* Show correct choice clearly if user answered wrong */}
                  {!currentSelectedOpt.isCorrect && correctOpt && (
                    <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-rose-200 dark:border-rose-900 text-slate-800 dark:text-slate-200 font-medium">
                      <strong className="text-rose-700 dark:text-rose-400 block mb-0.5">
                        คำตอบที่ถูกต้องคือข้อ {currentCase.correctOptionLetter}:
                      </strong>
                      <span>{correctOpt.text}</span>
                    </div>
                  )}

                  {/* Explanation for why this is correct/incorrect */}
                  <div className="pt-1">
                    <strong className="block mb-0.5 opacity-90">คำอธิบาย:</strong>
                    <p className="opacity-95">{currentSelectedOpt.explanation}</p>
                  </div>

                  {/* Consequence in real life */}
                  <div className="pt-2 border-t border-current/10 font-medium text-[11px] sm:text-xs">
                    <strong>ผลที่เกิดขึ้นในชีวิตจริง:</strong> {currentSelectedOpt.consequence}
                  </div>
                </div>

                {/* Reality & Fact-check tips */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                    <span>{currentCase.truthAnalysis.headline}</span>
                  </div>
                  <p className="leading-relaxed">{currentCase.truthAnalysis.reality}</p>
                  <div className="pt-1 text-slate-600 dark:text-slate-400">
                    <strong className="text-slate-800 dark:text-slate-200">วิธีเช็ก: </strong>
                    {currentCase.truthAnalysis.howToCheck}
                  </div>
                </div>

                {/* Navigator button */}
                <div className="flex items-center justify-between pt-2">
                  {currentCaseIndex > 0 && (
                    <button
                      onClick={handlePrevCase}
                      className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>สถานการณ์ก่อนหน้า</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleNextCase}
                    className="ml-auto inline-flex items-center gap-2 px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-xs"
                  >
                    <span>
                      {currentCaseIndex < SCENARIO_CASES.length - 1
                        ? 'ไปยังสถานการณ์ถัดไป'
                        : progress.quizCompleted
                        ? 'ดูคะแนนและเกียรติบัตร'
                        : 'ทำแบบทดสอบวัดระดับ'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
