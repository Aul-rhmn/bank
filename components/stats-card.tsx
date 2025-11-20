import { Card, CardContent } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string;
}

export function StatsCard({ title, value }: StatsCardProps) {
  return (
    <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
      <CardContent className="pt-6">
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">{title}</p>
        <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
