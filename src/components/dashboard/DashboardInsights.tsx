
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, AlertTriangle } from 'lucide-react';

interface DashboardInsightsProps {
  stats: any;
}

const DashboardInsights = ({ stats }: DashboardInsightsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Invoice Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Invoice Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Invoices</span>
              <span className="font-semibold">{stats?.totalInvoices || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Paid</span>
              <span className="font-semibold text-green-600">{stats?.paidInvoicesCount || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Unpaid</span>
              <span className="font-semibold text-orange-600">{stats?.unpaidInvoicesCount || 0}</span>
            </div>
            {stats?.totalOverdue > 0 && (
              <div className="flex justify-between items-center border-t pt-3">
                <span className="text-sm text-red-600 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" />
                  Overdue
                </span>
                <span className="font-semibold text-red-600">
                  Rs. {stats.totalOverdue.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Project Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Project Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Projects</span>
              <span className="font-semibold">{stats?.totalProjects || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">In Progress</span>
              <span className="font-semibold text-blue-600">{stats?.inProgressProjects || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Completed</span>
              <span className="font-semibold text-green-600">{stats?.completedProjects || 0}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardInsights;
