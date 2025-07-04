import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import DashboardStats from '@/components/dashboard/DashboardStats';
import { mockStats } from '@/data/mockData';

const DemoDashboard = () => (
  <div className="space-y-8 p-6">
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">Welcome back! Here's your business overview.</p>
    </div>
    <DashboardStats stats={mockStats} />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Invoice INV-2024-003 paid</span>
              <span className="text-green-600">Rs. 65,000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>New project started</span>
              <span className="text-blue-600">Website Redesign</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Upcoming Deadlines</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Mobile App Development</span>
              <span className="text-orange-600">2 days</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>SEO Optimization</span>
              <span className="text-red-600">5 days</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default DemoDashboard;