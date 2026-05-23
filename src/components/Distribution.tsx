export function Distribution({ totalWeight }: { totalWeight: number }) {
  const third = (totalWeight / 3).toFixed(2);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 mb-6">
      <h2 className="text-xl font-bold mb-6 text-primary-800 dark:text-primary-400 flex items-center gap-2">
        <span className="bg-primary-100 dark:bg-primary-900/50 p-2 rounded-lg text-primary-600 dark:text-primary-400">2</span>
        حیسابکەری دابەشکردنی گۆشت (یاسای 1/3)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-xl p-5 text-center">
          <h3 className="font-semibold text-green-800 dark:text-green-400 mb-2">سێیەکی یەکەم</h3>
          <p className="text-sm text-green-600 dark:text-green-500 mb-3">بۆ هەژاران و نەداران</p>
          <div className="text-3xl font-bold text-green-700 dark:text-green-300 flex items-center justify-center gap-1">
            {third} <span className="text-base font-normal">kg</span>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-5 text-center">
          <h3 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">سێیەکی دووەم</h3>
          <p className="text-sm text-blue-600 dark:text-blue-500 mb-3">بۆ خزم، دۆستان و هاوسێیان</p>
          <div className="text-3xl font-bold text-blue-700 dark:text-blue-300 flex items-center justify-center gap-1">
            {third} <span className="text-base font-normal">kg</span>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-xl p-5 text-center">
          <h3 className="font-semibold text-purple-800 dark:text-purple-400 mb-2">سێیەکی سێیەم</h3>
          <p className="text-sm text-purple-600 dark:text-purple-500 mb-3">بۆ خاوەن قوربانی و خێزانەکەی</p>
          <div className="text-3xl font-bold text-purple-700 dark:text-purple-300 flex items-center justify-center gap-1">
            {third} <span className="text-base font-normal">kg</span>
          </div>
        </div>
      </div>
    </div>
  );
}
