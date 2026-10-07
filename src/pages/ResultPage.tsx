import React, { useState } from 'react';
import { PageId } from '../types';
import { useProgress } from '../context/ProgressContext';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { SCENARIO_CASES } from '../data/scenarioData';
import {
  Award,
  Printer,
  RotateCcw,
  BookOpen,
  Search,
  CheckCircle2,
  AlertCircle,
  Share2,
  Sparkles,
  Download,
  Shield,
  HelpCircle
} from 'lucide-react';

interface ResultPageProps {
  onNavigate: (page: PageId) => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({ onNavigate }) => {
  const {
    progress,
    setStudentName,
    resetAllProgress,
    readinessPercentage,
    completedLessonsCount,
    quizScoreOutOf10,
    scenariosPassedCount,
    overallProgressPercent,
  } = useProgress();
  const [inputName, setInputName] = useState(progress.studentName || '');
  const [copied, setCopied] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      setStudentName(inputName.trim());
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const shareText = `ฉันได้ผ่านการทดสอบ "Media Smart – รู้ทันสื่อดิจิทัล" ด้วยคะแนนความพร้อม ${readinessPercentage}% พร้อมรับเกียรติบัตรการรู้เท่าทันสื่อดิจิทัล!`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Determine Level Persona
  let personaTitle = 'ผู้เริ่มต้นการรู้เท่าทันสื่อ (Media Explorer)';
  let personaDesc = 'คุณเริ่มมีความเข้าใจพื้นฐาน แต่ยังต้องระวังกลลวงที่ซับซ้อนและการตรวจสอบแหล่งข่าวปฐมภูมิ';
  let badgeColor = 'bg-amber-100 text-amber-800 border-amber-300';

  if (readinessPercentage >= 85) {
    personaTitle = 'ผู้พิทักษ์ความจริงดิจิทัลระดับเซียน (Digital Truth Guardian)';
    personaDesc = 'ยอดเยี่ยมมาก! คุณมีสายตานักสืบที่เฉียบคม แยกแยะสื่อสังเคราะห์ AI และกลลวงออนไลน์ได้อย่างมืออาชีพ';
    badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
  } else if (readinessPercentage >= 60) {
    personaTitle = 'นักสืบข่าวกรองมืออาชีพ (Digital Detective)';
    personaDesc = 'คุณมีวิจารณญาณที่ดีในการเสพสื่อ สามารถระวังตัวจากข่าวปลอมและกลลวงในระดับมาตรฐานได้ดี';
    badgeColor = 'bg-teal-100 text-teal-800 border-teal-300';
  }

  const certificateDate =
    progress.certifiedAt ||
    new Date().toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const credentialId = `MS-2026-TH-${Math.abs(
    (progress.studentName || 'STUDENT')
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 108)
  )
    .toString()
    .padStart(5, '0')}`;

  const displayName = progress.studentName || inputName || 'นิสิตนักศึกษาผู้รักความจริง';

  // Badge unlock evaluations
  const badgeMediaSmartUnlocked = completedLessonsCount === 4 && progress.quizCompleted && scenariosPassedCount === 5;
  const badgeDetectiveUnlocked = scenariosPassedCount === 5;
  const badgeAnalystUnlocked = quizScoreOutOf10 >= 8;
  const badgeResponsibleUnlocked = completedLessonsCount === 4;

  const badges = [
    {
      id: 'media-smart',
      title: 'Media Smart',
      icon: '🏆',
      desc: 'ผ่านการเรียนรู้ครบทุกองค์ประกอบ: 4 บทเรียน, ทำแบบทดสอบ และผ่าน 5 สถานการณ์จำลอง',
      unlocked: badgeMediaSmartUnlocked,
      progressText: `${(completedLessonsCount === 4 ? 1 : 0) + (progress.quizCompleted ? 1 : 0) + (scenariosPassedCount === 5 ? 1 : 0)}/3 เงื่อนไข`,
    },
    {
      id: 'investigator',
      title: 'นักตรวจสอบข้อมูล',
      icon: '🔎',
      desc: 'ตรวจสอบและเลือกวิธีรับมือที่ถูกต้องในสถานการณ์จำลองครบ 5 คดีบนโซเชียลมีเดีย',
      unlocked: badgeDetectiveUnlocked,
      progressText: `${scenariosPassedCount}/5 สถานการณ์`,
    },
    {
      id: 'analyst',
      title: 'นักคิดวิเคราะห์',
      icon: '🧠',
      desc: 'ทำแบบทดสอบวัดระดับการรู้ทันสื่อได้คะแนนระดับยอดเยี่ยม 8/10 ข้อขึ้นไป',
      unlocked: badgeAnalystUnlocked,
      progressText: `${quizScoreOutOf10}/10 คะแนน`,
    },
    {
      id: 'responsible-user',
      title: 'ผู้ใช้สื่ออย่างรับผิดชอบ',
      icon: '📱',
      desc: 'ศึกษาบทเรียนรู้ทันสื่อดิจิทัลครบทั้ง 4 บทเรียนสำคัญเพื่อสร้างภูมิคุ้มกันดิจิทัล',
      unlocked: badgeResponsibleUnlocked,
      progressText: `${completedLessonsCount}/4 บทเรียน`,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fadeIn">
      {/* Title */}
      <div className="text-center space-y-2 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-md border border-teal-200 dark:border-teal-800">
          <Award className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span>แดชบอร์ดความก้าวหน้าและเกียรติบัตร</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          คะแนนของฉัน & เกียรติบัตร
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          ติดตามความก้าวหน้าการเรียนรู้ คะแนนแบบทดสอบ และรับเกียรติบัตรรับรองทักษะดิจิทัล
        </p>
      </div>

      {/* SECTION 1: ความก้าวหน้าของฉัน (Dashboard as required by user) */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DASHBOARD</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              ความก้าวหน้าของฉัน
            </h2>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500 dark:text-slate-400 block">ความก้าวหน้าโดยรวม</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-teal-700 dark:text-teal-400 font-mono">
              {overallProgressPercent}%
            </span>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
            <div
              className="bg-gradient-to-r from-teal-600 to-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${overallProgressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>เริ่มต้น</span>
            <span>เป้าหมาย 100% เพื่อรับเกียรติบัตรยอดเยี่ยม</span>
          </div>
        </div>

        {/* 3 Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Metric 1: Completed Lessons */}
          <div
            onClick={() => onNavigate('lessons')}
            className="p-5 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/60 hover:border-teal-400 dark:hover:border-teal-600 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-teal-900 dark:text-teal-300">
                บทเรียนที่เรียนแล้ว
              </span>
              <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-teal-800 dark:text-teal-200 font-mono">
                {completedLessonsCount}
              </span>
              <span className="text-sm font-bold text-teal-600 dark:text-teal-400">/ 4</span>
            </div>
            <p className="text-[11px] text-teal-700/80 dark:text-teal-400/80 mt-1">
              {completedLessonsCount === 4 ? '✓ ศึกษาครบทุกบทแล้ว' : 'คลิกเพื่อเรียนต่อ'}
            </p>
          </div>

          {/* Metric 2: Quiz Score */}
          <div
            onClick={() => onNavigate('quiz')}
            className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 hover:border-blue-400 dark:hover:border-blue-600 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-blue-900 dark:text-blue-300">
                คะแนน Quiz
              </span>
              <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-800 dark:text-blue-200 font-mono">
                {quizScoreOutOf10}
              </span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400">/ 10</span>
            </div>
            <p className="text-[11px] text-blue-700/80 dark:text-blue-400/80 mt-1">
              {progress.quizCompleted ? `ได้คะแนน ${quizScoreOutOf10}/10 ข้อ` : 'คลิกเพื่อทำแบบทดสอบ'}
            </p>
          </div>

          {/* Metric 3: Scenarios Passed */}
          <div
            onClick={() => onNavigate('simulation')}
            className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 hover:border-amber-400 dark:hover:border-amber-600 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-amber-900 dark:text-amber-300">
                สถานการณ์ที่ผ่าน
              </span>
              <Search className="w-4 h-4 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-800 dark:text-amber-200 font-mono">
                {scenariosPassedCount}
              </span>
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400">/ 5</span>
            </div>
            <p className="text-[11px] text-amber-700/80 dark:text-amber-400/80 mt-1">
              {scenariosPassedCount === 5 ? '✓ ผ่านทุกสถานการณ์แล้ว' : 'คลิกเพื่อสืบสวนคดี'}
            </p>
          </div>
        </div>

        {/* Achievement Badges Section */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>เหรียญรางวัลความสำเร็จ (Achievement Badges)</span>
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              ปลดล็อกแล้ว {badges.filter((b) => b.unlocked).length} จาก 4 เหรียญ
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {badges.map((b) => {
              return (
                <div
                  key={b.id}
                  className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                    b.unlocked
                      ? 'bg-gradient-to-b from-amber-50/70 to-white dark:from-amber-950/30 dark:to-slate-900 border-amber-300 dark:border-amber-700/60 shadow-xs ring-1 ring-amber-300/60 dark:ring-amber-500/20'
                      : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-70'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{b.icon}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          b.unlocked
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {b.unlocked ? 'ปลดล็อกแล้ว' : 'ยังไม่ปลดล็อก'}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{b.title}</span>
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        {b.desc}
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 mt-2 border-t border-slate-200/60 dark:border-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300 flex items-center justify-between">
                    <span>ความคืบหน้า</span>
                    <span className="font-mono">{b.progressText}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Overview Score Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Combined Readiness */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block mb-1">
              ดัชนีความพร้อมรวม (Overall Readiness)
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-teal-700 dark:text-teal-400 font-mono">
                {readinessPercentage}%
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                (เต็ม 100%)
              </span>
            </div>
            <div className="mt-3 inline-block px-2.5 py-1 rounded-md text-xs font-bold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
              {personaTitle}
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
            {personaDesc}
          </p>
        </div>

        {/* Card 2: Quiz Score */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block">
            คะแนนแบบทดสอบ (Quiz Score)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white font-mono">
              {quizScoreOutOf10}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">/ 10 ข้อ</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            วัดความรู้ความเข้าใจเรื่องอัลกอริทึม ข่าวปลอม สื่อสังเคราะห์ AI การตรวจสอบ และความปลอดภัยโซเชียล
          </p>
          <button
            type="button"
            onClick={() => onNavigate('quiz')}
            className="text-xs text-teal-700 dark:text-teal-400 font-semibold hover:underline inline-flex items-center gap-1"
          >
            <span>ทำแบบทดสอบใหม่</span>
          </button>
        </div>

        {/* Card 3: Simulation Score */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block">
            คะแนนนักสืบจำลอง (Detective Score)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white font-mono">
              {progress.simulationScore}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">/ 50 แต้ม (5 คดี)</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            วัดทักษะการตัดสินใจในสถานการณ์จริงบน Facebook, LINE, TikTok, X, และ Instagram
          </p>
          <button
            onClick={() => onNavigate('simulation')}
            className="text-xs text-teal-700 dark:text-teal-400 font-semibold hover:underline inline-flex items-center gap-1"
          >
            <span>กลับไปสืบสวนคดีจำลอง</span>
          </button>
        </div>
      </div>

      {/* Student Name Input Form */}
      <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        <form onSubmit={handleSaveName} className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full sm:flex-1 text-left">
            <label htmlFor="student-name" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              ระบุชื่อ-นามสกุลของคุณ (สำหรับพิมพ์บนเกียรติบัตร):
            </label>
            <input
              id="student-name"
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="เช่น นายธนวัฒน์ ปัญญาวงศ์ หรือ น.ส.กมลวรรณ สุขใจ"
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 dark:text-slate-100"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl transition-colors sm:self-end"
          >
            อัปเดตชื่อบนเกียรติบัตร
          </button>
        </form>
      </div>

      {/* Official Certificate Presentation (Printable) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <span>เกียรติบัตรรับรองดิจิทัล (Digital Certificate)</span>
          </h2>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>{copied ? 'คัดลอกข้อความแล้ว!' : 'แชร์ผลงาน'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-teal-700 hover:bg-slate-800 dark:hover:bg-teal-800 text-white rounded-xl text-xs font-medium transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>พิมพ์ / บันทึกเป็น PDF</span>
            </button>
          </div>
        </div>

        {/* The Printable Certificate Container */}
        <div
          id="printable-certificate"
          className="relative bg-white rounded-3xl border-4 sm:border-8 border-slate-100 p-4 sm:p-8 lg:p-12 shadow-lg text-center overflow-hidden"
          style={{ minHeight: '440px' }}
        >
          {/* Inner Golden / Teal Border line */}
          <div className="border-2 border-dashed border-teal-600/40 rounded-2xl p-4 sm:p-8 lg:p-10 relative flex flex-col justify-between h-full space-y-6">
            {/* Header Lockup */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-800">
                <Shield className="w-4 h-4 text-teal-600" />
                <span>MEDIA SMART EDUCATIONAL INITIATIVE</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
                เกียรติบัตรการรู้เท่าทันสื่อดิจิทัล
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500">
                CERTIFICATE OF DIGITAL MEDIA LITERACY & VERIFICATION PROFICIENCY
              </p>
            </div>

            {/* Recipient */}
            <div className="space-y-2 my-4">
              <span className="text-xs text-slate-400 block font-light">
                เกียรติบัตรฉบับนี้ให้ไว้เพื่อแสดงว่า
              </span>
              <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-teal-900 tracking-tight border-b-2 border-teal-600/40 pb-2 inline-block max-w-full min-w-44 sm:min-w-64 px-4 sm:px-6 break-words">
                {displayName}
              </div>
              <p className="text-xs text-slate-600 max-w-lg mx-auto pt-2 leading-relaxed">
                ได้ผ่านการศึกษาหลักสูตรและการทดสอบความรู้ความสามารถในการรู้เท่าทันสื่อดิจิทัล
                การตรวจจับข่าวปลอม สื่อสังเคราะห์ AI และกระบวนการตรวจสอบข้อเท็จจริงก่อนแชร์
                ตามมาตรฐานกรอบทักษะศตวรรษที่ 21 (UNESCO MIL)
              </p>
            </div>

            {/* Emblem & Signatures */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              {/* Left: Issue Date & Credential */}
              <div className="text-left text-xs text-slate-500 space-y-1">
                <div>
                  <strong className="text-slate-800">วันที่มอบ:</strong> {certificateDate}
                </div>
                <div>
                  <strong className="text-slate-800">รหัสรับรอง:</strong>{' '}
                  <span className="font-mono">{credentialId}</span>
                </div>
                <div>
                  <strong className="text-slate-800">สถานะ:</strong> ได้รับการรับรองแล้ว
                </div>
              </div>

              {/* Center: Achievement Badge */}
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full border-2 border-teal-600/30 overflow-hidden shadow-xs p-1 bg-teal-50/50">
                  <img
                    src="/src/assets/images/certificate_badge_achievement_1791382632724.jpg"
                    alt="Digital Literacy Achievement Seal"
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Right: Committee Seal */}
              <div className="text-right text-xs text-slate-500 space-y-1">
                <div className="font-semibold text-slate-800">
                  คณะทำงานวิชาการโครงการ Media Smart
                </div>
                <div className="text-[11px] text-slate-400">
                  เครือข่ายส่งเสริมการรู้เท่าทันสื่อดิจิทัลในสถาบันอุดมศึกษา
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Classroom Discussion & What's Next */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold tracking-tight">
          ก้าวต่อไป: นำความรู้ไปใช้อย่างไรในรั้วมหาวิทยาลัย?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300 leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="font-bold text-teal-300 block">1. เตือนเพื่อนด้วยความเข้าอกเข้าใจ</span>
            <p>
              เมื่อเพื่อนส่งข่าวปลอมในกลุ่ม ให้ทักส่วนตัวอย่างสุภาพ ส่งลิงก์ชัวร์ก่อนแชร์เพื่อช่วยกันตัดวงจรข่าวลวง
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="font-bold text-teal-300 block">2. ใช้ในงานวิจัยและรายงานวิชาการ</span>
            <p>
              ใช้เทคนิค Lateral Reading ในการค้นหาเอกสารปฐมภูมิเสมอ และไม่หลงเชื่อข้อมูลที่สร้างขึ้นโดย AI Hallucination
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="font-bold text-teal-300 block">3. เผยแพร่ให้ชมรมและรุ่นน้อง</span>
            <p>
              ชักชวนเพื่อนร่วมคณะและรุ่นน้องปี 1 มาทดลองเล่นห้องสืบสวนคดีจำลอง เพื่อสร้างสังคมมหาวิทยาลัยที่ปลอดภัย
            </p>
          </div>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800">
          <span className="text-xs text-slate-400">
            ต้องการเริ่มศึกษาใหม่ทั้งหมดหรือไม่?
          </span>
          {!showResetConfirm ? (
            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>รีเซ็ตผลการเรียนรู้เพื่อเริ่มใหม่</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-rose-950/80 border border-rose-800 px-3 py-1.5 rounded-xl text-xs">
              <span className="text-rose-200">ยืนยันรีเซ็ต? ข้อมูลจะถูกลบทั้งหมด:</span>
              <button
                type="button"
                onClick={() => {
                  resetAllProgress();
                  setShowResetConfirm(false);
                  onNavigate('home');
                }}
                className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg transition-colors"
              >
                ยืนยัน
              </button>
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-2 py-1 text-slate-400 hover:text-white transition-colors"
              >
                ยกเลิก
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
