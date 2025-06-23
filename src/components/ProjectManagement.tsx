
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, User } from 'lucide-react';

const ProjectManagement = () => {
  const [projects] = useState([
    {
      id: 1,
      name: 'E-commerce Website Development',
      client: 'TechCorp Pvt Ltd',
      status: 'In Progress',
      progress: 65,
      amount: 'Rs. 75,000',
      deadline: '2024-07-15',
      description: 'Complete e-commerce platform with payment integration'
    },
    {
      id: 2,
      name: 'Mobile App UI/UX Design',
      client: 'StartupXYZ',
      status: 'Review',
      progress: 90,
      amount: 'Rs. 45,000',
      deadline: '2024-06-30',
      description: 'Modern mobile app design for food delivery service'
    },
    {
      id: 3,
      name: 'Brand Identity Design',
      client: 'Local Business',
      status: 'Completed',
      progress: 100,
      amount: 'Rs. 25,000',
      deadline: '2024-06-20',
      description: 'Logo, business cards, and brand guidelines'
    },
    {
      id: 4,
      name: 'Website Redesign',
      client: 'TechCorp Pvt Ltd',
      status: 'Planning',
      progress: 10,
      amount: 'Rs. 55,000',
      deadline: '2024-08-01',
      description: 'Complete website overhaul with modern design'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Planning':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Project Management</h2>
          <p className="text-gray-600">प्रोजेक्ट व्यवस्थापन</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">4</p>
            <p className="text-sm text-gray-600">Total Projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">1</p>
            <p className="text-sm text-gray-600">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">2</p>
            <p className="text-sm text-gray-600">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">Rs. 2,00,000</p>
            <p className="text-sm text-gray-600">Total Value</p>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <User className="w-4 h-4 mr-1" />
                    {project.client}
                  </div>
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-4">{project.description}</p>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(project.deadline).toLocaleDateString()}
                </div>
                <span className="font-medium text-green-600">{project.amount}</span>
              </div>

              <div className="mt-4 flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Edit Project
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Create Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectManagement;
