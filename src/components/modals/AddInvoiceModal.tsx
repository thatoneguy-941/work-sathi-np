
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { createInvoice, getProjects, type Invoice, type Project } from '@/lib/database';
import { useLanguage } from '@/contexts/LanguageContext';

interface AddInvoiceModalProps {
  children: React.ReactNode;
  onInvoiceAdded?: (invoice: Invoice) => void;
}

const AddInvoiceModal = ({ children, onInvoiceAdded }: AddInvoiceModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState({
    project_id: '',
    issue_date: new Date().toISOString().split('T')[0],
    due_date: '',
    amount: '',
    payment_link: '',
    status: 'Unpaid' as const
  });
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    if (open) {
      loadProjects();
    }
  }, [open]);

  const loadProjects = async () => {
    try {
      const projectsData = await getProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error('Error loading projects:', error);
      toast({
        title: t('error'),
        description: t('failedToLoadProjects'),
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const invoice = await createInvoice({
        ...formData,
        amount: parseFloat(formData.amount)
      });
      
      toast({
        title: t('invoiceCreated'),
        description: `${t('invoiceFor')} Rs. ${formData.amount} ${t('hasBeenCreatedSuccessfully')}`,
      });
      
      setFormData({
        project_id: '',
        issue_date: new Date().toISOString().split('T')[0],
        due_date: '',
        amount: '',
        payment_link: '',
        status: 'Unpaid'
      });
      
      setOpen(false);
      onInvoiceAdded?.(invoice);
    } catch (error) {
      console.error('Error creating invoice:', error);
      toast({
        title: t('error'),
        description: t('failedToCreateInvoice'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('createInvoice')}</DialogTitle>
          <DialogDescription>
            {t('createInvoiceDesc')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>{t('project')} *</Label>
            <Select value={formData.project_id} onValueChange={(value) => setFormData(prev => ({ ...prev, project_id: value }))}>
              <SelectTrigger disabled={loading}>
                <SelectValue placeholder={t('selectProject')} />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.project_name} - {project.client?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">{t('amount')} (Rs.) *</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="issue-date">{t('issueDate')}</Label>
            <Input
              id="issue-date"
              type="date"
              value={formData.issue_date}
              onChange={(e) => setFormData(prev => ({ ...prev, issue_date: e.target.value }))}
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="due-date">{t('dueDate')}</Label>
            <Input
              id="due-date"
              type="date"
              value={formData.due_date}
              onChange={(e) => setFormData(prev => ({ ...prev, due_date: e.target.value }))}
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="payment-link">{t('paymentLink')}</Label>
            <Input
              id="payment-link"
              placeholder="eSewa/Khalti QR or payment link"
              value={formData.payment_link}
              onChange={(e) => setFormData(prev => ({ ...prev, payment_link: e.target.value }))}
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('status')}</Label>
            <Select value={formData.status} onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}>
              <SelectTrigger disabled={loading}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Unpaid">{t('unpaid')}</SelectItem>
                <SelectItem value="Paid">{t('paid')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              {t('cancel')}
            </Button>
            <Button type="submit" disabled={loading || !formData.project_id || !formData.amount}>
              {loading ? t('creating') : t('createInvoice')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddInvoiceModal;
