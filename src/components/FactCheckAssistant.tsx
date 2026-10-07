import React, { useState } from 'react';
import { Search, AlertCircle, CheckCircle, ShieldAlert, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

interface AnalysisResult {
  score: number; // 0 (very risky) to 100 (safe)
  riskLevel: 'high' | 'medium' | 'low';
  flags: {
    type: 'warning' | 'info' | 'danger';
    title: string;
    description: string;
  }[];
  recommendations: string[];
}

export const FactCheckAssistant: React.FC<{ onNavigateToSimulation?: () => void }> = ({ onNavigateToSimulation }) => {
  const [inputText, setInputText] = useState('');
  const [analyzed, setAnalyzed] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const presets = [
    {
      label: 'ลิงก์แจกเงินนักศึกษา 5,000 บ.',
      text: 'ด่วนมาก! รัฐบาลอนุมัติเงินเยียวยานักศึกษา 5,000 บาท ทุกชั้นปี ลงทะเบียนก่อน 18:00 น. วันนี้ที่ https://gov-student-grant2026.xyz กรอกเลขบัตรประชาชนและ OTP รับเงินทันที'
    },
    {
      label: 'งานกดรับออเดอร์ วันละ 2,500 บ.',
      text: 'รับสมัครนักศึกษาทำงานพาร์ทไทม์ที่หอพัก คอนเฟิร์มออเดอร์ วันละ 800 - 2,500 บาท มีใบอนุญาตพาณิชย์ แอดไลน์ @job_easy2026 ด่วน รับจำกัด 15 คน'
    },
    {
      label: 'ข่าวแอบอ้างอธิการบดียกเลิกสอบ',
      text: 'ช็อกทั้งมหาลัย! คลิปอธิการบดีประกาศลดค่าเทอม 50% และยกเลิกการสอบปลายภาคเปลี่ยนเป็นงานกลุ่ม แหล่งข่าววงในยืนยัน ช่วยกันแชร์ก่อนโดนสั่งลบคลิป'
    },
    {
      label: 'ประกาศทางการของมหาวิทยาลัย',
      text: 'ประกาศมหาวิทยาลัย เรื่อง กำหนดการลงทะเบียนเรียนภาคการศึกษาที่ 2/2568 สามารถตรวจสอบรายวิชาได้ที่ reg.university.ac.th ตั้งแต่วันที่ 15 พ.ย. เป็นต้นไป ติดต่อสอบถามสำนักทะเบียน โทร 02-XXX-XXXX'
    }
  ];

  const handleAnalyze = () => {
    if (!inputText.trim()) return;

    const lower = inputText.toLowerCase();
    const flags: AnalysisResult['flags'] = [];
    const recommendations: string[] = [];
    let riskScore = 80;

    // Trigger word checks
    const urgencyWords = ['ด่วน', 'ด่วนที่สุด', 'ก่อนโดนลบ', 'วงใน', 'ช็อก', 'แชร์ก่อนสาย', 'ห้ามบอกใคร'];
    const hasUrgency = urgencyWords.some((w) => lower.includes(w));
    if (hasUrgency) {
      riskScore -= 25;
      flags.push({
        type: 'danger',
        title: 'พบคำกระตุ้นความเร่งด่วนและอารมณ์ตกใจ (Urgency Bias)',
        description: 'การใช้คำว่า "ด่วนที่สุด", "ก่อนโดนลบ", หรือ "ช็อก" เป็นจิตวิทยามืดที่มักพบในข่าวลือและกลลวงเพื่อบีบให้แชร์ทันที'
      });
      recommendations.push('สูดหายใจลึกๆ อย่าเพิ่งกดแชร์ ให้หยุดรออย่างน้อย 5-10 นาทีเพื่อค้นหาความจริง');
    }

    // Scam and credential words
    const scamWords = ['otp', 'บัตรประชาชน', 'โอนเงิน', 'สำรองจ่าย', 'คอนเฟิร์มออเดอร์', 'งานพาร์ทไทม์', 'รายได้วันละ', 'แจกเงิน'];
    const hasScamLure = scamWords.some((w) => lower.includes(w));
    if (hasScamLure) {
      riskScore -= 30;
      flags.push({
        type: 'danger',
        title: 'พบข้อความเกี่ยวกับเงินรางวัล สิทธิประโยชน์ หรือการขอรหัสลับ',
        description: 'มีการกล่าวถึงการรับเงิน ค่าตอบแทน หรือการขอข้อมูลสำคัญ (เช่น OTP, บัตร ปชช., บัญชีธนาคาร) ซึ่งเป็นรูปแบบหลักของ Phishing และ Task Scam'
      });
      recommendations.push('ห้ามกรอกรหัส OTP หรือโอนเงินค่าธรรมเนียมใดๆ หน่วยงานรัฐและบริษัทที่ถูกกฎหมายไม่มีนโยบายลักษณะนี้');
    }

    // Suspicious links
    const hasHttp = lower.includes('http') || lower.includes('.xyz') || lower.includes('.cc') || lower.includes('.top') || lower.includes('line.me') || lower.includes('@');
    if (hasHttp) {
      if (lower.includes('.xyz') || lower.includes('.cc') || lower.includes('.top')) {
        riskScore -= 30;
        flags.push({
          type: 'danger',
          title: 'ตรวจพบโดเมนเว็บไซต์ความเสี่ยงสูง (.xyz, .cc)',
          description: 'โดเมนเหล่านี้มักถูกจดทะเบียนโดยมิจฉาชีพ เว็บไซต์ราชการไทยของจริงต้องลงท้ายด้วย .go.th หรือสถาบันการศึกษา .ac.th เท่านั้น'
        });
      } else if (lower.includes('.go.th') || lower.includes('.ac.th') || lower.includes('.or.th')) {
        riskScore += 20;
        flags.push({
          type: 'info',
          title: 'พบโดเมนสถาบันทางการ (.go.th / .ac.th)',
          description: 'เป็นโดเมนที่มีการตรวจสอบองค์กร แต่ยังควรเปิดดูหน้าเว็บไซต์จริงเพื่อป้องกันการแอบอ้างข้อความ'
        });
      }
    }

    // Missing source citations
    if (!lower.includes('แถลงการณ์') && !lower.includes('ประกาศ') && !lower.includes('รายงานโดย') && !lower.includes('.ac.th') && !lower.includes('.go.th')) {
      riskScore -= 15;
      flags.push({
        type: 'warning',
        title: 'ไม่มีการอ้างอิงหน่วยงานหรือเอกสารต้นทางที่ชัดเจน',
        description: 'ข้อความขาดการระบุชื่อโฆษก เลขที่คำสั่ง หรือลิงก์เอกสารปฐมภูมิ มักเป็นการบอกเล่าต่อแบบไม่มีหลักฐาน'
      });
      recommendations.push('ค้นหาชื่อประเด็นนี้ใน Google ร่วมกับคำว่า "ชัวร์ก่อนแชร์" หรือ "แถลงการณ์"');
    }

    const finalScore = Math.max(5, Math.min(95, riskScore));
    let riskLevel: AnalysisResult['riskLevel'] = 'medium';
    if (finalScore < 40) riskLevel = 'high';
    else if (finalScore >= 75) riskLevel = 'low';

    if (recommendations.length === 0) {
      recommendations.push('ข้อความนี้มีโครงสร้างเป็นทางการ แต่ยังคงแนะนำให้ตรวจสอบวันที่และบริบทจริงก่อนนำไปใช้อ้างอิง');
    }

    setResult({
      score: finalScore,
      riskLevel,
      flags,
      recommendations
    });
    setAnalyzed(true);
  };

  const handleReset = () => {
    setInputText('');
    setAnalyzed(false);
    setResult(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
      <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>เครื่องมือจำลองวิเคราะห์ความน่าสงสัย</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              กล่องตรวจจับสัญญาณพิรุธ (Red Flag Detector)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              พิมพ์ข้อความ พาดหัวข่าว หรือเลือกลองกรณีศึกษาจำลองเพื่อวิเคราะห์กลลวงจิตวิทยาและโดเมนปลอม
            </p>
          </div>

          {onNavigateToSimulation && (
            <button
              onClick={onNavigateToSimulation}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-medium rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto border border-transparent dark:border-slate-700"
            >
              <span>ไปห้องสืบสวนคดีจริง</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Preset Selector */}
        <div className="mt-6">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block mb-2">
            ตัวอย่างกรณีที่พบบ่อยในหมู่นักศึกษา:
          </span>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputText(preset.text);
                  setAnalyzed(false);
                  setResult(null);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-slate-700 hover:text-teal-800 dark:hover:text-teal-300 text-slate-700 dark:text-slate-300 transition-colors text-left border border-transparent dark:border-slate-700"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Text Input Area */}
        <div className="mt-4">
          <textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              if (analyzed) setAnalyzed(false);
            }}
            placeholder="วางข้อความ โพสต์โซเชียล หรือลิงก์ที่สงสัยที่นี่..."
            rows={3}
            className="w-full p-3.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-slate-800 dark:text-slate-100 bg-slate-50/50 dark:bg-slate-800/50"
          />

          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {inputText.length > 0 ? `${inputText.length} ตัวอักษร` : 'ลองคลิกตัวอย่างด้านบนหรือพิมพ์เอง'}
            </span>
            <div className="flex items-center gap-2">
              {analyzed && (
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  ล้างข้อมูล
                </button>
              )}
              <button
                onClick={handleAnalyze}
                disabled={!inputText.trim()}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-medium rounded-lg transition-colors shadow-xs"
              >
                <Search className="w-3.5 h-3.5" />
                <span>วิเคราะห์สัญญาณพิรุธ</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Output */}
      {analyzed && result && (
        <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white ${
                  result.riskLevel === 'high'
                    ? 'bg-rose-600'
                    : result.riskLevel === 'medium'
                    ? 'bg-amber-500'
                    : 'bg-emerald-600'
                }`}
              >
                {result.riskLevel === 'high' ? (
                  <ShieldAlert className="w-6 h-6" />
                ) : result.riskLevel === 'medium' ? (
                  <AlertCircle className="w-6 h-6" />
                ) : (
                  <CheckCircle className="w-6 h-6" />
                )}
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500">ระดับความเสี่ยงที่ตรวจพบ</div>
                <div className="text-lg font-bold text-slate-900">
                  {result.riskLevel === 'high' && 'ความเสี่ยงสูงมาก (น่าจะเป็นข่าวลือ/หลอกลวง)'}
                  {result.riskLevel === 'medium' && 'ความเสี่ยงปานกลาง (มีจุดน่าสงสัย ต้องตรวจสอบ)'}
                  {result.riskLevel === 'low' && 'ความเสี่ยงต่ำ (มีลักษณะเป็นทางการ)'}
                </div>
              </div>
            </div>

            <div className="sm:text-right">
              <span className="text-xs text-slate-500 block">ดัชนีความน่าเชื่อถือเบื้องต้น</span>
              <span className="text-2xl font-bold tabular-nums text-slate-800">
                {result.score}/100
              </span>
            </div>
          </div>

          {/* Flags Detected */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              จุดสังเกตและข้อควรระวัง ({result.flags.length} รายการ)
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {result.flags.map((flag, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                    flag.type === 'danger'
                      ? 'bg-rose-50/70 border-rose-200 text-rose-900'
                      : flag.type === 'warning'
                      ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                      : 'bg-blue-50/70 border-blue-200 text-blue-900'
                  }`}
                >
                  <div className="font-semibold text-sm mb-1">{flag.title}</div>
                  <div className="opacity-90">{flag.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200 text-teal-950 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-xs text-teal-800 uppercase tracking-wider">
              <CheckCircle className="w-4 h-4 text-teal-600" />
              <span>คำแนะนำสำหรับการลงมือตรวจสอบ (Actionable Tips)</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside">
              {result.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
