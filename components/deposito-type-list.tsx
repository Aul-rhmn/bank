'use client';

import { Button } from '@/components/ui/button';

interface DepositoType {
  id: string;
  name: string;
  yearly_return: number;
  description?: string;
}

interface DepositoTypeListProps {
  types: DepositoType[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function DepositoTypeList({ types, onEdit, onDelete }: DepositoTypeListProps) {
  if (types.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        No deposito types yet. Create one to get started!
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {types.map(type => (
        <div
          key={type.id}
          className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800"
        >
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
            {type.name}
          </h3>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-3">
            {type.yearly_return}%
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
            {type.description || 'No description'}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(type.id)}
              className="flex-1 text-blue-600 hover:text-blue-700"
            >
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(type.id)}
              className="flex-1 text-red-600 hover:text-red-700"
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
