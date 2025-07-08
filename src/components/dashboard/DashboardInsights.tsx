
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, AlertTriangle, TrendingUp } from 'lucide-react';

interface DashboardInsightsProps {
  stats: any;
}

const DashboardInsights = ({ stats }: DashboardInsightsProps) => {
  const insights = [
    {
      title: 'Invoice overview',
      icon: FileText,
      items: [
        { label: 'Total invoices', value: stats?.totalInvoices || 0, color: 'text-foreground' },
        { label: 'Paid', value: stats?.paidInvoicesCount || 0, color: 'text-green-600' },
        { label: 'Unpaid', value: stats?.unpaidInvoicesCount || 0, color: 'text-orange-600' },
        ...(stats?.totalOverdue > 0 ? [{
          label: 'Overdue',
          value: `Rs. ${stats.totalOverdue.toLocaleString()}`,
          color: 'text-red-600',
          icon: AlertTriangle
        }] : [])
      ]
    },
    {
      title: 'Project status',
      icon: Users,
      items: [
        { label: 'Total projects', value: stats?.totalProjects || 0, color: 'text-foreground' },
        { label: 'In progress', value: stats?.inProgressProjects || 0, color: 'text-blue-600' },
        { label: 'Completed', value: stats?.completedProjects || 0, color: 'text-green-600' }
      ]
    }
  ];

  return (
    <div className="dashboard-grid">
      {insights.map((insight, index) => (
        <Card key={index} variant="elevated" className="interactive-hover">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="p-2 rounded-lg bg-accent">
                <insight.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-subheading">{insight.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {insight.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex justify-between items-center group">
                  <span className="text-caption flex items-center gap-2">
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.label}
                  </span>
                  <span className={`font-semibold transition-colors group-hover:scale-105 ${item.color}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardInsights;
