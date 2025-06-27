
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
    { title: 'Total projects', value: '0', icon: FolderOpen, color: 'text-blue-600' },
    { title: 'Completed', value: '0', icon: FolderOpen, color: 'text-green-600' },
    { title: 'In progress', value: '0', icon: FolderOpen, color: 'text-orange-600' },
    { title: 'Total value', value: 'Rs. 0', icon: FolderOpen, color: 'text-purple-600' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start gap-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-heading mb-2">Project management</h1>
          <p className="text-caption">Track and manage your project progress</p>
        </div>
        <div className="flex-shrink-0">
          <AddProjectModal>
            <QuickActionCard icon={Plus} label={t('newProject')} variant="default" />
          </AddProjectModal>
        </div>
      </div>

      {/* Project Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <EmptyState
        icon={FolderOpen}
        title="No projects yet"
        description="Create your first project"
        action={
          <AddProjectModal>
            <QuickActionCard icon={Plus} label="Create project" variant="default" />
          </AddProjectModal>
        }
      />
    </div>
  );
};

export default ProjectManagement;
