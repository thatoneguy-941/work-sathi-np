
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Calendar,
  User,
  Settings
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const { t } = useLanguage();

  const menuItems = [
    { id: 'dashboard', labelKey: 'dashboard', icon: TrendingUp },
    { id: 'clients', labelKey: 'clients', icon: Users },
    { id: 'projects', labelKey: 'projects', icon: Calendar },
    { id: 'invoices', labelKey: 'invoices', icon: FileText },
    { id: 'profile', labelKey: 'profile', icon: User },
    { id: 'settings', labelKey: 'settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
          {t('menu')}
        </h3>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className="w-full justify-start h-auto py-3"
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div>{t(item.labelKey)}</div>
                </div>
              </Button>
            );
          })}
        </nav>
      </div>
      
      {/* Upgrade Banner */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 rounded-lg">
          <h4 className="font-medium mb-1">{t('upgradeTitle')}</h4>
          <p className="text-xs text-blue-100 mb-3">
            {t('upgradeDesc')}
          </p>
          <Button size="sm" variant="secondary" className="w-full">
            {t('upgradeNow')}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
