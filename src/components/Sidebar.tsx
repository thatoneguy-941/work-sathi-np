
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
      <div className="p-6 h-full">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">
          {t('menu')}
        </h3>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className="w-full justify-start h-12 px-4 font-medium"
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                <span className="truncate">{t(item.labelKey)}</span>
              </Button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
