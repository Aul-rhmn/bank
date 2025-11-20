import { ArrowDownRight, ArrowUpLeft } from 'lucide-react'

interface Transaction {
  id: string
  type: 'DEPOSIT' | 'WITHDRAWAL'
  amount: number
  account_number: string
  customer_name: string
  transaction_date: string
  starting_balance: number
  ending_balance: number
  months_held: number
}

interface TransactionHistoryProps {
  transactions: Transaction[]
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-border">
        <p className="text-slate-600">No transactions yet.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Account</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Starting Balance</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Ending Balance</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Months Held</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b border-border hover:bg-slate-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {t.type === 'DEPOSIT' ? (
                      <>
                        <ArrowDownRight className="w-4 h-4 text-secondary" />
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-xs font-medium">
                          {t.type}
                        </span>
                      </>
                    ) : (
                      <>
                        <ArrowUpLeft className="w-4 h-4 text-primary" />
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-xs font-medium">
                          {t.type}
                        </span>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-sm">{t.account_number}</td>
                <td className="px-6 py-4">{t.customer_name}</td>
                <td className="px-6 py-4 font-semibold">Rp {t.amount.toLocaleString('id-ID')}</td>
                <td className="px-6 py-4">Rp {t.starting_balance.toLocaleString('id-ID')}</td>
                <td className="px-6 py-4 font-semibold text-primary">
                  Rp {t.ending_balance.toLocaleString('id-ID')}
                </td>
                <td className="px-6 py-4">{t.months_held} months</td>
                <td className="px-6 py-4 text-sm">
                  {new Date(t.transaction_date).toLocaleDateString('id-ID')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
