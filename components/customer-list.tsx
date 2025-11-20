'use client';

import { Button } from '@/components/ui/button';

interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

interface CustomerListProps {
  customers: Customer[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function CustomerList({ customers, onEdit, onDelete }: CustomerListProps) {
  if (customers.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        No customers yet. Create one to get started!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {customers.map(customer => (
        <div
          key={customer.id}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-700"
        >
          <div className="mb-3 sm:mb-0">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {customer.name}
            </h3>
            {customer.email && (
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {customer.email}
              </p>
            )}
            {customer.phone && (
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {customer.phone}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(customer.id)}
              className="text-blue-600 hover:text-blue-700"
            >
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(customer.id)}
              className="text-red-600 hover:text-red-700"
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
