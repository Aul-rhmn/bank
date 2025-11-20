'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TransactionForm } from '@/components/transaction-form';
import { TransactionList } from '@/components/transaction-list';

interface Account {
  id: string;
  account_number: string;
  customer?: { name: string };
  deposito_type?: { name: string; yearly_return: number };
  balance: number;
}

export default function AccountDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [account, setAccount] = useState<Account | null>(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [accountRes, transRes] = await Promise.all([
        fetch(`/api/accounts/${id}`),
        fetch(`/api/transactions?account_id=${id}`),
      ]);

      if (!accountRes.ok || !transRes.ok) throw new Error('Failed to fetch data');

      setAccount(await accountRes.json());
      setTransactions(await transRes.json());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const handleTransactionSubmit = () => {
    setShowForm(false);
    fetchData();
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
        <div className="text-center">Loading...</div>
      </main>
    );
  }

  if (error || !account) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
        <div className="text-red-600">{error || 'Account not found'}</div>
      </main>
    );
  }

  const monthlyReturn = (account.deposito_type?.yearly_return || 0) / 12;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Account Details
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              {account.customer?.name}
            </p>
          </div>
          <Link href="/accounts">
            <Button variant="outline">← Back</Button>
          </Link>
        </div>

        {/* Account Info */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">Account Number</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {account.account_number}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">Balance</p>
              <p className="text-2xl font-bold text-emerald-600">
                Rp {account.balance.toLocaleString('id-ID')}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">Type</p>
              <p className="text-2xl font-bold text-blue-600">
                {account.deposito_type?.name}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardContent className="pt-6">
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">Monthly Return</p>
              <p className="text-2xl font-bold text-purple-600">
                {monthlyReturn.toFixed(3)}%
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Transactions */}
        <div className="grid gap-8 lg:grid-cols-3">
          {showForm && (
            <div>
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 sticky top-4">
                <CardHeader>
                  <CardTitle>New Transaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <TransactionForm
                    accountId={id}
                    currentBalance={account.balance}
                    monthlyReturn={monthlyReturn}
                    onSuccess={handleTransactionSubmit}
                    onCancel={() => setShowForm(false)}
                  />
                </CardContent>
              </Card>
            </div>
          )}

          <div className={`lg:col-span-${showForm ? 2 : 3}`}>
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Transactions</CardTitle>
                    <CardDescription>
                      {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
                    </CardDescription>
                  </div>
                  {!showForm && (
                    <Button
                      onClick={() => setShowForm(true)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      + New
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <TransactionList transactions={transactions} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
