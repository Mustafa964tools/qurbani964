import { useState } from 'react';
import { Calculator, Plus, Trash2 } from 'lucide-react';
import { Expense } from '../types';

interface Props {
  expenses: Expense[];
  partners: number;
  onAdd: (expense: Omit<Expense, 'id'>) => void;
  onRemove: (id: string) => void;
}

export function ExpenseTracker({ expenses, partners, onAdd, onRemove }: Props) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | ''>('');

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const perPartner = partners > 0 ? totalExpense / partners : totalExpense;

  const handleAdd = () => {
    if (!description.trim() || !amount || amount <= 0) return;
    onAdd({
      description: description.trim(),
      amount: Number(amount),
    });
    setDescription('');
    setAmount('');
  };

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat('en-IQ').format(num);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-6">
      <h2 className="text-xl font-bold mb-6 text-primary-800 dark:text-primary-400 flex items-center gap-2">
        <span className="bg-primary-100 dark:bg-primary-900/50 p-2 rounded-lg text-primary-600 dark:text-primary-400">4</span>
        حیسابکەری خەرجییەکان
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              placeholder="جۆری خەرجی (نموونە: حەقدەستی قەساب)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none w-full"
            />
            <div className="relative w-full sm:w-36 shrink-0">
              <input
                type="number"
                min={0}
                placeholder="بڕەکەی"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || '')}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl ps-4 pe-10 py-3 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">دینار</span>
            </div>
            <button
              onClick={handleAdd}
              disabled={!description.trim() || !amount}
              className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:dark:bg-gray-700 text-white p-3 rounded-xl transition flex items-center justify-center shrink-0 w-full sm:w-auto cursor-pointer"
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {expenses.length === 0 ? (
              <p className="text-gray-400 dark:text-gray-600 text-sm text-center py-4">هیچ خەرجییەک تۆمار نەکراوە.</p>
            ) : (
              expenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{expense.description}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{formatMoney(expense.amount)} دینار</span>
                    <button onClick={() => onRemove(expense.id)} className="text-gray-400 hover:text-red-500 transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-white dark:bg-gray-900 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <Calculator className="text-gray-600 dark:text-gray-400" />
            </div>
            <h3 className="font-bold text-gray-800 dark:text-gray-200">پوختەی خەرجییەکان</h3>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">کۆی گشتی خەرجییەکان:</span>
              <span className="font-bold text-xl text-gray-900 dark:text-white">{formatMoney(totalExpense)} دینار</span>
            </div>
            
            {partners > 1 && (
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-600 dark:text-gray-400">پشکی هەر شەریکێک ({partners}):</span>
                <span className="font-bold text-xl text-primary-600 dark:text-primary-400">{formatMoney(Math.round(perPartner))} دینار</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
