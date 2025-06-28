
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
import { updateProject, getClients, type Project, type Client } from '@/lib/database';
import { useLanguage } from '@/contexts/LanguageContext';

interface EditProjectModalProps {
  children: React.ReactNode;
  project: Project;
  onProjectUpdated?: (project: Project) => void;
}

const EditProjectModal = ({ children, project, onProjectUpdated }: EditProjectModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [formData, setFormData] = useState({
    project_name: project.project_name,
    client_id: project.client_id,
    description: project.description || '',
    deadline: project.deadline || '',
    status: project.status,
    payment_status: project.payment_status
  });
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    if (open) {
      loadClients();
    }
  }, [open]);

  const loadClients = async () => {
    try {
      const clientsData = await getClients();
      setClients(clientsData);
    } catch (error) {
      console.error('Error loading clients:', error);
      toast({
        title: t('error'),
        description: t('failedToLoadClients'),
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const updatedProject = await updateProject(project.id, formData);
      
      toast({
        title: t('projectUpdated'),
        description: `${formData.project_name} ${t('hasBeenUpdatedSuccessfully')}`,
      });
      
      setOpen(false);
      onProjectUpdated?.(updatedProject);
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: t('error'),
        description: t('failedToUpdateProject'),
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
          <DialogTitle>{t('editProject')}</DialogTitle>
          <DialogDescription>
            {t('editProjectDesc')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-name">{t('projectName')} *</Label>
            <Input
              id="project-name"
              value={formData.project_name}
              onChange={(e) => setFormData(prev => ({ ...prev, project_name: e.target.value }))}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('client')} *</Label>
            <Select value={formData.client_id} onValueChange={(value) => setFormData(prev => ({ ...prev, client_id: value }))}>
              <SelectTrigger disabled={loading}>
                <SelectValue placeholder={t('selectClient')} />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name} {client.company && `(${client.company})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">{t('description')}</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deadline">{t('deadline')}</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
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
                <SelectItem value="Pending">{t('pending')}</SelectItem>
                <SelectItem value="In Progress">{t('inProgress')}</SelectItem>
                <SelectItem value="Completed">{t('completed')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t('paymentStatus')}</Label>
            <Select value={formData.payment_status} onValueChange={(value: any) => setFormData(prev => ({ ...prev, payment_status: value }))}>
              <SelectTrigger disabled={loading}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Not Paid">{t('notpaid')}</SelectItem>
                <SelectItem value="Partial">{t('partial')}</SelectItem>
                <SelectItem value="Paid">{t('paid')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              {t('cancel')}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? t('updating') : t('updateProject')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProjectModal;
