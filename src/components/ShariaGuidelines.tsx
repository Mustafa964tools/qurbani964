import { ShieldAlert, HeartPulse, CheckCircle2, AlertTriangle } from 'lucide-react';
import { AnimalType, ANIMAL_SPECS } from '../types';

interface Props {
  selectedType: AnimalType;
}

export function ShariaGuidelines({ selectedType }: Props) {
  const currentSpec = ANIMAL_SPECS[selectedType];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mt-8">
      <h2 className="text-xl font-bold mb-6 text-emerald-800 dark:text-emerald-400 flex items-center gap-2">
        <span className="bg-emerald-100 dark:bg-emerald-900/50 p-2 rounded-lg text-emerald-600 dark:text-emerald-400">
          <HeartPulse size={20} />
        </span>
        بنەما و ڕێنماییە شەرعییەکانی قوربانی
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side: Age limit and Soundness check */}
        <div className="space-y-4">
          <div className="bg-amber-50 dark:bg-amber-900/10 border-r-4 border-amber-500 p-4 rounded-l-lg flex gap-3 text-amber-800 dark:text-amber-400">
            <ShieldAlert className="shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">تەمەنی شەرعی دیاریکراو بۆ ئاژەڵی هەڵبژێردراو ({currentSpec.name}):</p>
              <p className="text-sm mt-1 font-medium">{currentSpec.minAge}</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/40 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              مەرجەکانی ساغی و دروستی ئاژەڵ
            </h3>
            <ul className="space-y-2.5">
              {[
                'نابێت کوێر بێت (جا یەک چاوی بێت یان هەردووکی).',
                'نابێت شەل بێت بە جۆرێک نەتوانێت لەگەڵ مێگەل بڕوات.',
                'نابێت زۆر لاواز و بێ هێز بێت کە گۆشتی پێوە نەمابێت.',
                'نابێت نەخۆشییەکی ئاشکرای هەبێت کە بە ڕوونی پێوەی دیار بێت.',
                'نابێت قۆچ یان گوێی بە بڕێکی زۆر (زیاتر لە سێیەک) بڕابێت یان شکابێت.'
              ].map((condition, idx) => (
                <li key={idx} className="flex gap-2.5 text-xs text-gray-600 dark:text-gray-300 items-start">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{condition}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: General Rules Summary */}
        <div className="space-y-4">
          <div className="bg-emerald-50/50 dark:bg-emerald-900/5 border border-emerald-100 dark:border-emerald-800/50 rounded-xl p-4">
            <h3 className="font-bold text-sm text-emerald-800 dark:text-emerald-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              تەمەنی شەرعی بۆ ئاژەڵەکانی تر بۆ بەرچاوڕوونی:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {Object.entries(ANIMAL_SPECS).map(([key, spec]) => (
                <div key={key} className="p-2.5 bg-white dark:bg-gray-950 rounded-lg border border-gray-100 dark:border-gray-800">
                  <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <span>{spec.icon}</span>
                    <span>{spec.name}</span>
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">{spec.minAge}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-rose-50/50 dark:bg-rose-950/20 border-r-4 border-rose-500 p-4 rounded-l-lg flex gap-3 text-rose-800 dark:text-rose-400">
            <AlertTriangle className="shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">ئاگاداری گرنگی شەرعی:</p>
              <ul className="list-disc list-inside space-y-1 text-xs mt-1.5 text-rose-700 dark:text-rose-300">
                <li>نابێت هیچ بەشێک لە گۆشت یان پێستی قوربانییەکە بفرۆشرێت.</li>
                <li>نابێت حەقدەست یان کرێی قەساب لە گۆشتی قوربانییەکە بدرێت.</li>
                <li>پێویستە دابەشکردنەکە بەسەر سێ بەشی سەرەکیدا بێت ئەگەر گونجا.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
