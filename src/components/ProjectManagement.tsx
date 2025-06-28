
import React, { useState, useEffect } from 'react';
import { Plus, FolderOpen, Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import AddProjectModal from '@/components/modals/AddProjectModal';
import EditProjectModal from '@/components/modals/EditProjectModal';
import StatCard from '@/components/shared/StatCard';
import EmptyState from '@/components/shared/EmptyState';
import QuickActionCard from '@/components/shared/QuickActionCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { getProjects, deleteProject, type Project } from '@/lib/database';

const ProjectManagement = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

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
    } finally {
      setLoading(false);
    }
  };

  const handleProjectAdded = (newProject: Project) => {
    setProjects(prev => [newProject, ...prev]);
  };

  const handleProjectUpdated = (updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm(t('confirmDeleteProject'))) return;
    
    try {
      await deleteProject(projectId);
      setProjects(prev => prev.filter(p => p.id !== projectId));
      toast({
        title: t('projectDeleted'),
        description: t('projectDeletedSuccessfully'),
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: t('error'),
        description: t('failedToDeleteProject'),
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      'Pending': 'outline',
      'In Progress': 'secondary',
      'Completed': 'default'
    };
    return <Badge variant={variants[status] || 'outline'}>{t(status.toLowerCase().replace(' ', ''))}</Badge>;
  };

  const getPaymentStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      'Not Paid': 'destructive',
      'Partial': 'secondary',
      'Paid': 'default'
    };
    return <Badge variant={variants[status] || 'outline'}>{t(status.toLowerCase().replace(' ', ''))}</Badge>;
  };

  const stats = [
    { title: t('totalProjects'), value: projects.length.toString(), icon: FolderOpen, color: 'text-blue-600' },
    { title: t('completed'), value: projects.filter(p => p.status === 'Completed').length.toString(), icon: FolderOpen, color: 'text-green-600' },
    { title: t('inProgress'), value: projects.filter(p => p.status === 'In Progress').length.toString(), icon: FolderOpen, color: 'text-orange-600' },
    { title: t('pending'), value: projects.filter(p => p.status === 'Pending').length.toString(), icon: FolderOpen, color: 'text-gray-600' }
  ];

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-start gap-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">{t('projectManagement')}</h1>
            <p className="text-gray-600">{t('trackDesc')}</p>
          </div>
        </div>
        <div className="text-center py-8">{t('loading')}</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start gap-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">{t('projectManagement')}</h1>
          <p className="text-gray-600">{t('trackDesc')}</p>
        </div>
        <div className="flex-shrink-0">
          <AddProjectModal onProjectAdded={handleProjectAdded}>
            <QuickActionCard icon={Plus} label={t('newProject')} />
          </AddProjectModal>
        </div>
      </div>

      {/* Project Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {projects.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title={t('noProjectsYet')}
          description={t('createFirstProject')}
          action={
            <AddProjectModal onProjectAdded={handleProjectAdded}>
              <QuickActionCard icon={Plus} label={t('createFirstProjectDesc')} />
            </AddProjectModal>
          }
        />
      ) : (
        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('projectName')}</TableHead>
                <TableHead>{t('client')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('paymentStatus')}</TableHead>
                <TableHead>{t('deadline')}</TableHead>
                <TableHead>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.project_name}</TableCell>
                  <TableCell>{project.client?.name || '-'}</TableCell>
                  <TableCell>{getStatusBadge(project.status)}</TableCell>
                  <TableCell>{getPaymentStatusBadge(project.payment_status)}</TableCell>
                  <TableCell>{project.deadline ? new Date(project.deadline).toLocaleDateString() : '-'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <EditProjectModal project={project} onProjectUpdated={handleProjectUpdated}>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </EditProjectModal>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;
