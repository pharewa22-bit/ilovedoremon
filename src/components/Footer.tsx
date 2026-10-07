import React from 'react';
import { PageId } from '../types';
import { Shield, ExternalLink, PhoneCall, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500 text-slate-900 flex items-center justify-center font-bold">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Media Smart</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              โครงการเพื่อการศึกษา พัฒนาทักษะการรู้เท่าทันสื่อดิจิทัล สื่อสังเคราะห์ AI และการตรวจจับข่าวปลอม สำหรับนิสิตนักศึกษาไทย
            </p>
            <div className="pt-2 text-xs text-slate-400">
              <span>กลุ่มเป้าหมาย: นิสิตนักศึกษา อายุ 18–22 ปี</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3 tracking-wide">แผนผังการเรียนรู้</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-teal-400 transition-colors"
                >
                  หน้าหลัก (Home)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lessons')}
                  className="hover:text-teal-400 transition-colors"
                >
                  บทเรียน 4 มิติการรู้ทันสื่อ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('simulation')}
                  className="hover:text-teal-400 transition-colors"
                >
                  ห้องจำลองสถานการณ์โซเชียลมีเดีย
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('quiz')}
                  className="hover:text-teal-400 transition-colors"
                >
                  แบบทดสอบวัดระดับ (10 ข้อ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('result')}
                  className="hover:text-teal-400 transition-colors"
                >
                  ผลคะแนนและรับเกียรติบัตร
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Verification Resources in Thailand */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3 tracking-wide">แหล่งตรวจสอบข้อเท็จจริงในไทย</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href="https://tna.mcot.net/sureandshare"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>ศูนย์ชัวร์ก่อนแชร์ (MCOT)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://cofact.org"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>CoFact Thailand</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.antifakenewscenter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>ศูนย์ต่อต้านข่าวปลอม ประเทศไทย</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.etda.or.th"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>สำนักงานพัฒนาธุรกรรมทางอิเล็กทรอนิกส์ (ETDA)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Emergency Hotlines & Guidelines */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3 tracking-wide">สายด่วนภัยไซเบอร์ & มิจฉาชีพ</h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 space-y-1">
                <div className="flex items-center gap-1.5 text-teal-300 font-medium">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>สายด่วน 1441</span>
                </div>
                <p className="text-[11px] text-slate-400">กองบัญชาการตำรวจสืบสวนสอบสวนอาชญากรรมทางเทคโนโลยี (บช.สอท.) ตลอด 24 ชม.</p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-300 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>สายด่วน 1212 ETDA</span>
                </div>
                <p className="text-[11px] text-slate-400">ศูนย์รับเรื่องร้องเรียนปัญหาออนไลน์และคุ้มครองผู้บริโภค</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© 2026 Media Smart – รู้ทันสื่อดิจิทัล. จัดทำขึ้นเพื่อการศึกษาโดยไม่แสวงหากำไร</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-white transition-colors"
            >
              แนวทางการจัดการเรียนรู้สำหรับอาจารย์
            </button>
            <span>·</span>
            <span>ขับเคลื่อนทักษะดิจิทัลแห่งศตวรรษที่ 21</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
