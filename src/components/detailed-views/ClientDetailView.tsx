
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Phone, Building, FileText, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { getProjects, getInvoices, type Project, type Invoice, type Client } from '@/lib/database';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

interface ClientDetailViewProps {
  client: Client;
  onBack: () => void;
}

const ClientDetailView = ({ client, onBack }: ClientDetailViewProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClientData();
  }, [client.id]);

  const loadClientData = async () => {
    try {
      const [projectsData, invoicesData] = await Promise.all([
        getProjects(),
        getInvoices()
      ]);
      
      const clientProjects = projectsData.filter(p => p.client_id === client.id);
      const clientInvoices = invoicesData.filter(i => 
        clientProjects.some(p => p.id === i.project_id)
      );
      
      setProjects(clientProjects);
      setInvoices(clientInvoices);
    } catch (error) {
      console.error('Error loading client data:', error);
      toast({
        title: t('error'),
        description: 'Failed to load client details',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const totalInvoiceAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = invoices
    .filter(inv => inv.status === 'Paid')
    .reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = totalInvoiceAmount - paidAmount;

  if (loading) {
    return <LoadingSpinner text="Loading client details..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">{client.name}</h1>
          <p className="text-gray-600">{t('clientDetails')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client Information */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              {t('clientInformation')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{client.email}</span>
            </div>
            {client.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{client.phone}</span>
              </div>
            )}
            {client.company && (
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{client.company}</span>
              </div>
            )}
            {client.notes && (
              <div className="mt-4">
                <h4 className="font-medium text-sm text-gray-700 mb-2">{t('notes')}</h4>
                <p className="text-sm text-gray-600">{client.notes}</p>
              </div>
            )}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              {t('clientSince')}: {new Date(client.created_at).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>

        {/* Financial Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              {t('financialOverview')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">{t('totalEarned')}</p>
                <p className="text-2xl font-bold text-green-600">Rs. {paidAmount.toLocaleString()}</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600">{t('pending')}</p>
                <p className="text-2xl font-bold text-yellow-600">Rs. {pendingAmount.toLocaleString()}</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">{t('totalProjects')}</p>
                <p className="text-2xl font-bold text-blue-600">{projects.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {t('projects')} ({projects.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <p className="text-gray-500 text-center py-8">{t('noProjectsForClient')}</p>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">{project.project_name}</h4>
                    <p className="text-sm text-gray-600">{project.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                    <Badge variant={project.payment_status === 'Paid' ? 'default' : 'destructive'}>
                      {project.payment_status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Invoices */}
      <Card>
        <CardHeader>
          <CardTitle>{t('recentInvoices')} ({invoices.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <p className="text-gray-500 text-center py-8">{t('noInvoicesForClient')}</p>
          ) : (
            <div className="space-y-3">
              {invoices.slice(0, 5).map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{invoice.invoice_number}</p>
                    <p className="text-sm text-gray-600">Due: {new Date(invoice.due_date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Rs. {invoice.amount.toLocaleString()}</p>
                    <Badge variant={invoice.status === 'Paid' ? 'default' : 'destructive'}>
                      {invoice.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDetailView;
