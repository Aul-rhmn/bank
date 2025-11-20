'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface DepositoTypeFormProps {
  typeId?: string | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function DepositoTypeForm({ typeId, onSuccess, onCancel }: DepositoTypeFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    yearly_return: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeId) {
      fetchType();
    }
  }, [typeId]);

  const fetchType = async () => {
    try {
      const response = await fetch(`/api/deposito-types/${typeId}`);
      if (!response.ok) throw new Error('Failed to fetch type');
      const data = await response.json();
      setFormData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch type');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const method = typeId ? 'PUT' : 'POST';
      const url = typeId ? `/api/deposito-types/${typeId}` : '/api/deposito-types';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          yearly_return: parseFloat(formData.yearly_return),
        }),
      });

      if (!response.ok) throw new Error('Failed to save type');
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save type');
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
          Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Deposito Gold"
          required
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
          Yearly Return (%) *
        </label>
        <input
          type="number"
          name="yearly_return"
          value={formData.yearly_return}
          onChange={handleChange}
          placeholder="7.5"
          step="0.01"
          min="0"
          required
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Type details"
          rows={3}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-purple-600 hover:bg-purple-700"
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
