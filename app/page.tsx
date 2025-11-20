import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          {/* Left Section */}
          <div className="text-white space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Banking System
              </h1>
              <p className="text-xl text-slate-300 text-balance">
                Manage your customer accounts, deposits, and investments with our modern banking platform.
              </p>
            </div>

            <div className="space-y-4">
              <Link href="/dashboard">
                <Button size="lg" className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white">
                  Go to Dashboard
                </Button>
              </Link>
            </div>

            <div className="space-y-3 pt-8">
              <h3 className="text-sm font-semibold text-slate-300">Quick Links</h3>
              <div className="grid gap-2">
                <Link href="/customers" className="text-emerald-400 hover:text-emerald-300 text-sm">
                  → Manage Customers
                </Link>
                <Link href="/accounts" className="text-emerald-400 hover:text-emerald-300 text-sm">
                  → View Accounts
                </Link>
                <Link href="/deposito-types" className="text-emerald-400 hover:text-emerald-300 text-sm">
                  → Deposito Types
                </Link>
              </div>
            </div>
          </div>

          {/* Right Section - Features */}
          <div className="space-y-6">
            <Card className="bg-slate-700 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white">Account Management</CardTitle>
                <CardDescription className="text-slate-300">
                  Create and manage multiple customer accounts with different deposit types
                </CardDescription>
              </CardHeader>
              <CardContent className="text-slate-300">
                Each customer can open multiple accounts with different investment types.
              </CardContent>
            </Card>

            <Card className="bg-slate-700 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white">Deposits & Withdrawals</CardTitle>
                <CardDescription className="text-slate-300">
                  Track all transactions with automatic interest calculations
                </CardDescription>
              </CardHeader>
              <CardContent className="text-slate-300">
                System automatically calculates ending balance with monthly interest rates.
              </CardContent>
            </Card>

            <Card className="bg-slate-700 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white">Deposito Types</CardTitle>
                <CardDescription className="text-slate-300">
                  Three investment tiers with different returns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-300">
                <div>• Bronze: 3% yearly</div>
                <div>• Silver: 5% yearly</div>
                <div>• Gold: 7% yearly</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
