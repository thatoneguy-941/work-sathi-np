
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FolderOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import AddProjectModal from '@/components/modals/AddProjectModal';

const ProjectManagement = () => {
  const { t } = useLanguage();
  const [projects] = useState([]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{t('projectManagement')}</h2>
        </div>
        <AddProjectModal>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            {t('newProject')}
          </Button>
        </AddProjectModal>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-600">{t('totalProjects')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">0</p>
            <p className="text-sm text-gray-600">{t('completed')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">0</p>
            <p className="text-sm text-gray-600">{t('inProgress')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">Rs. 0</p>
            <p className="text-sm text-gray-600">{t('totalValue')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Empty State */}
      <Card>
        <CardContent className="p-12">
          <div className="text-center">
            <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">{t('noProjectsYet')}</h3>
            <p className="text-gray-600 mb-4">{t('createFirstProject')}</p>
            <AddProjectModal>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                {t('createProject')}
              </Button>
            </AddProjectModal>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectManagement;
