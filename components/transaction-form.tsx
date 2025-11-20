'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface TransactionFormProps {
  accountId: string;
  currentBalance: number;
  monthlyReturn: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export function TransactionForm({
  accountId,
  currentBalance,
  monthlyReturn,
  onSuccess,
  onCancel,
}: TransactionFormProps) {
  const [formData, setFormData] = useState({
    type: 'deposit',
    amount: '',
    transaction_date: new Date().toISOString().split('T')[0],
    months_duration: '',
  });
  const [endingBalance, setEndingBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateEndingBalance = () => {
    const amount = parseFloat(formData.amount);
    const months = parseInt(formData.months_duration) || 0;

    if (formData.type === 'deposit') {
      const ending = currentBalance + amount + (amount * months * (monthlyReturn / 100));
      setEndingBalance(ending);
    } else {
      if (amount > currentBalance) {
        setError('Insufficient balance');
        return;
      }
      const ending = (currentBalance - amount) + ((currentBalance - amount) * months * (monthlyReturn / 100));
      setEndingBalance(ending);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          account_id: accountId,
          type: formData.type,
          amount: parseFloat(formData.amount),
          transaction_date: formData.transaction_date,
          months_duration: parseInt(formData.months_duration) || 0,
          starting_balance: currentBalance,
          ending_balance: endingBalance,
        }),
      });

      if (!response.ok) throw new Error('Failed to create transaction');
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create transaction');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
          Type *
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
        >
          <option value="deposit">Deposit</option>
          <option value="withdraw">Withdraw</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
          Amount *
        </label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="0"
          step="0.01"
          min="0"
          required
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
          Months *
        </label>
        <input
          type="number"
          name="months_duration"
          value={formData.months_duration}
          onChange={handleChange}
          placeholder="0"
          min="0"
          required
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
          Transaction Date *
        </label>
        <input
          type="date"
          name="transaction_date"
          value={formData.transaction_date}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
        />
      </div>

      <div>
        <Button
          type="button"
          variant="outline"
          onClick={calculateEndingBalance}
          className="w-full"
        >
          Calculate Ending Balance
        </Button>
      </div>

      {endingBalance !== null && (
        <div className="p-3 bg-green-100 dark:bg-green-900 rounded">
          <p className="text-sm text-slate-700 dark:text-slate-300">Ending Balance</p>
          <p className="text-xl font-bold text-green-700 dark:text-green-300">
            Rp {endingBalance.toLocaleString('id-ID', { maximumFractionDigits: 2 })}
          </p>
        </div>
      )}

      <div className="flex gap-2 pt-4">
        <Button
          type="submit"
          disabled={isLoading || endingBalance === null}
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          {isLoading ? 'Creating...' : 'Create'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default TransactionForm;
