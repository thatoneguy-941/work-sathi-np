
import React, { useState } from 'react';
import { Plus, FolderOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import AddProjectModal from '@/components/modals/AddProjectModal';
import StatCard from '@/components/shared/StatCard';
import EmptyState from '@/components/shared/EmptyState';
import QuickActionCard from '@/components/shared/QuickActionCard';

const ProjectManagement = () => {
  const { t } = useLanguage();
  const [projects] = useState([]);

  const stats = [
    { title: t('totalProjects'), value: '0', icon: FolderOpen, color: 'text-blue-600' },
    { title: t('completed'), value: '0', icon: FolderOpen, color: 'text-green-600' },
    { title: t('inProgress'), value: '0', icon: FolderOpen, color: 'text-orange-600' },
    { title: t('totalValue'), value: 'Rs. 0', icon: FolderOpen, color: 'text-purple-600' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-medium text-foreground">{t('projectManagement')}</h1>
          <p className="text-muted-foreground mt-2">Track and manage your projects</p>
        </div>
        <AddProjectModal>
          <QuickActionCard icon={Plus} label={t('newProject')} />
        </AddProjectModal>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <EmptyState
        icon={FolderOpen}
        title={t('noProjectsYet')}
        description={t('createFirstProject')}
        action={
          <AddProjectModal>
            <QuickActionCard icon={Plus} label={t('createProject')} />
          </AddProjectModal>
        }
      />
    </div>
  );
};

export default ProjectManagement;
