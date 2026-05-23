import { useState } from 'react';
import { BookOpen, Check, Copy, Activity, Thermometer } from 'lucide-react';

export function AdditionalInfo() {
  const [copied, setCopied] = useState(false);

  const dhikrText = "بِسْمِ اللهِ وَاللهُ أَكْبَر، اللَّهُمَّ هَذَا مِنْكَ وَلَك، اللَّهُمَّ تَقَبَّلْ مِنِّي";

  const handleCopy = () => {
    navigator.clipboard.writeText(dhikrText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 mt-6">
      {/* 3. Supplications and Dhikr Section */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
        <h2 className="text-xl font-bold mb-5 text-emerald-800 dark:text-emerald-400 flex items-center gap-2">
          <span className="bg-emerald-100 dark:bg-emerald-900/50 p-2 rounded-lg text-emerald-600 dark:text-emerald-400 font-bold text-base">
            3
          </span>
          دوعا و زیکرەکانی کاتی سەربڕین
        </h2>

        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
            سەربڕینی قوربانی عیبادەتێکی گەورەیە، سوننەتە لە کاتی سەربڕیندا ئەم دوعا و زیکرانە بخوێنرێت بۆ ئەوەی بە تەواوی هاوتای سوننەتی پێغەمبەر (د.خ) بێت:
          </p>

          <div className="bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-right w-full break-words">
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500 block mb-1">دوعا و زیکری سەرەکی (بە عەرەبی):</span>
              <p className="font-serif text-base sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 tracking-wide select-all leading-relaxed" dir="rtl">
                {dhikrText}
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 block leading-relaxed">
                واتە: (بە ناوی خودا، و خودا زۆر گەورەیە. خودایە ئەمە دیاری و بەخششی تۆیە بۆ من و بۆ تۆیە، خودایە لە منی قبوڵ بفەرموو).
              </span>
            </div>
            
            <button
              onClick={handleCopy}
              className="shrink-0 flex items-center gap-2 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs font-medium text-gray-700 dark:text-gray-300 transition cursor-pointer shadow-sm active:scale-95 w-full md:w-auto justify-center"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">کۆپی کرا!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>کۆپی بکە</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-emerald-50/40 dark:bg-emerald-900/5 rounded-xl p-4 border border-emerald-100/60 dark:border-emerald-900/20">
            <h3 className="font-bold text-sm text-emerald-800 dark:text-emerald-400 mb-3 flex items-center gap-2">
              <BookOpen size={16} />
              سوننەت و ئادابە گرنگەکانی کاتی سەربڕین:
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-600 dark:text-gray-300">
              <li className="flex gap-2 items-start bg-white dark:bg-gray-950 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                <span className="text-emerald-500 shrink-0 font-bold">●</span>
                <span>پێویستە لای سەربڕ قوربانییەکە بەرەو ڕووی <strong>قیبلە</strong> بخوێنێت.</span>
              </li>
              <li className="flex gap-2 items-start bg-white dark:bg-gray-950 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                <span className="text-emerald-500 shrink-0 font-bold">●</span>
                <span>پێویستە <strong>چەقۆکە زۆر تیژ بێت</strong> بۆ ئەوەی ئاژەڵەکە ئازاری زۆری پێ نەگات (بەزەیی پێداهاتنەوە).</span>
              </li>
              <li className="flex gap-2 items-start bg-white dark:bg-gray-950 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                <span className="text-emerald-500 shrink-0 font-bold">●</span>
                <span><strong>نابێت چەقۆ لەبەردەم ئاژەڵەکەدا تیژ بکرێت</strong> و نابێت ئاژەڵەکە پێش کاتی خۆی ترس و دڵەڕاوکێی بۆ دروست بکرێت.</span>
              </li>
              <li className="flex gap-2 items-start bg-white dark:bg-gray-950 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                <span className="text-emerald-500 shrink-0 font-bold">●</span>
                <span>سوننەتە خاوەن قوربانی خۆی ئاژەڵەکە سەرببڕێت ئەگەر بزانێت، ئەگەر نا، ئامادەی ڕێوڕەسمەکە بێت.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. Food & Health Preservation Section */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 sm:p-6">
        <h2 className="text-xl font-bold mb-5 text-emerald-800 dark:text-emerald-400 flex items-center gap-2">
          <span className="bg-emerald-100 dark:bg-emerald-900/50 p-2 rounded-lg text-emerald-600 dark:text-emerald-400 font-bold text-base">
            4
          </span>
          ڕێنماییە تەندروستییەکانی هێشتنەوە و پاراستنی گۆشت
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-3.5">
            <div className="flex gap-3 items-start bg-amber-50/40 dark:bg-amber-900/10 border-r-4 border-amber-500 p-3.5 rounded-l-lg text-amber-900 dark:text-amber-400">
              <Thermometer className="shrink-0 text-amber-600 dark:text-amber-500 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs">یاسای فێنککردنەوە (دڵنیابوون لە کوالێتی):</h4>
                <p className="text-xs mt-1 leading-relaxed">
                  نابێت گۆشتی تازە سەربڕاو ڕاستەوخۆ بخرێتە فریزرەوە. پێویستە سەرەتا لایەنی کەم <strong>4 بۆ 6 کاتژمێر</strong> لە شوێنێکی فێنک یان ساردکەرەوەدا (سەلاجە) دابنرێت تا حاڵەتی (Rigor Mortis یان ڕەقبوونی سروشتی) تەواو بێت، ئەمە وادەکات گۆشتەکە نەرم و تامخۆش بێت و بەکتریا تێیدا گەشە نەکات.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 p-3.5 rounded-xl text-gray-700 dark:text-gray-300">
              <Activity className="shrink-0 text-emerald-500 mt-0.5" size={18} />
              <div>
                <h4 className="font-bold text-xs">کەرەستەی خاوێن و پلاستیکی تەندروست:</h4>
                <p className="text-xs mt-1 leading-relaxed">
                  بە هیچ شێوەیەک <strong>کیسی نایلۆنی ڕەش</strong> بۆ دابەشکردن یان هەڵگرتنی گۆشت بەکارمەهێنە، چونکە ماددەی کیمیایی زیانبەخش و ڕیسایکڵکراویان تێدایە. هەمیشە کیسی ڕوون یان دەفری تایبەت بە خۆراک بەکاربهێنە.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3.5">
            <div className="flex gap-3 items-start bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 p-3.5 rounded-xl text-gray-700 dark:text-gray-300">
              <span className="shrink-0 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">
                أ
              </span>
              <div>
                <h4 className="font-bold text-xs">دابەشکردنی لۆژیکی پێش گەرمکردنەوە:</h4>
                <p className="text-xs mt-1 leading-relaxed">
                  گۆشتەکە بە پێی پێویستی هەر ژەمێک بەش بەش بکە پێش بەستن. چونکە دووبارە توانەوەی گۆشتی بەستوو و گەڕاندنەوەی بۆ فریزر دەبێتە هۆی گەشەکردنی بەکتریا و تێکچوونی ڕیشاڵەکانی گۆشتەکە.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 p-3.5 rounded-xl text-gray-700 dark:text-gray-300">
              <span className="shrink-0 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">
                ب
              </span>
              <div>
                <h4 className="font-bold text-xs">خاوێنی لە کاتی کارکردندا:</h4>
                <p className="text-xs mt-1 leading-relaxed">
                  تەختەی وردکردنی گۆشت و چەقۆکان بە بەردەوامی بشۆ، و خۆت بەدوور بگرە لە پێکەوە لکانی گۆشتی کاڵ لەگەڵ خۆراکی تر لەناو سەلاجەدا بۆ ڕێگریکردن لە گواستنەوەی میکرۆب.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
