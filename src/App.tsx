import { Moon, Sun } from 'lucide-react';
import { useQurbaniStore } from './useQurbaniStore';
import { AnimalForm } from './components/AnimalForm';
import { Distribution } from './components/Distribution';
import { RecipientList } from './components/RecipientList';
import { ExpenseTracker } from './components/ExpenseTracker';
import { ShariaGuidelines } from './components/ShariaGuidelines';
import { AdditionalInfo } from './components/AdditionalInfo';

export default function App() {
  const { state, updateState, toggleDarkMode } = useQurbaniStore();

  const handleAddRecipient = (recipient: any) => {
    updateState({
      recipients: [...state.recipients, { ...recipient, id: Math.random().toString(36).substring(2, 9) }],
    });
  };

  const handleUpdateRecipientStatus = (id: string, newStatus: string) => {
    updateState({
      recipients: state.recipients.map((r) => (r.id === id ? { ...r, status: newStatus as any } : r)),
    });
  };

  const handleRemoveRecipient = (id: string) => {
    updateState({
      recipients: state.recipients.filter((r) => r.id !== id),
    });
  };

  const handleAddExpense = (expense: any) => {
    updateState({
      expenses: [...state.expenses, { ...expense, id: Math.random().toString(36).substring(2, 9) }],
    });
  };

  const handleRemoveExpense = (id: string) => {
    updateState({
      expenses: state.expenses.filter((e) => e.id !== id),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <header className="flex items-start justify-between mb-8 md:mb-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center mb-2">
              <img src="/logo-dark.png" alt="964" className="block dark:hidden w-32 md:w-40 h-auto" />
              <img src="/logo-light.png" alt="964" className="hidden dark:block w-32 md:w-40 h-auto" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                کاری قوربانییەکەت ئاسان بکە
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">ڕێکخستن، حیسابکردن و دابەشکردن بەپێی بنەما شەرعییەکان</p>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition cursor-pointer"
            aria-label="Toggle Dark Mode"
          >
            {state.darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </header>

        <main className="space-y-6">
          <AnimalForm 
            type={state.animalType} 
            weight={state.totalWeight} 
            onUpdate={updateState} 
          />

          {state.totalWeight > 0 && (
            <>
              <Distribution totalWeight={state.totalWeight} />

              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-6">
                <h2 className="text-xl font-bold mb-6 text-primary-800 dark:text-primary-400 flex items-center gap-2">
                  <span className="bg-primary-100 dark:bg-primary-900/50 p-2 rounded-lg text-primary-600 dark:text-primary-400">3</span>
                  بەڕێوەبردنی لیستەکان و چاودێری گەیاندن
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <RecipientList
                    listType="poor"
                    title="لیستی هەژاران و نەداران"
                    recipients={state.recipients}
                    maxWeight={state.totalWeight / 3}
                    onAdd={handleAddRecipient}
                    onUpdateStatus={handleUpdateRecipientStatus}
                    onRemove={handleRemoveRecipient}
                  />
                  <RecipientList
                    listType="relative"
                    title="لیستی خزم و هاوسێیان"
                    recipients={state.recipients}
                    maxWeight={state.totalWeight / 3}
                    onAdd={handleAddRecipient}
                    onUpdateStatus={handleUpdateRecipientStatus}
                    onRemove={handleRemoveRecipient}
                  />
                </div>
              </div>

              <ExpenseTracker
                expenses={state.expenses}
                onAdd={handleAddExpense}
                onRemove={handleRemoveExpense}
              />
            </>
          )}

          <ShariaGuidelines selectedType={state.animalType} />
          <AdditionalInfo />
        </main>
      </div>
    </div>
  );
}
