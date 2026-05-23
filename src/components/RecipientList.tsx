import { useState } from 'react';
import { Plus, Trash2, Minus } from 'lucide-react';
import { Recipient, ListType, DeliveryStatus } from '../types';

interface Props {
  listType: ListType;
  title: string;
  recipients: Recipient[];
  maxWeight: number;
  onAdd: (recipient: Omit<Recipient, 'id'>) => void;
  onUpdateStatus: (id: string, newStatus: DeliveryStatus) => void;
  onRemove: (id: string) => void;
}

export function RecipientList({ listType, title, recipients, maxWeight, onAdd, onUpdateStatus, onRemove }: Props) {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState<number | ''>('');

  const currentList = recipients.filter(r => r.listType === listType);
  
  // Using toFixed(2) to prevent float precision issues like 33.333333...
  const totalDistributed = Number(currentList.reduce((sum, r) => sum + r.weight, 0).toFixed(2));
  const roundedMaxWeight = Number(maxWeight.toFixed(2));
  const remaining = Math.max(0, roundedMaxWeight - totalDistributed);
  
  const progressPercent = roundedMaxWeight > 0 ? Math.min(100, (totalDistributed / roundedMaxWeight) * 100) : 0;
  
  const requestedWeight = Number(weight) || 0;
  // Check if adding this weight will exceed max weight
  const willExceed = requestedWeight > 0 && Number((totalDistributed + requestedWeight).toFixed(2)) > roundedMaxWeight;
  const isOverLimit = totalDistributed > roundedMaxWeight;

  const handleAdd = () => {
    if (!name.trim() || requestedWeight <= 0) return;
    if (willExceed) return;

    onAdd({
      name: name.trim(),
      weight: requestedWeight,
      status: 'pending',
      listType
    });
    setName('');
    setWeight('');
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 flex flex-col h-full">
      <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">{title}</h3>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600 dark:text-gray-400">دابەشکراو: <span className="font-bold text-gray-900 dark:text-white">{totalDistributed.toFixed(2)} kg</span></span>
          <span className="text-gray-600 dark:text-gray-400">ماوە: <span className="font-bold text-gray-900 dark:text-white">{remaining.toFixed(2)} kg</span></span>
        </div>
        <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ease-out ${isOverLimit ? 'bg-red-500' : 'bg-primary-500'}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {isOverLimit && <p className="text-xs text-red-500 mt-2 font-medium">تێپەڕاندن لە سێیەکی دیاریکراو ڕوویداوە!</p>}
      </div>

      {/* Add Form */}
      <div className="flex flex-col gap-3 mb-6">
        <input
          type="text"
          placeholder="ناوی کەس یان خێزان..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
        />
        <div className="flex gap-2">
          <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-1 flex-1">
            <button
              onClick={() => setWeight(Math.max(0.5, requestedWeight - 0.5))}
              className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition shrink-0"
              type="button"
            >
              <Minus size={18} />
            </button>
            <div className="relative flex-1">
              <input
                type="number"
                min={0.1}
                step={0.5}
                placeholder="کێش"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value) || '')}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                className={`w-full bg-transparent text-center text-sm text-gray-900 dark:text-white focus:outline-none py-1.5 ${willExceed ? 'text-red-500' : ''}`}
                dir="ltr"
              />
              <span className="absolute right-1 top-1/2 -translate-y-1/2 text-xs text-gray-400">kg</span>
            </div>
            <button
              onClick={() => setWeight(requestedWeight + 0.5)}
              className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition shrink-0"
              type="button"
            >
              <Plus size={18} />
            </button>
          </div>
          <button
            onClick={handleAdd}
            disabled={!name.trim() || requestedWeight <= 0 || willExceed}
            className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:dark:bg-gray-700 text-white px-4 py-2.5 rounded-xl transition flex items-center justify-center shrink-0 font-medium text-sm"
          >
            زیادکردن
          </button>
        </div>
        {willExceed && (
          <p className="text-xs text-red-500 font-medium px-1">بڕی دیاریکراو لە کێشی ماوە زیاترە!</p>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto min-h-[200px] pr-1 space-y-3">
        {currentList.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-600">
            <p className="text-sm">هیچ ناوێک تۆمار نەکراوە</p>
          </div>
        ) : (
          currentList.map((item) => {
            return (
              <div key={item.id} className="group border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-xl p-3 flex items-center justify-between hover:shadow-sm transition">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-50 dark:bg-gray-800 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm text-gray-700 dark:text-gray-300">
                    {item.weight}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white">{item.name}</h4>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex bg-gray-50 dark:bg-gray-800 p-1 rounded-lg">
                    <button
                      onClick={() => onUpdateStatus(item.id, 'pending')}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${item.status === 'pending' ? 'bg-amber-100 text-amber-800 shadow-sm dark:bg-amber-900/50 dark:text-amber-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                    >
                      چاوەڕوانە
                    </button>
                    <button
                      onClick={() => onUpdateStatus(item.id, 'delivered')}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${item.status === 'delivered' ? 'bg-primary-100 text-primary-800 shadow-sm dark:bg-primary-900/50 dark:text-primary-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                    >
                      گەیەندرا
                    </button>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 p-1.5 rounded-lg transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
