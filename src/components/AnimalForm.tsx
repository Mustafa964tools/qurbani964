import { Minus, Plus } from 'lucide-react';
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
        <span className="bg-primary-100 dark:bg-primary-900/50 p-2 rounded-lg text-primary-600 dark:text-primary-400">1</span>
        هەڵبژاردنی جۆری ئاژەڵ و ڕێکخستن
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {(Object.entries(ANIMAL_SPECS) as [AnimalType, typeof currentSpec][]).map(([key, spec]) => (
          <button
            key={key}
            onClick={() => onUpdate({ animalType: key })}
            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 cursor-pointer ${
              type === key
                ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                : 'border-gray-100 bg-white text-gray-600 hover:border-primary-200 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400 dark:hover:border-gray-700'
            }`}
          >
            <span className="text-3xl">{spec.icon}</span>
            <span className="font-semibold">{spec.name}</span>
            <span className={`text-xs mt-1 px-2 py-0.5 rounded-md ${type === key ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/40 dark:text-primary-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}`}>
              {spec.maxPartners === 1 ? 'بۆ یەک کەس' : `تا ${spec.maxPartners} شەریک`}
            </span>
          </button>
        ))}
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
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">ئەم ئاژەڵە تەنها بۆ 1 پشکە و شەریکی تێدا نابێت.</p>
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
                placeholder="150"
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
