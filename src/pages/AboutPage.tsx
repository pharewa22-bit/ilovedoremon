import React from 'react';
import { PageId } from '../types';
import {
  Info,
  Shield,
  Target,
  GraduationCap,
  Users,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Award,
  HelpCircle,
  PhoneCall,
  Sparkles
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14">
      {/* Page Title */}
      <div className="text-center space-y-2 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-md border border-teal-200 dark:border-teal-800">
          <Info className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span>เกี่ยวกับโครงการ (About Media Smart)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          โครงการส่งเสริมการรู้เท่าทันสื่อดิจิทัล
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          สร้างสรรค์ขึ้นเพื่อเป็นเครื่องมือการเรียนรู้เชิงโต้ตอบสำหรับนิสิตนักศึกษาระดับอุดมศึกษาไทย (อายุ 18–22 ปี)
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 flex items-center justify-center font-bold">
            <Target className="w-5 h-5 text-teal-700 dark:text-teal-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            วัตถุประสงค์ของโครงการ
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            ในยุคที่เทคโนโลยีปัญญาประดิษฐ์ (Generative AI) และอัลกอริทึมของแพลตฟอร์มโซเชียลมีเดียเปลี่ยนแปลงอย่างรวดเร็ว นิสิตนักศึกษาตกเป็นเป้าหมายสำคัญของทั้งข่าวบิดเบือน กลโกงงานออนไลน์ (Task Scam) และการสร้างหลักฐานเท็จด้วย Deepfakes
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            โครงการ Media Smart มีเป้าหมายเพื่อสร้าง "ภูมิคุ้มกันทางดิจิทัล" ให้นักศึกษาไม่เพียงแค่ไม่ตกเป็นเหยื่อ แต่กลายเป็น <strong>พลเมืองดิจิทัลเชิงรุก (Active Digital Citizens)</strong> ที่ช่วยตรวจสอบและสร้างพื้นที่ปลอดภัยในสังคม
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-slate-900 dark:bg-slate-950 text-white rounded-2xl shadow-xs space-y-4 flex flex-col justify-between border border-slate-800">
          <div>
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold mb-4">
              <GraduationCap className="w-5 h-5 text-teal-400" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">
              กรอบอ้างอิงระดับสากล
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
              หลักสูตรและแบบทดสอบได้รับการออกแบบโดยอ้างอิงจาก:
            </p>
            <ul className="space-y-2 text-xs text-slate-300 mt-3 list-disc list-inside">
              <li>
                <strong>UNESCO Media and Information Literacy (MIL)</strong> Curriculum for Educators & Learners
              </li>
              <li>
                <strong>DQ Institute (Digital Intelligence)</strong>: Digital Citizenship Framework
              </li>
              <li>
                <strong>Stanford History Education Group (SHEG)</strong>: Civic Online Reasoning & Lateral Reading
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-800 text-xs text-teal-300 font-medium">
            รองรับมาตรฐานการศึกษาในศตวรรษที่ 21
          </div>
        </div>
      </div>

      {/* Educator Guide Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-xs space-y-6">
        <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>สำหรับอาจารย์และผู้สอน (Educator & Lecturer Guide)</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          แนวทางการนำ Media Smart ไปใช้ในกิจกรรมการเรียนการสอน
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          อาจารย์ผู้สอนสามารถนำเว็บแอปพลิเคชันนี้ไปบูรณาการในรายวิชาศึกษาทั่วไป (General Education - GenEd), วิชาสื่อสารมวลชน, เทคโนโลยีสารสนเทศ หรือกิจกรรมปฐมนิเทศนักศึกษาใหม่ได้ผ่าน 3 รูปแบบกิจกรรม:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase block">
              กิจกรรมที่ 1
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              สืบสวนคดีจำลองในห้องเรียน
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              ให้นักศึกษาแบ่งกลุ่มละ 3-4 คน เปิดหน้า "ห้องจำลองสถานการณ์" แล้วร่วมกันส่องพิรุธ (Inspect Clues) อภิปรายเหตุผลว่าทำไมถึงเลือกการกระทำดังกล่าว
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase block">
              กิจกรรมที่ 2
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              ท้าประลอง Reverse Search
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              ให้อาจารย์นำภาพไวรัลล่าสุดในโซเชียลมาให้นักศึกษาฝึกใช้ Google Lens / TinEye เพื่อหาต้นตอภายใน 3 นาที เสริมสร้างทักษะ Lateral Reading
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase block">
              กิจกรรมที่ 3
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              ทดสอบและสะสมเกียรติบัตร
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              กำหนดให้นักศึกษาทำแบบทดสอบ 10 ข้อและพิมพ์เกียรติบัตรดิจิทัลแนบเป็นหลักฐานการมีส่วนร่วมในกิจกรรมเสริมหลักสูตร (Activity Transcript)
            </p>
          </div>
        </div>
      </div>

      {/* Directory of Thai Fact-Checking Organizations */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            เครือข่ายความร่วมมือและแหล่งตรวจสอบข้อเท็จจริง
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            ช่องทางทางการสำหรับส่งข่าวต้องสงสัยให้ผู้เชี่ยวชาญช่วยตรวจสอบ
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="font-bold text-sm text-slate-900 dark:text-white">ศูนย์ชัวร์ก่อนแชร์ (MCOT)</div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              สำนักข่าวไทย อสมท มุ่งเน้นการตรวจสอบข่าวสุขภาพ ข่าวไวรัล และวิทยาศาสตร์
            </p>
            <div className="pt-2 text-xs text-teal-700 dark:text-teal-400 font-medium">
              LINE: @SureAndShare
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="font-bold text-sm text-slate-900 dark:text-white">CoFact Thailand</div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              แพลตฟอร์มภาคประชาสังคม เปิดให้ทุกคนร่วมตรวจสอบและแสดงความคิดเห็น
            </p>
            <div className="pt-2 text-xs text-teal-700 dark:text-teal-400 font-medium">
              เว็บไซต์: cofact.org
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="font-bold text-sm text-slate-900 dark:text-white">ศูนย์ต่อต้านข่าวปลอม (AFNC)</div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              กระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม ตรวจสอบนโยบายรัฐ สิทธิประโยชน์
            </p>
            <div className="pt-2 text-xs text-teal-700 dark:text-teal-400 font-medium">
              สายด่วน: 1111 ต่อ 87
            </div>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="p-8 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-left">
          <h3 className="text-lg font-bold text-teal-950 dark:text-teal-100">
            พร้อมเริ่มต้นสร้างภูมิคุ้มกันดิจิทัลแล้วหรือยัง?
          </h3>
          <p className="text-xs text-teal-800 dark:text-teal-300">
            เริ่มอ่านบทเรียน 4 มิติ หรือทดสอบตนเองในห้องจำลองสถานการณ์ได้ทันที
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('lessons')}
            className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-medium text-xs rounded-xl transition-colors shadow-xs"
          >
            ไปที่บทเรียน
          </button>
          <button
            type="button"
            onClick={() => onNavigate('simulation')}
            className="px-5 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-medium text-xs rounded-xl transition-colors"
          >
            เข้าห้องจำลอง
          </button>
        </div>
      </div>
    </div>
  );
};
