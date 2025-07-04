import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockProjects } from '@/data/mockData';

const DemoProjects = () => (
  <div className="space-y-6 p-6">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Projects</h1>
      <Button>New Project</Button>
    </div>
    <div className="grid gap-4">
      {mockProjects.map((project) => (
        <Card key={project.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold">{project.project_name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {project.status}
                </span>
                <Button size="sm" variant="outline" className="mt-2 ml-2">View</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default DemoProjects;