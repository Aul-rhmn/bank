'use client'

import { useEffect, useState } from 'react'
import TransactionForm from '@/components/transaction-form'
import TransactionHistory from '@/components/transaction-history'
import { Plus } from 'lucide-react'

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([])
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const [transRes, accountsRes] = await Promise.all([
        fetch('/api/transactions'),
        fetch('/api/accounts'),
      ])

      const transData = await transRes.json()
      const accountsData = await accountsRes.json()

      setTransactions(transData)
      setAccounts(accountsData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(data: any) {
    try {
      await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      fetchData()
      setShowForm(false)
    } catch (error) {
      console.error('Error saving transaction:', error)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
        >
          <Plus className="w-5 h-5" />
          New Transaction
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <TransactionForm
            accounts={accounts}
            onSave={handleSave}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <TransactionHistory transactions={transactions} />
    </div>
  )
}
