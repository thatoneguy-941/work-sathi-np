import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockInvoices } from '@/data/mockData';

const DemoInvoices = () => (
  <div className="space-y-6 p-6">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Invoices</h1>
      <Button>Create Invoice</Button>
    </div>
    <div className="grid gap-4">
      {mockInvoices.map((invoice) => (
        <Card key={invoice.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{invoice.invoice_number}</h3>
                <p className="text-sm text-muted-foreground">Due: {invoice.due_date}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Rs. {invoice.amount.toLocaleString()}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {invoice.status}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default DemoInvoices;