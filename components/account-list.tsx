'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Account {
  id: string;
  account_number: string;
  customer?: { name: string };
  deposito_type?: { name: string };
  balance: number;
}

interface AccountListProps {
  accounts: Account[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function AccountList({ accounts, onEdit, onDelete }: AccountListProps) {
  if (accounts.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        No accounts yet. Create one to get started!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {accounts.map(account => (
        <div
          key={account.id}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-700"
        >
          <div className="mb-3 sm:mb-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {account.customer?.name}
              </h3>
              <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                {account.account_number}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {account.deposito_type?.name}
            </p>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              Rp {account.balance.toLocaleString('id-ID')}
            </p>
          </div>
          <div className="flex gap-2">
            <Link href={`/accounts/${account.id}`}>
              <Button
                variant="outline"
                size="sm"
                className="text-green-600 hover:text-green-700"
              >
                Transactions
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(account.id)}
              className="text-blue-600 hover:text-blue-700"
            >
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(account.id)}
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
