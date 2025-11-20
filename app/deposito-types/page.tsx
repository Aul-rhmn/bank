'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DepositoTypeForm } from '@/components/deposito-type-form';
import { DepositoTypeList } from '@/components/deposito-type-list';

export default function DepositoTypesPage() {
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchTypes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/deposito-types');
      if (!response.ok) throw new Error('Failed to fetch types');
      const data = await response.json();
      setTypes(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this deposito type?')) return;
    try {
      const response = await fetch(`/api/deposito-types/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete type');
      await fetchTypes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingId(null);
    fetchTypes();
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 ">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Deposito Types
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Manage investment packages and returns
            </p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">← Back</Button>
          </Link>
        </div>

        {error && (
          <Card className="mb-6 bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
            <CardContent className="pt-6 text-red-800 dark:text-red-200">
              {error}
            </CardContent>
          </Card>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          {showForm && (
            <div>
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 sticky top-4">
                <CardHeader>
                  <CardTitle>
                    {editingId ? 'Edit' : 'New'} Deposito Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DepositoTypeForm
                    typeId={editingId}
                    onSuccess={handleFormSubmit}
                    onCancel={() => {
                      setShowForm(false);
                      setEditingId(null);
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          )}

          <div className={`lg:col-span-${showForm ? 2 : 3}`}>
            <Card className="bg-white dark:text-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Types List</CardTitle>
                    <CardDescription>
                      {types.length} type{types.length !== 1 ? 's' : ''}
                    </CardDescription>
                  </div>
                  {!showForm && (
                    <Button
                      onClick={() => setShowForm(true)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      + New
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8 text-slate-500">Loading...</div>
                ) : (
                  <DepositoTypeList
                    types={types}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
