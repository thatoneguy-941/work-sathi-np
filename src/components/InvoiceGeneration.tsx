
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, FileText, Calendar, User } from 'lucide-react';

const InvoiceGeneration = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [invoices] = useState([
    {
      id: 'INV-001',
      client: 'TechCorp Pvt Ltd',
      project: 'E-commerce Website',
      amount: 'Rs. 75,000',
      status: 'Paid',
      date: '2024-06-15',
      dueDate: '2024-07-15'
    },
    {
      id: 'INV-002',
      client: 'StartupXYZ',
      project: 'Mobile App Design',
      amount: 'Rs. 45,000',
      status: 'Pending',
      date: '2024-06-20',
      dueDate: '2024-07-20'
    },
    {
      id: 'INV-003',
      client: 'Local Business',
      project: 'Logo Design',
      amount: 'Rs. 15,000',
      status: 'Overdue',
      date: '2024-05-15',
      dueDate: '2024-06-15'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    // Invoice creation logic here
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Invoice Management</h2>
          <p className="text-gray-600">बिल व्यवस्थापन</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      {/* Invoice Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">Rs. 75,000</p>
            <p className="text-sm text-gray-600">Paid This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">Rs. 45,000</p>
            <p className="text-sm text-gray-600">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">Rs. 15,000</p>
            <p className="text-sm text-gray-600">Overdue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">3</p>
            <p className="text-sm text-gray-600">Total Invoices</p>
          </CardContent>
        </Card>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Invoice</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="invoiceClient">Client</Label>
                  <Input id="invoiceClient" placeholder="Select client" required />
                </div>
                <div>
                  <Label htmlFor="invoiceProject">Project</Label>
                  <Input id="invoiceProject" placeholder="Select project" required />
                </div>
                <div>
                  <Label htmlFor="invoiceAmount">Amount (Rs.)</Label>
                  <Input id="invoiceAmount" type="number" placeholder="0" required />
                </div>
                <div>
                  <Label htmlFor="invoiceDueDate">Due Date</Label>
                  <Input id="invoiceDueDate" type="date" required />
                </div>
              </div>
              <div>
                <Label htmlFor="invoiceDescription">Description</Label>
                <Textarea id="invoiceDescription" placeholder="Invoice description..." />
              </div>
              
              {/* Payment QR Code Options */}
              <div className="border-t pt-4">
                <Label className="text-base font-medium">Payment Options</Label>
                <p className="text-sm text-gray-600 mb-3">QR codes will be automatically generated</p>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="esewa" defaultChecked />
                    <label htmlFor="esewa" className="text-sm">eSewa QR Code</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="khalti" defaultChecked />
                    <label htmlFor="khalti" className="text-sm">Khalti QR Code</label>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button type="submit">Create Invoice</Button>
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Invoices List */}
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <Card key={invoice.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{invoice.id}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <User className="w-4 h-4 mr-1" />
                      {invoice.client}
                    </div>
                    <p className="text-sm text-gray-600">{invoice.project}</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6">
                  <div className="text-center md:text-left">
                    <p className="font-medium text-lg">{invoice.amount}</p>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      Due: {new Date(invoice.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center md:items-end space-y-2">
                    <Badge className={getStatusColor(invoice.status)}>
                      {invoice.status}
                    </Badge>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        Download
                      </Button>
                      {invoice.status === 'Pending' && (
                        <Button size="sm">
                          Send Reminder
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InvoiceGeneration;
