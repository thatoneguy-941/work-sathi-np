
import React, { useState, useEffect } from 'react';
import { Bell, Calendar, DollarSign, Send, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { getInvoices, type Invoice } from '@/lib/database';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

const PaymentReminders = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [overdueInvoices, setOverdueInvoices] = useState<Invoice[]>([]);
  const [upcomingInvoices, setUpcomingInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const invoices = await getInvoices();
      const unpaidInvoices = invoices.filter(inv => inv.status === 'Unpaid');
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);

      const overdue = unpaidInvoices.filter(inv => new Date(inv.due_date) < today);
      const upcoming = unpaidInvoices.filter(inv => {
        const dueDate = new Date(inv.due_date);
        return dueDate >= today && dueDate <= nextWeek;
      });

      setOverdueInvoices(overdue);
      setUpcomingInvoices(upcoming);
    } catch (error) {
      console.error('Error loading invoices:', error);
      toast({
        title: t('error'),
        description: 'Failed to load payment reminders',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendReminder = async (invoice: Invoice) => {
    // Simulate sending reminder
    toast({
      title: t('reminderSent'),
      description: `Payment reminder sent for ${invoice.invoice_number}`,
    });
  };

  const getDaysOverdue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = today.getTime() - due.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return <LoadingSpinner text="Loading payment reminders..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Bell className="w-6 h-6" />
        <h2 className="text-2xl font-semibold">{t('paymentReminders')}</h2>
      </div>

      {/* Overdue Invoices */}
      <Card className="border-red-200">
        <CardHeader className="bg-red-50">
          <CardTitle className="flex items-center gap-2 text-red-700">
            <Clock className="w-5 h-5" />
            {t('overdueInvoices')} ({overdueInvoices.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {overdueInvoices.length === 0 ? (
            <p className="text-center text-gray-500 py-4">{t('noOverdueInvoices')}</p>
          ) : (
            <div className="space-y-4">
              {overdueInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{invoice.invoice_number}</span>
                      <Badge variant="destructive">
                        {getDaysOverdue(invoice.due_date)} days overdue
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {invoice.project?.client?.name} • Rs. {invoice.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      Due: {new Date(invoice.due_date).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => sendReminder(invoice)}
                    className="ml-4"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {t('sendReminder')}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Due Invoices */}
      <Card className="border-yellow-200">
        <CardHeader className="bg-yellow-50">
          <CardTitle className="flex items-center gap-2 text-yellow-700">
            <Calendar className="w-5 h-5" />
            {t('upcomingDue')} ({upcomingInvoices.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {upcomingInvoices.length === 0 ? (
            <p className="text-center text-gray-500 py-4">{t('noUpcomingDue')}</p>
          ) : (
            <div className="space-y-4">
              {upcomingInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{invoice.invoice_number}</span>
                      <Badge variant="secondary">
                        Due in {getDaysUntilDue(invoice.due_date)} days
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {invoice.project?.client?.name} • Rs. {invoice.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      Due: {new Date(invoice.due_date).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => sendReminder(invoice)}
                    className="ml-4"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {t('sendReminder')}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <DollarSign className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-600">
              Rs. {overdueInvoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">{t('totalOverdue')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <DollarSign className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-yellow-600">
              Rs. {upcomingInvoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">{t('upcomingDue')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentReminders;
