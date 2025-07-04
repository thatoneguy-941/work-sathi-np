import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockClients } from '@/data/mockData';

const DemoClients = () => (
  <div className="space-y-6 p-6">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Clients</h1>
      <Button>Add Client</Button>
    </div>
    <div className="grid gap-4">
      {mockClients.map((client) => (
        <Card key={client.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{client.name}</h3>
                <p className="text-sm text-muted-foreground">{client.email}</p>
                <p className="text-sm text-muted-foreground">{client.phone}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{client.company}</p>
                <Button size="sm" variant="outline" className="mt-2">View Details</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default DemoClients;