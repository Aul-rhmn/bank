'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomerForm } from '@/components/customer-form';
import { CustomerList } from '@/components/customer-list';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/customers');
      if (!response.ok) throw new Error('Failed to fetch customers');
      const data = await response.json();
      setCustomers(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const response = await fetch(`/api/customers/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete customer');
      await fetchCustomers();
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
    fetchCustomers();
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Customers
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Manage customer information
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

        <div className={`grid gap-8 ${showForm ? 'lg:grid-cols-3' : 'lg:grid-cols-1'}`}>
          {showForm && (
            <div>
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 sticky top-4">
                <CardHeader>
                  <CardTitle>
                    {editingId ? 'Edit' : 'New'} Customer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CustomerForm
                    customerId={editingId}
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

          {/* List Section */}
          <div className={showForm ? 'lg:col-span-2' : 'lg:col-span-1'}>
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Customer List</CardTitle>
                    <CardDescription>
                      {customers.length} customer{customers.length !== 1 ? 's' : ''}
                    </CardDescription>
                  </div>
                  {!showForm && (
                    <Button 
                      onClick={() => setShowForm(true)}
                      className="bg-emerald-600 hover:bg-emerald-700"
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
                  <CustomerList
                    customers={customers}
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
