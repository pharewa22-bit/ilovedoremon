import React from 'react';
import { PageId } from '../types';
import { useProgress } from '../context/ProgressContext';
import { LESSONS } from '../data/lessonsData';
import { FactCheckAssistant } from '../components/FactCheckAssistant';
import {
  BookOpen,
  HelpCircle,
  Search,
  Award,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  Eye,
  FileCheck,
  ChevronRight
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId, lessonId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { progress } = useProgress();

  // 4 Main Menu Cards requested by user
  const mainCards = [
    {
      id: 'lessons' as PageId,
      number: '01',
      title: 'เริ่มเรียน',
      description: 'เรียนรู้ 4 บทเรียนสำคัญ สื่อดิจิทัล ข่าวปลอม สื่อสังเคราะห์ AI และวิธีตรวจสอบข้อมูล',
      actionText: 'เริ่มเรียนรู้ทันที',
      icon: BookOpen,
      badge: `${progress.completedLessons.length}/4 บทเรียน`,
      accentBg: 'bg-teal-50 dark:bg-teal-950/40',
      accentBorder: 'hover:border-teal-400 dark:hover:border-teal-500',
      iconBg: 'bg-teal-600 text-white',
      btnBg: 'bg-teal-700 hover:bg-teal-800 text-white'
    },
    {
      id: 'quiz' as PageId,
      number: '02',
      title: 'แบบทดสอบ',
      description: 'วัดระดับการรู้ทันสื่อ 10 ข้อตามสถานการณ์จริง พร้อมเฉลยและเกร็ดความรู้สำหรับนักศึกษา',
      actionText: 'ทำแบบทดสอบ',
      icon: HelpCircle,
      badge: progress.quizCompleted ? 'ทำแล้ว' : '10 ข้อ',
      accentBg: 'bg-blue-50 dark:bg-blue-950/40',
      accentBorder: 'hover:border-blue-400 dark:hover:border-blue-500',
      iconBg: 'bg-blue-600 text-white',
      btnBg: 'bg-blue-700 hover:bg-blue-800 text-white'
    },
    {
      id: 'simulation' as PageId,
      number: '03',
      title: 'สถานการณ์จำลอง',
      description: 'สวมบทบาทนักสืบดิจิทัล ส่องพิรุธโพสต์โซเชียลมีเดีย 5 แพลตฟอร์มยอดนิยมเพื่อหาความจริง',
      actionText: 'เข้าห้องจำลอง',
      icon: Search,
      badge: `${Object.keys(progress.simulationAnswers).length}/5 คดี`,
      accentBg: 'bg-amber-50 dark:bg-amber-950/40',
      accentBorder: 'hover:border-amber-400 dark:hover:border-amber-500',
      iconBg: 'bg-amber-600 text-white',
      btnBg: 'bg-amber-700 hover:bg-amber-800 text-white'
    },
    {
      id: 'result' as PageId,
      number: '04',
      title: 'คะแนนของฉัน',
      description: 'ดูสรุปผลการประเมินทักษะ ตรวจสอบระดับความพร้อม และรับเกียรติบัตรรับรองดิจิทัลส่วนบุคคล',
      actionText: 'ดูผลและเกียรติบัตร',
      icon: Award,
      badge: progress.quizCompleted ? `${progress.quizScore + progress.simulationScore} แต้ม` : 'เกียรติบัตร',
      accentBg: 'bg-purple-50 dark:bg-purple-950/40',
      accentBorder: 'hover:border-purple-400 dark:hover:border-purple-500',
      iconBg: 'bg-purple-600 text-white',
      btnBg: 'bg-purple-700 hover:bg-purple-800 text-white'
    }
  ];

  const rules = [
    {
      num: '01',
      title: 'หยุด 10 วินาทีเมื่อสะดุดใจ',
      desc: 'หากเนื้อหาทำให้โกรธ ตกใจ หรือสะใจสุดขีด นั่นคือกลยุทธ์จิตวิทยาที่มักใช้ในข่าวปลอมและอัลกอริทึม'
    },
    {
      num: '02',
      title: 'ตรวจทาน URL และชื่อผู้เขียน',
      desc: 'สังเกตชื่อโดเมนแปลกๆ เช่น .xyz หรือ .cc และดูว่ามีชื่อนักข่าวหรือองค์กรที่รับผิดชอบจริงหรือไม่'
    },
    {
      num: '03',
      title: 'เปิดแท็บใหม่ (Lateral Reading)',
      desc: 'อย่าอ่านแค่ในหน้าเว็บนั้น เปิดค้นหาใน Google ว่าสำนักข่าวอื่นรายงานเรื่องนี้ตรงกันหรือไม่'
    },
    {
      num: '04',
      title: 'ส่องจุดบกพร่อง AI สังเคราะห์',
      desc: 'ซูมตรวจดูนิ้วมือ แสงสะท้อนในลูกตา ป้ายข้อความฉากหลัง และน้ำเสียงที่ไร้จังหวะหายใจ'
    },
    {
      num: '05',
      title: 'ไม่ชัวร์ 100% ห้ามกดแชร์',
      desc: 'การไม่แชร์ข้อมูลที่ยังไม่ได้รับการยืนยัน คือการตัดวงจรการแพร่ระบาดของข่าวปลอมในสังคม'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 sm:pb-16 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-teal-50/60 via-white to-slate-50/40 dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-900/40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Slogan Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/90 dark:bg-teal-950/60 text-teal-900 dark:text-teal-300 text-xs sm:text-sm font-semibold border border-teal-200 dark:border-teal-800 shadow-2xs">
                <Sparkles className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                <span>คิดก่อนเชื่อ เช็กก่อนแชร์</span>
              </div>

              {/* Main Title */}
              <div className="space-y-1">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
                  Media Smart
                </h1>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-700 dark:text-teal-400 tracking-tight">
                  รู้ทันสื่อดิจิทัล
                </p>
              </div>

              {/* Short Introduction */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
                เรียนรู้วิธีคิด วิเคราะห์ และตรวจสอบข้อมูลก่อนเชื่อหรือแชร์บนโลกออนไลน์
              </p>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('lessons')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-medium text-sm rounded-xl transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>เริ่มเรียนรู้บทเรียน</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('simulation')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium text-sm rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 shadow-2xs"
                >
                  <Search className="w-4 h-4 text-teal-700 dark:text-teal-400" />
                  <span>สถานการณ์จำลอง (5 คดี)</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('quiz')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-colors"
                >
                  <span>แบบทดสอบ 10 ข้อ</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>สำหรับนิสิตนักศึกษา 18–22 ปี</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>อิงกรอบ UNESCO MIL</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>รับเกียรติบัตรดิจิทัล</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <img
                  src="/src/assets/images/hero_media_smart_1791382578909.jpg"
                  alt="นิสิตนักศึกษารู้ทันสื่อดิจิทัลและตรวจจับข่าวปลอม"
                  className="w-full h-auto object-cover aspect-16/9 lg:aspect-4/3"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4 bg-slate-900/90 text-white backdrop-blur-xs flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span className="font-semibold">Media Smart Learning Platform</span>
                  </div>
                  <span className="text-slate-300">เรียนรู้ได้ฟรี ทุกที่ ทุกเวลา</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Main Menu Cards (Core Feature Navigation) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1 text-teal-700 dark:text-teal-400 text-xs font-semibold tracking-wider uppercase">
            <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>เมนูหลัก 4 เมนูสำคัญ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            เลือกกิจกรรมการเรียนรู้ของคุณ
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            พัฒนาทักษะการรู้เท่าทันสื่อแบบครบวงจร ตั้งแต่ทฤษฎี การทดลองสืบสวนจริง จนถึงการประเมินผล
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onNavigate(card.id)}
                className={`group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 ${card.accentBorder} shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between text-left relative overflow-hidden`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shadow-2xs ${card.iconBg}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                      {card.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 block mb-1">
                      เมนูที่ {card.number}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                    {card.actionText}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-teal-700 group-hover:text-white flex items-center justify-center text-slate-600 dark:text-slate-300 transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4 Learning Topics Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-teal-700 dark:text-teal-400 text-xs font-semibold tracking-wider uppercase block mb-1">
              เนื้อหาหลักสูตร
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              4 หัวข้อสำคัญเพื่อการรู้ทันสื่อดิจิทัล
            </h2>
          </div>
          <button
            onClick={() => onNavigate('lessons')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
          >
            <span>ดูบทเรียนทั้งหมด</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LESSONS.map((lesson) => {
            const isCompleted = progress.completedLessons.includes(lesson.id);
            return (
              <div
                key={lesson.id}
                onClick={() => onNavigate('lessons', lesson.id)}
                className="group p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-400 dark:hover:border-teal-500 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-1 rounded-md">
                      บทที่ {lesson.number}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <span>อ่าน {lesson.readTime}</span>
                      {isCompleted && (
                        <span className="text-emerald-700 dark:text-emerald-400 font-semibold ml-1">· สำเร็จแล้ว</span>
                      )}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                    {lesson.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {lesson.titleEn}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {lesson.subtitle}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 mt-6 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {lesson.sections.length} หัวข้อย่อย · มีบัตรคำทบทวน
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 dark:text-teal-400 group-hover:translate-x-1 transition-transform">
                    <span>เริ่มอ่าน</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Fact-Check Sandbox Tool */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FactCheckAssistant onNavigateToSimulation={() => onNavigate('simulation')} />
      </section>

      {/* 5 Golden Rules Checklist */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 dark:bg-slate-950 text-white rounded-3xl p-8 sm:p-12 overflow-hidden relative border border-slate-800">
          <div className="max-w-3xl mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-300 uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>หลักคิดก่อนกดแชร์</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              5 กฎเหล็ก "คิดก่อนเชื่อ เช็กก่อนแชร์"
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              แนวทางปฏิบัติที่นิสิตนักศึกษาควรจำให้ขึ้นใจ เพื่อป้องกันตนเองจากการถูกหลอกและไม่ตกเป็นผู้ส่งต่อข้อมูลเท็จ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {rules.map((rule) => (
              <div
                key={rule.num}
                className="bg-slate-800/80 dark:bg-slate-900 border border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl font-bold font-mono text-teal-400 mb-2">
                    {rule.num}
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-2">
                    {rule.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {rule.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400">
              ทดสอบความชำนาญของคุณในห้องสืบสวนคดีจำลอง หรือทำแบบทดสอบวัดระดับ
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('simulation')}
                className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl transition-colors shadow-xs"
              >
                เข้าสถานการณ์จำลอง
              </button>
              <button
                type="button"
                onClick={() => onNavigate('quiz')}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs rounded-xl transition-colors border border-slate-700"
              >
                ทำแบบทดสอบ 10 ข้อ
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 flex items-center justify-center font-bold">
              <Eye className="w-5 h-5 text-teal-700 dark:text-teal-400" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              รู้เท่าทันอัลกอริทึมและฟีด
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              เข้าใจกลไก Attention Economy และหลุดพ้นจากวังวน Echo Chamber ที่ทำให้เราเห็นเฉพาะสิ่งที่ตรงกับความเชื่อเดิม
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-teal-700 dark:text-teal-400" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              ตรวจจับกลโกงพุ่งเป้านักศึกษา
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              ระวังกลลวง Phishing ลิงก์แจกเงินช่วยเหลือนักศึกษา และงานพาร์ทไทม์คอนเฟิร์มออเดอร์ที่สร้างความเสียหายจริง
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 flex items-center justify-center font-bold">
              <FileCheck className="w-5 h-5 text-teal-700 dark:text-teal-400" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              จับพิรุธ AI และสื่อสังเคราะห์
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              ส่องข้อบกพร่องของ Deepfake และ AI Voice Cloning พร้อมเรียนรู้การใช้ Generative AI อย่างมีจริยธรรม
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
