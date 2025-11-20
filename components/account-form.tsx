'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Customer {
  id: string;
  name: string;
}

interface DepositoType {
  id: string;
  name: string;
}

interface AccountFormProps {
  accountId?: string | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function AccountForm({ accountId, onSuccess, onCancel }: AccountFormProps) {
  const [formData, setFormData] = useState({
    customer_id: '',
    deposito_type_id: '',
    balance: '',
  });
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [depositoTypes, setDepositoTypes] = useState<DepositoType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
    if (accountId) {
      fetchAccount();
    }
  }, [accountId]);

  const fetchData = async () => {
    try {
      const [customersRes, typesRes] = await Promise.all([
        fetch('/api/customers'),
        fetch('/api/deposito-types'),
      ]);
      if (!customersRes.ok || !typesRes.ok) throw new Error('Failed to fetch data');
      setCustomers(await customersRes.json());
      setDepositoTypes(await typesRes.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    }
  };

  const fetchAccount = async () => {
    try {
      const response = await fetch(`/api/accounts/${accountId}`);
      if (!response.ok) throw new Error('Failed to fetch account');
      const data = await response.json();
      setFormData({
        customer_id: data.customer_id,
        deposito_type_id: data.deposito_type_id,
        balance: data.balance.toString(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch account');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const method = accountId ? 'PUT' : 'POST';
      const url = accountId ? `/api/accounts/${accountId}` : '/api/accounts';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          balance: parseFloat(formData.balance),
        }),
      });

      if (!response.ok) throw new Error('Failed to save account');
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save account');
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
          Customer *
        </label>
        <select
          name="customer_id"
          value={formData.customer_id}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
        >
          <option value="">Select a customer</option>
          {customers.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
          Deposito Type *
        </label>
        <select
          name="deposito_type_id"
          value={formData.deposito_type_id}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
        >
          <option value="">Select a type</option>
          {depositoTypes.map(t => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
          Initial Balance *
        </label>
        <input
          type="number"
          name="balance"
          value={formData.balance}
          onChange={handleChange}
          placeholder="0"
          step="0.01"
          min="0"
          required
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? 'Saving...' : 'Save'}
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
