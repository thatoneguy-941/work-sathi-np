
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, FileText, Plus, Calendar } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Income',
      titleNp: 'कुल आम्दानी',
      value: 'Rs. 1,25,000',
      trend: '+12%',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Active Clients',
      titleNp: 'सक्रिय ग्राहकहरू',
      value: '8',
      trend: '+2',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Pending Invoices',
      titleNp: 'बाँकी बिलहरू',
      value: '3',
      trend: 'Rs. 45,000',
      icon: FileText,
      color: 'text-orange-600'
    },
    {
      title: 'This Month',
      titleNp: 'यो महिना',
      value: 'Rs. 32,000',
      trend: '+8%',
      icon: Calendar,
      color: 'text-purple-600'
    }
  ];

  const recentProjects = [
    { name: 'E-commerce Website', client: 'TechCorp Pvt Ltd', status: 'In Progress', amount: 'Rs. 75,000' },
    { name: 'Mobile App Design', client: 'StartupXYZ', status: 'Review', amount: 'Rs. 45,000' },
    { name: 'Logo Design', client: 'Local Business', status: 'Completed', amount: 'Rs. 15,000' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Welcome back! स्वागतम्!</h2>
        <p className="text-blue-100">Here's what's happening with your freelance business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-xs text-gray-500">{stat.titleNp}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className={`text-sm ${stat.color}`}>{stat.trend}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Quick Actions</span>
            <span className="text-sm font-normal text-gray-500">द्रुत कार्यहरू</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex-col">
              <Plus className="w-6 h-6 mb-2" />
              <span>Add Client</span>
              <span className="text-xs">ग्राहक थप्नुहोस्</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Plus className="w-6 h-6 mb-2" />
              <span>New Project</span>
              <span className="text-xs">नयाँ प्रोजेक्ट</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="w-6 h-6 mb-2" />
              <span>Create Invoice</span>
              <span className="text-xs">बिल बनाउनुहोस्</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recent Projects</span>
            <span className="text-sm font-normal text-gray-500">हालका प्रोजेक्टहरू</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentProjects.map((project, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="font-medium">{project.name}</h4>
                  <p className="text-sm text-gray-600">{project.client}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status}
                  </span>
                  <p className="text-sm font-medium mt-1">{project.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
