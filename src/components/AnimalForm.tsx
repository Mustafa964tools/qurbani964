import { ShieldAlert, HeartPulse, CheckCircle2, Minus, Plus } from 'lucide-react';
import { AnimalType, ANIMAL_SPECS } from '../types';

interface Props {
  type: AnimalType;
  partners: number;
  weight: number;
  onUpdate: (updates: Partial<{ animalType: AnimalType; partners: number; totalWeight: number }>) => void;
}

export function AnimalForm({ type, partners, weight, onUpdate }: Props) {
  const currentSpec = ANIMAL_SPECS[type];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-6">
      <h2 className="text-xl font-bold mb-6 text-primary-800 dark:text-primary-400 flex items-center gap-2">
        <span className="bg-primary-100 dark:bg-primary-900/50 p-2 rounded-lg text-primary-600 dark:text-primary-400">١</span>
        هەڵبژاردنی جۆری ئاژەڵ و ڕێکخستن
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {(Object.entries(ANIMAL_SPECS) as [AnimalType, typeof currentSpec][]).map(([key, spec]) => (
          <button
            key={key}
            onClick={() => onUpdate({ animalType: key })}
            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
              type === key
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                : 'border-gray-100 bg-white text-gray-600 hover:border-primary-200 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400 dark:hover:border-gray-700'
            }`}
          >
            <span className="text-3xl">{spec.icon}</span>
            <span className="font-semibold">{spec.name}</span>
            <span className={`text-xs mt-1 px-2 py-0.5 rounded-md ${type === key ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/40 dark:text-primary-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}`}>
              {spec.maxPartners === 1 ? 'بێ شەریک' : `تا ${spec.maxPartners} شەریک`}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border-r-4 border-amber-500 p-4 rounded-l-lg mb-6 flex gap-3 text-amber-800 dark:text-amber-400">
        <ShieldAlert className="shrink-0" />
        <div>
          <p className="font-bold text-sm">تەمەنی شەرعی بۆ ({currentSpec.name}):</p>
          <p className="text-sm mt-1">{currentSpec.minAge}</p>
        </div>
      </div>

      <div className="mb-6 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 flex items-center gap-3 border-b border-gray-200 dark:border-gray-800">
          <HeartPulse className="text-rose-500 w-5 h-5" />
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">مەرجەکانی ساغی و دروستی ئاژەڵ</h3>
        </div>
        <div className="p-4 bg-white dark:bg-gray-900">
          <ul className="space-y-3">
            {[
              'نابێت کوێر بێت (جا یەک چاوی بێت یان هەردووکی).',
              'نابێت شەل بێت بە جۆرێک نەتوانێت لەگەڵ مێگەل بڕوات.',
              'نابێت زۆر لاواز و بێ هێز بێت کە گۆشتی پێوە نەمابێت.',
              'نابێت نەخۆشییەکی ئاشکرای هەبێت کە بە ڕوونی پێوەی دیار بێت.',
              'نابێت قۆچ یان گوێی بە بڕێکی زۆر (زیاتر لە سێیەک) بڕابێت یان شکابێت.'
            ].map((condition, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-gray-700 dark:text-gray-300 items-start">
                <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{condition}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            ژمارەی شەریکەکان
          </label>
          <input
            type="number"
            min={1}
            max={currentSpec.maxPartners}
            value={partners}
            onChange={(e) => {
              const val = Math.min(Math.max(1, parseInt(e.target.value) || 1), currentSpec.maxPartners);
              onUpdate({ partners: val });
            }}
            disabled={currentSpec.maxPartners === 1}
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition disabled:opacity-60 disabled:cursor-not-allowed"
          />
          {currentSpec.maxPartners === 1 ? (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">ئەم ئاژەڵە تەنها بۆ ١ پشکە و شەریکی تێدا نابێت.</p>
          ) : (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">ئەم ئاژەڵە دەتوانرێت تا {currentSpec.maxPartners} شەریک بەشداری تێدا بکات.</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            کۆی کێشی گۆشتی سافی (بە کیلۆگرام)
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdate({ totalWeight: Math.max(0, (weight || 0) - 1) })}
              className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 p-3 rounded-xl transition cursor-pointer shrink-0"
              type="button"
            >
              <Minus size={20} />
            </button>
            <div className="relative flex-1">
              <input
                type="number"
                min={0}
                step={0.5}
                value={weight || ''}
                onChange={(e) => onUpdate({ totalWeight: parseFloat(e.target.value) || 0 })}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-2 text-center py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
                placeholder="١٥٠"
                dir="ltr"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">kg</span>
            </div>
            <button
              onClick={() => onUpdate({ totalWeight: (weight || 0) + 1 })}
              className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 p-3 rounded-xl transition cursor-pointer shrink-0"
              type="button"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
