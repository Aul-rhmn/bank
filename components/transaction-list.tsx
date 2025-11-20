'use client';

interface Transaction {
  id: string;
  type: string;
  amount: number;
  transaction_date: string;
  starting_balance: number;
  ending_balance: number;
  months_duration: number;
}

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        No transactions yet. Create one to get started!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="text-left py-2 px-2 font-semibold text-slate-900 dark:text-white">Date</th>
            <th className="text-left py-2 px-2 font-semibold text-slate-900 dark:text-white">Type</th>
            <th className="text-right py-2 px-2 font-semibold text-slate-900 dark:text-white">Amount</th>
            <th className="text-right py-2 px-2 font-semibold text-slate-900 dark:text-white">Starting</th>
            <th className="text-right py-2 px-2 font-semibold text-slate-900 dark:text-white">Ending</th>
            <th className="text-center py-2 px-2 font-semibold text-slate-900 dark:text-white">Months</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr
              key={tx.id}
              className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              <td className="py-2 px-2 text-slate-600 dark:text-slate-300">
                {new Date(tx.transaction_date).toLocaleDateString('id-ID')}
              </td>
              <td className="py-2 px-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  tx.type === 'deposit'
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                }`}>
                  {tx.type.toUpperCase()}
                </span>
              </td>
              <td className="py-2 px-2 text-right text-slate-900 dark:text-white font-medium">
                Rp {tx.amount.toLocaleString('id-ID')}
              </td>
              <td className="py-2 px-2 text-right text-slate-600 dark:text-slate-300">
                Rp {tx.starting_balance.toLocaleString('id-ID')}
              </td>
              <td className="py-2 px-2 text-right font-semibold text-emerald-600 dark:text-emerald-400">
                Rp {tx.ending_balance.toLocaleString('id-ID')}
              </td>
              <td className="py-2 px-2 text-center text-slate-600 dark:text-slate-300">
                {tx.months_duration}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
