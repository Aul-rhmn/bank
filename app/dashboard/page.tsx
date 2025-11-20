import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/components/stats-card';

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 ">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Banking Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Manage your banking operations efficiently
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <StatsCard title="Total Customers" value="—" />
          <StatsCard title="Active Accounts" value="—" />
          <StatsCard title="Total Deposits" value="Rp 0" />
          <StatsCard title="Monthly Interest" value="Rp 0" />
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-white">
            <CardHeader>
              <CardTitle className="text-lg">Customers</CardTitle>
              <CardDescription>
                Create, edit, and delete customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/customers">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 dark:text-white">
                  Manage Customers
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-white">
            <CardHeader>
              <CardTitle className="text-lg">Accounts</CardTitle>
              <CardDescription>
                Manage customer accounts and deposits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/accounts">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  View Accounts
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-white">
            <CardHeader>
              <CardTitle className="text-lg">Deposito Types</CardTitle>
              <CardDescription>
                Manage investment packages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/deposito-types">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  View Types
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Info Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-white">
            <CardHeader>
              <CardTitle className="text-sm">Deposito Bronze</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">3%</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Yearly Return</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-white">
            <CardHeader>
              <CardTitle className="text-sm">Deposito Silver</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">5%</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Yearly Return</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 dark:text-white">
            <CardHeader>
              <CardTitle className="text-sm">Deposito Gold</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">7%</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Yearly Return</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
